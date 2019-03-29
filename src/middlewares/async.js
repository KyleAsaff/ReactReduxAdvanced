// Equivilant to the function wrapper below
// export default function({ dispatch }) {
//   return function(next) {
//     return function(action) {
//
//     }
//   }
// }

export default ({ dispatch }) => next => action => {

  // Check to see if the action has a promise on its paylod propert
  // if it does, then wait for it to resolve
  // if it doesnt send it to the next middleware
  if (!action.payload || !action.payload.then) {
    return next(action);
  }

  // WE want to wait for the promise to resolve
  // get its data then create a new action with that data and dispatch it

  action.payload.then(function(response) {
    const newAction = { ...action, payload: response };
    dispatch(newAction)
  })
};
