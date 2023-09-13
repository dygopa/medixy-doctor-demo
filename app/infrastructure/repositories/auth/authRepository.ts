import { IUser } from 'domain/core/entities/userEntity';
import { createClient, SignInWithPasswordCredentials, User } from '@supabase/supabase-js';
import { supabase } from 'infrastructure/config/supabase/supabase-client';
import nookies from 'nookies';
import { AuthFailure, authFailuresEnum } from 'domain/core/failures/auth/authFailure';
import { AUTH_ENDPOINT, CHECK_OTP_ENDPOINT, GET_USER_ENDPOINT, UPDATE_USER_OTP_ENDPOINT } from 'infrastructure/config/api/dictionary';
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
      let userMapped = userAPIToMap(parsedObject)

      window.localStorage.setItem("prosit.provider.session.user", JSON.stringify(userMapped))

      return userMapped;
    } catch (error) {
      return new AuthFailure(authFailuresEnum.serverError);
    }
  }

  async getUserAuthenticated(): Promise<IUser | AuthFailure> {
    try {  

      let obj = nookies.get(undefined, 'access_token');

      if (obj?.access_token?.length === 0) throw new AuthFailure(authFailuresEnum.userNotFound);
      if( !window.localStorage.getItem("prosit.provider.session.user") ) throw new AuthFailure(authFailuresEnum.userNotFound);

      let parsedObject = JSON.parse(window.localStorage.getItem("prosit.provider.session.user")!)

      return parsedObject;
    } catch (error) {
      return new AuthFailure(authFailuresEnum.serverError);
    }
  }

  async signOutUser(): Promise<boolean | AuthFailure> {
    try {
      // await supabase.auth.signOut();

      nookies.set(undefined, 'access_token', '', { path: '/' });
      window.localStorage.removeItem("prosit.provider.session.user")

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

  async updatePasswordByEmail(obj: { email: string; password: string }): Promise<any | AuthFailure> {
    try {
      const supabase = createClient("https://tokexynaxhnsroxlpatn.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRva2V4eW5heGhuc3JveGxwYXRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDg5MDk5OSwiZXhwIjoxOTk2NDY2OTk5fQ.EySZaRFwnxYgnoqqBEAriZyGBJdhjvtk_r33f4CtI3g", {
          auth: {
              autoRefreshToken: false,
              persistSession: false
          }
      });

      const users = await supabase.auth.admin.listUsers({
        perPage: 1000
      });

      let user: User = {} as User;

      if (users.data.users.length > 0) {
        for (let i = 0; i < users.data.users.length; i++) {
          if (users.data.users[i].email === obj.email) {
            user = users.data.users[i];
            break;
          }
        }
      }

      if (!user || !user.id) return new AuthFailure(authFailuresEnum.serverError);

      supabase.auth.admin.updateUserById(user.id, {
        password: obj.password
      });

      return "SUCCESS"
    } catch (error) {
      const exception = error as any;
      return new AuthFailure(authFailuresEnum.serverError);
    }
  }
}