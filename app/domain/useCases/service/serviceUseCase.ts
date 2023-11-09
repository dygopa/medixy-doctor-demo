import { ServiceFailure } from './../../core/failures/service/serviceFailure';
import { ServicesRepository } from 'infrastructure/repositories/service/serviceRepository';
import { IService, IServiceCategory, IServiceToLocality } from './../../core/entities/serviceEntity';
import { ILocality, ILocalityService } from 'domain/core/entities/localityEntity';
import { ICreateServiceCategoryResponse } from 'domain/core/response/servicesResponse';
import { LocalityFailure } from 'domain/core/failures/locality/localityFailure';
import { LocalitiesRepository } from 'infrastructure/repositories/localities/localitiesRepository';

export default class ServiceUseCase {
  private _repository: ServicesRepository = new ServicesRepository();
  private _localityRepository: LocalitiesRepository = new LocalitiesRepository();
    
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

  async getUserBaseServices(id:number): Promise<Array<IService>> {
    try {
      const response = await this._repository.getUserBaseServices(id);
      if (response instanceof ServiceFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getService(id:number, userId:number): Promise<IService> {
    try {

      const services = await this._repository.getUserServices(userId);
      let findedService = [...services as Array<IService>].find(elem => elem["id"] === id)
      
      //console.log(findedService)

      if (services instanceof ServiceFailure) throw services;
      if (findedService === undefined) throw ServiceFailure;

      return findedService;
    } catch (error) {
      throw error;
    }
  }

  async getServiceByBase(id:number, userId:number): Promise<IService> {
    try {

      const services = await this._repository.getUserBaseServices(userId);
      let findedService = [...services as Array<IService>].find(elem => elem["id"] === id)
      
      //console.log(findedService)

      if (services instanceof ServiceFailure) throw services;
      if (findedService === undefined) throw ServiceFailure;

      return findedService;
    } catch (error) {
      throw error;
    }
  }

  async createUserService(obj:any): Promise<string> {
    try {
      const response: any = await this._repository.createUserService({...obj});

      console.log(response)

      if (response instanceof ServiceFailure) throw response;

      if(obj["media"]["data"] !== "" && obj["media"]["type"] !== "") await this._repository.addMediaService({...obj["media"], id: obj["id"]}, response.id);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateService(obj: {dataService: any; serviceId: number; servicesChildren: any[];}): Promise<number> {
    try {
      const response = await this._repository.updateService(obj);

      if (response instanceof ServiceFailure) throw response;

      obj.servicesChildren.map(async (elem) => {
        let res = await this._repository.updateService({
          dataService: elem,
          serviceId: elem.id,
        });

        if (res instanceof ServiceFailure) throw res;
      })

      if(obj["dataService"]["media"]["data"] !== "" && obj["dataService"]["media"]["type"] !== "") await this._repository.addMediaService({...obj["dataService"]["media"], id: obj["dataService"]["id"]}, obj.serviceId);
      
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

  async getLocalitiesToService(serviceId: number, userId: number): Promise<Array<any>> {
    try {

      const services = await this._repository.getServicesChildren(serviceId);

      if (services instanceof ServiceFailure) throw services;

      const localities = await this._localityRepository.getUserLocalities(userId);

      if (localities instanceof LocalityFailure) throw localities;

      let localitiesList: any[] = [];

      services.map((service: any) => {
        let findedLocality = [...localities as Array<ILocality>].find(elem => elem["id"] === service.location_id)
        
        if (findedLocality === undefined) throw LocalityFailure;
        
        localitiesList.push({...findedLocality, service})
      })

      return localitiesList;
    } catch (error) {
      throw error;
    }
  }

  async getCategoriesDoctor(doctorId: number, searchQuery?: string | null): Promise<Array<any>> {
    try {
      const response = await this._repository.getCategoriesDoctor(doctorId, searchQuery);
      if (response instanceof ServiceFailure) throw response;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createServiceCategory(obj: { serviceCategory: IServiceCategory }): Promise<ICreateServiceCategoryResponse> {
    try {
        const response = await this._repository.createServiceCategory(obj.serviceCategory);

        if (response instanceof ServiceFailure) throw response;

        return response;
    } catch (error) {
        throw error;
    }
  }
}
