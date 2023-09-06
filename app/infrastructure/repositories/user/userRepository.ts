import { IUser } from "domain/core/entities/userEntity";
import { UserFailure, userFailuresEnum } from "domain/core/failures/user/userFailure";
import { IGetUsersResponse } from "domain/core/response/usersResponse";
import { userSupabaseToMap } from "domain/mappers/user/userMapper";
import { 
  CREATE_MEDICAL_SPECIALITY_ENDPOINT, 
  DELETE_MEDICAL_SPECIALITY_ENDPOINT, 
  GET_MEDICAL_SPECIALITIES_ENDPOINT, 
  GET_USER_ENDPOINT, 
  GET_USER_MEDICAL_SPECIALITIES_ENDPOINT, 
  UPDATE_AVATAR_ENDPOINT, 
  UPDATE_MEDICAL_SPECIALITY_ENDPOINT, 
  UPDATE_USER_ENDPOINT 
} from "infrastructure/config/api/dictionary";
import { supabase } from "infrastructure/config/supabase/supabase-client";
import { getFileFromBase64 } from "infrastructure/utils/files/filesUtils";
import { nanoid } from "nanoid";
import nookies from 'nookies';

export default interface IUserRepository {
  editUser(user:any): Promise<string | UserFailure>;
  getMedicalSpecialities(): Promise<Array<any> | UserFailure>;
  createMedicalSpeciality(obj:any): Promise<Array<any> | UserFailure>;
  updateMedicalSpeciality(obj:any): Promise<Object | UserFailure>;
  getDoctors(obj: { skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; }): Promise<IGetUsersResponse | UserFailure>;
  getDoctorById(doctorId: number): Promise<IUser | UserFailure>;
  getDoctorsCount(obj: { limit?: number | undefined; searchQuery?: string | undefined; }): Promise<number | UserFailure>;
}

export class UserRepository implements IUserRepository {

  async editUser(user:any): Promise<string | UserFailure> {
    try {
      let cookies = nookies.get(undefined, 'access_token');

      var myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);

      var raw = JSON.stringify(user);

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      } as RequestInit;

      let URL = UPDATE_USER_ENDPOINT(user["id"]) as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      console.log(data)
      
      if (data?.detail?.meta === undefined) {
        console.log(data?.detail)
      }

