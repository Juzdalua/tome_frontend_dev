import actions from "./actions";
import { ssoInstance } from "../../utility/Axios";
import { removeItem, setItem } from "../../utility/localStorage";

//create user
export const joinUser = (data) => {  
    return async (dispatch) => {
        try {
            const response = await ssoInstance.post(`/api/users/join/create`, data);
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
            const response = await ssoInstance.post('api/users/join/valid', data);
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
            const response = await ssoInstance.post('api/users/login', data);            
            dispatch({
                type: actions.LOGIN_USER,
                payload: response
            });            
            const user = response.data.data;
            setItem("token", user.token);
            setItem("user", user);

            return response;
        } catch (error) {
            return error.response;
        };
    };
};

//logout
export const logoutUser = () => {
    return async (dispatch) => {
        try {
            removeItem("token");
            removeItem("user");
            
            dispatch({
                type:actions.LOGOUT_SUCCESS,
                payload: null,            
            });    
        } catch (error) {
            dispatch({
                type:actions.LOGOUT_ERROR,
                payload: null,            
            });    
        }
        
    };
};