import { medicalRecordTypeEnum, medicalRecordTypePhysicalEnum } from '(presentation)/(enum)/medicalRecord/medicalRecordEnums';
import { treatmentViaDosisEnum } from '(presentation)/(enum)/treatment/treatmentEnums';
import { get12HoursFormat, getFullDate } from '(presentation)/(helper)/dates/datesHelper';
import { getDosisTypeText, getDuringText, getFrequencyText } from '(presentation)/(helper)/medicalRecords/recipesHelper';
import { IDiagnosis } from 'domain/core/entities/diagnosis';
import { IMedicalConsulty } from 'domain/core/entities/medicalConsultyEntity';
import { IMedicalMeasure, IMedicalMeasureType } from 'domain/core/entities/medicalMeasureEntity';
import { IMedicalRecord, IMedicalRecordType, IMedicalRecordValue, IMedicalRecordValueType } from 'domain/core/entities/medicalRecordEntity';
import { ISubject } from 'domain/core/entities/subjectEntity';
import { ITreatment, ITreatmentMedicine } from 'domain/core/entities/treatmentEntity';
import { IUser } from 'domain/core/entities/userEntity';
import { MedicalConsultyFailure, medicalConsultyFailuresEnum } from 'domain/core/failures/medicalConsulty/medicalConsultyFailure';
import { MedicalRecordFailure, medicalRecordFailuresEnum } from 'domain/core/failures/medicalRecord/medicalRecordFailure';
import { ICreateMedicalConsultyResponse, IGetMedicalConsultiesResponse, IGetMedicalConsultyPDFResponse } from 'domain/core/response/medicalConsultyResponse';
import { diagnosisSupabaseToMap } from 'domain/mappers/diagnosis/diagnosisSupabaseMapper';
import { fromMedicalConsultySupabaseDocumentData, medicalConsultySupabaseToMap } from "domain/mappers/medicalConsulty/supabase/medicalConsultySupabaseMapper";
import { medicalMeasureSupabaseToMap, medicalMeasureTypeSupabaseToMap } from 'domain/mappers/medicalMeasure/supabase/medicalMeasureSupabaseMapper';
import { medicalRecordSupabaseToMap, medicalRecordTypeSupabaseToMap, medicalRecordValueSupabaseToMap, medicalRecordValueTypeSupabaseToMap } from 'domain/mappers/medicalRecord/supabase/medicalRecordSupabaseMapper';
import { subjectSupabaseToMap } from 'domain/mappers/patient/supabase/subjectSupabaseMapper';
import { treatmentMedicineSupabaseToMap, treatmentSupabaseToMap } from 'domain/mappers/treatment/supabase/treatmentSupabaseMapper';
import { supabase } from 'infrastructure/config/supabase/supabase-client';
import { getLetterByMeasureType, getMedicalMeasuresMap, getTitleByMeasureType } from 'infrastructure/utils/medicalMeasures/medicalMeasuresHelper';
import { getMedicalRecordsHistory, getMedicalRecordsPhysical } from 'infrastructure/utils/medicalRecord/medicalRecordHelper';
import jsPDF from "jspdf";
import * as QRCode from "qrcode";

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
  getMedicalConsultyPDF(obj: { 
    doctor: IUser;
    medicalConsulty: IMedicalConsulty;
  }): Promise<IGetMedicalConsultyPDFResponse | MedicalConsultyFailure>;
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
        )
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

  async getMedicalConsultyPDF(obj: { 
    doctor: IUser;
    medicalConsulty: IMedicalConsulty;
  }): Promise<IGetMedicalConsultyPDFResponse | MedicalConsultyFailure> {
    try {
      if (obj.doctor.pwaProfressionId) {
        const res = await supabase.from("ProfesionesPQA").select("*").eq("id", obj.doctor.pwaProfressionId).limit(1);

        if (res.data && res.data.length > 0) obj.doctor.pwaProfression = res.data[0].nombre;
      }

      const doc = new jsPDF();

      doc.setProperties({
        title: `Resumen de la consulta - ${getFullDate(new Date())} ${get12HoursFormat(new Date())}.pdf`
      });

      var img = new Image();

      if (obj.doctor.avatar?.length > 0) {
        img.src = obj.doctor.avatar;
        doc.addImage(img, "png", 10, 5, 25, 25);
      } else {
        img.src = "https://tokexynaxhnsroxlpatn.supabase.co/storage/v1/object/public/utils/medical-logo-1.jpg";
        doc.addImage(img, "png", 10, 0, 25, 30);
      }
    
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`Dr(a) ${obj.doctor.names} ${obj.doctor.firstName}`, 42, 10);
      doc.text(`${obj.doctor.pwaProfression}`, 42, 15);

      if (obj.doctor.pwaProfression.length > 0) {
        doc.text(`Cedula profesional ${obj.doctor.professionalLicense.length > 0 ? obj.doctor.professionalLicense : "000000000"}`, 42, 20);

        if (obj.doctor.professionalLicenseInstitution.length > 0) doc.text(`${obj.doctor.professionalLicenseInstitution}`, 42, 27);
      } else {
        doc.text(`Cedula profesional ${obj.doctor.professionalLicense.length > 0 ? obj.doctor.professionalLicense : "000000000"}`, 42, 15);

        if (obj.doctor.professionalLicenseInstitution.length > 0) doc.text(`${obj.doctor.professionalLicenseInstitution}`, 42, 22);
      }

      doc.setFontSize(12);
      doc.text(`${obj.medicalConsulty.subject.lastName} ${obj.medicalConsulty.subject.name}`, 10, 40);
      doc.setFontSize(11);

      doc.setFont("helvetica", "normal", "normal");
      doc.text(`Edad del paciente:`, 10, 45);
      doc.text(`${obj.medicalConsulty.subject?.age} ${obj.medicalConsulty.subject?.ageType === "years" ? "años" : "meses"}`, 45, 45);

      doc.text(`Fecha:`, 130, 40);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${new Date(obj.medicalConsulty.consultationDate).getDate()}-${new Date(obj.medicalConsulty.consultationDate).getMonth()}-${new Date(obj.medicalConsulty.consultationDate).getFullYear()}`, 143, 40);

      doc.setLineWidth(0.1); 
      doc.line(10, 50, 200, 50);

      const medicalRecordsHistory = getMedicalRecordsHistory(obj.medicalConsulty.medicalRecords ?? []);

      let y = 60;
      let pageHeight = doc.internal.pageSize.height - 10;

      if (medicalRecordsHistory?.length > 0) {
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal", "bold");
        doc.text(`Antecedentes:`, 10, y);

        y += 7;

        if (y >= pageHeight) {
          y = 5;
          pageHeight = doc.internal.pageSize.height - 5;
          doc.addPage();
        }

        doc.setFont("helvetica", "normal", "normal");

        medicalRecordsHistory.forEach((medicalRecordHistory) => {
          doc.setFontSize(10);
          doc.setFont("helvetica", "normal", "bold");
          doc.text(`${medicalRecordTypeEnum[medicalRecordHistory.medicalRecordType.name]}`, 15, y);

          medicalRecordHistory.medicalRecordValues.forEach((medicalRecordValue) => {
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal", "normal");
            doc.text(`${medicalRecordValue.value}`, 15, y + 5);

            y += 5;

            if (y >= pageHeight) {
              y = 5;
              pageHeight = doc.internal.pageSize.height - 5;
              doc.addPage();
            }
          });

          y += 7;

          if (y >= pageHeight) {
            y = 5;
            pageHeight = doc.internal.pageSize.height - 5;
            doc.addPage();
          }
        });
      }

      const medicalRecordsPhysical = getMedicalRecordsPhysical(obj.medicalConsulty.medicalRecords ?? []);

      if (medicalRecordsPhysical?.length > 0) {
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal", "bold");
        doc.text(`Exploración física:`, 10, y);

        y += 7;

        if (y >= pageHeight) {
          y = 5;
          pageHeight = doc.internal.pageSize.height - 5;
          doc.addPage();
        }

        doc.setFont("helvetica", "normal", "normal");

        medicalRecordsPhysical.forEach((medicalRecordPhysical) => {
          console.log(medicalRecordPhysical)
          doc.setFontSize(10);
          doc.setFont("helvetica", "normal", "bold");
          doc.text(`${medicalRecordTypePhysicalEnum[medicalRecordPhysical.medicalRecordType.name]}`, 15, y);

          medicalRecordPhysical.medicalRecordValues.forEach((medicalRecordValue) => {
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal", "normal");
            doc.text(`${medicalRecordValue.value}`, 15, y + 5);

            y += 5;

            if (y >= pageHeight) {
              y = 5;
              pageHeight = doc.internal.pageSize.height - 5;
              doc.addPage();
            }
          });

          y += 7;

          if (y >= pageHeight) {
            y = 5;
            pageHeight = doc.internal.pageSize.height - 5;
            doc.addPage();
          }
        });
      }

      const medicalMeasures = getMedicalMeasuresMap(obj.medicalConsulty.medicalMeasures ?? []);

      if (medicalMeasures?.length > 0) {
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal", "bold");
        doc.text(`Signos vítales:`, 10, y);

        y += 7;

        if (y >= pageHeight) {
          y = 5;
          pageHeight = doc.internal.pageSize.height - 5;
          doc.addPage();
        }

        doc.setFont("helvetica", "normal", "normal");

        medicalMeasures.forEach((medicalMeasure) => {
          doc.setFontSize(10);
          doc.setFont("helvetica", "normal", "bold");
          doc.text(`${getTitleByMeasureType(medicalMeasure.medicalMeasureType.type)}`, 15, y);

          y += 5;

          if (y >= pageHeight) {
            y = 5;
            pageHeight = doc.internal.pageSize.height - 5;
            doc.addPage();
          }

          doc.setFontSize(10);
          doc.setFont("helvetica", "normal", "normal");
          doc.text(`${medicalMeasure.value.toFixed(2)} ${getLetterByMeasureType(medicalMeasure.medicalMeasureType.type)}`, 15, y);

          y += 7;

          if (y >= pageHeight) {
            y = 5;
            pageHeight = doc.internal.pageSize.height - 5;
            doc.addPage();
          }
        });

        y += 7;

        if (y >= pageHeight) {
          y = 5;
          pageHeight = doc.internal.pageSize.height - 5;
          doc.addPage();
        }
      }

      if (obj.medicalConsulty.diagnose && obj.medicalConsulty.diagnose?.length > 0) {
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal", "bold");
        doc.text(`Diagnósticos:`, 10, y);

        y += 7;

        if (y >= pageHeight) {
          y = 5;
          pageHeight = doc.internal.pageSize.height - 5;
          doc.addPage();
        }

        doc.setFont("helvetica", "normal", "normal");

        obj.medicalConsulty.diagnose.forEach((diagnose) => {
          doc.setFontSize(10);
          doc.text(`${diagnose.description}`, 15, y);

          y += 7;

          if (y >= pageHeight) {
            y = 5;
            pageHeight = doc.internal.pageSize.height - 5;
            doc.addPage();
          }
        });
      }

      if (obj.medicalConsulty.treatments && obj.medicalConsulty.treatments?.length > 0) {
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal", "bold");
        doc.text(`Medicamentos:`, 10, y);

        y += 7;

        if (y >= pageHeight) {
          y = 5;
          pageHeight = doc.internal.pageSize.height - 5;
          doc.addPage();
        }

        doc.setFont("helvetica", "normal", "normal");

        obj.medicalConsulty.treatments.forEach((treatment) => {
          if (treatment.treatmentMedicines.length > 0) {
            treatment.treatmentMedicines.forEach((treatmentMedicine) => {
              doc.setFontSize(10);
              doc.text(`${treatmentMedicine.medicine}`, 15, y);
              doc.setFontSize(9);
              doc.text(`Vía ${treatmentViaDosisEnum[treatmentMedicine.viaDosis]}, ${getDosisTypeText(treatmentMedicine)} cada ${getFrequencyText(treatmentMedicine)} por ${getDuringText(treatmentMedicine)}`, 15, y + 4);

              y += 10;

              if (y >= pageHeight) {
                y = 5;
                pageHeight = doc.internal.pageSize.height - 5;
                doc.addPage();
              }
            });
          }
        });

        y += 7;

        if (y >= pageHeight) {
          y = 5;
          pageHeight = doc.internal.pageSize.height - 5;
          doc.addPage();
        }
      }

      y += 30;

      if (y >= pageHeight) {
        y = 5;
        pageHeight = doc.internal.pageSize.height - 5;
        doc.addPage();
      }

      doc.setFontSize(11);

      doc.setLineWidth(0.1); 
      doc.line(30, y, 60, y);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal", "normal");
      doc.text(`Dr(a): ${obj.doctor.names} ${obj.doctor.firstName}`, 27, y + 5);

      QRCode.toDataURL(obj.medicalConsulty.id.toString(),  (err, url) => {
        if (err) return new MedicalRecordFailure(medicalRecordFailuresEnum.serverError);
 
        var img = new Image();
        img.src = url;
        doc.addImage(img, "png", 150, y - 25, 45, 45);
      });

      doc.text(`${obj.doctor.address}`, 50, y + 20);
      doc.text(`Tel: ${obj.doctor.phone}​​`, 75, y + 25);

      doc.output('dataurlnewwindow');

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
}
  