export class Calculator {
  constructor(displayElement) {
    this.display = displayElement;
    this.reset();
  }

  reset() {
    this.separator = false;
    this.firstOperand = "";
    this.secondOperand = "";
    this.operator = "";
    this.intermediateResult = 0;
    this.percentApplied = false;
    this.resultJustCalculated = false;
    this.display.innerText = this.intermediateResult;
  }

  get buttonHandlers() {
    return {
      operand: this.gettingFirstOperand.bind(this),
      separator: this.addingFractionalPartToFirstOperand.bind(this),
      operator: this.settingOperator.bind(this),
      percent: this.applyingPercentToOperand.bind(this),
      "result-button": this.gettingResult.bind(this),
      "clear-button": this.clearingResult.bind(this),
      "digital-inversion": (btn) => {
        const firstOperandExists = this.firstOperand && !this.secondOperand;
        this.changingOperandFromPositiveToNegative(btn, firstOperandExists);
      },
    };
  }

  softResetAfterResultOrPercent() {
    this.firstOperand = this.intermediateResult
      ? this.intermediateResult.toString()
      : this.firstOperand || "0";
    this.secondOperand = "";
    this.operator = "";
    this.separator = false;
    this.resultJustCalculated = false;
    this.percentApplied = false;
  }

  handleButtonClick(event) {
    const pressedButton = event.target;
    const firstOperandExists = this.firstOperand && !this.secondOperand;

    this.gettingFirstOperand(pressedButton);
    this.settingValueOfFirstOperandIfIntermediateResultExist();
    this.addingFractionalPartToFirstOperand(pressedButton);
    this.settingOperator(pressedButton);
    this.changingOperatorWhenOnlyFirstOperandExist(pressedButton);
    this.gettingSecondOperand(pressedButton);
    this.applyingPercentToOperand(pressedButton);
    this.addingFractionalPartToSecondOperand(pressedButton);
    this.changingOperandFromPositiveToNegative(
      pressedButton,
      firstOperandExists,
    );
    this.gettingResult(pressedButton);
    this.clearingResult(pressedButton);
  }

  gettingFirstOperand(pressedButton) {
    const isOperand =
      pressedButton.classList.contains("operand") && !this.operator;
    const value = pressedButton.innerText;

    if (this.resultJustCalculated) this.reset();

    if (isOperand) {
      if (this.firstOperand === "0" && value === "0") return;

      if (this.firstOperand === "0" && value !== ".") {
        this.firstOperand = value;
      } else {
        this.firstOperand += value;
      }

      this.display.innerText = this.firstOperand;
    }
  }

  applyingPercentToOperand(pressedButton) {
    if (!pressedButton.classList.contains("percent")) return;

    if (this.secondOperand) {
      this.secondOperand = (parseFloat(this.secondOperand) / 100).toString();
      this.display.innerText =
        this.firstOperand + this.operator + this.secondOperand;
    } else if (this.firstOperand && !this.operator) {
      this.firstOperand = (parseFloat(this.firstOperand) / 100).toString();
      this.display.innerText = this.firstOperand;
    } else if (this.intermediateResult && !this.secondOperand) {
      this.intermediateResult = (
        parseFloat(this.intermediateResult) / 100
      ).toString();
      this.display.innerText = this.intermediateResult;
    }
    this.resultJustCalculated = true;
  }

  settingValueOfFirstOperandIfIntermediateResultExist() {
    if (this.intermediateResult && !this.secondOperand) {
      this.firstOperand = this.intermediateResult;
    }
  }

  addingFractionalPartToFirstOperand(pressedButton) {
    const isSeparator =
      pressedButton.classList.contains("separator") &&
      !this.operator &&
      !this.separator;
    const parsedSeparator = ".";

    if (isSeparator) {
      this.firstOperand =
        this.firstOperand.length > 0
          ? this.firstOperand + parsedSeparator
          : "0" + parsedSeparator;
      this.display.innerText = this.firstOperand;
      this.separator = true;
    }
  }

  settingOperator(pressedButton) {
    if (!this.firstOperand) return;
    if (pressedButton.classList.contains("operator")) {
      this.separator = false;
      this.getIntermediateResult();
      this.operator = pressedButton.innerText;
      this.display.innerText = this.intermediateResult + this.operator;
    }
  }

  changingOperatorWhenOnlyFirstOperandExist(pressedButton) {
    const operatorToChange =
      !this.secondOperand && !this.intermediateResult && this.firstOperand;

    if (pressedButton.classList.contains("operator") && operatorToChange) {
      this.operator = pressedButton.innerText;
      this.display.innerText = this.firstOperand + this.operator;
    }
  }

  gettingSecondOperand(pressedButton) {
    const enteringSecondOperand =
      !!this.firstOperand &&
      this.operator &&
      pressedButton.classList.contains("operand");

    if (enteringSecondOperand) {
      this.secondOperand += pressedButton.innerText;
      this.display.innerText =
        this.firstOperand + this.operator + this.secondOperand;
    }
  }

  addingFractionalPartToSecondOperand(pressedButton) {
    const isSeparator =
      this.firstOperand &&
      this.operator &&
      !this.separator &&
      pressedButton.classList.contains("separator");
    const parsedSeparator = ".";

    if (isSeparator) {
      this.secondOperand =
        this.secondOperand.length > 0
          ? this.secondOperand + parsedSeparator
          : "0" + parsedSeparator;
      this.display.innerText =
        this.secondOperand.length > 0
          ? this.firstOperand + this.operator + this.secondOperand
          : this.display.innerText + parsedSeparator;
      this.separator = true;
    }
  }

  changingOperandFromPositiveToNegative(pressedButton, firstOperandExists) {
    if (!pressedButton.classList.contains("digital-inversion")) return;

    if (firstOperandExists) {
      this.firstOperand = (-parseFloat(this.firstOperand)).toString();
      this.display.innerText = this.firstOperand;
    } else if (this.intermediateResult && !this.secondOperand) {
      this.intermediateResult = (-parseFloat(
        this.intermediateResult,
      )).toString();
      this.display.innerText = this.intermediateResult;
    } else {
      this.secondOperand = (-parseFloat(this.secondOperand)).toString();
      this.display.innerText =
        this.firstOperand + this.operator + this.secondOperand;
    }
  }

  gettingResult(pressedButton) {
    if (!pressedButton.classList.contains("result-button")) return;

    this.separator = false;

    if (!this.secondOperand) {
      this.display.innerText = this.firstOperand;
    } else {
      this.getIntermediateResult();
      this.display.innerText = this.intermediateResult;
      this.firstOperand = "";
    }

    this.resultJustCalculated = true;
  }

  clearingResult(pressedButton) {
    if (pressedButton.classList.contains("clear-button")) {
      this.reset();
    }
  }

  getIntermediateResult() {
    let result;
    const a = parseFloat(this.firstOperand);
    const b = parseFloat(this.secondOperand);

    switch (this.operator) {
      case "+":
        result = a + b;
        break;
      case "−":
        result = a - b;
        break;
      case "∗":
        result = a * b;
        break;
      case "÷":
        result = a / b;
        break;
      default:
        result = 0;
    }

    this.intermediateResult = result % 1 === 0 ? result : result.toFixed(2);
    this.operator = "";
    this.secondOperand = "";

    return this.intermediateResult;
  }
}
