import DatePicker from "react-datepicker";
import ko from "date-fns/locale/ko";
import moment from "moment";
import "moment-timezone";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getItem } from "../../utility/localStorage";
import { getMemoWithUser, deleteMemo, downloadExcel } from "../../redux/memo/actionCreator";
import "./styles.css";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
           
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

    const onHandlerMemosWithDate = async (event) => {
        event.preventDefault();
        const start_date = moment(startDate).tz("Asia/Seoul");
        const end_date = moment(endDate).tz("Asia/Seoul");

        if(start_date && end_date){
            if(startDate > endDate){
                alert("날짜 선택을 잘못 하셨습니다.");
                return ;
            }//
        }//
        
        const body = {
            user_id: getItem('user').id,
            start_date: start_date,
            end_date: end_date,
            // start_date: startDate,
            // end_date: endDate
        }// body
        const response = await dispatch(getMemoWithUser(body));
        setMemo( () => response.data.data);
    };

    return (                        
        <div>
            <div className="memo-detail">
                <div className="memo-detail__inshort">                    
                    <span className="memo-detail__inshort-item">{getItem('user').username}님의 메모 갯수: {memo.length}개</span>
                </div>
                <div className="memo-detail__excel">
                    <Link to="/"><span className="memo-detail__excel-goHome">&rarr; 글쓰러 가기</span></Link>
                    {/* <button className="memo-detail-excel__btn" onClick={onExcelDownloadHandler}>엑셀로 다운받기</button> */}
                    <button className="memo-detail-excel__btn" onClick={onExcelDownloadHandler} disabled={true}>엑셀로 다운받기<br/>준비중입니다.</button>
                </div>
                <div className="memo-detail__calendar">
                    <div className="memo-detail__calendar-item">
                        <div className="memo-detail__calendar-item__title">
                            <span>검색하려는 기간을 입력하세요.</span>
                        </div>
                        <div className="memo-detail__calendar-item__data">
                            <DatePicker maxDate={new Date(moment().format('YYYY-MM-DD'))} locale={ko} selected={startDate} onChange={(date) => setStartDate(date)} placeholderText="날짜를 선택하세요." dateFormat="yyyy.MM.dd" className="start_date"/>
                            <DatePicker maxDate={new Date(moment().format('YYYY-MM-DD'))} locale={ko} selected={endDate} onChange={(date) => setEndDate(date)} placeholderText="날짜를 선택하세요." dateFormat="yyyy.MM.dd" className="end_date"/>                                                        
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