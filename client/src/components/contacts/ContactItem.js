import PropTypes from 'prop-types';
import classnames from 'classnames';
import React, { useContext } from 'react';

import ContactContext from '../../context/contact/contactContext';

import { firstLetterToUpperCase } from '../../utils/textEdit';

import './ContactItem.css';

const ContactItem = ({ contact }) => {
  const {
    deleteContactAction,
    setCurrentContactAction,
    clearCurrentContactAction,
  } = useContext(ContactContext);
  const { _id, name, email, phone, type } = contact;
  const transformedType = firstLetterToUpperCase(type);

  const handleClickDelete = () => {
    deleteContactAction(_id);
    clearCurrentContactAction();
  };

  const handleClickEdit = () => {
    setCurrentContactAction(contact);
  };

  return (
    <div className='ContactItem'>
      <h3 className='ContactItem_name'>
        {name}{' '}
        <span
          className={classnames(
            'ContactItem_badge',
            type === 'professional'
              ? 'ContactItem_badge_primary'
              : 'ContactItem_badge_success'
          )}
        >
          {transformedType}
        </span>
      </h3>
      <ul className='ContactItem_contacts'>
        {email && (
          <li>
            <i className='fas fa-envelope-open' /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone' /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button className='ContactItem_edit' onClick={handleClickEdit}>
          Edit
        </button>
        <button className='ContactItem_delete' onClick={handleClickDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.poprTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
