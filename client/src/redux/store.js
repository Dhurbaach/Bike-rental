import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { bikeReducer } from './reducers/bikeReducers';
import { alertReducer } from './reducers/alertReducer';
import { bookingsReducer } from './reducers/bookingsReducer';

// Compose enhancer with DevTools
const composeEnhancers = composeWithDevTools({
  // You can configure additional options for DevTools if necessary
});

// Combine all reducers
const rootReducer = combineReducers({
   bikeReducer, alertReducer,bookingsReducer
});

// Create store with middleware and DevTools
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)  // Apply middleware directly, no need for array wrapping
  )
);

export default store;
