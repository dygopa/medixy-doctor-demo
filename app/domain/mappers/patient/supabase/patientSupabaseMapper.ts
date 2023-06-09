import { IPatient } from "domain/core/entities/patientEntity";

export function patientSupabaseToMap(data: any): IPatient {
  return {
    patientId: data?.id ?? "",
    name: data?.nombres ?? "",
    lastName: data?.primerApellido ?? "",
    motherLastName: data?.segundoApellido ?? "",
    curp: data?.curp ?? "",
    email: data?.email ?? "",
    sex: data?.sexo ?? 0,
    gender: data?.genero ?? 0,
    phoneNumber: data?.telefono ?? "",
    country: data?.paisNacimiento ?? "",
    state: data?.estado ?? "",
    age: data?.fechaNacimiento ? getPatientAge(new Date(data.fechaNacimiento)) : null,
    ageType: data?.fechaNacimiento ? getPatientAgeType(new Date(data.fechaNacimiento)) : null,
    address: data?.direccion ?? "",
    federativeEntityId: data?.entidadFederativaId ?? null,
    city: data?.ciudad ?? "",
    pictureUrl: data?.avatar ?? "",
    birthDate: data?.fechaNacimiento ?? new Date(),
    createdOn: data?.fechaRegistro ? new Date(data.fechaRegistro) : new Date(),
    //updatedOn: data?.fechaActualizacion ? new Date(data.fechaActualizacion) : new Date(),
    //deletedOn: data?.fechaEliminacion ? new Date(data.fechaEliminacion) : new Date(),
  } as IPatient;
}

function getPatientAgeMonths(birthDate: Date): number {
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    age = age * 12 + m;

    return age;
}

function getPatientAge(birthDate: Date): number {
  var diff_ms = Date.now() - birthDate.getTime();
  var age_dt = new Date(diff_ms); 

  if (Math.abs(age_dt.getUTCFullYear() - 1970) <= 0) return getPatientAgeMonths(birthDate);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

function getPatientAgeType(birthDate: Date): string {
  var diff_ms = Date.now() - birthDate.getTime();
  var age_dt = new Date(diff_ms); 

  if (Math.abs(age_dt.getUTCFullYear() - 1970) <= 0) return "months"

  return "years"
}


export function fromPatientSupabaseDocumentData(patient: IPatient): any {
  console.log(patient)
  const documentData = {
    nombres: patient.name,
    primerApellido: patient.lastName,
    segundoApellido: patient.motherLastName,
    curp: patient.curp === "" ? null: patient.curp,
    email: patient.email === "" ? null: patient.email,
    sexo: patient.sex,
    genero: patient.gender,
    telefono: patient.phoneNumber,
    paisNacimiento: patient.country,
    entidadFederativaId: patient.federativeEntityId,
    estado: patient.state,
    direccion: patient.address,
    ciudad: patient.city,
    avatar: patient.pictureUrl === "" ? null: patient.pictureUrl,
    fechaNacimiento: patient.birthDate,
    fechaRegistro: patient.createdOn,
    //fechaActualizacion: patient.updatedOn,
    //fechaEliminado: patient.deletedOn,
  } as any;

  return documentData;
}

