  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, button, .project-card, .skill-item, .award-item').forEach(el => {
    el.addEventListener('mouseenter', () => { ring.style.width = '60px'; ring.style.height = '60px'; ring.style.borderColor = 'var(--gold-light)'; });
    el.addEventListener('mouseleave', () => { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.borderColor = 'var(--gold)'; });
  });

  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.15 });
  reveals.forEach(el => observer.observe(el));

  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.metric-bar-fill, .tech-bar-fill').forEach((bar, i) => {
          setTimeout(() => bar.classList.add('animated'), 300 + i * 80);
        });
        barObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.impact-card, .tech-stack').forEach(el => barObserver.observe(el));

  function animateCounter(el, target, suffix='') {
    let start = 0; const duration = 2000;
    const step = timestamp => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      const val = Math.round(ease * target);
      el.textContent = val + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const vals = e.target.querySelectorAll('.big-stat-val');
        const targets = [95, 3, 300, 80];
        const suffixes = ['%', '', '+', '%'];
        vals.forEach((el, i) => animateCounter(el, targets[i], suffixes[i]));
        statObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  const bigStats = document.querySelector('.big-stats');
  if (bigStats) statObserver.observe(bigStats);
