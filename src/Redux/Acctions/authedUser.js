export const SET_AUTHED_USER = 'SET_AUTHED_USER';

export const setAuthedUser = (userID) => {
  return {
    type: SET_AUTHED_USER,
    userID,
  };
};
