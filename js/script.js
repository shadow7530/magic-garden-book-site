'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const navMenu = document.getElementById('mainNav');
  const navToggle = document.querySelector('.nav-toggle');

  // Close the Bootstrap mobile menu after the visitor follows an in-page link.
  if (navMenu && navToggle && window.bootstrap) {
    const collapse = bootstrap.Collapse.getOrCreateInstance(navMenu, { toggle: false });
    navMenu.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 991.98px)').matches && navMenu.classList.contains('show')) {
          collapse.hide();
        }
      });
    });
  }

  // Small tactile feedback for the primary buttons.
  document.querySelectorAll('.nav-buy, .btn-magic').forEach((link) => {
    link.addEventListener('pointerdown', () => link.classList.add('is-pressed'));
    ['pointerup', 'pointerleave', 'blur', 'pointercancel'].forEach((eventName) => {
      link.addEventListener(eventName, () => link.classList.remove('is-pressed'));
    });
  });

  // Assessed JavaScript feature: Animate On Scroll (AOS).
  // If AOS fails to load or the visitor requests reduced motion, keep every element visible.
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const aosTargets = document.querySelectorAll('[data-aos]');
  if (reducedMotion || !window.AOS) {
    aosTargets.forEach((element) => element.removeAttribute('data-aos'));
    document.documentElement.classList.remove('aos-enabled');
  } else {
    document.documentElement.classList.add('aos-enabled');
    AOS.init({
      duration: 780,
      easing: 'ease-out-cubic',
      once: true,
      offset: 70,
      delay: 0,
      anchorPlacement: 'top-bottom',
      disable: false
    });
  }

  // Highlight the navigation item for the section currently in view.
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
