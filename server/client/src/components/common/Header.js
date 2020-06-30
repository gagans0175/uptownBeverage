import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import BackButton from './BackButton';
const Header = styled.div`
background: #252525;
top: 0;
color:#fff;
left: 0;
margin: 0;
width: 100vw;
padding: 2vh 3vw;
position: fixed;
right: 0;
z-index: 2;
height:8vh;
text-align:center;
`;
const SignOut = styled.button`
color: #fff !important;
font-weight: bold;
font-size: 0.8rem;
`;
export default class HeaderComponent extends React.Component {
  onLogoutClick = e => {
    e.preventDefault();
    sessionStorage.removeItem("jwtToken");
    this.props.actions.logoutUser(this.props.history);
  };
  render(){
    console.log('HEADER PROPS', this.props);
    const { user = {} } = this.props.authReducer;
    const { loggedInuser } = user;
    return(
      <Header>
        <div className="row">
          <div className="col">
           {this.props.authReducer && this.props.authReducer.isAuthenticated && <BackButton />}
          </div>
          
          <div className="col">
            {this.props.authReducer && this.props.authReducer.isAuthenticated && <SignOut onClick={this.onLogoutClick} className="btn btn-link" >
              <span aria-hidden="true">Logout <span>{loggedInuser && loggedInuser.name && loggedInuser.name.split(" ")[0]}</span></span>
            </SignOut>}
          </div>
        </div>  
      </Header>
    );
  }

}