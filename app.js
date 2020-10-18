const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const colors = require('colors');
const morgan = require('morgan');

const { connectDB } = require('./config/db');

const auth = require('./routes/auth');
const contacts = require('./routes/contacts');
const users = require('./routes/users');

dotenv.config({ path: './config/config.env' });

const ENV = process.env.NODE_ENV;

const app = express();

// Connect to Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/auth', auth);
app.use('/api/contacts', contacts);
app.use('/api/users', users);

// Serve static assets in production
if (ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

module.exports = app;
