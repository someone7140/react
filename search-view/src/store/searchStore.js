import { createStore } from 'redux'
import searchReducer from '../reducers/searchReducer';

const searchStore = createStore(
  searchReducer
);

export default searchStore;
