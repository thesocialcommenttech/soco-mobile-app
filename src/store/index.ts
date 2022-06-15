import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
// import from redux-thunk default
import thunk from 'redux-thunk';
const store = createStore(rootReducer, {}, composeWithDevTools());

export default store;
