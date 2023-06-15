import { ISubject } from "domain/core/entities/subjectEntity";

export function subjectSupabaseToMap(data: any): ISubject {
  return {
    subjectId: data?.id ?? "",
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
    isPatient: data?.esPaciente ?? "",
    birthDate: data?.fechaNacimiento ?? new Date(),
    createdOn: data?.fechaRegistro ? new Date(data.fechaRegistro) : new Date(),
    //updatedOn: data?.fechaActualizacion ? new Date(data.fechaActualizacion) : new Date(),
    //deletedOn: data?.fechaEliminacion ? new Date(data.fechaEliminacion) : new Date(),
  } as ISubject;
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


export function fromSubjectSupabaseDocumentData(subject: ISubject): any {
  console.log(subject)
  const documentData = {
    nombres: subject.name,
    primerApellido: subject.lastName,
    segundoApellido: subject.motherLastName,
    curp: subject.curp === "" ? null: subject.curp,
    email: subject.email === "" ? null: subject.email,
    sexo: subject.sex,
    genero: subject.gender,
    telefono: subject.phoneNumber,
    paisNacimiento: subject.country,
    entidadFederativaId: subject.federativeEntityId,
    estado: subject.state,
    direccion: subject.address,
    ciudad: subject.city,
    esPaciente: subject.isPatient,
    avatar: subject.pictureUrl === "" ? null: subject.pictureUrl,
    fechaNacimiento: subject.birthDate,
    fechaRegistro: subject.createdOn,
    //fechaActualizacion: subject.updatedOn,
    //fechaEliminado: subject.deletedOn,
  } as any;

  return documentData;
}

