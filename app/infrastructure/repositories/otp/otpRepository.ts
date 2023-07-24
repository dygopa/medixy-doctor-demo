import { OTPFailure, otpFailuresEnum } from "domain/core/failures/otp/otpFailure";
import { IGetOTPCodeResponse, ISendOTPCodeResponse } from "domain/core/response/otpResponse";
import { GET_OTP_CODE, SEND_OTP_CODE } from "infrastructure/config/api/dictionary";

export default interface IOTPRepository {
  getDoctorOTPCode(email: string): Promise<IGetOTPCodeResponse | OTPFailure>;
  sendDoctorOTPCode(email: string, otp: string): Promise<ISendOTPCodeResponse | OTPFailure>;
}

export class OTPRepository implements IOTPRepository {
    async getDoctorOTPCode(email: string): Promise<IGetOTPCodeResponse | OTPFailure> {
      try {
        var myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
          email: email,
        });
  
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        } as RequestInit;
  
        let URL = GET_OTP_CODE() as RequestInfo
  
        const res = await fetch(URL, requestOptions);

        if (res.status >= 500) return new OTPFailure(otpFailuresEnum.serverError);

        if (res.status >= 400) {
            let data = await res.json();

            const type = data?.detail?.meta?.error?.type ?? null;

            if (type === "EMAIL_NOT_FOUND") return new OTPFailure(otpFailuresEnum.emailNotFound);
        }

        const response: IGetOTPCodeResponse = {
            data: true,
            metadata: {},
        }

        return JSON.parse(JSON.stringify(response));
      } catch (error) {
        const exception = error as any;
        return new OTPFailure(otpFailuresEnum.serverError);
      }
    }

    async sendDoctorOTPCode(email: string, otp: string): Promise<ISendOTPCodeResponse | OTPFailure> {
        try {
          var myHeaders = new Headers();
  
          myHeaders.append("Content-Type", "application/json");
    
          var raw = JSON.stringify({
            email: email,
            otp: otp,
          });
    
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          } as RequestInit;
    
          let URL = SEND_OTP_CODE() as RequestInfo
    
          const res = await fetch(URL, requestOptions);
  
          if (res.status >= 500) return new OTPFailure(otpFailuresEnum.serverError);
  
          if (res.status >= 400) {
              let data = await res.json();
  
              const type = data?.detail?.meta?.error?.type ?? null;
  
              if (type === "EMAIL_NOT_FOUND") return new OTPFailure(otpFailuresEnum.emailNotFound);

              if (type === "OTP_INVALID") return new OTPFailure(otpFailuresEnum.otpInvalid);
          }
  
          const response: ISendOTPCodeResponse = {
              data: true,
              metadata: {},
          }
  
          return JSON.parse(JSON.stringify(response));
        } catch (error) {
          const exception = error as any;
          return new OTPFailure(otpFailuresEnum.serverError);
        }
      }
}
  