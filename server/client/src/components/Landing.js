import React, { Component } from 'react';
import styled, {keyframes} from 'styled-components';
import logo from '../assets/images/logo4.png';
import { deviceType } from '../utils';
import { Link } from "react-router-dom";

 
const Animation = keyframes`
  0% { top: -50em; }
  100% { top: 0em;}
`;

const AnimationContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5em;
  background-color: #252525;
`;

const AnimationContent = styled.div`
  position: relative;
  animation: ${Animation};
  animation-duration: 4s;
  animation-fill-mode: forwards;
  height: 95vh;
`;


const ImgContainer = styled.div`
position: relative;
height: 100%;
`;

const MobileImage = styled.img`
height: auto;
width: 100%;
max-height: 550;
max-width: 675px;
`;
const TextContainer = styled.div`
position: absolute;
z-index: 999;
margin: 0 auto;
left: 0;
right: 0;
bottom: 2vh;  
text-align: center;
color:#ffff;
`;
class LoginPage extends Component {
  state = {
    deviceType: deviceType()
  }

  updateDimensions = () => {
    this.setState({
      deviceType: deviceType()
    })
  }
  componentDidMount() {
    if (this.props.authReducer && this.props.authReducer.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    // this.props.actions.showInfoNotification('hello');
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  render() {
    return (
      
        <AnimationContainer>
          <AnimationContent>
            <ImgContainer>
              <MobileImage src={logo} />
              <TextContainer>
                <Link to="/login" style={{ letterSpacing: '1.5px',color: '#FFF' }}>
                  Log In
                </Link>
              </TextContainer>
            </ImgContainer>
          </AnimationContent>
      </AnimationContainer>
      
    );
  }
}

export default LoginPage;