const args = process.argv.slice(2);

// Help text
function printHelp() {
  console.log(`
Usage: node sum.js [options] <numbers...>

Options:
  --multiply     Multiply the numbers instead of adding them.
  --help         Display this help message.
`);
}

// Check if the first argument is a flag
const isMultiply = args.includes('--multiply');
const isHelp = args.includes('--help');

function isNumeric(value) {
  return !isNaN(value) && isFinite(value);
}

// Show help if --help flag is passed
if (isHelp) {
  printHelp();
  process.exit(0);
}

// Remove flags from args to get the numbers
const numbers = args.filter(arg => arg !== '--multiply' && arg !== '--help');

if (numbers.length === 0) {
  console.error('Error: No numbers provided.');
  printHelp();
  process.exit(1);
}

let result = isMultiply ? 1 : 0;  // Start with 1 for multiplication, 0 for addition

try {
  numbers.forEach(arg => {
    if (!isNumeric(arg)) {
      throw new Error(`Invalid input: "${arg}" is not a number.`);
    }
    const num = parseFloat(arg);
    if (isMultiply) {
      result *= num;  // Multiply numbers
    } else {
      result += num;  // Add numbers
    }
  });
  console.log(`The ${isMultiply ? 'product' : 'sum'} of the numbers is: ${result}`);
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}