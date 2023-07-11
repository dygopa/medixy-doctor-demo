import { IUser } from 'domain/core/entities/userEntity';
import { SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { supabase } from 'infrastructure/config/supabase/supabase-client';
import nookies from 'nookies';
import { RegisterFailure, registerFailuresEnum } from 'domain/core/failures/register/registerFailure';
import { REGISTER_USER_ENDPOINT } from 'infrastructure/config/api/dictionary';
import { IRegister } from 'domain/core/entities/registerEntity';

export default interface IRegisterRepository {
  registerUser(obj: any): Promise<string | RegisterFailure>;
}

export class RegisterRepository implements IRegisterRepository {
  async registerUser(obj:IRegister): Promise<string | RegisterFailure> {
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

          nookies.set(undefined, 'access_token', access_token, { path: '/' });

          return "SUCCESS";
        }

        return new RegisterFailure(type);
      }
      
      if(!data["meta"]["success"]) throw new RegisterFailure(data["meta"]["error"]["type"]);

      let access_token = data["meta"]["authentication"]["access_token"] ?? ""

      nookies.set(undefined, 'access_token', access_token, { path: '/' });
      return "SUCCESS";
    } catch (error) {
      console.log(error)
      const exception = error as RegisterFailure;
      return new RegisterFailure(exception.code);
    }
  }
}