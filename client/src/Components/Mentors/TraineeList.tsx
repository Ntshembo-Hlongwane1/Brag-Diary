import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllTrainees } from '../../store/Actions/GetTraineesList/GetAllTrainees';
import ScreenLoader from '../../assets/screenLoader.gif';
import '../../styles/TraineeList.css';
import { Avatar } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

interface Props {}

export const TraineeList = (props: Props) => {
  const { loading, traineesList, error } = useSelector(
    (state) => state.allTraineesList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllTrainees());
  }, [dispatch]);
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
                  <PersonAddIcon className="addIcon" />
                </div>
              );
            })}
          </div>
        )
      )}
    </div>
  );
};
