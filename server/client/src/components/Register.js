import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from 'redux-form'
import styled from 'styled-components';
import { deviceType, setPageTitle } from '../utils';


const MainContainer = styled.div`
padding-top: 8vh;
padding-bottom: 8vh;
`;

const FluidRow = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center!important;
box-sizing: border-box;
flex: 0 1 auto;
width: 100%;
max-width: 325px;
padding: 15px;
margin: 4vh auto 0 auto;

`;



const maxLength = (value) => {
  if (!value) {
    return value;
  }
  return value.slice(0, 12);
}

const validate = (values) => {
  const errors = {}
 const { first_name, last_name, user_name, email, phone, password, confirmpassword , userRole} = values;

  
  if (!first_name) {
    errors.first_name = 'First name is required';
  } else if (!/^[a-zA-Z\- ',\s]+$/i.test(first_name.trim())) {
    errors.first_name = 'Please enter a valid first name';
  }

  if (!last_name) {
    errors.last_name = 'Last name is required';
  } else if (!/^[a-zA-Z\- ',\s]+$/i.test(last_name.trim())) {
    errors.last_name = 'Please enter a valid last name';
  }

  if (!email) {
    errors.email = 'Email address is required';
  } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(email.trim())) {
    errors.email = 'Please enter a valid email address';
  }
  if (!phone) {
    errors.phone = 'Phone number is required';
  } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i.test(phone.trim())) {
     errors.phone = 'Please enter a valid 10 digit phone number.';
   }
  if (!user_name) {
    errors.user_name = 'User name is required';
  } 

  if (!userRole) {
    errors.userRole = 'Role is required';
  } 
  // else if (!/^[a-zA-Z\- ',\s]+$/i.test(user_name.trim())) {
  //   errors.user_name = 'Please enter a valid user name';
  // }
  
  if (!password) {
    errors.password = 'Password is required';
  } 
  // else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/i.test(password.trim())){
  //   errors.password = 'Please enter a valid password.';
  // }

  if (!confirmpassword) {
    errors.confirmpassword = 'Confirm Password is required';
  }
  
  return errors
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label htmlFor={input.name} style={{ fontSize: '10px', lineHeight:'12px'}}>{label}</label>
    <div className="input-group m-0">
      <input 
      {...input} 
      className={`${touched && error ? 'formerror' : 'form-control'}`}
      style={{
        margin: 0, 
        height: '36px',
        width: '100%',
        fontSize: '12px',
        paddingLeft:'8px'

      }}
      />
      {touched && error && <div style={{display: 'block', width:'100%'}}><p style={{ fontSize: '10px', lineHeight:'12px'}}>{error}</p></div>}
      </div>
      
  </div>
)

const renderDropdown = ({ input, label, meta: { touched, error } }) => (
  <div>
    <label htmlFor={input.name} style={{ fontSize: '10px', lineHeight:'12px'}}>{label}</label>
    <select 
    className="custom-select"
    className={`${touched && error ? 'custom-select error' : 'custom-select'}`}
    {...input} >
    {colors.map(val => (
      <option value={val} key={val}>{val}</option>
    ))}
    </select>
    {touched && error && <div style={{display: 'block', width:'100%'}}><p style={{ fontSize: '10px', lineHeight:'12px'}}>{error}</p></div>}
  </div>
)


const colors = ['Owner', 'Manager', 'Employee', 'Servant', 'Unwanted', 'Enemy'];

class RegisterUser extends React.Component {
 state = {
      deviceType: deviceType()
  };

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
  render(){
  //props.actions.showInfoNotification('hello');
  const { error, handleSubmit, pristine, reset, submitting } = this.props
  const columnSize = deviceType() === 'desktop' ? 12 : 12;
  const device = deviceType();
  const handleFormSubmit = (values) =>{
    this.props.actions.signUpUser(values, (response) => {
      if(response && !response.errors && (response.existingUser || response.newUser)){
        this.props.history.push('/login')
      }
    });
  }
  
  return (
    <MainContainer>
      <FluidRow className="no-gutters">
        <div className="col-12 text-center mb-5">
          <h4><b>Register</b> below</h4>
          <p className="grey-text text-darken-1">Already have an account? <Link to="/login">Log in</Link></p>
        </div>
        <div style={{height: '4px', backgroundColor: '#000', marginBottom: '8px', marginTop: '8px', width: '100%'}}></div>
        <div className={`col-${columnSize}`}>
          <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          
            <div className="row no-gutters">
              <div className="col-6 pr-2">
                <Field
                  name="first_name"
                  id="first_name"
                  type="text"
                  component={renderField}
                  label="First name"
                />
              </div>
              <div className="col-6">
                <Field
                  name="last_name"
                  id="last_name"
                  type="text"
                  component={renderField}
                  label="Last name"
                />
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-sm-12 col-md-6 pr-2">
                <Field
                  name="user_name"
                  id="user_name"
                  type="text"
                  component={renderField}
                  label="User id [5 to 20 characters]"
                />
              </div>
              <div className="col-sm-12 col-md-6">
                <div>
                  <Field 
                    id="userRole" 
                    name="userRole" 
                    component={renderDropdown}
                    label="Role"
                  />
                  
              </div>
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-sm-12 col-md-12">
                <Field
                  name="email"
                  id="email"
                  type="text"
                  component={renderField}
                  label="Email"
                
                />
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-sm-6 col-md-6">
                <div>
                  <Field 
                    id="phone" 
                    name="phone" 
                    component={renderField}
                    type="tel"
                    label="Phone"
                    pattern="[0-9]*"
                    mask="999.999.9999"
                    normalize={maxLength} 
                  />
              </div>
              </div>
              {device === 'desktop' && <div className="col-sm-6 col-md-6" style={{marginTop: '18px'}}>
                <div style={{ paddingTop: '12px', paddingLeft: '12px'}}><p style={{fontSize: '8px', lineHeight: '12px', marginBottom: 0}}>
                This is in case we can’t reach you on your primary number.
              </p></div>
              </div>}
            </div>
            <div className="row no-gutters">
              <div className="col-sm-12 col-md-6 pr-2">
                <Field
                  name="password"
                  id="email"
                  type="password"
                  component={renderField}
                  label="Password"
                
                />
              </div>
              <div className="col-sm-12 col-md-6">
                <div>
                  <Field 
                    id="confirmpassword" 
                    name="confirmpassword" 
                    type="password"
                    component={renderField}
                    label="Confirm Password"
                  />
              </div>
              </div>
            </div>
            {error && <strong>{error}</strong>}
            <div className="btn-group mt-3">
               
                <button 
                  type="submit" 
                  disabled={submitting}
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginRight: "1rem",
                  }}
                  className="btn btn-primary"
                  >
                  Sign up
                </button>
                {<button 
                  type="button" 
                  disabled={pristine || submitting} 
                  onClick={reset}
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    lineHeight: '1.2rem'
                  }}
                  className="btn btn-link"
                >
                  Reset
                </button>}
               
            </div>
          </form>
        </div>
      </FluidRow>
    </MainContainer>

  )
  }
}

// class RegisterUser extends Component {
//   constructor() {
//     super();
//     this.state = {
//       first_name: '',
//       last_name: '',
//       user_name: '',
//       password: '',
//       password2: '',
//       phone: '',
//       errors: {},
//       email: '',
//       confirmationMessage: null,
//       deviceType: deviceType()
//     };
//   }
//   updateDimensions = () => {
//     this.setState({
//       deviceType: deviceType()
//     })
//   }
//   componentDidMount() {
//     setPageTitle('Employee login');
//     this.updateDimensions();
//     window.addEventListener("resize", this.updateDimensions);
//   }
//   componentWillUnmount() {
//     window.removeEventListener("resize", this.updateDimensions);
//   }


export default reduxForm({
  form: 'registrationForm',
  enableReinitialize: true,
  validate
})(RegisterUser)


