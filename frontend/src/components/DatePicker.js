import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ExampleDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <main>
      <DatePicker
        selected={startDate}
        onChange={(startDate) => setStartDate(startDate)}
        onSelect={() => test(startDate)}
        minDate={new Date()}
      />
      <p>{String(startDate)}</p>
    </main>
  );
};

export default ExampleDatePicker;
