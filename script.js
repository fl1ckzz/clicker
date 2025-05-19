const counter = document.getElementById('counter');
const btn = document.getElementById('clickBtn');
const resetBtn = document.getElementById('resetBtn');
const title = document.querySelector('h1');
const langBtn = document.getElementById('langBtn');
const flagIcon = document.getElementById('flagIcon');
const langText = document.getElementById('langText');

let currentLang = localStorage.getItem('lang') || 'ru';

let count = Number(localStorage.getItem('counter')) || 0;
counter.textContent = count;

btn.addEventListener('click', () => {
  count++;
  counter.textContent = count;
  localStorage.setItem('counter', count);
  clickCount++;
});

resetBtn.addEventListener('click', () => {
  count = 0;
  counter.textContent = count;
  localStorage.setItem('counter', count);
});

let clickCount = 0;
let clicksPerSecond = 0;

const cpsDisplay = document.createElement('div');
cpsDisplay.style.marginTop = '30px';
cpsDisplay.style.padding = '10px 24px';
cpsDisplay.style.background = 'rgba(0, 0, 0, 0.07)';
cpsDisplay.style.color = '#1db954';
cpsDisplay.style.fontFamily = 'Montserrat, Arial, sans-serif';
cpsDisplay.style.fontSize = '1.2em';
cpsDisplay.style.borderRadius = '18px';
cpsDisplay.style.textAlign = 'center';
cpsDisplay.style.boxShadow = '0 2px 12px rgba(80,200,120,0.08)';
cpsDisplay.innerText = 'Кликов в секунду: 0';

document.querySelector('.buttons').appendChild(cpsDisplay);

setInterval(() => {
  clicksPerSecond = clickCount;
  if (currentLang === 'en') {
    cpsDisplay.innerText = `Clicks per second: ${clicksPerSecond}`;
  } else {
    cpsDisplay.innerText = `Кликов в секунду: ${clicksPerSecond}`;
  }
  clickCount = 0;
}, 1000);

function setLang(lang) {
  if (lang === 'en') {
    title.textContent = 'Clicker';
    btn.textContent = 'Click!';
    resetBtn.textContent = 'Reset';
    cpsDisplay.innerText = `Clicks per second: ${clicksPerSecond}`;
    flagIcon.src = 'https://fl1ckzz.github.io/clicker/flags/russia.png';
    flagIcon.alt = 'RU';
    langText.textContent = 'RU';
    currentLang = 'en';
  } else {
    title.textContent = 'Кликер';
    btn.textContent = 'Клик!';
    resetBtn.textContent = 'Сбросить';
    cpsDisplay.innerText = `Кликов в секунду: ${clicksPerSecond}`;
    flagIcon.src = 'https://fl1ckzz.github.io/clicker/flags/britan.png';
    flagIcon.alt = 'EN';
    langText.textContent = 'EN';
    currentLang = 'ru';
  }
  localStorage.setItem('lang', currentLang);
}

langBtn.addEventListener('click', () => {
  setLang(currentLang === 'ru' ? 'en' : 'ru');
});

setLang(currentLang);

const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark', themeToggle.checked);
});
