import React from 'react';
import FormStatusBar from '../components/FormStatusBar';

/**
 * 403 Error  
 */
export default class AuthenticationError extends React.Component  {
    constructor (response) {
        super('Resonse with errors from server');
        this.errors = response.errors;
        this.response = response;
        this.name = 'JsonApiError';            
    }
    render() {
        return (
                <FormStatusBar                    
                    message = {this.state.statusBar}
                    onRetry = {() => onSubmit(this.state.inputs)}
                    button = {this.state.status.submitFailed}
                    />   
                        <Link to="/signin" className='is-push-right'>Have an account?</Link>
                   
                    )
                }
}

