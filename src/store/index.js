import { createStore, applyMiddleware } from 'redux';
import thunkMiddeware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const middlewares = [thunkMiddeware, createLogger()];

export default function configStore () {
  return createStore(rootReducer,applyMiddleware(...middlewares));
}
