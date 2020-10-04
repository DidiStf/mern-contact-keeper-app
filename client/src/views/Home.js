import React, { useContext, useEffect } from 'react';

import AuthContext from '../context/auth/authContext';

import Contacts from '../components/contacts/Contacts';
import ContactFilter from '../components/contacts/ContactFilter';
import ContactForm from '../components/contacts/ContactForm';

const Home = () => {
  const { loadUserAction } = useContext(AuthContext);

  useEffect(() => {
    loadUserAction();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
