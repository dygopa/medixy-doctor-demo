import { MedicineFailure } from "domain/core/failures/medicine/medicineFailure";
import { IGetMedicinesResponse } from "domain/core/response/medicineResponse";

export interface IAutocompleteInputMedicinesState {
    medicines: IGetMedicinesState;
}

interface IGetMedicinesState {
    data: IGetMedicinesResponse;
    loading: boolean;
    successful: boolean;
    error: MedicineFailure | null; 
}

export const initialState: IAutocompleteInputMedicinesState = {
    medicines: {
        data: {} as IGetMedicinesResponse,
        loading: false,
        successful: false,
        error: null,
    },
}