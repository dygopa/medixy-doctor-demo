import { medicalRecordTypeEnum, medicalRecordTypePhysicalEnum } from '(presentation)/(enum)/medicalRecord/medicalRecordEnums';
import { treatmentViaDosisEnum } from '(presentation)/(enum)/treatment/treatmentEnums';
import { get12HoursFormat, getFullDate } from '(presentation)/(helper)/dates/datesHelper';
import { getDosisTypeText, getDuringText, getFrequencyText } from '(presentation)/(helper)/medicalRecords/recipesHelper';
import { IDiagnosis } from 'domain/core/entities/diagnosis';
import { IMedicalConsulty, IMedicalConsultyImage } from 'domain/core/entities/medicalConsultyEntity';
import { IMedicalMeasure, IMedicalMeasureType } from 'domain/core/entities/medicalMeasureEntity';
import { IMedicalRecord, IMedicalRecordType, IMedicalRecordValue, IMedicalRecordValueType } from 'domain/core/entities/medicalRecordEntity';
import { ISubject } from 'domain/core/entities/subjectEntity';
import { ITreatment, ITreatmentMedicine } from 'domain/core/entities/treatmentEntity';
import { IUser } from 'domain/core/entities/userEntity';
import { MedicalConsultyFailure, medicalConsultyFailuresEnum } from 'domain/core/failures/medicalConsulty/medicalConsultyFailure';
import { MedicalRecordFailure, medicalRecordFailuresEnum } from 'domain/core/failures/medicalRecord/medicalRecordFailure';
import { ICreateMedicalConsultyImageResponse, ICreateMedicalConsultyResponse, IGetMedicalConsultiesResponse, IGetMedicalConsultyPDFResponse, IUpdateMedicalConsultyResponse } from 'domain/core/response/medicalConsultyResponse';
import { diagnosisSupabaseToMap } from 'domain/mappers/diagnosis/diagnosisSupabaseMapper';
import { fromMedicalConsultyImageSupabaseDocumentData, fromMedicalConsultySupabaseDocumentData, medicalConsultyImageSupabaseToMap, medicalConsultySupabaseToMap } from "domain/mappers/medicalConsulty/supabase/medicalConsultySupabaseMapper";
import { medicalMeasureSupabaseToMap, medicalMeasureTypeSupabaseToMap } from 'domain/mappers/medicalMeasure/supabase/medicalMeasureSupabaseMapper';
import { medicalRecordSupabaseToMap, medicalRecordTypeSupabaseToMap, medicalRecordValueSupabaseToMap, medicalRecordValueTypeSupabaseToMap } from 'domain/mappers/medicalRecord/supabase/medicalRecordSupabaseMapper';
import { subjectSupabaseToMap } from 'domain/mappers/patient/supabase/subjectSupabaseMapper';
import { treatmentMedicineSupabaseToMap, treatmentSupabaseToMap } from 'domain/mappers/treatment/supabase/treatmentSupabaseMapper';
import { GET_MEDICAL_CONSULTY_REPORT_ENDPOINT } from 'infrastructure/config/api/dictionary';
import { supabase } from 'infrastructure/config/supabase/supabase-client';
import { getFileFromBase64 } from 'infrastructure/utils/files/filesUtils';
import { getLetterByMeasureType, getMedicalMeasuresMap, getTitleByMeasureType } from 'infrastructure/utils/medicalMeasures/medicalMeasuresHelper';
import { getMedicalRecordsHistory, getMedicalRecordsPhysical } from 'infrastructure/utils/medicalRecord/medicalRecordHelper';
import { nanoid } from 'nanoid';
import * as QRCode from "qrcode";
import nookies from 'nookies';
import FileSaver from 'file-saver';

