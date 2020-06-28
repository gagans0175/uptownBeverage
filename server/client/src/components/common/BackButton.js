import React from 'react';
import { Link } from "react-router-dom";

const BackButton = props =>{
  return (
    <Link to="/" className="navlinks" >
      <span aria-hidden="true">Home</span>
    </Link>
  )
}

export default BackButton;