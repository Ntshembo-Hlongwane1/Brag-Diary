import React, { Component } from 'react';
import '../../styles/AuthForm.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import axios from 'axios';
// import { url } from '../../Utils/BaseUrl';

//Form state
interface FormState {
  username: string | any;
  email: string | any;
  password: string | any;
  verfiedPassword: string | any;
  isPasswordVisible: Boolean | any;
  isVerifiedPasswordVisible: Boolean | any;
}
//Constants to capture the correct eye for toggling visibility
enum PasswordVisibility {
  PASSWORD_FIELD = 'PASSWORD_FIELD',
  VERIFIED_PASSWORD_FIELD = 'VERIFIED_PASSWORD_FIELD',
}

enum BaseURL {
  dev = 'http://localhost:5000',
  prod = '',
}

export const url =
  process.env.NODE_ENV === 'production' ? BaseURL.prod : BaseURL.dev;

class SignUp extends Component<any, Partial<FormState>> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      verfiedPassword: '',
      isPasswordVisible: false,
      isVerifiedPasswordVisible: false,
    };
    this.ToggleVisibility = this.ToggleVisibility.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.SignUserUp = this.SignUserUp.bind(this);
    this.ServerResponse = this.ServerResponse.bind(this);
  }
  ToggleVisibility(fieldType: string) {
    switch (fieldType) {
      case PasswordVisibility.PASSWORD_FIELD:
        this.setState({
          isPasswordVisible: !this.state.isPasswordVisible,
        });
        break;

      case PasswordVisibility.VERIFIED_PASSWORD_FIELD:
        this.setState({
          isVerifiedPasswordVisible: !this.state.isVerifiedPasswordVisible,
        });
        break;
      default:
        return;
    }
  }

  handleFormChange(e: any) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }
  async SignUserUp(e: any) {
    e.preventDefault();
    const form_data: FormData = new FormData();
    form_data.append('username', this.state.username);
    form_data.append('email', this.state.email);
    form_data.append('password', this.state.password);
    form_data.append('verifiedPassword', this.state.verfiedPassword);

    const baseurl = url + '/api/user-signup';
    alert(baseurl);
  }

  ServerResponse(status: number, responseMessage: string) {
    switch (status) {
      case 201:
        store.addNotification({
          title: 'SignUp Success!',
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
          title: 'SignUp Fail!',
          message: responseMessage,
          type: 'danger',
          insert: 'top',
          container: 'top-right',
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
          title: 'SignUp Fail!',
          message: responseMessage,
          type: 'warning',
          insert: 'top',
          container: 'top-right',
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
  }
  render() {
    return (
      <div className="AuthForm">
        <h1 className="AuthForm__header">SignUp</h1>
        <form className="Form">
          <label className="AuhForm__labels">Username</label>
          <input
            type="text"
            placeholder="username"
            required
            className="inputField"
            id="username"
            value={this.state.username}
            onChange={this.handleFormChange}
          />
          <label className="AuhForm__labels">Email</label>
          <input
            type="email"
            placeholder="email"
            required
            className="inputField"
            id="email"
            value={this.state.email}
            onChange={this.handleFormChange}
          />
          <div className="password">
            <label className="AuhForm__labels">Password</label>
            <div className="label">
              <input
                type={`${this.state.isPasswordVisible ? 'text' : 'password'}`}
                placeholder="Password"
                className="inputField"
                id="password"
                value={this.state.password}
                onChange={this.handleFormChange}
                required
              />
              {this.state.isPasswordVisible ? (
                <VisibilityIcon
                  onClick={() =>
                    this.ToggleVisibility(PasswordVisibility.PASSWORD_FIELD)
                  }
                />
              ) : (
                <VisibilityOffIcon
                  onClick={() =>
                    this.ToggleVisibility(PasswordVisibility.PASSWORD_FIELD)
                  }
                />
              )}
            </div>
          </div>
          <div className="verifiePassword">
            <label className="AuhForm__labels">Verified Password</label>
            <div className="label">
              <input
                type={`${
                  this.state.isVerifiedPasswordVisible ? 'text' : 'password'
                }`}
                placeholder="Verified Password"
                className="inputField"
                id="verifiedPassword"
                value={this.state.verfiedPassword}
                onChange={this.handleFormChange}
                required
              />
              {this.state.isVerifiedPasswordVisible ? (
                <VisibilityIcon
                  onClick={() =>
                    this.ToggleVisibility(
                      PasswordVisibility.VERIFIED_PASSWORD_FIELD
                    )
                  }
                />
              ) : (
                <VisibilityOffIcon
                  onClick={() =>
                    this.ToggleVisibility(
                      PasswordVisibility.VERIFIED_PASSWORD_FIELD
                    )
                  }
                />
              )}
            </div>
          </div>
          <button
            className="btn btn-submit"
            type="submit"
            onClick={this.SignUserUp}
          >
            SignUp
          </button>
        </form>
        <ReactNotification className="Notification-Card" />
      </div>
    );
  }
}

export { SignUp };
