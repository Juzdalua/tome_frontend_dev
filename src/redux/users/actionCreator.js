import actions from "./actions";
import { instance } from "../../Axios";

//create user
export const joinUser = (data) => {  
    return async (dispatch) => {
        try {
            const response = await instance.post(`/api/users/join/create`, data);
            // console.log(response)
            dispatch({
                type: actions.JOIN_USER,
                payload: response
            });
            return response;  
        } catch (error) {
            return error.response;
        };        
    };
};

// email, username validation with join
export const joinUserValid = (data) => {
    return async (dispatch) => {
        try {
            const response = await instance.post('api/users/join/valid', data);
            dispatch({
                type: actions.JOIN_USER_VALID,
                payload: response
            });            
            return response;    
        } catch (error) {
            console.log(error.response)
            return error.response;
        };        
    };
};

//login
export const loginUser = (data) => {
    return async (dispatch) => {        
        try {
            const response = await instance.post('api/users/login', data);            
            dispatch({
                type: actions.LOGIN_USER,
                payload: response
            });            
            return response;
        } catch (error) {
            return error.response;
        };
    };
};