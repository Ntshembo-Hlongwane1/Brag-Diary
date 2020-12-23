import React, { FC } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Logo from '../../assets/diary.svg';
import '../../styles/Header.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PublicIcon from '@material-ui/icons/Public';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';

export const Header: FC = () => {
  return (
    <nav className="nav">
      <div className="nav-left">
        <img src={Logo} alt="" className="Logo" />
      </div>
      <div className="nav-right">
        <h4 className="nav-link">My Diary</h4>
        <h4 className="nav-link">PD Group</h4>
        <Popup
          trigger={<Avatar src="" alt="User Profile Image" />}
          position="bottom right"
        >
          <div className="user__menu">
            <div className="menu__notAuthorised">
              <div className="global__forum">
                <PublicIcon />
                <h3 className="user-menu-link">Global Forum</h3>
              </div>
              <div className="signin">
                <LockOpenIcon />
                <h3 className="user-menu-link">SignIn</h3>
              </div>
              <div className="signup">
                <LockIcon />
                <h3 className="user-menu-link">SignUp</h3>
              </div>
            </div>
          </div>
        </Popup>
      </div>
    </nav>
  );
};
