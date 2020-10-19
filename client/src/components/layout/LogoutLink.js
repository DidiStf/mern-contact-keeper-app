import PropTypes from 'prop-types';
import React from 'react';

const LogoutLink = ({ onClick, title }) => {
  return (
    <li>
      <a onClick={onClick} href='#!'>
        <i className='fas fa-sign-out-alt' />
        <span className='hide-sm'> {title}</span>
      </a>
    </li>
  );
};

LogoutLink.propTypes = {
  onCick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default LogoutLink;
