export const SET_AUTHED_USER = 'SET_AUTHED_USER';

export const setAuthedUser = (userID) => {
  return {
    type: SET_AUTHED_USER,
    userID,
  };
};

// export const handleSetAuthedUser = (userID) => {
//   return (dispatch) => {
//     let result = [];
//     if (typeof userID === undefined)
//       Object.keys(userID).forEach((key) => result.push(userID[key]));
//     userID = result;
//     dispatch(setAuthedUser(userID));
//   };
// };
