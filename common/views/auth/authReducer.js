import typeToReducer from 'type-to-reducer';
import jwtDecode from 'jwt-decode';
import { loginError, loginSuccess, logoutSuccess } from './authActions';

// TODO hack for isomorphic rendering
const isClient = () => typeof window !== 'undefined';
const checkTokenExpiry = () => {
  if (!isClient()) {
    return false;
  }
  const jwt = localStorage.getItem('id_token');
  if (jwt) {
    const jwtExp = jwtDecode(jwt).exp;
    const expiryDate = new Date(0);
    expiryDate.setUTCSeconds(jwtExp);

    if (new Date() < expiryDate) {
      return true;
    }
  }
  return false;
};

const getProfile = () => {
  if (!isClient()) {
    return null;
  }
  return JSON.parse(localStorage.getItem('profile'));
};

const initialState = {
  isAuthenticated: checkTokenExpiry(),
  profile: getProfile(),
  error: ''
};

export default typeToReducer({
  [loginError]: (state, action) => ({
    ...state,
    isAuthenticated: false,
    profile: null,
    error: action.payload
  }),
  [loginSuccess]: (state, action) => ({
    ...state,
    isAuthenticated: true,
    profile: action.payload,
    error: ''
  }),
  [logoutSuccess]: (state) => ({
    ...state,
    isAuthenticated: false,
    profile: null,
    error: ''
  })
}, initialState);

