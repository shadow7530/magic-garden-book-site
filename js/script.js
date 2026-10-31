/* global AOS, bootstrap */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const navMenu = document.getElementById('mainNav');
  const navToggle = document.querySelector('.nav-toggle');
  const motionToggle = document.getElementById('motionToggle');
  const motionPreference = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : { matches: false };

  // Respect the device's accessibility preference unless the visitor explicitly
  // chooses a motion setting with the on-page control.
  const readMotionChoice = () => {
    try { return window.localStorage.getItem('magicGardenMotionPreference'); }
    catch (_) { return null; }
  };
  const saveMotionChoice = (value) => {
    try { window.localStorage.setItem('magicGardenMotionPreference', value); }
    catch (_) { /* Local-file and private modes may disable storage. */ }
  };
  const savedChoice = readMotionChoice();
  let motionEnabled = savedChoice === 'on' ? true : savedChoice === 'off' ? false : !motionPreference.matches;
  let fallbackRevealObserver = null;
  let aosLibraryInitialized = false;
  let particlesInitialized = false;
  let parallaxInitialized = false;

  // Bootstrap mobile navigation: close the menu after an in-page jump.
  if (navMenu && navToggle && window.bootstrap) {
    const collapse = window.bootstrap.Collapse.getOrCreateInstance(navMenu, { toggle: false });
    navMenu.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 991.98px)').matches && navMenu.classList.contains('show')) {
          collapse.hide();
        }
      });
    });
  }

  // Tactile feedback for purchase and primary action buttons.
  document.querySelectorAll('.nav-buy, .btn-magic').forEach((link) => {
    link.addEventListener('pointerdown', () => link.classList.add('is-pressed'));
    ['pointerup', 'pointerleave', 'blur', 'pointercancel'].forEach((eventName) => {
      link.addEventListener(eventName, () => link.classList.remove('is-pressed'));
    });
  });

  const aosOptions = {
    duration: 820,
    easing: 'ease-out-cubic',
    once: true,
    offset: 65,
    delay: 0,
    anchorPlacement: 'top-bottom',
    mirror: false
  };

  // Each target also gets locally defined transitions in style.css, so scroll
  // reveal still works when the AOS CDN is blocked or the page is opened offline.
  function initLocalScrollReveal() {
    if (fallbackRevealObserver) fallbackRevealObserver.disconnect();
    const targets = [...document.querySelectorAll('[data-aos]')];
    targets.forEach((element) => {
      const duration = Number(element.dataset.aosDuration || aosOptions.duration);
      const delay = Number(element.dataset.aosDelay || 0);
      element.style.setProperty('--aos-duration', `${duration}ms`);
      element.style.setProperty('--aos-delay', `${delay}ms`);
    });

    if (!('IntersectionObserver' in window)) {
      targets.forEach((element) => element.classList.add('aos-animate'));
      return;
    }

    fallbackRevealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      });
    }, { root: null, rootMargin: '0px 0px -7% 0px', threshold: 0.08 });

    targets.forEach((element) => {
      if (!element.classList.contains('aos-animate')) fallbackRevealObserver.observe(element);
    });
  }

  function initScrollReveal() {
    root.classList.add('aos-enabled');
    root.classList.remove('motion-off');

    if (window.AOS && typeof window.AOS.init === 'function') {
      try {
        if (!aosLibraryInitialized) {
          window.AOS.init(aosOptions);
          aosLibraryInitialized = true;
        } else if (typeof window.AOS.refreshHard === 'function') {
          window.AOS.refreshHard();
        } else if (typeof window.AOS.refresh === 'function') {
          window.AOS.refresh();
        }
        if (fallbackRevealObserver) {
          fallbackRevealObserver.disconnect();
          fallbackRevealObserver = null;
        }
        return;
      } catch (error) {
        console.warn('AOS could not initialize; using local scroll-reveal fallback.', error);
      }
    }
    initLocalScrollReveal();
  }

  // Art-directed ambient particles. The basics section's real ID is
  // "reading-basics"; using that ID fixes particles missing from that section.
  const particleScenes = {
    home: [
      ['petal', 'petal.webp', '8%', '44%', '19px', '18s', '-7s', '54px'],
      ['sparkle', 'sparkle.webp', '21%', '22%', '22px', '4.8s', '-2s', '0px'],
      ['leaf', 'leaf.webp', '88%', '60%', '25px', '14s', '-5s', '16px'],
      ['petal', 'petal.webp', '78%', '16%', '15px', '21s', '-13s', '-36px']
    ],
    story: [
      ['petal', 'petal.webp', '10%', '18%', '16px', '20s', '-11s', '40px'],
      ['sparkle', 'sparkle.webp', '91%', '72%', '18px', '5.2s', '-3s', '0px']
    ],
    readers: [
      ['leaf', 'leaf.webp', '7%', '68%', '26px', '15s', '-6s', '22px'],
      ['flower', 'wildflower.webp', '91%', '22%', '24px', '13s', '-4s', '13px']
    ],
    'reading-basics': [
      ['petal', 'petal.webp', '91%', '24%', '15px', '19s', '-9s', '-34px'],
      ['sparkle', 'sparkle.webp', '8%', '82%', '20px', '4.4s', '-1.5s', '0px']
    ],
    takeaways: [
      ['petal', 'petal.webp', '7%', '38%', '17px', '18s', '-4s', '40px'],
      ['leaf', 'leaf.webp', '94%', '74%', '21px', '16s', '-7s', '-18px'],
      ['sparkle', 'sparkle.webp', '82%', '14%', '23px', '4.6s', '-2.7s', '0px']
    ],
    purchase: [
      ['petal', 'petal.webp', '12%', '28%', '20px', '18s', '-12s', '48px'],
      ['flower', 'wildflower.webp', '89%', '70%', '24px', '14s', '-6s', '12px']
    ]
  };

  function initAmbientParticles() {
    if (particlesInitialized) return;
    Object.entries(particleScenes).forEach(([sceneName, particles]) => {
      const section = document.getElementById(sceneName);
      const layer = section && section.querySelector('.ambient-particles');
      if (!layer) return;
      particles.forEach(([type, file, left, top, size, duration, delay, drift]) => {
        const particle = document.createElement('span');
        particle.className = `magic-particle magic-particle--${type}`;
        particle.setAttribute('aria-hidden', 'true');
        particle.style.setProperty('--particle-left', left);
        particle.style.setProperty('--particle-top', top);
        particle.style.setProperty('--particle-size', size);
        particle.style.setProperty('--particle-duration', duration);
        particle.style.setProperty('--particle-delay', delay);
        particle.style.setProperty('--particle-drift', drift);
        const img = document.createElement('img');
        img.src = `images/motion/${file}`;
        img.alt = '';
        img.decoding = 'async';
        particle.appendChild(img);
        layer.appendChild(particle);
      });
    });
    particlesInitialized = true;
  }

  // Gentle parallax on two independent watercolor garden scenes.
  function initParallax() {
    const parallaxScenes = [...document.querySelectorAll('[data-parallax-scene]')];
    if (!parallaxScenes.length || parallaxInitialized) return;
    let rafPending = false;
    const updateParallax = () => {
      if (motionEnabled) {
        parallaxScenes.forEach((scene) => {
          const rect = scene.getBoundingClientRect();
          if (rect.bottom < -80 || rect.top > window.innerHeight + 80) return;
          const strength = Number(scene.dataset.parallaxStrength || 12);
          const centerOffset = (rect.top + rect.height / 2 - window.innerHeight / 2) / Math.max(window.innerHeight, 1);
          const shift = Math.max(-strength, Math.min(strength, -centerOffset * strength));
          scene.style.setProperty('--parallax-y', `${shift.toFixed(1)}px`);
        });
      }
      rafPending = false;
    };
    const requestParallax = () => {
      if (!motionEnabled || rafPending) return;
      rafPending = true;
      window.requestAnimationFrame(updateParallax);
    };
    window.addEventListener('scroll', requestParallax, { passive: true });
    window.addEventListener('resize', requestParallax, { passive: true });
    requestParallax();
    parallaxInitialized = true;
  }

  function updateMotionToggle() {
    if (!motionToggle) return;
    motionToggle.hidden = false;
    motionToggle.setAttribute('aria-pressed', String(motionEnabled));
    motionToggle.setAttribute('aria-label', motionEnabled ? 'ปิดภาพเคลื่อนไหว' : 'เปิดภาพเคลื่อนไหว');
    const label = motionToggle.querySelector('[data-motion-label]');
    if (label) label.textContent = motionEnabled ? 'หยุดแอนิเมชัน' : 'เปิดแอนิเมชัน';
    motionToggle.title = motionEnabled ? 'กดเพื่อหยุดภาพเคลื่อนไหว' : 'กดเพื่อเปิดภาพเคลื่อนไหว';
  }

  function applyMotionMode() {
    if (motionEnabled) {
      root.classList.add('motion-on');
      root.classList.remove('motion-off');
      initScrollReveal();
      initAmbientParticles();
      initParallax();
      window.requestAnimationFrame(() => window.dispatchEvent(new Event('scroll')));
    } else {
      root.classList.remove('motion-on', 'aos-enabled');
      root.classList.add('motion-off');
      if (fallbackRevealObserver) {
        fallbackRevealObserver.disconnect();
        fallbackRevealObserver = null;
      }
    }
    updateMotionToggle();
  }

  if (motionToggle) {
    motionToggle.addEventListener('click', () => {
      motionEnabled = !motionEnabled;
      saveMotionChoice(motionEnabled ? 'on' : 'off');
      applyMotionMode();
    });
  }

  // If the optional AOS CDN loads after the local fallback has started, upgrade
  // to the official library without sacrificing the animation already on screen.
  window.addEventListener('aos-library-ready', () => {
    if (motionEnabled && window.AOS && !aosLibraryInitialized) initScrollReveal();
  });

  applyMotionMode();

  // Highlight the active navigation item while reading through the one-page site.
  const navLinks = document.querySelectorAll('.site-nav .nav-link[href^="#"]');
  const sections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  if (sections.length && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const selected = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', selected);
          if (selected) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-25% 0px -60% 0px', threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));
  }
});
