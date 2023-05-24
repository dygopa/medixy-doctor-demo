import nookies from 'nookies';
import { ScheduleFailure, scheduleFailuresEnum } from 'domain/core/failures/schedule/scheduleFailure';
import { GET_CATEGORIES_SERVICES_ENDPOINT, REGISTER_USER_ENDPOINT } from 'infrastructure/config/api/dictionary';

export default interface IScheduleRepository {
    getAppointments(): Promise<any[] | ScheduleFailure>;
    getAttentionWindows(): Promise<any[] | ScheduleFailure>;
    createAppointment(): Promise<any | ScheduleFailure>;
    getAttentionWindowsByService(): Promise<any[] | ScheduleFailure>;
    createWindowAttention(): Promise<any | ScheduleFailure>;
}

export class ScheduleRepository implements IScheduleRepository {
    
    async getAppointments(): Promise<any[] | ScheduleFailure> {
        try {
            let cookies = nookies.get(undefined, 'access_token');

            var myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            } as RequestInit;

            let URL = GET_CATEGORIES_SERVICES_ENDPOINT as RequestInfo

            const response = await fetch(URL, requestOptions)
            //let data = await response.json()
            let data = {data: []}

            return data["data"] ?? [];
        } catch (error) {
            const exception = error as any;
            return new ScheduleFailure(scheduleFailuresEnum.serverError);
        }
    }

    async getAttentionWindows(): Promise<any[] | ScheduleFailure> {
        try {
            let cookies = nookies.get(undefined, 'access_token');

            var myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            } as RequestInit;

            let URL = GET_CATEGORIES_SERVICES_ENDPOINT as RequestInfo

            const response = await fetch(URL, requestOptions)
            //let data = await response.json()
            let data = {data: []}

            return data["data"] ?? [];
        } catch (error) {
            const exception = error as any;
            return new ScheduleFailure(scheduleFailuresEnum.serverError);
        }
    }

    async createAppointment(): Promise<any | ScheduleFailure> {
        try {
            let cookies = nookies.get(undefined, 'access_token');

            var myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            } as RequestInit;

            let URL = GET_CATEGORIES_SERVICES_ENDPOINT as RequestInfo

            const response = await fetch(URL, requestOptions)
            //let data = await response.json()
            let data = {data: {}}

            return data["data"] ?? {};
        } catch (error) {
            const exception = error as any;
            return new ScheduleFailure(scheduleFailuresEnum.serverError);
        }
    }

    async getAttentionWindowsByService(): Promise<any[] | ScheduleFailure> {
        try {
            let cookies = nookies.get(undefined, 'access_token');

            var myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            } as RequestInit;

            let URL = GET_CATEGORIES_SERVICES_ENDPOINT as RequestInfo

            const response = await fetch(URL, requestOptions)
            //let data = await response.json()
            let data = {data: []}

            return data["data"] ?? {};
        } catch (error) {
            const exception = error as any;
            return new ScheduleFailure(scheduleFailuresEnum.serverError);
        }
    }

    async createWindowAttention(): Promise<any | ScheduleFailure> {
        try {
            let cookies = nookies.get(undefined, 'access_token');

            var myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            } as RequestInit;

            let URL = GET_CATEGORIES_SERVICES_ENDPOINT as RequestInfo

            const response = await fetch(URL, requestOptions)
            //let data = await response.json()
            let data = {data: {}}

            return data["data"] ?? {};
        } catch (error) {
            const exception = error as any;
            return new ScheduleFailure(scheduleFailuresEnum.serverError);
        }
    }
}