import { Specialist } from "domain/core/entities/specialists/specialist";
import { SpecialtyFailure } from "domain/core/failures/specialty/specialtyFailure";
import { SpecialistsRepository } from "infrastructure/repositories/specialists/specialistsRepository";

export default class SpecialistsUseCase {
    private _repository: SpecialistsRepository = new SpecialistsRepository();
    
    async getSpecialist(id:number): Promise<Specialist> {
        try {
            const response = await this._repository.getSpecialist(id);
  
            if (response instanceof SpecialtyFailure) throw response;
  
            return response;
        } catch (error) {
            throw error;
        }
    }
    async getSpecialistLocalities(id:number): Promise<any[]> {
        try {
            const response = await this._repository.getSpecialistLocalities(id);
  
            if (response instanceof SpecialtyFailure) throw response;
  
            return response;
        } catch (error) {
            throw error;
        }
    }
    async editUser(user:any): Promise<string> {
        try {
            const response = await this._repository.editUser(user);
    
            if (response instanceof SpecialtyFailure) throw response;
    
            return response;
        } catch (error) {
            throw error;
        }
    }
    async updateAvatar(obj:any, doctorId: string): Promise<string> {
        try {
            const response = await this._repository.updateAvatar(obj, doctorId);
    
            if (response instanceof SpecialtyFailure) throw response;
    
            return response;
        } catch (error) {
            throw error;
        }
    }
    async updateProfileCompleted(userId: number, doctorId: number): Promise<boolean> {
        try {
            const response = await this._repository.updateProfileCompleted(userId, doctorId);
    
            if (response instanceof SpecialtyFailure) throw response;
    
            return response;
        } catch (error) {
            throw error;
        }
    }
}