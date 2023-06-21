import React from 'react';
import ReactDOM from 'react-dom';
import MediaQuery from 'react-responsive';

import "./index.css";
import App from "./App";
import Announcement from './Announcement';

import { BrowserRouter as Router } from 'react-router-dom';
import { StateProvider } from './context/StateProvider';
import { initialState } from './context/initialState';
import reducer from './context/reducer';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <StateProvider initialState={initialState} reducer={reducer}>
        <MediaQuery minWidth={768}>
          <App />
        </MediaQuery>
        <MediaQuery maxWidth={768}>
          <Announcement />
        </MediaQuery>
      </StateProvider>
    </Router>
  </React.StrictMode>, 
  document.getElementById('root')
);
