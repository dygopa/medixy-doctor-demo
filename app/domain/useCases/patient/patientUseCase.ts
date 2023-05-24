import { IPatient } from "domain/core/entities/patientEntity";
import { IPoints } from "domain/core/entities/pointsEntity";
import { PatientFailure } from "domain/core/failures/patient/patientFailure";
import { PointFailure } from "domain/core/failures/point/pointFailure";
import { IGetPatientsResponse } from "domain/core/response/patientsResponse";
import { PatientRepository } from "infrastructure/repositories/patient/patientRepository";

export default class PatientsUseCase {
  private _repository: PatientRepository = new PatientRepository();

  async getPatients(obj: { skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined}): Promise<IGetPatientsResponse> {
    try {
      const response = await this._repository.getPatients({
        skip: obj.skip,
        sort: obj.sort,
        limit: obj.limit,
        searchQuery: obj.searchQuery
      });

      if (response instanceof PatientFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getPatientById(patientId: number): Promise<IPatient> {
    try {
      const response = await this._repository.getPatientById(patientId);

      if (response instanceof PatientFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getPatientsPoints(obj: { country?: string }): Promise<IPoints> {
    try {
      const response = await this._repository.getPatientsPoints({ country: obj.country });

      if (response instanceof PointFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createPatients(patients: IPatient[]): Promise<boolean> {
    try {
      const response = await this._repository.createPatients(patients);

      if (response instanceof PatientFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async editPatient(patient: IPatient): Promise<boolean> {
    try {
      console.log(patient)
      const response = await this._repository.editPatient(patient);

      if (response instanceof PatientFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createPatient(patient: IPatient): Promise<boolean> {
    try {
      const response = await this._repository.createPatient(patient);

      if (response instanceof PatientFailure) throw response;

      return response
    } catch (error) {
      throw error;
    }
  }

  async exportPatientsToCSV(obj: { skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; country?: string | undefined, startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<boolean> {
    try {
      const response = await this._repository.exportPatientsToCSV({ skip: obj.skip, sort: obj.sort, searchQuery: obj.searchQuery, limit: obj.limit, country: obj.country, startDate: obj.startDate, endDate: obj.endDate });

      if (response instanceof PatientFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
