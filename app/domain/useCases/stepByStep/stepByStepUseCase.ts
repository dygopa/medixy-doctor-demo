import { IUser } from 'domain/core/entities/userEntity';
import { AuthFailure } from 'domain/core/failures/auth/authFailure';
import { StepByStepRepository } from 'infrastructure/repositories/stepByStep/stepByStepRepository';

export default class StepByStepUseCase {
    private _repository: StepByStepRepository = new StepByStepRepository();

    async createUserSteps(id:string, event: string): Promise<any> {
        try {
            const response = await this._repository.createUserSteps(id, event);

            if (response instanceof AuthFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }

    async getSteps(id:string): Promise<any> {
        try {
            const response = await this._repository.getSteps(id);

            if (response instanceof AuthFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }

}
