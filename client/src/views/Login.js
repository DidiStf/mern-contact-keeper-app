import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth/authContext';

const Login = () => {
  const history = useHistory();
  const { setAlertAction } = useContext(AlertContext);
  const {
    clearErrorsAction,
    error,
    isAuthenticated,
    loginUserAction,
  } = useContext(AuthContext);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === '' || password === '') {
      setAlertAction('Please fill in all fields.', 'danger');
    } else {
      loginUserAction({ email, password });
    }
  };

  useEffect(() => {
    if (error === 'Invalid credentials') {
      setAlertAction(error, 'danger');
      clearErrorsAction();
    }
    // eslint-disable-next-line
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [history, isAuthenticated]);

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={handleChange}
            required
            autoComplete='off'
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;
