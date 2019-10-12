import React from 'react';

const Event = ({ id, title, type, date, onEventClick, classNames}) => {    

    return (
            <div className="event">
                <span onClick = {(e) => onEventClick(id, e)}
                      className={classNames}>{title}</span>
                {type ? 
                    <tag><span> </span><span className="label event-type">{type}</span> </tag>: ''}
                <time>{date || ""}</time>
            </div>
    )
}

export default Event