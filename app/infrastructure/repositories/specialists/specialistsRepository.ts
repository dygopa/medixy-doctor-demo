import { Specialist } from "domain/core/entities/specialists/specialist";
import { SpecialtyFailure, specialtyFailuresEnum } from "domain/core/failures/specialty/specialtyFailure";
import { specialistDBToMap } from "domain/mappers/specialty/supabase/specialtySupabaseMapper";
import { UPDATE_SPECIALIST_ENDPOINT } from "infrastructure/config/api/dictionary";
import { supabase } from "infrastructure/config/supabase/supabase-client";
import { getFileFromBase64 } from "infrastructure/utils/files/filesUtils";
import { nanoid } from "nanoid";
import nookies from "nookies"

export default interface ISpecialistsRepository {
  getSpecialist(id:number): Promise<Specialist | SpecialtyFailure>;
  getSpecialistLocalities(id:number): Promise<any[] | SpecialtyFailure>;
  editUser(user:any): Promise<string | SpecialtyFailure>;
  updateAvatar(obj:any, doctorId: string): Promise<string | SpecialtyFailure>;
  updateProfileCompleted(userId: number, doctorId: number): Promise<boolean | SpecialtyFailure>;
}

export class SpecialistsRepository implements ISpecialistsRepository {
  async getSpecialist(id:number): Promise<Specialist | SpecialtyFailure> {
    try {
      const response = await supabase.from("Doctores").select(`
        *,
        EspecialidadesDoctores (*,
          Especialidades(
            nombre
          )
        )
      `).eq("id", id).single();

      console.log(response)

      if(response.error)throw new SpecialtyFailure(response.statusText)

      if(response.data["EspecialidadesDoctores"].length > 0){
        response.data["EspecialidadesDoctores"] = response.data["EspecialidadesDoctores"].map((elem:any)=>({
          ...elem,
          nombre: elem["Especialidades"]["nombre"]
        }))
      }

      console.log("GET_SPECIALIST_ENDPOINT", response.data)

      return specialistDBToMap(response.data) ?? {} as Specialist;
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new SpecialtyFailure(specialtyFailuresEnum.serverError);
    }
  }

  async getSpecialistLocalities(id:number): Promise<any[] | SpecialtyFailure> {
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

      let URL = process.env.NEXT_PUBLIC_API_URL + `/doctor/${id}/location/MEX` as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      console.log("GET_USER_LOCALITIES_ENDPOINT", data["data"])

      return data["data"] ?? [];
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new SpecialtyFailure(specialtyFailuresEnum.serverError);
    }
  }

  async editUser(user:any): Promise<string | SpecialtyFailure> {
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

      let URL = UPDATE_SPECIALIST_ENDPOINT(user["accountId"]) as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      console.log(response, data)

      if (data.message !== "Succesfull operation") {
        if(data.message === "CURP_ALREADY_REGISTERED") return new SpecialtyFailure(specialtyFailuresEnum.curpAlreadyRegister)
        return new SpecialtyFailure(specialtyFailuresEnum.serverError)
      }
      
      if (data?.detail?.meta === undefined) {
        console.log(data?.detail)
      }

      return response.statusText;
    } catch (error) {
      const exception = error as any;
      return new SpecialtyFailure(specialtyFailuresEnum.serverError);
    }
  }

  async updateAvatar(obj:any, doctorId: string): Promise<string | SpecialtyFailure> {
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

      if (error) return new SpecialtyFailure(specialtyFailuresEnum.serverError)

      const res = supabase
        .storage
        .from("doctors")
        .getPublicUrl(data.path);

      await supabase.from("Doctores").update({ avatar: res.data.publicUrl }).match({ id: doctorId });

      return res.data.publicUrl;
    } catch (error) {
      const exception = error as any;
      return new SpecialtyFailure(specialtyFailuresEnum.serverError);
    }
  }

  async updateProfileCompleted(userId: number, doctorId: number): Promise<boolean | SpecialtyFailure> {
    try {
      await supabase.from("Doctores").update({ perfilCompletado: true }).match({ id: doctorId });

      const res = await supabase.from("EventosUsuarios").select("*").eq("usuarioId", userId).eq("evento", "PROFILE_COMPLETED").limit(1);

      if (res.data && res.data.length === 0) await supabase.from("EventosUsuarios").insert({ usuarioId: userId, evento: "PROFILE_COMPLETED" });

      return true;
    } catch (error) {
      const exception = error as any;
      return new SpecialtyFailure(specialtyFailuresEnum.serverError);
    }
  }

}

