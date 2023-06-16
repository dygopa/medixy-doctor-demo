export interface ISubject {
    subjectId: number;
    name: string;
    lastName: string;
    motherLastName: string;
    curp: string;
    email: string;
    sex: number;
    gender: number;
    age?: number | null;
    ageType?: string;
    phoneNumber: string;
    country: string;
    state: number;
    address: string;
    city: string;
    pictureUrl: string;
    federativeEntityId?: number | null;
    municipalityId?: number | null;
    countryLocationId?: number | null;
    street?: string | null;
    isPatient: boolean;
    birthDate: Date | null;
    createdOn: Date;
    updatedOn: Date | null;
    deletedOn: Date | null;
}

export interface IRelationSubject {
    id: number,
    type: number,
    subjectIdPrincipal: number,
    subjectPrincipal: ISubject,
    subjectIdSecondary: number,
    subjectSecondary: ISubject,
}