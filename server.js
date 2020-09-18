const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');

const auth = require('./routes/auth');
const contacts = require('./routes/contacts');
const users = require('./routes/users');

dotenv.config({ path: './config/config.env' });

const app = express();

// Define Routes
app.use('/api/auth', auth);
app.use('/api/contacts', contacts);
app.use('/api/users', users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.bold
  )
);
