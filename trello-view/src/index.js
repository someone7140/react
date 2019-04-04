import { Provider } from 'react-redux';
import {render} from 'react-dom';
import BorderApp from './containers/BorderApp';
import React from 'react';
import { login } from './actions/trelloAction'
import trelloStore from './store/trelloStore';

trelloStore.dispatch(login())

render( 
  <Provider store ={trelloStore}>
    <BorderApp />
  </Provider >,
  document.getElementById('root')
);
