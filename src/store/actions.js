// --- Imports --- //
import axios from "axios";
import types from "./types";

// --- Action --- //
function setCatalog(sets) {
  return {
    type: types.SET_CATALOG,
    payload: sets
  };
}

// --- Opperations --- //
function fetchSets() {
  return (dispatch, getState) => {
    return axios.get("https://api.scryfall.com/sets").then(response => {
      if (response.status !== 200) {
        console.log("Fetch set failed");
      } else {
        console.log("fetchState:Success", response.data.data);
        dispatch(setCatalog(response.data.data));
      }
    });
  };
}

export default { fetchSets };
