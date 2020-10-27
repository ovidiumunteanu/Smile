import * as TYPES from "../actions/types";

const initialState = {
    uid : "",
    email : "",
    phoneNumber : "",
    countryCode :"",
    countryDialCode : "",
    fullname : "",
    birthdate : new Date(),
    gender : "",
    photos:["","","","","",""],
    location : "",
    distance: 1,
    country : "",
    city : "",
    notification : true,
    plan :"free",
}

const UserReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case TYPES.LOGIN_SUCCESS :
            return {
                ...state,
                ...payload
            }
        case TYPES.REGISTER_SUCCESS :
            return {
                ...state,
                uid : payload.uid
            }
        case TYPES.UDPATE_USER_STATE:
            return {
                ...state,
                ...payload
            } 
        case TYPES.UPDATE_USER_SETTING:
            const { uid, position,...user} = payload;    
            return {
                ...state,
                ...user
            }
        case TYPES.LOGOUT :
            return {
                ...initialState
            }
        default: return state;
    }

}

export default UserReducer;