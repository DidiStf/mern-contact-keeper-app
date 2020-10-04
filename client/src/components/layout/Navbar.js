import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

import NavbarAuthLinks from './NavbarAuthLinks';
import NavbarGuestLinks from './NavbarGuestLinks';

const Navbar = ({ title, icon }) => {
  const { isAuthenticated, logoutUserAction, user } = useContext(AuthContext);
  const { clearContactsAction } = useContext(ContactContext);

  const handleLogout = () => {
    logoutUserAction();
    clearContactsAction();
  };

  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        {isAuthenticated ? (
          <NavbarAuthLinks user={user} onClickLogout={handleLogout} />
        ) : (
          <NavbarGuestLinks />
        )}
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt',
};

export default Navbar;
