const bgCanvas = document.createElement('canvas');
bgCanvas.style.width = '100%';
bgCanvas.style.height = '100%';
bgCanvas.style.position = 'fixed';
bgCanvas.style.top = '0';
bgCanvas.style.left = '0';
bgCanvas.style.zIndex = '-1';
document.body.appendChild(bgCanvas);

// 现有的动画和鼠标交互代码

// const bgCanvas = document.getElementById('bgCanvas');
const bgCtx = bgCanvas.getContext('2d');
bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;

const particleCount = 50;
const particles = [];
const mouse = { x: null, y: null };
particles.push(mouse);
function Particle() {
  this.x = Math.random() * bgCanvas.width;
  this.y = Math.random() * bgCanvas.height;
  this.vx = Math.random() * 2 - 1;
  this.vy = Math.random() * 2 - 1;
}

Particle.prototype.update = function () {
  this.x += this.vx;
  this.y += this.vy;

  if (this.x < 0 || this.x > bgCanvas.width) {
    this.vx = -this.vx;
  }

  if (this.y < 0 || this.y > bgCanvas.height) {
    this.vy = -this.vy;
  }
};

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function drawParticles() {
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

  particles.forEach(p => {
    if (p === mouse) {
      return; // 跳过鼠标所在的圆点
    }
    if (p.update) {
      p.update();
    }
    bgCtx.beginPath();
    bgCtx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    bgCtx.fillStyle = 'rgba(50, 50, 50, 0.5)';
    bgCtx.fill();
  });

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        bgCtx.beginPath();
        bgCtx.moveTo(particles[i].x, particles[i].y);
        bgCtx.lineTo(particles[j].x, particles[j].y);
        bgCtx.strokeStyle = `rgba(50, 50, 50, ${1 - dist / 100})`;
        bgCtx.stroke();
      }
    }
  }
}

function animateBackground() {
  drawParticles();
  requestAnimationFrame(animateBackground);
}
bgCanvas.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

bgCanvas.addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
});

animateBackground();