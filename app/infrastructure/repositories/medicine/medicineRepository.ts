import { IMedicine } from "domain/core/entities/medicineEntity";
import { medicalRecordFailuresEnum } from "domain/core/failures/medicalRecord/medicalRecordFailure";
import { MedicineFailure } from "domain/core/failures/medicine/medicineFailure";
import { IGetMedicinesResponse } from "domain/core/response/medicineResponse";
import { medicineApiToMap } from "domain/mappers/medicine/api/medicineApiMapper";
import { VIDAL_API_DOMAIN, VIDAL_APP_ID, VIDAL_APP_KEY } from "infrastructure/config/api/vidal/vidal";
import { parseString } from "xml2js"; 

export default interface IMedicineRepository {
  getMedicines(obj: { 
    page?: number | string | null; 
    sort?: any; 
    limit?: number | null; 
    searchQuery?: string | null; 
  }): Promise<IGetMedicinesResponse | MedicineFailure>;
}

export class MedicineRepository implements IMedicineRepository {
  async getMedicines(obj: { 
    page?: number | string | null; 
    sort?: any; 
    limit?: number | null;
    searchQuery?: string | null; 
  }): Promise<IGetMedicinesResponse | MedicineFailure> {
    try {
      let URL = VIDAL_API_DOMAIN + "/packages?";

      if (obj.searchQuery) {
        URL = URL + `q=${obj.searchQuery.toLowerCase()}&`;
      }

      if (obj.page) {
        URL = URL + `start-page=${obj.page}&`;
      }

      if (obj.limit) {
        URL = URL + `page-size=${obj.limit}&`;
      }

      URL = URL + `app_id=${VIDAL_APP_ID}&app_key=${VIDAL_APP_KEY}`;

      const res = await fetch(URL, {
        method: "GET",
      });

      if (res.status !== 200) return new MedicineFailure(medicalRecordFailuresEnum.serverError);

      const xml = await res.text();
      
      let json: any = {};

      parseString(xml, (err, results) => {
        if (err) return new MedicineFailure(medicalRecordFailuresEnum.serverError);

        let data = JSON.parse(JSON.stringify(results))
          
        json = data;
      });

      const medicines: IMedicine[] = [];

      if (json.feed.entry && json.feed.entry.length > 0) {
        await Promise.all((json.feed.entry.map((entry: any) => {
          const medicine: IMedicine = medicineApiToMap(entry);

          if (medicine.id > 0) medicines.push(medicine);
        })))
      }

      const response: IGetMedicinesResponse = {
          data: medicines,
          metadata: {
            total: medicines.length,
            limit: obj.limit ?? null,
        }
      }

      return JSON.parse(JSON.stringify(response));
    } catch (error) {
      const exception = error as any;
      return new MedicineFailure(medicalRecordFailuresEnum.serverError);
    }
  }
}
  