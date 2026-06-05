let firstNumber = "";
let operator = null;
let secondNumber = "";
const display = document.getElementById("result");
let currentInput = "first";
let justCalculated = false;


document.querySelectorAll(".btn-number").forEach(button => {
  button.addEventListener("click", () => {
    handleNumber(button.dataset.value);
  })
})

document.querySelectorAll(".btn-operator").forEach(button => {
  button.addEventListener("click", () => {
    handleOperator(button.dataset.value);
  })
})

document.querySelectorAll(".btn-special").forEach(button => {
  button.addEventListener("click", () => {
    if (button.dataset.value == "C") {
      handleClear(); 
    } else if (button.dataset.value == "=") {
      handleEquals();
    }
  })
})

function handleNumber(value) {
  if (justCalculated && currentInput == "first") {
    firstNumber = "";
    secondNumber = "";
    currentInput = "first";
    justCalculated = false;
  }

  if (currentInput == "first") {
    if (value === "." && firstNumber.includes(".")) return; // Prevent multiple decimals
    firstNumber += value;
  } else if (currentInput == "second") {
    if (value === "." && secondNumber.includes(".")) return; // Prevent multiple decimals
    secondNumber += value;
  }
  updateDisplay();
}

function handleOperator(value) {
  if (firstNumber === "") return; // Prevent operator input before first number
  operator = value;
  currentInput = "second";
  updateDisplay();
}

function handleClear() { // Reset all state and display
  firstNumber = "";
  operator = null;  
  secondNumber = "";
  currentInput = "first";
  display.textContent = "0";
}

function handleEquals() {
  const num1 = parseFloat(firstNumber);
  const num2 = parseFloat(secondNumber);

  if(isNaN(num2)) return; // No second number, do nothing

  let result = null;

  
  switch(operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      if (num2 === 0) {
        handleClear();
        display.textContent = "Error";
        return;
      }
      result = num1 / num2;
      break;
  }

  display.textContent = result;
  firstNumber = result.toString();
  justCalculated = true;
  operator = null;
  secondNumber = "";
  currentInput = "first";
}

function updateDisplay() {
  if (currentInput == "first") {
    display.textContent = firstNumber || "0";
  } else {
    display.textContent = firstNumber + " " + operator + " " + secondNumber;
  }
}

  
