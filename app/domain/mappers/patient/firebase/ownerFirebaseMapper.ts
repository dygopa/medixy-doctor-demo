import { IPatient } from "domain/core/entities/subjectEntity";
import { IPoints } from "domain/core/entities/pointsEntity";
import firebase from "firebase/app";

export function patientFirebaseToMap(data: any, points?: IPoints): IPatient {
  return {
    patientId: data?.uid ?? "",
    firstName: data?.nombre ?? "",
    lastName: data?.apellido ?? "",
    user: data?.user ?? "",
    city: data?.ciudad ?? "",
    genrer: data?.genero ?? "",
    age: data?.edad ?? 0,
    address: data?.direccion ?? "",
    points: points ?? null,
    membership: data?.plan ?? "",
    phoneCountryCode: data?.codigoTelefono ?? "",
    email: data?.email ?? "",
    profilePictureUrl: data?.url ?? "",
    url: data?.url ?? "",
    registerComplete: data?.registroCompleto ?? false,
    documentNumber: data?.numeroDocumento ?? "",
    country: data?.pais ?? "Perú",
    phoneNumber: data?.telefono ?? "",
    token: data?.token ?? "",
    documentType: data?.tipoDocumento ?? "",
    personType: data?.tipoPersona ?? "",
    stripeId: data?.id_stripe ?? "",
    birthDate: data?.fechaNacimiento ?? new Date(),
    createdOn: data?.createdOn ?? new Date(),
    updatedOn: data?.updatedOn ?? new Date(),
    deletedOn: data?.deletedOn ?? new Date(),
  } as IPatient;
}

export function fromPatientFirebaseDocumentData(patient: IPatient): firebase.firestore.DocumentData {
  const documentData = {
    uid: patient.patientId,
    nombre: patient.firstName,
    apellido: patient.lastName,
    email: patient.email,
    genero: patient.genrer,
    telefono: patient.phoneNumber,
    pais: patient.country,
    createdOn: patient.createdOn,
    updatedOn: patient.updatedOn,
  } as firebase.firestore.DocumentData;

  return documentData;
}

