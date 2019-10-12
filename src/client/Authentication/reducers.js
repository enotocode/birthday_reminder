import { combineReducers } from 'redux';

import {
        SET_USER,        
        LOGOUT_SUCCESS
        } from './actions';

import initialState from './initialState';

// Now depricated 
//function isLogin(state = initialState.isLogin, action) {
//   
//    switch (action.type) {
//        case SET_USER:
//            return true;
//        case LOGOUT_SUCCESS:
//            return false;
//        default:
//            return state;
//    }    
//}

function user(state = initialState.user, action) {
    console.log(action);
    switch (action.type) {
        case SET_USER:
            return action.user;
        case LOGOUT_SUCCESS:
            return null;
        default:
            return state;
    }   
}

const AuthenticationReducer = combineReducers({
//    isLogin,
    user
});

export default AuthenticationReducer;

