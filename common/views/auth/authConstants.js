import keyMirror from 'keymirror';

const actionTypes = keyMirror({
  LOGIN_SUCCESS: null,
  LOGIN_FAILURE: null,
  LOGOUT_SUCCESS: null
});

export default actionTypes;
