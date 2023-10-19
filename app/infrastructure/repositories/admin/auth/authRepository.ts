import { createClient, SignInWithPasswordCredentials, User } from '@supabase/supabase-js';
import { supabase } from 'infrastructure/config/supabase/supabase-client';
import nookies from 'nookies';
import { AuthFailure, authFailuresEnum } from 'domain/core/failures/auth/authFailure';
import { ADMIN_AUTH_ENDPOINT, ADMIN_GET_USER_ENDPOINT, CHECK_OTP_ENDPOINT, UPDATE_USER_OTP_ENDPOINT } from 'infrastructure/config/api/dictionary';
import { userAPIToMap } from 'domain/mappers/user/userMapper';
import { IAdmin } from 'domain/core/entities/adminEntity';
import { adminAPIToMap } from 'domain/mappers/admin/adminMapper';

export default interface IAuthRepository {
  signInUser(obj: {
    email: string;
    password: string;
  }): Promise<string | AuthFailure>;
  getUserAuthenticatedWithToken(obj: { accessToken: string }): Promise<IAdmin | AuthFailure>
  getUserAuthenticated(): Promise<IAdmin | AuthFailure>;
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

      let URL = ADMIN_AUTH_ENDPOINT as RequestInfo

      const response = await fetch(URL, requestOptions)

      if (response.status >= 500) return new AuthFailure(authFailuresEnum.serverError);

      let data = await response.json()

      if(!data["meta"]["success"]) return new AuthFailure(data["meta"]["error"]["type"]);

      let access_token = data["data"]["access_token"] ?? ""
      
      nookies.set(undefined, 'admin.access_token', access_token, { path: '/' });

      return "SUCCESS";
    } catch (error) {
      const exception = error as any;

      if (exception.name === "AbortError") return new AuthFailure(authFailuresEnum.badGateway);

      return new AuthFailure(authFailuresEnum.serverError);
    }
  }

  async getUserAuthenticated(): Promise<IAdmin | AuthFailure> {
    try {  
      let obj = nookies.get(undefined, 'admin.access_token');

      if (!obj.access_token || obj?.access_token?.length === 0) return new AuthFailure(authFailuresEnum.userNotFound);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${obj["admin.access_token"]}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      } as RequestInit;

      let URL = ADMIN_GET_USER_ENDPOINT as RequestInfo

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

  async getUserAuthenticatedWithToken(obj: { accessToken: string }): Promise<IAdmin | AuthFailure> {
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

      let URL = ADMIN_GET_USER_ENDPOINT as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      if (response.status === 401) return new AuthFailure(authFailuresEnum.tokenExpired); 

      if(!data["meta"]["success"]) return new AuthFailure(data["meta"]["error"]["type"]);
      
      let parsedObject = JSON.parse(JSON.stringify(data["data"]))
      let userMapped = adminAPIToMap(parsedObject)
      
      console.log("JSON.parse", userMapped)

      return JSON.parse(JSON.stringify(userMapped));
    } catch (error) {
      return new AuthFailure(authFailuresEnum.serverError);
    }
  }

  async signOutUser(): Promise<boolean | AuthFailure> {
    try {
      // await supabase.auth.signOut();

      nookies.set(undefined, 'admin.access_token', '', { path: '/' });
      window.localStorage.removeItem("prosit.provider.session.admin")

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
      
      nookies.set(undefined, 'admin.access_token', access_token, { path: '/' });

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