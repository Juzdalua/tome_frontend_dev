import actions from "../memo/actions";
import { ssoInstance, ssoFileInstance } from "../../utility/Axios";

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