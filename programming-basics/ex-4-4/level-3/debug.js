// debug.js
const debug = require('debug');

// Create namespaces for different sections of your program
const calculateDebug = debug('compute:calculate');
const inputDebug = debug('compute:input');

// Export them for use in your modules
module.exports = { calculateDebug, inputDebug };
