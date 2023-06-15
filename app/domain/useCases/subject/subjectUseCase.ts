import { ISubject } from "domain/core/entities/subjectEntity";
import { IPoints } from "domain/core/entities/pointsEntity";
import { SubjectFailure } from "domain/core/failures/subject/subjectFailure";
import { PointFailure } from "domain/core/failures/point/pointFailure";
import { ICreateSubjectResponse, IGetSubjectsResponse } from "domain/core/response/subjectsResponse";
import { SubjectRepository } from "infrastructure/repositories/subject/subjectRepository";

export default class SubjectsUseCase {
  private _repository: SubjectRepository = new SubjectRepository();

  async getSubjects(obj: { skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined}): Promise<IGetSubjectsResponse> {
    try {
      const response = await this._repository.getSubjects({
        skip: obj.skip,
        sort: obj.sort,
        limit: obj.limit,
        searchQuery: obj.searchQuery
      });

      if (response instanceof SubjectFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getSubjectsComponions(obj: { skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; patientId?: number | undefined; typeRelation?: number | undefined}): Promise<IGetSubjectsResponse> {
    try {
      const response = await this._repository.getSubjectsCompanions({
        skip: obj.skip,
        sort: obj.sort,
        limit: obj.limit,
        searchQuery: obj.searchQuery,
        patientId: obj.patientId,
        typeRelation: obj.typeRelation,
      });

      if (response instanceof SubjectFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getSubjectById(patientId: number): Promise<ISubject> {
    try {
      const response = await this._repository.getSubjectById(patientId);

      if (response instanceof SubjectFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getSubjectsPoints(obj: { country?: string }): Promise<IPoints> {
    try {
      const response = await this._repository.getSubjectsPoints({ country: obj.country });

      if (response instanceof PointFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createSubjects(patients: ISubject[]): Promise<boolean> {
    try {
      const response = await this._repository.createSubjects(patients);

      if (response instanceof SubjectFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async editSubject(patient: ISubject): Promise<boolean> {
    try {
      console.log(patient)
      const response = await this._repository.editSubject(patient);

      if (response instanceof SubjectFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createSubject(subject: ISubject): Promise<ISubject> {
    try {
      const res = await this._repository.createSubject(subject);

      if (res instanceof SubjectFailure) throw res;

     
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async createSubjectRelations(subjectPrimayId: number, subjectSecundaryId: number): Promise<boolean> {
    try {
      const response = await this._repository.createRelationSubject(subjectPrimayId, subjectSecundaryId);

      if (response instanceof SubjectFailure) throw response;

      return response
    } catch (error) {
      throw error;
    }
  }

  async exportSubjectsToCSV(obj: { skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; country?: string | undefined, startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<boolean> {
    try {
      const response = await this._repository.exportSubjectsToCSV({ skip: obj.skip, sort: obj.sort, searchQuery: obj.searchQuery, limit: obj.limit, country: obj.country, startDate: obj.startDate, endDate: obj.endDate });

      if (response instanceof SubjectFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
