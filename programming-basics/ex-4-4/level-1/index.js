const express = require('express');
const debug = require('debug');
const log = debug('myApp:server');

const app = express();


app.get('/', (req, res) => {
  log('Home route accessed');
  res.send('Hello, World!');
});

const port = 3000;
app.listen(port, () => {
  log(`Server running on port ${port}`);
});