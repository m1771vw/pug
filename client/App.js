import React from 'react';

// Imports to setup Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// import chatMiddleware from './components/Utils';
import rootReducer from './components/Redux/Reducers';
import Root from './components/Routing/Root';

import chatMiddleware from './components/Utils/chatMiddleware'

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    thunk,
    chatMiddleware
  )
);

export default App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);
