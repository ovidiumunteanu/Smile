import { combineReducers } from 'redux';
import UserReducer from "./UserReducer";
// import MatchReducer from "./MatchReducer";

const rootReducer = combineReducers({UserReducer});

export default rootReducer;