import { IUser } from 'domain/core/entities/userEntity';
import { createClient, SignInWithPasswordCredentials, User } from '@supabase/supabase-js';
import { supabase } from 'infrastructure/config/supabase/supabase-client';
import nookies from 'nookies';
import { AuthFailure, authFailuresEnum } from 'domain/core/failures/auth/authFailure';
import { AUTH_ENDPOINT, CHECK_OTP_ENDPOINT, GET_USER_ENDPOINT, UPDATE_RESET_PASSWORD_ENDPOINT, UPDATE_USER_OTP_ENDPOINT } from 'infrastructure/config/api/dictionary';
import { redirect } from "next/navigation";
import { userAPIToMap } from 'domain/mappers/user/userMapper';

export default interface IAuthRepository {
  signInUser(obj: {
    email: string;
    password: string;
  }): Promise<string | AuthFailure>;
  getUserFromAPI(obj: { accessToken: string }): Promise<IUser | AuthFailure>;
  updateUserFCMToken(obj: { token: string | number; userId: string | number }): Promise<string | AuthFailure>;
  getUserAuthenticated(): Promise<IUser | AuthFailure>;
  signOutUser(): Promise<boolean | AuthFailure>;
  changePassword(obj: {
    currentPassword: string;
    newPassword: string;
  }): Promise<boolean | AuthFailure>;
  updatePasswordByEmail(obj: { email: string; password: string }): Promise<any | AuthFailure>;
}

export class AuthRepository implements IAuthRepository {
  async signInUser(obj: {
    email: string;
    password: string;
  }): Promise<string | AuthFailure> {
    try {
      const credentials: SignInWithPasswordCredentials = {
        email: obj.email,
        password: obj.password
      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(credentials);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        timeout: 9000
      } as RequestInit;

      let URL = AUTH_ENDPOINT as RequestInfo

      const response = await fetch(URL, requestOptions)

      if (response.status >= 500) return new AuthFailure(authFailuresEnum.serverError);

      let data = await response.json()

      if(!data["meta"]["success"]) return new AuthFailure(data["meta"]["error"]["type"]);

      let access_token = data["data"]["access_token"] ?? ""
      
      nookies.set(undefined, 'access_token', access_token, { path: '/' });

      return "SUCCESS";
    } catch (error) {
      const exception = error as any;

      if (exception.name === "AbortError") return new AuthFailure(authFailuresEnum.badGateway);

      return new AuthFailure(authFailuresEnum.serverError);
    }
  }

