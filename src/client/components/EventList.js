import React from 'react';
import Event from './Event';

class EventList extends React.Component { 
    
    constructor(props) {
        super(props);
    }
    
    mapEventsGroups(groups, props) {
        return (
            <div>
                {groups.todayEvents ? <h5 className="is-muted is-small">Today events</h5> : ''}
                {groups.todayEvents ? this.mapEvents(groups.todayEvents, props) : ''}
                
                {groups.upcomingEvents ? <h5 className="is-muted is-small">Upcoming events</h5> : ''}
                {groups.upcomingEvents ? this.mapEvents(groups.upcomingEvents, props) : ''}
                
                {groups.monthEvents ? <h5 className="is-muted is-small">In this month</h5> : ''} 
                {groups.monthEvents ? this.mapEvents(groups.monthEvents, props) : ''}  
                        
                {groups.remaingEvents ? <h5 className="is-muted is-small">In this year</h5> : ''} 
                {groups.remaingEvents ? this.mapEvents(groups.remaingEvents, props) : ''} 
            </div>//
        )
    }
    
    mapEvents(events, props) {
        var { onEventClick } = props;
        
        return (
            <div className="is-container-column">
                {events.map( (event, i) =>  
                <Event 
                    key={i} 
                    id = {event.id}
                    title = {event.title}
                    type = {event.type}
                    /* date = {event.date} */
                    onEventClick = {onEventClick}
                    classNames=''
                /> )}
            </div>//
        )
    }
    
    getThisMonthEvents(events) {
        
        var date = new Date();
        var month = date.getMonth();
        
        var filtered = events.filter( (event) => {
            var eDate = new Date(Date.parse(event.date));
            var eMonth = eDate.getMonth();
            if (month == eMonth) return event;
        })
        
        return filtered;
    }
    
    getUpcomingEvents(events) {
        
        var d = new Date();
        var date = d.getDate();
        
        var filtered = events.filter( (event) => {
            var eD = new Date(Date.parse(event.date));
            var eDate = eD.getDate();
            if (date - eDate >= -7 && date - eDate <= 0) return event;
        })
        
        return filtered;   
          
    }
    
    getTodayEvents(events) {
        
        var d = new Date();
        var date = d.getDate();
        
        var filtered = events.filter( (event) => {
            var eD = new Date(Date.parse(event.date));
            var eDate = eD.getDate();
            if (date === eDate) return event;
        })
        
        return filtered;   
          
    }
    
    getArrayDiff(events1, events2){
        return events1.filter(e => !events2.includes(e))
    }
    
    groupEvents(events) {
        
        var groups = {};
        
        var todayEvents = this.getTodayEvents(events);
        var remaingEvents = this.getArrayDiff(events, todayEvents);
        
        var upcomingEvents = this.getUpcomingEvents(events);
        var remaingEvents = this.getArrayDiff(events, upcomingEvents);
        
        var monthEvents = this.getThisMonthEvents(remaingEvents);
        var remaingEvents = this.getArrayDiff(remaingEvents, monthEvents);
        
        if (todayEvents.length !== 0) {
            groups['todayEvents'] = todayEvents;
        }
        if (upcomingEvents.length !== 0) {
            groups['upcomingEvents'] = upcomingEvents;
        }
        if (monthEvents.length !== 0) {
            groups['monthEvents'] = monthEvents;
        }
        if (remaingEvents.length !== 0) {
            groups['remaingEvents'] = remaingEvents;
        } 
        
        return groups;
    }
//                    <h4>In this year</h4>
//                {this.mapEvents( groups.remaingEvents, onEventClick )}  
    
    render() {
        var {events, onEventClick, className} = this.props;
        var groups = this.groupEvents(events);
        className = className ? className + ' ' : '';
        
        return (
            <div className={className  + 'event-list'}>
                {this.mapEventsGroups(groups, {onEventClick} )}                  

            </div>
        )
    }
}

export default EventList