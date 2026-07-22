/* ============================================
   AMAN KUMAR PORTFOLIO — Premium Script
   ============================================
   Table of Contents:
   1. Custom Cursor         — Glowing cursor with trailing effect
   2. Hero Canvas           — Interactive particle network on hero
   3. Typing Effect         — Rotating role titles with type/delete
   4. Navbar Scroll         — Glassmorphism navbar on scroll
   5. Mobile Hamburger      — Toggle menu for mobile devices
   6. Scroll Reveal         — Fade-in elements on scroll (IntersectionObserver)
   7. Contact Form          — Validation + EmailJS integration
   8. Active Nav Link       — Highlight current section in nav
   9. Smooth Scroll        — Smooth scroll for anchor links
   10. Page Transitions     — Fade overlay between page navigation
   ============================================ */

'use strict';

/* ============================================
   1. CUSTOM CURSOR
   - Small dot follows mouse instantly
   - Larger trail follows with easing (lerp)
   - Scales up + changes color on interactive elements
   ============================================ */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');
  if (!cursor || !trail) return;

  // Mouse position (raw) and trail position (smoothed)
  let mx = 0, my = 0, tx = 0, ty = 0;

  // Track raw mouse position on every move
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  // Smooth trailing animation using linear interpolation (lerp)
  function animateTrail() {
    tx += (mx - tx) * 0.12;  // Ease factor: lower = smoother/slower
    ty += (my - ty) * 0.12;
    trail.style.left = tx + 'px';
    trail.style.top = ty + 'px';
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  // Enlarge cursor + change color when hovering interactive elements
  document.querySelectorAll('a, button, .skill-category, .project-card, .cert-card, .contact-link').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
      trail.style.transform = 'translate(-50%,-50%) scale(0.4)';
      trail.style.borderColor = 'rgba(6,214,160,0.5)';  // Green accent on hover
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      trail.style.transform = 'translate(-50%,-50%) scale(1)';
      trail.style.borderColor = 'rgba(139,92,246,0.5)';  // Purple default
    });
  });
})();

/* ============================================
   2. HERO CANVAS — INTERACTIVE PARTICLE NETWORK
   - Creates floating particles connected by lines
   - Particles near mouse get extra connection lines
   - Reduced particle count on mobile for performance
   ============================================ */
(function initCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [], mouse = { x: -999, y: -999 };

  // Detect mobile device to reduce particle count
  const isMobile = window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent);
  const PARTICLE_COUNT = isMobile ? 28 : 70;   // Fewer particles on mobile
  const MAX_DIST = isMobile ? 100 : 150;       // Shorter connection distance on mobile

  // Resize canvas to match container dimensions
  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  // Create a single particle with random position, velocity, and color
  function makeParticle() {
    const speed = isMobile ? 0.2 : 0.4;
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * speed,  // Horizontal velocity
      vy: (Math.random() - 0.5) * speed,  // Vertical velocity
      r: Math.random() * 2 + 0.8,         // Radius (0.8 - 2.8px)
      hue: Math.random() > 0.5 ? 260 : 160  // Purple (260) or Teal (160)
    };
  }

  // Initialize canvas and particle array
  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, makeParticle);
  }

  // Main render loop — draws connections, mouse lines, and particles
  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw connection lines between nearby particles (desktop only)
    if (!isMobile) {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            // Alpha fades out as distance increases
            const alpha = 0.1 * (1 - dist / MAX_DIST);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139,92,246,${alpha})`;  // Purple lines
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    // Draw extra connection lines from mouse to nearby particles
    const mouseRadius = isMobile ? 120 : 200;
    particles.forEach(p => {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouseRadius) {
        const alpha = 0.2 * (1 - dist / mouseRadius);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(6,214,160,${alpha})`;  // Teal lines to mouse
        ctx.lineWidth = 1.2;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    });

    // Draw particles and update positions
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.hue === 260
        ? 'rgba(139,92,246,0.55)'   // Purple particles
        : 'rgba(6,214,160,0.45)';   // Teal particles
      ctx.fill();

      // Move particle
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off canvas edges
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });

    requestAnimationFrame(draw);
  }

  // Event listeners for resize and mouse tracking
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

