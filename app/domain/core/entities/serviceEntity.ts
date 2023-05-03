export interface IService {
    id: number,
    name: string,
    service_category_id: string,
    service_category: IServiceCategory,
    image_url: string,
    description: string,
    conditions: string,
    status: number,
    base_price: number
}

interface IServiceCategory {
    id: number,
    name: string
}