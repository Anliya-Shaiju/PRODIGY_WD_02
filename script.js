let timerDisplay = document.querySelector('.timer');
let startButton = document.querySelector('.start');
let splitButton = document.querySelector('.split');
let resetButton = document.querySelector('.reset');
let splitsContainer = document.querySelector('.splits ul');

let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    let minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    let seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function updateTimer() {
    elapsedTime = Date.now() - startTime;
    timerDisplay.textContent = formatTime(elapsedTime);
}

startButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(intervalId);
        startButton.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTimer, 100);
        startButton.textContent = 'Pause';
    }
    isRunning = !isRunning;
});

splitButton.addEventListener('click', () => {
    if (isRunning) {
        let splitTime = document.createElement('li');
        splitTime.textContent = formatTime(elapsedTime);
        splitsContainer.appendChild(splitTime);
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    timerDisplay.textContent = '00:00:00';
    splitsContainer.innerHTML = '';
    startButton.textContent = 'Start';
    isRunning = false;
});
