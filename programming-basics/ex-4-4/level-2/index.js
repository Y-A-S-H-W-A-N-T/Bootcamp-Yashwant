// server.js
const express = require('express');
const debug = require('debug');
const database = require('./database');
const auth = require('./auth');

const log = debug('myApp:server');
const app = express();

// Server route to log requests
app.get('/', (req, res) => {
  log('Received a request for the home page');
  res.send('Welcome to the Home Page');
});

// Route for database operations
app.get('/database', database.connect);

// Route for authentication
app.get('/auth', auth.authenticate);

// Start the server
const port = 3000;
app.listen(port, () => {
  log(`Server running on port ${port}`);
});
