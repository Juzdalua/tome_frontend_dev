import axios from "axios";
import actions from "./actions";
import { instance } from "../../Axios";

const {JOIN_USER, JOIN_USER_VALID} = actions;

export const joinUser = (data) => {  
    return async (dispatch) => {
        const response = await instance.post(`/api/users/join/create`, data);
        // console.log(response)
        dispatch({
            type: JOIN_USER,
            payload: response
        });
        return response;
    };
};

export const joinUserValid = (data) => {
    return async (dispatch) => {
        const response = await instance.post('api/users/join/valid', data);
        dispatch({
            type:JOIN_USER_VALID,
            payload: response
        });
        return response;
    }
}