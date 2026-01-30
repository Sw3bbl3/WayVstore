// Dynamically loads header and footer into the page
function loadInclude(id, file, callback) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (window.lucide) lucide.createIcons();
      if (typeof callback === 'function') callback();
    });
}
document.addEventListener('DOMContentLoaded', function() {
  // Hamburger menu logic
  function setupMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!menuBtn || !mobileMenu) return;

    // Toggle menu
    menuBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileMenu.classList.contains('hidden')) {
        if (!mobileMenu.contains(e.target) && e.target !== menuBtn && !menuBtn.contains(e.target)) {
          mobileMenu.classList.add('hidden');
        }
      }
    });

    // Close menu when clicking a link inside
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  if (document.getElementById('header-include')) {
    loadInclude('header-include', 'assets/js/header.html', setupMobileMenu);
  }
  if (document.getElementById('footer-include')) {
    loadInclude('footer-include', 'assets/js/footer.html');
  }
});