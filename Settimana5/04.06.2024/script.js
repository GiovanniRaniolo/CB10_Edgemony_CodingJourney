let intervalId;

function updateClock() {
    const now = new Date();
    console.log(now);
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}h : ${minutes}m : ${seconds}s`;
    clock.textContent = timeString;
}

document.getElementById('startBtn').addEventListener('click', function() {
    intervalId = setInterval(updateClock, 1000);
});

document.getElementById('stopBtn').addEventListener('click', function() {
    clearInterval(intervalId);
});