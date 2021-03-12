import { combineReducers } from 'redux';
import cartReducer from './reducersType/cartReducer';
import userReducer from './reducersType/userReducer';

const allReducers = {
  cartReducer,
  userReducer,
};

const rootReducer = combineReducers(allReducers);
export default rootReducer;
