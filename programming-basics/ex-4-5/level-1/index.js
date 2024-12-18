require('dotenv').config();

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const Name = process.env.NAME;


// Start the server
app.listen(PORT, () => {
    console.log(`${Name}, from .env file`)
  console.log(`Server is running on port ${PORT}`);
});
