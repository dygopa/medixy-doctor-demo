export interface ISubject {
    subjectId: number;
    subjectParentId?: number | null;
    userId?: number | null;
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
    postalCode: string | null;
    federativeEntityId?: number | null;
    municipalityId?: number | null;
    countryLocation?: string | null;
    street?: string | null;
    isPatient: boolean;
    type: string;
    birthDate: string | null;
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