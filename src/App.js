import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import "./styles.css";
import { Route, Routes } from "react-router-dom";
import Join from "./components/Join/Join";
import Login from "./components/Login/Login";



function App() {
  
  return (    
   <div className="App">
    <Navbar />
    

    <Routes>
      <Route path="/" element={<Home/>}/>      
      <Route path="/login" element={<Login/>} />
      <Route path="/join" element={<Join/>} />
    </Routes>
   </div>
  );
}

export default App;
