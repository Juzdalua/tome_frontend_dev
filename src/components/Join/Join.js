import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./styles.css";
import {joinUser, joinUserValid} from "../../redux/users/actionCreator"
import { useNavigate } from "react-router-dom";

const Join = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [username, setUsername] = useState("");
    const [join, setJoin] = useState(true);   
    const [validEmail, setvalidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [validUsername, setValidUsername] = useState(false);
    

    const onEmailHandler = (event) => {
        setEmail(event.target.value);
        const email = document.querySelector("#email");
        email.onblur = async() => {
            //email 중복검사                 
            const response = await dispatch(joinUserValid({email: email.value}));
            
            if(response.status === 200)
                setvalidEmail(true);
            else{
                setvalidEmail(false);
                return alert(response.data.message);
            };     
        };
    };
    const onPasswordHandler = (event) => {
        setPassword(event.target.value);
    };
    const onPassword2Handler = (event) => {
        setPassword2(event.target.value);
        const password2_html = document.querySelector("#password2");        
        password2_html.onblur = () => {            
            //password 유효성 검사
            if(password === password2_html.value){                
                setValidPassword(true);                
            }else{
                alert("비밀번호가 다릅니다.");
                setValidPassword(false); 
            } //if
            
        }
    };
    const onUsernameHandler = (event) => {
        setUsername(event.target.value);
        const username = document.querySelector("#username");
        username.onblur = async () => {
            //username 중복검사
        
            const response = await dispatch(joinUserValid({username: username.value}));
            
            if(response.status === 200)
                setValidUsername(true);
            else{
                setValidUsername(false);
                return alert("닉네임이 이미 존재합니다.");
            };
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
        
        if(response.status === 200)
            navigate("/login");
        else
            return alert(response.data.meesage);
    };

    useEffect( () => {
        if(validEmail && validPassword && validUsername)
            setJoin(false);
    }, [validEmail, validPassword, validUsername]);
    
    const onKakaoLoginHandler = async () => {                           
        const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_API_URL}/login/kakao`;
        window.location.href=`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;         
    };

    return (
        <div className="join-div">
            <form onSubmit={onSubmit} className="join-form">                
                <input id="username" type="text" placeholder="닉네임을 입력하세요." value={username} onChange={onUsernameHandler}/>
                <input id="email" type="email" placeholder="E-Mail을 입력하세요" value={email} onChange={onEmailHandler}/>                
                <input type="password" placeholder="비밀번호를 입력하세요." value={password} onChange={onPasswordHandler}/>
                <input id="password2" type="password" placeholder="비밀번호를 다시 입력하세요." value={password2} onChange={onPassword2Handler}/>                
                <button type="submit" disabled={join} >가입하기</button>
                {/* <button type="submit"  >가입하기</button> */}
                <div className="social-kakao" onClick={onKakaoLoginHandler}><img src={process.env.PUBLIC_URL+"img/kakao_login_medium_wide.png"}/></div>
            </form>      
        </div>
    );
};

export default Join;