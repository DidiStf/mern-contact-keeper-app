const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');

const connectDB = require('./config/db');

const auth = require('./routes/auth');
const contacts = require('./routes/contacts');
const users = require('./routes/users');

dotenv.config({ path: './config/config.env' });

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();

// Connect to Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'Welcome to the Contact Keeper' }));

// Define Routes
app.use('/api/auth', auth);
app.use('/api/contacts', contacts);
app.use('/api/users', users);

app.listen(PORT, () =>
  console.log(`Server running in ${ENV} mode on port ${PORT}`.cyan.bold)
);
