import { LocalityFailure, localityFailuresEnum } from './../../../domain/core/failures/locality/localityFailure';
import { ILocality } from "domain/core/entities/localityEntity";
import { ADD_MEDIA_LOCALITY_ENDPOINT, CREATE_USER_LOCALITY_ENDPOINT, GET_COUNTRY_STATES_ENDPOINT, GET_MEDICAL_CENTERS_ENDPOINT, GET_USER_LOCALITIES_ENDPOINT, UPDATE_USER_LOCALITY_ENDPOINT } from "infrastructure/config/api/dictionary";
import nookies from 'nookies';
import { supabase } from 'infrastructure/config/supabase/supabase-client';
import { nanoid } from 'nanoid'
import { getFileFromBase64 } from 'infrastructure/utils/files/filesUtils';
import { localityFromSupabaseToMap } from 'domain/mappers/localities/localitiesSupabaseMapper';

export default interface ILocalitiesRepository {
  getMedicalCenters(): Promise<Array<ILocality> | LocalityFailure>;
  getUserLocalities(id:number): Promise<Array<ILocality> | LocalityFailure>;
  getUserLocalitiesWithServices(id:number): Promise<Array<ILocality> | LocalityFailure>;
  createUserLocality(obj:any, services: any[]): Promise<string | LocalityFailure>;
  updateUserLocality(obj:any, id:number, services: any[]): Promise<string | LocalityFailure>;
  addMediaLocality(obj:any, localityId: string): Promise<string | LocalityFailure>;
}

