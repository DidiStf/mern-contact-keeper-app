import PropTypes from 'prop-types';
import React from 'react';

import './LogoutLink.css';

const LogoutLink = ({ onClick, title }) => {
  return (
    <li className='LogoutLink'>
      <a onClick={onClick} href='#!'>
        <i className='fas fa-sign-out-alt' />
        <span className='LogoutLink_logout'> {title}</span>
      </a>
    </li>
  );
};

LogoutLink.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default LogoutLink;
