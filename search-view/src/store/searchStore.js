import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import searchReducer from '../reducers/searchReducer';

const searchStore = createStore(
  searchReducer,
  applyMiddleware(thunk)
);

export default searchStore;
