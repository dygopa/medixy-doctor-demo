import { IDiagnosis } from "domain/core/entities/diagnosis";
import { DiagnosisFailure, diagnosisFailuresEnum } from "domain/core/failures/diagnosis/diagnosisFailure";
import { ICreateDiagnosisResponse } from "domain/core/response/diagnosisResponse";
import { fromDiagnosisSupabaseDocumentData } from "domain/mappers/diagnosis/diagnosisSupabaseMapper";
import { supabase } from "infrastructure/config/supabase/supabase-client";

export default interface IDiagnosisRepository {
    createDiagnosis(diagnosis: IDiagnosis): Promise<ICreateDiagnosisResponse | DiagnosisFailure>;
}

export class DiagnosisRepository implements IDiagnosisRepository {
    async createDiagnosis(diagnosis: IDiagnosis): Promise<ICreateDiagnosisResponse | DiagnosisFailure> {
        try {
            const res = await supabase.from("Diagnosticos").insert(fromDiagnosisSupabaseDocumentData(diagnosis)).select();

            if (res.error) return new DiagnosisFailure(diagnosisFailuresEnum.serverError);

            if (res.data && res.data.length > 0) diagnosis.id = res.data[0].id;

            const response: ICreateDiagnosisResponse = {
                data: diagnosis,
                metadata: {}
            }

            return JSON.parse(JSON.stringify(response));
        } catch (error) {
            const exception = error as any;
            return new DiagnosisFailure(diagnosisFailuresEnum.serverError);
        }
    }
}