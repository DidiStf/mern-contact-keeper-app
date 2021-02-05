import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import setAuthToken from './utils/setAuthToken';

import AboutView from './views/About';
import HomeView from './views/Home';
import LoginView from './views/Login';
import RegisterView from './views/Register';
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
            <div className='App'>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={HomeView} />
                  <Route exact path='/about' component={AboutView} />
                  <Route exact path='/register' component={RegisterView} />
                  <Route exact path='/login' component={LoginView} />
                </Switch>
              </div>
            </div>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
