// calculator class to have the functions and initailising a calculator object on each calculation
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }
  // Method to clear the output display
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  //getting number from the user
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  // to check if the numbers are valid for calcualtion or not
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  // main function to get the output of the opeation
  compute() {
    let res;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        res = prev + current;
        break;
      case "-":
        res = prev - current;
        break;
      case "*":
        res = prev * current;
        break;
      case "÷":
        res = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = res;
    this.operation = "";
    this.previousOperand = "";
  }

  //function to display the result on output special case when the result is in decimals
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return integerDisplay + "." + decimalDigits;
    } else {
      return integerDisplay;
    }
  }
  // function to update the display whenever the user has entered the value
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        this.getDisplayNumber(this.previousOperand) + " " + this.operation;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}
// taking input from the user using query-slector
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

// making object of calculator
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// displaying the number entered by the user
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
// displaying operator given by the user
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

// here we will call the compute function to do the calculatio when eqauals button is clicked
equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

//function to reset the display to none
allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});
