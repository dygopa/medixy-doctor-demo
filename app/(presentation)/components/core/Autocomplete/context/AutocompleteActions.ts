import { ISpecialty } from "domain/core/entities/specialtyEntity";
import { IGetSpecialtiesResponse } from "domain/core/response/specialtiesResponse";
import ServiceUseCase from "domain/useCases/service/serviceUseCase";
import SpecialtyUseCase from "domain/useCases/specialty/specialtyUseCases";
import { Dispatch } from "react";

export interface IAutocompleteActions {
    getData: (obj: { type: "SPECIALTIES" | "SERVICES_CATEGORIES"; doctorId: number }) => (dispatch: Dispatch<any>) => {};
}

export interface IAutocompleteData {
    id: number;
    name: string;
    doctorId?: number | null;
}

const getData = (obj: { type: "SPECIALTIES" | "SERVICES_CATEGORIES", doctorId: number }) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_DATA_LOADING" });
        
        const res: IAutocompleteData[] = [];

        switch (obj.type) {
            case "SPECIALTIES":
                const responseSpecialties: IGetSpecialtiesResponse = await new SpecialtyUseCase().getSpecialties({ doctorId: obj.doctorId, generics: true });

                if (responseSpecialties.data.length > 0) {
                    responseSpecialties.data.forEach((specialty: ISpecialty) => {
                        const data: IAutocompleteData = {
                            id: specialty.id,
                            name: specialty.name,
                            doctorId: specialty.doctorId
                        }

                        res.push(data)
                    })
                }
                break;
            case "SERVICES_CATEGORIES":
                const responseCategories: any = await new ServiceUseCase().getCategoriesDoctor(obj.doctorId);

                if (responseCategories.data.length > 0) {
                    responseCategories.data.forEach((category: any) => {
                        const data: IAutocompleteData = {
                            id: category.id,
                            name: category.name,
                            doctorId: category.doctorId
                        }

                        res.push(data)
                    })
                }
                break;
        
            default:
                break;
        }

        

        dispatch({ type: "GET_DATA_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "GET_DATA_ERROR", payload: { error: error } });
    }
}

export const actions: IAutocompleteActions = {
    getData,
}