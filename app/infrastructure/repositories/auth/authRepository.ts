import { IUser } from 'domain/core/entities/userEntity';
import { SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { supabase } from 'infrastructure/config/supabase/supabase-client';
import nookies from 'nookies';
import { getTokenMessaging } from 'infrastructure/config/firebase/firebase-client';
import { AuthFailure, authFailuresEnum } from 'domain/core/failures/auth/authFailure';
import { AUTH_ENDPOINT, CHECK_OTP_ENDPOINT, GET_USER_ENDPOINT, UPDATE_USER_OTP_ENDPOINT } from 'infrastructure/config/api/dictionary';
import { redirect } from "next/navigation";
import { userAPIToMap } from 'domain/mappers/user/userMapper';
export default interface IAuthRepository {
  signInUser(obj: {
    email: string;
    password: string;
  }): Promise<string | AuthFailure>;
  getUserAuthenticated(obj: { accessToken: string }): Promise<IUser | AuthFailure>;
  signOutUser(): Promise<boolean | AuthFailure>;
  changePassword(obj: {
    currentPassword: string;
    newPassword: string;
  }): Promise<boolean | AuthFailure>;
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
        redirect: 'follow'
      } as RequestInit;

      let URL = AUTH_ENDPOINT as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      if(!data["meta"]["success"]) throw new AuthFailure(data["meta"]["error"]["type"]);

      let access_token = data["data"]["access_token"] ?? ""
      
      nookies.set(undefined, 'access_token', access_token, { path: '/' });

      return "SUCCESS";
    } catch (error) {
      const exception = error as AuthFailure;
      return new AuthFailure(exception.code);
    }
  }

  async getUserAuthenticated(): Promise<IUser | AuthFailure> {
    try {      
      
      let obj = nookies.get(undefined, 'access_token');

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

      if(!data["meta"]["success"]) throw new AuthFailure(data["meta"]["error"]["type"]);

      let parsedObject = JSON.parse(JSON.stringify(data["data"]))
      console.log("JSON.parse", userAPIToMap(parsedObject))

      return userAPIToMap(parsedObject);
    } catch (error) {
      return new AuthFailure(authFailuresEnum.serverError);
    }
  }

  async signOutUser(): Promise<boolean | AuthFailure> {
    try {
      await supabase.auth.signOut();

      nookies.set(undefined, 'access_token', '', { path: '/' });
      redirect("/login")

      return true;
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
}