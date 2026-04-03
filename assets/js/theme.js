(function () {
  const THEME_KEY = 'wayv-theme';
  const root = document.documentElement;

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function syncThemeControls(theme) {
    const isLight = theme === 'light';
    document.querySelectorAll('[data-theme-icon="sun"]').forEach((el) => {
      el.classList.toggle('hidden', isLight);
    });
    document.querySelectorAll('[data-theme-icon="moon"]').forEach((el) => {
      el.classList.toggle('hidden', !isLight);
    });
    document.querySelectorAll('[data-theme-label]').forEach((el) => {
      el.textContent = isLight ? 'Light' : 'Dark';
    });
  }

  function commitTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    syncThemeControls(theme);
  }

  function getOriginFromTrigger(triggerEl) {
    if (!triggerEl || typeof triggerEl.getBoundingClientRect !== 'function') return null;
    const rect = triggerEl.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }

  function setTransitionVars(origin) {
    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? window.innerHeight / 2;

    const maxX = Math.max(x, window.innerWidth - x);
    const maxY = Math.max(y, window.innerHeight - y);
    const radius = Math.hypot(maxX, maxY);

    root.style.setProperty('--theme-transition-x', `${x}px`);
    root.style.setProperty('--theme-transition-y', `${y}px`);
    root.style.setProperty('--theme-transition-radius', `${radius}px`);
  }

  function clearTransitionVars() {
    root.style.removeProperty('--theme-transition-x');
    root.style.removeProperty('--theme-transition-y');
    root.style.removeProperty('--theme-transition-radius');
  }

  function applyTheme(theme, options = {}) {
    const normalized = theme === 'light' ? 'light' : 'dark';
    const current = root.getAttribute('data-theme') || getPreferredTheme();
    const wantsTransition = options.transition === true && current !== normalized;
    const supportsViewTransitions = typeof document.startViewTransition === 'function';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!wantsTransition || !supportsViewTransitions || reduceMotion) {
      commitTheme(normalized);
      return;
    }

    const directionClass = normalized === 'light' ? 'to-light' : 'to-dark';
    setTransitionVars(options.origin);
    root.classList.add('theme-transitioning', directionClass);

    const transition = document.startViewTransition(() => {
      commitTheme(normalized);
    });

    transition.finished
      .catch(() => {})
      .finally(() => {
        root.classList.remove('theme-transitioning', 'to-light', 'to-dark');
        clearTransitionVars();
      });
  }

  function toggleTheme(triggerEl) {
    const current = root.getAttribute('data-theme') || getPreferredTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next, {
      transition: true,
      origin: getOriginFromTrigger(triggerEl),
    });
  }

  function bindThemeControls() {
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      if (button.dataset.themeBound === 'true') return;
      button.dataset.themeBound = 'true';
      button.addEventListener('click', (event) => {
        toggleTheme(event.currentTarget);
      });
    });

    applyTheme(root.getAttribute('data-theme') || getPreferredTheme());
  }

  window.WayVTheme = {
    applyTheme,
    bindThemeControls,
  };

  applyTheme(getPreferredTheme());
  document.addEventListener('DOMContentLoaded', bindThemeControls);
})();
