import React from 'react';
import { Link } from "react-router-dom";

import InputLabel from '../components/InputLabel';
import TextInput from '../components/TextInput';
import FormStatusBar from '../components/FormStatusBar';
import Button from '../components/Button';
import classNames from 'classnames';

import ValidationError from '../Errors/ValidationError';
import JsonApiError from '../Errors/JsonApiError';

import {
    submitSingnInForm
    } from '../services/apiCall';
import initialState from './initialState';      
import {
    validateWithApi,
    validate
} from '../services/validator';
import {validationRules} from './validationRules';
import throttle from '../services/throttle';


class SignUpFormLSComponent extends React.Component { 
    
    constructor(props) {
        super(props)
        let { status, fieldset: {statusBar, inputs} } = initialState; 
        this.state = {};
        this.state.status = status;
        this.state.statusBar = statusBar; //for displaing messages for user 
        this.state.inputs = inputs;
        // Method
        // Throttling for server validation
        this.validateAsyncThrottle = throttle(this.handleAsyncValidation, 5000);          
    }    
    
    onSubmit() {
        let inputs = this.state.inputs;
        let inputsValues = {};
        inputs.forEach(function (input) {
            inputsValues[input.name] = input.value;
        });
        
        
        submitSingnInForm(inputsValues)
                .then((response) => {
                    this.setState({ statusBar: 'Form is submited' });
                    this.handleResponse(response);
                    this.props.fetchUserInfo();
                 })
                .catch(errors => {
                    this.setError(errors);
                    this.setState({ isSubmiting: false })
                })      
                          
    }   
    
    onInputChange(index, name, value) {
        
        this.updateInputsState(index, name, value);
        // Client validation
        let errors = validate(name, value, validationRules);
        if (errors.length > 0) {
            this.setError(errors, name);
        }
        // Server validation
        this.validateAsyncThrottle(name, value, index);           
    }
    
    updateInputsState(index, name, value) {

        // pass the prevState to get latest version of the state
        this.setState((prevState) => {

            let inputs = prevState.inputs;     
            let newInputs = inputs.map((input, i) => {
                 if (index === i) {
                    return Object.assign({}, input, {
                        value: value,
                        errorMessage: ''
                    });
                }            
                return input;
            }) 
            return { inputs: newInputs }
            })
        }

    handleAsyncValidation(valueName, value, index) {    

        validateWithApi(valueName, value, validationRules).then(
                // Erase old error message
                json => this.setError('', valueName),
                error => this.setError(error, valueName)
                );
    }
    
    handleResponse(response) {
        let inputs = this.state.inputs;
        if (response.isError) {
            return inputs.map((input, index) => {
                if (input.name in response.errors) {
                    input.errorMessage = response.errors[input.name];
                }
                return input;
            });
        } else {
            return inputs.map((input, index) => {
                return input.errorMessage = "";
            });
        };
    }
    /**
     * 
     * @param {Array} errors
     * @param {string} valueName
     */
    setError(errors, valueName) {    
        
        if ( !(errors instanceof Array) ) {
            throw new Error ('Errors must be an instance of Array');
        }
        
        let validationErrors = [];
        let remainingErrors = errors;        
        
        // Collect Validation errors that have inputs in the form
        if (errors instanceof Array && errors[0] instanceof ValidationError) {
            this.state.inputs.forEach( input => {
                remainingErrors.forEach( (error, i) => {
                   if (input.name === error.valueName) {
                       remainingErrors.splice(i, 1);
                       validationErrors.push(error);
                   } 
               })
            });
        }
        
       
        // Update state to display ValidationError
        if (validationErrors.length > 0) { 
            console.log('Validating error');
            
            this.setState((prevState) => {
                // Inputs will be return to state
                let inputs = prevState.inputs; 
                // There may be more than one error in the one input
                let lastValueName = false;
                
                validationErrors.forEach((e, i)=>{                    
                    
                    inputs = inputs.map((input)=>{                        
                    
                        if (input.name === e.valueName) {
                            if (e.valueName === lastValueName) {
                                input.errorMessage = input.errorMessage + ' ' + e.message;                                              } else {
                                input.errorMessage = e.message;
                            }
                            return input;
                        }
                        return input;
                    }) 
                    lastValueName = e.valueName;
                }); 
                return ({inputs: inputs})                
            })
        }
        console.log(remainingErrors);
        // Displaying remainded errors:
        // SyntaxError in response.json()
        // Network error
        // Fetch() error
        if (remainingErrors.length > 0) {
           
            this.setState( prevState => {
                return { statusBar: 'Something going wrong... ' } 
            });
            throw remainingErrors;
            
        } else {
            
            this.setState( prevState => {
                return { statusBar: '' } 
            });
        }
        
    }
    
    
    render() {
        return (
                <div className='modal-bg'>         
                <Link to="/" className='modal-link'></Link>
                <form className='modal-form is-shadow-3'
                    onSubmit={(e) => {
                               e.preventDefault();
                               this.onSubmit()
                                   }}>
                <Link to="/"><span className="close button-right"></span></Link>
                      
                    <h2>Sign Up</h2>
                   
                        {this.state.inputs.map((input, index) => (
                                            <div 
                                                className="form-item"
                                                key={index}
                                                >
                                                <InputLabel
                                                    label={input.label}
                                                    required={input.required}                        
                                                    />                        
                                                <TextInput
                                                    required={input.required}
                                                    type={input.type}
                                                    name={input.name}
                                                    value={input.value}
                                                    onChange={(event) => this.onInputChange(
                                                            index,
                                                            event.target.name,
                                                            event.target.value
                                                            )}
                    
                                                    />
                                                <span className="error">
                                                    {input.errorMessage}
                                                </span>                
                                            </div>
                                            ))}
                        <div className="form-item flex-center">
                            <Button
                                type='submit'
                                text='Sign in!'
                                isDisabled={this.state.status.isDisabled}
                                isSubmiting={this.state.status.isSubmiting}
                            />
                            { this.state.status.submitFailed || this.state.statusBar ?
                                            <FormStatusBar                    
                                                message = {this.state.statusBar}
                                                onRetry = {() => onSubmit(this.state.inputs)}
                                                button = {this.state.status.submitFailed}
                                                /> : "" } 
                            <Link to="/signin" className='is-push-right'>Create Account</Link>                
                        </div>
                
                </form>
                </div>
                    )
    }
}


export default SignUpFormLSComponent;