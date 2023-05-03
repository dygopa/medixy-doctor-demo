import { IUser } from 'domain/core/entities/userEntity';
import { AuthFailure } from 'domain/core/failures/auth/authFailure';
import { AuthRepository } from 'infrastructure/repositories/auth/authRepository';

export default class AuthUseCase {
  private _repository: AuthRepository = new AuthRepository();

  async signInUser(obj: { email: string; password: string }): Promise<string> {
    try {
      const response = await this._repository.signInUser({
        email: obj.email,
        password: obj.password,
      });

      if (response instanceof AuthFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getUserAuthenticated(): Promise<IUser> {
    try {
      const response = await this._repository.getUserAuthenticated();

      if (response instanceof AuthFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async signOutUser(): Promise<boolean> {
    try {
      const response = await this._repository.signOutUser();

       if (response instanceof AuthFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(obj: { currentPassword: string; newPassword: string; }): Promise<boolean> {
    try {
      const response = await this._repository.changePassword({ currentPassword: obj.currentPassword, newPassword: obj.newPassword });

      if (response instanceof AuthFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
