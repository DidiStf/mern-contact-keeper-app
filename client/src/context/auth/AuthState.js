import axios from 'axios';
import React, { useReducer } from 'react';

import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  AUTH_ERROR,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from '../types';
import setAuthToken from '../../utils/setAuthToken';

const AuthState = ({ children }) => {
  const initialState = {
    error: null,
    isAuthenticated: null,
    loading: true,
    token: localStorage.getItem('token'),
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUserAction = async () => {
    const { token } = localStorage;

    if (token) {
      setAuthToken(token);
    }

    try {
      const res = await axios.get('api/auth');
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  // Register User
  const registerUserAction = async (userData) => {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/users', userData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      loadUserAction();
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // Login User
  const loginUserAction = async (userData) => {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/auth', userData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      loadUserAction();
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // Logout
  const logoutUserAction = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  // Clear Errors
  const clearErrorsAction = () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        token: state.token,
        user: state.user,
        clearErrorsAction,
        loadUserAction,
        loginUserAction,
        logoutUserAction,
        registerUserAction,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
