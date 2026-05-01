/* ═══════════════════════════════════════════════════════════════════════════
   IMAMUL ISLAM PORTFOLIO - script.js
   Author: Md Imamul Islam
   Version: 1.0
═══════════════════════════════════════════════════════════════════════════ */

'use strict';

/* ─── 1. DOM ELEMENTS ───────────────────────────────────────────────────── */
const navbar         = document.getElementById('navbar');
const hamburger      = document.getElementById('hamburger');
const navMenu        = document.getElementById('navMenu');
const navLinks       = document.querySelectorAll('.nav-link');
const themeToggle    = document.getElementById('themeToggle');
const themeIcon      = document.getElementById('themeIcon');
const backToTop      = document.getElementById('backToTop');
const typedTextEl    = document.getElementById('typedText');
const statNumbers    = document.querySelectorAll('.stat-number');
const progressFills  = document.querySelectorAll('.progress-fill');
const filterBtns     = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const tPrev          = document.getElementById('tPrev');
const tNext          = document.getElementById('tNext');
const tDots          = document.querySelectorAll('.t-dot');
const tTrack         = document.getElementById('testimonialsTrack');
const contactForm    = document.getElementById('contactForm');
const submitBtn      = document.getElementById('submitBtn');
const formSuccess    = document.getElementById('formSuccess');
const cursorDot      = document.getElementById('cursorDot');
const cursorOutline  = document.getElementById('cursorOutline');

/* ─── 2. THEME TOGGLE ───────────────────────────────────────────────────── */
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

themeToggle.addEventListener('click', () => {
  const current  = document.documentElement.getAttribute('data-theme');
  const newTheme = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);

  // Animate toggle
  themeToggle.style.transform = 'rotate(360deg) scale(1.2)';
  setTimeout(() => { themeToggle.style.transform = ''; }, 400);
});

