function ensureGlobalThemeAssets() {
  if (!document.getElementById('wayv-theme-style')) {
    const themeStyle = document.createElement('link');
    themeStyle.id = 'wayv-theme-style';
    themeStyle.rel = 'stylesheet';
    themeStyle.href = '/assets/css/theme-system.css';
    document.head.appendChild(themeStyle);
  }

  if (!document.getElementById('wayv-theme-script')) {
    const themeScript = document.createElement('script');
    themeScript.id = 'wayv-theme-script';
    themeScript.src = '/assets/js/theme.js';
    document.head.appendChild(themeScript);
  }
}

ensureGlobalThemeAssets();

function refreshIconsAndTheme() {
  if (window.lucide) window.lucide.createIcons();
  if (window.WayVTheme) window.WayVTheme.bindThemeControls();
}

function markActiveNavigation() {
  const path = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const activeParents = new Set();

  document.querySelectorAll('#navbar .dropdown-link, #mobile-menu .menu-links a').forEach((link) => {
    const href = (link.getAttribute('href') || '').replace(/^\//, '').toLowerCase();
    if (!href || href.startsWith('http')) return;
    const isMatch = href === path || (path === '' && href === 'index.html');
    link.classList.toggle('active', isMatch);
    if (isMatch) {
      const parent = link.getAttribute('data-menu-parent');
      if (parent) activeParents.add(parent);
    }
  });

  document.querySelectorAll('[data-menu-trigger]').forEach((trigger) => {
    const key = trigger.getAttribute('data-menu-trigger');
    trigger.classList.toggle('active', activeParents.has(key));
  });
}

function setupDesktopDropdowns() {
  const groups = Array.from(document.querySelectorAll('[data-menu-group]'));
  if (!groups.length) return;

  function closeAll() {
    groups.forEach((group) => {
      group.classList.remove('open');
      const trigger = group.querySelector('[data-menu-trigger]');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  }

  groups.forEach((group) => {
    const trigger = group.querySelector('[data-menu-trigger]');
    if (!trigger || trigger.dataset.bound === 'true') return;
    trigger.dataset.bound = 'true';

    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      const isOpen = group.classList.contains('open');
      closeAll();
      if (!isOpen) {
        group.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('[data-menu-group]')) closeAll();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeAll();
  });
}

function setupRevealAnimations() {
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealEls.forEach((el, index) => {
    if (!el.style.getPropertyValue('--reveal-delay')) {
      el.style.setProperty('--reveal-delay', `${Math.min(index * 40, 280)}ms`);
    }
    observer.observe(el);
  });
}

function setupMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!menuBtn || !mobileMenu) return;

  function openMobileMenu() {
    mobileMenu.classList.remove('hidden');
    mobileMenu.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => {
      mobileMenu.classList.add('open');
    });
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    window.setTimeout(() => {
      mobileMenu.classList.add('hidden');
    }, 280);
  }

  menuBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) closeMobileMenu();
    else openMobileMenu();
  });

  const closeBtn = document.getElementById('mobile-menu-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      closeMobileMenu();
    });
  }

  document.addEventListener('click', (event) => {
    if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(event.target) && !menuBtn.contains(event.target)) {
      closeMobileMenu();
    }
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeMobileMenu());
  });

  mobileMenu.classList.add('hidden');
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
}

function loadInclude(id, file, callback) {
  return fetch(file)
    .then((response) => response.text())
    .then((data) => {
      const target = document.getElementById(id);
      if (!target) return;
      target.innerHTML = data;
      if (typeof callback === 'function') callback();
      refreshIconsAndTheme();
      markActiveNavigation();
    });
}

document.addEventListener('DOMContentLoaded', function () {
  const tasks = [];

  if (document.getElementById('header-include')) {
    tasks.push(loadInclude('header-include', '/assets/js/header.html', setupMobileMenu));
  }

  if (document.getElementById('footer-include')) {
    tasks.push(loadInclude('footer-include', '/assets/js/footer.html'));
  }

  Promise.all(tasks).finally(() => {
    refreshIconsAndTheme();
    setupDesktopDropdowns();
    setupRevealAnimations();
  });
});

