export interface IStepsState {
    step: IStepsUserState;
}

interface IStepsUserState {
    data: number;
    loading: boolean;
    successful: boolean;
    error: null; 
}

export const initialState: IStepsState = {
    step: {
        data: 0,
        loading: false,
        successful: false,
        error: null,
    }
}