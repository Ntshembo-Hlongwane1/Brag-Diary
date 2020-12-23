import React, { FC } from 'react';
import { BookCover } from './BookCover';
import { Header } from './Header';
import '../../styles/App.css';
import { MainContent } from './MainContent';

export const Home: FC = () => {
  return (
    <div className="Home">
      <Header />
      <BookCover />
      <MainContent />
    </div>
  );
};
