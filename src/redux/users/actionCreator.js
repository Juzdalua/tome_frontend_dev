import axios from "axios";
import actions from "./actions";
import { instance } from "../../Axios";

const {JOIN_USER} = actions;

export const joinUser = (data) => {  
    return async (dispatch) => {
        const response = await instance.post(`/api/users/join`, data);
        // console.log(response)
        dispatch({
            type: JOIN_USER,
            payload: response
        });
        return response;
    };
};