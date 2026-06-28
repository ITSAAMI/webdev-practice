// Work session ka default duration (25 minutes)
let workDuration = 25;

// Break session ka default duration (5 minutes)
let breakDuration = 5;

// Baqi time seconds mein (shuru mein workDuration * 60)
let timeLeft = workDuration * 60;

// Timer run ho raha hai ya nahi
let isRunning = false;

// Abhi work time hai ya break time
let isWorkTime = true;

// setInterval ko store karte hain taa ke clear kar sakein
let timerInterval = null;

// HTML elements ko grab karte hain
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const workInput = document.getElementById('workDuration');
const breakInput = document.getElementById('breakDuration');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const timerLabel = document.getElementById('timerLabel');

// Display ko update karne ka function
function updateDisplay() {
    // Total seconds ko minutes aur seconds mein convert karo
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    // Display mein minutes aur seconds dikhaao (2 digits ke saath)
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
    
    // Progress ring ko update karo
    updateProgressRing();
}

// Progress ring (circle) ko update karne ka function
function updateProgressRing() {
    // SVG circle element ko grab karo
    const circle = document.querySelector('.progress-ring-circle');
    
    // Circle ka perimeter calculate karo (2 * pi * radius)
    const circumference = 2 * Math.PI * 93;
    
    // Total time calculate karo (work ya break ke based par)
    const totalTime = isWorkTime ? workDuration * 60 : breakDuration * 60;
    
    // Progress nikalo (0 se 1 ke beech)
    const progress = (totalTime - timeLeft) / totalTime;
    
    // Offset calculate karo aur circle ko fill karo
    const offset = circumference * (1 - progress);
    circle.style.strokeDashoffset = offset;
}

// Timer shuru karne ka function
function startTimer() {
    // Agar pehlay se run ho raha hai to return karo
    if (isRunning) return;
    
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    workInput.disabled = true;
    breakInput.disabled = true;
    
    // Har 1 second mein timer ko update karo
    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        // Agar time complete ho gaya
        if (timeLeft === 0) {
            playNotification();
            switchMode();
        }
    }, 1000);
}

// Timer ko pause karne ka function
function pauseTimer() {
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    clearInterval(timerInterval);
}

// Timer ko reset karne ka function
function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    workInput.disabled = false;
    breakInput.disabled = false;
    isWorkTime = true;
    workDuration = parseInt(workInput.value);
    breakDuration = parseInt(breakInput.value);
    timeLeft = workDuration * 60;
    timerLabel.textContent = 'Work Time';
    updateDisplay();
}

// Work aur break mode ke beech switch karne ka function
function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? workDuration * 60 : breakDuration * 60;
    timerLabel.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    updateDisplay();
}

// Sound notification banane ka function (beep beep!)
function playNotification() {
    try {
        // Audio context create karo
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        // Oscillator ko gain se connect karo
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Sound ke properties set karo
        oscillator.frequency.value = 800; // 800 Hz frequency
        oscillator.type = 'sine'; // Sine wave
        
        // Volume set karo aur fade out karo
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        // Sound ko 0.5 seconds ke liye play karo
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log('Audio notification not supported');
    }
}

// Work duration input ko change karne par
workInput.addEventListener('change', () => {
    if (!isRunning) {
        workDuration = parseInt(workInput.value);
        // Agar work mode hai to naya duration set karo
        if (isWorkTime) {
            timeLeft = workDuration * 60;
            updateDisplay();
        }
    }
});

// Break duration input ko change karne par
breakInput.addEventListener('change', () => {
    if (!isRunning) {
        breakDuration = parseInt(breakInput.value);
    }
});

// Button event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Initial values set karo
workDuration = parseInt(workInput.value);
breakDuration = parseInt(breakInput.value);
updateDisplay();