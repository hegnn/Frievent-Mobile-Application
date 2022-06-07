import React from 'react';
import {LogBox, View} from 'react-native';
import {Provider, useSelector} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import Navigation from './App/Navigation/Navigation';
import thunk from 'redux-thunk';
import rootReducer from './App/redux/reducers/rootReducer';
import {createLogger} from 'redux-logger';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  LogBox.ignoreLogs(['Remote debugger']);

  const logger = createLogger();
  const store = createStore(rootReducer, applyMiddleware(thunk, logger));
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
