import React, { useContext, useEffect } from 'react';

import AuthContext from '../context/auth/authContext';

import Contacts from '../components/contacts/Contacts';
import ContactFilter from '../components/contacts/ContactFilter';
import ContactForm from '../components/contacts/ContactForm';

import './Home.css';

const HomeView = () => {
  const { loadUserAction } = useContext(AuthContext);

  useEffect(() => {
    loadUserAction();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='HomeView'>
      <div className='HomeView_left'>
        <ContactForm />
      </div>
      <div className='HomeView_right'>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default HomeView;
