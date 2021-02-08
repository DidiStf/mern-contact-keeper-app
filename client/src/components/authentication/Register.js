import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

import './Register.css';

const Register = () => {
  const history = useHistory();
  const { setAlertAction } = useContext(AlertContext);
  const {
    clearErrorsAction,
    error,
    isAuthenticated,
    registerUserAction,
  } = useContext(AuthContext);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = user;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlertAction('Please enter all fields.', 'danger');
    } else if (password !== confirmPassword) {
      setAlertAction("Passwords don't match", 'danger');
    } else {
      registerUserAction({
        name,
        email,
        password,
      });
    }
  };

  useEffect(() => {
    if (error === 'User already exists') {
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
    <div className='Register'>
      <h1 className='Register_heading'>
        Account <span>Register</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='Register_form_group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='Register_form_group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='Register_form_group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={handleChange}
            required
            minLength='6'
            autoComplete='off'
          />
        </div>
        <div className='Register_form_group'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            autoComplete='new-password'
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleChange}
            required
            minLength='6'
          />
        </div>
        <input type='submit' value='Register' className='Register_button' />
      </form>
    </div>
  );
};

export default Register;
