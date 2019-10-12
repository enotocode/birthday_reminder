import React from 'react';
import { connect } from 'react-redux'
import { 
    handleCnangeInputValue,
    handleSubmit
} from './actions';  
import SignUpFormComponent from './SignUpFormComponent'; 
 
/*
 * Container
 */
const mapStateToProps = state => {
    return  {
        fieldset: state.SignUpFormReducer.fieldset, 
        status: state.SignUpFormReducer.status
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

const SignUpForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpFormComponent);


export default SignUpForm;
