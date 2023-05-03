import { IUser } from 'domain/core/entities/userEntity';
import { RegisterFailure } from 'domain/core/failures/register/registerFailure';
import { RegisterRepository } from 'infrastructure/repositories/register/registerRepository';

export default class AuthUseCase {
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
}
