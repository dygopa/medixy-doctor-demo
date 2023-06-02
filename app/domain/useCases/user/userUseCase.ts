import { IUser } from "domain/core/entities/userEntity";
import { UserFailure } from "domain/core/failures/user/userFailure";
import { IGetUsersResponse } from "domain/core/response/usersResponse";
import { UserRepository } from "infrastructure/repositories/user/userRepository";

export default class UserUseCase {
  private _repository: UserRepository = new UserRepository();
  
  async editUser(user:any): Promise<string> {
    try {
      const response = await this._repository.editUser(user);

      if (response instanceof UserFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateAvatar(obj:any, doctorId: string): Promise<string> {
    try {
      const response = await this._repository.updateAvatar(obj, doctorId);

      if (response instanceof UserFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
  
  async getMedicalSpecialities(): Promise<Array<any>> {
    try {
      const response = await this._repository.getMedicalSpecialities();

      if (response instanceof UserFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
  
  async getUserMedicalSpecialities(id:number): Promise<Array<any>> {
    try {
      const response = await this._repository.getUserMedicalSpecialities(id);
  
      if (response instanceof UserFailure) throw response;
  
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createMedicalSpeciality(obj:any): Promise<Array<any>> {
    try {
      const response = await this._repository.createMedicalSpeciality(obj);
  
      if (response instanceof UserFailure) throw response;
  
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateMedicalSpeciality(obj:any): Promise<Object> {
    try {
      const response = await this._repository.updateMedicalSpeciality(obj);
  
      if (response instanceof UserFailure) throw response;
  
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteMedicalSpeciality(obj:any): Promise<Object> {
    try {
      const response = await this._repository.deleteMedicalSpeciality(obj);
  
      if (response instanceof UserFailure) throw response;
  
      return response;
    } catch (error) {
      throw error;
    }
  }
}
