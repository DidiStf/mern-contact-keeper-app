import React, { useContext, useEffect, useRef } from 'react';

import ContactContext from '../../context/contact/contactContext';

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
    <form>
      <input
        ref={filter}
        type='text'
        placeholder='Filter Contacts...'
        onChange={handleChange}
      />
    </form>
  );
};

export default ContactFilter;
