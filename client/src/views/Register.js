import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth/authContext';

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
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [history, isAuthenticated]);

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={handleChange}
            required
          />
        </div>
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
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleChange}
            required
            minLength='6'
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
