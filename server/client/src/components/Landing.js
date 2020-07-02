import React, { Component } from 'react';
import styled, {keyframes} from 'styled-components';

import { deviceType } from '../utils';
import { Link } from "react-router-dom";


import logo from '../assets/images/logo6.png';
import '../../src/assets/navigation.css';

 
class LoginPage extends Component {
  state = {
    deviceType: deviceType(),
    prevScrollpos: window.pageYOffset,
    visible: false,
    show: true,
    scrollPos: 0,
    navClass: ''
  }
  handleScroll = () => {
    const scrollTop = document.body.getBoundingClientRect().top;
    console.log('scrollTop', scrollTop);
    if (scrollTop) {
      this.setState({
        navClass: 'scrolled',
        scrollTop
      }) 
    } else {
      this.setState({
        navClass: 'nonScrolled',
        scrollTop
      })
    }
    // const { scrollPos } = this.state;
    // this.setState({
    //   scrollPos: document.body.getBoundingClientRect().top,
    //   show: document.body.getBoundingClientRect().top > scrollPos
    // });
  };

  updateDimensions = () => {
    this.setState({
      deviceType: deviceType()
    })
  }
  componentDidMount() {
   
    if (this.props.authReducer && this.props.authReducer.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.updateDimensions);
  }
  render() {
    return (
      <div style={{height: '100vh'}}>
        <div>
          {<div className={`navigation-wrapper ${this.state.navClass}`}>
            <div className="left-column">
            
            <div className="icon">
              <i className="fas fa-phone-volume" style={{fontSize: '2em', fontWeight: '900', display: 'inlineBlock', textRendering: 'auto', lineHeight: 1, }}></i>
            </div>
              <div className="contact-hours-wrapper"> 
                <div className="phone">(518) 355-2305</div>
                <div className="hours">9 AM - 9 PM</div>
              </div>
              
          </div>
          <div className="center-column">
            <div className="banner-image">
              <img src={logo} alt="Altamont Beverage" />
            </div>
              <div className="links-wrapper">
              <div className="nav-link">Uptown Beverage</div>
              {/*<div className="nav-link">Login</div>
              <div className="nav-link">Checkin</div>
              <div className="nav-link">Checkout</div>
      <div className="nav-link">Timesheet</div>*/}
              
            </div>
          </div>
          <div className="right-column">
            <div className="address-wrapper">
              1866 Altamont Ave,<br /> Schenectady, NY 12303
            </div>
            <div className="contact-icon">
              <i className="fas fa-map-marker-alt" style={{fontSize: '2em', fontWeight: '900', display: 'inlineBlock', textRendering: 'auto', lineHeight: 1, }}></i>
            </div>
            </div>
          </div>}
      
            <div className="hero-section">
            </div>
          
          <div className="features-section">
            <div className="columns-wrapper">
              <div className="column">
                <i className="fas fa-beer"></i>
                <p>
                  <Link to="/login" style={{ letterSpacing: '1.5px',color: '#000', fontSize: '1.2rem' }}>
                    Log In
                  </Link>
                  </p>
              </div>
              <div className="column">
                <i className="fas fa-money-bill"></i>
                <p>
                  <Link to="/checkin" style={{ letterSpacing: '1.5px',color: '#000', fontSize: '1.2rem' }}>
                    Checkin
                  </Link>
                  </p>
              </div>
              <div className="column">
                <i className="fas fa-money-check"></i>
                <p>
                  <Link to="/checkin" style={{ letterSpacing: '1.5px',color: '#000', fontSize: '1.2rem' }}>
                    Checkout
                  </Link>
                  </p>
              </div>
            </div>
          </div>
          <div className="store-map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2928.353927548843!2d-73.95588028453032!3d42.78086717916079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89de71972b29eccf%3A0xb87a50f8b27d4ffb!2sUptown%20Beverage!5e0!3m2!1sen!2sus!4v1593634735121!5m2!1sen!2sus" width="100%" height="400" frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
        </div>
      </div>
    </div>
      
    );
  }
}

export default LoginPage;