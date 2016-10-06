import { createAction } from 'redux-actions';
import actionTypes from './authConstants';

const { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } = actionTypes;

export const loginError = createAction(LOGIN_FAILURE);
export const loginSuccess = createAction(LOGIN_SUCCESS);

export const login = () => {
  // TODO Auth0Lock is not working in isomorphic app, that is why
  // below hack
  if (typeof window === 'undefined') {
    return true;
  }
  const Auth0Lock = require('auth0-lock').default;

  const lock = new Auth0Lock(
    'b7Qfj5hASoI5m6RjYNZ7xC3yLpZrbtnv',
    'nexthome.au.auth0.com',
    {
      auth: {
        responseType: 'token'
      }
    }
  );
  return dispatch => {
    lock.show((err, profile, token) => {
      if (err) {
        return dispatch(loginError(err));
      }
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', token);
      return dispatch(loginSuccess(profile));
    });
  };
};

export const logoutSuccess = createAction(LOGOUT_SUCCESS);

export const logout = () => (
  dispatch => {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    return dispatch(logoutSuccess());
  }
);

export const testThunk = () => (
  dipatch => {
    alert(dipatch);
  }
);
