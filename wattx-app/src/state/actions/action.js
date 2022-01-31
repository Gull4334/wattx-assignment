import { Dispatch } from "redux";

export const UpdateData = (stateObject) => {
    return (Dispatch) => {
        Dispatch({
            type:'UPDATE',
            payload: stateObject
        });
    }
}