import actions from "./actions";

const userReducer = (state={}, action) => {
    switch (action.type) {
        case actions.JOIN_USER:            
            return {
                ...state, 
                payload: action.payload,                
            };
        case actions.JOIN_USER_VALID:
            return {
                ...state,
                payload:action.payload,
            };
        case actions.LOGIN_USER:
            return {
                ...state,
                payload:action.payload,
            };
        case actions.LOGIN_KAKAO_TOKEN:
            return {
                ...state,
                payload:action.payload,
            };
        case actions.LOGIN_KAKAO_USER:
            return {
                ...state,
                payload:action.payload,
            };  
        case actions.LOGOUT_KAKAO_USER:
            return {
                ...state,
                payload:action.payload,
            };   
        case actions.CHANGE_PASSWORD:
            return {
                ...state,
                payload:action.payload,
            };       
            
            
        default:
            return state;
    }
};

export default userReducer;