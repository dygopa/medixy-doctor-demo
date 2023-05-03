export const GET_USER_ENDPOINT : string = process.env.NEXT_PUBLIC_API_URL + '/doctor/auth';
export const AUTH_ENDPOINT : string = process.env.NEXT_PUBLIC_API_URL + '/doctor/auth';
export const REGISTER_USER_ENDPOINT : string = process.env.NEXT_PUBLIC_API_URL + '/doctors';
export const UPDATE_USER_ENDPOINT = (id:number) => process.env.NEXT_PUBLIC_API_URL + `/doctor/${id}`;
export const UPDATE_AVATAR_ENDPOINT = (id:number) => process.env.NEXT_PUBLIC_API_URL + `/doctor/${id}/avatar`;

export const GET_MEDICAL_SPECIALITIES_ENDPOINT : string = process.env.NEXT_PUBLIC_API_URL + '/medical_specialty';
export const GET_USER_MEDICAL_SPECIALITIES_ENDPOINT = (id:number) => process.env.NEXT_PUBLIC_API_URL + `/doctor/${id}/medical_specialty`;
export const CREATE_MEDICAL_SPECIALITY_ENDPOINT = (id:number) => process.env.NEXT_PUBLIC_API_URL + `/doctor/${id}/medical_specialty`;
export const UPDATE_MEDICAL_SPECIALITY_ENDPOINT = (id:number, speciality_id:number) => process.env.NEXT_PUBLIC_API_URL + `/doctor/${id}/medical_specialty/${speciality_id}`;
export const DELETE_MEDICAL_SPECIALITY_ENDPOINT = (id:number, speciality_id:number) => process.env.NEXT_PUBLIC_API_URL + `/doctor/${id}/medical_specialty/${speciality_id}`;

export const GET_MEDICAL_CENTERS_ENDPOINT : string = process.env.NEXT_PUBLIC_API_URL + `/medical_center`;
export const GET_USER_LOCALITIES_ENDPOINT = (id:number) => process.env.NEXT_PUBLIC_API_URL + `/doctor/${id}/location`;
export const CREATE_USER_LOCALITY_ENDPOINT = (id:number) => process.env.NEXT_PUBLIC_API_URL + `/doctor/${id}/location`;
export const UPDATE_USER_LOCALITY_ENDPOINT = (locality_id:number) => process.env.NEXT_PUBLIC_API_URL + `/location/${locality_id}`;
export const ADD_MEDIA_LOCALITY_ENDPOINT = (locality_id:number) => process.env.NEXT_PUBLIC_API_URL + `/location/${locality_id}/media`;

export const GET_CATEGORIES_SERVICES_ENDPOINT : string = process.env.NEXT_PUBLIC_API_URL + `/service_category`;
export const GET_USER_SERVICES_ENDPOINT = (id:number) => process.env.NEXT_PUBLIC_API_URL + `/doctor/${id}/service`;
export const CREATE_USER_SERVICE_ENDPOINT = (id:number) => process.env.NEXT_PUBLIC_API_URL + `/doctor/${id}/service`;
export const UPDATE_USER_SERVICE_ENDPOINT = (id:number) => process.env.NEXT_PUBLIC_API_URL + `/service/${id}`;
export const DELETE_USER_SERVICE_ENDPOINT = (id:number, service_id:number) => process.env.NEXT_PUBLIC_API_URL + `/doctor/${id}/service/${service_id}`;
export const ADD_SERVICE_TO_LOCATION_ENDPOINT : string = process.env.NEXT_PUBLIC_API_URL + `/service_in_location`;