import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import setAuthToken from './utils/setAuthToken';

import About from './views/About';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Alerts from './components/layout/Alerts';
import Navbar from './components/layout/Navbar';
import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';
import ContactState from './context/contact/ContactState';
import PrivateRoute from './components/routing/PrivateRoute';

import './App.css';

const { token } = localStorage;

if (token) {
  setAuthToken(token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </div>
            </>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
