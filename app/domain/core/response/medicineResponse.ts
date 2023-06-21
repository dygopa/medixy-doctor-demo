import { IMedicine } from "../entities/medicineEntity";

export interface IGetMedicinesResponse {
    data: IMedicine[];
    metadata: {
        total: number;
        limit: number | null;
    }
}
