import React from 'react';
import Event from './Event';
import getMonthName from '../Helpers/getMonthName';

const DateSwitcher = ({ date, nextMonth, prevMonth }) => {   
    
    return (
            <div className='pager date-switcher'>
                <a className="is-prev is-small" onClick={prevMonth}></a>
                <a className="is-next is-small" onClick={nextMonth}></a>
                <span className="is-current is-small">{getMonthName(date.getMonth()) + " " + date.getFullYear()}</span>
               
            </div>
    )
}

export default DateSwitcher