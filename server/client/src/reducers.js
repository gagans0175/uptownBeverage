import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import isEmpty from  "is-empty";

import { notification } from './components/common/NotificationBar/reducer';

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
    return {
      ...state,
      isAuthenticated: !isEmpty(action.payload),
      user: action.payload
    };
  case 'USER_LOADING':
    return {
      ...state,
      loading: true
    };
    case 'FETCH_USER':
      return action.payload || false;
    case 'USER_INFO':
      return action.payload || null;
    case 'GET_ERRORS':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  authReducer,
  form: formReducer,
  notification
});