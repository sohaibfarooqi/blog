// Action Constants
export const SELECT_TAB = 'SELECT_TAB'
export const REQUEST_RESOURCE = 'REQUEST_RESOURCE'
export const RECEIVE_RESOURCE = 'RECEIVE_RESOURCE'
export const RESPONSE_ERROR = 'RESPONSE_ERROR'

// View constants
export const TAB_LIST = [
  {title: 'Entries', endpoint: '/entries'},
  {title: 'Blog', endpoint: '/blogs'},
  {title: 'Author', endpoint: '/authors'},
  {title: 'Comments', endpoint: '/comments'}
]

// API Constants
export const API_URL = "http://localhost:8000"

export const PAGE_NUMBER_PARAM = 'page[number]'
export const PAGE_SIZE_PARAM = 'page[size]'

export const DEFAULT_PAGE_NUMBER = 1
export const DEFAULT_PAGE_SIZE = 20
