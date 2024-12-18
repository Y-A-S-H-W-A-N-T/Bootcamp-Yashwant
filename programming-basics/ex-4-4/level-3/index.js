// index.js
const readline = require('readline');
const logger = require('./logger');  // Winston Logger
const { calculateDebug, inputDebug } = require('./debug'); // Debugger

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to compute the sum of two numbers
const calculateSum = (num1, num2) => {
  calculateDebug(`Calculating sum of ${num1} and ${num2}`); // Debugging with debug
  const result = num1 + num2;
  logger.info(`Computed sum: ${num1} + ${num2} = ${result}`); // Log using winston
  return result;
};

// Function to prompt user for input and call calculateSum
const askForNumbers = () => {
  rl.question('Enter first number: ', (answer1) => {
    inputDebug(`User input for first number: ${answer1}`); // Debugging input
    rl.question('Enter second number: ', (answer2) => {
      inputDebug(`User input for second number: ${answer2}`); // Debugging input
      const num1 = parseFloat(answer1);
      const num2 = parseFloat(answer2);

      if (isNaN(num1) || isNaN(num2)) {
        logger.error('Invalid input: Both values must be numbers'); // Log error in case of invalid input
        console.log('Please enter valid numbers.');
        askForNumbers(); // Ask again if input is invalid
      } else {
        const sum = calculateSum(num1, num2);
        console.log(`The sum is: ${sum}`);
        rl.close(); // Close the interface after calculation
      }
    });
  });
};

// Start the program
askForNumbers();