import { OTPFailure } from "domain/core/failures/otp/otpFailure";
import { IGetOTPCodeResponse, ISendOTPCodeResponse } from "domain/core/response/otpResponse";
import { OTPRepository } from "infrastructure/repositories/otp/otpRepository";

export default class OTPUseCase {
    private _repository: OTPRepository = new OTPRepository();

    async getDoctorOTPCode(email: string): Promise<IGetOTPCodeResponse> {
        try {
            const response = await this._repository.getDoctorOTPCode(email);

            if (response instanceof OTPFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }

    async sendDoctorOTPCode(email: string, otp: string): Promise<ISendOTPCodeResponse> {
        try {
            const response = await this._repository.sendDoctorOTPCode(email, otp);

            if (response instanceof OTPFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }
}