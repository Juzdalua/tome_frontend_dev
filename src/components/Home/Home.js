import { useEffect, useState } from "react";
import { removeItem, getItem} from "../../utility/localStorage";
import "./styles.css";


function Home(){
    const [loading, setLoding] = useState(true);
    const [toDo, setToDo] = useState("");
    const [toDos, setToDos] = useState([]);

    // useEffect(() => {        
    //     removeItem('user');
    //     removeItem('token');
    //     removeItem('kakao_token');
    // },[]);

    const onChange = (event) => {
        setToDo(event.target.value);        
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if(toDo === "")
            return;
        setToDos( currentArr => [toDo, ...currentArr]);
        setToDo("");        
        document.querySelector(".toDo").focus();        
    };

    return (
        <div>
            <form className="toDoForm" onSubmit={onSubmit}>
                <input className="toDo" onChange={onChange} value={toDo} type="text" placeholder="메모를 입력하세요." />
                <button className="toDoBtn">추가하기</button>
            </form>
            <hr/>
            <ul>
                {toDos.map( (item, index) => <li key={index}>{item}</li>)}
            </ul>
            
        </div>
    );
};

export default Home;