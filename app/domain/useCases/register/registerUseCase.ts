import { RegisterFailure } from 'domain/core/failures/register/registerFailure';
import { AuthRepository } from 'infrastructure/repositories/auth/authRepository';
import { RegisterRepository } from 'infrastructure/repositories/register/registerRepository';

export default class AuthUseCase {
  private _authRepository: AuthRepository = new AuthRepository();
  private _repository: RegisterRepository = new RegisterRepository();

  async registerUser(obj:any): Promise<any> {
    try {
      const response = await this._repository.registerUser(obj);

      if (response instanceof RegisterFailure) throw response;

      return response;
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
