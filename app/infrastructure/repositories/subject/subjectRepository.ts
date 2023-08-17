import { IRelationSubject, ISubject } from 'domain/core/entities/subjectEntity';
import { IPoints } from 'domain/core/entities/pointsEntity';
import { SubjectFailure, subjectFailuresEnum } from 'domain/core/failures/subject/subjectFailure';
import { PointFailure } from 'domain/core/failures/point/pointFailure';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { fromRelationsSubjectsSupabaseDocumentData, fromSubjectSupabaseDocumentData, relationsSubjectSupabaseToMap, subjectSupabaseToMap } from "domain/mappers/patient/supabase/subjectSupabaseMapper";
import { pointsSupabaseToMap } from "domain/mappers/points/supabase/pointsSupabaseMapper";
import { supabase } from 'infrastructure/config/supabase/supabase-client';
import { ICreateSubjectResponse, IGetSubjectRelationsResponse, IGetSubjectsResponse } from 'domain/core/response/subjectsResponse';
import { nanoid } from 'nanoid';
import { getFileFromBase64 } from 'infrastructure/utils/files/filesUtils';

export default interface ISubjectRepository {
  getSubjects(obj: { userId?: number | string | undefined; skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; }): Promise<IGetSubjectsResponse | SubjectFailure>;
  getSubjectsCount(obj: { limit?: number | undefined; searchQuery?: string | undefined; }): Promise<number | SubjectFailure>;
  getSubjectsCompanions(obj: { skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; patientId?: number | undefined; typeRelation?: number | undefined }): Promise<IGetSubjectRelationsResponse | SubjectFailure>;
  getSubjectById(subjectId: number): Promise<ISubject | SubjectFailure>;
  getSubjectsPoints(obj: { country?: string | undefined }): Promise<IPoints | PointFailure>;
  createSubjects(subjects: ISubject[]): Promise<boolean | SubjectFailure>;
  findSubject(subject: ISubject): Promise<any | SubjectFailure>;
  createSubjectRelation(subjectId:any, userId:any): Promise<any | SubjectFailure>;
  editSubject(subject: ISubject): Promise<boolean | SubjectFailure>;
  createRelationSubject(subjectId: number, copmpanionId: number): Promise<boolean | SubjectFailure>;
  exportSubjectsToCSV(obj: { skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; country?: string | undefined, startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<boolean | SubjectFailure>;
  addMediaService(obj:any, subjectId: string | number): Promise<string | SubjectFailure>;
}

export class SubjectRepository implements ISubjectRepository {
    async getSubjects(obj: { userId?: number | string | undefined; skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; }): Promise<IGetSubjectsResponse | SubjectFailure> {
      try {
          let query = supabase.from("Sujetos").select("*", { count: "exact" }).eq("esPaciente", true);

          if(obj.userId){
            console.log(obj.userId)
            let queryOfRelations = supabase.from("PermisosSujetos").select(`*`).eq("doctorId", obj.userId);
            let resRelations = await queryOfRelations
            console.log(resRelations)
            if(resRelations.error) return new SubjectFailure(subjectFailuresEnum.serverError);
            
            query = supabase.from("Sujetos")
            .select(`*`, { count: "exact" }).in("id", resRelations.data!.map((elem:any)=> elem["sujetoId"] ))
          }

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

    async getSubjectsCount(obj: { limit?: number | undefined; searchQuery?: string | undefined; }): Promise<number | SubjectFailure> {
      try {
          let query = supabase.from("Sujetos").select("*", { count: "exact", head: true }).eq("esPaciente", true);
    
          if (obj.searchQuery) {
   

            query = query.or(`or(nombres.ilike.%${obj.searchQuery.trim().toLowerCase()}%,primerApellido.ilike.%${obj.searchQuery.trim().toLowerCase()}%,curp.ilike.%${obj.searchQuery.trim().toLowerCase()}%,telefono.ilike.%${obj.searchQuery.trim().toLowerCase()}%),and(nombres.ilike.%${obj.searchQuery.trim().toLowerCase()}%,primerApellido.ilike.%${obj.searchQuery.trim().toLowerCase()}%,curp.ilike.%${obj.searchQuery.trim().toLowerCase()}%,telefono.ilike.%${obj.searchQuery.trim().toLowerCase()}%)`);
          }

          if (obj.limit) {
            query = query.limit(obj.limit);
          }
  
          const res = await query;
  
          return res.count ?? 0;
      } catch (error) { 
        const exception = error as any;
        return new SubjectFailure(subjectFailuresEnum.serverError);
      }
    }

    async getSubjectsCompanions(obj: { skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; patientId?: number | undefined; typeRelation?: number | undefined}): Promise<IGetSubjectRelationsResponse | SubjectFailure> {
      try {
          let query = supabase.from("RelacionesSujetos").select(`
          *
        `, { count: "exact" });
          
          if (obj.typeRelation) {
            query = query.eq("tipo", obj.typeRelation);
          }

          if (obj.patientId) {
            query = query.eq("sujetoPrincipalId", obj.patientId);
          }
          
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
          
          const subjects: IRelationSubject[] = [];
  
          if (res.data && res.data.length > 0) {
              await Promise.all(res.data.map(async (data: any) => {
                  const subjectRelationsMap: IRelationSubject = relationsSubjectSupabaseToMap(data);

                  console.log(subjectRelationsMap)

                  const resSubjectPrincipal = await supabase.from("Sujetos").select("*").eq("id", subjectRelationsMap.subjectIdPrincipal).limit(1);

                  if (resSubjectPrincipal.data && resSubjectPrincipal.data.length > 0) {
                    const subjectPrincipalMap: ISubject = subjectSupabaseToMap(resSubjectPrincipal.data[0]);

                    subjectRelationsMap.subjectPrincipal = subjectPrincipalMap;
                  }

                  const resSubjectSecondary = await supabase.from("Sujetos").select("*").eq("id", subjectRelationsMap.subjectIdSecondary).limit(1);

                  if (resSubjectSecondary.data && resSubjectSecondary.data.length > 0) {
                    const subjectSecondaryMap: ISubject = subjectSupabaseToMap(resSubjectSecondary.data[0]);

                    subjectRelationsMap.subjectSecondary = subjectSecondaryMap;
                  }
      
                  subjects.push(subjectRelationsMap);
              }));
          }

          const response: IGetSubjectRelationsResponse = {
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
  
    async getSubjectById(subjectId: number): Promise<ISubject | SubjectFailure> {
      try {
        const res = await supabase.from("Sujetos").select().eq("id", subjectId).limit(1);

        let subject: ISubject = {} as ISubject;

        if (res.data && res.data.length > 0) subject = subjectSupabaseToMap(res.data[0]);

        console.log(subject);

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

    async findSubject(subject: ISubject): Promise<any | SubjectFailure> {
      try {
        const findedSubjectByEmail = await supabase.from("Sujetos").select("*").eq("email", subject.email).single()
        const findedSubjectByCURP = await supabase.from("Sujetos").select("*").eq("curp", subject.curp).single()

        if(!findedSubjectByEmail.error && findedSubjectByEmail.data.length > 0) return findedSubjectByEmail.data["id"]
        if(!findedSubjectByCURP.error && findedSubjectByCURP.data.length > 0) return findedSubjectByCURP.data["id"]

        return "";
      } catch (error) {
        const exception = error as any;
        return new SubjectFailure(subjectFailuresEnum.serverError);
      }
    }

    async createSubject(subject: ISubject): Promise<ICreateSubjectResponse | SubjectFailure> {
      try {
        const res = await supabase.from("Sujetos").insert(fromSubjectSupabaseDocumentData(subject)).select();

        if (res.error) return new SubjectFailure(subjectFailuresEnum.serverError);

        if (res.data && res.data.length > 0) subject.subjectId = res.data[0].id;

        const response: ICreateSubjectResponse = {
          data: subject,
          metadata: {}
        }

        return JSON.parse(JSON.stringify(response));
      } catch (error) {
        const exception = error as any;
        return new SubjectFailure(subjectFailuresEnum.serverError);
      }
    }
    
    async createSubjectRelation(subjectId:any, userId:any): Promise<any | SubjectFailure> {
      try {
        const res = await supabase.from("PermisosSujetos").insert({
          sujetoId: subjectId,
          doctorId: userId
        }).select();

        if (res.error) return new SubjectFailure(subjectFailuresEnum.serverError);

        return res.status;
      } catch (error) {
        const exception = error as any;
        return new SubjectFailure(subjectFailuresEnum.serverError);
      }
    }

    async editSubject(subject: any): Promise<boolean | SubjectFailure> {
      try {
        subject.updatedOn = new Date();

        await supabase.from("Sujetos").update(fromSubjectSupabaseDocumentData(subject)).match({ id: subject.subjectId });

        return true;
      } catch (error) {
        const exception = error as any;
        return new SubjectFailure(subjectFailuresEnum.serverError);
      }
    }

    async createRelationSubject(subjectId: number, companionId: number): Promise<boolean | SubjectFailure> {
      try {
        const relationSubject = {
          type: 1,
          subjectId: subjectId,
          companionId: companionId,
        }

        await supabase.from("RelacionesSujetos").insert(fromRelationsSubjectsSupabaseDocumentData(relationSubject))

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

    async addMediaService(obj:any, subjectId: string | number): Promise<string | SubjectFailure> {
      try {
        console.log(obj, subjectId)
        const id = nanoid(11);
        const fileName = `${id}.${obj["type"]}`;
  
        const file = getFileFromBase64(obj["data"], fileName);   
  
        const { data, error } = await supabase.storage
          .from("subjects")
          .upload(`media/${fileName}`, file, {
              cacheControl: '3600',
              upsert: false
          });
  
        if (error) return new SubjectFailure(subjectFailuresEnum.serverError)
  
        const res = supabase
          .storage
          .from("subjects")
          .getPublicUrl(data.path);
  
        await supabase.from("Sujetos").update({ avatar: res.data.publicUrl }).match({ id: subjectId });

        console.log(res.data.publicUrl)
  
        return res.data.publicUrl;
        /* let cookies = nookies.get(undefined, 'access_token');
  
        var myHeaders = new Headers();
  
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);
  
        var raw = JSON.stringify({
          data: obj["data"] ?? "",
          type: obj["type"] ?? ""
        });
  
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        } as RequestInit;
  
        let URL = ADD_MEDIA_LOCALITY_ENDPOINT(obj["id"]) as RequestInfo
  
        const response = await fetch(URL, requestOptions)
        console.log(response)
        let data = await response.json()
  
        console.log(data)
  
        console.log("ADD_MEDIA_LOCALITY_ENDPOINT", data["data"])
  
        return data["data"] ?? ""; */
      } catch (error) {
        console.log("Error", error)
        const exception = error as any;
        return new SubjectFailure(subjectFailuresEnum.serverError);
      }
    }
  }
  