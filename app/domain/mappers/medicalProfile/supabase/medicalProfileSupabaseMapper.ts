import { IMedicalProfile } from "domain/core/entities/medicalProfileEntity";

export function medicalProfileSupabaseToMap(data: any): IMedicalProfile {
    return {
      id: data?.id ?? 0,
      name: data?.nombre ?? "",
    } as IMedicalProfile;
}
