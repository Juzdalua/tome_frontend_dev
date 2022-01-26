import actions from "../memo/actions";
import { ssoInstance } from "../../utility/Axios";

//create memo
export const writeMemo = (data) => {
    return async(dispatch) => {
        try {            
            const response = await ssoInstance.post('api/memo/create', data);
            dispatch({
                type: actions.CREATE_MEMO,
                payload: response
            });            
            return response;
        } catch (error) {
            return error.response;
        };
    };
};

export const getMemoWithUser = (data) => {
    return async (dispatch) => {
        
        try {
            const response = await ssoInstance.post('api/memo/getMemoWithUser', data);
            dispatch({
                type: actions.GET_MEMO,
                payload: response
            });
            return response;
        } catch (error) {
            return error.response;
        }
    };
};

export const deleteMemo = data => {
    return async dispatch => {
        try {
            const response = await ssoInstance.post('api/memo/delete', data);
            dispatch({
                type: actions.DELETE_MEMO,
                payload: response
            });
            return response;
        } catch (error) {
            return error.response;
        }//
    };
};

export const downloadExcel = (data) => {
    return async dispatch => {
        try {
            const response = await ssoInstance.post('api/memo/excel', data);
            dispatch({
                type: actions.EXCEL_MEMO,
                payload: response
            });
        } catch (error) {
            return error.response;
        };
    };
};