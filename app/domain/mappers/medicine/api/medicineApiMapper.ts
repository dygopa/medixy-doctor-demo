import { IMedicine } from "domain/core/entities/medicineEntity";

export function medicineApiToMap(data: any): IMedicine {
    return {
      id: data["vidal:id"] ? parseInt(data["vidal:id"], 10) : 0,
      name: data?.title ? data.title[0] : "",
      summary: data?.summary ? data.summary[0]._ : ""
    } as IMedicine;
}