export default interface IMedicalConsultyRepository {
  getMedicalConsultiesById(id:number): Promise<IMedicalConsulty | MedicalConsultyFailure>;
  getMedicalConsulties(obj: { 
    skip?: number | string | null; 
    sort?: any; 
    limit?: number | null; 
    searchQuery?: string | null;
    doctorId?: number | null;
    subjectId?: number | null;
    sinceAt?: Date | null; 
    untilAt?: Date | null
  }): Promise<IGetMedicalConsultiesResponse | MedicalConsultyFailure>;
  createMedicalConsulty(medicalConsulty: IMedicalConsulty): Promise<ICreateMedicalConsultyResponse | MedicalConsultyFailure>;
  updateMedicalConsulty(medicalConsulty: IMedicalConsulty): Promise<IUpdateMedicalConsultyResponse | MedicalConsultyFailure>;
  getMedicalConsultyPDF(obj: { 
    doctor: IUser;
    medicalConsulty: IMedicalConsulty;
  }): Promise<IGetMedicalConsultyPDFResponse | MedicalConsultyFailure>;
  createMedicalConsultyImage(medicalConsultyImage: IMedicalConsultyImage): Promise<ICreateMedicalConsultyImageResponse | MedicalConsultyFailure>;
}

export class MedicalConsultyRepository implements IMedicalConsultyRepository {
  async getMedicalConsultiesById(id:number): Promise<IMedicalConsulty | MedicalConsultyFailure> {
    try {
      const res = await supabase.from("ConsultasMedicas").select(`
        *,
        Diagnosticos (*),
        Sujetos (*),
        RegistrosMedicos (
          *,
          ConsultasMedicas (*),
          TiposRegistrosMedicos (*),
          ValoresRegistrosMedicos (
            *,
            TiposValorRegistrosMedicos (*)
          ),
          Sujetos (*)
        ),
        SignosVitales (
          *,
          TiposSignosVitales (*)
        ),
        Tratamientos (
          *,
          MedicamentosTratamiento (*),
          Sujetos (*)
        ),
        ImagenesConsultas (*)
      `,
      { count: "exact" }).eq("id",id).limit(1);

      let medicalConsulty: IMedicalConsulty = {} as IMedicalConsulty;

      if (res.data && res.data.length > 0){ 
        medicalConsulty = medicalConsultySupabaseToMap(res.data[0]);

        if (res.data[0]?.Sujetos) {
          const subject: ISubject = subjectSupabaseToMap(res.data[0]?.Sujetos);
  
          medicalConsulty.subject = subject;
        }

        if (res.data[0]?.Diagnosticos?.length > 0) {
          res.data[0]?.Diagnosticos.forEach((diagnosisData: any) => {
            const diagnose: IDiagnosis = diagnosisSupabaseToMap(diagnosisData);
  
            if (diagnose.id >= 0) medicalConsulty?.diagnose?.push(diagnose);
          });
        }

        if (res.data[0].RegistrosMedicos?.length > 0) {
          res.data[0].RegistrosMedicos.forEach((medicalRecordData: any) => {
            let medicalRecord: IMedicalRecord = medicalRecordSupabaseToMap(medicalRecordData);
  
            if (medicalRecordData?.TiposRegistrosMedicos) {
              const medicalRecordType: IMedicalRecordType = medicalRecordTypeSupabaseToMap(medicalRecordData.TiposRegistrosMedicos);
  
              medicalRecord.medicalRecordType = medicalRecordType;
            }
  
            if (medicalRecordData?.ValoresRegistrosMedicos?.length > 0) {
              medicalRecordData.ValoresRegistrosMedicos.forEach((medicalRecordValueData: any) => {
                const medicalRecordValue: IMedicalRecordValue = medicalRecordValueSupabaseToMap(medicalRecordValueData);
  
                if (medicalRecordValueData?.TiposValorRegistrosMedicos) {
                  const medicalRecordValueType: IMedicalRecordValueType = medicalRecordValueTypeSupabaseToMap(medicalRecordValueData.TiposValorRegistrosMedicos);
  
                  if (medicalRecordValueType.id > 0) medicalRecordValue.medicalRecordValueType = medicalRecordValueType;
                }
  
                if (medicalRecordValue.id >= 0) medicalRecord.medicalRecordValues.push(medicalRecordValue)
              })
            }
  
            if (medicalRecordData?.Sujetos) {
              const subject: ISubject = subjectSupabaseToMap(medicalRecordData.Sujetos);
  
              medicalRecord.subject = subject;
            }
  
            if (medicalRecordData?.ConsultasMedicas) {
              const medicalConsulty: IMedicalConsulty = medicalConsultySupabaseToMap(medicalRecordData.ConsultasMedicas);
  
              medicalRecord.medicalConsulty = medicalConsulty;
            }
  
            if (medicalRecord.medicalRecordValues.length > 0) {
              medicalRecord.medicalRecordValues = medicalRecord.medicalRecordValues.sort((a, b) => a.medicalRecordValueTypeId - b.medicalRecordValueTypeId);
            }
  
            if (medicalRecord.id >= 0) medicalConsulty?.medicalRecords?.push(medicalRecord);
          });
        }
  
        if (res.data[0].SignosVitales?.length > 0) {
          res.data[0].SignosVitales.map((medicalMeasureData: any) => {
            const medicalMeasureMap: IMedicalMeasure = medicalMeasureSupabaseToMap(medicalMeasureData);
  
            if (medicalMeasureData?.TiposSignosVitales) {
              const medicalMeasureType: IMedicalMeasureType = medicalMeasureTypeSupabaseToMap(medicalMeasureData.TiposSignosVitales);
    
              if (medicalMeasureType.id >= 0) medicalMeasureMap.medicalMeasureType = medicalMeasureType;
            }
  
            if (medicalMeasureMap.id > 0) medicalConsulty.medicalMeasures?.push(medicalMeasureMap)
          })
        }
  
        if (res.data[0].Tratamientos?.length > 0) {
          res.data[0].Tratamientos.forEach((treatmentData: any) => {
            const treatmentMap: ITreatment = treatmentSupabaseToMap(treatmentData);
  
            if (treatmentData?.Sujetos) {
              const subject: ISubject = subjectSupabaseToMap(treatmentData.Sujetos);
  
              treatmentMap.subject = subject;
            }
  
            if (treatmentData?.MedicamentosTratamiento?.length > 0) {
              treatmentData.MedicamentosTratamiento.forEach((medicineData: any) => {
                const medicines: ITreatmentMedicine = treatmentMedicineSupabaseToMap(medicineData);
                
    
                if (medicines.id >= 0) treatmentMap?.treatmentMedicines?.push(medicines);
              });
            }
  
            if (treatmentMap.id > 0) medicalConsulty.treatments?.push(treatmentMap);
          })
        }
      
        if (res.data[0].ImagenesConsultas?.length > 0) {
          res.data[0].ImagenesConsultas.map((medicalImageData: any) => {
            const medicalConsultyImageMap: IMedicalConsultyImage = medicalConsultyImageSupabaseToMap(medicalImageData);
  
            if (medicalConsultyImageMap.id > 0) medicalConsulty.medicalConsultyImages?.push(medicalConsultyImageMap)
          })
        }
      }

      return medicalConsulty;
    } catch (error) {
      const exception = error as any;
      return new MedicalConsultyFailure(medicalConsultyFailuresEnum.serverError);
    }
  }
  
