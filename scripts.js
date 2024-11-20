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
    return Number(a) / Number(b);
}

let firstOperand;
let operator;
let secondOperand;

function operate(num1, operator, num2) {
    let ret;
    switch (operator) {
        case "+":
            ret = add(num1,num2);
            break;
        case "-":
            ret =  subtract(num1, num2);
            break;
        case "*":
            ret = multiply(num1, num2);
            break;
        case "/":
            if (num2 == 0) {
                return "ERROR";
            }
            else ret = divide(num1, num2);
            break;
        default:
            return "ERROR";
    }
    if (!String(ret).includes('.') && String(ret).length > 8) return "ERROR";
    return String(ret).slice(0, 8);
}

const displayElement = document.querySelector(".calculator-display");
beginNewDisplay = true;

function resetAll() {
    firstOperand = null;
    secondOperand = null;
    operator = null;

    beginNewDisplay = true;
}

const operandsList = Array.from(document.querySelectorAll(".operands > div > button"));
operandsList.forEach((element) => {
    element.addEventListener("click", () => {
        let currentDisplay = displayElement.value;
        if (currentDisplay == '0' && element.textContent == 0) return;
        if (currentDisplay.includes('.') && element.textContent == '.') return;
        if (beginNewDisplay || currentDisplay == 'ERROR') {
            currentDisplay = '';
            beginNewDisplay = false;
        }
        displayElement.value = (currentDisplay + element.textContent).slice(0,8);
    })
})

const operatorList = Array.from(document.querySelectorAll(".operators > button"));
operatorList.splice(4,1);
operatorList.forEach((element) => {
    element.addEventListener("click", () => {
        if (displayElement.value == "ERROR") return;
        if (!firstOperand) {
            firstOperand = displayElement.value;
        } 
        else {
            secondOperand = displayElement.value;
            let result = operate(firstOperand, operator, secondOperand);
            displayElement.value = result;

            firstOperand = result;
            secondOperand = null;
        }
        operator = element.textContent;
        beginNewDisplay = true;
    })
})

const equalElement = document.querySelector(".equal");
equalElement.addEventListener("click", () => {
    if (!operator) return;

    secondOperand = displayElement.value;
    let result = operate(firstOperand, operator, secondOperand)
    displayElement.value = result;

    resetAll();
})

const clearElement = document.querySelector(".calculator-clear");
clearElement.addEventListener("click", () => {
    resetAll();
    displayElement.value = '0';
})

const signElement = document.querySelector(".calculator-sign");
signElement.addEventListener("click", () => {
    if (displayElement.value == '0' || displayElement.value == 'ERROR') return;
    displayElement.value = -displayElement.value;
})

const percentElement = document.querySelector(".calculator-percent");
percentElement.addEventListener("click", () => {
    if (displayElement.value == "ERROR") return;
    displayElement.value = divide(displayElement.value, 100);
})