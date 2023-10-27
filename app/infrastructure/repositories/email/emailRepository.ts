import { EmailFailure, emailFailuresEnum } from "domain/core/failures/email/emailFailure";

export default interface IEmailRepository {
    sendAppointmentEmail(obj: { patient: any; doctor: any; date: Date; serviceName: string; address: string }): Promise<boolean | EmailFailure>;
}

export class EmailRepository implements IEmailRepository {
  async sendAppointmentEmail(obj: { patient: any; doctor: any; date: Date; serviceName: string; address: string }): Promise<boolean | EmailFailure > {
    try {
        const raw =  JSON.stringify({
            fullnamePatient: obj.patient.name,
            fullnameDoctor: `${obj.doctor.names} ${obj.doctor.firstName}`,
            serviceName: obj.serviceName,
            date: obj.date,
            localityAddress: obj.address,
            email_to: obj.patient.email,
        })

      await fetch(`${window.location.origin}/api`, {
        method: "POST",
        body: raw,
      });

      return true;
    } catch (error) {
      const exception = error as any;
      return new EmailFailure(emailFailuresEnum.serverError);
    }
  }  
}