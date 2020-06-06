const allButtonsNumbers = document.querySelectorAll('.buttons-numbers');
const allButtonsOperators = document.querySelectorAll('.buttons-operators');
const buttonC = document.querySelector('#button-c');
const buttonEqual = document.querySelector('#button-equal');
const buttonPoint = document.querySelector('#button-point');

const displayText = document.querySelector('#display-text');
let displayContent = '';
displayText.textContent = displayContent;

let num1 = '';
let num2 = '';
let decimalNum1 = '';
let decimalNum2 = '';
let operator = null;
let expressionResult = null;
Infinity = 0;

allButtonsNumbers.forEach((element) => {
    element.addEventListener('click', displayInputNumber)
})
function displayInputNumber() {
    if (displayText.textContent.length < 24) {
        if (operator == null) {
            if (decimalNum1.indexOf('.') == -1) {
                displayText.textContent += this.textContent;
                num1 += this.textContent;
                isLongDisplay();
            } else if (decimalNum1.indexOf('.') !== -1 && decimalNum1.length < 2) {
                decimalNum1 += this.textContent;
                displayText.textContent += this.textContent;
                num1 += this.textContent;
                isLongDisplay();
            }
        } else {
            if (decimalNum2.indexOf('.') == -1) {
                displayText.textContent += this.textContent;
                num2 += this.textContent;
                isLongDisplay();
            } else if (decimalNum2.indexOf('.') !== -1 && decimalNum2.length < 2) {
                decimalNum2 += this.textContent;
                displayText.textContent += this.textContent;
                num2 += this.textContent;
                isLongDisplay();
            }
        }
    }
}

function isLongDisplay() {
    if (displayText.textContent.length >= 12) {
        displayText.style.cssText = 'font-size: 27px; margin: 44px 0';
        // isprav' skachok texta v css
    }
}

allButtonsOperators.forEach((element) => {
    element.addEventListener('click', displayInputOperator);
});
function displayInputOperator() {
    if (operator == null) {
        displayText.textContent += this.textContent;
        operator = this.textContent;
    } else if (num2 !== '') {
        displayText.textContent += this.textContent;
        operate(operator, num1, num2);
        isLongDecimal(expressionResult);
        operator = this.textContent;
        displayText.textContent = expressionResult + operator;
        num1 = expressionResult;
        num2 = '';
    }
}

buttonEqual.addEventListener('click', displayInputResult);
function displayInputResult() {
    if (operator !== null && num2 !== '') {
        operate(operator, num1, num2);
        isLongDecimal(expressionResult);
        displayText.textContent = expressionResult;
        num1 = expressionResult;
        num2 = '';
        decimalNum2 = '';
        operator = null;
        if (displayText.textContent.length <= 12) {
            displayText.style.cssText = 'font-size: 52px; margin: 27px 0';
        }
    }
}

buttonC.addEventListener('click', resetInput);
function resetInput() {
    displayText.textContent = '';
    num1 = '';
    num2 = '';
    decimalNum1 = '';
    decimalNum2 = '';
    operator = null;
    expressionResult = null;
    displayText.style.cssText = 'font-size: 52px; margin: 27px 0';
}

buttonPoint.addEventListener('click', addDecimal);
function addDecimal() {
    if (num1 !== '' && displayText.textContent.indexOf('.') == -1 && operator == null) {
        displayText.textContent += this.textContent;
        num1 += this.textContent;
        decimalNum1 += this.textContent;
    } else if (num2 !== '' && num2.indexOf('.') == -1) {
        displayText.textContent += this.textContent;
        num2 += this.textContent;
        decimalNum2 += this.textContent;
    }
}

function isLongDecimal(number) {
    if (number % 1 !== 0) {
        expressionResult = Math.round(number * 100) / 100
    }
}

// Math functions

function add(num1, num2) {
    return num1 + num2;
}
function substract(num1, num2) {
    return num1 - num2;
}
function multiply(num1, num2) {
    return num1 * num2;
}
function divide(num1, num2) {
    return num1 / num2;
}
function operate(operator, num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    if (operator == '+') {
        return expressionResult = add(num1, num2);
    } else if (operator == '-') {
        return expressionResult = substract(num1, num2)
    } else if (operator == '*') {
        return expressionResult = multiply(num1, num2)
    } else if (operator == '/') {
        return expressionResult = divide(num1, num2)
    }
}