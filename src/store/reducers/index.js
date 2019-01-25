import { combineReducers } from 'redux';
import cartReducer from './reducersType/cartReducer';

const allReducers = {
  cartReducer
};

const rootReducer = combineReducers(allReducers);
export default rootReducer;
