import { useEffect, useState } from "react";
import moment from "moment";
import "./styles.css";
import { getItem } from "../../utility/localStorage";
import { useDispatch } from "react-redux";
import { writeMemo } from "../../redux/memo/actionCreator";
import MemoList from "../Memo/MemoList";
import { useNavigate } from "react-router-dom";


function Home(){    
    const [toDo, setToDo] = useState("");
    const [toDos, setToDos] = useState([]);
    const [image, setImage] = useState()
    const [imgPreview, setImgPreview] = useState("");    
    // const [time, setTime] = useState(moment()); //useState 훅을 통해 time 값 디폴트 설정
    
    const dispatch = useDispatch();
    const navigator = useNavigate();

    // 시계
    // const onLoadTime = () => {
    //     let timer = setInterval(() => { //timer 라는 변수에 인터벌 종료를 위해 저장  
    //         setTime(moment()); // 현재 시간 세팅 
    //     }, 1000); //1000ms = 1s 간 반복 
    //     return () => {
    //         clearInterval(timer); // 함수 언마운트시 clearInterval 
    //     };
    // };

    const nowTime = () => {        
        return moment().format('YYYY년 MM월 DD일, HH시 mm분 ss초');
    }

    const onChange = (event) => {
        setToDo(event.target.value);        
    };

    let objectUrl;
    const onImageHandler = (event) => {        
        setImage(()=>event.target.files[0]);

        //set preview image
        objectUrl = URL.createObjectURL(event.target.files[0])
        setImgPreview(objectUrl);
    };

    const onSubmit = async (event) => {        
        event.preventDefault();
        if(toDo === "")
            return;
        
        setToDos( currentArr => [toDo, ...currentArr]);
        setToDo("");   
        setImgPreview("");     
        document.querySelector(".toDo").focus();        
                
        
        if(getItem('user')){              
            let body;

            body = new FormData();
            body.append("toDo", toDo);
            body.append("user",  JSON.stringify(getItem('user')));
            if (image) 
                body.append("images", image);
                                    
            // body = {
            //     toDo: toDo,
            //     images: image ? JSON.stringify(image) : null,                
            //     user: JSON.stringify(getItem('user'))
            // };              
                        
            const response = await dispatch(writeMemo(body));
            if(response.status === 200){
                URL.revokeObjectURL(image);
                setImage("");
                // navigator("/");
                window.location.href = '/'
            };
                
        };              
        
    };
    useEffect(() => {   
        
    }, [image]);

    return (
        <div>
            {getItem('user') ? 
            <form id="toDoForm" className="toDoForm" onSubmit={onSubmit} encType="multipart/form-data" >
                {/* <span className="toDoTime">{time.format('YYYY년 MM월 DD일, HH시 mm분 ss초')}</span> */}                
                <textarea className="toDo" onChange={onChange} value={toDo} type="text" placeholder="메모를 입력하세요." />                
                <div className="toDo__img-container">
                    <label htmlFor="img">사진 추가하기</label>
                    <input className="toDo__img-item" id="img" type="file" accept="image/*" onChange={onImageHandler}/>
                    <div className="toDo__img-preview">
                        {imgPreview === '' ? null : 
                            <img className="toDo__img-preview" src={imgPreview} />
                        }
                    </div>
                </div>
                <button className="toDoBtn">추가하기</button>
            </form> :            
            <form id="toDoForm" className="toDoForm" onSubmit={onSubmit} encType="multipart/form-data" >
                {/* <span className="toDoTime">{time.format('YYYY년 MM월 DD일, HH시 mm분 ss초')}</span> */}                
                <textarea className="toDo" onChange={onChange} value={toDo} type="text" placeholder="로그인이 필요합니다." readOnly />                
                <div className="toDo__img-container">
                    <label htmlFor="img">사진 추가하기</label>
                    <input className="toDo__img-item" id="img" type="file" accept="image/*" disabled={true} onChange={onImageHandler}/>
                    <div className="toDo__img-preview">
                        {imgPreview === '' ? null : 
                            <img className="toDo__img-preview" src={imgPreview} />
                        }
                    </div>
                </div>
                <button className="toDoBtn" disabled={true}>추가하기</button>
                <span></span>                
            </form>}
            <hr/>
            {getItem('user') ? 
                <MemoList />
            : 
             <ul className="toDoList">
                    {toDos.map( (item, index) => 
                    <li className="toDoList-li" key={index}>
                        <span>{item}</span>
                        <span>{nowTime()}</span>                    
                    </li>)}
                </ul>
            }
        </div>
    );
};

export default Home;