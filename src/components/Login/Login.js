import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {loginUser} from "../../redux/users/actionCreator"
import {useNavigate} from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [join, setJoin] = useState(true)
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const dispatch = useDispatch();
    const navigator = useNavigate();

    useEffect( ()=> {
        if(emailValid && passwordValid)
            setJoin(false);
    }, [emailValid, passwordValid]);

    const onEmailHandler = (event) => {
        setEmail(event.target.value);
        if(email !== "")
            setEmailValid(true);
        else
            setEmailValid(false);
    };

    const onPasswordHandler = (event) => {
        setPassword(event.target.value);
        if(password !== "")
            setPasswordValid(true);
        else
            setPasswordValid(false);
    };

    const onSubmit = async(event) => {
        event.preventDefault();
        const body = {
            email: email,
            password: password
        };
                
        const response = await dispatch(loginUser(body));    
        
        // email or password fail
        if(response.status === 400)
            return alert(response.data.message);        
        
        // window.location.href = '/'
        navigator("/");
    };

    const onKakaoLoginHandler = async () => {
        // const REDIRECT_URI = "http://localhost:3001/login/kakao"
        const REDIRECT_URI = "http://localhost:4001/api/users/login/kakao"
                
        window.location.href=`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`; 
    };

    return (
        <div className="join-div">
            <form onSubmit={onSubmit} className="join-form">                                
                <input id="email" type="email" placeholder="E-Mail을 입력하세요" value={email} onChange={onEmailHandler} />                
                <input type="password" placeholder="비밀번호를 입력하세요." value={password} onChange={onPasswordHandler} />                
                <button type="submit" disabled={join} >로그인</button>                                
                <div className="social-kakao" onClick={onKakaoLoginHandler}><img src={process.env.PUBLIC_URL+"img/kakao_login_medium_wide.png"}/></div>
            </form>      
                
        </div>
    );
};

export default Login;