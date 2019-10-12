import React from 'react';
import Cell from './Cell';

const Row = ({ days,  onEventClick}) => {   
    
 
    return <div className="is-row auto is-gapless week-row">
                {days.map( (day, dayNumber) =>  
                    <Cell 
                        key={dayNumber} 
                        day={day}                        
                        onEventClick={onEventClick}
                                />
                )}
            </div>
}

export default Row