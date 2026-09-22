(function () {
  'use strict';

  /* ---------------------------------------------------------
     Sticky header background on scroll
  --------------------------------------------------------- */
  var header = document.getElementById('site-header');
  function onScrollHeader() {
    if (window.scrollY > 12) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ---------------------------------------------------------
     Mobile nav toggle
  --------------------------------------------------------- */
  var navToggle = document.getElementById('nav-toggle');
  var navMenu = document.getElementById('nav-menu');

  function closeMenu() {
    navToggle.classList.remove('is-open');
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', function () {
    var isOpen = navMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------------------------------------------------------
     Active section highlighting
  --------------------------------------------------------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main .section, .hero'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.dataset.section === id);
    });
  }

  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach(function (section) {
      if (section.id) sectionObserver.observe(section);
    });
  }

  /* ---------------------------------------------------------
     Scroll reveal for cards/sections
  --------------------------------------------------------- */
  var revealTargets = document.querySelectorAll(
    '.skill-card, .project-card, .cert-card, .focus-block, .timeline-card, .edu-card, .profile-link, .about-text'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------------------------------------------------
     Project detail expand/collapse
  --------------------------------------------------------- */
  document.querySelectorAll('.project-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('aria-controls');
      var panel = document.getElementById(targetId);
      var expanded = btn.getAttribute('aria-expanded') === 'true';

      btn.setAttribute('aria-expanded', String(!expanded));
      panel.hidden = expanded;
      btn.firstChild.textContent = expanded ? 'View details ' : 'Hide details ';
    });
  });

  /* ---------------------------------------------------------
     Resume fallback — check if assets/resume.pdf exists
  --------------------------------------------------------- */
  var resumeBtn = document.getElementById('resume-btn');
  if (resumeBtn) {
    fetch(resumeBtn.getAttribute('href'), { method: 'HEAD' })
      .then(function (res) {
        if (!res.ok) throw new Error('missing');
      })
      .catch(function () {
        resumeBtn.textContent = 'Resume coming soon';
        resumeBtn.removeAttribute('href');
        resumeBtn.removeAttribute('download');
        resumeBtn.setAttribute('aria-disabled', 'true');
        resumeBtn.classList.add('btn-ghost');
        resumeBtn.classList.remove('btn-secondary');
        resumeBtn.addEventListener('click', function (e) { e.preventDefault(); });
      });
  }
})();
