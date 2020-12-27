import React, { useState } from 'react';
import '../../styles/NewJournal.css';
import axios from 'axios';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

export const NewJournal = () => {
  const months = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = new Date();
  const currentDate = `${months[date.getMonth()]} ${date.getDate()}`;
  const [journal, setJournal] = useState(`${currentDate}`);

  const handleChange = (e: any) => {
    if (journal.indexOf(`${currentDate}`) < 0) {
      setJournal(currentDate);
    } else {
      setJournal(e.target.value);
    }
  };

  const ServerResponse = (status: number, responseMessage: string) => {
    switch (status) {
      case 201:
        store.addNotification({
          title: 'New Journal Creation Success!',
          message: responseMessage,
          type: 'success',
          insert: 'top',
          container: 'top-center',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
          onRemoval: () => {
            window.location.reload(false);
          },
        });
        break;
      case 400:
        store.addNotification({
          title: 'New Journal Creation Fail!',
          message: responseMessage,
          type: 'danger',
          insert: 'top',
          container: 'top-center',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
        break;
      case 500:
        store.addNotification({
          title: 'New Journal Creation Fail!',
          message: responseMessage,
          type: 'warning',
          insert: 'top',
          container: 'top-center',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
        break;

      default:
        break;
    }
  };
  const addNewJournal = async () => {
    const form_data = new FormData();
    form_data.append('journal', journal);

    const baseURL = {
      dev: 'http://localhost:5000/api/create-new-journal',
      prod: '',
    };
    const url = baseURL.dev;

    try {
      const { data, status } = await axios.post(url, form_data, {
        withCredentials: true,
      });
      ServerResponse(status, data.msg);
    } catch (error) {
      const { data, status } = error.response;
      ServerResponse(status, data.msg);
    }
  };
  return (
    <div className="NewJournal">
      <textarea
        cols={30}
        rows={10}
        onChange={handleChange}
        value={journal}
      ></textarea>
      <button className="btn journal-btn" onClick={addNewJournal}>
        Add Journal
      </button>
      <ReactNotification className="Notification-Card" />
    </div>
  );
};
