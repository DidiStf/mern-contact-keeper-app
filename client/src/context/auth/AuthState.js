import React, { useReducer } from 'react';

import { loadUser, loginUser, registerUser } from '../../api/auth';

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
      const response = await loadUser();
      dispatch({
        type: USER_LOADED,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  // Register User
  const registerUserAction = async (userData) => {
    try {
      const response = await registerUser(userData);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
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
    try {
      const response = await loginUser(userData);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
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
