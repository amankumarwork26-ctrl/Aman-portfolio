/* ============================================
   AMAN KUMAR PORTFOLIO — Premium Script
   Features: Custom cursor, hero particles,
   typing effect, navbar, scroll reveal,
   form validation, mobile menu
   ============================================ */

'use strict';

// ===== CUSTOM CURSOR =====
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');
  if (!cursor || !trail) return;

  let mx = 0, my = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animateTrail() {
    tx += (mx - tx) * 0.12;
    ty += (my - ty) * 0.12;
    trail.style.left = tx + 'px';
    trail.style.top = ty + 'px';
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  document.querySelectorAll('a, button, .skill-category, .project-card, .cert-card, .contact-link').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
      trail.style.transform = 'translate(-50%,-50%) scale(0.4)';
      trail.style.borderColor = 'rgba(6,214,160,0.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      trail.style.transform = 'translate(-50%,-50%) scale(1)';
      trail.style.borderColor = 'rgba(139,92,246,0.5)';
    });
  });
})();

// ===== HERO CANVAS — PARTICLE NETWORK =====
(function initCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [], mouse = { x: -999, y: -999 };
  const isMobile = window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent);
  const PARTICLE_COUNT = isMobile ? 28 : 70;
  const MAX_DIST = isMobile ? 100 : 150;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function makeParticle() {
    const speed = isMobile ? 0.2 : 0.4;
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      r: Math.random() * 2 + 0.8,
      hue: Math.random() > 0.5 ? 260 : 160
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, makeParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    if (!isMobile) {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = 0.1 * (1 - dist / MAX_DIST);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    const mouseRadius = isMobile ? 120 : 200;
    particles.forEach(p => {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouseRadius) {
        const alpha = 0.2 * (1 - dist / mouseRadius);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(6,214,160,${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    });

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.hue === 260
        ? 'rgba(139,92,246,0.55)'
        : 'rgba(6,214,160,0.45)';
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });

  init();
  draw();
})();

// ===== TYPING EFFECT =====
(function initTyping() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const phrases = [
    'Web Developer',
    'Python Programmer',
    'Database Explorer',
    'Problem Solver',
    'AI Enthusiast',
    'Software Developer'
  ];

  let phraseIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = phrases[phraseIdx];

    if (!deleting) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 2000);
        return;
      }
      setTimeout(type, 75);
    } else {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(type, 350);
        return;
      }
      setTimeout(type, 35);
    }
  }

  setTimeout(type, 800);
})();

// ===== NAVBAR SCROLL EFFECT =====
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ===== MOBILE HAMBURGER =====
(function initHamburger() {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      links.classList.remove('open');
    });
  });
})();

// ===== SCROLL REVEAL =====
(function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let delay = 0;
        siblings.forEach((sib, idx) => { if (sib === entry.target) delay = idx * 100; });
        entry.target.style.transitionDelay = Math.min(delay, 500) + 'ms';
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
})();

// ===== SKILL BAR ANIMATION =====
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('animate'), 250);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(fill => observer.observe(fill));
})();

