const args = process.argv.slice(2);

function isNumeric(value) {
  return !isNaN(value) && isFinite(value);
}

let sum = 0;

try {
  args.forEach(arg => {
    if (!isNumeric(arg)) {
      throw new Error(`Invalid input: "${arg}" is not a number.`);
    }
    sum += parseFloat(arg);
  });
  console.log(`The sum of the numbers is: ${sum}`);
} catch (error) {
  console.error(`Error: ${error.message}`);
}