import { combineReducers } from 'redux';
import rootState from './features/rootSlice';

const rootReducer = combineReducers({
  rootState,
});


export default rootReducer;
