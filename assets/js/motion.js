(function () {
  const GSAP_CORE_URL = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js';
  const GSAP_SCROLL_TRIGGER_URL = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js';

  let initialized = false;
  let fallbackObserver = null;
  let parallaxBound = false;

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function isSmallViewport() {
    return window.matchMedia('(max-width: 1020px)').matches;
  }

  function loadScriptOnce(id, src) {
    return new Promise((resolve, reject) => {
      const existing = document.getElementById(id);
      if (existing) {
        if (existing.dataset.loaded === 'true') {
          resolve();
          return;
        }
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error('Failed to load script')), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.id = id;
      script.src = src;
      script.async = true;
      script.addEventListener('load', () => {
        script.dataset.loaded = 'true';
        resolve();
      });
      script.addEventListener('error', () => reject(new Error('Failed to load script')));
      document.head.appendChild(script);
    });
  }

  function revealAllImmediately() {
    document.querySelectorAll('[data-reveal], [data-stagger]').forEach((el) => {
      el.classList.add('is-visible');
    });
  }

  function setupFallbackObserver() {
    if (fallbackObserver) return;

    fallbackObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.14 }
    );

    document.querySelectorAll('[data-reveal], [data-stagger]').forEach((el) => {
      fallbackObserver.observe(el);
    });
  }

  function setupFallbackParallax() {
    if (parallaxBound || prefersReducedMotion()) return;

    const elements = Array.from(document.querySelectorAll('[data-parallax]'));
    if (!elements.length) return;

    parallaxBound = true;

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    let rafId = null;

    function updateParallax() {
      rafId = null;
      const viewportHeight = window.innerHeight || 1;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const speed = parseFloat(el.dataset.speed || '0.16');
        const centerDelta = rect.top + rect.height * 0.5 - viewportHeight * 0.5;
        const normalized = clamp(centerDelta / viewportHeight, -1, 1);
        const y = normalized * speed * -72;
        el.style.transform = 'translate3d(0, ' + y.toFixed(2) + 'px, 0)';
      });
    }

    function requestUpdate() {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(updateParallax);
    }

    updateParallax();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
  }

  function setupGSAP() {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (!gsap || !ScrollTrigger) {
      setupFallbackObserver();
      setupFallbackParallax();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add('motion-ready');

    gsap.utils.toArray('[data-reveal]').forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.86,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 84%',
            once: true,
            onEnter: () => element.classList.add('is-visible'),
          },
        }
      );
    });

    gsap.utils.toArray('[data-stagger]').forEach((container) => {
      const items = Array.from(container.children);
      if (!items.length) return;

      gsap.fromTo(
        items,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.84,
          stagger: 0.09,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 82%',
            once: true,
            onEnter: () => container.classList.add('is-visible'),
          },
        }
      );
    });

    gsap.utils.toArray('[data-scene]').forEach((scene) => {
      const shouldPin = scene.hasAttribute('data-scene-pin') && !isSmallViewport();

      if (shouldPin) {
        ScrollTrigger.create({
          trigger: scene,
          start: 'top top',
          end: () => '+=' + Math.round(window.innerHeight * 1.18),
          pin: true,
          pinSpacing: true,
          scrub: 0.68,
          anticipatePin: 1,
        });
      }

      const sceneLayers = scene.querySelectorAll('[data-scene-layer]');
      sceneLayers.forEach((layer) => {
        const depth = parseFloat(layer.getAttribute('data-scene-layer') || '1');
        const startY = 34 * depth;
        const endY = -28 * depth;

        gsap.fromTo(
          layer,
          { y: startY, opacity: 0.56 },
          {
            y: endY,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: scene,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    });

    gsap.utils.toArray('[data-parallax]').forEach((element) => {
      const speed = parseFloat(element.dataset.speed || '0.16');
      const range = speed * 100;
      const scene = element.closest('[data-scene]') || element;

      gsap.fromTo(
        element,
        { yPercent: range * 0.45 },
        {
          yPercent: range * -0.45,
          ease: 'none',
          scrollTrigger: {
            trigger: scene,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });

    ScrollTrigger.refresh();
  }

  function init() {
    if (initialized) {
      if (window.ScrollTrigger && typeof window.ScrollTrigger.refresh === 'function') {
        window.ScrollTrigger.refresh();
      }
      return;
    }

    initialized = true;

    if (prefersReducedMotion()) {
      revealAllImmediately();
      return;
    }

    Promise.resolve()
      .then(() => loadScriptOnce('wayv-gsap-core', GSAP_CORE_URL))
      .then(() => loadScriptOnce('wayv-gsap-scrolltrigger', GSAP_SCROLL_TRIGGER_URL))
      .then(() => {
        setupGSAP();
      })
      .catch(() => {
        setupFallbackObserver();
        setupFallbackParallax();
      });
  }

  window.WayVMotion = {
    init,
    refresh: function () {
      if (window.ScrollTrigger && typeof window.ScrollTrigger.refresh === 'function') {
        window.ScrollTrigger.refresh();
      }
    },
  };
})();
