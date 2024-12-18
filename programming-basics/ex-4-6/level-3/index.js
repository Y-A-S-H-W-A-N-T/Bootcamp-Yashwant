// index.js
const config = require('config');
const logger = require('./logger');

// Load functions dynamically based on config
const sinPath = config.get('functions.sin');
const cosPath = config.get('functions.cos');

const sin = require(sinPath);
const cos = require(cosPath);

// Log the function usage
logger.log('info', `Sin of 0: ${sin(0)}`);
logger.log('info', `Cos of 0: ${cos(0)}`);

console.log(`Running ${config.get('app.name')} on port ${config.get('app.port')}...`);