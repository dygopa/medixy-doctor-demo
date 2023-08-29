import { IAppointment } from "domain/core/entities/appointmentEntity";
import { IService } from "domain/core/entities/serviceEntity";
import { ISubject } from "domain/core/entities/subjectEntity";
import { AppointmentFailure, appointmentFailuresEnum } from "domain/core/failures/appointment/appintmentFailure";
import { IGetAppointmentResponse, IGetAppointmentsResponse, IUpdateAppointmentResponse } from "domain/core/response/appointmentsResponse";
import { appointmentSupabaseToMap } from "domain/mappers/appointment/supabase/appointmentSupabaseMapper";
import { subjectSupabaseToMap } from "domain/mappers/patient/supabase/subjectSupabaseMapper";
import { servicesSupabaseMapper } from "domain/mappers/services/servicesSupabaseMapper";
import { supabase } from "infrastructure/config/supabase/supabase-client";

export default interface IAppointmentRepository {
  getAppointments(obj: { 
    skip?: number | string | null; 
    sort?: any; 
    limit?: number | null; 
    subjectId?: number | null;
  }): Promise<IGetAppointmentsResponse | AppointmentFailure>;
  getAppointmentsCount(obj: { 
    limit?: number | null; 
    subjectId?: number | null;
  }): Promise<number | AppointmentFailure>;
  getAppointmentById(appointmentId: string): Promise<IGetAppointmentResponse | AppointmentFailure>;
  editAppointmentStatus(obj: { appointmentId: string; status: number }): Promise<IUpdateAppointmentResponse | AppointmentFailure>;
}

export class AppointmentRepository implements IAppointmentRepository {
    async getAppointments(obj: { 
        skip?: number | string | null; 
        sort?: any; 
        limit?: number | null; 
        subjectId?: number | null;
    }): Promise<IGetAppointmentsResponse | AppointmentFailure> {
        try {
            let query = supabase.from("Citas").select(`
                *,
                Sujetos (*)
            `,
            { count: "exact" });

            if (obj.sort) {
                query = query.order(obj.sort.field, {
                    ascending: obj.sort.ascending
                });
            }

            if (obj.subjectId) {
                query = query.eq("sujetoId", obj.subjectId);
            }

            if (obj.skip && typeof obj.skip === "number" && obj.limit) {
                query = query.range(obj.skip, obj.skip + obj.limit);
            }

            if (obj.limit) {
                query = query.limit(obj.limit);
            }

            const res = await query;

            const appointments: IAppointment[] = [];

            if (res.data && res.data.length > 0) {
                await Promise.all(res.data.map(async (data: any) => {
                    const appointmentMap: IAppointment = appointmentSupabaseToMap(data);

                    appointments.push(appointmentMap);
                }));
            }

            const response: IGetAppointmentsResponse = {
                data: appointments,
                metadata: {
                    total: res.count ?? 0,
                    limit: obj.limit ?? null,
                }
            }

            return JSON.parse(JSON.stringify(response));
        } catch (error) {
            const exception = error as any;
            return new AppointmentFailure(appointmentFailuresEnum.serverError);
        }
    }

    async getAppointmentsCount(obj: { 
      limit?: number | null; 
      subjectId?: number | null;
    }): Promise<number | AppointmentFailure> {
      try {
          let query = supabase.from("Citas").select(`
              *
          `,
          { count: "exact", head: true });

          if (obj.subjectId) {
            query = query.eq("sujetoId", obj.subjectId);
          }

          if (obj.limit) {
            query = query.limit(obj.limit);
          }

          const res = await query;

          return res.count ?? 0;
      } catch (error) {
          const exception = error as any;
          return new AppointmentFailure(appointmentFailuresEnum.serverError);
      }
    }

    async getAppointmentById(appointmentId: string): Promise<IGetAppointmentResponse | AppointmentFailure> {
        try {
          const res = await supabase.from("Citas").select(`
            *,
            Sujetos (*),
            Servicios (
              *,
              Localidades(*)
            )
            `).eq("id", appointmentId).limit(1);
  
          let appointment: IAppointment = {} as IAppointment;
  
          if (res.data && res.data.length > 0) {
            appointment = appointmentSupabaseToMap(res.data[0]);

            if (res.data[0]?.Sujetos) {
                const subject: ISubject = subjectSupabaseToMap(res.data[0].Sujetos);

                if (subject.subjectId > 0) appointment.subject = subject;
            }

            if (res.data[0]?.Servicios) {
              const service: IService = servicesSupabaseMapper(res.data[0].Servicios);

              if (service.id > 0) appointment.service = service;
            }
          }

          const response: IGetAppointmentResponse = {
            data: appointment,
            metadata: {},
          }
  
          return response;
        } catch (error) { 
          const exception = error as any;
          return new AppointmentFailure(appointmentFailuresEnum.serverError);
        }
    }

    async editAppointmentStatus(obj: { appointmentId: string; status: number }): Promise<IUpdateAppointmentResponse | AppointmentFailure> {
        try {
          await supabase.from("Citas").update({ estado: obj.status }).match({ id: obj.appointmentId });

          const response: IUpdateAppointmentResponse = {
            data: true,
            metadata: {},
          }
  
          return response;
        } catch (error) { 
          const exception = error as any;
          return new AppointmentFailure(appointmentFailuresEnum.serverError);
        }
    }
}
  