export class LocalitiesRepository implements ILocalitiesRepository {
  async getMedicalCenters(): Promise<Array<ILocality> | LocalityFailure> {
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

      let URL = GET_MEDICAL_CENTERS_ENDPOINT as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      console.log("GET_MEDICAL_CENTERS_ENDPOINT", data["data"])

      return data["data"] as Array<ILocality> ?? [];
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new LocalityFailure(localityFailuresEnum.serverError);
    }
  }
  
  async getCountryStates(): Promise<Array<any> | LocalityFailure> {
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

      let URL = GET_COUNTRY_STATES_ENDPOINT as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      console.log("GET_COUNTRY_STATES_ENDPOINT", data["data"])

      return data["data"] as Array<any> ?? [];
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new LocalityFailure(localityFailuresEnum.serverError);
    }
  }

  async getUserLocalities(id:number): Promise<Array<any> | LocalityFailure> {
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

      let URL = GET_USER_LOCALITIES_ENDPOINT(id, "MEX") as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      console.log("GET_USER_LOCALITIES_ENDPOINT", data["data"])

      return data["data"] ?? [];
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new LocalityFailure(localityFailuresEnum.serverError);
    }
  }

  async getUserLocalitiesWithServices(id:number): Promise<Array<any> | LocalityFailure> {
    try {
      let queryOfLocalidadesDoctores = supabase.from("LocalidadesDoctores").select(`*`).eq("doctorId", id);
      let resLocalidadesDoctores = await queryOfLocalidadesDoctores

      if(resLocalidadesDoctores.data?.length === 0) return []

      let queryLocalidades = supabase.from("Localidades")
      .select(`*, Servicios(*)`).in("id", resLocalidadesDoctores.data!.map((elem:any)=> elem["localidadId"] ))
      let resLocalidades = await queryLocalidades
            
      if(resLocalidades.data?.length === 0) return []
      //serviceToLocalitiesSupabaseToMap
      let list = resLocalidades.data?.filter((elem:any) => elem["Servicios"].length > 0) ?? []
      list = list.map((elem:any) => localityFromSupabaseToMap(elem))

      return list ?? []
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new LocalityFailure(localityFailuresEnum.serverError);
    }
  }

  async createUserLocality(obj:any, services: any[]): Promise<ILocality | LocalityFailure> {
    try {
      let cookies = nookies.get(undefined, 'access_token');
      console.log(obj)
      var myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);

      var raw = JSON.stringify({
        name: obj["name"] ?? "",
        code: obj["code"] ?? "",
        type: "CONSULTING_ROOM",
        address: {
          postal_code: obj["address"]["postal_code"] ?? "",
          state_id: obj["address"]["federalEntity"] ?? 0,
          city: obj["address"]["city"] ?? "",
          address: obj["address"]["address"] ?? "",
          municipalityId: obj["address"]["municipality"] > 0 ? obj["address"]["municipality"] : null,
          countryLocation: obj["address"]["countryLocation"].length > 0 ? obj["address"]["countryLocation"] : null,
          street: obj["address"]["street"] ?? null,
          clues: obj["clues"] ?? "",
        },
        latitude: obj["latitude"].length > 0 ? obj["latitude"] : null,
        longitude: obj["longitude"].length > 0 ? obj["longitude"] : null,
        is_public: obj["isPublic"] === 1 ? true : false,
        is_virtual: obj["isVirtual"] === 1 ? true : false,
        services: services,
        country: "MEX",
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      } as RequestInit;

      let URL = CREATE_USER_LOCALITY_ENDPOINT(obj["id"] as number) as RequestInfo

      const response = await fetch(URL, requestOptions)
      console.log(response)
      let data = await response.json()
      console.log(data)

      console.log("CREATE_USER_LOCALITY_ENDPOINT", data["data"])

      return data["data"] ?? [];
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new LocalityFailure(localityFailuresEnum.serverError);
    }
  }

  async updateUserLocality(obj:any, id:number, services: any[]): Promise<string | LocalityFailure> {
    try {
      let cookies = nookies.get(undefined, 'access_token');



      var myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);



      var raw = JSON.stringify({
          name: obj["name"] ?? "",
          code: obj["code"] ?? "",
          address: {
            postal_code: obj["address"]["postal_code"] ?? "",
            state_id: obj["address"]["federalEntity"] ?? 0,
            city: obj["address"]["city"] ?? "",
            address: obj["address"]["address"] ?? "",
            municipalityId: obj["address"]["municipality"] > 0 ? obj["address"]["municipality"] : null,
            countryLocation: obj["address"]["countryLocation"].length > 0 ? obj["address"]["countryLocation"] : null,
            street: obj["address"]["street"] ?? null,
            clues: obj["clues"] ?? "",
          },
          latitude: obj["latitude"].length > 0 ? obj["latitude"] : null,
          longitude: obj["longitude"].length > 0 ? obj["longitude"] : null,
          is_public: obj["isPublic"] === 1 ? true : false,
          is_virtual: obj["isVirtual"] === 1 ? true : false,
          services: services,
          country: "MEX",
      });



      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      } as RequestInit;

      let URL = UPDATE_USER_LOCALITY_ENDPOINT(id) as RequestInfo

      const response = await fetch(URL, requestOptions)

      if(response.status >= 400) {
        return new LocalityFailure(localityFailuresEnum.serverError)
      }
      
      let data = await response.json()

      console.log("UPDATE_USER_LOCALITY_ENDPOINT", data["data"])

      return data["data"] ?? [];
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new LocalityFailure(localityFailuresEnum.serverError);
    }
  }

  

  async addMediaLocality(obj:any, localityId: string): Promise<string | LocalityFailure> {
    try {
      const id = nanoid(11);
      const fileName = `${id}.${obj["type"]}`;

      const file = getFileFromBase64(obj["data"], fileName);   

      const { data, error } = await supabase.storage
        .from("locations")
        .upload(`media/${fileName}`, file, {
            cacheControl: '3600',
            upsert: false
        });

      if (error) return new LocalityFailure(localityFailuresEnum.serverError)

      const res = supabase
        .storage
        .from("locations")
        .getPublicUrl(data.path);

      await supabase.from("Localidades").update({ fotoUrl: res.data.publicUrl }).match({ id: localityId });

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
      return new LocalityFailure(localityFailuresEnum.serverError);
    }
  }

}
