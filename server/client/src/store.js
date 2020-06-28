import { createStore, applyMiddleware, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState, rootReducer, reduxThunk) {
  return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(reduxThunk)));
}
