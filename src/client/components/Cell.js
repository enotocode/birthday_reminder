import React from 'react';
import Day from './Day';

const Cell = ({ day, onEventClick, isCurrentMonth}) => {    

    return (
            <div className='is-row is-col is-10 day-cell is-gapless'>
                <Day 
                day={day}
                isCurrentMonth={isCurrentMonth}
                onEventClick={onEventClick}
                        />
            </div>
    )
}

export default Cell