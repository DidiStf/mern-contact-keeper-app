import axios from 'axios';

const API_KEY = 'api/auth';

const config = {
  header: {
    'Content-Type': 'application/json',
  },
};

export const loadUser = () => axios.get(API_KEY);

export const loginUser = (userData) => axios.post(API_KEY, userData, config);
