import axios from "axios";
import { getItem } from "./localStorage";

export const rawInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

//authorized user
export const ssoInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Authorization: `${getItem('token')}`,
        "Content-Type": "application/json",
    },
});

// Add a request interceptor
ssoInstance.interceptors.request.use( (config) => {
    config.headers.Authorization = `${getItem('token')}`;       
    // Do something before request is sent
    console.log(config)
    return config;
}, (error) => {    
    // Do something with request error
    return Promise.reject(error);
});


// Add a response interceptor
ssoInstance.interceptors.response.use( async (response)=> {
    return response;
  }, async (error)=> {    
    if(undefined !== error.response){
        if(401 === error.response.status) {
            alert('로그인이 필요합니다.')
            window.location.href='/unox/';
        };
    };
    return Promise.reject(error);
});
