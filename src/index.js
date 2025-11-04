import "./styles.css";
import { Calculator } from "./Calculator.js";

const display = document.getElementById("display");
const calculator = new Calculator(display);
const buttons = document.querySelectorAll("button");
calculator.initialize(buttons);

document.getElementById("theme-toggle").addEventListener("click", () => {
  document
    .querySelectorAll(".theme-target")
    .forEach((el) => el.classList.toggle("dark-theme"));
});
