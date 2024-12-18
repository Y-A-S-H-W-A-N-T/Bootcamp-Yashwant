// logger.js
const winston = require('winston');

// Create a custom logger instance
const logger = winston.createLogger({
  level: 'info', // Default logging level
  transports: [
    // Console transport (for real-time logging)
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Adds color to the log output
        winston.format.simple() // Simple log output (text format)
      ),
    }),
    // File transport (for logging to file)
    new winston.transports.File({
      filename: 'logs/app.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json() // Store logs in JSON format
      ),
    }),
  ],
});

// Export logger for use in other modules
module.exports = logger;
