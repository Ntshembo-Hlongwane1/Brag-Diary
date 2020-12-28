import React, { FC, useEffect } from 'react';
import './styles/App.css';
import { Home } from './Components/Home/Home';
import { Footer } from './Components/Home/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './Components/Home/Header';
import { SignUp } from './Components/Auth/SignUp';
import SignIn from './Components/Auth/SignIn';
import { useDispatch } from 'react-redux';
import { userAuthStatus } from './store/Actions/CheckUserAuthStatus/UserAuthStatus';
import { NewJournal } from './Components/Diary/NewJournal';
import { AllJournals } from './Components/Diary/AllJournals';
import { TraineeList } from './Components/Mentors/TraineeList';

export const App: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userAuthStatus());
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route path="/new-journal">
          <Header />
          <NewJournal />
        </Route>
        <Route path="/all-trainees">
          <Header />
          <TraineeList />
        </Route>
        <Route path="/all-journals">
          <Header />
          <AllJournals />
        </Route>
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
