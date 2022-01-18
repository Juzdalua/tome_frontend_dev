import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { getItem, removeItem } from "../../utility/localStorage";

function Navbar(props){
    const navigator = useNavigate();
    const LoginButton = () => {
        return (
            <Link to="/login">로그인</Link>
        );
    };

    const LogoutButton = () => {
        return (
            <span onClick={onLogoutHandler}>로그아웃</span>
        );
    };

    const onLogoutHandler = () => {
        removeItem('token');
        removeItem('user');
           
        navigator("/")
        // window.location.href = '/'
        return true;
    };

    return (
        <div className="nav-bar">
            <div className="nav-bar__home">                
                <Link to="/">오늘의 메모</Link>
            </div>
            <div className="nav-bar__member">
                {getItem("user") === null ? <LoginButton /> : <LogoutButton />}                
                {getItem("user") === null ? <Link to="/join">회원가입</Link> : null}                           
            </div>
            
        </div>
               
    );
};
export default Navbar;