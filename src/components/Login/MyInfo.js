import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getItem, removeItem } from "../../utility/localStorage";
import { Link } from "react-router-dom";
import "./styles.css";
import { changePassword } from "../../redux/users/actionCreator";

const MyInfo = () => {

    const [user, setUser] = useState();
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    
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

    const onPasswordChangeHandler = async(event) => {
        event.preventDefault();
        
        if(password !== password2){
            alert("비밀번호가 다릅니다.");
            return ;
        }//if

        const body = {
            user_id: getItem('user').id,
            password,
            password2
        };

        const response = await dispatch(changePassword(body));
        
        if(response.status !== 200){
            alert(response.data.message);
            return ;
        } else{
            alert("비밀번호가 변경됐습니다. 다시 로그인해주세요.");
            removeItem('user');
            removeItem('token');            
            navigator("/login");
        };


    };

    return (
        <div className="myInfo__container">
            {user ?                 
                <form className="myInfo__container-item" onSubmit={onPasswordChangeHandler}>    
                    <span>Email: {user.email}</span>
                    <span>닉네임: {user.username}</span>
                    {getItem('kakao_token') ? null : 
                        <div className="myInfo__container-item__password">
                            <input type="password" value={password} onChange={onPasswordHandler} required placeholder="변경할 비밀번호를 입력하세요."/>
                            <input type="password" value={password2} onChange={onPasswordHandler2} required placeholder="변경할 비밀번호를 다시 입력하세요."/>
                            <button>비밀번호 변경하기</button>
                        </div>
                    }
                    <Link to="/" className="myInfo__container-item__goback">&rarr; 홈으로 돌아가기</Link>
                </form>                             
                : null                
            }
        </div>
    );
}

export default MyInfo;