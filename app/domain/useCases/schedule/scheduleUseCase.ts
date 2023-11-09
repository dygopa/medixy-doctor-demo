import { LocalityFailure } from 'domain/core/failures/locality/localityFailure';
import { SubjectFailure } from 'domain/core/failures/subject/subjectFailure';
import { ScheduleFailure } from 'domain/core/failures/schedule/scheduleFailure';
import { ServiceFailure } from 'domain/core/failures/service/serviceFailure';
import { IGetSubjectsResponse } from 'domain/core/response/subjectsResponse';
import { LocalitiesRepository } from 'infrastructure/repositories/localities/localitiesRepository';
import { SubjectRepository } from 'infrastructure/repositories/subject/subjectRepository';
import { ScheduleRepository } from 'infrastructure/repositories/schedule/scheduleRepository';
import { ServicesRepository } from 'infrastructure/repositories/service/serviceRepository';
import moment from 'moment';
import SubjectsUseCase from '../subject/subjectUseCase';
import { ISubject } from 'domain/core/entities/subjectEntity';
import { EmailRepository } from 'infrastructure/repositories/email/emailRepository';

export default class ScheduleUseCase {

  private _useCaseSubject = new SubjectsUseCase();

  private _repository: ScheduleRepository = new ScheduleRepository();
  private _repositoryLocalities: LocalitiesRepository = new LocalitiesRepository();
  private _repositorySubjects: SubjectRepository = new SubjectRepository();
  private _repositoryServices: ServicesRepository = new ServicesRepository();
  private _repositoryEmail: EmailRepository = new EmailRepository()
      
