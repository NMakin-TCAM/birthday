const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
for (let i = 0; i < 100; i++) { particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 3 + 1, d: Math.random() * 10 }); }
function drawSnow() { ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = "white"; ctx.beginPath(); for (let p of particles) { ctx.moveTo(p.x, p.y); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true); } ctx.fill(); updateSnow(); }
function updateSnow() { for (let p of particles) { p.y += Math.cos(p.d) + 1 + p.r / 2; if (p.y > canvas.height) { p.y = -10; p.x = Math.random() * canvas.width; } } }
setInterval(drawSnow, 30);

const countdownDate = new Date("Jan 1, 2026 00:00:00").getTime();
setInterval(function() {
    const now = new Date().getTime();
    const distance = countdownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
}, 1000);

let enteredCode = "";
const correctCode = "1005"; 
function pressKey(num) { if (enteredCode.length < 4) { enteredCode += num; document.getElementById('code-input').value = enteredCode; } }
function clearCode() { enteredCode = ""; document.getElementById('code-input').value = ""; }
function checkCode() { if (enteredCode === correctCode) { revealCrush(); } else { clearCode(); } }
function openKeypad() { document.getElementById('puzzle-modal').classList.remove('hidden'); }
function closePuzzle() { document.getElementById('puzzle-modal').classList.add('hidden'); }

function revealCrush() {
    document.getElementById('puzzle-modal').classList.add('hidden');
    document.getElementById('confession-modal').classList.add('confession-active');
    const audio = document.getElementById('fanfare-sound');
    audio.volume = 0.3;
    audio.play();

    var end = Date.now() + (5 * 1000);
    var colors = ['#9bcbeb', '#ffffff', '#6fffe9'];
    (function frame() {
        confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: colors });
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: colors });
        if (Date.now() < end) { requestAnimationFrame(frame); }
    }());
}