import { ServiceFailure } from './../../core/failures/service/serviceFailure';
import { ServicesRepository } from 'infrastructure/repositories/service/serviceRepository';
import { IService } from './../../core/entities/serviceEntity';

export default class ServiceUseCase {
  private _repository: ServicesRepository = new ServicesRepository();
    
  async getCategories(): Promise<Array<any>> {
    try {
      const response = await this._repository.getCategories();
      if (response instanceof ServiceFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getUserServices(id:number): Promise<Array<IService>> {
    try {
      const response = await this._repository.getUserServices(id);
      if (response instanceof ServiceFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getService(id:number, userId:number): Promise<IService> {
    try {

      console.log(id, userId)

      const services = await this._repository.getUserServices(userId);
      let findedService = [...services as Array<IService>].find(elem => elem["id"] === id)
      
      console.log(findedService)

      if (services instanceof ServiceFailure) throw services;
      if (findedService === undefined) throw ServiceFailure;

      return findedService;
    } catch (error) {
      throw error;
    }
  }

  async createUserService(obj:any, list:Array<any>): Promise<string> {
    try {
      list = list.map(elem => ({
        location_id: elem["location_id"],
        price: elem["price"]
      }))
      const response = await this._repository.createUserService({...obj, locations: list});

      if (response instanceof ServiceFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateService(obj:any): Promise<number> {
    try {
      const response = await this._repository.updateService(obj);

      if (response instanceof ServiceFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteService(id:number, userId:number): Promise<number> {
    try {
      const response = await this._repository.deleteService(id, userId);

      if (response instanceof ServiceFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }
}
