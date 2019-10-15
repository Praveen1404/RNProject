import * as types from './types'
import initialState from '../store/initialState'

export function getUser(user_name) {
    return {
        type: types.GET_USER,
        payload: user_name
    }
}
export function trackEvent(track_event) {
  return {
    type: types.TRACK_EVENT,
    payload: track_event
  }
}
