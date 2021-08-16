export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const setAuthedUser = (userID) => {
  return {
    type: SET_AUTHED_USER,
    userID,
  };
};

export const logOut = () => {
  return (dispatch) => {
    return dispatch(setAuthedUser(null));
  };
};

export const logIn = (userID) => {
  return (dispatch) => {
    return dispatch(setAuthedUser(userID));
  };
};
