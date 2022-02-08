import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getItem } from "../../utility/localStorage";
import { Link } from "react-router-dom";
import "./styles.css";

const MyInfo = () => {

    const [user, setUser] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();
    
    const dispatch = useDispatch();
    const navigator = useNavigate();

    useEffect( () => {        
        if(!getItem('user')){
            alert("로그인을 해야합니다.");
            navigator("/");
            return;
        } //if

        setUser( () => getItem('user'));    
        
                
    }, []);

    useEffect(() => {
        
    },[user]);

    const onPasswordHandler = (event) => {
        setPassword(event.target.value);
    };
    
    const onPasswordHandler2 = (event) => {
        setPassword2(event.target.value);
    };

    return (
        <div className="myInfo__container">
            {user ? 
                <div className="myInfo__container-item">                    
                    <span>Email: {user.id}</span>
                    <span>사용자명: {user.username}</span>
                    <input type="password" value={password} onChange={onPasswordHandler} required placeholder="변경할 비밀번호를 입력하세요."/>
                    <input type="password" value={password2} onChange={onPasswordHandler2} required placeholder="변경할 비밀번호를 다시 입력하세요."/>
                    <button>비밀번호 변경하기</button>
                    <Link to="/" className="myInfo__container-item__goback">&rarr; 홈으로 돌아가기</Link>
                </div>
                : null                
            }
        </div>
    );
}

export default MyInfo;