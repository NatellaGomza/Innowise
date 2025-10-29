import './styles.css';

const operationField = document.querySelector('.calculator');
const display = document.querySelector('.display');
let separator = false;
let firstOperand = '';
let secondOperand = '';
let operator = '';
let intermediateResult = 0;
display.innerText = intermediateResult;

operationField.addEventListener('click', getValueOfPressedButton);

function getValueOfPressedButton(event) {
  let pressedButton = event.target;
  let firstOperandExists = firstOperand && !secondOperand;

  gettingFirstOperand(pressedButton);

  settingValueOfFirstOperandIfIntermediateResultExist();

  addingFractionalPartToFirstOperand(pressedButton);

  settingOperator(pressedButton);

  changingOperatorWhenOnlyFirstOperandExist(pressedButton);

  gettingSecondOperand(pressedButton);

  addingFractionalPartToSecondOperand(pressedButton);

  changingOperandFromPositiveToNegative(pressedButton, firstOperandExists);

  gettingResult(pressedButton);

  clearingResult(pressedButton);
}

function gettingFirstOperand(pressedButton) {
  let addingNumbersToFirstOperand =
    pressedButton.classList.contains('operand') && !operator;

  if (addingNumbersToFirstOperand) {
    firstOperand += pressedButton.innerText;
    display.innerText = firstOperand;
  }
}

function settingValueOfFirstOperandIfIntermediateResultExist() {
  if (intermediateResult && !secondOperand) {
    firstOperand = intermediateResult;
  }
}

function addingFractionalPartToFirstOperand(pressedButton) {
  let addingFractionalPartToFirstOperand =
    pressedButton.classList.contains('separator') && !operator && !separator;
  let parsedSeparator = '.';

  if (addingFractionalPartToFirstOperand) {
    firstOperand =
      firstOperand.length > 0
        ? (firstOperand += parsedSeparator)
        : (firstOperand = 0 + parsedSeparator);
    display.innerText = firstOperand;
    separator = true;
  }
}

function settingOperator(pressedButton) {
  if (pressedButton.classList.contains('operator')) {
    separator = false;

    getIntermediateResult();

    operator = pressedButton.innerText;
    display.innerText = intermediateResult + operator;
  }
}

function changingOperatorWhenOnlyFirstOperandExist(pressedButton) {
  let operatorToChange = !secondOperand && !intermediateResult;

  if (pressedButton.classList.contains('operator') && operatorToChange) {
    operator = '';
    operator = pressedButton.innerText;
    display.innerText = firstOperand + operator;
  }
}

function gettingSecondOperand(pressedButton) {
  let enteringSecondOperand =
    !!firstOperand && operator && pressedButton.classList.contains('operand');

  if (enteringSecondOperand) {
    secondOperand += pressedButton.innerText;
    display.innerText = firstOperand + operator + secondOperand;
  }
}

function addingFractionalPartToSecondOperand(pressedButton) {
  let addingFractionalPartToSecondOperand =
    firstOperand &&
    operator &&
    !separator &&
    pressedButton.classList.contains('separator');
  let parsedSeparator = '.';

  if (addingFractionalPartToSecondOperand) {
    secondOperand =
      secondOperand.length > 0
        ? (secondOperand += parsedSeparator)
        : (secondOperand = 0 + parsedSeparator);
    display.innerText =
      secondOperand.length > 0
        ? firstOperand + operator + secondOperand
        : (display.innerText += secondOperand);
    separator = true;
  }
}

function changingOperandFromPositiveToNegative(
  pressedButton,
  firstOperandExists,
) {
  if (!pressedButton.classList.contains('digital-inversion')) {
    return;
  }

  if (firstOperandExists) {
    firstOperand = firstOperand * -1;
    display.innerText = firstOperand;
  } else if (intermediateResult && !secondOperand) {
    intermediateResult = intermediateResult * -1;
    display.innerText = intermediateResult;
  } else {
    secondOperand = secondOperand * -1;
    display.innerText = firstOperand + operator + secondOperand;
  }
}

function gettingResult(pressedButton) {
  if (!pressedButton.classList.contains('result-button')) {
    return;
  }

  separator = false;

  if (!secondOperand) {
    display.innerText = firstOperand;
  } else {
    getIntermediateResult();

    display.innerText = intermediateResult;
    firstOperand = '';
  }
}

function clearingResult(pressedButton) {
  if (pressedButton.classList.contains('clear-button')) {
    dataReset();

    display.innerText = 0;
  }
}

function dataReset() {
  firstOperand = '';
  secondOperand = '';
  intermediateResult = 0;
  operator = '';
  separator = false;
}

function getIntermediateResult() {
  let result;
  switch (operator) {
    case '+':
      result = Number(firstOperand) + Number(secondOperand);
      intermediateResult = result % 1 === 0 ? result : result.toFixed(2);
      break;
    case '−':
      result = firstOperand - secondOperand;
      intermediateResult = result % 1 === 0 ? result : result.toFixed(2);
      break;
    case '∗':
      result = firstOperand * secondOperand;
      intermediateResult = result % 1 === 0 ? result : result.toFixed(2);
      break;
    case '÷':
      result = firstOperand / secondOperand;
      intermediateResult = result % 1 === 0 ? result : result.toFixed(2);
      break;
  }

  operator = '';
  secondOperand = '';

  return intermediateResult;
}
