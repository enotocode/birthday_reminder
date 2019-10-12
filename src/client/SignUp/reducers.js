import { combineReducers } from 'redux';

import {
CHANGE_INPUT_VALUE,
        SET_ERROR_MESSAGE,
        USER_CREATED,
        REQUEST_ERROR,
        REQUEST_SUCCESS,
        REQUEST_SUBMIT,
        ASYNC_VALIDATION_ERROR,
        ASYNC_VALIDATION_SUCCESS,
        ASYNC_VALIDATION_REQUEST
        } from './actions';

import validator from '../services/validator';
import { validationRules } from './validationRules'
import initialState from './initialState';

//helpers
import isEmptyObj from '../Helpers/isEmptyObj';

// Logic of processing actions s

function fieldset(state = initialState.fieldset, action) {
    
    let statusBarState = "";
    // call low level reducer
    let inputsState = inputs(state.inputs, action); 
    
    switch (action.type) {
        case REQUEST_SUCCESS:
        case REQUEST_ERROR:
            statusBarState = statusBar(state.statusBar, inputsState, action);
    } 
    
    return Object.assign({}, {statusBar: statusBarState}, {inputs: inputsState})    
}

// Extract and return errors messages, that have not its input field in form,
// and delete remaining errors 
function statusBar(state, inputs, action) {

    let message = "";
    let errors = action.response.errors;    
    
    for (var key in errors) {
        inputs.forEach((input)=>{
            if ( key == input.name) {
                delete errors[key];
            }
        })
    }
    if (!isEmptyObj(errors)) {
        message = JSON.stringify(errors);
    }
    console.log(message);
    return message;
}

function inputs(state, action) {
    switch (action.type) {  
        case CHANGE_INPUT_VALUE:
            return changeInputValue(state, action);
        case SET_ERROR_MESSAGE:
            return setErrorMessage(state, action);
        case REQUEST_SUCCESS:
            return handleResponse(state, action);
        case ASYNC_VALIDATION_REQUEST:
        case ASYNC_VALIDATION_ERROR:
        case ASYNC_VALIDATION_SUCCESS:
            return inputDataSubmit(state, action);
        default:
            return state;
    }
    return state;
}

function status(state = initialState.status, action) {
    switch (action.type) {
        case REQUEST_SUBMIT:
            return Object.assign({}, state, {
                recieveResponse: false,
                isSubmiting: true,
                isDisabled: true,
                submitFailed: false,
            });
        case REQUEST_SUCCESS:
            return Object.assign({}, state, {
                recieveResponse: true,
                isSubmiting: false,
                isDisabled: false
            });
        case REQUEST_ERROR:
            return Object.assign({}, state, {
                submitFailed: true,
                submitErrorMessage: action.error.message
            });
        default:
            return state;
}
}

// Helpers functions

function setErrorMessage(state, action) {
    return state.map((input, index) => {
        if (action.index === index) {
            return Object.assign({}, input, {errorMessage: action.text});

        }
        return input;
    });
}

function changeInputValue(state, action) {
    return state.map((input, index) => {
        if (action.index === index) {
            return Object.assign({}, input, {
                value: action.text,
                errorMessage: ''
            });

        }
        return input;
    });
}

function handleResponse(state, action) {

    const response = action.response;

    if (isError(response)) {
        return state.map((input, index) => {
            let newInput = Object.assign({}, input, {errorMessage: ""});
            if (newInput.name in response.errors) {
                newInput.errorMessage = response.errors[newInput.name];
            }
            return newInput;
        });
    } else {
        return state.map((input, index) => {
            return Object.assign({}, input, {errorMessage: ""});
        });
    }
    ;
}
;


function inputDataSubmit(state, action) {
    let status = false;
    
    switch (action.type) {
        case ASYNC_VALIDATION_REQUEST:
            status = true;
            break;
        case ASYNC_VALIDATION_ERROR:
        case ASYNC_VALIDATION_SUCCESS:
            status = false;
            break;
    }

    return state.map((input, index) => {
        if (action.index === index) {    
            return Object.assign({}, input, {dataSubmiting: status});
        }
        return input;
    })    
}

function isError(response) {
    return (response.isError === true);
}

function isEmpty(obj) {
  for (var key in obj) {
    return false;
  }
  return true;
}

const SignUpFormReducer = combineReducers({
    fieldset,
    status
});

export default SignUpFormReducer;

