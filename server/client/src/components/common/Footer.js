import React from 'react';
import styled from 'styled-components';

const Footer = styled.div`
background: #000;
bottom: 0;
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

export default class FooterComponent extends React.Component {
  render() {
    if (this.props.authReducer && !this.props.authReducer.isAuthenticated) {
      return <></>
    }
    return(
      <Footer>Footer</Footer>
    );
  }

}