import React from 'react';
import Event from './Event';

const Day = ({ day, onEventClick }) => {    
    var classNames=day.isCurrentMonth ? ' color-black' : '';
        classNames=day.isCurrentDate ? classNames + ' label is-badge is-focus current-date' : classNames;

    return (
            <div className="day">
                <span onClick = {(e) => onEventClick(null, e, day)}
                    className={'day-span' + classNames}>{day.date}
                </span>
                {day.month ? <span className={'day-span' + classNames}>{day.month}</span> : ''}
                {day.events.map( (event, i) =>  <Event 
                    key = {i} 
                    id = {event.id} 
                    title = {event.title}
                    onEventClick = {onEventClick}
                    classNames='label is-focus event'        
                            /> ) }
            </div>
    )
}

export default Day