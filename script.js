const canvas = document.getElementById('clickParticles');
const ctx = canvas.getContext('2d');
const message = document.getElementById('message');
const loveText = document.getElementById('loveText');
let textParticles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function createTextParticles(x, y) {
  for (let i = 0; i < 10; i++) {
    textParticles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      opacity: 1,
      size: Math.random() * 10 + 14,
      life: 60
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  textParticles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    p.opacity -= 0.02;
    p.life--;

    if (p.opacity <= 0 || p.life <= 0) {
      textParticles.splice(i, 1);
      return;
    }

    let gradient = ctx.createLinearGradient(p.x, p.y, p.x + 20, p.y + 20);
    gradient.addColorStop(0, "#ff69b4");  // pink
    gradient.addColorStop(1, "#ffffff");  // white
    ctx.fillStyle = gradient;
    ctx.globalAlpha = p.opacity;
    ctx.font = `${p.size}px Arial`;
    ctx.fillText("HUG DIYA", p.x, p.y);
    ctx.globalAlpha = 1;
  });

  requestAnimationFrame(drawParticles);
}

drawParticles();

document.addEventListener('click', e => {
  createTextParticles(e.clientX, e.clientY);
});

document.addEventListener('touchstart', e => {
  for (let touch of e.touches) {
    createTextParticles(touch.clientX, touch.clientY);
  }
});

function createRain() {
  const rain = document.createElement('div');
  rain.classList.add('rain');
  rain.innerText = 'HUG DIYA';
  rain.style.left = Math.random() * window.innerWidth + 'px';
  rain.style.animationDuration = (2 + Math.random() * 3) + 's';
  rain.style.fontSize = (16 + Math.random() * 8) + 'px';
  document.body.appendChild(rain);
  setTimeout(() => rain.remove(), 6000);
}

setInterval(createRain, 150);

loveText.addEventListener('click', () => {
  message.style.opacity = 1;
  setTimeout(() => {
    message.style.opacity = 0;
  }, 1000);
});

loveText.addEventListener('touchstart', () => {
  message.style.opacity = 1;
  setTimeout(() => {
    message.style.opacity = 0;
  }, 3000);
});

