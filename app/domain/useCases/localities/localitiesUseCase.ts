import { LocalityFailure } from './../../core/failures/locality/localityFailure';
import { ILocality } from './../../core/entities/localityEntity';
import { LocalitiesRepository } from "infrastructure/repositories/localities/localitiesRepository";

export default class LocalitiesUseCase {
    private _repository: LocalitiesRepository = new LocalitiesRepository();
    
    async getMedicalCenters(): Promise<Array<ILocality>> {
        try {
            const response = await this._repository.getMedicalCenters();
  
            if (response instanceof LocalityFailure) throw response;
  
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getCountryStates(): Promise<Array<any>> {
        try {
            const response = await this._repository.getCountryStates();
  
            if (response instanceof LocalityFailure) throw response;
  
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getUserLocalities(id:number): Promise<Array<ILocality>> {
        try {
            const response = await this._repository.getUserLocalities(id);
  
            if (response instanceof LocalityFailure) throw response;
  
            return response;
        } catch (error) {
            throw error;
        }
    }

    async createUserLocality(obj:any, services: any[]): Promise<string> {
        try {
            const response: any = await this._repository.createUserLocality(obj, services);

            if (response instanceof LocalityFailure) throw response;
            
            if(obj["media"]["data"] !== "") await this._repository.addMediaLocality({...obj["media"], id: obj["id"]}, response.id);
  
            return response;
        } catch (error) {
            throw error;
        }
    }

    async updateUserLocality(obj:any, id:number, services: any[]): Promise<string> {
        try {
            const response: any = await this._repository.updateUserLocality(obj, id, services);
  
            if (response instanceof LocalityFailure) throw response;
            
            if(obj["media"]["data"] !== "") await this._repository.addMediaLocality({...obj["media"], id: obj["id"]}, response.id);
  
            return response;
        } catch (error) {
            throw error;
        }
    }

    async gettingUserLocality(id:number, userId:number): Promise<ILocality> {
        try {
            const localities = await this._repository.getUserLocalities(userId);

            let findedLocality = [...localities as Array<ILocality>].find(elem => elem["id"] === id)
      
            if (localities instanceof LocalityFailure) throw localities;
            if (findedLocality === undefined) throw LocalityFailure;

            console.log(findedLocality)

            return findedLocality;
        } catch (error) {
            throw error;
        }
    }
}
