import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getItem } from "../../utility/localStorage";
import { getMemoWithUser } from "../../redux/memo/actionCreator";

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

        setMemo( () => response.data.data);
        console.log(memo)
    };


    

    return (
        
        <div>            
            {memo.forEach( (item, idx) => {
                <span key={idx}>{item.createdAt}</span>
            })}
        </div>
    );
};

export default MemoList;