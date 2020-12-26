import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import '../../styles/BookCover.css';

export const BookCover: FC = () => {
  const { authStatus } = useSelector((state) => state.userAuthStatus);
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
