/**
 * Interactive Ambient Canvas Background
 * Renders smooth floating particles and dynamic glowing gradients responsive to mouse movement.
 */

(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, dpr;
  let animationFrameId;
  let particles = [];
  const PARTICLE_COUNT = 45;

  // Mouse tracking with smooth lerp
  const mouse = {
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    radius: 180
  };

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.baseRadius = Math.random() * 2 + 1;
      this.radius = this.baseRadius;
      this.alpha = Math.random() * 0.4 + 0.15;
      this.colorIndex = Math.floor(Math.random() * 3);
    }

    update() {
      if (prefersReducedMotion) return;

      this.x += this.vx;
      this.y += this.vy;

      // Wrap around edges
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      // Mouse interactive push/pull
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        this.x -= (dx / dist) * force * 2;
        this.y -= (dy / dist) * force * 2;
        this.radius = this.baseRadius + force * 2;
      } else {
        this.radius = this.baseRadius;
      }
    }

    draw() {
      const isDark = document.documentElement.classList.contains('dark');
      let fillStyle;
      if (this.colorIndex === 0) {
        fillStyle = isDark ? `rgba(99, 102, 241, ${this.alpha})` : `rgba(79, 70, 229, ${this.alpha * 0.7})`;
      } else if (this.colorIndex === 1) {
        fillStyle = isDark ? `rgba(236, 72, 153, ${this.alpha})` : `rgba(219, 39, 119, ${this.alpha * 0.7})`;
      } else {
        fillStyle = isDark ? `rgba(56, 189, 248, ${this.alpha})` : `rgba(14, 165, 233, ${this.alpha * 0.7})`;
      }

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = fillStyle;
      ctx.fill();
    }
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.parentElement.clientWidth;
    height = canvas.parentElement.clientHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.scale(dpr, dpr);

    // Initialize or adapt particles
    if (particles.length === 0) {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    }
  }

  function drawLines() {
    const isDark = document.documentElement.classList.contains('dark');
    const strokeBase = isDark ? '99, 102, 241' : '99, 102, 241';
    const maxDist = 120;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * (isDark ? 0.12 : 0.08);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${strokeBase}, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
  }

  function drawGradients() {
    const isDark = document.documentElement.classList.contains('dark');

    // Ambient top-right glow
    const g1 = ctx.createRadialGradient(width * 0.8, height * 0.2, 0, width * 0.8, height * 0.2, width * 0.5);
    g1.addColorStop(0, isDark ? 'rgba(99, 102, 241, 0.18)' : 'rgba(99, 102, 241, 0.08)');
    g1.addColorStop(1, 'transparent');
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, width, height);

    // Ambient bottom-left glow
    const g2 = ctx.createRadialGradient(width * 0.2, height * 0.8, 0, width * 0.2, height * 0.8, width * 0.5);
    g2.addColorStop(0, isDark ? 'rgba(236, 72, 153, 0.12)' : 'rgba(236, 72, 153, 0.06)');
    g2.addColorStop(1, 'transparent');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, width, height);

    // Interactive mouse cursor spotlight
    if (mouse.x > -500) {
      const gMouse = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
      gMouse.addColorStop(0, isDark ? 'rgba(129, 140, 248, 0.15)' : 'rgba(99, 102, 241, 0.09)');
      gMouse.addColorStop(1, 'transparent');
      ctx.fillStyle = gMouse;
      ctx.fillRect(0, 0, width, height);
    }
  }

  function animate() {
    // Smooth lerp mouse coordinates
    mouse.x += (mouse.targetX - mouse.x) * 0.1;
    mouse.y += (mouse.targetY - mouse.y) * 0.1;

    ctx.clearRect(0, 0, width, height);

    drawGradients();
    drawLines();

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  // Event Listeners
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.targetX = e.clientX - rect.left;
    mouse.targetY = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.targetX = -1000;
    mouse.targetY = -1000;
  });

  // Handle visibility change to save CPU
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      animate();
    }
  });

  // Initial boot
  resize();
  animate();
})();
