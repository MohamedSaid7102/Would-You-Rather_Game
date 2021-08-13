/* eslint-disable import/no-anonymous-default-export */

export default (store) => (next) => (action) => {
  console.group(action.type);
  console.log(`The action is: `, action);
  const returnedValue = next(action);
  console.log(`The state now is: `, store.getState());
  console.groupEnd();
  return returnedValue;
};
