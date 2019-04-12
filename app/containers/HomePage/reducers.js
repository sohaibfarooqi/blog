import { combineReducers } from 'redux';
import { fromJS } from 'immutable';

import {
  SELECT_TAB,
  REQUEST_RESOURCE,
  RECEIVE_RESOURCE,
  RESPONSE_ERROR,
  TAB_LIST
} from './constants'

/*
Root reducer for selected tab event.
*/
function selectedTab(state = TAB_LIST[0], action) {

  switch (action.type) {

    case SELECT_TAB:
      return action.tab

    default:
      return state
  }
}

/*
Helper method used by reducer to load manage states of the
newly fetched resource.
*/
function resource(
  state = {isFetching: false, items: [], error: ''},
  action){
  switch (action.type) {

    case REQUEST_RESOURCE:
      return Object.assign({}, state, {
        isFetching: true,
        error: ''
      })
    case RECEIVE_RESOURCE:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.data,
        error: ''
      })
    case RESPONSE_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        items: [],
        error: action.msg,
      })
    default:
      return state
  }
}
/*
Reducer for fetching the data by tab instance.
*/
function dataByTab(state = {}, action) {

  switch (action.type) {
    case RESPONSE_ERROR:
    case REQUEST_RESOURCE:
    case RECEIVE_RESOURCE:
      return Object.assign({}, state, {
        [action.tab]: resource(state[action.tab], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  dataByTab,
  selectedTab
})

export default rootReducer
