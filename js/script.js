'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const navMenu = document.getElementById('mainNav');
  const navToggle = document.querySelector('.nav-toggle');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reducedMotion = motionPreference.matches;

  // Bootstrap mobile navigation: close the collapsed menu after an in-page jump.
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

  // AOS is retained as the primary assessed animation library.
  const aosTargets = document.querySelectorAll('[data-aos]');
  if (reducedMotion || !window.AOS) {
    aosTargets.forEach((element) => element.removeAttribute('data-aos'));
    document.documentElement.classList.remove('aos-enabled');
  } else {
    document.documentElement.classList.add('aos-enabled');
    window.AOS.init({
      duration: 820,
      easing: 'ease-out-cubic',
      once: true,
      offset: 65,
      delay: 0,
      anchorPlacement: 'top-bottom',
      mirror: false
    });
  }

  // Ambient watercolor particles. Fixed positions and delays keep the composition
  // art-directed, while the CSS keyframes handle movement without scroll handlers.
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
    basics: [
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

  if (!reducedMotion) {
    Object.entries(particleScenes).forEach(([sceneName, particles]) => {
      const section = document.getElementById(sceneName);
      const layer = section?.querySelector('.ambient-particles');
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
        img.loading = 'lazy';
        particle.appendChild(img);
        layer.appendChild(particle);
      });
    });
  }

  // Gentle parallax on two separate watercolor panoramas. The images are independent
  // scenic artworks, so they move individually instead of pretending to be matched layers.
  const parallaxScenes = [...document.querySelectorAll('[data-parallax-scene]')];
  if (!reducedMotion && parallaxScenes.length) {
    let rafPending = false;
    const updateParallax = () => {
      parallaxScenes.forEach((scene) => {
        const rect = scene.getBoundingClientRect();
        if (rect.bottom < -80 || rect.top > window.innerHeight + 80) return;
        const strength = Number(scene.dataset.parallaxStrength || 12);
        const centerOffset = (rect.top + rect.height / 2 - window.innerHeight / 2) / Math.max(window.innerHeight, 1);
        const shift = Math.max(-strength, Math.min(strength, -centerOffset * strength));
        scene.style.setProperty('--parallax-y', `${shift.toFixed(1)}px`);
      });
      rafPending = false;
    };
    const requestParallax = () => {
      if (rafPending) return;
      rafPending = true;
      window.requestAnimationFrame(updateParallax);
    };
    window.addEventListener('scroll', requestParallax, { passive: true });
    window.addEventListener('resize', requestParallax, { passive: true });
    requestParallax();
  }

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
