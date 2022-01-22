import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutKakao } from "../../redux/users/actionCreator";
import { getItem } from "../../utility/localStorage";


const LogoutKakao = () => {
   
    const dispatch = useDispatch();

    useEffect(() => {
        onLogoutHandler();
    },[]);

    const onLogoutHandler = async () => {        
        // logout kakao user
        // if(getItem('kakao_token')){
        //     const response = await dispatch(logoutKakao());
        //     if(response.status === 200)
        //         removeItem("kakao_token");
        // }//if       
        
        //logout kakao user with kakao account 
        const LOGOUT_REDIRECT_URI = `http://localhost:3001/logout`;
        window.location.href=`https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`; 
    };

    return (<div>

    </div>);
};

export default LogoutKakao;