  async getMedicalConsulties(obj: { 
    skip?: number | string | null; 
    sort?: any; 
    limit?: number | null; 
    searchQuery?: string | null;
    doctorId?: number | null;
    subjectId?: number | null;
    sinceAt?: Date | null; 
    untilAt?: Date | null
  }): Promise<IGetMedicalConsultiesResponse | MedicalConsultyFailure> {
    try {
      let query = supabase.from("ConsultasMedicas").select(`
      *,
      Diagnosticos (*),
      Sujetos!inner(*),
      RegistrosMedicos (
        *,
        ConsultasMedicas (*),
        TiposRegistrosMedicos (*),
        ValoresRegistrosMedicos (
          *,
          TiposValorRegistrosMedicos (*)
        ),
        Sujetos (*)
      ),
      SignosVitales (
        *,
        TiposSignosVitales (*)
      ),
      Tratamientos (
        *,
        MedicamentosTratamiento (*),
        Sujetos (*)
      )
    `,
    { count: "exact" });

      if (obj.sort) {
          query = query.order(obj.sort.field, {
              ascending: obj.sort.ascending
          });
      }

      if (obj.searchQuery) {
        query = query.or(`or(nombres.ilike.%${obj.searchQuery.trim().toLowerCase()}%,primerApellido.ilike.%${obj.searchQuery.trim().toLowerCase()}%,curp.ilike.%${obj.searchQuery.trim().toLowerCase()}%,telefono.ilike.%${obj.searchQuery.trim().toLowerCase()}%),and(nombres.ilike.%${obj.searchQuery.trim().toLowerCase()}%,primerApellido.ilike.%${obj.searchQuery.trim().toLowerCase()}%,curp.ilike.%${obj.searchQuery.trim().toLowerCase()}%,telefono.ilike.%${obj.searchQuery.trim().toLowerCase()}%)`, { foreignTable: "Sujetos" } );
      }

      if (obj.doctorId) {
        query = query.eq("doctorId", obj.doctorId);
      }

      if (obj.subjectId) {
        query = query.eq("sujetoId", obj.subjectId);
      }

      if (obj.sinceAt) {
        query = query.gte("fechaConsulta", obj.sinceAt.toISOString());
      }
  
      if (obj.untilAt) {
        query = query.lte("fechaConsulta", obj.untilAt.toISOString());
      }

      if (obj.skip && typeof obj.skip === "number" && obj.limit) {
          query = query.range(obj.skip, obj.skip + obj.limit);
      }

      if (obj.limit) {
          query = query.limit(obj.limit);
      }

      const res = await query;

      const medicalConsulties: IMedicalConsulty[] = [];
      
      if (res.data && res.data.length > 0) {
          await Promise.all(res.data.map(async (data: any) => {
              const medicalConsultyMap: IMedicalConsulty = medicalConsultySupabaseToMap(data);

              if (data?.Sujetos) {
                const subject: ISubject = subjectSupabaseToMap(data.Sujetos);

                medicalConsultyMap.subject = subject;
              }

              if (data.Diagnosticos?.length > 0) {
                data.Diagnosticos.forEach((diagnosisData: any) => {
                  const diagnose: IDiagnosis = diagnosisSupabaseToMap(diagnosisData);
      
                  if (diagnose.id >= 0) medicalConsultyMap?.diagnose?.push(diagnose);
                });

                if (medicalConsultyMap.diagnose && medicalConsultyMap.diagnose.length > 0) medicalConsultyMap.diagnose = medicalConsultyMap.diagnose.sort((a: any, b: any) => b.isPrincipal - a.isPrincipal);
              }

              if (data.RegistrosMedicos?.length > 0) {
                data.RegistrosMedicos.forEach((medicalRecordData: any) => {
                  let medicalRecord: IMedicalRecord = medicalRecordSupabaseToMap(medicalRecordData);

                  if (medicalRecordData?.TiposRegistrosMedicos) {
                    const medicalRecordType: IMedicalRecordType = medicalRecordTypeSupabaseToMap(medicalRecordData.TiposRegistrosMedicos);
    
                    medicalRecord.medicalRecordType = medicalRecordType;
                  }
    
                  if (medicalRecordData?.ValoresRegistrosMedicos?.length > 0) {
                    medicalRecordData.ValoresRegistrosMedicos.forEach((medicalRecordValueData: any) => {
                      const medicalRecordValue: IMedicalRecordValue = medicalRecordValueSupabaseToMap(medicalRecordValueData);

                      if (medicalRecordValueData?.TiposValorRegistrosMedicos) {
                        const medicalRecordValueType: IMedicalRecordValueType = medicalRecordValueTypeSupabaseToMap(medicalRecordValueData.TiposValorRegistrosMedicos);
    
                        if (medicalRecordValueType.id > 0) medicalRecordValue.medicalRecordValueType = medicalRecordValueType;
                      }
    
                      if (medicalRecordValue.id >= 0) medicalRecord.medicalRecordValues.push(medicalRecordValue)
                    })
                  }

                  if (medicalRecordData?.Sujetos) {
                    const subject: ISubject = subjectSupabaseToMap(medicalRecordData.Sujetos);
    
                    medicalRecord.subject = subject;
                  }

                  if (medicalRecordData?.ConsultasMedicas) {
                    const medicalConsulty: IMedicalConsulty = medicalConsultySupabaseToMap(medicalRecordData.ConsultasMedicas);
    
                    medicalRecord.medicalConsulty = medicalConsulty;
                  }

                  if (medicalRecord.medicalRecordValues.length > 0) {
                    medicalRecord.medicalRecordValues = medicalRecord.medicalRecordValues.sort((a, b) => a.medicalRecordValueTypeId - b.medicalRecordValueTypeId);
                  }
      
                  if (medicalRecord.id >= 0) medicalConsultyMap?.medicalRecords?.push(medicalRecord);
                });
              }

              if (data.SignosVitales?.length > 0) {
                data.SignosVitales.map((medicalMeasureData: any) => {
                  const medicalMeasureMap: IMedicalMeasure = medicalMeasureSupabaseToMap(medicalMeasureData);

                  if (medicalMeasureData?.TiposSignosVitales) {
                    const medicalMeasureType: IMedicalMeasureType = medicalMeasureTypeSupabaseToMap(medicalMeasureData.TiposSignosVitales);
          
                    if (medicalMeasureType.id >= 0) medicalMeasureMap.medicalMeasureType = medicalMeasureType;
                  }

                  if (medicalMeasureMap.id > 0) medicalConsultyMap.medicalMeasures?.push(medicalMeasureMap)
                })
              }

              if (data.Tratamientos?.length > 0) {
                data.Tratamientos.forEach((treatmentData: any) => {
                  const treatmentMap: ITreatment = treatmentSupabaseToMap(treatmentData);

                  if (treatmentData?.Sujetos) {
                    const subject: ISubject = subjectSupabaseToMap(treatmentData.Sujetos);
    
                    treatmentMap.subject = subject;
                  }

                  if (treatmentData?.MedicamentosTratamiento?.length > 0) {
                    treatmentData.MedicamentosTratamiento.forEach((medicineData: any) => {
                      const medicines: ITreatmentMedicine = treatmentMedicineSupabaseToMap(medicineData);
                      
          
                      if (medicines.id >= 0) treatmentMap?.treatmentMedicines?.push(medicines);
                    });
                  }

                  if (treatmentMap.id > 0) medicalConsultyMap.treatments?.push(treatmentMap);
                })
              }

              medicalConsulties.push(medicalConsultyMap);
          }));
      }

      const response: IGetMedicalConsultiesResponse = {
          data: medicalConsulties,
          metadata: {
              total: res.count ?? 0,
              limit: obj.limit ?? null,
          }
      }

      return JSON.parse(JSON.stringify(response));
    } catch (error) {
      const exception = error as any;
      return new MedicalConsultyFailure(medicalConsultyFailuresEnum.serverError);
    }
  }

