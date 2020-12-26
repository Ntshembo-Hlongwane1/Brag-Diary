import React, { Component } from 'react';
import '../../styles/AuthForm.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
// import { url } from '../../Utils/BaseUrl';

//Form state
interface FormState {
  username: string | any;
  password: string | any;
  isPasswordVisible: Boolean | any;
  isVerifiedPasswordVisible: Boolean | any;
}
//Constants to capture the correct eye for toggling visibility
enum PasswordVisibility {
  PASSWORD_FIELD = 'PASSWORD_FIELD',
  VERIFIED_PASSWORD_FIELD = 'VERIFIED_PASSWORD_FIELD',
}

class SignIn extends Component<any, Partial<FormState>> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isPasswordVisible: false,
      isVerifiedPasswordVisible: false,
    };
    this.ToggleVisibility = this.ToggleVisibility.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.SignUserIn = this.SignUserIn.bind(this);
    this.ServerResponse = this.ServerResponse.bind(this);
    this.RedirectUser = this.RedirectUser.bind(this);
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
  async SignUserIn(e: any) {
    e.preventDefault();
    const form_data: FormData = new FormData();
    form_data.append('username', this.state.username);
    form_data.append('password', this.state.password);

    const BaseURL = {
      dev: 'http://localhost:5000/api/user-signin',
      prod: '',
    };

    const url = BaseURL.dev;

    try {
      const { data, status } = await axios.post(url, form_data, {
        withCredentials: true,
      });
      console.log(data);
      this.ServerResponse(status, data.msg);
    } catch (error) {
      const { data, status } = error.response;
      this.ServerResponse(status, data.msg);
    }
  }

  RedirectUser() {
    const { history } = this.props;
    history.push('/');
  }

  ServerResponse(status: number, responseMessage: string) {
    switch (status) {
      case 200:
        store.addNotification({
          title: 'SignIn Success!',
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
            this.RedirectUser();
          },
        });
        break;
      case 404:
        store.addNotification({
          title: 'SignIn Fail!',
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
          onRemoval: () => {
            window.location.reload(false);
          },
        });
        break;
      case 400:
        store.addNotification({
          title: 'SignIn Fail!',
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

          onRemoval: () => {
            window.location.reload(false);
          },
        });
        break;
      case 500:
        store.addNotification({
          title: 'SignIn Fail!',
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

          onRemoval: () => {
            window.location.reload(false);
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
        <h1 className="AuthForm__header">SignIn</h1>
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
          <button
            className="btn btn-submit"
            type="submit"
            onClick={this.SignUserIn}
          >
            SignUp
          </button>
        </form>
        <ReactNotification className="Notification-Card" />
      </div>
    );
  }
}

export default withRouter(SignIn);
