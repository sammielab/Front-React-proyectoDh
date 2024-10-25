import React from 'react';
import { DatePicker, LocalizationProvider, PickersDay } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';


// Define your CustomDay component
export  const CustomDay = ({ day, outsideCurrentMonth, selected,  unavailableDays, ...other}) => {
   
  
    const unavailableDates = Object.keys(unavailableDays).map(date => moment(date));

    const isUnavailable = unavailableDates.some(unavailableDate =>{
      
        if(moment(day).format('YYYY-MM-DD')== moment(unavailableDate).format('YYYY-MM-DD')){
            return true
        }
    
        // return moment(day).isSame(unavailableDate, 'day')

    }
    );

    const isDisabled = (day) => {

        console.log(day)
        let state = false; 
        unavailableDates.forEach((udate) => {
           
            if(udate.format('YYYY-MM-DD') == day.format('YYYY-MM-DD')){
                state =  true;
            }
        })

        return state;
            
    }


    return (
        <PickersDay
            {...other}
            day={day}
            outsideCurrentMonth={outsideCurrentMonth}
            disabled={ isDisabled(day)}
            selected={selected}
        />
    );
};