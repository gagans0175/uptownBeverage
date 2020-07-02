/**
 * @routes - centralized routes
 */
import React from 'react';
import LandingContainer from './containers/LandingContainer';
import RegisterContainer from './containers/RegisterContainer';
import LoginContainer from './containers/LoginContainer';
import DashboardContainer from './containers/DashboardContainer';
import CheckIn from './components/CheckinCheckout';


export default function createRoute() {
  return [
    {
      path: '/',
      exact: true,
      component: () => <LandingContainer />,
      pageName: 'landing'
    },
    {
      path: '/register',
      exact: true,
      component: () => <RegisterContainer />,
      pageName: 'register'
    },
    {
      path: '/login',
      exact: true,
      component: () => <LoginContainer />,
      pageName: 'login'
      
    },
    {
      path: '/dashboard',
      exact: true,
      component: () => <DashboardContainer />,
      pageName: 'dashboard'
    },
    {
      path: '/checkin',
      exact: true,
      component: () => <CheckIn />,
      pageName: 'checkin'
    },
    // {
    //   path: '/dashboard',
    //   exact: true,
    //   component: () => <DashboardComponent />
    // },
    // {
    //   path: '/survey/createNewSurvey',
    //   component: () => <SurveyNewComponent />
    // }
  ];
}
