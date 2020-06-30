import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as actions from './actions';
import styled from 'styled-components';

const handleNotificationColor = color => {
  console.log('COLOR', color);
  switch (color) {
    case 'Errors':
      return '#d9534f';
    case 'Info':
      return '#5bc0de';
    case 'Warnings':
      return '#f0ad4e';
    default:
      return '#5cb85c'
  }
}

const NotificationWrap = styled.div`
margin-top: ${props => props.isAuthenticated ? '8vh' : '0vh'};
display: flex;
flex-direction: row;
flex-wrap: nowrap;
justify-content: space-around;
align-items: center;
align-content: center;
width: 100vw;
text-align:center;
height: 8vh;
`;


const NotificationContianer = styled.div`
width: 100%;
padding: 2vh 3vw;
background-color: ${props => handleNotificationColor(props.notificationType)};
color: #fff;
`;

const MSG = styled.h5`
font-size: 13px;
font-size: 1.3rem;
font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
`;


class NotificationBar extends React.Component {
  
  
  render(){
    const { isNotificationVisible, message, type} = this.props;
    const isAuthenticated = (this.props.auth && this.props.auth.isAuthenticated) || false;
    if (!isNotificationVisible) {
      return null;
    }
    return (
      <>
        {isNotificationVisible && (<NotificationWrap role="alertdialog">
          <NotificationContianer notificationType={type} isAuthenticated={isAuthenticated}>
            <MSG>{message}</MSG>
          </NotificationContianer>
          </NotificationWrap>)}
        </>
    );
  }
}

const mapStateToProps = (state) =>({
  isNotificationVisible: (state.notification) ? state.notification.isNotificationVisible : false,
  message: (state.notification) ? state.notification.message : '',
  type: (state.notification) ? state.notification.type : '',
  auth: state.authReducer,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(NotificationBar);