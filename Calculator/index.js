$(document).ready(function() {
  var value = "";
  var display = "";
  var result = 0;
  var memory = 0;
  var operator = "+";
  $("button").click(function() {
    value = $(this).attr("value");
    if ("1234567890".includes(value)) {
      display += value;
    } else if (value === ".") {
      if (!display.includes(value)) {
        display += value;
      }
    } else if (value === "ac") {
      display = "";
      result = 0;
    } else if (value === "c") {
      display = display.slice(0, -1);
      if (display.length == 0) {
        display = "";
      }
    } else if ("+-/*".includes(value)) {
      // Operator
      var number = parseFloat(display);
      memory = evaluate(operator, number, memory);
      display = "";
      operator = value;
    } else {      
      var number = parseFloat(display);
      console.log(operator, display, memory, number);
      // Rovna se
      display = evaluate(operator, number, memory);
      memory = 0;
    }
    
    console.log(memory, operator, display);
    $("#answer").html(display);
  });
});

function evaluate(operator, number, memory) {
  if (operator === "+") {
    return add(number, memory);
  } else if (operator === "-") {
    return subtract(number, memory);
  } else if (operator === "/") {
    return divide(number, memory);
  } else if (operator === "*") {
    return multiply(number, memory);
  }
}

function add(num, res) {
 return num + res;
}

function subtract(num, res) {
  if (res === 0) {
    return num;
  }
  return res - num;
}

function divide(num, res) {
  if (res === 0) {
    return num;
  }
  if (num === 0) {
    return "Don't divide by zero!!";
  }
  return res / num;
}

function multiply(num, res) {
  if (res === 0) {
    return num;
  }
  return num * res;
}