import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { Field, reduxForm } from 'redux-form'
import { Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';
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

const RowNoMargin = styled(Row)`
margin-bottom: 0 !important;
`;
class RegisterUser extends Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      user_name: '',
      password: '',
      password2: '',
      phone: '',
      errors: {},
      email: '',
      confirmationMessage: null,
      deviceType: deviceType()
    };
  }
  updateDimensions = () => {
    this.setState({
      deviceType: deviceType()
    })
  }
  componentDidMount() {
    setPageTitle('Employee login');
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  dismissError() {
    this.setState({ error: '' });
  }
  // componentDidMount() {
  //   // If logged in and user navigates to Login page, should redirect them to dashboard
  //   if (this.props.auth && this.props.auth.isAuthenticated) {
  //     this.props.history.push("/dashboard");
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.auth && nextProps.auth.isAuthenticated) {
  //     this.props.history.push("/dashboard");
  //   }

  //   if (nextProps.errors) {
  //     this.setState({
  //       errors: nextProps.errors
  //     });
  //   }
  // }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (evt) => {
   
    const that = this;
    evt.preventDefault();
    const { first_name, last_name, user_name, email, password, phone } = this.state;
    
    const newUser = {
      first_name, last_name, user_name, email, password, phone
    };
    this.props.actions.registerUser(newUser, (response) => {
      if(response && response.data && !response.data.errors){
        const { message  } = response.data
        that.setState({
          first_name: '',
          last_name: '',
          user_name: '',
          password: '',
          phone: '',
          errors: {},
          email: '',
          confirmationMessage: message
        });
      }
      setTimeout(() => {
        this.props.history.push('/dashboard');
      }, 3000);
    });
  };

  render() {
    const { errors } = this.state;
    const columnSize = this.state.deviceType === 'desktop' ? 6 : 12;
    const offset = this.state.deviceType === 'desktop' ? 3 : 0;

    return (
      <CustomRow>
        
        <Col xs={12} style={{textAlign: 'left'}}>
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to home
        </Link>
        </Col>
        <Col xs={12}>
            <h4><b>Register</b> below</h4>
            <p className="grey-text text-darken-1">Already have an account? <Link to="/login">Log in</Link></p>
            {this.state.confirmationMessage !== null && <p className="green-text text-darken-3">{this.state.confirmationMessage}</p>}
          </Col>
        
        <Col xs={columnSize} xsOffset={offset} style={{ padding: '2vh' }}>
          <form noValidate onSubmit={this.onSubmit}>
            <RowNoMargin>
              <Col xs={12} sm={6} md={6} lg={6}>
                  <div className="input-field">
                  <input
                    placeholder="First name"
                    onChange={this.onChange}
                    value={this.state.first_name}
                    error={errors.first_name}
                    id="first_name"
                    type="text"
                    className={classnames("", {
                    invalid: errors.first_name
                  })}
                  />
                  <label htmlFor="first_name" style={{display:'none'}}>First name</label>
                  <span className="red-text">{errors.first_name}</span>
                </div>
              </Col>
              <Col xs={12} sm={6} md={6} lg={6}>
                <div className="input-field">
                <input
                  placeholder="Last name"
                  onChange={this.onChange}
                  value={this.state.last_name}
                  error={errors.last_name}
                  id="last_name"
                  type="text"
                  className={classnames("", {
                  invalid: errors.last_name
                })}
                />
                <label htmlFor="last_name" style={{display:'none'}}>Last name</label>
                <span className="red-text">{errors.last_name}</span>
              </div>
              </Col>
            </RowNoMargin>
            
            <RowNoMargin>
              <Col xs={12}>
                <div className="input-field">
                <input
                  placeholder="User name*"
                  onChange={this.onChange}
                  value={this.state.user_name}
                  error={errors.user_name}
                  id="user_name"
                  type="text"
                  className={classnames("", {
                  invalid: errors.user_name
                })}
                />
                <label htmlFor="user_name" style={{display:'none'}}>User name</label>
                <span className="red-text">{errors.user_name}</span>
              </div>
              </Col>
            </RowNoMargin>
            <RowNoMargin>
              <Col xs={12}>
              <div className="input-field">
              <input
                placeholder="Email*"
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className={classnames("", {
                invalid: errors.email
                })}
              />
              <label htmlFor="email" style={{display:'none'}}>Email</label>
              <span className="red-text">{errors.email}</span>
            </div>
              </Col>
            </RowNoMargin>
            <RowNoMargin>
              <Col xs={12}>
              <div className="input-field">
              <input
                placeholder="Phone number"
                onChange={this.onChange}
                value={this.state.phone}
                error={errors.phone}
                id="phone"
                type="text"
                className={classnames("", {
                invalid: errors.phone
                })}
              />
              <label htmlFor="phone" style={{display:'none'}}>Phone</label>
              <span className="red-text">{errors.phone}</span>
            </div>
              </Col>
            </RowNoMargin>
            
            
            
            <RowNoMargin>
              <Col xs={12} sm={6} md={6} lg={6}>
                <div className="input-field">
                <input
                  placeholder="Password*"
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                  invalid: errors.password
                  })}
                />
                <label htmlFor="password" style={{display:'none'}}>Password</label>
                <span className="red-text">{errors.password}</span>
              </div>

              </Col>
              <Col xs={12} sm={6} md={6} lg={6}>
              <div className="input-field">
              <input
                  placeholder="Confirm Password*"
                onChange={this.onChange}
                value={this.state.password2}
                error={errors.password2}
                id="password2"
                type="password"
                className={classnames("", {
                invalid: errors.password2
                })}
              />
              <label htmlFor="password2" style={{display:'none'}}>Confirm Password</label>
              <span className="red-text">{errors.password2}</span>
            </div>
              </Col>
            </RowNoMargin>
            
            <div className="col s12">
            <p className="grey-text text-darken-1">
            *Required fields
          </p>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                Sign up
              </button>
            </div>
          </form>
        </Col>
       
      </CustomRow>
    );
  }
}

RegisterUser = reduxForm({
  // a unique name for the form
  form: 'contact'
})(RegisterUser)

export default RegisterUser;

