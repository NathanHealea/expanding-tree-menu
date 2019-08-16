// --- Imports --- //
import axios from "axios";

// --- Store Imports --- //
import actions from "./actions";

// --- Helper Functions

function getBlocks(sets) {
  return sets.reduce((acc, current) => {
    if (current.block_code && acc[current.block_code] !== undefined) {
      acc[current.block_code].sets.push(current);
    } else if (current.block_code && acc[current.block_code] === undefined) {
      acc[current.block_code] = { name: current.block, sets: [current] };
    } else if (current.code && acc[current.code] !== undefined) {
      acc[current.code].sets.push(current);
    } else if (current.code && acc[current.code] === undefined) {
      acc[current.code] = { name: current.name, sets: [current] };
    }

    return acc;
  }, {});
}

// --- Opperations --- //
function fetchSets() {
  return (dispatch, getState) => {
    return axios.get("https://api.scryfall.com/sets").then(response => {
      if (response.status !== 200) {
        console.log("Fetch set failed");
      } else {
        console.log(getBlocks(response.data.data));
        dispatch(actions.setCatalog(getBlocks(response.data.data)));
      }
    });
  };
}

function fetchSet(url) {
  console.log(url)
  return dispatch => {
    return axios.get(url).then(response => {
      if (response.status !== 200) {
        console.log("Fetch set failed");
      } else {
        console.log(response)
        dispatch(actions.setSet(response.data.data))
        // dispatch(actions.setCatalog(getBlocks(response.data.data)));
      }
    });
  };
}

export default { fetchSets, fetchSet };
