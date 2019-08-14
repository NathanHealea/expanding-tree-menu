// --- Imports -- //
import types from "./types";
import {default as initState} from './state'

// -- reducer --- //
function reducer(state = initState, action) {
  switch (action.type) {
    case types.SET_CATALOG:
      return Object.assign({}, {...state}, {
        sets: action.payload
      });
    default:
      return state;
  }
}

export default reducer;
