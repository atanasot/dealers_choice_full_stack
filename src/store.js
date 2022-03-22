import { createStore, applyMiddleware, combineReducers } from "redux";
import loggerMiddleware from "redux-logger";
import thunks from "redux-thunk";
import axios from "axios";

// Action Constants
const LOAD_DOGS = "LOAD_DOGS";
const CREATE_DOG = "CREATE_DOG";
const DELETE_DOG = "DELETE_DOG";
const LOAD_TYPES = "LOAD_TYPES";
const UPDATE_DOG = 'UPDATE_DOG'

// Dogs Reducer
const dogs = (state = [], action) => {
  if (action.type === LOAD_DOGS) {
    state = action.dogs;
  }
  if (action.type === CREATE_DOG) {
    state = [...state, action.dog];
  }
  if (action.type === DELETE_DOG) {
    return state.filter((dog) => dog.id !== action.dog.id);
  }
  if (action.type === UPDATE_DOG) {
    return state.map(dog => dog.id !== action.dog.id ? dog : action.dog)
  }
  return state;
};

// Types Reducer
const types = (state = [], action) => {
  if (action.type === LOAD_TYPES) {
    state = action.types;
  }
  return state;
};

// Combine reducers
const reducer = combineReducers({
  dogs,
  types,
});

// ************************************Thunks*******************************************
export const fetchDogs = () => {
  return async (dispatch) => {
    const dogs = (await axios.get("/api/dogs")).data;
    dispatch(_loadDogs(dogs));
  };
};

// add history here -- when we create a dog we want to automatically go to the new dogs page
export const createDog = (dog, history) => {   
  return async (dispatch) => {
    const response = await axios.post("/api/dogs", dog);
    dispatch(_createDog(response.data));
    history.push(`/dogs/${dog.id}`);
  };
};

export const updateDog = (id, dog, history) => {
  return async (dispatch) => {
    const updatedDog = (await axios.put(`/api/dogs/${id}`, dog)).data
    dispatch(_updateDog(updatedDog));
    history.push("/dogs"); 
  };
};

export const createFakerDog = (name, history) => {   
  return async (dispatch) => {
    const dog = (await axios.post("/api/dogs", { name })).data;
    dispatch(_createDog(dog));
    history.push(`/dogs/${dog.id}`);
  };
};

export const deleteDog = (dog, history) => {
  return async (dispatch) => {
    await axios.delete(`/api/dogs/${dog.id}`);
    dispatch(_deleteDog(dog));
    history.push("/dogs"); //go back to /dogs after deleting a dog
  };
};

export const fetchTypes = () => {
  return async (dispatch) => {
    const types = (await axios.get("/api/types")).data;
    dispatch(_fetchTypes(types));
  };
};

//*****************************************************************************************************
// Action Creators
const _loadDogs = (dogs) => ({ type: LOAD_DOGS, dogs });

const _createDog = (dog) => ({ type: CREATE_DOG, dog });

const _updateDog = (dog) => ({type: UPDATE_DOG, dog})

const _deleteDog = (dog) => ({ type: DELETE_DOG, dog });

const _fetchTypes = (types) => ({ type: LOAD_TYPES, types });

const store = createStore(reducer, applyMiddleware(loggerMiddleware, thunks));
export default store;
