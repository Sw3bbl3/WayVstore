(function () {
  function initEcosystemPanels(root) {
    const panels = Array.from(root.querySelectorAll('.eco-panel'));
    if (!panels.length) return;

    function setActive(panel) {
      panels.forEach((item) => item.classList.toggle('is-active', item === panel));
    }

    panels.forEach((panel, idx) => {
      panel.addEventListener('mouseenter', () => setActive(panel));
      panel.addEventListener('focusin', () => setActive(panel));

      panel.addEventListener('click', (event) => {
        const isSmall = window.matchMedia('(max-width: 1020px)').matches;
        if (isSmall && !panel.classList.contains('is-active')) {
          event.preventDefault();
          setActive(panel);
        }
      });

      if (idx === 0) setActive(panel);
    });

    root.addEventListener('mouseleave', () => {
      setActive(panels[0]);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('[data-ecosystem-panels]');
    if (root) initEcosystemPanels(root);
  });
})();