  async createMedicalConsulty(medicalConsulty: IMedicalConsulty): Promise<ICreateMedicalConsultyResponse | MedicalConsultyFailure> {
    try {
      const res = await supabase.from("ConsultasMedicas").insert(fromMedicalConsultySupabaseDocumentData(medicalConsulty)).select();

      if (res.error) return new MedicalConsultyFailure(medicalConsultyFailuresEnum.serverError);

      if (res.data && res.data.length > 0) medicalConsulty.id = res.data[0].id;

      const response: ICreateMedicalConsultyResponse = {
          data: medicalConsulty,
          metadata: {}
      }

      return JSON.parse(JSON.stringify(response));
    } catch (error) {
      const exception = error as any;
      return new MedicalConsultyFailure(medicalConsultyFailuresEnum.serverError);
    }
  }

  async updateMedicalConsulty(medicalConsulty: IMedicalConsulty): Promise<IUpdateMedicalConsultyResponse | MedicalConsultyFailure> {
    try {
      const res = await supabase.from("ConsultasMedicas").update(fromMedicalConsultySupabaseDocumentData(medicalConsulty)).match({ id: medicalConsulty.id });

      if (res.error) return new MedicalConsultyFailure(medicalConsultyFailuresEnum.serverError);

      const response: IUpdateMedicalConsultyResponse = {
          data: medicalConsulty,
          metadata: {}
      }

      return JSON.parse(JSON.stringify(response));
    } catch (error) {
      const exception = error as any;
      return new MedicalConsultyFailure(medicalConsultyFailuresEnum.serverError);
    }
  }