/* ─── 3. NAVBAR: SCROLL BEHAVIOR & ACTIVE LINKS ────────────────────────── */
function handleScroll() {
  const scrollY = window.scrollY;

  // Sticky nav style
  navbar.classList.toggle('scrolled', scrollY > 50);

  // Back to top visibility
  backToTop.classList.toggle('visible', scrollY > 400);

  // Active nav link based on scroll position
  const sections = document.querySelectorAll('section[id]');
  let current    = '';

  sections.forEach(section => {
    const sTop = section.offsetTop - (window.innerHeight / 3);
    if (scrollY >= sTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${current}`
    );
  });
}

window.addEventListener('scroll', handleScroll, { passive: true });

/* ─── 4. HAMBURGER MOBILE MENU ──────────────────────────────────────────── */
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

// Close menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ─── 5. BACK TO TOP ────────────────────────────────────────────────────── */
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── 6. TYPING ANIMATION ───────────────────────────────────────────────── */
const typingTexts  = ['Front-End Developer', 'UI Designer', 'Video Editor'];
let   textIndex    = 0;
let   charIndex    = 0;
let   isDeleting   = false;
let   typingPaused = false;

function typeText() {
  if (!typedTextEl) return;

  const currentText = typingTexts[textIndex];

  if (isDeleting) {
    typedTextEl.textContent = currentText.slice(0, charIndex - 1);
    charIndex--;
  } else {
    typedTextEl.textContent = currentText.slice(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === currentText.length) {
    // Pause at end of word
    typingPaused = true;
    setTimeout(() => {
      typingPaused = false;
      isDeleting   = true;
      typeText();
    }, 2200);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex  = (textIndex + 1) % typingTexts.length;
    speed      = 400;
  }

  if (!typingPaused) {
    setTimeout(typeText, speed);
  }
}

// Start typing after short delay
setTimeout(typeText, 800);

/* ─── 7. STATS COUNTER ANIMATION ───────────────────────────────────────── */
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;

  statNumbers.forEach(el => {
    const target   = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800;
    const steps    = 60;
    const increment = target / steps;
    let current    = 0;
    let frame      = 0;

    const timer = setInterval(() => {
      frame++;
      // Ease-out effect
      const progress = frame / steps;
      const eased    = 1 - Math.pow(1 - progress, 3);
      current        = Math.round(eased * target);

      el.textContent = current;

      if (frame >= steps) {
        el.textContent = target;
        clearInterval(timer);
      }
    }, duration / steps);
  });

  statsAnimated = true;
}

/* ─── 8. SCROLL ANIMATIONS (Intersection Observer) ─────────────────────── */
const observerOptions = {
  threshold:  0.15,
  rootMargin: '0px 0px -50px 0px'
};

// AOS-style animation observer
const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
      aosObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => aosObserver.observe(el));

// Stats counter observer
const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    animateStats();
    statsObserver.disconnect();
  }
}, { threshold: 0.4 });

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) statsObserver.observe(statsGrid);

// Progress bars observer
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      progressFills.forEach(fill => {
        const targetWidth = fill.getAttribute('data-width');
        setTimeout(() => {
          fill.style.width = targetWidth + '%';
        }, 200);
      });
      progressObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) progressObserver.observe(skillsSection);

/* ─── 9. PORTFOLIO FILTER ───────────────────────────────────────────────── */
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    portfolioItems.forEach((item, i) => {
      const category = item.getAttribute('data-category');
      const show = filter === 'all' || category === filter;

      if (show) {
        item.classList.remove('hidden');
        // Staggered re-entrance animation
        item.style.animation = 'none';
        item.offsetHeight; // Trigger reflow
        item.style.animation = '';
        item.style.animationDelay = `${i * 0.05}s`;
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95) translateY(20px)';

        setTimeout(() => {
          item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          item.style.opacity    = '1';
          item.style.transform  = 'scale(1) translateY(0)';
        }, i * 60 + 50);

      } else {
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        item.style.opacity    = '0';
        item.style.transform  = 'scale(0.95) translateY(20px)';
        setTimeout(() => {
          item.classList.add('hidden');
          item.style.opacity   = '';
          item.style.transform = '';
        }, 300);
      }
    });
  });
});

/* ─── 10. TESTIMONIALS CAROUSEL ─────────────────────────────────────────── */
let currentSlide   = 0;
const totalSlides  = document.querySelectorAll('.testimonial-card').length;
let autoSlideTimer = null;

function goToSlide(index) {
  // Wrap around
  currentSlide = (index + totalSlides) % totalSlides;

  tTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Update dots
  tDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

// Button events
tNext.addEventListener('click', () => {
  nextSlide();
  resetAutoSlide();
});

tPrev.addEventListener('click', () => {
  prevSlide();
  resetAutoSlide();
});

// Dot navigation
tDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    goToSlide(i);
    resetAutoSlide();
  });
});

// Auto-slide
function startAutoSlide() {
  autoSlideTimer = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
  clearInterval(autoSlideTimer);
  startAutoSlide();
}

startAutoSlide();

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX   = 0;

if (tTrack) {
  tTrack.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  tTrack.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide() : prevSlide();
      resetAutoSlide();
    }
  }, { passive: true });
}

/* ─── 11. CONTACT FORM VALIDATION ───────────────────────────────────────── */
function validateField(id, errorId, validationFn, errorMsg) {
  const field = document.getElementById(id);
  const error = document.getElementById(errorId);

  if (!field || !error) return true;

  const value = field.value.trim();

  if (!validationFn(value)) {
    error.textContent    = errorMsg;
    field.style.borderColor = '#ff4757';
    field.style.boxShadow   = '0 0 0 3px rgba(255, 71, 87, 0.15)';
    return false;
  } else {
    error.textContent    = '';
    field.style.borderColor = 'rgba(0, 255, 136, 0.5)';
    field.style.boxShadow   = '0 0 0 3px rgba(0, 255, 136, 0.1)';
    return true;
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Real-time validation
document.getElementById('name')?.addEventListener('input', () => {
  validateField('name', 'nameError', v => v.length >= 2, 'Name must be at least 2 characters.');
});

document.getElementById('email')?.addEventListener('input', () => {
  validateField('email', 'emailError', isValidEmail, 'Please enter a valid email address.');
});

document.getElementById('subject')?.addEventListener('input', () => {
  validateField('subject', 'subjectError', v => v.length >= 3, 'Subject must be at least 3 characters.');
});

document.getElementById('message')?.addEventListener('input', () => {
  validateField('message', 'messageError', v => v.length >= 10, 'Message must be at least 10 characters.');
});

// Form submission
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    const validName    = validateField('name',    'nameError',    v => v.length >= 2,     'Name must be at least 2 characters.');
    const validEmail   = validateField('email',   'emailError',   isValidEmail,            'Please enter a valid email address.');
    const validSubject = validateField('subject', 'subjectError', v => v.length >= 3,     'Subject must be at least 3 characters.');
    const validMessage = validateField('message', 'messageError', v => v.length >= 10,    'Message must be at least 10 characters.');

    if (!validName || !validEmail || !validSubject || !validMessage) return;

    // Simulate form submission
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';

    setTimeout(() => {
      // Reset button
      submitBtn.disabled  = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Send Message</span>';

      // Show success
      formSuccess.classList.add('show');

      // Reset form
      contactForm.reset();

      // Reset field styles
      ['name', 'email', 'subject', 'message'].forEach(id => {
        const field = document.getElementById(id);
        if (field) {
          field.style.borderColor = '';
          field.style.boxShadow   = '';
        }
      });

      // Hide success after 5s
      setTimeout(() => {
        formSuccess.classList.remove('show');
      }, 5000);

    }, 2000);
  });
}

/* ─── 12. CUSTOM CURSOR ─────────────────────────────────────────────────── */
if (cursorDot && cursorOutline) {
  let mouseX = 0, mouseY = 0;
  let outX   = 0, outY   = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Dot follows cursor instantly
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  // Smooth outline follow
  function animateCursor() {
    outX += (mouseX - outX) * 0.15;
    outY += (mouseY - outY) * 0.15;

    cursorOutline.style.left = outX + 'px';
    cursorOutline.style.top  = outY + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effect on interactive elements
  const hoverEls = document.querySelectorAll(
    'a, button, .portfolio-card, .service-card, .stat-card, .filter-btn, input, textarea'
  );

  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity     = '0';
    cursorOutline.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity     = '1';
    cursorOutline.style.opacity = '1';
  });
}

/* ─── 13. SMOOTH SCROLL FOR ANCHOR LINKS ────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    e.preventDefault();
    const top = target.offsetTop - (parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-height')) || 75);

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─── 14. NAVBAR HIGHLIGHT ON SECTION ENTER ─────────────────────────────── */
// Immediately run to set correct active state on page load
window.dispatchEvent(new Event('scroll'));

/* ─── 15. PAGE LOAD ANIMATION ───────────────────────────────────────────── */
window.addEventListener('load', () => {
  // Trigger hero animations
  document.querySelector('.hero-content')?.classList.add('aos-animate');

  // Fade in body
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

/* ─── 16. KEYBOARD ACCESSIBILITY (Testimonials) ─────────────────────────── */
document.addEventListener('keydown', (e) => {
  // Allow arrow keys to navigate testimonials
  const testimonialsSection = document.getElementById('testimonials');
  if (!testimonialsSection) return;

  const rect = testimonialsSection.getBoundingClientRect();
  const inView = rect.top < window.innerHeight && rect.bottom > 0;

  if (inView) {
    if (e.key === 'ArrowRight') { nextSlide(); resetAutoSlide(); }
    if (e.key === 'ArrowLeft')  { prevSlide(); resetAutoSlide(); }
  }
});

/* ─── 17. RESIZE HANDLER ────────────────────────────────────────────────── */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Recompute testimonial position on resize
    goToSlide(currentSlide);
  }, 250);
});

/* ─── 18. SCROLL REVEAL HELPER (additional elements) ────────────────────── */
// Observe service cards for stagger
const serviceCards = document.querySelectorAll('.service-card');
const serviceObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 120);
      serviceObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

serviceCards.forEach(card => {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)';
  serviceObserver.observe(card);
});

console.log('%c👋 Hi there! I\'m Md Imamul Islam — Front-End Developer & UI Designer.',
  'color: #00d9ff; font-size: 14px; font-weight: bold; padding: 8px;'
);
console.log('%c🚀 Portfolio: Built with HTML5, CSS3 & Vanilla JavaScript.',
  'color: #888; font-size: 12px;'
);