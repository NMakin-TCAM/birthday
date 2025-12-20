const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i = 0; i < 120; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        d: Math.random() * 10
    });
}

function drawSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    for (let p of particles) {
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
    }
    ctx.fill();
    updateSnow();
}

function updateSnow() {
    for (let p of particles) {
        p.y += Math.cos(p.d) + 1 + p.r / 2;
        if (p.y > canvas.height) { p.y = -10; p.x = Math.random() * canvas.width; }
    }
}
setInterval(drawSnow, 30);

let enteredCode = "";
const correctCode = "1005"; 

function pressKey(num) {
    if (enteredCode.length < 4) {
        enteredCode += num;
        document.getElementById('code-input').value = enteredCode;
    }
}

function clearCode() {
    enteredCode = "";
    document.getElementById('code-input').value = "";
}

function checkCode() {
    if (enteredCode === correctCode) {
        revealCrush();
    } else {
        const modal = document.querySelector('.sheikah-style');
        modal.style.animation = "shake 0.3s";
        setTimeout(() => modal.style.animation = "", 300);
        clearCode();
    }
}

function openKeypad() {
    document.getElementById('puzzle-modal').classList.remove('hidden');
}

function closePuzzle() {
    document.getElementById('puzzle-modal').classList.add('hidden');
    clearCode();
}

function revealCrush() {
    const audio = document.getElementById('fanfare-sound');
    audio.volume = 0.3; 
    audio.play();

    document.getElementById('puzzle-modal').classList.add('hidden');
    
    const confession = document.getElementById('confession-modal');
    confession.classList.remove('confession-hidden');
    confession.classList.add('confession-active');
    
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff69b4', '#6fffe9', '#ffffff']
    });
}