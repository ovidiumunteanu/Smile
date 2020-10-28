import { call, put, select } from 'redux-saga/effects';
import * as Types from "../actions/types";
import * as RootNavigation from '../navigations/navHelper';
import { Alert } from "react-native";
import { savePushNotificationToken, RegisterUser } from "../utils/firebase";
export const getStore_User = (state) => state.UserReducer;
export function* loginSuccess(action){
    const { payload } = action;
    yield call(savePushNotificationToken);
    yield put({type: Types.UDPATE_USER_STATE, payload : payload });
    yield call(RootNavigation.navigate,"MainStack");
}

export function* registerSuccess(action){
    const { payload } = action;
    yield put({type: Types.UDPATE_USER_STATE, payload : payload});
    let user = yield select(getStore_User); // <-- get the project
    yield call(RegisterUser, user);
}