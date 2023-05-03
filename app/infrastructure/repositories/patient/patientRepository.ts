import { IPatient } from 'domain/core/entities/patientEntity';
import { IPoints } from 'domain/core/entities/pointsEntity';
import { PatientFailure, patientFailuresEnum } from 'domain/core/failures/patient/patientFailure';
import { PointFailure } from 'domain/core/failures/point/pointFailure';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { fromPatientSupabaseDocumentData, patientSupabaseToMap } from "domain/mappers/patient/supabase/patientSupabaseMapper";
import { pointsSupabaseToMap } from "domain/mappers/points/supabase/pointsSupabaseMapper";
import { supabase } from 'infrastructure/config/supabase/supabase-client';
import { IGetPatientsResponse } from 'domain/core/response/patientsResponse';

export default interface IPatientRepository {
  getPatients(obj: { skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; country?: string | undefined, startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<IGetPatientsResponse | PatientFailure>;
  getPatientById(patientId: string): Promise<IPatient | PatientFailure>;
  getPatientsPoints(obj: { country?: string | undefined }): Promise<IPoints | PointFailure>;
  createPatients(patients: IPatient[]): Promise<boolean | PatientFailure>;
  exportPatientsToCSV(obj: { skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; country?: string | undefined, startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<boolean | PatientFailure>;
}

export class PatientRepository implements IPatientRepository {
    async getPatients(obj: { skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; country?: string | undefined, startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<IGetPatientsResponse | PatientFailure> {
      try {
          let query = supabase.from("Paciente").select();
    
          if (obj.sort) {
            query = query.order(obj.sort.field, {
              ascending: obj.sort.ascending
            });
          }

          if (obj.searchQuery) {
            query = query.textSearch("nombre", obj.searchQuery);
          }

          if (obj.country) {
            query = query.eq('pais', obj.country);
          }

          if (obj.skip && typeof obj.skip === "number" && obj.limit) {
            query = query.range(obj.skip, obj.skip + obj.limit);
          }

          if (obj.limit) {
            query = query.limit(obj.limit);
          }
  
          const snapshots = await query;

          const patients: IPatient[] = [];
  
          if (snapshots.data && snapshots.data.length > 0) {
              await Promise.all(snapshots.data.map(async (snapshot: any) => {
                  const patientMap: IPatient = patientSupabaseToMap(snapshot);
  
                  const snapshotsPoints = await supabase.from("Punto").select().eq("pacienteId", patientMap.patientId).limit(1);
      
                  if (snapshotsPoints.data && snapshotsPoints.data.length > 0) {
                      const petPointMap: IPoints = pointsSupabaseToMap(snapshotsPoints.data[0]);
                      patientMap.points = petPointMap;
                  }
      
                  patients.push(patientMap);
              }));
          }
  
          const response: IGetPatientsResponse = {
            data: patients,
            metadata: {
              total: 0,
              limit: obj.limit ?? null,
            }
          }
  
          return JSON.parse(JSON.stringify(response));
      } catch (error) { 
        const exception = error as any;
        return new PatientFailure(patientFailuresEnum.serverError);
      }
    }
  
    async getPatientById(patientId: string): Promise<IPatient | PatientFailure> {
      try {
          const snapshot = await supabase.from("Paciente").select().eq("pacienteId", patientId).limit(1);
  
          let patient: IPatient = {} as IPatient;
  
          if (snapshot.data && snapshot.data.length > 0) {
            patient = patientSupabaseToMap(snapshot.data[0]);
  
            const snapshotsPoints = await supabase.from("Punto").select().eq("pacienteId", patientId).limit(1);
      
            if (snapshotsPoints.data && snapshotsPoints.data.length > 0) {
                const petPointMap: IPoints = pointsSupabaseToMap(snapshotsPoints.data[0]);
                patient.points = petPointMap;
            }
          }
  
          return patient;
      } catch (error) { 
        const exception = error as any;
        return new PatientFailure(patientFailuresEnum.serverError);
      }
    }
  
    async getPatientsPoints(obj: { country?: string | undefined }): Promise<IPoints | PointFailure> {
      try {
          let query = supabase.from("Punto").select().neq("pacienteId", false);
  
          if (obj.country) {
            query = query.eq("pais", obj.country);
          }
  
          const snapshots = await query;
  
          let points: IPoints = {
            accumulated: 0,
            redeemed: 0,
            generated: 0,
          } as IPoints;
  
          if (snapshots.data && snapshots.data.length > 0) {
            await Promise.all(snapshots.data.map(async (snapshot: any) => {
                const pointMap: IPoints = pointsSupabaseToMap(snapshot);
  
                points.accumulated += pointMap.accumulated;
                points.redeemed += pointMap.redeemed;
                points.generated += pointMap.generated;
            }));
          }
  
          return points;
      } catch (error) { 
        const exception = error as any;
        return new PatientFailure(patientFailuresEnum.serverError);
      }
    }
  
    async createPatients(patients: IPatient[]): Promise<boolean | PatientFailure> {
      try {
      await Promise.all(patients.map(async (patient: IPatient) => {
          supabase.from("Paciente").insert(fromPatientSupabaseDocumentData(patient));
      }));
  
        return true;
      } catch (error) { 
        const exception = error as any;
        return new PatientFailure(patientFailuresEnum.serverError);
      }
    }
  
    async exportPatientsToCSV(obj: { skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; country?: string | undefined, startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<boolean | PatientFailure> {
      try {
          let query = supabase.from("Paciente").select();
      
          if (obj.sort) {
            query = query.order(obj.sort.field, {
              ascending: obj.sort.ascending
            });
          }

          if (obj.searchQuery) {
            query = query.textSearch("nombre", obj.searchQuery).textSearch("primerApellido", obj.searchQuery);
          }

          if (obj.country) {
            query = query.eq('pais', obj.country);
          }

          if (obj.skip && typeof obj.skip === "number" && obj.limit) {
            query = query.range(obj.skip, obj.skip + obj.limit);
          }

          if (obj.limit) {
            query = query.limit(obj.limit);
          }
  
          const snapshots = await query;
  
          const patients: IPatient[] = [];
  
          if (snapshots.data && snapshots.data.length > 0) {
              await Promise.all(snapshots.data.map(async (snapshot: any) => {
                  const patientMap: IPatient = patientSupabaseToMap(snapshot);
  
                  const snapshotsPoints = await supabase.from("Punto").select().eq("pacienteId", patientMap.patientId).limit(1);
      
                  if (snapshotsPoints.data && snapshotsPoints.data.length > 0) {
                      const petPointMap: IPoints = pointsSupabaseToMap(snapshotsPoints.data[0]);
                      patientMap.points = petPointMap;
                  }
      
                  patients.push(patientMap);
              }));
          }
  
          if (patients.length === 0) throw new Error("patients/not-found");
  
          const header: string[] = ["Usuario", "Correo", "URL", "Registro completado", "ID del paciente", "Fecha de nacimiento", "Tipo de documento", "Nombre", "País", "Número de documento", "Apellido", "Dirección", "Genero", "Token", "Teléfono", "ID de Stripe"];
  
          const dataToCSV = patients.map((patient: IPatient) => {
            return { 
              Usuario: patient.user, 
              Correo: patient.email,
              URL: patient.url,
              'Registro completado': patient.registerComplete ? "Si" : "no",
              'ID del paciente': patient.patientId,
              'Fecha de nacimiento': patient.birthDate ?? "",
              'Tipo de documento': patient.documentType,
              Nombre: patient.firstName,
              País: patient.country,
              'Número de documento': patient.documentNumber,
              Apellido: patient.lastName,
              Dirección: patient.address,
              Genero: patient.genrer,
              Token: patient.token,
              Teléfono: patient.phoneNumber,
              'ID de Stripe': patient.stripeId,
            }
          });
  
        const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
  
        const ws = XLSX.utils.json_to_sheet(dataToCSV, { header });
        const wb = { Sheets: { data: ws }, SheetNames: ["data"], };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, `Pacientes` + fileExtension);
  
        return true;
      } catch (error) { 
        const exception = error as any;

        if (exception.message === "patients/not-found") {
          return new PatientFailure(patientFailuresEnum.patientsNotFound);
        }

        return new PatientFailure(patientFailuresEnum.serverError);
      }
    }
  }
  