import React from 'react';
import { Link } from "react-router-dom";

import InputLabel from '../components/InputLabel';
import TextInput from '../components/TextInput';
import FormStatusBar from '../components/FormStatusBar';
import Button from '../components/Button';
import classNames from 'classnames';
import ValidationError from '../Errors/ValidationError';
import JsonApiError from '../Errors/JsonApiError';
import MyLink from '../components/MyLink';


//import {submitSingnInForm} from '../services/apiCall';
import {checkAuth} from '../services/authentication';
import initialState from './initialState';	  

class SignInFormWSComponent extends React.Component { 
	
	constructor(props) {
		super(props)
		let { status, fieldset: {statusBar, inputs} } = initialState; 
		this.state = {};
		this.state.status = status;
		this.state.statusBar = statusBar; //for displaing messages for user 
		this.state.inputs = inputs;		
	}	
	
	onSubmit() {
		let inputs = this.state.inputs;
		// let inputsValues = {};
		// inputs.forEach(function (input) {
		// 	inputsValues[input.name] = input.value;
		// });	

		this.setState({ statusBar: 'Form is submiting...' });

		checkAuth(inputs[0].value, inputs[1].value)
			.then((response) => {
				console.log("Response is ok!");
				this.handleResponse(response);
			 })
			.catch(errors => {
				console.log("ERROR response!");
				this.setErrors(errors);
			})		

				// .then((response) => {
				//	 this.setState({ statusBar: 'Form is submited' });
				//	 this.handleResponse(response);
				//	 this.props.setUser();
				//  })
				// .catch(errors => {
				//	 this.setErrors(errors);
				//	 this.setState({ isSubmiting: false })
				// })						  
	}
	
	onInputChange(index, name, value) {

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
	

	handleResponse(response) {
		this.setState({ 
			statusBar: 'Form is submited',
			isSubmiting: false});

		// in case input values errors  
		/*	   
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
		*/

		// if all ok
		// this.props.setUser();
	}

	setErrors(error) {
		console.log(error);
		let id = new Date().getTime()+'_'+Math.random();
		this.setState({ 
			statusBar: error.message,
			statusBarMsgId: id
			})
	}
	// // <Link to="/" className='modal-link'></Link>
	render() {
		return (
				<div className='modal-bg'>
			   
					<form className='modal-form is-shadow-3'
						onSubmit={(e) => {
							e.preventDefault();
							this.onSubmit()
						}}> 
						<Link to="/"><span className="close button-right"></span></Link>			  
						<h2>Sign In</h2>
						
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
													onChange={(event) => onInputChange(
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
						
						<FormStatusBar					
							message = {this.state.statusBar}
							messageId = {this.state.statusBarMsgId}
							onRetry = {() => onSubmit(this.state.inputs)}
							button = {this.state.status.submitFailed}
							/> 
												
						<Link to="/signup" className='is-push-right'>Have an account?</Link>
					</div>
				</form>
			</div>
		)
	}
}


export default SignInFormWSComponent;