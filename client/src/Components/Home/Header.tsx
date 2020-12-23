import React, { FC } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Logo from '../../assets/diary.svg';
import '../../styles/Header.css';

export const Header: FC = () => {
  return (
    <nav className="nav">
      <div className="nav-left">
        <img src={Logo} alt="" className="Logo" />
      </div>
      <div className="nav-right">
        <h4 className="nav-link">My Diary</h4>
        <h4 className="nav-link">PD Group</h4>
        <Avatar src="" alt="User Profile Image" />
      </div>
    </nav>
  );
};
