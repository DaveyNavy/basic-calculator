function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return Number(a) * Number(b);
}

function divide(a, b) {
    return Number(a) / Number(b)
}

let firstOperand;
let operator;
let secondOperand;

function operate(num1, operator, num2) {
    switch (operator) {
        case "+":
            return add(num1,num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return "ERROR";
    }
}

let display = '';
const displayElement = document.querySelector(".calculator-display");

const operandsList = Array.from(document.querySelectorAll(".operands > div > button"));
operandsList.forEach((element) => {
    element.addEventListener("click", () => {
        display += element.textContent;
        displayElement.textContent = display;
    })
})

const operatorList = Array.from(document.querySelectorAll(".operators > button"));
operatorList.splice(4,1);
operatorList.forEach((element) => {
    element.addEventListener("click", () => {
        if (!firstOperand) {
            firstOperand = display;
            display = '';
            operator = element.textContent;
        } else {
            secondOperand = display;
            display = '';
            let result = operate(firstOperand, operator, secondOperand)
            displayElement.textContent = result;
            firstOperand = result;
            secondOperand = null;
            operator = element.textContent;
        }
    })
})

const equalElement = document.querySelector(".equal");
equalElement.addEventListener("click", () => {
    if (!operator) return;

    secondOperand = display;
    display = '';
    let result = operate(firstOperand, operator, secondOperand)
    displayElement.textContent = result;
    firstOperand = result;
    secondOperand = null;
})

const clearElement = document.querySelector(".calculator-clear");
clearElement.addEventListener("click", () => {
    display = '';
    displayElement.textContent = 0;
    firstOperand = null;
    secondOperand = null;
    operator = null;
})