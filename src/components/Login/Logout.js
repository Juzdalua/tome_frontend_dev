import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getItem, removeItem } from "../../utility/localStorage";

const Logout = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();

    useEffect(() => {
        onLogoutHandler();
    },[]);

    const onLogoutHandler = async () => {                        
        if(getItem('kakao_token')){            
            removeItem('kakao_token');
        };

        removeItem('token');
        removeItem('user');
        
        navigator("/");
        // const response = await dispatch(logoutUser());
        // console.log(response);
    };

    return (
        <div></div>
    );
};

export default Logout;
