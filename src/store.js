import { createStore, applyMiddleware, combineReducers } from "redux";
import loggerMiddleware from "redux-logger";
import thunks from "redux-thunk";
import axios from "axios";

// Action Constants
const LOAD_DOGS = "LOAD_DOGS";

// Dogs Reducer
const dogs = (state = [], action) => {
  if (action.type === LOAD_DOGS) {
    state = action.dogs;
  }
  return state;
}

// Combine reducers
const reducer = combineReducers({
    dogs
})



// Thunks
export const fetchDogs = () => {
  return async (dispatch) => {
    const dogs = (await axios.get("/api/dogs")).data;
    dispatch(loadDogs(dogs));
  };
};

// Action Creators
const loadDogs = dogs=> ({type: LOAD_DOGS, dogs})

const store = createStore(reducer, applyMiddleware(loggerMiddleware, thunks))
export default store;
