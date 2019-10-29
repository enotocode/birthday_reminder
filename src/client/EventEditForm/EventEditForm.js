import React from 'react';
import InputLabel from '../components/InputLabel';
import TextInput from '../components/TextInput';
import Combobox from '../components/Combobox';
import FormStatusBar from '../components/FormStatusBar';
import Button from '../components/Button';
import classNames from 'classnames';
import ValidationError from '../Errors/ValidationError';
import JsonApiError from '../Errors/JsonApiError';

import {submitSingnInForm} from '../services/apiCall';
import initialState from './initialState';    

class EventEditForm extends React.Component {

    constructor(props) {
        super(props)
        let { status, eventRect, fieldset: {statusBar, inputs} } = initialState; 
        this.state = {};
        this.state.status = status;
        this.state.statusBar = statusBar; //for displaing messages for user 
        this.state.inputs = inputs;
        this.state.eventRect=eventRect;
        this.state.edited = false;
        
        // for rigth positioning form relatively borders of the browser window, 
        // because we can't define form's width before form will be rendered, 
        // let set its width once and for all
        this.width=300;        
            
        this.hydrateInputs = this.hydrateInputs.bind(this);     
        this.onInputChange = this.onInputChange.bind(this);
        this.saveInputsIntoEvent = this.saveInputsIntoEvent.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
    }  
    
    componentWillReceiveProps(nextProps) {
        // Initialization state whem the form is showed
        this.state.event = nextProps.event;
        this.state.show = nextProps.show;
        this.state.eventTypes = nextProps.eventTypes;
        if (nextProps.event) {
            this.hydrateInputs(nextProps.event);
        }
        this.state.edited = false;           
    }
    
    getCoordinates(eventRect) {
        // defaults value
        if (!eventRect) return {left:0, top:0};
        
        const fWidth = this.width;
        const margin = 10;
        let clWidth = document.body.clientWidth;
        let left, top;
        if (clWidth-eventRect.right > fWidth + margin) {
            left = eventRect.right + margin;
        } else {
            left = eventRect.left - fWidth - margin;
        } 
            top = eventRect.top;
            
        return {left:left, top:top, width: this.width};
    }
    
    hydrateInputs(event) {
        let inputs = this.state.inputs;        
        this.setState({
            inputs: inputs.map( (input)=> {
                if (input.name in event) {
                    var newInput = Object.assign({}, input, {value: event[input.name]})
                    return newInput
                }
                return input
            } )
        });
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
                    this.props.setUser();
                 })
                .catch(errors => {
                    this.setErrors(errors);
                    this.setState({ isSubmiting: false })
                })
                          
    }
    saveInputsIntoEvent() {
        // Merge this.state.inputs and this.state.event
        var newEvent = Object.assign({}, this.state.event);
        var inputs = this.state.inputs;
        inputs.forEach(input => {
            if (input.name in newEvent) {
                newEvent[input.name] = input.value;
            }
        });
        // console.log(newEvent);
        return newEvent;
    }
    onInputChange(name, value) {
        // pass the prevState to get latest version of the state
        // console.log(value);
        // console.log(name);
        this.setState((prevState) => {
            let edited = false;
            let inputs = prevState.inputs;                 
            let newInputs = inputs.map((input, i) => {
                 if (input.name === name) {
                    edited = true;
                    return Object.assign({}, input, {
                        value: value,
                        errorMessage: ''
                    });
                }            
                return input;
            });
            // console.log('edited: ' + edited);
            return { inputs: newInputs, edited: edited }
            })
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

    setErrors(errors) {
//        console.log(errors);
//        this.setState({ statusBar: errors })
    }    
    
    render() {
        // Hide by defaults
        if (!this.props.show) {     
            return null
        }
        return (                
                <fieldset   id='eventEditForm'                            
                            className='event-edit-form modal-form is-shadow-3' 
                            style={this.getCoordinates(this.props.eventRect)}>       
                    <legend>Edit event </legend>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        this.onSubmit()
                            }}>
                            <input type="hidden" id={(this.props.event) ? this.props.event.id : -1}/>
                        {this.state.inputs.map((input, index) =>   
                            { 
                                if (input.type=='text') {                                    
                                return <div 
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
                                                    event.target.name,
                                                    event.target.value
                                                    )}                    
                                        />
                                        <span className="error">
                                            {input.errorMessage}
                                        </span>                 
                                    </div>
                            } else if (input.type=='combobox') {                                
                                return <div 
                                        className="form-item"
                                        key={index}
                                    >
                                        <InputLabel
                                            label={input.label}
                                            required={input.required}                        
                                        />
                                        <Combobox
                                            required={input.required}
                                            type={input.type}
                                            name={input.name}
                                            value={input.value}
                                            onChange={this.onInputChange}  
                                            options={this.state.eventTypes}                  
                                        />
                                        <span className="error">
                                            {input.errorMessage}
                                        </span>                
                                    </div>
                            }}                                        
                        )}                          

                        { this.state.status.submitFailed || this.state.statusBar ?
                                        <FormStatusBar                    
                                            message = {this.state.statusBar}
                                            onRetry = {() => onSubmit(this.state.inputs)}
                                            button = {this.state.status.submitFailed}
                                            /> : "" }                
                    </form>
                        <Button                           
                            onClick = {this.props.onDelete}
                            isDisabled={this.state.status.isDisabled}
                            isSubmiting={this.state.status.isSubmiting}
                            secondary ='secondary'
                            icon='icon icon-bin'
                        />
                        <Button
                            text='Cancel'
                            onClick = {this.props.onClose}
                            isDisabled={this.state.status.isDisabled}
                            isSubmiting={this.state.status.isSubmiting}
                            secondary ='secondary'
                            right="right"
                        />
                        <Button
                            myClasses="icon-bin"
                            text='Save'
                            onClick = {()=> this.props.onSave( this.saveInputsIntoEvent(), this.state.edited)}
                            isDisabled={this.state.status.isDisabled}
                            isSubmiting={this.state.status.isSubmiting}
                            right="right"
                        />
                </fieldset>
                    )
    }
}

export default EventEditForm;