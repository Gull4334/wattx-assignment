import { combineReducers } from "redux";
import dataReducer from "./reducer";

const reducers = combineReducers({
    data: dataReducer
});

export default reducers;