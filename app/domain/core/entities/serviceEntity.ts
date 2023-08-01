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
    location: ILocality,
    location_id: number,
}

export interface IServiceToLocality {
    id: number,
    price: number,
    state: number,
    service_id: number;
    location_id: number;
}

export interface IServiceCategory {
    id: number,
    name: string
    doctorId?: number | null;
}
