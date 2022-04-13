import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";

const ExampleDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [wybranyDzien, setWybranyDzien] = useState("");

  const [day, handleDateSelect] = useState("");
  //console.log(date)

  const test = (date) => {
    console.log("data przed useEffeft", startDate);
  };

  useEffect(() => {
    console.log("działa useEffect", startDate);
  }, [startDate]);

  return (
    <main>
      <DatePicker
        selected={startDate}
        onChange={(startDate) => setStartDate(startDate)}
        //onSelect={handleDateSelect}
        onSelect={() => test(startDate)}
        minDate={new Date()}
      />
      <p>{String(startDate)}</p>
    </main>
  );
};

export default ExampleDatePicker;
