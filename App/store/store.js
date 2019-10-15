import { createStore } from 'redux'
import {AsyncStorage } from 'react-native'
import reducer from './reducer'
import initialState from './initialState'

function configureStore(initialState) {
  AsyncStorage.getItem('store').then((value) => {
        if (value && value.length) {
          // populate intial state from persistant store if exists.
          initialState =  JSON.parse(value)
          console.log('stored State :----------' + initialState)
      }
    });

    return createStore(reducer, initialState);
}

const store = configureStore(initialState)

export default store
