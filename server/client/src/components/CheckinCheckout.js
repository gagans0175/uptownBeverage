import React from 'react'

export default class CheckinCheckout extends React.Component {
  render(){
    return (
      <form className="form" autoComplete="off">
        <div className="form-group">
            <input type="text" id="fullName" placeholder="Your name" autoComplete="false" />
            <label for="fullName">Name</label>
        </div>

        <div className="form-group">
            <input type="email" id="email" placeholder="Your email" />
            <label for="email">User name</label>
        </div>

        <div className="form-group">
            <input type="phone" id="phone" placeholder="Your Phone" />
            <label for="phone">Phone Number</label>
        </div>

        <div className="spacer10"></div>

        <div className="center-btn-wrapper">
            <button type="submit" className="btn">Send</button>
        </div>
    </form>
    );
  }
}