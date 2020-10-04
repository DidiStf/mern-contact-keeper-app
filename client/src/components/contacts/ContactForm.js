import React, { useContext, useEffect, useState } from 'react';

import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const {
    addContactAction,
    clearCurrentContactAction,
    updateContactAction,
    current,
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
    <form onSubmit={handleSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={handleChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={handleChange}
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
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button
            className='btn btn-light btn-block'
            onClick={handleClickClear}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
