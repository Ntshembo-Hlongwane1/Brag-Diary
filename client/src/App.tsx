import React, { FC } from 'react';
import './styles/App.css';
import { Home } from './Components/Home/Home';
import { Footer } from './Components/Home/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './Components/Home/Header';
import { SignUp } from './Components/Auth/SignUp';
import { SignIn } from './Components/Auth/SignIn';

export const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/user-signin" exact={true}>
          <Header />
          <SignIn />
        </Route>
        <Route path="/user-signup" exact={true}>
          <Header />
          <SignUp />
        </Route>
        <Route path="/" exact={true}>
          <Home />
          <Footer />
        </Route>
      </Switch>
    </Router>
  );
};
