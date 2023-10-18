export interface Specialist {
    userId: string;
    accountId: string;
    names: string;
    firstName: string;
    lastName: string;
    status: boolean;
    email: string;
    curp: string;
    birthDate: string;
    sex: number;
    websiteUrl: string;
    phone: string;
    personType: number;
    avatar: string;
    address: string;
    aboutMe: string;
    shortDescription: string;
    country: string;
    pwaProfressionId: number | null;
    professionalLicense: number | null;
    professionalLicenseInstitution: string | null;
    specialities: any[];
    completedProfile?: boolean;
    role: string;
    createdOn: any | null;
}