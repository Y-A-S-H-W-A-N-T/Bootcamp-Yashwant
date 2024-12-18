// mathutils.js

function add(numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
  }
  
  function multiply(numbers) {
    return numbers.reduce((acc, num) => acc * num, 1);
  }
  
  function divide(numbers) {
    if (numbers.includes(0)) {
      throw new Error('Division by zero is not allowed.');
    }
    return numbers.reduce((acc, num) => acc / num);
  }
  
  module.exports = { add, multiply, divide };
  