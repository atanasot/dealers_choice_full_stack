import { createStore, applyMiddleware, combineReducers } from "redux";
import loggerMiddleware from "redux-logger";
import thunks from "redux-thunk";
import axios from "axios";

// Action Constants
const LOAD_DOGS = "LOAD_DOGS";
const CREATE_FAKER_DOG = 'CREATE_FAKER_DOG'
const DELETE_DOG = 'DELETE_DOG'

// Dogs Reducer
const dogs = (state = [], action) => {
  if (action.type === LOAD_DOGS) {
    state = action.dogs;
  }
  if (action.type === CREATE_FAKER_DOG) {
    state = [...state, action.dog]
  }
  if (action.type === CREATE_FAKER_DOG) {
    state = [...state, action.dog]
  }
  if (action.type === DELETE_DOG) {
    return state.filter(dog => dog.id !== action.dog.id)
  }
  return state;
}

// Combine reducers
const reducer = combineReducers({
    dogs
})



// ************************************Thunks*******************************************
export const fetchDogs = () => {
  return async (dispatch) => {
    const dogs = (await axios.get("/api/dogs")).data;
    dispatch(loadDogs(dogs));
  };
};

// add history here -- when we create a dog we want to automatically go to the new dogs page
export const createFakerDog = (name , history) => {
  return async (dispatch) => {
    const dog = (await axios.post("/api/dogs", {name})).data;
    dispatch(_createFakerDog(dog));
    history.push(`/dogs/${dog.id}`)
  };
};

export const deleteDog = (dog , history) => {
  return async (dispatch) => {
    await axios.delete(`/api/dogs/${dog.id}`) 
    dispatch(_deleteDog(dog));
    history.push('/dogs') //go back to /dogs after deleting a dog
  };
};

//*****************************************************************************************************
// Action Creators
const loadDogs = dogs=> ({type: LOAD_DOGS, dogs})

const _createFakerDog = dog => ({type: CREATE_FAKER_DOG, dog})

const _deleteDog = dog => ({type: DELETE_DOG, dog})

const store = createStore(reducer, applyMiddleware(loggerMiddleware, thunks))
export default store;
