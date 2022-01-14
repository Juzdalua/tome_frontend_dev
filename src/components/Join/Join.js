import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./styles.css";
import {joinUser} from "../../redux/users/actionCreator"
import { useNavigate } from "react-router-dom";

const Join = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [username, setUsername] = useState("");
    
    const onEmailHandler = (event) => {
        setEmail(event.target.value);
    };
    const onPasswordHandler = (event) => {
        setPassword(event.target.value);
    };
    const onPassword2Handler = (event) => {
        setPassword2(event.target.value);
    };
    const onUsernameHandler = (event) => {
        setUsername(event.target.value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        
        if(password !== password2)
            return alert('비밀번호가 다릅니다.');

        let body = {
            email, password, password2, username
        };
        
        const response = await dispatch(joinUser(body));        
        // console.log(response)
        if(response.status = 200)
            navigate("/login")
            
        
        
    };
    return (
        <div>
            <form onSubmit={onSubmit} className="join-form">                
                <input type="email" placeholder="E-Mail을 입력하세요" value={email} onChange={onEmailHandler}/>
                <input type="password" placeholder="비밀번호를 입력하세요." value={password} onChange={onPasswordHandler}/>
                <input type="password" placeholder="비밀번호를 다시 입력하세요." value={password2} onChange={onPassword2Handler}/>
                <input type="text" placeholder="닉네임을 입력하세요." value={username} onChange={onUsernameHandler}/>
                <button>가입하기</button>
            </form>      
        </div>
    );
};

export default Join;