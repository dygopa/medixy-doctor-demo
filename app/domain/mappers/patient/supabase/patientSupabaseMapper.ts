import { IPatient } from "domain/core/entities/patientEntity";
import { IPoints } from "domain/core/entities/pointsEntity";

export function patientSupabaseToMap(data: any, points?: IPoints): IPatient {
  return {
    patientId: data?.pacienteId ?? "",
    firstName: data?.nombre ?? "",
    lastName: data?.primerApellido ?? "",
    user: data?.user ?? "",
    city: data?.pais ?? "",
    genrer: data?.genero ?? "",
    age: data?.edad ?? 0,
    address: data?.direccion ?? "",
    points: points ?? null,
    membership: data?.plan ?? "",
    phoneCountryCode: data?.codigoTelefono ?? "",
    email: data?.email ?? "",
    profilePictureUrl: data?.urlFotoPerfil ?? "",
    url: data?.urlFotoPerfil ?? "",
    registerComplete: data?.tieneRegistroCompleto ?? false,
    documentNumber: data?.numeroDocumento ?? "",
    country: data?.pais ?? "Perú",
    phoneNumber: data?.telefono ?? "",
    token: data?.llaveFCM ?? "",
    documentType: data?.tipoDocumento ?? "",
    personType: data?.tipoPersona ?? "",
    stripeId: data?.stripeId ?? "",
    birthDate: data?.fechaNacimiento ?? new Date(),
    createdOn: data?.fechaCreacion ? new Date(data.fechaCreacion) : new Date(),
    updatedOn: data?.fechaActualizacion ? new Date(data.fechaActualizacion) : new Date(),
    deletedOn: data?.fechaEliminacion ? new Date(data.fechaEliminacion) : new Date(),
  } as IPatient;
}

export function fromPatientSupabaseDocumentData(patient: IPatient): any {
  const documentData = {
    nombre: patient.firstName,
    primerApellido: patient.lastName,
    email: patient.email,
    genero: patient.genrer,
    telefono: patient.phoneNumber,
    pais: patient.country,
    fechaCreacion: patient.createdOn,
    fechaActualizacion: patient.updatedOn,
  } as any;

  return documentData;
}