/* ============================================
   3. TYPING EFFECT
   - Cycles through role titles with type/delete animation
   - Types at 75ms/char, deletes at 35ms/char
   - Pauses 2s after full word, 350ms between words
   ============================================ */
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
      // Type one character at a time
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 2000);  // Pause before deleting
        return;
      }
      setTimeout(type, 75);  // Typing speed
    } else {
      // Delete one character at a time
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;  // Loop to first phrase
        setTimeout(type, 350);  // Pause before next word
        return;
      }
      setTimeout(type, 35);  // Deleting speed (faster than typing)
    }
  }

  setTimeout(type, 800);  // Initial delay before typing starts
})();

/* ============================================
   4. NAVBAR SCROLL EFFECT
   - Adds glassmorphism background when scrolled > 50px
   - Uses passive scroll for better performance
   ============================================ */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ============================================
   5. MOBILE HAMBURGER MENU
   - Toggles open/close on hamburger click
   - Auto-closes when any nav link is clicked
   ============================================ */
(function initHamburger() {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    links.classList.toggle('open');
  });

  // Close menu when a link is clicked (mobile UX)
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      links.classList.remove('open');
    });
  });
})();

/* ============================================
   6. SCROLL REVEAL ANIMATION
   - Elements with .reveal class fade in on scroll
   - Uses IntersectionObserver for performance
   - Staggered delay: each sibling gets +100ms delay
   - max delay capped at 500ms
   ============================================ */
(function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Calculate staggered delay based on sibling index
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let delay = 0;
        siblings.forEach((sib, idx) => { if (sib === entry.target) delay = idx * 100; });
        entry.target.style.transitionDelay = Math.min(delay, 500) + 'ms';
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);  // Only animate once
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
})();

/* ============================================
   7. CONTACT FORM — VALIDATION + EMAILJS
   - Client-side validation for all fields
   - Email format: standard regex check
   - Mobile: 7-15 digits (spaces/dashes allowed)
   - Sends via EmailJS service (service_jh2ld8a)
   - Shows success/error messages inline
   ============================================ */
