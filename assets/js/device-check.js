(function () {
  const TESTFLIGHT_URL = 'https://testflight.apple.com/join/CjqYMZ4J';
  const FALLBACK_URL = '/tapmood-iphone-only.html';

  const isIphone = () => /iPhone/i.test(navigator.userAgent || navigator.vendor || window.opera);

  const guardBetaLinks = () => {
    const links = document.querySelectorAll(`a[href="${TESTFLIGHT_URL}"]`);

    if (!links.length) return;

    links.forEach((link) => {
      if (link.dataset.betaGuarded === 'true') return;

      link.addEventListener('click', (event) => {
        if (isIphone()) return;

        event.preventDefault();
        window.location.href = FALLBACK_URL;
      });

      link.dataset.betaGuarded = 'true';
    });
  };

  const init = () => {
    guardBetaLinks();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('partials:loaded', init);
})();
