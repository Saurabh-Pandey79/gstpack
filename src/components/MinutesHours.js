import React, { useState } from 'react';

export default function MinutesHours() {
  const [text, setText] = useState('');
  const [hour, setHour] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [amPm, setAmPm] = useState('AM'); // State for AM or PM

  const handleOnChange = (event) => {
    let inputMinutes = parseInt(event.target.value) || 0; // Convert input to integer

    // Ensure inputMinutes is within the range of 0 to 1440
    inputMinutes = Math.min(Math.max(inputMinutes, 0), 1440);

    setText(inputMinutes.toString());

    // Calculate hour and minutes based on inputMinutes
    const calculatedHour = Math.floor(inputMinutes / 60);
    const calculatedMinutes = inputMinutes % 60;

    // Determine AM or PM (we assume all inputs are AM)
    const calculatedAmPm = calculatedHour < 12 || calculatedHour === 24 ? 'AM' : 'PM';

    // Convert hour to 12-hour format
    const formattedHour = calculatedHour === 0 || calculatedHour === 24 ? 12 : calculatedHour > 12 ? calculatedHour - 12 : calculatedHour;

    setHour(formattedHour);
    setMinutes(calculatedMinutes);
    setAmPm(calculatedAmPm);
  };

  return (
    <div className='mb-3 container'>
      <div className="input-group input-group-lg">
        <span className="input-group-text">Enter Minutes</span>
        <input
          type="text"
          className="form-control"
          value={text}
          onChange={handleOnChange}
          style={{ maxWidth: '200px' }}
        />
      </div>
      <div className="result">
        <h1 className='date'>
          {hour === 12 ? 12 : (hour < 10 ? `0${hour}` : hour)}:
          {minutes === 0 ? '00' : (minutes < 10 ? `0${minutes}` : minutes)} {amPm}
        </h1>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 20px;
          background-color: #800080;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .input-group {
          margin-bottom: 20px;
        }

        .result {
            font-size: 24px;
            color: #800080;
          }
  
          .date {
            margin: 0;
            font-weight: bold;
          }

        h1 {
          margin: 0;
        }
      `}</style>
    </div>
  );
}