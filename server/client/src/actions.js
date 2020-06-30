import axios from 'axios';
import setAuthToken from './setAuthToken';
import jwt_decode from "jwt-decode";

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
      dispatch({ type: 'USER_INFO', payload: response.data });
      callback && callback(response.data);
    })
    .catch(err =>
      dispatch({
        type: 'GET_ERRORS',
        payload: err.response.data
      })
    );
};


// Login - get user token
export const signInUser = (userData, callback) => dispatch => {
  axios
    .post("/user/login", userData)
    .then(res => {

      // Set token to sessionStorage
      const { token } = res.data;
      sessionStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      callback && callback(res.data);
    })
    .catch(err =>
      dispatch({
        type: 'GET_ERRORS',
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: 'SET_CURRENT_USER',
    payload: decoded
  };
};

// Log user out
export const logoutUser = (history) => dispatch => {
  axios
    .get("/user/logoutUser")
    .then(response => {
      if(response){
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