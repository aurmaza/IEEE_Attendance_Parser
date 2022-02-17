import { isAfter, isBefore } from 'date-fns';
import React, { useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import data from '../../attendance2.json';

const Index = () => {

  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const hey = Object.values(data);

  const filtered = hey.find((obj) => obj.usernames.includes(name));

  const attendance = Object.keys(
    filtered?.attendance ? filtered.attendance : [],
  ).map((key) => {
    return {
      date: key.split(' ').pop(),
      className: key.substring(0, key.lastIndexOf(' ')),
      ...filtered.attendance[key],
    };
  });

  const attendanceFilterd = attendance.filter((obj) => {
    const date = new Date(obj.date);

    if (isAfter(date, startDate) && isBefore(date, endDate)) {
      return obj;
    }
  });

  return (
    <div>
      <div>
        Username: <input onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        Start Date:
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>

      <div>
        End Date:
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>

      {filtered && (
        <>
          <h1>Name: {name}</h1>
          <h2>
            Number of Attendance:{' '}
            {attendanceFilterd.length
              ? attendanceFilterd.length
              : attendance.length}
          </h2>
          <ul>
            {(attendanceFilterd.length ? attendanceFilterd : attendance).map(
              (obj) => {
                return (
                  <li>
                    <p>Event name: {obj.className}</p>
                                  
                 </li>
                );
              },
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default Index;
