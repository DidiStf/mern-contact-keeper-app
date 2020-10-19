import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLink = ({ to, title }) => {
  return (
    <li>
      <Link to={to}>{title}</Link>
    </li>
  );
};

NavbarLink.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
};

NavbarLink.defaultProps = {
  to: '',
};

export default NavbarLink;
