import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import "./styles.css";
import { Route, Routes } from "react-router-dom";
import Join from "./components/Join/Join";
import Login from "./components/Login/Login";
import Logout from "./components/Login/Logout";
import LoginKakao from "./components/Login/LoginKakao";
import LogoutKakao from "./components/Login/LogoutKakao";
import Memo from "./components/Memo/Memo";
import MyInfo from "./components/Login/MyInfo";

function App() {
  
  return (    
   <div className="App">
    <Navbar />

    <Routes>
      <Route path="/" element={<Home/>}/>      
      <Route path="/login" element={<Login/>} />      
      <Route path="/logout" element={<Logout/>} />      
      <Route path="/join" element={<Join/>} />
      <Route path="/login/kakao" element={<LoginKakao/>} />   
      <Route path="/logout/kakao" element={<LogoutKakao/>} />  
      <Route path="/memo" element={<Memo/>} />
      <Route path="/myInfo" element={<MyInfo/>} />   
         
    </Routes>
   </div>
  );
}

export default App;
