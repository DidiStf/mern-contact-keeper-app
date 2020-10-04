import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT_CONTACT,
  CLEAR_CURRENT_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

const contactsReducer = (state, action) => {
  switch (action.type) {
    case ADD_CONTACT: {
      const contact = action.payload;
      return {
        ...state,
        contacts: [...state.contacts, contact],
      };
    }
    case DELETE_CONTACT: {
      const id = action.payload;
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== id),
      };
    }
    case UPDATE_CONTACT: {
      const contact = action.payload;
      return {
        ...state,
        contacts: state.contacts.map((c) =>
          c.id === contact.id ? contact : c
        ),
      };
    }
    case SET_CURRENT_CONTACT: {
      const contact = action.payload;
      return {
        ...state,
        current: contact,
      };
    }
    case CLEAR_CURRENT_CONTACT: {
      return {
        ...state,
        current: null,
      };
    }
    case FILTER_CONTACTS: {
      const text = action.payload;
      return {
        ...state,
        filtered: state.contacts.filter(({ name, email }) => {
          const regex = new RegExp(`${text}`, 'gi');
          return name.match(regex) || email.match(regex);
        }),
      };
    }
    case CLEAR_FILTER: {
      return {
        ...state,
        filtered: null,
      };
    }
    default:
      return state;
  }
};

export default contactsReducer;
