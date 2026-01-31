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


    // Toggle menu with animation (fullscreen)
    function openMobileMenu() {
      mobileMenu.classList.remove('hidden');
      setTimeout(() => {
        mobileMenu.classList.add('opacity-100');
        mobileMenu.classList.remove('opacity-0', 'scale-y-95');
        mobileMenu.classList.add('scale-y-100');
        mobileMenu.style.pointerEvents = 'auto';
      }, 10);
    }
    function closeMobileMenu() {
      mobileMenu.classList.remove('opacity-100', 'scale-y-100');
      mobileMenu.classList.add('opacity-0', 'scale-y-95');
      mobileMenu.style.pointerEvents = 'none';
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 300);
    }
    menuBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = mobileMenu.classList.contains('opacity-100');
      if (!isOpen) {
        openMobileMenu();
      } else {
        closeMobileMenu();
      }
    });

    // X button closes menu
    const closeBtn = document.getElementById('mobile-menu-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeMobileMenu();
      });
    }


    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileMenu.classList.contains('hidden')) {
        if (!mobileMenu.contains(e.target) && e.target !== menuBtn && !menuBtn.contains(e.target)) {
          closeMobileMenu();
        }
      }
    });


    // Close menu when clicking a link inside
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        closeMobileMenu();
      });
    });

    // Initial state
    mobileMenu.classList.add('opacity-0', 'scale-y-95');
    mobileMenu.classList.remove('opacity-100', 'scale-y-100');
    mobileMenu.style.pointerEvents = 'none';
  }

  if (document.getElementById('header-include')) {
    loadInclude('header-include', '/assets/js/header.html', setupMobileMenu);
  }
  if (document.getElementById('footer-include')) {
    loadInclude('footer-include', '/assets/js/footer.html');
  }
});