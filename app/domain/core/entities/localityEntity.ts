export interface ILocality {
    id: number;
    name: string;
    code: string;
    type: string;
    address: IAddressMexico;
    is_public: boolean;
    is_virtual: boolean;
    image_url: string;
    latitude: number;
    longitude: number;
}

export interface ILocalityService {
    id: number,
    service_id: number;
    location_id: number;
    price: number;
    service_parent_id?: number | null
}

export interface IAddressMexico {
    clues: string;
    address: string;
    postal_code: number;
    state: IState;
    city: string;
    federativeEntityId?: number | null;
    municipalityId?: number | null;
    countryLocation?: string | null;
    street?: string | null;
}

interface IState {
    id: number;
    name: string;
}