  async getMedicalConsultyPDF(obj: { 
    doctor: IUser;
    medicalConsulty: IMedicalConsulty;
  }): Promise<IGetMedicalConsultyPDFResponse | MedicalConsultyFailure> {
    try {
      let cookies = nookies.get(undefined, 'access_token');

      var myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      } as RequestInit;

      let URL = GET_MEDICAL_CONSULTY_REPORT_ENDPOINT(obj.medicalConsulty.id, "pdf") as RequestInfo

      const res = await fetch(URL, requestOptions)

      if (res.status === 200) {
        let blob = await res.blob();
        FileSaver.saveAs(blob, "Consulta médica.pdf");
      }   

      const response: IGetMedicalConsultyPDFResponse = {
          data: obj.medicalConsulty,
          metadata: {}
      }

      return JSON.parse(JSON.stringify(response));
    } catch (error) {
      const exception = error as any;
      console.log(exception)
      return new MedicalConsultyFailure(medicalConsultyFailuresEnum.serverError);
    }
  }

  async createMedicalConsultyImage(medicalConsultyImage: IMedicalConsultyImage): Promise<ICreateMedicalConsultyImageResponse | MedicalConsultyFailure> {
    try {
      if (medicalConsultyImage.file?.data) {
        const id = nanoid(11);
        const fileName = `${id}.${medicalConsultyImage.file.type}`;

        const file = getFileFromBase64(medicalConsultyImage.file.data, fileName);   

        const { data, error } = await supabase.storage
        .from("medical-consulties")
        .upload(`${medicalConsultyImage.medicalConsultyId}/${fileName}`, file, {
            cacheControl: '3600',
            upsert: false
        });

      if (error) return new MedicalConsultyFailure(medicalConsultyFailuresEnum.serverError)

      const res = supabase
          .storage
          .from("medical-consulties")
          .getPublicUrl(data.path);

      const pictureUrl = res.data.publicUrl;

      medicalConsultyImage.url = pictureUrl;
    }

      const res = await supabase.from("ImagenesConsultas").insert(fromMedicalConsultyImageSupabaseDocumentData(medicalConsultyImage)).select();

      if (res.data && res.data?.length > 0) medicalConsultyImage.id = res.data[0].id;

      const response: ICreateMedicalConsultyImageResponse = {
          data: medicalConsultyImage,
          metadata: {},
      }

      return response;
    } catch (error) {
      const exception = error as any;
      return new MedicalConsultyFailure(medicalConsultyFailuresEnum.serverError);
    }
  }
}
  