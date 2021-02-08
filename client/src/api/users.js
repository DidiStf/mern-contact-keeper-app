import axios from 'axios';

const API_KEY = 'api/users';

const config = {
  header: {
    'Content-Type': 'application/json',
  },
};

export const registerUser = (userData) => axios.post(API_KEY, userData, config);
