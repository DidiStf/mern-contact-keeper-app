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

const authReducer = (state, action) => {
  switch (action.type) {
    case USER_LOADED: {
      const { user } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user,
      };
    }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS: {
      const { token } = action.payload;
      localStorage.setItem('token', token);
      return {
        ...state,
        token,
        isAuthenticated: true,
        loading: true,
      };
    }
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT: {
      const error = action.payload;
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error,
      };
    }
    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
