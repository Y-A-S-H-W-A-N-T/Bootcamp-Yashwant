const config = require('config');

function log(level, message) {
  const logLevel = config.get('logging.level'); // Get the log level from config
  const levels = ['debug', 'info', 'warn', 'error'];

  if (levels.indexOf(level) >= levels.indexOf(logLevel)) {
    console[level](message);
  }
}

module.exports = { log };
