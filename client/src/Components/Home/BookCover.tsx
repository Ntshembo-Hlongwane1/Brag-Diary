import React, { FC } from 'react';
import '../../styles/BookCover.css';

export const BookCover: FC = () => {
  return (
    <div className="container">
      <ul className="align">
        <li>
          <figure className="book">
            <ul className="hardcover_front">
              <li className="front-cover-text">Junior's Brag Diary</li>
              <li></li>
            </ul>

            <ul className="page">
              <li></li>
              <li>Brag Diary</li>
              <li></li>
              <li></li>
              <li></li>
            </ul>

            <ul className="hardcover_back">
              <li></li>
              <li></li>
            </ul>
            <ul className="book_spine">
              <li></li>
              <li></li>
            </ul>
          </figure>
        </li>
      </ul>
    </div>
  );
};
