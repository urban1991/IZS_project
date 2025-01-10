const display = document.getElementById('display');
const darkBtn = document.getElementById('darkBtn');
const lightBtn = document.getElementById('lightBtn');
const simpleCalcLightThemeBtn = document.getElementById('simpleCalcThemeLightBtn');
const simpleCalcDarkThemeBtn = document.getElementById('simpleCalcThemeDarkBtn');


let firstValue = null;
let operator = null;
let shouldResetDisplay = false;

function clearCalculator() {
    display.innerText = '0';
    firstValue = null;
    operator = null;
    shouldResetDisplay = false;
}

function appendNumber(num) {
    if (display.innerText === '0' || shouldResetDisplay) {
        display.innerText = num;
        shouldResetDisplay = false;
    } else {
        display.innerText += num;
    }
}

function chooseOperator(newOperator) {
    if (operator !== null) {

        evaluate();
    }
    firstValue = display.innerText;
    operator = newOperator;
    shouldResetDisplay = true;
}

function evaluate() {
    if (operator === null || shouldResetDisplay) return;
    const secondValue = display.innerText;
    let result = 0;

    const a = parseFloat(firstValue);
    const b = parseFloat(secondValue);

    switch (operator) {
        case 'add':
            result = a + b;
            break;
        case 'subtract':
            result = a - b;
            break;
        case 'multiply':
            result = a * b;
            break;
        case 'divide':
            if (b === 0) {
                alert("Cant divide by 0");
                result = a;
            } else {
                result = a / b;
            }
            break;
        default:
            return;
    }

    display.innerText = result.toString();
    firstValue = result;
    operator = null;
    shouldResetDisplay = true;
}

function changeSign() {
    if (display.innerText === '0') return;
    display.innerText = display.innerText.startsWith('-')
        ? display.innerText.slice(1)
        : '-' + display.innerText;
}

function percent() {
    display.innerText = String(parseFloat(display.innerText) / 100);
}

function addDecimal() {
    if (!display.innerText.includes('.')) {
        display.innerText += '.';
    }
}

document.querySelector('.buttons').addEventListener('click', (e) => {
    const target = e.target;
    if (!target.classList.contains('btn')) return;

    if (target.classList.contains('number')) {
        const value = target.dataset.value;
        if (value) {
            appendNumber(value);
        } else if (target.dataset.action === 'decimal') {
            addDecimal();
        }
    } else if (target.classList.contains('function')) {
        const action = target.dataset.action;
        if (action === 'clear') {
            clearCalculator();
        } else if (action === 'sign') {
            changeSign();
        } else if (action === 'percent') {
            percent();
        }
    } else if (target.classList.contains('operator')) {
        const action = target.dataset.action;
        if (action === 'equals') {
            evaluate();
        } else {
            chooseOperator(action);
        }
    }
});


darkBtn.addEventListener('click', () => {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
});

lightBtn.addEventListener('click', () => {
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
});

simpleCalcLightThemeBtn.addEventListener('click', () => {
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
});

simpleCalcDarkThemeBtn.addEventListener('click', () => {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
});

