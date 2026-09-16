const st = document.getElementById('scrollTop');
const nb = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (st) st.classList.toggle('visible', y > 400);
  if (nb) nb.classList.toggle('scrolled', y > 60);
});

// Apply scrolled immediately on inner pages (no hero)
if (nb && !document.querySelector('.hero')) {
  nb.classList.add('scrolled');
}


// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Highlight active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  } else {
    a.classList.remove('active');
  }
});

// Fade-in on scroll
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.service-card, .why-card, .testi-card, .step-item, .value-card, .service-row, .contact-detail'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  obs.observe(el);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      contactForm.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
      if (formSuccess) formSuccess.style.display = 'block';
      setTimeout(() => { if (formSuccess) formSuccess.style.display = 'none'; }, 6000);
    }, 1400);
  });
}
