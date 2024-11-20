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
        let currentDisplay = displayElement.textContent;
        if (currentDisplay == '0' && element.textContent == 0) return;
        if (beginNewDisplay || currentDisplay == 'ERROR') {
            currentDisplay = '';
            beginNewDisplay = false;
        }
        displayElement.textContent = (currentDisplay + element.textContent).slice(0,8);
    })
})

const operatorList = Array.from(document.querySelectorAll(".operators > button"));
operatorList.splice(4,1);
operatorList.forEach((element) => {
    element.addEventListener("click", () => {
        if (displayElement.textContent == "ERROR") return;
        if (!firstOperand) {
            firstOperand = displayElement.textContent;
        } 
        else {
            secondOperand = displayElement.textContent;
            let result = operate(firstOperand, operator, secondOperand);
            displayElement.textContent = result;

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

    secondOperand = displayElement.textContent;
    let result = operate(firstOperand, operator, secondOperand)
    displayElement.textContent = result;

    resetAll();
})

const clearElement = document.querySelector(".calculator-clear");
clearElement.addEventListener("click", () => {
    resetAll();
    displayElement.textContent = '0';
})

const signElement = document.querySelector(".calculator-sign");
signElement.addEventListener("click", () => {
    if (displayElement.textContent == '0' || displayElement.textContent == 'ERROR') return;
    displayElement.textContent = -displayElement.textContent;
})

const percentElement = document.querySelector(".calculator-percent");
percentElement.addEventListener("click", () => {
    if (displayElement.textContent == "ERROR") return;
    displayElement.textContent = divide(displayElement.textContent, 100);
})