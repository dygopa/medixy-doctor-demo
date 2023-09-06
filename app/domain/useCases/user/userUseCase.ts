import { IUser } from "domain/core/entities/userEntity";
import { UserFailure } from "domain/core/failures/user/userFailure";
import { IGetUsersResponse } from "domain/core/response/usersResponse";
import { AuthRepository } from "infrastructure/repositories/auth/authRepository";
import { UserRepository } from "infrastructure/repositories/user/userRepository";

export default class UserUseCase {
  private _repository: UserRepository = new UserRepository();
  private _authRepository: AuthRepository = new AuthRepository();
  
  async editUser(user:any): Promise<string> {
    try {
      const response = await this._repository.editUser(user);

      if (response instanceof UserFailure) throw response;
      
      await this._authRepository.getUserFromAPI({accessToken: ""});
      await this._authRepository.getUserAuthenticated();

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

  async getDoctors(obj: { skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined}): Promise<IGetUsersResponse> {
    try {
      const response = await this._repository.getDoctors({
        skip: obj.skip,
        sort: obj.sort,
        limit: obj.limit,
        searchQuery: obj.searchQuery
      });

      if (response instanceof UserFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getDoctorsCount(obj: { limit?: number | undefined; searchQuery?: string | undefined}): Promise<number> {
    try {
      const response = await this._repository.getDoctorsCount({
        limit: obj.limit,
        searchQuery: obj.searchQuery
      });

      if (response instanceof UserFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getDoctorById(doctorId: number): Promise<IUser> {
    try {
      const response = await this._repository.getDoctorById(doctorId);

      if (response instanceof UserFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
