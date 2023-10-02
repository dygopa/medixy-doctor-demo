import { IRelationSubject, ISubject } from "domain/core/entities/subjectEntity";
import moment from "moment";

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
    age: data?.fechaNacimiento ? getSubjectAge(new Date(data.fechaNacimiento)) : null,
    ageType: data?.fechaNacimiento ? getSubjectAgeType(new Date(data.fechaNacimiento)) : null,
    address: data?.direccion ?? "",
    federativeEntityId: data?.entidadFederativaId ?? null,
    municipalityId: data?.municipioId ?? null,
    countryLocation: data?.localidadPais ?? null,
    street: data?.calle ?? null,
    city: data?.ciudad ?? "",
    type: "",
    pictureUrl: data?.avatar ?? "",
    isPatient: data?.esPaciente ?? "",
    birthDate: data?.fechaNacimiento ?? new Date(),
    createdOn: data?.fechaRegistro ? new Date(data.fechaRegistro) : new Date(),
    postalCode: data?.codigoPostal ?? "",
    updatedOn: data?.fechaActualizacion ? new Date(data.fechaActualizacion) : new Date(),
  deletedOn: data?.fechaEliminacion ? new Date(data.fechaEliminacion) : new Date(),
  } as ISubject;
}

function getSubjectAge(birthDate: Date): number {
  let years = moment().utc().diff(moment(birthDate, "YYYY-MM-DD"), "years");
  let months = moment().utc().diff(moment(birthDate, "YYYY-MM-DD"), "months");
  let days = moment().utc().diff(moment(birthDate, "YYYY-MM-DD"), "days");



  if(years > 0){
   return years
  }
  if(months > 0){
    return months
  }
  if(days > 0){
    return days
  }

  return 0
}

function getSubjectAgeType(birthDate: Date): string {
  let years = moment().utc().diff(moment(birthDate, "YYYY-MM-DD"), "years");
  let months = moment().utc().diff(moment(birthDate, "YYYY-MM-DD"), "months");
  let days = moment().utc().diff(moment(birthDate, "YYYY-MM-DD"), "days");

  if(years > 0){
    return "years"
   }
   if(months > 0){
     return "months"
   }
   if(days > 0){
     return "days"
   }

  return "years"
}


export function fromSubjectSupabaseDocumentData(subject: ISubject): any {
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
    municipioId: subject.municipalityId,
    localidadPais: subject.countryLocation,
    calle: subject.street,
    estado: subject.state,
    direccion: subject.address,
    ciudad: subject.city,
    esPaciente: subject.isPatient,
    avatar: subject.pictureUrl === "" ? null: subject.pictureUrl,
    fechaNacimiento: subject.birthDate ? new Date(subject.birthDate) : null,
    fechaRegistro: subject.createdOn,
    codigoPostal: subject.postalCode === "" ? null : subject.postalCode,
    //fechaActualizacion: subject.updatedOn,
    //fechaEliminado: subject.deletedOn,
  } as any;

  return documentData;
}

export function relationsSubjectSupabaseToMap ( data:any ): IRelationSubject {
  const documentData = {
    id: data?.id ?? 0,
    type: data?.tipo ?? "",
    subjectIdPrincipal: data?.sujetoPrincipalId ?? "",
    subjectIdSecondary: data?.sujetoSecundarioId ?? "",
    subjectPrincipal: {} as ISubject,
    subjectSecondary: {} as ISubject
  }as IRelationSubject

  return documentData;
}

export function fromRelationsSubjectsSupabaseDocumentData (relationSubject: any): any {
  const documentData = {
    tipo: relationSubject.type,
    sujetoPrincipalId: relationSubject.subjectId,
    sujetoSecundarioId: relationSubject.companionId,
  }as any

  return documentData;
}