import PropTypes from 'prop-types';
import classnames from 'classnames';
import React, { useContext } from 'react';

import ContactContext from '../../context/contact/contactContext';

import { firstLetterToUpperCase } from '../../utils/textEdit';

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
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          className={classnames(
            'badge badge-right',
            type === 'professional' ? 'badge-primary' : 'badge-success'
          )}>
          {transformedType}
        </span>
      </h3>
      <ul className='list'>
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
        <button className='btn btn-dark sm' onClick={handleClickEdit}>
          Edit
        </button>
        <button className='btn btn-danger sm' onClick={handleClickDelete}>
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
