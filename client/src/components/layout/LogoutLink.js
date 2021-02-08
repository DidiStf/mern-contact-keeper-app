import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import './LogoutLink.css';

const LogoutLink = ({ onClick, title }) => {
  return (
    <li className='LogoutLink'>
      <Link onClick={onClick} to='/'>
        <i className='fas fa-sign-out-alt' />
        <span className='LogoutLink_logout'> {title}</span>
      </Link>
    </li>
  );
};

LogoutLink.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default LogoutLink;
