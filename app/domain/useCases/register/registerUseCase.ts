import { RegisterFailure } from 'domain/core/failures/register/registerFailure';
import { AuthRepository } from 'infrastructure/repositories/auth/authRepository';
import { RegisterRepository } from 'infrastructure/repositories/register/registerRepository';

export default class AuthUseCase {
  private _authRepository: AuthRepository = new AuthRepository();
  private _repository: RegisterRepository = new RegisterRepository();

  async registerUser(obj:any, setToken: boolean): Promise<any> {
    try {
      const response = await this._repository.registerUser(obj, setToken);

      if (response instanceof RegisterFailure) throw response;
            
      await this._authRepository.getUserFromAPI({accessToken: ""});
      
      return response;
    } catch (error) {
      throw error;
    }
  }
  async updatePassword(obj:any): Promise<any> {
    try {
      const response = await this._repository.updatePassword(obj);

      if (response instanceof RegisterFailure) throw response;
      
      return "SUCCESS";
    } catch (error) {
      throw error;
    }
  }

  async signOut(): Promise<any> {
    try {
      const response = await this._authRepository.signOutUser();

      if (response instanceof RegisterFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
