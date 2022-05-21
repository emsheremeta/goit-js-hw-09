
// getRandomColor
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

const  startBtn = document.querySelector('button[data-start]');
const  stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

  startBtn.addEventListener('click', () => {
      timerId = setInterval (() => {
        document.body.style.background = getRandomHexColor();
      },1000);
      startBtn.disabled = true;
  });

  //startBtn.setAttribute('disabled', 'disabled');

stopBtn.addEventListener('click', () => {
    clearInterval (timerId);
    startBtn.disabled = false;
})
