/* ═══════════════════════════════════════════════════════════════
   AYUSH RAJAK PORTFOLIO — main.js
═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─── CUSTOM CURSOR ─────────────────────────────────────────── */
(function () {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function loop() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(loop);
  })();

  const hoverable = 'a, button, .usp-card, .project-card, .ach-item, .skill-tag, .contact-link, .timeline-card';
  document.querySelectorAll(hoverable).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovered');
      follower.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovered');
      follower.classList.remove('hovered');
    });
  });
})();

/* ─── NAV SCROLL ────────────────────────────────────────────── */
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

/* ─── HAMBURGER MENU ────────────────────────────────────────── */
(function () {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ─── CIRCUIT CANVAS BACKGROUND ────────────────────────────── */
(function () {
  const canvas = document.getElementById('circuit-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const NODES  = 28;
  const SPEED  = 0.22;
  const AMBER  = 'rgba(255, 178, 50,';

  const nodes = Array.from({ length: NODES }, () => ({
    x:  Math.random() * canvas.width,
    y:  Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * SPEED,
    vy: (Math.random() - 0.5) * SPEED,
    r:  Math.random() * 2 + 1,
    pulse: Math.random() * Math.PI * 2,
  }));

  function drawNode(n, alpha) {
    const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6);
    glow.addColorStop(0, AMBER + (alpha * 0.9) + ')');
    glow.addColorStop(1, AMBER + '0)');
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fillStyle = AMBER + alpha + ')';
    ctx.fill();
  }

  function drawLine(a, b) {
    const dist = Math.hypot(a.x - b.x, a.y - b.y);
    const maxD = 220;
    if (dist > maxD) return;

    // Orthogonal routing for circuit look
    const midX = Math.round((a.x + b.x) / 2 / 20) * 20;
    const alpha = (1 - dist / maxD) * 0.35;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(midX, a.y);
    ctx.lineTo(midX, b.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = AMBER + alpha + ')';
    ctx.lineWidth   = 0.6;
    ctx.stroke();
  }

  let t = 0;
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    t += 0.012;

    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      n.pulse += 0.025;
    });

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        drawLine(nodes[i], nodes[j]);
      }
    }

    // Draw nodes
    nodes.forEach(n => {
      const a = 0.4 + Math.sin(n.pulse) * 0.3;
      drawNode(n, a);
    });

    requestAnimationFrame(render);
  }
  render();
})();

/* ─── INTERSECTION OBSERVER — REVEAL ─────────────────────────── */
(function () {
  const revealEls = document.querySelectorAll('.reveal');
  const timelineItems = document.querySelectorAll('.timeline-item');
  const achItems = document.querySelectorAll('.ach-item');

  const opts = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, opts);

  revealEls.forEach(el => observer.observe(el));

  // Timeline: staggered
  const tObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        tObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  timelineItems.forEach(el => tObs.observe(el));

  // Achievements: staggered
  const aObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const i = entry.target.dataset.index || 0;
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        aObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  achItems.forEach((el, i) => {
    el.dataset.index = i;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    aObs.observe(el);
  });

  // Skill tags stagger
  const skillGroups = document.querySelectorAll('.skill-group');
  const sObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const tags = entry.target.querySelectorAll('.skill-tag');
        tags.forEach((tag, i) => {
          tag.style.opacity = '0';
          tag.style.transform = 'scale(0.85)';
          tag.style.transition = `opacity 0.35s ease ${i * 55}ms, transform 0.35s ease ${i * 55}ms`;
          setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'scale(1)';
          }, 50);
        });
        sObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  skillGroups.forEach(el => sObs.observe(el));
})();

/* ─── COUNTER ANIMATION ─────────────────────────────────────── */
(function () {
  const counters = document.querySelectorAll('.stat-num');
  let done = false;

  function animateCounters() {
    if (done) return;
    counters.forEach(el => {
      const target = parseInt(el.dataset.target || 0);
      let current  = 0;
      const step   = Math.ceil(target / 30);
      const timer  = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current;
      }, 45);
    });
    done = true;
  }

  const heroObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setTimeout(animateCounters, 600);
      heroObs.disconnect();
    }
  }, { threshold: 0.4 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) heroObs.observe(heroStats);
})();

/* ─── CONTACT FORM VALIDATION ───────────────────────────────── */
(function () {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  function getVal(id) { return document.getElementById(id)?.value.trim() || ''; }
  function setError(id, msg) {
    const el = document.getElementById(id + '-error');
    const input = document.getElementById(id);
    if (el) el.textContent = msg;
    if (input) input.classList.toggle('error', !!msg);
  }
  function clearErrors() {
    ['name', 'email', 'message'].forEach(f => setError(f, ''));
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const name    = getVal('name');
    const email   = getVal('email');
    const message = getVal('message');
    let valid     = true;

    if (!name)                   { setError('name', '↑ Please enter your name.'); valid = false; }
    if (!email)                  { setError('email', '↑ Email is required.'); valid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('email', '↑ Enter a valid email address.'); valid = false;
    }
    if (!message)                { setError('message', '↑ A message is required.'); valid = false; }
    else if (message.length < 10){ setError('message', '↑ Message is too short (min 10 chars).'); valid = false; }

    if (!valid) return;

    // Simulate async send
    const btnText    = form.querySelector('.btn-text');
    const btnSending = form.querySelector('.btn-sending');
    const submitBtn  = form.querySelector('.form-submit');
    btnText.style.display    = 'none';
    btnSending.style.display = 'inline';
    submitBtn.disabled       = true;

    await new Promise(r => setTimeout(r, 1600));

    form.reset();
    btnText.style.display    = 'inline';
    btnSending.style.display = 'none';
    submitBtn.disabled       = false;
    success.classList.add('visible');
    setTimeout(() => success.classList.remove('visible'), 5000);
  });
})();

/* ─── ACTIVE NAV LINK ────────────────────────────────────────── */
(function () {
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => observer.observe(s));
})();

/* ─── SMOOTH SCROLL POLISH ────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 76;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─── PAGE LOAD STAGGER ───────────────────────────────────────── */
window.addEventListener('load', () => {
  document.querySelectorAll('.hero-content .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 140);
  });
});