  async getUserFromAPI(obj: { accessToken: string }): Promise<IUser | AuthFailure> {
    try {
      let obj = nookies.get(undefined, 'access_token');

      if (!obj["access_token"] || obj["access_token"].length === 0) return new AuthFailure(authFailuresEnum.userNotFound);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${obj["access_token"]}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      } as RequestInit;

      let URL = GET_USER_ENDPOINT as RequestInfo

      const response = await fetch(URL, requestOptions)

      if (response.status === 401) {
        window.localStorage.removeItem("prosit.provider.session.user")
      }

      let data = await response.json()


      if(!data["meta"]["success"]) throw new AuthFailure(data["meta"]["error"]["type"]);

      let parsedObject = JSON.parse(JSON.stringify(data["data"]))
      let userMapped = userAPIToMap(parsedObject, data["meta"]["authentication"]["type"])


      window.localStorage.setItem("prosit.provider.session.user", JSON.stringify(userMapped))

      return userMapped;
    } catch (error) {
      console.log(error)
      return new AuthFailure(authFailuresEnum.serverError);
    }
  }

  async getUserAuthenticated(): Promise<IUser | AuthFailure> {
    try {  
      let obj = nookies.get(undefined, 'access_token');

      if (!obj.access_token || obj?.access_token?.length === 0) return new AuthFailure(authFailuresEnum.userNotFound);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${obj["access_token"]}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      } as RequestInit;

      let URL = GET_USER_ENDPOINT as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      if(!data["meta"]["success"]) return new AuthFailure(data["meta"]["error"]["type"]);

      let parsedObject = JSON.parse(JSON.stringify(data["data"]))
      let userMapped = userAPIToMap(parsedObject, data["meta"]["authentication"]["type"])

      console.log("JSON.parse", userMapped)

      return JSON.parse(JSON.stringify(userMapped));
    } catch (error) {
      return new AuthFailure(authFailuresEnum.serverError);
    }
  }

  async getUserAuthenticatedWithToken(obj: { accessToken: string }): Promise<IUser | AuthFailure> {
    try {  
      if (obj.accessToken.length === 0) return new AuthFailure(authFailuresEnum.notAuthenticated);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${obj.accessToken}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      } as RequestInit;

      let URL = GET_USER_ENDPOINT as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      if (response.status === 401) return new AuthFailure(authFailuresEnum.tokenExpired); 

      if(!data["meta"]["success"]) return new AuthFailure(data["meta"]["error"]["type"]);

      
      let parsedObject = JSON.parse(JSON.stringify(data["data"]))
      let userMapped = userAPIToMap(parsedObject, data["meta"]["authentication"]["type"])
      
      console.log("JSON.parse", userMapped)

      return JSON.parse(JSON.stringify(userMapped));
    } catch (error) {
      return new AuthFailure(authFailuresEnum.serverError);
    }
  }

  async signOutUser(): Promise<boolean | AuthFailure> {
    try {
      // await supabase.auth.signOut();

      nookies.set(undefined, 'access_token', '', { path: '/' });
      window.localStorage.removeItem("prosit.provider.session.user")
      window.localStorage.removeItem("prosit.access_token");

      return true;
    } catch (error) {
      const exception = error as any;
      return new AuthFailure(authFailuresEnum.serverError);
    }
  }

  async updateUserFCMToken(obj: { token: string | number; userId: string | number }): Promise<string | AuthFailure> {
    try {

      await supabase.from("Usuarios").update({
        mensajeriaWebToken: obj.token
      }).eq("id", obj.userId)

      return "SUCCESS";
    } catch (error) {
      const exception = error as any;
      return new AuthFailure(authFailuresEnum.serverError);
    }
  }

  async changePassword(obj: { currentPassword: string; newPassword: string }): Promise<boolean | AuthFailure> {
    try {
      const user = (await supabase.auth.getSession()).data.session?.user;
     
      if (!user) throw new Error("auth/user-not-found");

      await supabase.auth.updateUser({ password: obj.newPassword })

      return true;
    } catch (error) {
      const exception = error as any;
      return new AuthFailure(authFailuresEnum.serverError);
    }
  }

  async checkOTP(code:string): Promise<any | AuthFailure> {
    try {

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      } as RequestInit;

      let URL = CHECK_OTP_ENDPOINT(code) as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      if(!data["meta"]["success"]) throw new AuthFailure(data["meta"]["error"]["type"]);

      return data;
    } catch (error) {
      const exception = error as any;
      return new AuthFailure(authFailuresEnum.serverError);
    }
  }

  async updateUserOTP(obj: { email: string; password: string }): Promise<any | AuthFailure> {
    try {
      const credentials: SignInWithPasswordCredentials = {
        email: obj.email,
        password: obj.password
      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(credentials);

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      } as RequestInit;

      let URL = UPDATE_USER_OTP_ENDPOINT as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      if(!data["meta"]["success"]) throw new AuthFailure(data["meta"]["error"]["type"]);

      let access_token = data["data"]["access_token"] ?? ""
      
      nookies.set(undefined, 'access_token', access_token, { path: '/' });

      return "SUCCESS";
    } catch (error) {
      const exception = error as any;
      return new AuthFailure(authFailuresEnum.serverError);
    }
  }

  async updatePasswordByEmail(obj: { email: string; password: string; otp: string }): Promise<any | AuthFailure> {
    try {
      var myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        email: obj.email,
        password: obj.password,
        otp: obj.otp,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      } as RequestInit;

      let URL = UPDATE_RESET_PASSWORD_ENDPOINT() as RequestInfo

      const res = await fetch(URL, requestOptions);

      if (res.status >= 500) return new AuthFailure(authFailuresEnum.serverError);

      if (res.status >= 400) {
          let data = await res.json();

          const type = data?.detail?.meta?.error?.type ?? null;

          if (type === "EMAIL_NOT_FOUND") return new AuthFailure(authFailuresEnum.emailNotFound);

          if (type === "OTP_INVALID") return new AuthFailure(authFailuresEnum.otpInvalid);
      }

      return "SUCCESS"
    } catch (error) {
      const exception = error as any;
      return new AuthFailure(authFailuresEnum.serverError);
    }
  }
}