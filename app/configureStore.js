import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import rootReducer from './Containers/HomePage/reducers'

const loggerMiddleware = createLogger()

/*
Redux store setup.
*/
export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware,loggerMiddleware)
  )
}
