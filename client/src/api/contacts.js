import axios from 'axios';

const API_KEY = '/api/contacts';

const config = {
  header: {
    'Content-Type': 'application/json',
  },
};

export const getContacts = () => axios.get(API_KEY);

export const addContact = (contact) => axios.post(API_KEY, contact, config);

export const updateContact = (contact) =>
  axios.put(`${API_KEY}/${contact._id}`, contact, config);

export const deleteContact = (id) => axios.delete(`${API_KEY}/${id}`);
