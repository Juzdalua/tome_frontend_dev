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

    useEffect( ()=> {
        if(emailValid && passwordValid)
            setJoin(false);
    }, [emailValid, passwordValid]);

    return (
        <div className="join-div">
            <form onSubmit={onSubmit} className="join-form">                                
                <input id="email" type="email" placeholder="E-Mail을 입력하세요" value={email} onChange={onEmailHandler} />                
                <input type="password" placeholder="비밀번호를 입력하세요." value={password} onChange={onPasswordHandler} />                
                <button type="submit" disabled={join} >로그인</button>                
            </form>      
        </div>
    );
};

export default Login;