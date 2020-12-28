import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllTrainees } from '../../store/Actions/GetTraineesList/GetAllTrainees';
import ScreenLoader from '../../assets/screenLoader.gif';
import '../../styles/TraineeList.css';
import { Avatar } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import axios from 'axios';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

export const TraineeList = () => {
  const { loading, traineesList, error } = useSelector(
    (state) => state.allTraineesList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllTrainees());
  }, [dispatch]);

  const ServerResponse = (status: number, responseMessage: string) => {
    switch (status) {
      case 200:
        store.addNotification({
          title: 'Trainee Added Sucessfully!',
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
        });
        break;
      case 400:
        store.addNotification({
          title: 'Failed to add Trainee!',
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
          title: 'Failed to add Trainee!',
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
    }
  };
  const AddTraineeToGroup = async (TraineeID: string) => {
    const baseURL = {
      dev: 'http://localhost:5000/api/add-trainee-to-pdGroup',
      prod: '',
    };
    const url = baseURL.dev;

    const form_data = new FormData();
    form_data.append('TraineeID', TraineeID);
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
    <div className="TraineeList">
      <h2 className="TraineeList__header">All Trainees</h2>
      {loading ? (
        <img
          src={ScreenLoader}
          alt="Fetching All Trainees..."
          className="loading__screen"
        />
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        traineesList && (
          <div className="TraineeList__content">
            {traineesList.map((trainee: any, idx: number) => {
              return (
                <div className="TraineeList__contentInfo" key={trainee._id}>
                  <div className="userProfile">
                    <div className="image">
                      <Avatar
                        src={trainee.profilePicture}
                        alt={`${trainee.usename} profile picture`}
                      />
                    </div>
                    <div className="Trainee__username">
                      <h4>{trainee.username}</h4>
                    </div>
                    <span className="line-breaker">|</span>
                    <div className="Trainee__email">
                      <h4>{trainee.email}</h4>
                    </div>
                  </div>
                  <PersonAddIcon
                    className="addIcon"
                    onClick={() => AddTraineeToGroup(trainee._id)}
                  />
                </div>
              );
            })}
          </div>
        )
      )}
      <ReactNotification className="Notification-Card" />
    </div>
  );
};
