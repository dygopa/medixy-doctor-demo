import { IPatient } from "domain/core/entities/patientEntity";
import { IPet } from "domain/core/entities/petEntity";

export function petFirebaseToMap(data: any, patient?: IPatient): IPet {
  return {
    petId: data?.mid ?? "",
    name: data?.nombre ?? "",
    description: data?.descripcion ?? "",
    specie: data?.especie ?? "",
    breed: data?.raza ?? "",
    gender: data?.sexo ?? "",
    patientId: data?.uid ?? "",
    patient: patient ?? null,
    imageUrl: data?.foto ?? "",
    birthDate: data?.fechanac ?? null,
    createdOn: data?.createdOn ?? new Date(),
    updatedOn: data?.ultimaActualizacion ?? new Date(),
    deletedOn: data?.deletedOn ?? new Date(),
  } as IPet;
}
