import "./styles.css";
import { Calculator } from "./Calculator.js";

const display = document.querySelector(".display");
const calculator = new Calculator(display);

document.querySelector(".calculator").addEventListener("click", (e) => {
  calculator.handleButtonClick(e);
});

document.getElementById("theme-toggle").addEventListener("click", () => {
  document
    .querySelectorAll(".theme-target")
    .forEach((el) => el.classList.toggle("dark-theme"));
});
