import { ISubject } from 'domain/core/entities/subjectEntity';
import { IPoints } from 'domain/core/entities/pointsEntity';
import { SubjectFailure, subjectFailuresEnum } from 'domain/core/failures/subject/subjectFailure';
import { PointFailure } from 'domain/core/failures/point/pointFailure';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { fromSubjectSupabaseDocumentData, subjectSupabaseToMap } from "domain/mappers/patient/supabase/subjectSupabaseMapper";
import { pointsSupabaseToMap } from "domain/mappers/points/supabase/pointsSupabaseMapper";
import { supabase } from 'infrastructure/config/supabase/supabase-client';
import { IGetSubjectsResponse } from 'domain/core/response/subjectsResponse';

export default interface ISubjectRepository {
  getSubjects(obj: { skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; }): Promise<IGetSubjectsResponse | SubjectFailure>;
  getSubjectsCompanions(obj: { skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; }): Promise<IGetSubjectsResponse | SubjectFailure>;
  getSubjectById(subjectId: number): Promise<ISubject | SubjectFailure>;
  getSubjectsPoints(obj: { country?: string | undefined }): Promise<IPoints | PointFailure>;
  createSubjects(subjects: ISubject[]): Promise<boolean | SubjectFailure>;
  editSubject(subject: ISubject): Promise<boolean | SubjectFailure>;
  exportSubjectsToCSV(obj: { skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; country?: string | undefined, startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<boolean | SubjectFailure>;
}

export class SubjectRepository implements ISubjectRepository {
    async getSubjects(obj: { skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; }): Promise<IGetSubjectsResponse | SubjectFailure> {
      try {
          let query = supabase.from("Sujetos").select("*", { count: "exact" });
    
          if (obj.sort) {
            query = query.order(obj.sort.field, {
              ascending: obj.sort.ascending
            });
          }

          if (obj.searchQuery) {
   

            query = query.or(`or(nombres.ilike.%${obj.searchQuery.trim().toLowerCase()}%,primerApellido.ilike.%${obj.searchQuery.trim().toLowerCase()}%,curp.ilike.%${obj.searchQuery.trim().toLowerCase()}%,telefono.ilike.%${obj.searchQuery.trim().toLowerCase()}%),and(nombres.ilike.%${obj.searchQuery.trim().toLowerCase()}%,primerApellido.ilike.%${obj.searchQuery.trim().toLowerCase()}%,curp.ilike.%${obj.searchQuery.trim().toLowerCase()}%,telefono.ilike.%${obj.searchQuery.trim().toLowerCase()}%)`);
          }

          if (obj.skip && typeof obj.skip === "number" && obj.limit) {
            query = query.range(obj.skip, obj.skip + obj.limit);
          }

          if (obj.limit) {
            query = query.limit(obj.limit);
          }
  
          const res = await query;
          
          const subjects: ISubject[] = [];
  
          if (res.data && res.data.length > 0) {
              await Promise.all(res.data.map(async (data: any) => {
                  const subjectMap: ISubject = subjectSupabaseToMap(data);
      
                  subjects.push(subjectMap);
              }));
          }

          const response: IGetSubjectsResponse = {
            data: subjects,
            metadata: {
              total: res.count ?? 0,
              limit: obj.limit ?? 0,
            }
          }
  
          return JSON.parse(JSON.stringify(response));
      } catch (error) { 
        const exception = error as any;
        return new SubjectFailure(subjectFailuresEnum.serverError);
      }
    }

    async getSubjectsCompanions(obj: { skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; }): Promise<IGetSubjectsResponse | SubjectFailure> {
      try {
          let query = supabase.from("Sujetos").select("*", { count: "exact" }).eq("esPaciente", false);
    
          if (obj.sort) {
            query = query.order(obj.sort.field, {
              ascending: obj.sort.ascending
            });
          }

          if (obj.searchQuery) {
   

            query = query.or(`or(nombres.ilike.%${obj.searchQuery.trim().toLowerCase()}%,primerApellido.ilike.%${obj.searchQuery.trim().toLowerCase()}%,curp.ilike.%${obj.searchQuery.trim().toLowerCase()}%,telefono.ilike.%${obj.searchQuery.trim().toLowerCase()}%),and(nombres.ilike.%${obj.searchQuery.trim().toLowerCase()}%,primerApellido.ilike.%${obj.searchQuery.trim().toLowerCase()}%,curp.ilike.%${obj.searchQuery.trim().toLowerCase()}%,telefono.ilike.%${obj.searchQuery.trim().toLowerCase()}%)`);
          }

          if (obj.skip && typeof obj.skip === "number" && obj.limit) {
            query = query.range(obj.skip, obj.skip + obj.limit);
          }

          if (obj.limit) {
            query = query.limit(obj.limit);
          }
  
          const res = await query;
          
          const subjects: ISubject[] = [];
  
          if (res.data && res.data.length > 0) {
              await Promise.all(res.data.map(async (data: any) => {
                  const subjectMap: ISubject = subjectSupabaseToMap(data);
      
                  subjects.push(subjectMap);
              }));
          }

          const response: IGetSubjectsResponse = {
            data: subjects,
            metadata: {
              total: res.count ?? 0,
              limit: obj.limit ?? 0,
            }
          }

          console.log(res)
  
          return JSON.parse(JSON.stringify(response));
      } catch (error) { 
        const exception = error as any;
        return new SubjectFailure(subjectFailuresEnum.serverError);
      }
    }
  
    async getSubjectById(subjectId: number): Promise<ISubject | SubjectFailure> {
      try {
        const res = await supabase.from("Sujetos").select().eq("id", subjectId).limit(1);

        let subject: ISubject = {} as ISubject;

        if (res.data && res.data.length > 0) subject = subjectSupabaseToMap(res.data[0]);

        return subject;
      } catch (error) { 
        const exception = error as any;
        return new SubjectFailure(subjectFailuresEnum.serverError);
      }
    }
  
    async getSubjectsPoints(obj: { country?: string | undefined }): Promise<IPoints | PointFailure> {
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
        return new SubjectFailure(subjectFailuresEnum.serverError);
      }
    }
  
    async createSubjects(subjects: ISubject[]): Promise<boolean | SubjectFailure> {
      try {
      await Promise.all(subjects.map(async (subject: ISubject) => {
          supabase.from("Paciente").insert(fromSubjectSupabaseDocumentData(subject));
      }));
  
        return true;
      } catch (error) { 
        const exception = error as any;
        return new SubjectFailure(subjectFailuresEnum.serverError);
      }
    }

    async createSubject(subject: ISubject): Promise<boolean | SubjectFailure> {
      try {
        await supabase.from("Sujetos").insert(fromSubjectSupabaseDocumentData(subject));
        console.log(subject)
        return true;
      } catch (error) {
        const exception = error as any;
        return new SubjectFailure(subjectFailuresEnum.serverError);
      }
    }

    async editSubject(subject: ISubject): Promise<boolean | SubjectFailure> {
      try {
        subject.updatedOn = new Date();

        await supabase.from("Sujetos").update(fromSubjectSupabaseDocumentData(subject)).match({ id: subject.subjectId });

        return true;
      } catch (error) {
        const exception = error as any;
        return new SubjectFailure(subjectFailuresEnum.serverError);
      }
    }
  
    async exportSubjectsToCSV(obj: { skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; country?: string | undefined, startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<boolean | SubjectFailure> {
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
  
          const subjects: ISubject[] = [];
  
          if (snapshots.data && snapshots.data.length > 0) {
              await Promise.all(snapshots.data.map(async (snapshot: any) => {
                  const subjectMap: ISubject = subjectSupabaseToMap(snapshot);
  
                  const snapshotsPoints = await supabase.from("Punto").select().eq("pacienteId", subjectMap.subjectId).limit(1);
      
                  /*if (snapshotsPoints.data && snapshotsPoints.data.length > 0) {
                      const petPointMap: IPoints = pointsSupabaseToMap(snapshotsPoints.data[0]);
                      subjectMap.points = petPointMap;
                  }*/
      
                  subjects.push(subjectMap);
              }));
          }
  
          if (subjects.length === 0) throw new Error("subjects/not-found");
  
          const header: string[] = ["Usuario", "Correo", "URL", "Registro completado", "ID del paciente", "Fecha de nacimiento", "Tipo de documento", "Nombre", "País", "Número de documento", "Apellido", "Dirección", "Genero", "Token", "Teléfono", "ID de Stripe"];
  
          const dataToCSV = subjects.map((subject: ISubject) => {
            return { 
              Correo: subject.email,
              'ID del paciente': subject.subjectId,
              'Fecha de nacimiento': subject.birthDate ?? "",
              Nombre: subject.name,
              País: subject.country,
              'CURP': subject.curp,
              Apellido: subject.lastName,
              Dirección: subject.address,
              Sexo: subject.sex,
              Teléfono: subject.phoneNumber,
            }
          });
  
        const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
  
        const ws = XLSX.utils.json_to_sheet(dataToCSV, { header });
        const wb = { Sheets: { data: ws }, SheetNames: ["data"], };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, `Sujetos` + fileExtension);
  
        return true;
      } catch (error) { 
        const exception = error as any;

        if (exception.message === "subjects/not-found") {
          return new SubjectFailure(subjectFailuresEnum.subjectsNotFound);
        }

        return new SubjectFailure(subjectFailuresEnum.serverError);
      }
    }
  }
  