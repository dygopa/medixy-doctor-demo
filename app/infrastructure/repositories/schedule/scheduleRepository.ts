import nookies from 'nookies';
import { ScheduleFailure, scheduleFailuresEnum } from 'domain/core/failures/schedule/scheduleFailure';
import { CREATE_ATTENTION_WINDOW_ENDPOINT, GET_CATEGORIES_SERVICES_ENDPOINT, REGISTER_USER_ENDPOINT, RESCHEDULE_APPOINTMENT_ENDPOINT } from 'infrastructure/config/api/dictionary';
import { supabase } from 'infrastructure/config/supabase/supabase-client';
import moment from 'moment';
import { AppointmentEnum } from '(presentation)/(enum)/appointment/appointmentEnum';

export default interface IScheduleRepository {
    getCalendarEvents(id:number, localityId:number, sinceDate:any, untilDate:any, serviceId?:number): Promise<any[] | ScheduleFailure>;
    getAppointments(id:number, dateStart?:string, dateEnd?:string, localityId?:number, status?:number): Promise<any[] | ScheduleFailure>;
    getAttentionWindows(id:number | null, by?:string | undefined): Promise<any[] | ScheduleFailure>;
    getBaseAttentionWindowsByLocality(id:number | null, by?:string | undefined): Promise<any[] | ScheduleFailure>;
    createAppointment(obj:any, now?:boolean): Promise<any | ScheduleFailure>;
    getAttentionWindowsByService(id:number, date?:string): Promise<any[] | ScheduleFailure>;
    createWindowAttention(obj:any): Promise<any | ScheduleFailure>;
    deleteAppointment(id:string ): Promise<any | ScheduleFailure>;
}

export class ScheduleRepository implements IScheduleRepository {
    
    async getCalendarEvents(id:number, localityId:number, sinceDate:any, untilDate:any, serviceId?:number): Promise<any[] | ScheduleFailure> {
        try {
            if(!untilDate.toString().includes("-")){
                sinceDate = moment().format("YYYY-MM-DD")
                untilDate = moment().add(7, "day").format("YYYY-MM-DD")
            }

            let queryOfServices = supabase.from("Servicios").select(`*`).eq("localidadId", localityId);

            let resServices = await queryOfServices
            
            if(resServices.data?.length === 0) return []

            let queryServiciosEnVentanasAtencion = supabase.from("ServiciosEnVentanasAtencion")
            .select(`*, VentanasAtencionBase(*)`).in("servicioId", resServices.data!.map((elem:any)=> elem["id"] ))

            let resServiciosEnVentanasAtencion = await queryServiciosEnVentanasAtencion
            
            if(resServiciosEnVentanasAtencion.data?.length === 0) return []

            let windowAttentionId = resServiciosEnVentanasAtencion.data![0]["ventanaAtencionBaseId"].toString()

            let queryVentanasAtencion = supabase.from("VentanasAtencion")
            .select(`*`).in("ventanaAtencionBaseId", resServiciosEnVentanasAtencion.data!.map((elem:any)=> elem["ventanaAtencionBaseId"] ))
            .filter('fechaInicio', 'gte', sinceDate).filter('fechaFin', 'lte', untilDate)
            
            let resVentanasAtencion = await queryVentanasAtencion

            if(resVentanasAtencion.data?.length === 0) return []

            let queryCitas = supabase.from("Citas").select(`
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
            `).in("ventanaAtencionId", resVentanasAtencion.data!.map((elem:any)=> elem["id"] ))
            
            let resCitas = await queryCitas

            return resCitas.data ?? [];
        } catch (error) {
            console.log(error)
            const exception = error as any;
            return new ScheduleFailure(scheduleFailuresEnum.serverError);
        }
    }

