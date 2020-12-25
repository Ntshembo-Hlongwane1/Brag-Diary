import React, { FC } from 'react';
import '../../styles/BookCover.css';

export const BookCover: FC = () => {
  return (
    <div className="book">
      <div className="book-img">
        <h3>Junior's Brag Diary</h3>
      </div>
      <div className="text">
        <h2>Lorem Ipsum</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <a href="#">
          Read More <i className="fa fa-long-arrow-right"></i>
        </a>
      </div>
    </div>
  );
};
