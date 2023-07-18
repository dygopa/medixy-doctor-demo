import { ILocality, ILocalityService } from "./localityEntity";

export interface IService {
    id: number,
    name: string,
    service_category_id: string,
    service_category: IServiceCategory,
    image_url: string,
    description: string,
    conditions: string,
    status: number,
    base_price: number,
    locality: ILocality,
    localities: Array<ILocalityService>,
}

export interface IServiceToLocality {
    id: number,
    price: number,
    state: number,
    service_id: number;
    location_id: number;
}

interface IServiceCategory {
    id: number,
    name: string
}