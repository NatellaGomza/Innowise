import './styles.css';
import { Calculator } from './Calculator.js';

const display = document.getElementById('display');
const calculator = new Calculator(display);
const buttons = document.querySelectorAll('button');
calculator.initialize(buttons);

const themeToggleBtn = document.getElementById('theme-toggle');
const themeTargets = document.querySelectorAll('.theme-target');
const THEME_STORAGE_KEY = 'calculatorTheme';

function applyThemeClass(isDark) {
  if (isDark) {
    themeTargets.forEach((el) => el.classList.add('dark-theme'));
    themeToggleBtn.classList.add('dark-theme');
  } else {
    themeTargets.forEach((el) => el.classList.remove('dark-theme'));
    themeToggleBtn.classList.remove('dark-theme');
  }
}

function applySavedTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  applyThemeClass(savedTheme === 'dark');
}

function toggleThemeAndSave() {
  const isCurrentlyDark = themeToggleBtn.classList.contains('dark-theme');
  const newThemeIsDark = !isCurrentlyDark;

  applyThemeClass(newThemeIsDark);

  localStorage.setItem(THEME_STORAGE_KEY, newThemeIsDark ? 'dark' : 'light');
}

applySavedTheme();

themeToggleBtn.addEventListener('click', toggleThemeAndSave);
