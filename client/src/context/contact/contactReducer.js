import {
  ADD_CONTACT,
  CLEAR_CONTACTS,
  CLEAR_CURRENT_CONTACT,
  CLEAR_FILTER,
  CONTACT_ERROR,
  DELETE_CONTACT,
  FILTER_CONTACTS,
  GET_CONTACTS,
  SET_CURRENT_CONTACT,
  UPDATE_CONTACT,
} from '../types';

const contactsReducer = (state, action) => {
  switch (action.type) {
    case GET_CONTACTS: {
      const contacts = action.payload;
      return {
        ...state,
        contacts,
        loading: false,
      };
    }
    case ADD_CONTACT: {
      const contact = action.payload;
      return {
        ...state,
        contacts: [contact, ...state.contacts],
        loading: false,
      };
    }
    case UPDATE_CONTACT: {
      const contact = action.payload;
      return {
        ...state,
        contacts: state.contacts.map((c) =>
          c._id === contact._id ? contact : c
        ),
        loading: false,
      };
    }
    case DELETE_CONTACT: {
      const id = action.payload;
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact._id !== id),
        loading: false,
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
    case CLEAR_CONTACTS: {
      return {
        ...state,
        contacts: null,
        filtered: null,
        error: null,
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
    case CONTACT_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default contactsReducer;
