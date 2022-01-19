import actions from "./actions";
import { ssoInstance } from "../../utility/Axios";
import { removeItem, setItem } from "../../utility/localStorage";
import axios from "axios";

//create user
export const joinUser = (data) => {  
    return async (dispatch) => {
        try {
            const response = await ssoInstance.post(`/api/users/join/create`, data);
            
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

//login kakao callback with code
export const loginKakao = () => {
    return async (dispatch) => {
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        
        try {
            const response = await ssoInstance.post('api/users/login/kakao', code);
            dispatch({
                type: actions.LOGIN_KAKAO,
                payload:response
            });
            
            const user = response.data.data;
            setItem("token", user.token);
            setItem("user", user);

            return response;
        } catch (error) {
        return error.response  
        };
    };
};