(function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Cache all form elements
  const nameInput    = document.getElementById('name');
  const emailInput   = document.getElementById('email');
  const countryCode  = document.getElementById('countryCode');
  const mobileInput  = document.getElementById('mobile');
  const msgInput     = document.getElementById('message');
  const submitBtn    = document.getElementById('submitBtn');
  const successDiv   = document.getElementById('formSuccess');

  // Error message elements
  const nameErr    = document.getElementById('nameErr');
  const emailErr   = document.getElementById('emailErr');
  const mobileErr  = document.getElementById('mobileErr');
  const msgErr     = document.getElementById('msgErr');

  // Reset input border and error text
  function clearError(input, errEl) {
    input.style.borderColor = '';
    errEl.textContent = '';
  }

  // Show red border + error message
  function showError(input, errEl, msg) {
    input.style.borderColor = 'var(--accent3)';
    errEl.textContent = msg;
  }

  // Email validation: must have @ and domain
  function validateEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  // Mobile validation: 7-15 digits after removing spaces/dashes
  function validateMobile(val) {
    return /^\d{7,15}$/.test(val.replace(/[\s-]/g, ''));
  }

  // Validate all fields, return true if valid
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

  // Display success or error message below the form
  function showFormMessage(message, type = 'success') {
    successDiv.textContent = message;
    successDiv.classList.toggle('error', type === 'error');
    successDiv.classList.add('show');
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Hide any visible form message
  function hideFormMessage() {
    successDiv.classList.remove('show', 'error');
    successDiv.textContent = '';
  }

  // Handle form submission
  form.addEventListener('submit', e => {
    e.preventDefault();
    hideFormMessage();

    // Run client-side validation
    if (!validate()) {
      showFormMessage('Please fill all fields correctly, then submit again.', 'error');
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    showFormMessage('Sending your message...');

    // Check if EmailJS library loaded
    if (!window.emailjs) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message →';
      showFormMessage('Email service is not loaded. Please check your internet connection and try again.', 'error');
      return;
    }

    // Initialize EmailJS with public key
    try {
      window.emailjs.init('zQPK0VBOzbW3OsAqU');
    } catch (error) {
      console.error('EmailJS init failed:', error);
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message →';
      showFormMessage('Email service setup me problem hai. Please EmailJS public key check karein.', 'error');
      return;
    }

    // Build message payload
    const senderName = nameInput.value.trim();
    const senderEmail = emailInput.value.trim();
    const phoneNumber = `${countryCode.value} ${mobileInput.value.trim()}`;
    const subject = 'Portfolio Contact Message';
    const userMessage = msgInput.value.trim();
    const fullMessage = `Name: ${senderName}\nEmail: ${senderEmail}\nMobile: ${phoneNumber}\n\nMessage:\n${userMessage}`;

    // Send email via EmailJS (multiple field names for template compatibility)
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

  // Clear error on input — instant feedback
  [nameInput, emailInput, mobileInput, msgInput].forEach((el, i) => {
    const errEls = [nameErr, emailErr, mobileErr, msgErr];
    el.addEventListener('input', () => clearError(el, errEls[i]));
  });
})();

/* ============================================
   8. ACTIVE NAV LINK ON SCROLL
   - Highlights the nav link corresponding to
     the currently visible section
   - Uses IntersectionObserver with center threshold
   - Injects active styles dynamically
   ============================================ */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  // Observe when section crosses the center of viewport
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
  }, { rootMargin: '-40% 0px -50% 0px' });  // Triggers near viewport center

  sections.forEach(s => observer.observe(s));

  // Inject active state styles (keeps CSS clean)
  const style = document.createElement('style');
  style.textContent = '.nav-links a.active { color: var(--text) !important; background: var(--surface-hover); }';
  document.head.appendChild(style);
})();

/* ============================================
   9. SMOOTH SCROLL FOR ANCHOR LINKS
   - Intercepts #anchor clicks
   - Scrolls smoothly with 80px offset for fixed navbar
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;  // Account for fixed navbar height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ============================================
   10. PAGE TRANSITIONS
   - Full-screen overlay fades in on internal link click
   - New page fades in after 350ms transition
   - Skips external links, anchors, mailto/tel
   - Handles browser back/forward via pageshow event
   ============================================ */
(function initPageTransition() {
  const overlay = document.querySelector('.page-transition');
  if (!overlay) return;

  // Fade out overlay on initial page load
  requestAnimationFrame(() => {
    document.body.classList.add('page-ready');
  });

  // Intercept clicks on internal navigation links
  const samePageAnchors = document.querySelectorAll('a[href]');
  samePageAnchors.forEach(link => {
    const href = link.getAttribute('href');
    // Skip non-navigation links
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http') || link.target === '_blank') return;

    link.addEventListener('click', function (e) {
      const currentPath = window.location.pathname;
      let targetPath;
      try {
        targetPath = new URL(href, window.location.origin).pathname;
      } catch (_) { return; }

      // Don't transition if navigating to same page
      if (currentPath === targetPath) return;

      e.preventDefault();
      overlay.classList.add('active');  // Fade in overlay

      // Navigate after transition completes
      setTimeout(() => {
        window.location.href = href;
      }, 350);
    });
  });

  // Handle back/forward browser navigation
  window.addEventListener('pageshow', e => {
    if (e.persisted) {
      document.body.classList.add('page-ready');
    }
  });
})();
