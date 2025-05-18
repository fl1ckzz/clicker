const counter = document.getElementById('counter');
const btn = document.getElementById('clickBtn');
const resetBtn = document.getElementById('resetBtn');
let count = 0;

btn.addEventListener('click', () => {
  count++;
  counter.textContent = count;
});

resetBtn.addEventListener('click', () => {
  count = 0;
  counter.textContent = count;
});