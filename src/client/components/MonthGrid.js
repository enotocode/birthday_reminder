import React from 'react';
import Cell from './Cell';
import Row from './Row';
import getMonthName from '../Helpers/getMonthName';


class MonthGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    componentWillReceiveProps(nextProps) {
        // Initialization state whem the form is showed
        this.state.date = nextProps.date;       
    }

    createWeekRows( {year, month} ) {
        
        var d = new Date(year, month);
        var curD = new Date(); // current date
        var curM = curD.getMonth();
        
        // offset from start of week to today date
        var offset = (d.getDay() == 0) ? 6 : d.getDay() - 1;
        d.setDate(d.getDate() - offset);
        
        // calendar grid weekRows[week][day]={date events}
        var weekRows = [];  
        var week = 0;  
        weekRows[week] = [];
        // create new day   
        for (var i = 0; i < 42; i++) {           
            var m = d.getMonth(); 
            var date = d.getDate();                    
            
            weekRows[week].push({
                dateObj: new Date(year, m, date),
                date: date,
                month: (date===1) ? getMonthName(m) : '',
                events: this.getEvents(d),
                isCurrentDate: (date === curD.getDate()),
                isCurrentMonth: (m === curM)
            });
            // end of week-row
            if (d.getDay() == 0 && week<5) { 
                week++; 
                weekRows[week] = [];
            }
            
            d.setDate(d.getDate() + 1);
        }
        return weekRows;
    }
    
    getYearMonth() {
        return {
            year: this.state.date.getFullYear(),
            month: this.state.date.getMonth()
        };
    }
    
    getEvents(date) {
        var events = this.props.events.filter(event=>{
            if( this.isDatesSame(event.date, date) ) {
                return event;
            }
        })
        return events;
    }
    
    isDatesSame(string, date) {        
        var dateStr = new Date(Date.parse(string));
        //console.log(dateStr.toDateString() + " " + date.toDateString() );
        return (dateStr.toDateString() == date.toDateString());
    }

    render() {
        var { className } = this.props;
        className = className ? className + ' ' : '';
        
        return (
                <div className={className + "month"}>                    
                    {this.createWeekRows( this.getYearMonth() ).map((days, weekNumber) => <Row 
                        key={weekNumber} 
                        days={days}
                        onEventClick={this.props.onEventClick}
                                />)}
                </div>
                )
    }
}

export default MonthGrid;