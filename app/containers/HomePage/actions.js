import fetch from 'isomorphic-fetch'
import {
  SELECT_TAB,
  REQUEST_RESOURCE,
  RECEIVE_RESOURCE,
  RESPONSE_ERROR,

  API_URL,
  PAGE_NUMBER_PARAM,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_PARAM
} from './constants'

/*
Select tab action. It is invoked
when a user click on a specific tab.
*/
export const selecTab = tab =>{
  return {
    type: SELECT_TAB,
    tab
  }
}

/*
This action is dispatched when data is requested
from the server for a particular entity.
*/
function requestData(tab) {
  return {
    type: REQUEST_RESOURCE,
    tab
  }
}

/*
This action is dispatched when server send back
response.
*/
function receiveData(tab, json) {
  return {
    type: RECEIVE_RESOURCE,
    tab,
    data: json.data
  }
}

/*
This action is invoked in case of an error
HTTP, timeouts etc.
*/
function processError(tab, errmsg){
  return {
    type: RESPONSE_ERROR,
    tab,
    msg: errmsg,
  }
}

/*
This action is called by containers to request data from the server.
* @param  {Object} tab  Tab object for which the data needs to be fetched.
* @param  {Numeric} page The page that needs to be fetched.
* @param  {Numeric} page_size  Page size for response.
*/
export const fetchData = (tab, page = DEFAULT_PAGE_NUMBER, page_size = DEFAULT_PAGE_SIZE) => {
  return dispatch => {
    dispatch(requestData(tab))
    return fetch(API_URL + tab.endpoint + '?' + PAGE_NUMBER_PARAM + '=' + page + '&' + PAGE_SIZE_PARAM + '=' + page_size)
      .then(response => {
        if (!response.ok) { throw response }
        return response.json()
      })
      .then(json => dispatch(receiveData(tab, json)))
      .catch( err => {
        err.text().then( errorMessage => {
        dispatch(processError(tab, errorMessage))
      })
   })
  }
}



