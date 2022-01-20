import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getKakaoToken, loginKakao } from "../../redux/users/actionCreator";

const LoginKakao = () =>{
    const dispatch = useDispatch();
    const navigator = useNavigate();

    useEffect( async() => {
        let response = await dispatch(getKakaoToken());
        
        if(response.status === 200){
            const userResponse = await dispatch(loginKakao(response));
            if(userResponse.status === 200)
                navigator("/");
        };
    },[]);

    return(
        <div>
            
        </div>
    );
};

export default LoginKakao;