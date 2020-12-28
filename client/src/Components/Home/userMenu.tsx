import React, { useState } from 'react';
import PublicIcon from '@material-ui/icons/Public';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PeopleIcon from '@material-ui/icons/People';
import { Link, useHistory } from 'react-router-dom';
import '../../styles/Header.css';
import { useSelector } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';

export const UserMenu = () => {
  const { authStatus } = useSelector((state) => state.userAuthStatus);
  const [profile, setProfileImage] = useState<File | any>(null);
  const history = useHistory();
  const handleChange = (e: any) => {
    setProfileImage(e.target.files[0]);
  };

  const UploadProfileImage = async (e: any) => {
    const form_data = new FormData();
    form_data.append('profilePicture', profile);

    const baseURL = {
      dev: 'http://localhost:5000/api/upload-profile-picture',
      prod: '',
    };

    const url = baseURL.dev;

    try {
      const { status } = await axios.post(url, form_data, {
        withCredentials: true,
      });
      if (status === 200) {
        window.location.reload(false);
      }
    } catch (error) {
      const { data, status } = error.resposne;
    }
  };

  const RedirectUser = () => {
    history.push('/');
    window.location.reload(false);
  };

  const Logout = async () => {
    const baseURL = {
      dev: 'http://localhost:5000/api/user-logout',
      prod: '',
    };
    const url = baseURL.dev;

    try {
      const { status } = await axios.get(url, { withCredentials: true });
      if (status === 200) {
        RedirectUser();
      }
    } catch (error) {
      window.location.reload(false);
    }
  };

  const RedirectUserToSeeAllTrainees = () => {
    history.push('/all-trainees');
  };

  return (
    <div className="userMenu">
      <div className="user__menu">
        <div className="menu__notAuthorised">
          <div className="global__forum">
            <PublicIcon />
            <h3 className="user-menu-link">Global Forum</h3>
          </div>
          {authStatus && authStatus.auth_status ? null : (
            <Link to="/user-signin" className="Router__link">
              <div className="signin">
                <LockOpenIcon />
                <h3 className="user-menu-link">SignIn</h3>
              </div>
            </Link>
          )}
          {authStatus && authStatus.auth_status ? null : (
            <Link to="/user-signup" className="Router__link">
              <div className="signup">
                <LockIcon />
                <h3 className="user-menu-link">SignUp</h3>
              </div>
            </Link>
          )}
        </div>
        {authStatus && authStatus.auth_status ? (
          <div className="logout signup">
            <ExitToAppIcon />
            <h3 className="user-menu-link" onClick={Logout}>
              LogOut
            </h3>
          </div>
        ) : null}

        {authStatus && authStatus.isMentor ? (
          <div className="admin signup">
            <DashboardIcon />
            <Popup
              trigger={<h3 className="user-menu-link">Mentor</h3>}
              position="left center"
            >
              <div className="mentor__menu">
                <div
                  className="addTrainee signup"
                  onClick={RedirectUserToSeeAllTrainees}
                >
                  <PersonAddIcon />
                  <h4 className="user-menu-link">Add Trainee(PD Group)</h4>
                </div>
                <div className="trainee__list signup">
                  <PeopleIcon />
                  <h4 className="user-menu-link">Trainee List</h4>
                </div>
              </div>
            </Popup>
          </div>
        ) : null}

        {authStatus && authStatus.profilePicture === '' ? (
          <div className="upload-btn-wrapper">
            {profile ? (
              <button
                className="profileUpload-btn"
                onClick={UploadProfileImage}
              >
                Upload Profile Picture
              </button>
            ) : (
              <button className="profileUpload-btn">Add Profile Picture</button>
            )}
            {profile ? null : (
              <input type="file" name="myfile" onChange={handleChange} />
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