      return response.statusText;
    } catch (error) {
      const exception = error as any;
      return new UserFailure(userFailuresEnum.serverError);
    }
  }
  
  async updateAvatar(obj:any, doctorId: string): Promise<string | UserFailure> {
    try {
      const id = nanoid(11);
      const fileName = `${id}.${obj["type"]}`;

      const file = getFileFromBase64(obj["data"], fileName);   

      const { data, error } = await supabase.storage
        .from("doctors")
        .upload(`avatars/${fileName}`, file, {
            cacheControl: '3600',
            upsert: false
        });

      if (error) return new UserFailure(userFailuresEnum.serverError)

      const res = supabase
        .storage
        .from("doctors")
        .getPublicUrl(data.path);

      await supabase.from("Doctores").update({ avatar: res.data.publicUrl }).match({ id: doctorId });

      return res.data.publicUrl;
      /* var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        data: obj["data"],
        type: obj["type"]
      });

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      } as RequestInit;

      let URL = UPDATE_AVATAR_ENDPOINT(obj["id"] as number) as RequestInfo

      const response = await fetch(URL, requestOptions)
      
      return response?.text() ?? ""; */
    } catch (error) {
      const exception = error as any;
      return new UserFailure(userFailuresEnum.serverError);
    }
  }

  async getMedicalSpecialities(): Promise<Array<any> | UserFailure> {
    try {

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      } as RequestInit;

      let URL = GET_MEDICAL_SPECIALITIES_ENDPOINT as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      console.log("GET_MEDICAL_SPECIALITIES_ENDPOINT", data["data"])

      return data["data"] ?? [];
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new UserFailure(userFailuresEnum.serverError);
    }
  }

  async getUserMedicalSpecialities(id:number): Promise<Array<any> | UserFailure> {
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

      let URL = GET_USER_MEDICAL_SPECIALITIES_ENDPOINT(id) as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      console.log("GET_USER_MEDICAL_SPECIALITIES_ENDPOINT", data["data"])

      return data["data"] ?? [];
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new UserFailure(userFailuresEnum.serverError);
    }
  }

  async createMedicalSpeciality(obj:any): Promise<Array<any> | UserFailure> {
    try {

      let cookies = nookies.get(undefined, 'access_token');

      var myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);

      var raw = JSON.stringify({
        specialty_id: obj["specialty_id"],
        code: obj["code"],
        institution_name: obj["institution_name"],
        main_specialty: obj["main_specialty"],
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      } as RequestInit;

      let URL = CREATE_MEDICAL_SPECIALITY_ENDPOINT(obj["id"] as number) as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      console.log("CREATE_MEDICAL_SPECIALITY_ENDPOINT", data)

      return data["data"] ?? [];
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new UserFailure(userFailuresEnum.serverError);
    }
  }

  async updateMedicalSpeciality(obj:any): Promise<Object | UserFailure> {
    try {

      let cookies = nookies.get(undefined, 'access_token');

      var myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);

      var raw = JSON.stringify({
        code: obj["code"],
        institution_name: obj["institution_name"],
        main_specialty: obj["main_specialty"],
      });

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      } as RequestInit;

      let URL = UPDATE_MEDICAL_SPECIALITY_ENDPOINT(obj["id_user"] as number, obj["id"] as number) as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      console.log("UPDATE_MEDICAL_SPECIALITY_ENDPOINT", data)

      return data["data"] ?? {};
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new UserFailure(userFailuresEnum.serverError);
    }
  }

  async deleteMedicalSpeciality(obj:any): Promise<Object | UserFailure> {
    try {

      let cookies = nookies.get(undefined, 'access_token');

      var myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);

      var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
      } as RequestInit;

      let URL = DELETE_MEDICAL_SPECIALITY_ENDPOINT(obj["id_user"] as number, obj["id"] as number) as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      console.log("DELETE_MEDICAL_SPECIALITY_ENDPOINT", data)

      return data["data"] ?? {};
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new UserFailure(userFailuresEnum.serverError);
    }
  }

  async getDoctors(obj: { skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; }): Promise<IGetUsersResponse | UserFailure> {
    try {
        let query = supabase.from("Doctores").select("*", { count: "exact" });
  
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
        
        const subjects: IUser[] = [];

        if (res.data && res.data.length > 0) {
            await Promise.all(res.data.map(async (data: any) => {
                const subjectMap: IUser = userSupabaseToMap(data);
    
                subjects.push(subjectMap);
            }));
        }

        const response: IGetUsersResponse = {
          data: subjects,
          metadata: {
            total: res.count ?? 0,
            limit: obj.limit ?? 0,
          }
        }

        console.log(response)

        return JSON.parse(JSON.stringify(response));
    } catch (error) { 
      const exception = error as any;
      return new UserFailure(userFailuresEnum.serverError);
    }
  }
  async getDoctorById(doctorId: number): Promise<IUser | UserFailure> {
    try {
      const res = await supabase.from("Doctores").select().eq("id", doctorId).limit(1);

      let doctor: IUser = {} as IUser;

      if (res.data && res.data.length > 0) doctor = userSupabaseToMap(res.data[0]);

      return doctor;
    } catch (error) { 
      const exception = error as any;
      return new UserFailure(userFailuresEnum.serverError);
    }
  }

  async getDoctorsCount(obj: { limit?: number | undefined; searchQuery?: string | undefined; }): Promise<number | UserFailure> {
    try {
        let query = supabase.from("Doctores").select("*", { count: "exact" });

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
      return new UserFailure(userFailuresEnum.serverError);
    }
  }
}
