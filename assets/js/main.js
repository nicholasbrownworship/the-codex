// ── Active nav link ──
function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ── Intersection Observer: fade-in + timeline ──
function initObservers() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in, .timeline-item').forEach(el => observer.observe(el));
}

// ── Instrument bars ──
function initBars() {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.width;
        });
        barObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.instrument-list').forEach(el => barObserver.observe(el));
}

// ── Typing effect for mono elements ──
function typeText(el, text, speed = 40) {
  el.textContent = '';
  let i = 0;
  const timer = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) clearInterval(timer);
  }, speed);
}

function initTyping() {
  const el = document.querySelector('[data-type]');
  if (!el) return;
  const text = el.dataset.type;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      typeText(el, text);
      obs.disconnect();
    }
  });
  obs.observe(el);
}

// ── Nav scroll shadow ──
function initNavScroll() {
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10
      ? '0 4px 30px rgba(0,0,0,0.5)'
      : 'none';
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initObservers();
  initBars();
  initTyping();
  initNavScroll();
});
