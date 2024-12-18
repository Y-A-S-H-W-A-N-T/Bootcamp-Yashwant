require('dotenv').config();

function getEnvVar(name, fallback) {
  const value = process.env[name] || fallback;
  if (!process.env[name]) {
    console.warn(`Warning: Missing environment variable: ${name}. Using fallback: ${value}`);
  }
  return value;
}

const express = require('express');

const app = express();

const PORT = getEnvVar('PORT', 3000);
const Name = getEnvVar('NAME', "DAVULURI YASHWANT RAO")


app.listen(PORT, () => {
  console.log(`${Name}, from .env file`)
  console.log(`Server is running on port ${PORT}`);
});