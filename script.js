const loginScreen = document.getElementById('loginScreen');
const startBtn = document.getElementById('startBtn');
const usernameInput = document.getElementById('usernameInput');

let username = localStorage.getItem('username');

if (username) {
  loginScreen.style.display = 'none';
}

startBtn.addEventListener('click', () => {
  const input = usernameInput.value.trim();
  if (input !== '') {
    localStorage.setItem('username', input);
    username = input;
    loginScreen.style.display = 'none';
  }
});
const userDisplay = document.getElementById('userDisplay');

function updateUserDisplay() {
  if (username) {
    userDisplay.textContent = `Привет, ${username}!`;
  }
}

// если пользователь уже вошёл
if (username) {
  loginScreen.style.display = 'none';
  updateUserDisplay();
}

// когда вводит имя
startBtn.addEventListener('click', () => {
  const input = usernameInput.value.trim();
  if (input !== '') {
    localStorage.setItem('username', input);
    username = input;
    loginScreen.style.display = 'none';
    updateUserDisplay();
  }
});

const counter = document.getElementById('counter');
const btn = document.getElementById('clickBtn');
const langBtn = document.getElementById('langBtn');
const title = document.querySelector('h1');
const themeToggle = document.getElementById('themeToggle');

let count = Number(localStorage.getItem('counter')) || 0;
let clickCount = 0;
let clicksPerSecond = 0;
let currentLang = 'ru';

counter.textContent = count;

btn.addEventListener('click', () => {
  count++;
  clickCount++;
  counter.textContent = count;
  localStorage.setItem('counter', count);

  if (username) {
    saveOrUpdatePlayer(username, count); 
  }
});


const leaderboardTitle = document.querySelector('.leaderboard h3');
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
    userDisplay.textContent = `Hi, ${username}!`;
    title.textContent = 'Clicker';
    btn.textContent = 'Click!';
    cpsDisplay.innerText = `Clicks per second: ${clicksPerSecond}`;
    langBtn.innerHTML = '<img src="https://fl1ckzz.github.io/clicker/flags/russia.png" alt="RU" width="24" style="vertical-align:middle;"> RU';
    leaderboardTitle.textContent = '🏆 Top 3 players:';
    currentLang = 'en';
  } else {
    userDisplay.textContent = `Привет, ${username}!`;
    title.textContent = 'Кликер';
    btn.textContent = 'Клик!';
    cpsDisplay.innerText = `Кликов в секунду: ${clicksPerSecond}`;
    langBtn.innerHTML = '<img src="https://fl1ckzz.github.io/clicker/flags/britan.png" alt="EN" width="24" style="vertical-align:middle;"> EN';
    leaderboardTitle.textContent = '🏆 Топ 3 игрока:';
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

const leaderboardList = document.getElementById('leaderList');

async function loadTopPlayers() {
  const leaderboardList = document.getElementById('leaderboard');
  try {
    const response = await fetch('https://682c5a3bd29df7a95be6a5d6.mockapi.io/api/players');
    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error('Ошибка: данные с сервера не являются массивом', data);
      leaderboardList.innerHTML = '<li>Ошибка: некорректные данные с сервера</li>';
      return;
    }

    const topPlayers = data
      .filter(player => typeof player.score === 'number')
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    leaderboardList.innerHTML = '';

    topPlayers.forEach((player, index) => {
      const li = document.createElement('li');
      li.textContent = `${index + 1}. ${player.name} — ${player.score}`;
      leaderboardList.appendChild(li);
    });
  } catch (error) {
    leaderboardList.innerHTML = '<li>Ошибка загрузки рейтинга</li>';
    console.error('Ошибка при загрузке топ-игроков:', error);
  }
}

loadTopPlayers();

async function saveOrUpdatePlayer(name, score) {
  const storedId = localStorage.getItem('userId');
  try {
    if (storedId) {
      // Обновляем игрока по сохранённому ID
      console.log(`Обновляем игрока с ID: ${storedId}`);
      await fetch(`https://682c5a3bd29df7a95be6a5d6.mockapi.io/api/players/${storedId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, score })
      });
    } else {
      // Пробуем найти игрока по имени
      const response = await fetch(`https://682c5a3bd29df7a95be6a5d6.mockapi.io/api/players?name=${encodeURIComponent(name)}`);
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        const player = data[0];
        console.log(`Нашли игрока по имени: ${player.name}, ID: ${player.id}`);
        localStorage.setItem('userId', player.id); // Сохраняем ID
        await fetch(`https://682c5a3bd29df7a95be6a5d6.mockapi.io/api/players/${player.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, score })
        });
      } else {
        // Игрока нет — создаём нового
        console.log(`Создаём нового игрока: ${name}`);
        const createRes = await fetch('https://682c5a3bd29df7a95be6a5d6.mockapi.io/api/players', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, score })
        });
        const newPlayer = await createRes.json();
        localStorage.setItem('userId', newPlayer.id); // Сохраняем ID
      }
    }
  } catch (e) {
    console.error('Ошибка при сохранении или обновлении игрока:', e);
  }
}


