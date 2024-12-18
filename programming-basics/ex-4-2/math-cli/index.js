#!/usr/bin/env node

const { add, multiply } = require('./math-utils');
const args = process.argv.slice(2);

const operation = args.shift();

if (!operation || !['add', 'multiply'].includes(operation)) {
  console.error('Error: Please specify a valid operation ("add" or "multiply").');
  process.exit(1);
}

const numbers = args.map(arg => parseFloat(arg));

if (numbers.some(isNaN)) {
  console.error('Error: All operands must be valid numbers.');
  process.exit(1);
}

let result;
if (operation === 'add') {
  result = add(numbers);
} else if (operation === 'multiply') {
  result = multiply(numbers);
}

console.log(`The result of the operation is: ${result}`);