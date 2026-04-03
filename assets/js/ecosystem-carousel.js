(function () {
  function initCarousel(root) {
    const track = root.querySelector('[data-carousel-track]');
    const viewport = root.querySelector('[data-carousel-viewport]');
    const prevBtn = root.querySelector('[data-carousel-prev]');
    const nextBtn = root.querySelector('[data-carousel-next]');
    const dotsWrap = root.querySelector('[data-carousel-dots]');
    const slides = Array.from(root.querySelectorAll('[data-slide]'));

    if (!track || !viewport || !slides.length) return;

    let index = 0;
    let timer = null;
    let paused = false;
    let pointerStartX = null;
    const intervalMs = 4600;

    const dots = slides.map((slide, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.type = 'button';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => {
        goTo(i, true);
      });
      dotsWrap?.appendChild(dot);
      return dot;
    });

    function announceSlide() {
      const heading = slides[index].querySelector('h2')?.textContent?.trim() || `Slide ${index + 1}`;
      viewport.setAttribute('aria-label', `${heading} (${index + 1} of ${slides.length})`);
    }

    function render(announce) {
      const offset = index * -100;
      track.style.transform = `translateX(${offset}%)`;

      slides.forEach((slide, i) => {
        const active = i === index;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', active ? 'false' : 'true');
        slide.setAttribute('tabindex', active ? '0' : '-1');
      });

      dots.forEach((dot, i) => {
        const active = i === index;
        dot.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      if (announce) announceSlide();
    }

    function goTo(nextIndex, announce) {
      if (nextIndex < 0) nextIndex = slides.length - 1;
      if (nextIndex >= slides.length) nextIndex = 0;
      index = nextIndex;
      render(announce);
    }

    function next(announce) {
      goTo(index + 1, announce);
    }

    function prev(announce) {
      goTo(index - 1, announce);
    }

    function stopAutoplay() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function startAutoplay() {
      stopAutoplay();
      timer = window.setInterval(() => {
        if (!paused) next(false);
      }, intervalMs);
    }

    function pause() {
      paused = true;
    }

    function resume() {
      paused = false;
    }

    prevBtn?.addEventListener('click', () => {
      prev(true);
    });

    nextBtn?.addEventListener('click', () => {
      next(true);
    });

    viewport.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        next(true);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prev(true);
      } else if (event.key === 'Home') {
        event.preventDefault();
        goTo(0, true);
      } else if (event.key === 'End') {
        event.preventDefault();
        goTo(slides.length - 1, true);
      } else if (event.key === 'Enter' || event.key === ' ') {
        const link = slides[index].dataset.link;
        if (link) {
          event.preventDefault();
          window.location.href = link;
        }
      }
    });

    root.addEventListener('mouseenter', pause);
    root.addEventListener('mouseleave', resume);
    root.addEventListener('focusin', pause);
    root.addEventListener('focusout', (event) => {
      if (!root.contains(event.relatedTarget)) resume();
    });

    viewport.addEventListener('pointerdown', (event) => {
      pointerStartX = event.clientX;
    });

    viewport.addEventListener('pointerup', (event) => {
      if (pointerStartX === null) return;
      const delta = event.clientX - pointerStartX;
      pointerStartX = null;
      if (Math.abs(delta) < 45) return;
      if (delta < 0) next(true);
      else prev(true);
    });

    slides.forEach((slide, i) => {
      slide.addEventListener('click', (event) => {
        if (event.target.closest('a')) return;
        if (i !== index) {
          goTo(i, true);
          return;
        }
        const link = slide.dataset.link;
        if (link) window.location.href = link;
      });
    });

    render(true);
    startAutoplay();
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-carousel]').forEach((carousel) => {
      initCarousel(carousel);
    });
  });
})();
