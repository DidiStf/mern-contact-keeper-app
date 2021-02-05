import React, { useContext, useEffect, useState } from 'react';

import ContactContext from '../../context/contact/contactContext';

import './ContactForm.css';

const ContactForm = () => {
  const {
    addContactAction,
    clearCurrentContactAction,
    current,
    updateContactAction,
  } = useContext(ContactContext);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });
  const { name, email, phone, type } = contact;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact({ ...contact, [name]: value });
  };

  const handleClickClear = () => {
    clearCurrentContactAction();
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (current) {
      updateContactAction(contact);
    } else {
      addContactAction(contact);
    }
    handleClickClear();
  };

  useEffect(() => {
    if (current) setContact(current);
    else
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
  }, [current]);

  return (
    <form className='ContactForm' onSubmit={handleSubmit}>
      <h2 className='ContactForm_title'>
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={handleChange}
        required
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={handleChange}
        required
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={handleChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={handleChange}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={handleChange}
      />{' '}
      Professional{' '}
      <div>
        <input
          type='submit'
          value={current ? 'Update Contact' : 'Add Contact'}
          className='ContactForm_submit'
        />
      </div>
      {current && (
        <div>
          <button
            className='ContactForm_clear btn btn-light btn-block'
            onClick={handleClickClear}
          >
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
