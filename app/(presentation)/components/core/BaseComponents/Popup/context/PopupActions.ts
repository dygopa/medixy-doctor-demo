import { Dispatch } from "react";

export interface IPopupActions {
    changeChildrenPopup: Function;
    changeStatusPopup: Function;
}

const changeChildrenPopup = (children:any) => async (dispatch: Dispatch<any>) => {
    console.log({ type: "CHANGE_CHILDREN_POPUP", payload: { data: children } });
    dispatch({ type: "CHANGE_CHILDREN_POPUP", payload: { data: children } });
}
const changeStatusPopup = (value:boolean) => async (dispatch: Dispatch<any>) => {
    console.log({ type: "CHANGE_STATUS_POPUP", payload: { data: value } });
    dispatch({ type: "CHANGE_STATUS_POPUP", payload: { data: value } });
}

export const actions: IPopupActions = {
    changeChildrenPopup,
    changeStatusPopup
}
