import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./styles.css";
import {joinUser, joinUserValid} from "../../redux/users/actionCreator"
import { useNavigate } from "react-router-dom";

const Join = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [username, setUsername] = useState("");
    const [join, setJoin] = useState(true);    
    const cnt = 0;

    const onEmailHandler = (event) => {
        setEmail(event.target.value);
        const email = document.querySelector("#email");
        email.onblur = async() => {
            //email 중복검사
            const response = await dispatch(joinUserValid({email}));

        };
    };
    const onPasswordHandler = (event) => {
        setPassword(event.target.value);
    };
    const onPassword2Handler = (event) => {
        setPassword2(event.target.value);
        const password2 = document.querySelector("#password2");
        password2.onblur = () => {
            //password 유효성 검사
        }
    };
    const onUsernameHandler = (event) => {
        setUsername(event.target.value);
        const username = document.querySelector("#username");
        username.onblur = () => {
            //username 중복검사
        };
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
            navigate("/login");
    };

    if(cnt === 3)
        setJoin(false);
    


    return (
        <div className="join-div">
            <form onSubmit={onSubmit} className="join-form">                
                <input id="email" type="email" placeholder="E-Mail을 입력하세요" value={email} onChange={onEmailHandler}/>                
                <input type="password" placeholder="비밀번호를 입력하세요." value={password} onChange={onPasswordHandler}/>
                <input id="password2" type="password" placeholder="비밀번호를 다시 입력하세요." value={password2} onChange={onPassword2Handler}/>
                <input id="username" type="text" placeholder="닉네임을 입력하세요." value={username} onChange={onUsernameHandler}/>
                <button type="submit" disabled={join} >가입하기</button>
            </form>      
        </div>
    );
};

export default Join;