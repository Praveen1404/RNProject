import * as types from '../actions/types'
import { combineReducers } from 'redux';

const user_name = ( state ={}, action) => {
  switch (action.type) {
    case types.GET_USER:
      return action.payload;
    default:
      return state;
  }
}

const track_event = ( state = [], action) => {
  switch (action.type) {
    case types.TRACK_EVENT:
      return action.payload;
    default:
      return state;
  }
}

const appReducer = combineReducers(
  {
    user_name,
    track_event,
  }
);

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

export default rootReducer;
