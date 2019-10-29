import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
        BrowserRouter as Router,
        Route,
        Link,
        Redirect,
        Switch
} from 'react-router-dom';
import { hot } from 'react-hot-loader';

// UserBar container
import UserBar from '../UserBar/index';

// AuthRequired HOC
import AuthRequired from '../components/AuthRequired';

// Login 
//import Login from '../components/Login';
import SignInFormWS from '../SignInFormWithState/index';
import SignUpFormWS from '../SignUpFormWithState/index';

import MonthGrid from '../components/MonthGrid';
import EventList from './EventList';
import EventEditForm from '../EventEditForm/EventEditForm';
import DateSwitcher from './DateSwitcher';
import yyyymmdd from '../Helpers/yyyymmdd';

// Services
import {saveEvent} from '../services/apiCall';
import {getAllEvents} from '../services/apiCall';
import {decodeJsonApi} from '../services/jsonApiToObject';

/*
 * App component
 */
class App extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = { 
            events: [
           
            ],
            eventTypes: [
                {
                    id: 1, 
                    name: 'BIRTHDAY'
                },{
                    id: 2, 
                    name: 'HOLIDAY'
                },{
                    id: 0, 
                    name: 'WEDDING'
            }],
            eventEditFormShow: false,
            eventEditFormEventId: null,
            eventEditFormDate: null,
            date: new Date()
        };        
        
        this.toggleEventEditForm = this.toggleEventEditForm.bind(this);
        this.editEvent = this.editEvent.bind(this);
        this.getEventById = this.getEventById.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.prevMonth = this.prevMonth.bind(this);
    }

    componentDidMount() {
        getAllEvents()
            .then((response) => {
                // console.log(response);
                // console.log(decodeJsonApi(response));
                let events = decodeJsonApi(response);
                this.setState({ events: events });
             })
            .catch(errors => {
                console.log(errors);
            });
    }
    
    toggleEventEditForm(eventId, e, day) {  
        console.log(day);
        console.log('eventId: ' + eventId);  
        var eventRect = (e) ? e.target.getBoundingClientRect() : null;

        this.setState( (prevState) => {
            let prId = prevState.eventEditFormEventId;
            let prShow = prevState.eventEditFormShow;
            let show;
            let newEventDate = null;
            // new event
            if (!eventId && day) {
                show = true;
                newEventDate = day.dateObj.yyyymmdd();
                eventId =-1;               
            // if click on the same event
            }else if (prId && prId === eventId) {
                show = !prShow;
            // click on cancel button   
            } else if (prShow && !eventId) {
                show = false;                
            // click on other event
            } else {
                show = true;
            }
        return {
            eventEditFormShow: show,
            eventEditFormEventId: eventId,
            eventEditFormEventRect: eventRect,
            eventEditFormNewEventDate: newEventDate
        }});
    }
    editEvent(newEvent, edited) {
        // console.log(edited);
        // console.log(newEvent.id);
        // save edited event in db
        if(edited) {
            saveEvent(newEvent)
                .then((response) => {
                // new event
                    if (newEvent.id < 0) {                        
                        this.setState( prevState => {
                            newEvent.id = response.id;
                            var newEvents = this.state.events.concat(newEvent);
                            return { events: newEvents }
                        });
                    } else {
                // existens event
                        var id = newEvent.id;
                        // var key;
                        var newEvents = this.state.events.map( (event, i) => {
                            // replace old event whith new event in events[]
                            if (event.id === id) return newEvent;
                            return event;
                        });
                        this.setState({
                            events: newEvents
                        });   
                    }
                })
                .catch(errors => {
                    console.log(errors);
                })       
        } 
    }

    getEventById(id) {
        var events = this.state.events;
        console.log('id: ' + id);
        let type;
        // create new event
        if (id<0) {
             // default event type
          return {
                id: -1,
                title: '', 
                event_type_id: 0,
                date: this.state.eventEditFormNewEventDate,
            };          
        }
        // existings event
        for (var i = 0; i<events.length; i++) {
            if (id == events[i].id) {
                // console.log(events[i]);
                return events[i]; 
            }
        };
        return null;
    }
    
    nextMonth() {
        this.setState( prevState => {
            var month = prevState.date.getMonth() + 1;
            var year = prevState.date.getFullYear();  
            console.log('nextMonth');       
            return { date: new Date(year, month) }
        });
    }
    
    prevMonth() {
        this.setState( prevState => {
            var month = prevState.date.getMonth() - 1;
            var year = prevState.date.getFullYear();  
            console.log('prevMonth');      
            return { date: new Date(year, month) }
        });
    }
    
    render() {
        
        return (
            <div className="wrapper">
                <div className="header">
                    <DateSwitcher 
                            date={this.state.date}
                            nextMonth={this.nextMonth}
                            prevMonth={this.prevMonth}
                    /> 
                    <UserBar/>
                </div>
                <div className="is-container center">
                    <EventList
                        events={this.state.events}
                        onEventClick={this.toggleEventEditForm}
                    />
                    <MonthGrid
                        date={this.state.date}
                        events={this.state.events}
                        onEventClick={this.toggleEventEditForm}
                    />
                </div>
                <EventEditForm 
                    show={this.state.eventEditFormShow} 
                    event={this.getEventById(this.state.eventEditFormEventId)} 
                    eventRect={this.state.eventEditFormEventRect}
                    onSave={this.editEvent}
                    onClose={this.toggleEventEditForm}
                    eventTypes={this.state.eventTypes}
                />                
                            
                <Route path="/signin" component={SignInFormWS}/>
                <Route path="/signup" component={SignUpFormWS}/>
                <Route path='/secret' component={AuthRequired(() => (<p>User is login now</p>))} />
            </div>
        )
    }
}
// <Link to="/secret">Secret</Link> 
export default hot(module)(App);
//export default App;