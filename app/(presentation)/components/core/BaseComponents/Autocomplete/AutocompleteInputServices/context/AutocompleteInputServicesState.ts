import { IServiceCategory } from "domain/core/entities/serviceEntity";
import { ServiceFailure } from "domain/core/failures/service/serviceFailure";

export interface IAutocompleteInputServicesState {
    servicesCategories: IGetServicesCategoriesState;
}

interface IGetServicesCategoriesState {
    data: IServiceCategory[];
    loading: boolean;
    successful: boolean;
    error: ServiceFailure | null; 
}

export const initialState: IAutocompleteInputServicesState = {
    servicesCategories: {
        data: [] as IServiceCategory[],
        loading: false,
        successful: false,
        error: null,
    },
}