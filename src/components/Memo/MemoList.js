import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getItem } from "../../utility/localStorage";
import { getMemoWithUser } from "../../redux/memo/actionCreator";
import "./styles.css";

const MemoList = () => {
    const [memo, setMemo] = useState([]);       
    const dispatch = useDispatch();
           
    useEffect( () => {  
        getAllMemo();
    },[]);

    let response;        
    const getAllMemo = async () => {
        // get memo list with user
        const body = {
            user_id : getItem('user').id
        };        
        response = await dispatch(getMemoWithUser(body));        
        console.log(response.data.data);
        // setMemo(prevState => ([...prevState, response.data.data]));
        setMemo( () => response.data.data)
        
    };

    useEffect(() => {        
        // todo for memo change.                    
        if(memo.length>0){
            console.log(memo);   
        }
    }, [memo]);

    return (        
        <div className="memo-container">                        
            {memo.length>0 ? memo.map( (memo, idx) => {
                return (
                    <div key={idx} className="memo-container__item">
                        <div className="memo-container__time">
                            <span>{memo.createdAt.substr(0,10)} {memo.createdAt.substr(11,5)}</span>
                        </div>
                        <div className="memo-container__memo">
                            <span>{memo.memo}</span>
                        </div>
                    </div>
                )}) 
            : <span>Loading...</span>
            }            
        </div>  
    );
};



export default MemoList;