  async getCalendarEvents(id:number, localityId:number, sinceDate:any, untilDate:any, serviceId?:number): Promise<any[]> {
    try {
      const response = await this._repository.getCalendarEvents(id, localityId, sinceDate, untilDate, serviceId);
      if (response instanceof ScheduleFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }
      
  async getAppointments(id:number, dateStart?:string, dateEnd?:string, localityId?:number, onlySubjects?: boolean, serviceId?: number): Promise<any[]> {
    try {
      const response = await this._repository.getAppointments(id, dateStart, dateEnd, localityId, undefined, onlySubjects, serviceId);
      if (response instanceof ScheduleFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAttentionWindows(id:number, by?:string): Promise<Array<any>> {
    try {
      const response = await this._repository.getAttentionWindows(id, by);
      if (response instanceof ScheduleFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllAttentionWindows(doctorId:number, initialDate?: Date | null): Promise<Array<any>> {
    try {
      const response = await this._repository.getAllAttentionWindows(doctorId, initialDate);
      if (response instanceof ScheduleFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteAppointment(id:string): Promise<Array<any>> {
    try {
      const response = await this._repository.deleteAppointment(id);
      if (response instanceof ScheduleFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }
  
  async getBaseAttentionWindowsByLocality(id:number): Promise<Array<any>> {
    try {
      const response = await this._repository.getBaseAttentionWindowsByLocality(id);
      if (response instanceof ScheduleFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getServices(id:number): Promise<any[]> {
    try {
      const response = await this._repositoryServices.getUserServices(id);
      if (response instanceof ServiceFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getServicesByLocality(id:number, localityId: number): Promise<any[]> {
    try {
      const response = await this._repositoryServices.getServicesByLocality(id, localityId);
      if (response instanceof ServiceFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getServicesByAttentionWindow(attentionWindowId: string): Promise<any[]> {
    try {
      const response = await this._repositoryServices.getServicesByAttentionWindow(attentionWindowId);
      if (response instanceof ServiceFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getLocalites(id:number): Promise<any[]> {
    try {
      const response = await this._repositoryLocalities.getUserLocalities(id);
      if (response instanceof LocalityFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getLocalitiesWithServices(id:number): Promise<any[]> {
    try {
      const response = await this._repositoryLocalities.getUserLocalitiesWithServices(id);
      if (response instanceof LocalityFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getSubjects(obj: { userId?: number | string | undefined }): Promise<IGetSubjectsResponse> {
    try {
      const response = await this._repositorySubjects.getSubjects({
        userId: obj.userId
      });
      if (response instanceof SubjectFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createAppointment(obj:any, now?:boolean): Promise<any> {
    try {

      if(!obj["pacienteId"] || obj["pacienteId"] === 0){

        let patient = {
          subjectId: 0,
          name: obj["patient"]["name"],
          lastName: obj["patient"]["firstName"],
          motherLastName: "",
          curp: "",
          email: obj["patient"]["email"],
          pictureUrl: "",
          sex: 1,
          gender: 1,
          phoneNumber: "",
          country: "",
          federativeEntityId: null,
          municipalityId: null,
          countryLocationId: null,
          street: null,
          state: 0,
          address: "",
          city: "",
          postalCode: null,
          isPatient: true,
          birthDate: moment(obj["patient"]["dateBirth"]).format(),
          updatedOn: null,
          deletedOn: null,
          createdOn: moment().toDate(),
        } as ISubject

        const responsePatient = await this._useCaseSubject.createSubject(patient, obj["doctorId"])
        if (responsePatient instanceof ScheduleFailure) throw responsePatient;

        const response = await this._repository.createAppointment({
          ...obj,
          pacienteId: responsePatient.subjectId
        }, now);
        if (response instanceof ScheduleFailure) throw response;

        await this._repositoryEmail.sendAppointmentEmail({ patient: obj["patient"], doctor: obj["doctor"], date: obj["fechaReserva"], serviceName: obj["nombreServicio"], address: obj["direccion"] })

        return response;
      }else{

        const response = await this._repository.createAppointment(obj, now);
        if (response instanceof ScheduleFailure) throw response;

        await this._repositoryEmail.sendAppointmentEmail({ patient: obj["patient"], doctor: obj["doctor"], date: obj["fechaReserva"], serviceName: obj["nombreServicio"], address: obj["direccion"] })

        return response;
      }
      
    } catch (error) {
      throw error;
    }
  }

  async getAttentionWindowsByService(id:number, date?:string): Promise<Array<any>> {
    try {
      const response = await this._repository.getAttentionWindowsByService(id, date);
      if (response instanceof ScheduleFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async unblockSlotInAttentionWindow(id:string): Promise<any> {
    try {
      const response = await this._repository.unblockSlotInAttentionWindow(id);
      if (response instanceof ScheduleFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async blockSlotInAttentionWindow(id:string): Promise<any> {
    try {
      const response = await this._repository.blockSlotInAttentionWindow(id);
      if (response instanceof ScheduleFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getSlotsByAttentionWindow(id:string): Promise<any> {
    try {
      const response = await this._repository.getSlotsByAttentionWindow(id);
      if (response instanceof ScheduleFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createWindowAttention(obj:any): Promise<any> {
    try {

      let initialValue = 0;
      let days = [...obj["daysRepeated"] as any[]].map(elem => elem["value"]).reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
      )
      
      let typeUntil = obj["typeEnd"] === 1 ? 
        moment().add(1, "year").toDate() : 
        moment(obj["until"], "YYYY-MM-DD").toDate()

      obj = {
        ...obj,
        days,
        startDate: moment(obj["startDate"], "YYYY-MM-DD").toDate(),
        until: typeUntil
      }

      const response = await this._repository.createWindowAttention(obj);
      if (response instanceof ScheduleFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async rescheduleAppointment(obj: { appointmentId: any; newAppointmentId: any; isBlockAppointment: boolean }): Promise<any> {
    try {
      const response = await this._repository.rescheduleAppointment({ appointmentId: obj.appointmentId, newAppointmentId: obj.newAppointmentId, isBlockAppointment: obj.isBlockAppointment });

      if (response instanceof ScheduleFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getNextAttentionWindow(obj: { serviceId: number }): Promise<any | ScheduleFailure> {
    try {
      const response = await this._repository.getNextAttentionWindow({ serviceId: obj.serviceId });

      if (response instanceof ScheduleFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
