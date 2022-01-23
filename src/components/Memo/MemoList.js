import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getItem } from "../../utility/localStorage";
import { getMemoWithUser } from "../../redux/memo/actionCreator";

const MemoList = () => {
    var [memo, setMemo] = useState([]);    
    const dispatch = useDispatch();
           
    useEffect( () => {  
        getAllMemo();
    },[]);
    
    const getAllMemo = async () => {
        // get memo list with user
        const body = {
            user_id : getItem('user').id
        };        
        let response = await dispatch(getMemoWithUser(body));        
        console.log(response.data.data);
        setMemo(() => response.data.data);
        console.log(memo)
    };

    return (
        
        <div>            
            {memo.map( memo => {
                <span key={memo.id}>memo.memo</span>
            })}
        </div>
    );
};

export default MemoList;