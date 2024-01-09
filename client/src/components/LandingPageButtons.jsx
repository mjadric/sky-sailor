import React from 'react';
import { Link } from 'react-router-dom';

const LandingPageButtons = () => {
  return (
    <div>
      <Link to="/login">
        <button className="btn btn-primary mr-2">Login</button>
      </Link>
      <Link to="/registration">
        <button className="btn btn-success">Register</button>
      </Link>
    </div>
  );
};

export default LandingPageButtons;
