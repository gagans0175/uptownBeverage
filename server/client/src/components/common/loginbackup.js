

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';
import classnames from "classnames";
import { deviceType, setPageTitle } from '../../utils';

const CustomRow = styled(Row)`
height: 100%;
display:flex;
align-items:center;
text-align:center;
padding: 0;
margin: 0 !important;
width: 100%;
`;
//  background-color: #252525;
const CustomCol = styled(Col)`
flex-grow: 0;
padding: 0;
height: 100vh;
&:first-child {
  
}
&:nth-child(2) {
  background: #fff;
}
`;

const ColGeneral = styled(Col)`
text-align: center;
padding: 0;
`;
class LoginUser extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      deviceType: deviceType()
    };
  }

  // componentDidMount() {
  //   // If logged in and user navigates to Register page, should redirect them to dashboard
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push("/dashboard");
  //   }
  // }

  updateDimensions = () => {
    this.setState({
      deviceType: deviceType()
    })
  }
  componentDidMount() {
    setPageTitle('Register an employee');
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  componentWillReceiveProps(nextProps) {

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      username: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    this.props.actions.registerUser(newUser);
  };

  render() {
    const { errors } = this.state;
    const columnSize = this.state.deviceType === 'desktop' ? 6 : 12;
    const offset = this.state.deviceType === 'desktop' ? 3 : 0;
    return (
      <CustomRow>
          <Col xs={12} style={{textAlign: 'left'}}>
            <Link to="/" className="btn-flat waves-effect" >
              <i className="material-icons left">keyboard_backspace</i> Back to home
            </Link>
          </Col>

          <Col xs={12} style={{ textAlign:"center", paddingRight: '2vw'}}>
            <Link
              to="/register"
              style={{
                width: "140px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className=""
            >
              Register
            </Link>
          </Col>

          
          <Col xs={12}>
          <h4>
            <b>Login</b> below
          </h4>
          <p className="grey-text text-darken-1">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </Col>
          
        <Col xs={columnSize} xsOffset={offset} style={{ padding: '2vh' }}>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={this.onChange}
                value={this.state.username}
                error={errors.username}
                id="username"
                type="text"
                placeholder="Username"
                className={classnames("", {
                  invalid: errors.username || errors.usernameNotFound
                })}
              />
              <label htmlFor="username"  style={{display:'none'}}>Username</label>
              <span className="red-text">
                {errors.username}
                {errors.usernotfound}
              </span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                placeholder="Email"
                className={classnames("", {
                  invalid: errors.email || errors.emailnotfound
                })}
              />
              <label htmlFor="email"  style={{display:'none'}}>Email</label>
              <span className="red-text">
                {errors.email}
                {errors.emailnotfound}
              </span>
            </div>
            <div className="input-field col s12">
              <label htmlFor="password" style={{display:'none'}}>Password</label>
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                placeholder="Password"
                className={classnames("", {
                  invalid: errors.password || errors.passwordincorrect
                })}
              />
              
              <span className="red-text">
                {errors.password}
                {errors.passwordincorrect}
              </span>
              <p className="grey-text text-darken-1" style={{textAlign: 'left', marginTop: '0.5vh'}}>
                <Link to="/register">Forgot password?</Link>
              </p>
            </div>
            <div className="col s12">
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "3.5rem"
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Login
              </button>
            </div>
          </form>
        </Col>
      </CustomRow>
    );
  }
}

export default LoginUser;