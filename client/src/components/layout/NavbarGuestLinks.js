import React from 'react';
import { Link } from 'react-router-dom';

const NavbarGuestLinks = ({ user }) => {
  return (
    <>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
    </>
  );
};

export default NavbarGuestLinks;
