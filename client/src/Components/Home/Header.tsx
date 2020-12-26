import React, { FC } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Logo from '../../assets/diary.svg';
import '../../styles/Header.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { UserMenu } from './userMenu';
import { useSelector } from 'react-redux';

export const Header: FC = () => {
  const { authStatus } = useSelector((state) => state.userAuthStatus);

  return (
    <nav className="nav">
      <div className="nav-left">
        <img src={Logo} alt="" className="Logo" />
      </div>
      <div className="nav-right">
        <h4 className="nav-link">My Diary</h4>
        <h4 className="nav-link">PD Group</h4>
        {authStatus && (
          <Popup
            trigger={
              <Avatar
                src={authStatus.profilePicture}
                alt="User Profile Image"
              />
            }
            position="bottom right"
          >
            <UserMenu />
          </Popup>
        )}
      </div>
    </nav>
  );
};
