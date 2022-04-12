import React, {useState}  from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

//https://www.npmjs.com/package/react-calendar
//C:\Users\jakub\Desktop\ecommerce\frontend\node_modules\react-calendar\dist

function BookingCalendar() {


    const props = { placeholder: 'Please Select...' };
    const [openPicker, setOpenPicker] = React.useState(false);
    const show = () => {
        setOpenPicker(true);
    };
    const onClose = () => {
        setOpenPicker(false);
    };

    
    const [value, onChange] = useState(new Date());
    console.log(value.getDate)

    return (
        <div className='picker-calendar'>
            <Calendar
            className = 'datePicker'
            locale='pl'
            minDate={new Date()}
            maxDetail = 'month'
            onChange={onChange}
            value={value}
            //calendarType = 'US'
            next2Label = {null}
            prev2Label = {null}
            showDoubleView = {true}
            selectRange = {true}
        />

        </div> 
    )
}

export default BookingCalendar
