import { combineReducers } from "redux";
import userReducer from "./users/reducer";
import memoReducer from "./memo/reducer";

const rootReducers = combineReducers({
    userReducer, 
    memoReducer, 
});

export default rootReducers;