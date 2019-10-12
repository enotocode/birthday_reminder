import {
    submitSingnUpForm
} from '../services/apiCall';
import {
    validate,
    validateWithApi as validateAsync
} from '../services/validator';
import {validationRules} from './validationRules';
import throttle from '../services/throttleForThunk'

export function handleCnangeInputValue(dispatch, index, valueName, text){
    
    dispatch(cnangeInputValue(index, valueName, text));
    
    // Anonymous wrapper function is required by the Thunk middleware
    return function (dispatch) {
        // Client validation
        let errors = validate(valueName, text, validationRules);
        if (errors)
            dispatch(setErrorMessage(index, errors));
        // Server validation
        //dispatch(handleAsyncValidation(valueName, text, index));
        dispatch(validateAsyncThrottle(valueName, text, index))
    }
}
;

export const CHANGE_INPUT_VALUE = 'CHANGE_INPUT';
function cnangeInputValue(index, valueName, text) {
    return {
        type: CHANGE_INPUT_VALUE,
        index,
        valueName,
        text
    };
}

export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
export function setErrorMessage(index, text) {
    return {    
        type: SET_ERROR_MESSAGE,
            index, text
    };
}
;

//Throttling for server validation
let validateAsyncThrottle = throttle(handleAsyncValidation, 5000);
export function handleAsyncValidation(valueName, value, index) {    
    // Anonymous wrapper function is required by the Thunk middleware
    return function (dispatch) {
        dispatch(requestAsyncValidation(index));
        return validateAsync(valueName, value).then(
                json => dispatch(asyncValidationSuccess(dispatch, json, index)),
                error => dispatch(asyncValidationError(error, index))
        )
    }
}
;
export const ASYNC_VALIDATION_ERROR = 'ASYNC_VALIDATION_ERROR';
function asyncValidationError(error, index) {
    return {
        type: ASYNC_VALIDATION_ERROR,
        error: error,
        index: index
    }
}
;

export const ASYNC_VALIDATION_SUCCESS = 'ASYNC_VALIDATION_SUCCESS';
export function asyncValidationSuccess(dispatch, response, index) {
    let text = null;
    if (response.isError) {
        let text = '';
        response.errors.forEach(errorMessage => {
            text += errorMessage;
        })
        dispatch(setErrorMessage(index, text));
    }

    return {
        type: ASYNC_VALIDATION_SUCCESS,
        response: text,
        index: index
    };
}
;

export const ASYNC_VALIDATION_REQUEST = 'ASYNC_VALIDATION_REQUEST';
function requestAsyncValidation(index) {
    return {
        type: ASYNC_VALIDATION_REQUEST,
        index: index
    };
}
;


//export const SUBMIT = 'SUBMIT';
export function handleSubmit(dispatch, inputs) {
    var inputsValues = getImputsValues(inputs);
    dispatch(requestSubmit(inputsValues));

    // Anonymous wrapper function is required by the Thunk middleware
    return function (dispatch) {
        return submitSingnUpForm(inputsValues)
                .then(
                    json => dispatch(requestSuccess(json))
                ).catch(
                    error => dispatch(requestError(error))
                )
    };
}
;

export const RECIEVE_VALIDATING_ERRORS = 'RECIEVE_VALIDATING_ERRORS';
export function recieveValidatingErrors(errors) {
    return {
        type: RECIEVE_VALIDATING_ERRORS,
        errors: errors
    };
}
;

export const USER_CREATED = 'USER_CREATED';
function userCreated(response) {
    return {
        type: USER_CREATED,
        text: response
    }
}
function getImputsValues(inputs) {
    let inputsValues = {};
    inputs.forEach(function (item) {
        inputsValues[item.name] = item.value;
    });
    //console.log(inputsValues);
    return inputsValues;
}
;


// Api call action

export const REQUEST_ERROR = 'REQUEST_ERROR';
function requestError(error) {
    console.log('error')
    return {
        type: REQUEST_ERROR,
        error: error
    }
}
;

export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export function requestSuccess(json) {
    return {
        type: REQUEST_SUCCESS,
        response: json,
    };
}
;

export const REQUEST_SUBMIT = 'REQUEST_SUBMIT';
function requestSubmit(inputs) {
    return {
        type: REQUEST_SUBMIT,
        inputs: inputs
    };
}
;