import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import trelloReducer from '../reducers/trello';

const trelloStore = createStore(
  trelloReducer,
  applyMiddleware(thunk)
);


export default trelloStore;
