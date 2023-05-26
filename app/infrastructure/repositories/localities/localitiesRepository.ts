import { LocalityFailure, localityFailuresEnum } from './../../../domain/core/failures/locality/localityFailure';
import { ILocality } from "domain/core/entities/localityEntity";
import { ADD_MEDIA_LOCALITY_ENDPOINT, CREATE_USER_LOCALITY_ENDPOINT, GET_COUNTRY_STATES_ENDPOINT, GET_MEDICAL_CENTERS_ENDPOINT, GET_USER_LOCALITIES_ENDPOINT, UPDATE_USER_LOCALITY_ENDPOINT } from "infrastructure/config/api/dictionary";
import nookies from 'nookies';

export default interface ILocalitiesRepository {
  getMedicalCenters(): Promise<Array<ILocality> | LocalityFailure>;
  getUserLocalities(id:number): Promise<Array<ILocality> | LocalityFailure>;
  createUserLocality(obj:any): Promise<string | LocalityFailure>;
  updateUserLocality(obj:any): Promise<string | LocalityFailure>;
  addMediaLocality(obj:any): Promise<string | LocalityFailure>;
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

      let URL = GET_USER_LOCALITIES_ENDPOINT(id) as RequestInfo

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

  async createUserLocality(obj:any): Promise<string | LocalityFailure> {
    try {
      let cookies = nookies.get(undefined, 'access_token');

      var myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);

      var raw = JSON.stringify({
          name: obj["name"] ?? "",
          code: obj["code"] ?? "",
          clues: obj["clues"] ?? "",
          type: "CONSULTING_ROOM",
          address: obj["address"] ?? "",
          postal_code: obj["postal_code"] ?? "",
          state_id: obj["state_id"] ?? 0,
          city: obj["city"] ?? "",
          latitude: obj["latitude"] ?? 0,
          longitude: obj["longitude"] ?? 0
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      } as RequestInit;

      let URL = CREATE_USER_LOCALITY_ENDPOINT(obj["id"] as number) as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      console.log("CREATE_USER_LOCALITY_ENDPOINT", data["data"])

      return data["data"] ?? [];
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new LocalityFailure(localityFailuresEnum.serverError);
    }
  }

  async updateUserLocality(obj:any): Promise<string | LocalityFailure> {
    try {
      let cookies = nookies.get(undefined, 'access_token');

      var myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);

      var raw = JSON.stringify({
          name: obj["name"] ?? "",
          code: obj["code"] ?? "",
          clues: obj["clues"] ?? "",
          address: obj["address"] ?? "",
          postal_code: obj["postal_code"] ?? "",
          state: obj["state"] ?? "",
          city: obj["city"] ?? "",
          latitude: obj["latitude"] ?? 0,
          longitude: obj["longitude"] ?? 0
      });

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      } as RequestInit;

      let URL = UPDATE_USER_LOCALITY_ENDPOINT(obj["id"]) as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      console.log("UPDATE_USER_LOCALITY_ENDPOINT", data["data"])

      return data["data"] ?? [];
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new LocalityFailure(localityFailuresEnum.serverError);
    }
  }

  async addMediaLocality(obj:any): Promise<string | LocalityFailure> {
    try {
      let cookies = nookies.get(undefined, 'access_token');

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
      let data = await response.json()

      console.log("ADD_MEDIA_LOCALITY_ENDPOINT", data["data"])

      return data["data"] ?? "";
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new LocalityFailure(localityFailuresEnum.serverError);
    }
  }

}
