#!/usr/bin/env node

const { add, multiply, divide } = require('./mathutils');
const logger = require('./logger');
const args = process.argv.slice(2);

// Log the program start event
logger.info('Program started');

// Get the operation (either 'add', 'multiply', or 'divide') from the first argument
const operation = args.shift();

if (!operation || !['add', 'multiply', 'divide'].includes(operation)) {
  logger.error('Error: Please specify a valid operation ("add", "multiply", or "divide").');
  process.exit(1);
}

// Parse numbers from the remaining arguments
const numbers = args.map(arg => parseFloat(arg));

if (numbers.some(isNaN)) {
  logger.error('Error: All operands must be valid numbers.');
  process.exit(1);
}

// Perform the operation
let result;
try {
  if (operation === 'add') {
    result = add(numbers);
    logger.info('Operation successful: Addition');
  } else if (operation === 'multiply') {
    result = multiply(numbers);
    logger.info('Operation successful: Multiplication');
  } else if (operation === 'divide') {
    result = divide(numbers);
    logger.info('Operation successful: Division');
  }
  console.log(`The result of the operation is: ${result}`);
} catch (error) {
  logger.error(`Fatal error: ${error.message}`);
  console.error(error.message);
}