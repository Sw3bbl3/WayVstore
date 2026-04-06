(function () {
  function initHomeHeroCarousel() {
    const heroRoot = document.querySelector('.home-hero');
    const textRoot = document.querySelector('[data-home-carousel-text]');
    const mediaEl = document.querySelector('[data-home-carousel-media]');
    const progress = document.querySelector('[data-home-carousel-progress]');
    if (!heroRoot || !textRoot || !mediaEl) return;

    const textSlides = Array.from(textRoot.querySelectorAll('[data-home-slide]'));
    const dots = Array.from(document.querySelectorAll('[data-home-carousel-dot]'));
    const mediaItems = [
      {
        darkSrc: '/assets/images/laptop-orion-dark-cutout.png',
        lightSrc: '/assets/images/laptop-orion-light-cutout.png',
        alt: 'Orion DAW on laptop',
        className: 'home-feature-media media-laptop',
      },
      {
        src: '/assets/images/wave-engine-logo.svg',
        alt: 'Wave Engine logo',
        className: 'home-feature-media media-logo',
      },
      {
        src: '/assets/images/waveos-logo-rectangle.svg',
        alt: 'WaveOS logo',
        className: 'home-feature-media media-logo waveos-logo',
      },
    ];

    if (!textSlides.length || textSlides.length !== mediaItems.length) return;
    heroRoot.classList.add('home-carousel-ready');

    let activeIndex = 0;
    let timerId = null;
    const intervalMs = 5200;

    function isLightTheme() {
      const explicitTheme = document.documentElement.getAttribute('data-theme');
      if (explicitTheme === 'light') return true;
      if (explicitTheme === 'dark') return false;
      return window.matchMedia('(prefers-color-scheme: light)').matches;
    }

    function getMediaSrc(mediaItem) {
      if (mediaItem.src) return mediaItem.src;
      return isLightTheme() ? mediaItem.lightSrc : mediaItem.darkSrc;
    }

    function setActive(nextIndex) {
      activeIndex = (nextIndex + textSlides.length) % textSlides.length;
      heroRoot.setAttribute('data-active-index', String(activeIndex));

      textSlides.forEach((slide, idx) => {
        const isActive = idx === activeIndex;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
      });

      const media = mediaItems[activeIndex];
      mediaEl.src = getMediaSrc(media);
      mediaEl.alt = media.alt;
      mediaEl.className = media.className;

      dots.forEach((dot, idx) => {
        const isActive = idx === activeIndex;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-selected', String(isActive));
      });

      if (progress) {
        progress.style.transition = 'none';
        progress.style.transform = 'scaleX(0)';
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            progress.style.transition = 'transform ' + intervalMs + 'ms linear';
            progress.style.transform = 'scaleX(1)';
          });
        });
      }
    }

    function stopAutoRotate() {
      if (timerId !== null) {
        window.clearInterval(timerId);
        timerId = null;
      }
    }

    function startAutoRotate() {
      stopAutoRotate();
      timerId = window.setInterval(() => {
        setActive(activeIndex + 1);
      }, intervalMs);
    }

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const target = parseInt(dot.dataset.homeCarouselDot || '', 10);
        if (Number.isNaN(target)) return;
        setActive(target);
        startAutoRotate();
      });
    });

    [textRoot, mediaEl].forEach((element) => {
      element.addEventListener('mouseenter', stopAutoRotate);
      element.addEventListener('mouseleave', startAutoRotate);
      element.addEventListener('focusin', stopAutoRotate);
      element.addEventListener('focusout', startAutoRotate);
    });

    const themeObserver = new MutationObserver((mutations) => {
      const changedTheme = mutations.some(
        (mutation) => mutation.type === 'attributes' && mutation.attributeName === 'data-theme'
      );
      if (changedTheme) setActive(activeIndex);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    setActive(0);
    startAutoRotate();
  }

  document.addEventListener('DOMContentLoaded', initHomeHeroCarousel);
})();
