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

export const selecTab = tab =>{
  return {
    type: SELECT_TAB,
    tab
  }
}

function requestData(tab) {
  return {
    type: REQUEST_RESOURCE,
    tab
  }
}

function receiveData(tab, json) {
  return {
    type: RECEIVE_RESOURCE,
    tab,
    data: json.data
  }
}

function processError(tab, errmsg){
  return {
    type: RESPONSE_ERROR,
    tab,
    msg: errmsg,
  }
}

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



