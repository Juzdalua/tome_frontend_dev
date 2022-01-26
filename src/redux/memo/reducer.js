import actions from "../users/actions";

const memoReducer = (state ={}, action) => { 
    switch (action.type) {
        case actions.CREATE_MEMO:
            return {
                ...state,
                payload: action.payload
            };
        case actions.GET_MEMO:
            return {
                ...state,
                payload: action.payload
            };   
        case actions.DELETE_MEMO:
            return {
                ...state,
                payload: action.payload
            };      
            
        default:
            return state;
    }
};

export default memoReducer;