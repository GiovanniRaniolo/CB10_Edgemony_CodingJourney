document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.getElementById('openModalBtn');
    const modal = document.getElementById('myModal');
    const closeBtn = document.querySelector('.close');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');

    let countdown

    function handleModalEvents(event) {
        if (event.target === openModalBtn) {
            modal.style.display = 'flex';
            let timerElement = document.getElementById('timer');
            let countdownDiv = document.getElementById('countdown');
            countdownDiv.style.display = 'block';
            let seconds = 5;
            timerElement.textContent = seconds; 
            countdown = setInterval(function() {
                --seconds;
                timerElement.textContent = seconds; 
                if (seconds <= 0) {
                    clearInterval(countdown);
                    modal.style.display = 'none';
                }
            }, 1000);
        } else if (event.target === closeBtn) {
            modal.style.display = 'none';
            clearInterval(countdown);
        } else if (event.target === yesBtn) {
            console.log('YES button clicked');
            logThis.call(event.target, event);
        } else if (event.target === noBtn) {
            console.log('NO button clicked');
        }
    }

    document.addEventListener('click', handleModalEvents);
});

// Esercizio 2
function logThis(event) {
    console.log('Valore di this:', this);
    console.log('Contesto di event.target:', event.target);
}