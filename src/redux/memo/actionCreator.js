import actions from "../memo/actions";
import { ssoInstance } from "../../utility/Axios";
import { excelDownload } from "../../utility/FileDownload";

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
        let query = `user_id=${data.user_id}`;
        query += data.start_date != null ? `&start_date=${data.start_date}` : '';
        query += data.end_date != null ? `&end_date=${data.end_date}` : '';
        console.log(query)

        try {
            const response = await ssoInstance.get(`api/memo/getMemoWithUser?${query}`);
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
            const response = await ssoInstance.get('api/memo/excel?user_id='+data.user.id);
            dispatch({
                type: actions.EXCEL_MEMO,
                payload: response
            });
            
            // await excelDownload(response.data.data.file_path_); //axios
            
            await excelDownload(process.env.REACT_APP_API_URL + response.data.data.file_path_, 'MemoList.xlsx'); //fetch
            return response;
        } catch (error) {
            return error.response;
        };
    };
};