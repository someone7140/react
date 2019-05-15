import { Provider } from 'react-redux';
import { render } from 'react-dom';
import SearchApp from './containers/SearchApp';
import React from 'react';
import searchStore from './store/searchStore';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

render( 
  <Provider store ={searchStore}>
    <SearchApp />
  </Provider >,
  document.getElementById('root')
);
