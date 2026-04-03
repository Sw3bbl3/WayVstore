(function () {
  const THEME_KEY = 'wayv-theme';
  const root = document.documentElement;

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    const normalized = theme === 'light' ? 'light' : 'dark';
    root.setAttribute('data-theme', normalized);
    localStorage.setItem(THEME_KEY, normalized);

    const isLight = normalized === 'light';
    document.querySelectorAll('[data-theme-icon="sun"]').forEach(el => {
      el.classList.toggle('hidden', isLight);
    });
    document.querySelectorAll('[data-theme-icon="moon"]').forEach(el => {
      el.classList.toggle('hidden', !isLight);
    });
    document.querySelectorAll('[data-theme-label]').forEach(el => {
      el.textContent = isLight ? 'Light' : 'Dark';
    });
  }

  function toggleTheme() {
    const current = root.getAttribute('data-theme') || getPreferredTheme();
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  function bindThemeControls() {
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      if (button.dataset.themeBound === 'true') return;
      button.dataset.themeBound = 'true';
      button.addEventListener('click', toggleTheme);
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