// ===== CONTACT FORM VALIDATION =====
(function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput    = document.getElementById('name');
  const emailInput   = document.getElementById('email');
  const countryCode  = document.getElementById('countryCode');
  const mobileInput  = document.getElementById('mobile');
  const msgInput     = document.getElementById('message');
  const submitBtn    = document.getElementById('submitBtn');
  const successDiv   = document.getElementById('formSuccess');

  const nameErr    = document.getElementById('nameErr');
  const emailErr   = document.getElementById('emailErr');
  const mobileErr  = document.getElementById('mobileErr');
  const msgErr     = document.getElementById('msgErr');

  function clearError(input, errEl) {
    input.style.borderColor = '';
    errEl.textContent = '';
  }

  function showError(input, errEl, msg) {
    input.style.borderColor = 'var(--accent3)';
    errEl.textContent = msg;
  }

  function validateEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  function validateMobile(val) {
    return /^\d{7,15}$/.test(val.replace(/[\s-]/g, ''));
  }

  function validate() {
    let valid = true;

    clearError(nameInput, nameErr);
    clearError(emailInput, emailErr);
    clearError(mobileInput, mobileErr);
    clearError(msgInput, msgErr);

    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      showError(nameInput, nameErr, 'Please enter your full name (min 2 characters)');
      valid = false;
    }
    if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, emailErr, 'Please enter a valid email address');
      valid = false;
    }
    if (!validateMobile(mobileInput.value.trim())) {
      showError(mobileInput, mobileErr, 'Please enter a valid mobile number');
      valid = false;
    }
    if (!msgInput.value.trim() || msgInput.value.trim().length < 5) {
      showError(msgInput, msgErr, 'Please write a message (min 5 characters)');
      valid = false;
    }

    return valid;
  }

  function showFormMessage(message, type = 'success') {
    successDiv.textContent = message;
    successDiv.classList.toggle('error', type === 'error');
    successDiv.classList.add('show');
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideFormMessage() {
    successDiv.classList.remove('show', 'error');
    successDiv.textContent = '';
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    hideFormMessage();
    if (!validate()) {
      showFormMessage('Please fill all fields correctly, then submit again.', 'error');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    showFormMessage('Sending your message...');

    if (!window.emailjs) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message →';
      showFormMessage('Email service is not loaded. Please check your internet connection and try again.', 'error');
      return;
    }

    try {
      window.emailjs.init('zQPK0VBOzbW3OsAqU');
    } catch (error) {
      console.error('EmailJS init failed:', error);
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message →';
      showFormMessage('Email service setup me problem hai. Please EmailJS public key check karein.', 'error');
      return;
    }

    const senderName = nameInput.value.trim();
    const senderEmail = emailInput.value.trim();
    const phoneNumber = `${countryCode.value} ${mobileInput.value.trim()}`;
    const subject = 'Portfolio Contact Message';
    const userMessage = msgInput.value.trim();
    const fullMessage = `Name: ${senderName}\nEmail: ${senderEmail}\nMobile: ${phoneNumber}\n\nMessage:\n${userMessage}`;

    window.emailjs.send('service_jh2ld8a', 'template_g7adx7o', {
      to_email: 'amankumar.work26@gmail.com',
      from_name: senderName,
      from_email: senderEmail,
      reply_to: senderEmail,
      sender_name: senderName,
      sender_email: senderEmail,
      name: senderName,
      email: senderEmail,
      user_name: senderName,
      user_email: senderEmail,
      visitor_name: senderName,
      visitor_email: senderEmail,
      contact_name: senderName,
      contact_email: senderEmail,
      subject,
      title: subject,
      message: fullMessage,
      user_message: fullMessage,
      phone: phoneNumber,
      mobile: phoneNumber,
      contact_mobile: phoneNumber,
      sender_info: `Name: ${senderName}\nEmail: ${senderEmail}\nMobile: ${phoneNumber}`,
      original_message: userMessage
    })
      .then(() => {
        showFormMessage("Message sent successfully! I'll get back to you within 24 hours.");
        form.reset();
      })
      .catch(error => {
        console.error('EmailJS failed:', error);
        showFormMessage('Message send nahi ho paya. Please email me directly at amankumar.work26@gmail.com.', 'error');
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message →';
      });
  });

  [nameInput, emailInput, mobileInput, msgInput].forEach((el, i) => {
    const errEls = [nameErr, emailErr, mobileErr, msgErr];
    el.addEventListener('input', () => clearError(el, errEls[i]));
  });
})();

// ===== ACTIVE NAV LINK ON SCROLL =====
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(s => observer.observe(s));

  const style = document.createElement('style');
  style.textContent = '.nav-links a.active { color: var(--text) !important; background: var(--surface-hover); }';
  document.head.appendChild(style);
})();

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
