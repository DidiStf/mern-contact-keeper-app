import axios from 'axios';
import React, { useReducer } from 'react';

import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  CLEAR_CONTACTS,
  CLEAR_CURRENT_CONTACT,
  CLEAR_FILTER,
  CONTACT_ERROR,
  DELETE_CONTACT,
  GET_CONTACTS,
  FILTER_CONTACTS,
  SET_CURRENT_CONTACT,
  UPDATE_CONTACT,
} from '../types';

const API_KEY = '/api/contacts';

const ContactState = ({ children }) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Get Contacts
  const getContactsAction = async () => {
    try {
      const res = await axios.get(API_KEY);
      dispatch({
        type: GET_CONTACTS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.message,
      });
    }
  };

  // Add Contact
  const addContactAction = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(API_KEY, contact, config);
      dispatch({
        type: ADD_CONTACT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.message,
      });
    }
  };

  // Update Contact
  const updateContactAction = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`${API_KEY}/${contact._id}`, contact, config);
      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.message,
      });
    }
  };

  // Delete Contact
  const deleteContactAction = async (id) => {
    try {
      await axios.delete(`${API_KEY}/${id}`);
      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.message,
      });
    }
  };

  // Set Current Contact
  const setCurrentContactAction = (contact) => {
    dispatch({
      type: SET_CURRENT_CONTACT,
      payload: contact,
    });
  };

  // Clear Current Contact
  const clearCurrentContactAction = () => {
    dispatch({
      type: CLEAR_CURRENT_CONTACT,
    });
  };

  // Clear Contacts
  const clearContactsAction = () => {
    dispatch({
      type: CLEAR_CONTACTS,
    });
  };

  // Filter Contacts
  const filterContactsAction = (text) => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text,
    });
  };

  // Clear Filter
  const clearFilterAction = () => {
    dispatch({
      type: CLEAR_FILTER,
    });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContactAction,
        clearContactsAction,
        clearCurrentContactAction,
        clearFilterAction,
        deleteContactAction,
        filterContactsAction,
        getContactsAction,
        updateContactAction,
        setCurrentContactAction,
      }}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactState;
