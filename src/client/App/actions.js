import {
    requestUserInfo,
    requestLogout
} from '../services/apiCall';


export function initApp() {
    var inputsValues = getImputsValues(inputs);
    dispatch(requestSubmit(inputsValues));

    // Anonymous wrapper function is required by the Thunk middleware
    return function (dispatch) {
        return submitSingnInForm(inputsValues)
                .then(
                    json => dispatch(requestSuccess(json))
                ).catch(
                    error => dispatch(requestError(error))
                )
    };
}
;


export const SET_USER = 'SET_USER';
export function setUser(json) {
    console.log('setUser');
    return {
        type: SET_USER,
        user: {
            name: json.userName,
            mail: json.mail
        }
    };
}
;

export const FETCH_USER_INFO = 'FETCH_USER_INFO';
export function fetchUserInfo() {
    console.log('fetchUserInfo');
    return function (dispatch) {

        // Return Api call function
        return requestUserInfo()
                .then(
                    json => dispatch(setUser(json))
                ).catch(
                    error => dispatch(requestError(error))
        )
    }
}

export const INITIATE_LOGOUT = 'INITIATE_LOGOUT';
export function initiateLogout() {
    
    console.log('Initiating Logout');
    
    return function (dispatch) {
        
        // Api call function
        return requestLogout()
                .then(
                    json => {
                        dispatch(logoutSuccess());
                        console.log('logout Success');
            }
                ).catch(
                    error => dispatch(requestError(error))
                )
    }
}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export function logoutSuccess(message) {
    return {
        type: LOGOUT_SUCCESS,
        message: message
    };
}
;

// Dublicated methods
export const REQUEST_ERROR = 'REQUEST_ERROR';
function requestError(error) {
    console.log('error')
    return {
        type: REQUEST_ERROR,
        error: error
    }
}
;