import actions from "./actions";
import { ssoInstance } from "../../utility/Axios";
import { getItem, removeItem, setItem } from "../../utility/localStorage";
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
export const getKakaoToken = () => {
    return async (dispatch) => {
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        const grant_type = "authorization_code";
        const REDIRECT_URI = "http://localhost:3001/login/kakao"
        
        try {
            const response = await axios.post(
                `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
                {
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
                    },
                });
            dispatch({
                type: actions.LOGIN_KAKAO_TOKEN,
                payload:response
            });
            
            return response;
        } catch (error) {
            return error.response  ;
        };
    };
};

// get user and jwt by kakao token
export const loginKakao = (response) => {
    return async (dispatch) => {                    
        const tokenData = {kakao_token: response.data};        
        try{
            const userResponse = await ssoInstance.post('/api/users/login/kakao', tokenData);
            dispatch({
                type: actions.LOGIN_KAKAO_USER,
                payload: userResponse,
            });
            
            setItem("kakao_token", userResponse.data.data.kakao_token);
            setItem("token", userResponse.data.data.token);
            setItem("user", userResponse.data.data);
            
            return userResponse;
        } catch(error){
            return error.response;
        }; 
    };
};

//logout Kakao
export const logoutKakao = () => {
    return async (dispatch) => {
        try {  
            //logout kakao user                                  
            const response = await ssoInstance.post('/api/users/logout/kakao',getItem('kakao_token'));
            dispatch({
                type: actions.LOGOUT_KAKAO_USER,
                payload: response
            });
                        
            removeItem("kakao_token");
            
           return response;
        } catch (error) {
            return error.response;
        };
    };
};

// user change password
export const changePassword = (data) => {
    return async (dispatch) => {
        try {
            const response = await ssoInstance.post('/api/users/changePassword', data);
            dispatch({
                type: actions.CHANGE_PASSWORD,
                payload: response
            });                
            return response;            
        } catch (error) {
            return error.response;
        };
    };
};