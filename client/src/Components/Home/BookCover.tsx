import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../styles/BookCover.css';

export const BookCover: FC = () => {
  const { authStatus } = useSelector((state) => state.userAuthStatus);
  const savedNotes = localStorage.getItem('notes') || '';
  const [notes, setNotes] = useState<string>(savedNotes);

  const handleChange = (e: any) => {
    setNotes(e.target.value);
    localStorage.setItem('notes', notes);
  };
  return (
    <div className="book">
      <div className="book-img">
        {authStatus ? (
          <h3 className="book-text-cover">{`${authStatus.username}'s Brag Diary`}</h3>
        ) : (
          <h3 className="book-text-cover">
            Welcome To Brag Diary Create Account To Start Journal
          </h3>
        )}
      </div>
      <div className="text">
        <h2>Daily Notes</h2>
        <textarea
          className="editable"
          value={notes}
          onChange={handleChange}
        ></textarea>
      </div>
    </div>
  );
};
