import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

import './Login.css';

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
    <div className='Login'>
      <h1 className='Login_heading'>
        Account <span>Login</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='Login_form_group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className=' Login_form_group'>
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
        <input type='submit' value='Login' className='Login_button' />
      </form>
    </div>
  );
};

export default Login;
