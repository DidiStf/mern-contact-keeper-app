import React from 'react';

import NavbarLink from './NavbarLink';

const NavbarGuestLinks = () => {
  return (
    <>
      <NavbarLink title='Register' to='/register' />
      <NavbarLink title='Login' to='/login' />
      <NavbarLink title='About' to='/about' />
    </>
  );
};

export default NavbarGuestLinks;
