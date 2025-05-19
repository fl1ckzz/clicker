const counter = document.getElementById('counter');
const btn = document.getElementById('clickBtn');
const resetBtn = document.getElementById('resetBtn');
const langBtn = document.getElementById('langBtn');
const title = document.querySelector('h1');
const themeToggle = document.getElementById('themeToggle');

let count = Number(localStorage.getItem('counter')) || 0;
let clickCount = 0;
let clicksPerSecond = 0;
let currentLang = 'ru';

counter.textContent = count;

// Счётчики
btn.addEventListener('click', () => {
  count++;
  clickCount++;
  counter.textContent = count;
  localStorage.setItem('counter', count);
});

resetBtn.addEventListener('click', () => {
  count = 0;
  counter.textContent = count;
  localStorage.setItem('counter', count);
});

// Создание блока CPS
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

// Смена языка
function setLang(lang) {
  if (lang === 'en') {
    title.textContent = 'Clicker';
    btn.textContent = 'Click!';
    resetBtn.textContent = 'Reset';
    cpsDisplay.innerText = `Clicks per second: ${clicksPerSecond}`;
    langBtn.innerHTML = '<img src="https://fl1ckzz.github.io/clicker/flags/russia.png" alt="RU" width="24" style="vertical-align:middle;"> RU';
    currentLang = 'en';
  } else {
    title.textContent = 'Кликер';
    btn.textContent = 'Клик!';
    resetBtn.textContent = 'Сбросить';
    cpsDisplay.innerText = `Кликов в секунду: ${clicksPerSecond}`;
    langBtn.innerHTML = '<img src="https://fl1ckzz.github.io/clicker/flags/britan.png" alt="EN" width="24" style="vertical-align:middle;"> EN';
    currentLang = 'ru';
  }
}

langBtn.addEventListener('click', () => {
  setLang(currentLang === 'ru' ? 'en' : 'ru');
});

// Обновление CPS
setInterval(() => {
  clicksPerSecond = clickCount;
  cpsDisplay.innerText = currentLang === 'en'
    ? `Clicks per second: ${clicksPerSecond}`
    : `Кликов в секунду: ${clicksPerSecond}`;
  clickCount = 0;
}, 1000);

// Переключение темы
themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark', themeToggle.checked);
});



