import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const initialState = getStorage('locations') || {};

const configureStore = () => {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

  return store;
};

export default configureStore();
