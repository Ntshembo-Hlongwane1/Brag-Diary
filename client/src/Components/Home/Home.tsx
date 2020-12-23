import React, { FC } from 'react';
import { BookCover } from './BookCover';
import { Header } from './Header';
import '../../styles/App.css';

export const Home: FC = () => {
  return (
    <div className="Home">
      <Header />
      <BookCover />
    </div>
  );
};
