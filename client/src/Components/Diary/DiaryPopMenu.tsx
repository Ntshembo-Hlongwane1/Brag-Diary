import React from 'react';
import '../../styles/DiaryPopMenu.css';
import { Link } from 'react-router-dom';

export const DiaryPopMenu = () => {
  return (
    <div className="diaryPopMenu">
      <Link to="/all-journals" className="Router__link">
        <h3 className="diaryMenu-links">All My Journal's</h3>
      </Link>
      <Link to="/new-journal" className="Router__link">
        <h3 className="diaryMenu-links">Write New Journal</h3>
      </Link>
    </div>
  );
};
