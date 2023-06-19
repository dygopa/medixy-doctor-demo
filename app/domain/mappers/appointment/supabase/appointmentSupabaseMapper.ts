import { IAppointment } from "domain/core/entities/appointmentEntity";

export function appointmentSupabaseToMap(data: any): IAppointment {
    return {
      id: data?.id ?? 0,
      status: data?.estado ?? 0,
      observations: data?.observaciones ?? "",
      doctorId: data?.doctorId ?? 0, 
      subjectId: data?.sujetoId ?? 0,
      serviceId: data?.servicioId ?? 0,
      startHour: data?.horaInicio ?? 0,
      endHour: data?.horaFin ?? 0,
      index: data?.indice ?? 0,
      attentionWindowId: data?.ventanaAtencionId ?? 0,
      bookingDate: data?.fechaReserva ? new Date(data.fechaReserva) : new Date(),
      bookingEndDate: data?.fechaFinReserva ? new Date(data.fechaFinReserva) : new Date(),
      createdAt: data?.fechaCreacion ? new Date(data.fechaCreacion) : new Date(),
    } as IAppointment;
  }