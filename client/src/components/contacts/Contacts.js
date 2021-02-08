import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ContactContext from '../../context/contact/contactContext';

import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

import './Contacts.css';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContactsAction, loading } = contactContext;

  useEffect(() => {
    getContactsAction();
    // eslint-disable-next-line
  }, []);

  if (contacts?.length === 0) {
    return <h4 className='Contacts_alt'>Please add some contacts.</h4>;
  }

  return contacts !== null && !loading ? (
    <TransitionGroup className='Contacts'>
      {filtered
        ? filtered.map((filteredContact) => (
            <CSSTransition
              key={filteredContact._id}
              timeout={500}
              classNames='item'
            >
              <ContactItem contact={filteredContact} />
            </CSSTransition>
          ))
        : contacts.map((contact) => (
            <CSSTransition key={contact._id} timeout={500} classNames='item'>
              <ContactItem contact={contact} />
            </CSSTransition>
          ))}
    </TransitionGroup>
  ) : (
    <Spinner />
  );
};

export default Contacts;
