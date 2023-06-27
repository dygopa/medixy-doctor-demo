import nookies from 'nookies';
import { ScheduleFailure, scheduleFailuresEnum } from 'domain/core/failures/schedule/scheduleFailure';
import { CREATE_ATTENTION_WINDOW_ENDPOINT, GET_CATEGORIES_SERVICES_ENDPOINT, REGISTER_USER_ENDPOINT } from 'infrastructure/config/api/dictionary';
import { supabase } from 'infrastructure/config/supabase/supabase-client';
import moment from 'moment';
import { AppointmentEnum } from '(presentation)/(enum)/appointment/appointmentEnum';

export default interface IScheduleRepository {
    getCalendarEvents(id:number, serviceId:number, sinceDate:any, untilDate:any): Promise<any[] | ScheduleFailure>;
    getAppointments(id:number, date?:string, status?:number): Promise<any[] | ScheduleFailure>;
    getAttentionWindows(id:number): Promise<any[] | ScheduleFailure>;
    createAppointment(obj:any): Promise<any | ScheduleFailure>;
    getAttentionWindowsByService(id:number, date?:string): Promise<any[] | ScheduleFailure>;
    getListOfTimeBaseOnSpan(): Promise<any[] | ScheduleFailure>;
    getListOfAvailableHours(): Promise<any[] | ScheduleFailure>;
    createWindowAttention(obj:any): Promise<any | ScheduleFailure>;
}

export class ScheduleRepository implements IScheduleRepository {
    
    async getCalendarEvents(id:number, serviceId:number, sinceDate:any, untilDate:any): Promise<any[] | ScheduleFailure> {
        try {
            
            let query = supabase.from("VentanasAtencion").select(`
                *,
                Citas (
                    *, 
                    Sujetos(
                        nombres,
                        primerApellido,
                        segundoApellido,
                        curp,
                        email,
                        fechaNacimiento,
                        sexo,
                        telefono,
                        ciudad,
                        direccion,
                        avatar
                    ),
                    Servicios (
                        nombre
                    )
                )
            `).eq("servicioId", serviceId)

            let res = await query
            
            let list = res.data?.map((elem:any)=> [...elem["Citas"]] )
            
            let listOfDates:any = []
            listOfDates = listOfDates.concat(...list!)
            //list = list!.map((elem:any)=> [...elem] )
            
            return listOfDates ?? [];
        } catch (error) {
            const exception = error as any;
            return new ScheduleFailure(scheduleFailuresEnum.serverError);
        }
    }

    async getAppointments(id:number, date?:string, status?:number): Promise<any[] | ScheduleFailure> {
        try {
            let query = supabase.from("Citas").select(`
            *,
            Servicios (
                nombre
            ),
            Sujetos (
              nombres,
              primerApellido,
              segundoApellido,
              curp,
              email,
              fechaNacimiento,
              sexo,
              telefono,
              ciudad,
              direccion,
              avatar
            )
          `).eq("doctorId", id).order("fechaReserva", { ascending: true })
            let res = await query
            
            let list = res.data!.map((elem:any)=>({
                ...elem["Servicios"],
                ...elem["Sujetos"],
                doctorId: elem["doctorId"],
                estado: parseInt(elem["estado"]),
                fechaCreacion: elem["fechaCreacion"],
                fechaReserva: elem["fechaReserva"],
                id: elem["id"],
                observaciones: elem["observaciones"],
                sujetoId: elem["sujetoId"],
                servicioId: elem["servicioId"],
            }))

            if(date){
                list = list.filter(elem => moment(elem["fechaReserva"]).format("YYYY-MM-DD") === date )
            }
            
            if(status){
                list = list.filter(elem => elem["estado"] === status )
            }

            return list ?? [];
        } catch (error) {
            const exception = error as any;
            return new ScheduleFailure(scheduleFailuresEnum.serverError);
        }
    }

    async getAttentionWindows(id:number): Promise<any[] | ScheduleFailure> {
        try {
            let query = supabase.from("VentanasAtencion").select(`
                *,
                Servicios (
                    nombre
                )
            `).eq("servicioId", id)

            let res = await query

            return res.data ?? [];
        } catch (error) {
            const exception = error as any;
            return new ScheduleFailure(scheduleFailuresEnum.serverError);
        }
    }

