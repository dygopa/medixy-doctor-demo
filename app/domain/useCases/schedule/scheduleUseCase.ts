import { ScheduleFailure } from 'domain/core/failures/schedule/scheduleFailure';
import { ScheduleRepository } from 'infrastructure/repositories/schedule/scheduleRepository';

export default class ScheduleUseCase {
  private _repository: ScheduleRepository = new ScheduleRepository();
      
  async getAppointments(): Promise<Array<any>> {
    try {
      const response = await this._repository.getAppointments();
      if (response instanceof ScheduleFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAttentionWindows(): Promise<Array<any>> {
    try {
      const response = await this._repository.getAttentionWindows();
      if (response instanceof ScheduleFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createAppointment(): Promise<any> {
    try {
      const response = await this._repository.createAppointment();
      if (response instanceof ScheduleFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAttentionWindowsByService(): Promise<Array<any>> {
    try {
      const response = await this._repository.getAttentionWindowsByService();
      if (response instanceof ScheduleFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createWindowAttention(): Promise<any> {
    try {
      const response = await this._repository.createWindowAttention();
      if (response instanceof ScheduleFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }

}
