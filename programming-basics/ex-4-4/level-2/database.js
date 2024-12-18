// database.js
const debug = require('debug');
const log = debug('myApp:database');

// Simulate database connection
exports.connect = (req, res) => {
  log('Connecting to the database...');
  // Simulate successful connection
  log('Database connected');
  res.send('Database operation successful');
};
