import React, { useContext, useEffect, useRef } from 'react';

import ContactContext from '../../context/contact/contactContext';

import './ContactFilter.css';

const ContactFilter = () => {
  const filter = useRef('');
  const { clearFilterAction, filterContactsAction, filtered } = useContext(
    ContactContext
  );

  const handleChange = (event) => {
    const { value } = event.target;

    if (filter.current.value !== '') filterContactsAction(value);
    else clearFilterAction();
  };

  useEffect(() => {
    if (filtered === null) filter.current.value = '';
  }, [filtered, filter]);

  return (
    <form className='ContactFilter_form'>
      <input
        className='ContactFilter_input'
        onChange={handleChange}
        placeholder='Filter Contacts...'
        ref={filter}
        type='text'
      />
    </form>
  );
};

export default ContactFilter;
