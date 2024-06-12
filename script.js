const screen = document.getElementById("screen");
const buttons = document.getElementsByClassName("buttons");
let errorOccurred = false;
let operatorClicked = false;
const equals = document.getElementById("equals");
const clear = document.getElementById("clr");
let operatorPosition = -1;
let firstNum;
let operator;
let secondNum;
let val;
let nums;

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        val = this.textContent;
        if (errorOccurred && (val !== '+' && val !== '-' && val !== 'X' && val !== '/')) {
            screen.textContent = '';
            errorOccurred = false;  
        }
        if (val === '+' || val === '-' || val === 'X' || val === '/') {
            if(operatorClicked)
            {
                return;
            }
            else{
                operator = val;
                operatorPosition = screen.textContent.length;
                operatorClicked = true;   
                screen.textContent += val;
            }
        } else {
            screen.textContent += val;
        }
    });
}

function getCharactersBeforeOperator(inputValue, operator) {
    const indexOfOperator = inputValue.indexOf(operator);
    if (indexOfOperator !== -1) {
        return inputValue.substring(0, indexOfOperator);
    } else {
        return inputValue;
    }
}

function getCharactersAfterOperator(inputValue, operator) {
    const indexOfOperator = inputValue.indexOf(operator);
    if (indexOfOperator !== -1) {
        return inputValue.substring(indexOfOperator + 1);
    } else {
        return "";
    }
}

function operate(f, s, v) {
    let result;
    const firstNumber = parseInt(f);
    const secondNumber = parseInt(s);
    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        screen.textContent = "ERROR";
        console.log("ERROR");
        errorOccurred = true; // Set the error flag
        operatorClicked = false;
        return;
    }
    switch (v) {
        case '+':
            result = firstNumber + secondNumber;
            break;
        case '-':
            result = firstNumber - secondNumber;
            break;
        case 'X':
            result = firstNumber * secondNumber;
            break;
        case '/':
            if (secondNumber === 0) {
                screen.textContent = "ERROR";
                console.log("ERROR");
                errorOccurred = true;
                operatorClicked = false;
                return;
            }
            result = firstNumber / secondNumber;
            break;
        default:
            screen.textContent = "ERROR";
            console.log("ERROR");
            errorOccurred = true;
            operatorClicked = false;
            return;
    }
    screen.textContent = result;
    firstNum = '';
    secondNum = '';
    operatorClicked = false;
    operator = '';
}

equals.addEventListener('click', function () {
    if (screen.textContent === '') {
      screen.textContent = "ERROR";
      console.log("ERROR");
      errorOccurred = true;
      operatorClicked = false;
      return;
    }
    firstNum = getCharactersBeforeOperator(screen.textContent, operator);
    secondNum = getCharactersAfterOperator(screen.textContent, operator);
    operate(firstNum, secondNum, operator);
  });

clear.addEventListener('click' , function() {screen.textContent = " "})

