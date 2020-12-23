import React, { FC } from 'react';
import './styles/App.css';
import { Home } from './Components/Home/Home';
import { Footer } from './Components/Home/Footer';

export const App: FC = () => {
  return (
    <div className="App">
      <Home />
      <Footer />
    </div>
  );
};
