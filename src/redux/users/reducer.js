import actions from "./actions";
const {JOIN_USER, JOIN_USER_VALID} = actions;

const userReducer = (state={}, action) => {
    switch (action.type) {
        case JOIN_USER:            
            return {
                ...state, 
                payload: action.payload,                
            };
        case JOIN_USER_VALID:
            return {
                ...state,
                payload:action.payload,
            };
                
        default:
            return state;
    }
};

export default userReducer;