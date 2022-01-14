import { combineReducers } from "redux";
import userReducer from "./users/reducer";

const rootReducers = combineReducers({
    userReducer,
});

export default rootReducers;