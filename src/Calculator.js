export class Calculator {
  constructor(outputElement) {
    this.outputElement = outputElement;
    this.num = '';
    this.numTwo = '';
    this.operator = '';
    this.afterCalculation = false;

    this.buttonMap = {
      clear: this.handleClear.bind(this),
      percent: this.handlePercent.bind(this),
      result: this.handleResult.bind(this),
      'digital-inversion': this.handleInversion.bind(this),
      separator: this.handleSeparator.bind(this),
    };

    this.updateDisplay();
  }

  initialize(buttons) {
    buttons.forEach((button) => {
      button.addEventListener('click', () => this.handleButtonClick(button));
    });
  }

  updateDisplay() {
    if (this.num === '' && this.numTwo === '' && this.operator === '') {
      this.outputElement.textContent = '0';
    } else if (this.num !== '' && this.operator === '') {
      this.outputElement.textContent = this.num.replace('.', ',');
    } else if (this.operator !== '' && this.numTwo !== '' && this.num === '') {
      this.outputElement.textContent =
        this.numTwo.replace('.', ',') + this.operator;
    } else {
      this.outputElement.textContent = this.num.replace('.', ',');
    }
  }

  clearAll() {
    this.num = '';
    this.numTwo = '';
    this.operator = '';
    this.afterCalculation = false;
    this.updateDisplay();
  }

  calculate() {
    if (!this.operator || this.numTwo === '' || this.num === '') return;

    const numTwoString = this.numTwo.toString().replace(',', '.');
    const numString = this.num.toString().replace(',', '.');
    const a = parseFloat(numTwoString);
    const b = parseFloat(numString);
    let result = 0;

    if (isNaN(a) || isNaN(b)) return;

    switch (this.operator) {
      case '+':
        result = a + b;
        break;
      case '−':
        result = a - b;
        break;
      case '∗':
        result = a * b;
        break;
      case '÷':
        result = a / b;
        break;
    }

    result = parseFloat(result.toPrecision(10));
    this.num = result.toString();
    this.numTwo = '';
    this.operator = '';
    this.afterCalculation = true;
    this.outputElement.textContent = this.num.replace('.', ',');
  }

  toggleSignInversion() {
    if (this.num !== '') {
      this.num = (parseFloat(this.num.replace(',', '.')) * -1).toString();
      this.updateDisplay();
    }
  }

  handleClear() {
    this.clearAll();
  }

  handlePercent() {
    this.num = (parseFloat(this.num.replace(',', '.')) / 100).toString();
    this.updateDisplay();
  }

  handleResult() {
    this.calculate();
  }

  handleInversion() {
    this.toggleSignInversion();
  }

  handleSeparator(buttonValue) {
    if (this.afterCalculation) {
      this.clearAll();
      this.num = '0';
      this.afterCalculation = false;
    }
    if (!this.num.includes(',')) {
      if (this.num === '') this.num = '0';
      this.num += buttonValue;
      this.outputElement.textContent = this.num;
    }
    this.afterCalculation = false;
  }

  handleOperator(buttonValue) {
    if (this.num !== '' || this.numTwo !== '') {
      if (this.num !== '' && this.numTwo !== '' && this.operator !== '') {
        this.calculate();
      }
      this.operator = buttonValue;
      this.numTwo =
        this.num === '' ? this.numTwo.toString() : this.num.toString();
      this.num = '';
    }
    this.updateDisplay();
    this.afterCalculation = false;
  }

  handleOperand(buttonValue) {
    if (this.afterCalculation) {
      this.num = '';
      this.afterCalculation = false;
    }
    if (this.num === '0' && buttonValue === '0') {
      return;
    }
    if (this.num === '0' && buttonValue !== '0') {
      this.num = buttonValue;
    } else {
      this.num += buttonValue;
    }
    this.outputElement.textContent = this.num.replace('.', ',');
  }

  handleButtonClick(button) {
    const buttonId = button.id;
    const buttonValue = button.textContent;

    if (
      button.classList.contains('operator') ||
      buttonId === 'percent' ||
      buttonId === 'digital-inversion'
    ) {
      this.afterCalculation = false;
    }

    if (this.buttonMap[buttonId]) {
      this.buttonMap[buttonId](buttonValue);
    } else if (button.classList.contains('operator')) {
      this.handleOperator(buttonValue);
    } else if (button.classList.contains('operand')) {
      this.handleOperand(buttonValue);
    }
  }
}
