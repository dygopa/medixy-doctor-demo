export interface IDiagnosis {
    id: number;
    description: string;
    cie10Id: number;
    medicalConsultyId: number;
    isPrincipal: boolean;
}