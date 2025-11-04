import './styles.css';
import { Calculator } from './Calculator.js';

const display = document.getElementById('display');
const calculator = new Calculator(display);
const buttons = document.querySelectorAll('button');
calculator.initialize(buttons);

const themeToggleBtn = document.getElementById('theme-toggle');
const themeTargets = document.querySelectorAll('.theme-target');
const THEME_STORAGE_KEY = 'calculatorTheme';
function applySavedTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === 'dark') {
    themeTargets.forEach((el) => el.classList.add('dark-theme'));
  } else {
    themeTargets.forEach((el) => el.classList.remove('dark-theme'));
  }
}
function toggleThemeAndSave() {
  themeTargets.forEach((el) => el.classList.toggle('dark-theme'));

  const currentTheme = themeTargets[0].classList.contains('dark-theme')
    ? 'dark'
    : 'light';

  localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
}

applySavedTheme();

themeToggleBtn.addEventListener('click', toggleThemeAndSave);
