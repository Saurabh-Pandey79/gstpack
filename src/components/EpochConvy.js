import React, { useState } from 'react';

export default function EpochConvy() {
  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [second, setSecond] = useState('');
  const [amPm, setAmPm] = useState('');
  const [istday, setDayist] = useState('');
  const [istmonth, setMonthist] = useState('');
  const [istyear, setYearist] = useState('');
  const [isthour, setHourist] = useState('');
  const [istminute, setMinuteist] = useState('');
  const [istsecond, setSecondist] = useState('');
  const [istamPm, setAmPmist] = useState('');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleOnChange = (event) => {
    const inputValue = event.target.value;

    // Check if the input is empty, and if so, clear the values and return
    if (inputValue.trim() === '') {
      clearValues();
      setText(inputValue);
      return;
    }

    let inputSeconds = parseInt(event.target.value) || 0; // Convert input to an integer
    let istinputSeconds = parseInt(event.target.value) + 19800 || 0;

    inputSeconds = Math.min(Math.max(inputSeconds, 0), 95641757293);
    istinputSeconds = Math.min(Math.max(istinputSeconds, 0), 95641757293);

    // Constants for time units
    const secondsPerMinute = 60;
    const minutesPerHour = 60;
    const hoursPerDay = 24;
    const daysPerYear = 365;
    const epochYear = 1970;

    // Calculate seconds, minutes, hours, days, months, and years manually
    const extractedSecond = inputSeconds % secondsPerMinute;
    inputSeconds = Math.floor(inputSeconds / secondsPerMinute);
    const istextractedSecond = istinputSeconds % secondsPerMinute; // IST
    istinputSeconds = Math.floor(istinputSeconds / secondsPerMinute); // IST
    const extractedMinute = inputSeconds % minutesPerHour;
    inputSeconds = Math.floor(inputSeconds / minutesPerHour);
    const istextractedMinute = istinputSeconds % minutesPerHour; // IST
    istinputSeconds = Math.floor(istinputSeconds / minutesPerHour); // IST
    const extractedHour = inputSeconds % hoursPerDay;
    inputSeconds = Math.floor(inputSeconds / hoursPerDay);
    const istextractedHour = istinputSeconds % hoursPerDay; // IST
    istinputSeconds = Math.floor(istinputSeconds / hoursPerDay); // IST

    // Calculate the year and remaining days
    let remainingDays = inputSeconds;
    let extractedYear = epochYear;
    let istremainingDays = istinputSeconds; // IST
    let istextractedYear = epochYear; // IST

    while (istremainingDays >= daysPerYear) {
      istextractedYear++;
      const isLeapYear = (istextractedYear % 4 === 0 && istextractedYear % 100 !== 0) || (istextractedYear % 400 === 0);
      istremainingDays -= isLeapYear ? 366 : 365;
    } // IST

    while (remainingDays >= daysPerYear) {
      extractedYear++;
      const isLeapYear = (extractedYear % 4 === 0 && extractedYear % 100 !== 0) || (extractedYear % 400 === 0);
      remainingDays -= isLeapYear ? 366 : 365;
    }

    // Calculate the month and day based on the remaining days
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let extractedMonth = 0;
    let extractedDay = remainingDays + 1; // Start from day 1
    // Calculate IST the month and day based on the remaining days
    const istdaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let istextractedMonth = 0;
    let istextractedDay = istremainingDays + 1; // Start from day 1

    // Find the month
    for (let i = 0; i < 12; i++) {
      if (extractedDay <= daysInMonth[i]) {
        extractedMonth = i;
        break;
      }
      extractedDay -= daysInMonth[i];
    }

    // IST Find the month
    for (let i = 0; i < 12; i++) {
      if (istextractedDay <= istdaysInMonth[i]) {
        istextractedMonth = i;
        break;
      }
      istextractedDay -= istdaysInMonth[i];
    }

    // Determine AM or PM
    const calculatedAmPm = extractedHour >= 12 ? 'PM' : 'AM';

    // IST Determine AM or PM
    const istcalculatedAmPm = istextractedHour >= 12 ? 'PM' : 'AM';

    // Convert IST hour to a 12-hour format
    const istformattedHour = istextractedHour === 0 ? 12 : istextractedHour > 12 ? istextractedHour - 12 : istextractedHour;

    // Convert the hour to a 12-hour format
    const formattedHour = extractedHour === 0 ? 12 : extractedHour > 12 ? extractedHour - 12 : extractedHour;

    // Update state variables with extracted values
    setDay(extractedDay);
    setMonth(monthNames[extractedMonth]);
    setYear(extractedYear);
    setHour(formattedHour);
    setMinute(extractedMinute);
    setSecond(extractedSecond);
    setAmPm(calculatedAmPm);

    setDayist(istextractedDay);
    setMonthist(monthNames[istextractedMonth]);
    setYearist(istextractedYear);
    setHourist(istformattedHour);
    setMinuteist(istextractedMinute);
    setSecondist(istextractedSecond);
    setAmPmist(istcalculatedAmPm);

    // Update the input text
    setText(inputValue);
  };

  // Function to clear all date values
  const clearValues = () => {
    setDay('');
    setMonth('');
    setYear('');
    setHour('');
    setMinute('');
    setSecond('');
    setAmPm('');
    setDayist('');
    setMonthist('');
    setYearist('');
    setHourist('');
    setMinuteist('');
    setSecondist('');
    setAmPmist('');
  };

  return (
    <div className='mb-3 container'>
      <div className="input-group input-group-lg">
        <span className="input-group-text">Enter Epoch Value</span>
        <input
          type="text"
          className="form-control"
          value={text}
          onChange={handleOnChange}
          style={{ maxWidth: '200px' }}
        />
      </div>
      <div className="result">
        <h1 className="date">
          {day} {month} {year} {hour < 10 ? `0${hour}` : hour}:{minute < 10 ? `0${minute}` : minute}:{second < 10 ? `0${second}` : second} {amPm} GMT
        </h1>
        <h1 className="date">
          {istday} {istmonth} {istyear} {isthour < 10 ? `0${isthour}` : isthour}:{istminute < 10 ? `0${istminute}` : istminute}:{istsecond < 10 ? `0${istsecond}` : istsecond} {istamPm} IST (GMT+5:30)
        </h1>
      </div>
      
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 20px;
          background-color: #f7f7f7;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .input-group {
          margin-bottom: 20px;
        }

        .result {
          font-size: 24px;
          color: #333;
        }

        .date {
          margin: 0;
          font-weight: bold;
        }

        
      `}</style>
    </div>
  );
}
