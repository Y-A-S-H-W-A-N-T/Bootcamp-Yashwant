require('dotenv').config();
function getEnvVar(name, fallback) {
  const value = process.env[name] || fallback;
  if (!process.env[name]) {
    console.warn(`Warning: Missing environment variable: ${name}. Using fallback: ${value}`);
  }
  return value;
}

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = getEnvVar('PORT', 3000);
const Name = getEnvVar('NAME', "DAVULURI YASHWANT RAO")
const DB_URL = getEnvVar('MONGOOSE_URL','')


// Set up MongoDB connection
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Database connection error:', err));


app.listen(PORT, () => {
  console.log(`${Name}, from .env file`)
  console.log(`Server is running on port ${PORT}`);
});