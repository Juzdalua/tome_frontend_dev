import actions from "./actions";
const {JOIN_USER} = actions;

const userReducer = (state={}, action) => {
    switch (action.type) {
        case JOIN_USER:
            return {
                ...state, 
                joinSuccess: action.payload
            }
                
        default:
            return state;
    }
};

export default userReducer;