    async getAppointments(id:number, dateStart?:string, dateEnd?:string, localityId?:number, status?:number): Promise<any[] | ScheduleFailure> {
        try {
            
            console.log("id", localityId)
            console.log("date", dateStart)

            let queryOfServices = supabase.from("ServiciosDoctores").select(`*`).eq("doctorId", id);

            if(localityId !== undefined){
                console.log(localityId)
                queryOfServices = supabase.from("Servicios").select(`*`).eq("localidadId", localityId);
            }

            let resServices = await queryOfServices
            
            if(resServices.data?.length === 0 || resServices.data === null) return []
            
            console.log("resServices.data", resServices.data)
            
            let queryServiciosEnVentanasAtencion = supabase.from("ServiciosEnVentanasAtencion")
            .select(`*, VentanasAtencionBase(*)`).in("servicioId", resServices.data!.map((elem:any)=> elem["servicioId"] ))

            if(localityId !== undefined){
                queryServiciosEnVentanasAtencion = supabase.from("ServiciosEnVentanasAtencion")
                .select(`*, VentanasAtencionBase(*)`).in("servicioId", resServices.data!.map((elem:any)=> elem["id"] ))
            }

            let resServiciosEnVentanasAtencion = await queryServiciosEnVentanasAtencion
            
            if(resServiciosEnVentanasAtencion.data?.length === 0) return []
            console.log("resServiciosEnVentanasAtencion.data", resServiciosEnVentanasAtencion.data)

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
            `)
            .eq("doctorId", id)
            .in("servicioId", resServiciosEnVentanasAtencion.data!.map((elem:any)=> elem["servicioId"] ))
            .filter('fechaReserva', 'gte', moment(dateStart, "YYYY-MM-DD").format("YYYY-MM-DD"))
            .filter('fechaReserva', 'lte', moment(dateEnd, "YYYY-MM-DD").format("YYYY-MM-DD"))
            .order("fechaReserva", { ascending: true })
            let res = await query
            
            console.log("res.data.data", res.data)

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

            if(status){
                list = list.filter(elem => elem["estado"] === status )
            }

            return list ?? [];
        } catch (error) {
            console.log(error)
            const exception = error as any;
            return new ScheduleFailure(scheduleFailuresEnum.serverError);
        }
    }

    async getAttentionWindows(id:number | null, by?:string | undefined): Promise<any[] | ScheduleFailure> {
        try {
            if(by === "LOCALITY"){

                let queryOfServices = supabase.from("Servicios").select(`*`).eq("localidadId", id);
                        
                let resServices = await queryOfServices
                
                if(resServices.error) return new ScheduleFailure(scheduleFailuresEnum.serverError);
                
                if(resServices.data?.length === 0) return []

                let queryServiciosEnVentanasAtencion = supabase.from("ServiciosEnVentanasAtencion")
                .select(`*, VentanasAtencionBase(*)`).in("servicioId", resServices.data!.map((elem:any)=> elem["id"] ))

                let resServiciosEnVentanasAtencion = await queryServiciosEnVentanasAtencion

                if(resServiciosEnVentanasAtencion.data?.length === 0) return []

                let windowAttentionId = resServiciosEnVentanasAtencion.data![0]["ventanaAtencionBaseId"].toString()

                let queryVentanasAtencion = supabase.from("VentanasAtencion")
                .select(`
                    *,
                    Servicios (
                        nombre
                    )
                `).in("ventanaAtencionBaseId", resServiciosEnVentanasAtencion.data!.map((elem:any)=> elem["ventanaAtencionBaseId"] ))

                let resVentanasAtencion = await queryVentanasAtencion

                return resVentanasAtencion.data ?? []
            }

            let queryVentanasAtencion = supabase.from("VentanasAtencion")
            .select(`
                *,
                Servicios (
                    nombre
                )
            `).eq("ventanaAtencionBaseId", id)

            let resVentanasAtencion = await queryVentanasAtencion

            return resVentanasAtencion.data ?? []
        } catch (error) {
            const exception = error as any;
            return new ScheduleFailure(scheduleFailuresEnum.serverError);
        }
    }

    async getBaseAttentionWindowsByLocality(id:number | null): Promise<any[] | ScheduleFailure> {
        try {
            let queryOfServices = supabase.from("Servicios").select(`*`).eq("localidadId", id);
            
            let resServices = await queryOfServices
            
            if(resServices.error) return new ScheduleFailure(scheduleFailuresEnum.serverError);
            if(resServices.data?.length === 0) return []

            let queryServiciosEnVentanasAtencion = supabase.from("ServiciosEnVentanasAtencion")
            .select(`*, VentanasAtencionBase(*)`).in("servicioId", resServices.data!.map((elem:any)=> elem["id"] ))
            
            let resServiciosEnVentanasAtencion = await queryServiciosEnVentanasAtencion
            
            if(resServiciosEnVentanasAtencion.data?.length === 0) return []
            
            return resServiciosEnVentanasAtencion.data ?? []
        } catch (error) {
            const exception = error as any;
            return new ScheduleFailure(scheduleFailuresEnum.serverError);
        }
    }

    async createAppointment(obj:any, now?: boolean): Promise<any | ScheduleFailure> {
        try {
            if(now){
                let appointment = {
                    sujetoId: obj["pacienteId"],
                    doctorId: obj["doctorId"],
                    estado: AppointmentEnum.PENDING,
                    servicioId: obj["servicioId"],
                    fechaReserva: moment().toDate(),
                    fechaFinReserva: moment().add(30, "minutes").toDate(),
                }

                let query = supabase.from("Citas")
                .insert(appointment).select("*").single()
                
                let res = await query
    
                return res.data ?? {};
            }else{
                let appointment = {
                    sujetoId: obj["pacienteId"],
                    servicioId: obj["servicioId"],
                    doctorId: obj["doctorId"],
                    estado: AppointmentEnum.PENDING
                }

                let query = supabase.from("Citas")
                .update(appointment)
                .eq('id', obj["id"])

                let res = await query
    
                return res.data ?? {};
            }
        } catch (error) {
            const exception = error as any;
            return new ScheduleFailure(scheduleFailuresEnum.serverError);
        }
    }

    async getAttentionWindowsByService(id:number, date?:string): Promise<any[] | ScheduleFailure> {
        try {

            let queryServiciosEnVentanasAtencion = supabase.from("ServiciosEnVentanasAtencion")
            .select(`*, VentanasAtencionBase(*)`).eq("servicioId", id)

            let resServiciosEnVentanasAtencion = await queryServiciosEnVentanasAtencion

            if(resServiciosEnVentanasAtencion.data?.length === 0) return []

            let windowAttentionId = resServiciosEnVentanasAtencion.data![0]["ventanaAtencionBaseId"].toString()

            let endDate = moment(date, "YYYY-MM-DD").add(1, "day").format("YYYY-MM-DD")
            console.log(date)
            console.log(endDate)

            let queryVentanasAtencion = supabase.from("VentanasAtencion")
            .select(`*`).eq("ventanaAtencionBaseId", windowAttentionId)
            .filter('fechaInicio', 'gte', date)
            .filter('fechaFin', 'lte', endDate)
            
            let resVentanasAtencion = await queryVentanasAtencion
            console.log(resVentanasAtencion.data)

            if(resVentanasAtencion.data?.length === 0) return []

            let queryCitas = supabase.from("Citas").select(`*`)
            .in("ventanaAtencionId", resVentanasAtencion.data!.map((elem:any)=> elem["id"] ))

            let resCitas = await queryCitas

            console.log(resCitas.data)
            let list:any[] = []

            if(resCitas.data?.length! > 0){
                let listOfSlots = resCitas.data
                
                list = listOfSlots!.map((elem:any)=>({
                    id: elem["id"],
                    servicioId: elem["servicioId"],
                    dateToFilter: moment(elem["fechaReserva"]).format("YYYY-MM-DD"),
                    fechaInicio: elem["fechaReserva"],
                    fechaFin: elem["fechaFinReserva"],
                    horaInicio: parseInt(moment(elem["fechaReserva"]).utc().format("HH:mm").split(":").join("")),
                    horaFin: parseInt(moment(elem["fechaFinReserva"]).utc().format("HH:mm").split(":").join("")),
                    tipo: 2,
                    disponible: elem["sujetoId"] !== null ? false : true
        
                }))
            }

            return list;
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
                service_id: null,
                location_id: obj["localityId"]
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

            //if (response.status > 201) throw new ScheduleFailure(response.);
            if(!data["meta"]["success"]) return new ScheduleFailure(data["meta"]["error"]["type"]);

            
            return data["data"] ?? {};
        } catch (error) {
            const exception = error as any;
            return new ScheduleFailure(scheduleFailuresEnum.serverError);
        }
    }

    async rescheduleAppointment(obj: { appointmentId: any; newAppointmentId: any; isBlockAppointment: boolean }): Promise<any | ScheduleFailure> {
        try {
            let cookies = nookies.get(undefined, 'access_token');

            var myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);

            var raw = JSON.stringify({
                new_appointment_id: obj.appointmentId,
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            } as RequestInit;

            let URL = RESCHEDULE_APPOINTMENT_ENDPOINT(obj.appointmentId) as RequestInfo

            const response = await fetch(URL, requestOptions)

            let data = await response.json()

            //if (response.status > 201) throw new ScheduleFailure(response.);
            if(!data["meta"]["success"]) return new ScheduleFailure(data["meta"]["error"]["type"]);

            
            return data["data"] ?? {};
        } catch (error) {
            const exception = error as any;
            return new ScheduleFailure(scheduleFailuresEnum.serverError);
        }
    }
    
    async deleteAppointment(id: string): Promise<any | ScheduleFailure> {
        try {
            let cookies = nookies.get(undefined, 'access_token');

            var myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow'
            } as RequestInit;

            let URL = RESCHEDULE_APPOINTMENT_ENDPOINT(id) as RequestInfo

            const response = await fetch(URL, requestOptions)

            let data = await response.json()

            //if (response.status > 201) throw new ScheduleFailure(response.);
            if(!data["meta"]["success"]) return new ScheduleFailure(data["meta"]["error"]["type"]);

            
            return data["data"] ?? {};
        } catch (error) {
            const exception = error as any;
            return new ScheduleFailure(scheduleFailuresEnum.serverError);
        }
    }
}