import rootReducer from './reducers';
import { configureStore } from '@reduxjs/toolkit';
import devToolsEnhancer from 'remote-redux-devtools';

const store = configureStore({
  reducer: rootReducer,
  enhancers: devToolsEnhancer(),
  devTools: true
});

export default store;
