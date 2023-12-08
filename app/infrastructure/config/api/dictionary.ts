import { ConfigEnviroment } from "../env/env";

export const GET_USER_ENDPOINT : string = new ConfigEnviroment().nextPublicAPIUrl + '/doctor/auth';
export const AUTH_ENDPOINT : string = new ConfigEnviroment().nextPublicAPIUrl + '/doctor/auth';
export const REGISTER_USER_ENDPOINT : string = new ConfigEnviroment().nextPublicAPIUrl + '/doctors';
export const UPDATE_PASSWORD_ENDPOINT : string = new ConfigEnviroment().nextPublicAPIUrl + '/doctor/auth/password';
export const UPDATE_USER_ENDPOINT = (id:number) => new ConfigEnviroment().nextPublicAPIUrl + `/doctor/${id}`;
export const UPDATE_AVATAR_ENDPOINT = (id:number) => new ConfigEnviroment().nextPublicAPIUrl + `/doctor/${id}/avatar`;
export const UPDATE_RESET_PASSWORD_ENDPOINT = () => new ConfigEnviroment().nextPublicAPIUrl + `/doctor/reset-password`;
export const GET_OTP_CODE = () => new ConfigEnviroment().nextPublicAPIUrl + `/doctor/otp`;
export const SEND_OTP_CODE = () => new ConfigEnviroment().nextPublicAPIUrl + `/doctor/otp/verify`;

export const ADMIN_GET_USER_ENDPOINT : string = new ConfigEnviroment().nextPublicAPIUrl + '/admin/auth';
export const ADMIN_AUTH_ENDPOINT : string = new ConfigEnviroment().nextPublicAPIUrl + '/admin/auth';

export const GET_MEDICAL_SPECIALITIES_ENDPOINT : string = new ConfigEnviroment().nextPublicAPIUrl + '/medical_specialty';
export const GET_USER_MEDICAL_SPECIALITIES_ENDPOINT = (id:number) => new ConfigEnviroment().nextPublicAPIUrl + `/doctor/${id}/medical_specialty`;
export const CREATE_MEDICAL_SPECIALITY_ENDPOINT = (id:number) => new ConfigEnviroment().nextPublicAPIUrl + `/doctor/${id}/medical_specialty`;
export const UPDATE_MEDICAL_SPECIALITY_ENDPOINT = (id:number, speciality_id:number) => new ConfigEnviroment().nextPublicAPIUrl + `/doctor/${id}/medical_specialty/${speciality_id}`;
export const DELETE_MEDICAL_SPECIALITY_ENDPOINT = (id:number, speciality_id:number) => new ConfigEnviroment().nextPublicAPIUrl + `/doctor/${id}/medical_specialty/${speciality_id}`;

export const GET_MEDICAL_CENTERS_ENDPOINT : string = new ConfigEnviroment().nextPublicAPIUrl + `/medical_center`;
export const GET_USER_LOCALITIES_ENDPOINT = (id:number, country: string) => new ConfigEnviroment().nextPublicAPIUrl + `/doctor/${id}/location/${country}`;
export const CREATE_USER_LOCALITY_ENDPOINT = (id:number) => new ConfigEnviroment().nextPublicAPIUrl + `/doctor/${id}/location/MEX`;
export const UPDATE_USER_LOCALITY_ENDPOINT = (locality_id:number) => new ConfigEnviroment().nextPublicAPIUrl + `/location/${locality_id}/MEX`;
export const ADD_MEDIA_LOCALITY_ENDPOINT = (locality_id:number) => new ConfigEnviroment().nextPublicAPIUrl + `/location/${locality_id}/media`;
export const GET_COUNTRY_STATES_ENDPOINT : string = new ConfigEnviroment().nextPublicAPIUrl + '/doctors';

export const GET_CATEGORIES_SERVICES_ENDPOINT : string = new ConfigEnviroment().nextPublicAPIUrl + `/service_category`;
export const GET_USER_SERVICES_ENDPOINT = (id:number) => new ConfigEnviroment().nextPublicAPIUrl + `/doctor/${id}/service`;
export const GET_USER_BASE_SERVICES_ENDPOINT = (id:number) => new ConfigEnviroment().nextPublicAPIUrl + `/doctor/${id}/service-base`;
export const CREATE_USER_SERVICE_ENDPOINT = (id:number) => new ConfigEnviroment().nextPublicAPIUrl + `/doctor/${id}/service`;
export const UPDATE_USER_SERVICE_ENDPOINT = (id:number) => new ConfigEnviroment().nextPublicAPIUrl + `/service/${id}`;
export const DELETE_USER_SERVICE_ENDPOINT = (id:number, service_id:number) => new ConfigEnviroment().nextPublicAPIUrl + `/doctor/${id}/service/${service_id}`;
export const ADD_SERVICE_TO_LOCATION_ENDPOINT : string = new ConfigEnviroment().nextPublicAPIUrl + `/service_in_location`;

export const UPDATE_USER_OTP_ENDPOINT : string = new ConfigEnviroment().nextPublicAPIUrl + `/doctor/auth`;
export const CHECK_OTP_ENDPOINT = (code:string) => new ConfigEnviroment().nextPublicAPIUrl + `/doctor/opt/${code}`;

export const CREATE_ATTENTION_WINDOW_ENDPOINT = (id:number) => new ConfigEnviroment().nextPublicAPIUrl + `/attention_window`;

export const RESCHEDULE_APPOINTMENT_ENDPOINT = (id:string) => new ConfigEnviroment().nextPublicAPIUrl + `/canceled_appointments/${id}`;
export const UNBLOCK_APPOINTMENT_ENDPOINT = (id:string) => new ConfigEnviroment().nextPublicAPIUrl + `/unlockeded_appointments/${id}`;
export const BLOCK_APPOINTMENT_ENDPOINT = (id:string) => new ConfigEnviroment().nextPublicAPIUrl + `/blockeded_appointments/${id}`;
export const CREATE_APPOINTMENT_ENDPOINT = () => new ConfigEnviroment().nextPublicAPIUrl + `/appointments`;
export const FINISHED_APPOINTMENT_ENDPOINT = (id:string) => new ConfigEnviroment().nextPublicAPIUrl + `/finished_appointments/${id}`;

export const UPDATE_SPECIALIST_ENDPOINT = (id:number) => new ConfigEnviroment().nextPublicAPIUrl + `/doctor/${id}`;

//Notifications
export const TEST_NOTIFICATION = new ConfigEnviroment().nextPublicAPIUrl + `/appointments`;
export const GET_NOTIFICATIONS = (userId: number | string | undefined) => new ConfigEnviroment().nextPublicAPIUrl + `/notifications/${userId}`;

export const GET_MEDICAL_CONSULTY_REPORT_ENDPOINT = (id:number, type: string) => new ConfigEnviroment().nextPublicAPIUrl + `/medical-consulties/${id}/report/${type}`;
export const GET_MEDICAL_RECORDS_REPORT_ENDPOINT = (id:number, type: string) => new ConfigEnviroment().nextPublicAPIUrl + `/medical-records/${id}/report/${type}`;
export const GET_TREATMENTS_REPORT_ENDPOINT = (id:number, type: string) => new ConfigEnviroment().nextPublicAPIUrl + `/treatments/${id}/report/${type}`;
