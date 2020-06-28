import React from 'react';
import jwt_decode from "jwt-decode";
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import styled from 'styled-components';
import setAuthToken from './setAuthToken';
import ParentLandingComponent from './components';
import NotificationBar from './components/common/NotificationBar';
import { setCurrentUser, logoutUser } from './actions';

const CustomRow = styled.div`
height:100%;
`;

const CustomCol = styled.div`
padding: 0;
height:100%;
`;
/**
 * background: var(--background-color);
    bottom: 0;
    box-shadow: 0 -12px 24px var(--background-color);
    left: 0;
    margin: 0 auto;
    max-width: 736px;
    padding-left: 24px;
    padding-right: 24px;
    position: fixed;
    right: 0;
    width: 100%;
    z-index: 2;
 */

 // Check for token to keep user logged in

export default function provider(store, routeConfig) {
  if (sessionStorage.jwtToken) {
    // Set auth token header auth
    const token = sessionStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
  
      // Redirect to login
      window.location.href = "./login";
    }
  }
  return (
    <Provider store={store}>
      <CustomRow className="routeProvider">
        <CustomCol xs={12}>
          <NotificationBar />
          <HashRouter>
            <ParentLandingComponent routesMap={routeConfig} />
          </HashRouter>
        </CustomCol>  
      </CustomRow> 
    </Provider>
  );
}
