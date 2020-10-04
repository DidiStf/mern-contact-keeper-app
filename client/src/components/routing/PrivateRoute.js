import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  const render = (props) => {
    if (!isAuthenticated && !loading) return <Redirect to='/login' />;

    return <Component {...rest} />;
  };

  return <Route {...rest} render={render} />;
};

export default PrivateRoute;
