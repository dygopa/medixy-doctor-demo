import { ServiceFailure, serviceFailuresEnum } from 'domain/core/failures/service/serviceFailure';
import { IService, IServiceToLocality } from "domain/core/entities/serviceEntity";
import { 
  ADD_SERVICE_TO_LOCATION_ENDPOINT, 
  CREATE_USER_SERVICE_ENDPOINT, 
  UPDATE_USER_SERVICE_ENDPOINT, 
  GET_CATEGORIES_SERVICES_ENDPOINT, 
  GET_USER_SERVICES_ENDPOINT, 
  DELETE_USER_SERVICE_ENDPOINT
} from "infrastructure/config/api/dictionary";
import nookies from 'nookies';
import { supabase } from 'infrastructure/config/supabase/supabase-client';
import { nanoid } from 'nanoid';
import { getFileFromBase64 } from 'infrastructure/utils/files/filesUtils';
import { ILocalityService } from 'domain/core/entities/localityEntity';
import { fromServiceToLocalitiesSupabaseDocumentData, serviceToLocalitiesSupabaseToMap } from 'domain/mappers/services/servicesSupabaseMapper';

export default interface IServiceRepository {
  getCategories(): Promise<Array<any> | ServiceFailure>;
  getUserServices(id:number): Promise<Array<IService> | ServiceFailure>;
  addServiceToLocality(obj:any): Promise<any | ServiceFailure>;
  createUserService(obj:any): Promise<string | ServiceFailure>;
  updateService(obj:any, id:number): Promise<number | ServiceFailure>;
  addMediaService(obj:any, serviceId: string): Promise<string | ServiceFailure>;
  getLocalitiesToService(serviceId: number): Promise<Array<IServiceToLocality> | ServiceFailure>
}

export class ServicesRepository implements IServiceRepository {

  async getCategories(): Promise<Array<any> | ServiceFailure> {
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

      let URL = GET_CATEGORIES_SERVICES_ENDPOINT as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      //console.log("GET_CATEGORIES_SERVICES_ENDPOINT", data["data"])

      return data["data"] ?? [];
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new ServiceFailure(serviceFailuresEnum.serverError);
    }
  }

  async getUserServices(id:number): Promise<Array<any> | ServiceFailure> {
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

      let URL = GET_USER_SERVICES_ENDPOINT(id) as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      //console.log("GET_USER_SERVICES_ENDPOINT", data["data"])

      return data["data"] ?? [];
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new ServiceFailure(serviceFailuresEnum.serverError);
    }
  }

  async createUserService(obj:any): Promise<string | ServiceFailure> {
    try {
      let cookies = nookies.get(undefined, 'access_token');

      var myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);

      var raw = JSON.stringify({
        name: obj["name"],
        service_category_id: obj["service_category_id"],
        description: obj["description"],
        conditions: obj["conditions"],
        base_price: obj["base_price"],
        status: obj["status"],
        locations: obj["locations"]
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      } as RequestInit;

      let URL = CREATE_USER_SERVICE_ENDPOINT(obj["id"] as number) as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      console.log("CREATE_USER_SERVICE_ENDPOINT", data)

      return data["data"];
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new ServiceFailure(serviceFailuresEnum.serverError);
    }
  }

  async addMediaService(obj:any, serviceId: string | number): Promise<string | ServiceFailure> {
    try {
      const id = nanoid(11);
      const fileName = `${id}.${obj["type"]}`;

      const file = getFileFromBase64(obj["data"], fileName);   

      const { data, error } = await supabase.storage
        .from("services")
        .upload(`media/${fileName}`, file, {
            cacheControl: '3600',
            upsert: false
        });

      if (error) return new ServiceFailure(serviceFailuresEnum.serverError)

      const res = supabase
        .storage
        .from("services")
        .getPublicUrl(data.path);

      await supabase.from("Servicios").update({ fotoUrl: res.data.publicUrl }).match({ id: serviceId });

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
      return new ServiceFailure(serviceFailuresEnum.serverError);
    }
  }

  async updateService(obj: {dataService: any; serviceId: number;}): Promise<number | ServiceFailure> {
    try {
      let cookies = nookies.get(undefined, 'access_token');

      var myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);

      console.log(obj["serviceId"])

      var raw = JSON.stringify({
        name: obj["dataService"]["name"],
        service_category_id: obj["dataService"]["service_category_id"],
        description: obj["dataService"]["description"],
        conditions: obj["dataService"]["conditions"],
        base_price: obj["dataService"]["base_price"],
        status: obj["dataService"]["status"],
        // location: obj["dataService"]["location"],
        // location_id: obj["dataService"]["locationId"],
      });

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      } as RequestInit;

      let URL = UPDATE_USER_SERVICE_ENDPOINT(obj["serviceId"] as number) as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      console.log("UPDATE_USER_SERVICE_ENDPOINT", data["data"])

      return data["data"]["id"] ?? 0;
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new ServiceFailure(serviceFailuresEnum.serverError);
    }
  }

  async deleteService(id:number, userId:number): Promise<number | ServiceFailure> {
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

      let URL = DELETE_USER_SERVICE_ENDPOINT(userId, id) as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      console.log("DELETE_USER_SERVICE_ENDPOINT", data["data"])

      return data["data"]["id"] ?? 0;
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new ServiceFailure(serviceFailuresEnum.serverError);
    }
  }
  
  async addServiceToLocality(obj:any): Promise<any | ServiceFailure> {
    try {
      let cookies = nookies.get(undefined, 'access_token');

      var myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);

      var raw = JSON.stringify({
        service_id: obj["service_id"],
        location_id: obj["location_id"],
        price: obj["price"]
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      } as RequestInit;

      let URL = ADD_SERVICE_TO_LOCATION_ENDPOINT as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      console.log("ADD_SERVICE_TO_LOCATION_ENDPOINT", data["data"])

      return data["data"] ?? {};
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new ServiceFailure(serviceFailuresEnum.serverError);
    }
  }

  async getLocalitiesToService(serviceId: number): Promise<Array<IServiceToLocality> | ServiceFailure> {
    try {
      const res = await supabase.from("ServiciosPorLocalidades").select("*", { count: "exact" }).eq("servicioId", serviceId);

      const localities: IServiceToLocality[] = [];

      if (res.data && res.data.length > 0) {
        await Promise.all(res.data.map(async (data: any) => {
          const localitieMap: IServiceToLocality = serviceToLocalitiesSupabaseToMap(data);

          localities.push(localitieMap);
      }));
      }
      return localities;
    } catch (error) { 
      const exception = error as any;
      return new ServiceFailure(serviceFailuresEnum.serverError);
    }

  }
}
