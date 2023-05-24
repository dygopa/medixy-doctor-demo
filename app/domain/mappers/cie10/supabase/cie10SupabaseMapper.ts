import { ICIE10 } from "domain/core/entities/cie10Entity";

export function cie10SupabaseToMap(data: any): ICIE10 {
  return {
    id: data?.id ?? 0,
    code3: data?.codigo3 ?? "",
    description3: data?.descripcion3 ?? "",
    code4: data?.codigo4 ?? "",
    description4: data?.descripcion4 ?? "",
  } as ICIE10;
}
