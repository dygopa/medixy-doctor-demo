import { AppointmentFailure } from "domain/core/failures/appointment/appintmentFailure";
import { IGetAppointmentResponse, IGetAppointmentsResponse } from "domain/core/response/appointmentsResponse";
import { AppointmentRepository } from "infrastructure/repositories/appointment/appointmentRepository";

export default class AppointmentUseCase {
  private _repository: AppointmentRepository = new AppointmentRepository();

  async getAppointments(obj: { skip?: number | null; sort?: any; limit?: number | null; subjectId?: number | null }): Promise<IGetAppointmentsResponse> {
    try {
      const response = await this._repository.getAppointment({
        skip: obj.skip,
        sort: obj.sort,
        limit: obj.limit,
        subjectId: obj.subjectId
      });

      if (response instanceof AppointmentFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAppointmentById(appointmentId: string): Promise<IGetAppointmentResponse> {
    try {
      const response = await this._repository.getAppointmentById(appointmentId);

      if (response instanceof AppointmentFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
