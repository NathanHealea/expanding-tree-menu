// --- Imports -- //
import { SET_CATALOG } from "./types";

const initState = {
  sets: [],
  colors: ["White", "Red", "Green", "Blue", "Black"]
};

// -- reducer --- //
function reducer(state = initState, action) {
  switch (action.type) {
    case SET_CATALOG:
      return Object.assign(state, {
        sets: action.payload
      });
    default:
      return state;
  }
}

export default reducer;
