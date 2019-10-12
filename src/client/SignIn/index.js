import React from 'react';
import { connect } from 'react-redux'
import { 
    handleCnangeInputValue,
    handleSubmit
} from './actions';  
import SignInFormComponent from './SignInFormComponent';
 
/*
 * Container
 */
const mapStateToProps = state => {
    return  {
        fieldset: state.SignInFormReducer.fieldset, 
        status: state.SignInFormReducer.status
    };   
};

const mapDispatchToProps = dispatch => {
    return {      
        onInputChange: (index, valueName, text) => {
            dispatch(handleCnangeInputValue(dispatch, index, valueName, text));
        },
        onSubmit: (inputs) => {
            dispatch(handleSubmit(dispatch, inputs));
        }
    };
};

const SignInForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInFormComponent);


export default SignInForm;
