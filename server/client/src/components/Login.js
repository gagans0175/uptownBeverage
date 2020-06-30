import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import styled from 'styled-components';
import { deviceType } from '../utils';


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
margin: 8vh auto 0 auto;
`;


export default function MyForm(props) {
  
  const { register, handleSubmit, errors } = useForm();
  const [emailActive, setEmailStatus] = useState(false);
  const [device, setDevice] = useState(deviceType);
  
  const onSubmitForm = (formData, e) => {
    props.actions.signInUser(formData, (response) => {
      console.log('response signin', response);
      if(response && (response.token && response.token !== '')){
        props.history.push('/dashboard')
      }
    });
    e.target.reset(); // reset after form submit
    
  }
  const handleLoginOption = () => {
    setEmailStatus(!emailActive);
  }

  const updateDimensions = () => {
   setDevice(deviceType())
  }
  useEffect(() => {
    console.log('LOGIN PROPS', props);
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (props.auth && props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }

      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
  },[props]); 

  const columnSize = device === 'desktop' ? 12 : 12;
  const defaultUserName = props.auth && props.auth.user_name ? props.auth.user_name : '';
  return (
    <MainContainer>
      <FluidRow>
        <div className="col-12 text-center mb-5">
          <h4><b>Sign in</b></h4>
          {/*<p className="grey-text text-darken-1 ">
            Don't have an account? <Link to="/register">Register</Link>
          </p>*/}
        </div>
        
        <div className={`col-${columnSize}`}>
          <div style={{height: '4px', backgroundColor: '#000', marginBottom: '15px', marginTop: '8px', width: '100%'}}></div>
          <form noValidate onSubmit={handleSubmit(onSubmitForm)}>
            {!emailActive && <div>
              <label htmlFor="user_name" className="sr-only">Username</label>
              <div className="input-group m-0">
                <input
                  defaultValue={defaultUserName}
                  style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}
                  className="form-control"
                  id="user_name"
                  placeholder="Username" 
                  aria-label="Username"
                  name="user_name"
                  type="text"
                  ref={register({
                    required: {
                      value: true,
                      message: "User name is required",
                    },
                    minLength: {
                      value: 2,
                      message: "User name should be minimum length of 5",
                    },
                  })}
                />
              
              </div>
              <span className="alert-warning text-left small">
                {errors.user_name ?  errors.user_name.message : ''}
              </span>
            </div>}
              
            {emailActive && <div><div className="input-group m-0">
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}
                className="form-control"
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                ref={register({
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'invalid email address'
                  }
                })}
              />
            </div>
            <span className="alert-warning text-left small">
            {errors.email ? errors.email.message : ''}
            </span></div>}
            
            <div className="input-group m-0">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
              style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0}}
                className="form-control"
                name="password" 
                id="password"
                type="password"
                placeholder="Password"
                ref={register({
                  validate: value => value !== 'test123' || 'Too common password, you can do better!',
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 5,
                    message: "user name should be minimum length of 5",
                  },
                })}
              />  
              
            </div>
            <span className="alert-warning text-left small">
              {errors.password ? errors.password.message : ''}
            </span>

            
            <div className="form-check my-2">
              <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onClick={() => handleLoginOption()}/>
              <label className="form-check-label" htmlFor="defaultCheck1">
                {emailActive ? 'Log in with Username' : 'Log in with Email'}
              </label>
            </div>
            <div className="row align-items-center my-4">
                <div className="col-sm-12">
                  <button
                  style={{
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                  }}
                  type="submit"
                  className="btn btn-lg btn-primary btn-block"
                >
                  Login
                </button>
                </div>
                <div className="col-sm-12">
                  <div className="small text-center mt-4">
                    <Link to="/register">Forgot password?</Link>
                  </div>
                </div>
            </div>
          </form>
        </div>
      </FluidRow>
      
  </MainContainer>
    
  );
}