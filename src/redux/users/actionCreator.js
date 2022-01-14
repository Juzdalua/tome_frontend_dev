import axios from "axios";
import actions from "./actions";
import { instance } from "../../Axios";

const {JOIN_USER} = actions;

export const joinUser = async (data) => {
    // const req = axios.post(`http://localhost:4001/api/users/join`, body)
    //     .then(response => response.data);
    // return {
    //     type: JOIN_USER,
    //     payload: req
    // };

    try {
        const response = await instance.post(`/api/users/join`, data);    
        // if(response){
            
            return {
                type: JOIN_USER,
                payload: response
            };
        //}
    } catch (error) {
        console.log(`### error: ${error}`)
    };
    

};