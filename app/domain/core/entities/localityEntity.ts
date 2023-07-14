export interface ILocality {
    id: number;
    name: string;
    code: string;
    type: string;
    clues: string;
    address: string;
    postal_code: number;
    state: IState;
    city: string;
    federativeEntityId?: number | null;
    municipalityId?: number | null;
    countryLocationId?: number | null;
    street?: string | null;
    isPublic: boolean;
    isVirtual: boolean;
    image_url: string;
    latitude: number;
    longitude: number;
}

export interface ILocalityService {
    service_id: number;
    location_id: number;
    price: number;
}

interface IState {
    id: number;
    name: string;
}
