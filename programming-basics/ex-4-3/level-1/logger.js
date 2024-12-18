// logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Set default log level to 'info'
  transports: [
    // Console log output
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    // File log output
    new winston.transports.File({ filename: 'app.log' }),
  ],
});

module.exports = logger;