    async createAppointment(obj:any): Promise<any | ScheduleFailure> {
        try {

            let appointment = {
                sujetoId: obj["pacienteId"],
                doctorId: obj["doctorId"],
                estado: AppointmentEnum.PENDING
            }

            let query = supabase.from("Citas")
            .update(appointment)
            .eq('id', obj["id"])

            let res = await query

            return res.data ?? {};
        } catch (error) {
            const exception = error as any;
            return new ScheduleFailure(scheduleFailuresEnum.serverError);
        }
    }

    async getAttentionWindowsByService(id:number, date?:string): Promise<any[] | ScheduleFailure> {
        try {

            let queryToGetFreeTypeAttentionWindows = supabase.from("VentanasAtencion").select(`
            *,
            Servicios (
                nombre
            )
            `).eq("servicioId", id).eq("tipo", 1)

            let queryToGetSlotsTypeAttentionWindows = supabase.from("VentanasAtencion").select(`
            *,
            Citas (*),
            Servicios (
                nombre
            )
            `).eq("servicioId", id).eq("tipo", 2)

            //if(date) query = query.eq("fechaInicio", date)

            let resFreeTypeAttentionWindows = await queryToGetFreeTypeAttentionWindows
            let resSlotsTypeAttentionWindows = await queryToGetSlotsTypeAttentionWindows
            
            let list:any[] = []

            if(resFreeTypeAttentionWindows.data?.length! > 0){
                resFreeTypeAttentionWindows.data?.forEach((elem:any)=>{
                    list.push({
                        id: elem["id"],
                        servicioId: elem["servicioId"],
                        fechaInicio: moment(elem["fechaReserva"]).format("DD-MM-YYYY"),
                        horaInicio: ["horaInicio"],
                        horaFin: ["horaFin"],
                        tipo: 1
                    })
                })
            }

            if(resSlotsTypeAttentionWindows.data?.length! > 0){
                let listOfSlots = resSlotsTypeAttentionWindows.data?.map((elem:any)=> [...elem["Citas"]] )
            
                let listOfDates:any = []
                listOfDates = listOfDates.concat(...listOfSlots!)
                listOfDates!.forEach((elem:any)=>{
                    list.push({
                        id: elem["id"],
                        servicioId: elem["servicioId"],
                        dateToFilter: moment(elem["fechaReserva"]).format("YYYY-MM-DD"),
                        fechaInicio: elem["fechaReserva"],
                        fechaFin: elem["fechaFinReserva"],
                        horaInicio: parseInt(moment(elem["fechaReserva"]).utc().format("HH:mm").split(":").join("")),
                        horaFin: parseInt(moment(elem["fechaFinReserva"]).utc().format("HH:mm").split(":").join("")),
                        tipo: 2,
                        disponible: elem["sujetoId"] !== null ? false : true
                    })
                })
            }

            list = list.filter((elem:any)=> elem["dateToFilter"] === date && elem["disponible"] === true)

            return list;
        } catch (error) {
            const exception = error as any;
            return new ScheduleFailure(scheduleFailuresEnum.serverError);
        }
    }

    async getListOfTimeBaseOnSpan(): Promise<any[] | ScheduleFailure> {
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

    async getListOfAvailableHours(): Promise<any[] | ScheduleFailure> {
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

    async createWindowAttention(obj:any): Promise<any | ScheduleFailure> {
        try {
            let cookies = nookies.get(undefined, 'access_token');

            var myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);

            let days = [...obj["daysRepeated"]].map((elem:any)=> elem["value"]).reduce((partialSum, a) => partialSum + a, 0)

            var raw = JSON.stringify({
                type: obj["type"],
                from_date: moment(obj["startDate"]).utc().format("YYYY-MM-DD"),
                until_date: moment(obj["until"]).utc().format("YYYY-MM-DD"),
                start_time: parseInt(obj["fromHour"]),
                end_time: parseInt(obj["toHour"]),
                appointment_period: obj["spanTime"],
                days: days,
                service_id: obj["serviceId"]
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            } as RequestInit;

            let URL = CREATE_ATTENTION_WINDOW_ENDPOINT(obj["serviceId"]) as RequestInfo

            const response = await fetch(URL, requestOptions)
            let data = await response.json()
            
            return data["data"] ?? {};
        } catch (error) {
            const exception = error as any;
            return new ScheduleFailure(scheduleFailuresEnum.serverError);
        }
    }
}