import { IUser } from 'domain/core/entities/userEntity';
import { SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { supabase } from 'infrastructure/config/supabase/supabase-client';
import nookies from 'nookies';
import { RegisterFailure, registerFailuresEnum } from 'domain/core/failures/register/registerFailure';
import { REGISTER_USER_ENDPOINT, UPDATE_PASSWORD_ENDPOINT } from 'infrastructure/config/api/dictionary';
import { IRegister } from 'domain/core/entities/registerEntity';

export default interface IRegisterRepository {
  registerUser(obj: any, setToken: boolean): Promise<string | RegisterFailure>;
  updatePassword(obj: any): Promise<string | RegisterFailure>;
}

export class RegisterRepository implements IRegisterRepository {
  async registerUser(obj:IRegister, setToken: boolean): Promise<string | RegisterFailure> {
    try {
      const credentials:IRegister = obj

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(credentials);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      } as RequestInit;

      let URL = REGISTER_USER_ENDPOINT as RequestInfo

      const response = await fetch(URL, requestOptions)

      if (response.status >= 500) return new RegisterFailure(registerFailuresEnum.badGateway)

      let data = await response.json()

      if (response.status >= 400) {
        const type = data?.detail?.meta?.error?.type ?? null;

        if (!type) return new RegisterFailure(registerFailuresEnum.serverError);

        if (type === "LOCATION_CREATED_ERROR" || type === "SERVICE_CREATED_ERROR") {
          const access_token = data?.detail?.meta?.authentication?.access_token ?? "";

          if (setToken) {
            nookies.set(undefined, 'access_token', access_token, { path: '/' });
          }

          return "SUCCESS";
        }

        return new RegisterFailure(type);
      }
      
      if(!data["meta"]["success"]) throw new RegisterFailure(data["meta"]["error"]["type"]);

      let access_token = data["meta"]["authentication"]["access_token"] ?? ""

      if (setToken) {
        nookies.set(undefined, 'access_token', access_token, { path: '/' });
      }

      return access_token;
    } catch (error) {
      console.log(error)
      const exception = error as RegisterFailure;
      return new RegisterFailure(exception.code);
    }
  }
  async updatePassword(obj: any): Promise<string | RegisterFailure> {
    try {
      let token = localStorage.getItem("prosit.access_token") ?? "";

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      var raw = JSON.stringify(obj);

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      } as RequestInit;

      let URL = UPDATE_PASSWORD_ENDPOINT as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      if(response.status >= 400) return new RegisterFailure(registerFailuresEnum.serverError)

      return "SUCCESS";
    } catch (error) {
      console.log(error)
      const exception = error as RegisterFailure;
      return new RegisterFailure(exception.code);
    }
  }
}