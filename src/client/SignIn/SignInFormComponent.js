import React from 'react';
import InputLabel from '../components/InputLabel';
import TextInput from '../components/TextInput';
import FormStatusBar from '../components/FormStatusBar';
import Button from '../components/Button';
import classNames from 'classnames';
      

class SignInFormComponent extends React.Component { 
    
    
    render() {
        const {fieldset, onInputChange, onSubmit, status} = this.props;
        const {inputs, statusBar} = fieldset;
        return (
                <fieldset>       
                    <legend>Sign In</legend>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit(inputs)
                            }}
                          >
                        {inputs.map((input, index) => (
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
                                                    onChange={(event) => onInputChange(
                                                            index,
                                                            event.target.name,
                                                            event.target.value
                                                            )}
                                                    className={classNames({
                                                        error: input.errorMessage,
                                                        loading: input.dataSubmiting
                                                        })}                     
                                                    />
                                                <span className="error">
                                                    {input.errorMessage}
                                                </span>                
                                            </div>
                                            ))}
                        <Button
                        type='submit'
                        text='Sign in!'
                        isDisabled={status.isDisabled}
                        isSubmiting={status.isSubmiting}
                        />
                        { status.submitFailed || statusBar ?
                                        <FormStatusBar                    
                                            message = {statusBar}
                                            onRetry = {() => onSubmit(inputs)}
                                            button = {status.submitFailed}
                                            /> : "" }      
                
                    </form>
                </fieldset>
                    )
    }
}


export default SignInFormComponent;