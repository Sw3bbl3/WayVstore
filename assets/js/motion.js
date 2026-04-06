(function () {
  const state = {
    initialized: false,
    revealObserver: null,
    parallaxBound: false,
    parallaxElements: [],
    rafId: null,
  };

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function shouldRunParallax() {
    return !prefersReducedMotion() && window.matchMedia('(min-width: 1100px)').matches;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function revealAllImmediately() {
    document.querySelectorAll('[data-reveal], [data-stagger]').forEach((el) => {
      el.classList.add('is-visible');
    });
  }

  function setupRevealObserver() {
    if (prefersReducedMotion()) {
      revealAllImmediately();
      return;
    }

    const targets = Array.from(document.querySelectorAll('[data-reveal], [data-stagger]'));
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      revealAllImmediately();
      return;
    }

    if (!state.revealObserver) {
      state.revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            state.revealObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
      );
    }

    targets.forEach((target) => {
      if (!target.classList.contains('is-visible')) {
        state.revealObserver.observe(target);
      }
    });
  }

  function updateParallax() {
    state.rafId = null;

    if (!state.parallaxElements.length || !shouldRunParallax()) {
      state.parallaxElements.forEach((el) => el.style.removeProperty('transform'));
      return;
    }

    const viewportHeight = window.innerHeight || 1;

    state.parallaxElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -120 || rect.top > viewportHeight + 120) return;

      const speed = clamp(parseFloat(el.dataset.speed || '0.14'), 0.06, 0.24);
      const centerDelta = rect.top + rect.height * 0.5 - viewportHeight * 0.5;
      const normalized = clamp(centerDelta / viewportHeight, -1, 1);
      const y = normalized * speed * -56;
      el.style.transform = 'translate3d(0, ' + y.toFixed(2) + 'px, 0)';
    });
  }

  function requestParallaxUpdate() {
    if (state.rafId !== null) return;
    state.rafId = window.requestAnimationFrame(updateParallax);
  }

  function setupParallax() {
    state.parallaxElements = Array.from(document.querySelectorAll('[data-parallax]'));
    if (!state.parallaxElements.length) return;

    document.documentElement.classList.add('motion-ready');

    if (!state.parallaxBound) {
      state.parallaxBound = true;
      window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
      window.addEventListener('resize', requestParallaxUpdate);
    }

    requestParallaxUpdate();
  }

  function init() {
    if (state.initialized) {
      setupRevealObserver();
      setupParallax();
      return;
    }

    state.initialized = true;
    setupRevealObserver();
    setupParallax();
  }

  window.WayVMotion = {
    init,
    refresh: function () {
      setupRevealObserver();
      setupParallax();
      requestParallaxUpdate();
    },
  };
})();
