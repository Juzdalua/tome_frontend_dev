import DatePicker from "react-datepicker";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getItem } from "../../utility/localStorage";
import { getMemoWithUser, deleteMemo, downloadExcel } from "../../redux/memo/actionCreator";
import "./styles.css";
import "react-datepicker/dist/react-datepicker.css";
           
function Memo(){
    const [memo, setMemo] = useState([]);    
    const [startDate, setStartDate] = useState();   
    const [endDate, setEndDate] = useState();   
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
        // setMemo(prevState => ([...prevState, response.data.data]));        
        setMemo( () => response.data.data);
    };   

    const onXbuttonHandler = async (event) => {
        const ok = window.confirm("메모를 삭제하시겠습니까?");
        if(!ok)
            return ;
        const id = event.target.parentElement.childNodes[0].id;
        // setMemo( (currentArray) => currentArray.filter((element) => element.id !== id) )
        const body = {
            id: id
        };
        const response = await dispatch(deleteMemo(body));
        
        if(response.status === 200){
            window.location.href="/memo";
        };//if
    };

    const onExcelDownloadHandler = async (event) => {
        event.preventDefault();
        const ok = window.confirm("전체 메모 텍스트 목록을 다운받으시겠습니까?");
        if(!ok)
            return;
        const body = {
            user: getItem('user')
        };
        
        const response = await dispatch(downloadExcel(body));
        console.log(response);
    };

    const onHandlerMemosWithDate = (event) => {
        event.preventDefault();
        const start_date = moment(startDate).format("YYYY-MM-DD");
        const end_date = moment(endDate).format("YYYY-MM-DD");
        
    };

    return (                        
        <div>
            <div className="memo-detail">
                <div className="memo-detail__inshort">                    
                    <span className="memo-detail__inshort-item">{getItem('user').username}님의 메모 갯수: {memo.length}개</span>
                </div>
                <div className="memo-detail__excel">
                    {/* <button className="memo-detail-excel__btn" onClick={onExcelDownloadHandler}>엑셀로 다운받기</button> */}
                    <button className="memo-detail-excel__btn" onClick={onExcelDownloadHandler} disabled={true}>엑셀로 다운받기<br/>준비중입니다.</button>
                </div>
                <div className="memo-detail__calendar">
                    <div className="memo-detail__calendar-item">
                        <div className="memo-detail__calendar-item__title">
                            <span>검색하려는 기간을 입력하세요.</span>
                        </div>
                        <div className="memo-detail__calendar-item__data">
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} placeholderText="날짜를 선택하세요." dateFormat="yyyy.MM.dd" className="start_date"/>
                            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} placeholderText="날짜를 선택하세요." dateFormat="yyyy.MM.dd" className="end_date"/>
                        </div>
                        <div className="memo-detail__calendar-item__btn">
                            <button onClick={onHandlerMemosWithDate}>검색</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="memo-detail-container">                                    
                {memo.length>0 ? memo.map( (memo, idx) => {
                    return (                    
                        <div key={idx} className="memo-detail-container__item">                        
                            <div className="memo-container__time">
                                <span id={memo.id}>{memo.createdAt.substr(0,10)} {memo.createdAt.substr(11,5)}</span>
                                <button className="memo-container__xbtn" onClick={onXbuttonHandler}><img src={process.env.PUBLIC_URL+"img/garbage.png"}></img></button>
                            </div>
                            <div className="memo-container__memo">
                                <span>{memo.memo}</span>
                                {memo.images !== "" ? <img className="memo-detail-container__image" src={memo.images[0].image_path} alt=""/>
                                : null}
                            </div>
                        </div>
                    )}) 
                : <span>등록된 메모가 없습니다.</span>
                }            
            </div>  
        </div>
    );
};

export default Memo;