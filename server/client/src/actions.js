import axios from 'axios';
import setAuthToken from './setAuthToken';
import jwt_decode from "jwt-decode";
import * as notificationActions from './components/common/NotificationBar/actions';

export const fetchUser = (token) => async dispatch => {
  const response = await axios.get('/user/me', token);
  dispatch({ type: 'FETCH_USER', payload: response.data });
};

export const getCurrentUser = () => async dispatch => {
  const response = await axios.get('/user/current_user');
  dispatch({ type: 'FETCH_USER', payload: response.data });
};


// Register User
export const signUpUser = (userData, callback) => dispatch => {
  axios
    .post("/user/signup", userData)
    .then((response) => {
      if (response.data.errors) {
        dispatch(notificationActions.showErrorNotification(response.data.message));
        setTimeout(() => {
          dispatch(notificationActions.hideNotification())
        }, 8000);
      } else {
        dispatch(notificationActions.showSuccessNotification('User has been created successfully.'));
        setTimeout(() => {
          dispatch(notificationActions.hideNotification())
        }, 8000);
        dispatch({ type: 'USER_INFO', payload: response.data });
        callback && callback(response.data);   
      }
     
    })
    .catch(err => {
      dispatch(notificationActions.showErrorNotification(err.message));
        setTimeout(() => {
          dispatch(notificationActions.hideNotification())
        }, 8000);
      dispatch({
      type: 'GET_ERRORS',
      payload: err.message
    })}
    );
};


// Login - get user token
export const signInUser = (userData, callback) => dispatch => {
  axios
    .post("/user/login", userData)
    .then(res => {
      
      if (res.data.errors) {
        dispatch(notificationActions.showErrorNotification(res.data.message));
        setTimeout(() => {
          dispatch(notificationActions.hideNotification())
        }, 8000);
      } else {
        const { token } = res.data;
        sessionStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
        callback && callback(res.data);
      }

    })
    .catch(err => {
      console.log('err', err);
      dispatch({
        type: 'GET_ERRORS',
        payload: err.message
      })}
    );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: 'SET_CURRENT_USER',
    payload: {
      decoded
    }
  };
};

// Log user out
export const logoutUser = (history) => dispatch => {
  axios
    .get("/user/logoutUser")
    .then(response => {
      if (response) {
        dispatch(notificationActions.showWarningNotification('User logged out successfully.'));
        setTimeout(() => {
          dispatch(notificationActions.hideNotification())
        }, 8000);
        // Remove token from local storage
        sessionStorage.removeItem("jwtToken");
        // Remove auth header for future requests
        setAuthToken(false);
        // Set current user to empty object {} which will set isAuthenticated to false
        dispatch(setCurrentUser({}));
        history.push('/login')
      }
    })
    .catch(err =>
      dispatch({
        type: 'GET_ERRORS',
        payload: err.response.data
      })
    );
};