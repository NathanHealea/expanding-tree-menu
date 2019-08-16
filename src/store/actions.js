// --- Imports --- //
import types from "./types";

// --- Action --- //
function setCatalog(sets) {
  return {
    type: types.SET_CATALOG,
    payload: sets
  };
}

function setSet(set){
  return{
    type: types.SET_SET,
    payload: set
  }
}

export default {setCatalog, setSet}