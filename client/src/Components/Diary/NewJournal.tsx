import React, { useState } from 'react';
import '../../styles/NewJournal.css';

export const NewJournal = () => {
  const months = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = new Date();
  const currentDate = `${months[date.getMonth()]} ${date.getDate()}`;
  const [journal, setJournal] = useState(`${currentDate}`);

  const handleChange = (e: any) => {
    if (journal.indexOf(`${currentDate}`) < 0) {
      setJournal(currentDate);
    } else {
      setJournal(e.target.value);
    }
  };

  return (
    <div className="NewJournal">
      <textarea
        cols={30}
        rows={10}
        onChange={handleChange}
        value={journal}
      ></textarea>
      <button className="btn journal-btn">Add Journal</button>
    </div>
  );
};
