import "./styles.css";
import { Link, Route, Routes } from "react-router-dom";
import Join from "../Join/Join";

function Navbar(){
    return (
        <div className="nav-bar">
            <div className="nav-bar__home">                
                <Link to="/">오늘의 메모</Link>
            </div>
            <div className="nav-bar__member">
                <Link to="/login">로그인</Link>
                <Link to="/join">회원가입</Link>            
            </div>
            
        </div>
               
    );
};
export default Navbar;