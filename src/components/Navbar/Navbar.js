import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { getItem } from "../../utility/localStorage";
import { useDispatch } from "react-redux";

function Navbar(props){
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const LoginButton = () => {
        return (
            <Link to="/login">로그인</Link>
        );
    };

    const LogoutButton = () => {
        return (
            <Link to="/logout">로그아웃</Link>
        );        
    };

    const LogoutKakaoButton = () => {
        return (
            <Link to="/logout/kakao">로그아웃</Link>
        );        
    };
    

    return (
        <div className="nav-bar">
            <div className="nav-bar__home">                
                <Link to="/">오늘의 메모</Link>
            </div>
            <div className="nav-bar__member">
                {getItem("user") === null ? null : <Link to="memo">메모 목록</Link>}     
                {getItem("user") === null ? <LoginButton /> : (getItem("kakao_token") ? <LogoutKakaoButton/> : <LogoutButton />)}                
                {getItem("user") === null ? <Link to="/join">회원가입</Link> : null}                           
            </div>
            
        </div>
               
    );
};
export default Navbar;