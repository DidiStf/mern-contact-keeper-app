import React from 'react';

import NavbarLink from './NavbarLink';
import LogoutLink from './LogoutLink';

import { firstLetterToUpperCase } from '../../utils/textEdit';

const NavbarAuthLinks = ({ onClickLogout, user }) => {
  const name = user && firstLetterToUpperCase(user.name);
  const greeting = `Hello, ${name}`;

  return (
    <>
      <NavbarLink title={greeting} />
      <NavbarLink title='Home' to='/' />
      <NavbarLink title='About' to='/about' />
      <LogoutLink title='Logout' onClick={onClickLogout} />
    </>
  );
};

export default NavbarAuthLinks;
