// include.js - Script to include header and footer across all pages

// Header HTML content with embedded floating CSS
const headerHTML = `
<style>
  /* Sleek Floating Translucent Header */
  .floating-header-wrapper {
    position: fixed;
    top: 1.5rem;
    left: 0;
    width: 100%;
    z-index: 9999;
    display: flex;
    justify-content: center;
    pointer-events: none; /* Allows clicks to pass through the empty space */
  }

  .floating-header {
    pointer-events: auto; /* Re-enables clicks on the actual header bar */
    position: relative;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 8px; 
    padding: 0.5rem 1rem;
    width: fit-content;
    max-width: 92vw;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    transition: all 0.3s ease;
  }

  /* When page is scrolled, make it slightly more opaque */
  body.scrolled .floating-header {
    background: rgba(255, 255, 255, 0.92);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  }

  .floating-header .logo-container {
    display: flex;
    justify-content: flex-start;
  }
  
  .floating-header .logo-container img {
    max-height: 46px; 
    transition: transform 0.3s ease;
  }

  .floating-header .floating-navmenu {
    display: flex;
    justify-content: center;
  }

  .floating-header .floating-navmenu ul {
    margin: 0;
    padding: 0;
    display: flex;
    list-style: none;
    align-items: center;
    gap: 1.5rem;
  }

  .floating-header .floating-navmenu a {
    color: #1a1a1a;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 0.95rem;
    text-decoration: none;
    transition: color 0.3s;
  }

  .floating-header .floating-navmenu a:hover,
  .floating-header .floating-navmenu a.active {
    color: #139B48; /* Lorong Primary Green */
  }

  .floating-header .header-cta {
    display: flex;
    justify-content: flex-end;
  }

  .floating-header .btn-getstarted {
    background: #139B48;
    color: #fff;
    border: none;
    
    /* Ensure this also matches the 8px rounding */
    border-radius: 8px; 
    
    padding: 0.5rem 1.1rem;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 0.9rem;
    text-decoration: none;
    transition: all 0.3s ease;
    white-space: nowrap;
  }

  .floating-header .btn-getstarted:hover {
    background: #0f803a;
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(19, 155, 72, 0.2);
  }

  .floating-header .floating-nav-toggle {
    color: #556270;
    cursor: pointer;
    font-size: 1.9rem;
    line-height: 1;
    padding: 0.35rem;
  }

  @media (max-width: 1199px) {
    .floating-header {
      gap: 1.5rem; /* Reduce gap on medium screens */
    }
    .floating-header .floating-navmenu ul {
      display: none;
      position: absolute;
      top: calc(100% + 0.55rem);
      left: 50%;
      transform: translateX(-50%);
      width: min(320px, calc(100vw - 2rem));
      padding: 0.5rem;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.98);
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.14);
      border: 1px solid rgba(19, 155, 72, 0.12);
    }
    .floating-header.is-menu-open .floating-navmenu ul {
      display: grid;
      gap: 0.25rem;
    }
    .floating-header .floating-navmenu a {
      display: flex;
      justify-content: center;
      padding: 0.75rem 0.5rem;
      border-radius: 6px;
      white-space: nowrap;
    }
    .floating-header .floating-navmenu a:hover,
    .floating-header .floating-navmenu a.active {
      background: #eef7f1;
    }
  }

  @media (max-width: 768px) {
    .floating-header-wrapper {
      top: 0;
    }
    .floating-header {
      width: 100%;
      max-width: 100%;
      padding: 0.5rem 1rem;
      justify-content: space-between;
      gap: 0.5rem;
      border-radius: 0;
    }
    .floating-header .floating-navmenu ul {
      top: calc(100% + 0.35rem);
      width: calc(100vw - 1rem);
    }
    .floating-header .btn-getstarted {
      padding: 0.45rem 0.8rem;
      font-size: 0.8rem;
    }
    .floating-header .logo-container img {
      max-height: 36px;
    }
    .floating-header .floating-nav-toggle {
      font-size: 1.75rem;
      padding: 0.25rem;
    }
  }

  @media (max-width: 380px) {
    .floating-header {
      padding: 0.45rem 0.7rem;
      gap: 0.35rem;
    }
    .floating-header .logo-container img {
      max-height: 32px;
    }
    .floating-header .btn-getstarted {
      padding: 0.4rem 0.65rem;
      font-size: 0.74rem;
    }
    .floating-header .floating-nav-toggle {
      font-size: 1.55rem;
    }
  }
</style>

<div class="floating-header-wrapper">
  <header class="floating-header">
      <div class="logo-container">
          <a href="index.html" class="logo d-flex align-items-center">
            <!-- Uncomment the line below if you also wish to use an image logo -->
            <img src="assets/img/lai_logo.png" alt="Lorong AI Logo">
          </a>
      </div>
      
      <nav id="navmenu" class="floating-navmenu" aria-label="Main navigation">
          <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="events.html">Happenings</a></li>
              <li><a href="resources.html">Archive & Insights</a></li>
              <li><a href="about.html">Our Story</a></li>
          </ul>
          <i class="floating-nav-toggle d-xl-none bi bi-list" role="button" tabindex="0" aria-label="Open menu" aria-controls="navmenu" aria-expanded="false"></i>
      </nav>
      
      <div class="header-cta">
          <a class="btn-getstarted" href="https://form.gov.sg/670cf4d58f92af4544f2721f">Join us!</a>
      </div>
  </header>
</div>`;

// Footer HTML content
const footerHTML = `
<footer id="footer" class="footer dark-background">
    <div class="container footer-content text-center">
        <!-- Social Media Icons -->
        <div class="social-icons-container">
            <a href="https://lu.ma/lorong-ai" class="social-icon" aria-label="Events Calendar"><i class="bi bi-calendar-event"></i></a>
            <a href="https://www.linkedin.com/company/lorong-ai" class="social-icon" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
            <a href="https://x.com/Lorong_AI" class="social-icon" aria-label="X (Twitter)"><i class="bi bi-twitter-x"></i></a>
        </div>
        
        <!-- Primary Navigation - Larger with pipe separators -->
        <div class="primary-menu">
            <a href="index.html">HOME</a>
            <span class="separator">|</span>
            <a href="events.html">EVENTS</a>
            <span class="separator">|</span>
            <a href="resources.html">RESOURCES</a>
            <span class="separator">|</span>
            <a href="members.html">MEMBERS</a>
            <span class="separator">|</span>
            <a href="about.html">ABOUT US</a>
        </div>
                
        <!-- Secondary Navigation - Smaller with pipe separators -->
        <!-- 
        <div class="secondary-menu">
            <a href="resources.html">Resources</a>
            <span class="separator">|</span>
            <a href="https://form.gov.sg/670cf4d58f92af4544f2721f">Join us</a>
            <span class="separator">|</span>
            <a href="about.html">About Us</a>
        </div>
        -->
    </div>
</footer>`;

// Function to load header and footer
function loadHeaderFooter() {
    // Load header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerHTML;
    }

    // Load footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
    }

    // Set active navigation item AFTER loading the HTML
    setTimeout(() => {
        setActiveNavItem();
    }, 10);

    initializeFloatingNavigation();

    // Initialize JavaScript functionality after loading
    if (typeof initMainJS === 'function') {
        initMainJS();
    } else {
        // Fallback initialization
        initializeBasicNavigation();
    }
}

function initializeFloatingNavigation() {
    const header = document.querySelector('.floating-header');
    const toggle = document.querySelector('.floating-header .floating-nav-toggle');
    const navLinks = document.querySelectorAll('#navmenu a');
    if (!header || !toggle) return;

    function setOpen(isOpen) {
        header.classList.toggle('is-menu-open', isOpen);
        toggle.classList.toggle('bi-list', !isOpen);
        toggle.classList.toggle('bi-x', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.setAttribute('aria-label', isOpen ? 'Close mobile menu' : 'Open mobile menu');
    }

    function toggleMenu(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        setOpen(!header.classList.contains('is-menu-open'));
    }

    toggle.addEventListener('click', toggleMenu);
    toggle.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            toggleMenu(event);
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => setOpen(false));
    });

    document.addEventListener('click', (event) => {
        if (!header.contains(event.target)) {
            setOpen(false);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1200) {
            setOpen(false);
        }
    });
}

// Basic navigation initialization (fallback)
function initializeBasicNavigation() {
    // Mobile nav toggle
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    
    function mobileNavToggle() {
        document.querySelector('body').classList.toggle('mobile-nav-active');
        if (mobileNavToggleBtn) {
            mobileNavToggleBtn.classList.toggle('bi-list');
            mobileNavToggleBtn.classList.toggle('bi-x');
        }
    }
    
    if (mobileNavToggleBtn) {
        mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
    }

    // Hide mobile nav on same-page/hash links
    document.querySelectorAll('#navmenu a').forEach(navmenu => {
        navmenu.addEventListener('click', () => {
            if (document.querySelector('.mobile-nav-active')) {
                mobileNavToggle();
            }
        });
    });

    // Toggle mobile nav dropdowns
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
        navmenu.addEventListener('click', function(e) {
            e.preventDefault();
            this.parentNode.classList.toggle('active');
            if (this.parentNode.nextElementSibling) {
                this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
            }
            e.stopImmediatePropagation();
        });
    });
}

// Set active navigation item - IMPROVED VERSION
function setActiveNavItem() {
    let currentPage = window.location.pathname;
    
    // Handle empty or root path
    if (!currentPage || currentPage === '' || currentPage === '/') {
        currentPage = 'index.html';
    }
    
    // Remove any query parameters or hash
    currentPage = currentPage.split('?')[0].split('#')[0];
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('#navmenu a[href]');
    
    // Remove active class from all links first
    navLinks.forEach(link => {
        link.classList.remove('active');
        // Also remove from parent li if it exists
        if (link.parentElement && link.parentElement.tagName === 'LI') {
            link.parentElement.classList.remove('active');
        }
    });
    
    // Find and activate the matching link
    let activeFound = false;
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // Skip javascript: links and external links
        if (linkHref.startsWith('javascript:') || linkHref.startsWith('http')) {
            return;
        }
        
        // Extract filename from href
        const linkPage = linkHref.split('/').pop().split('?')[0].split('#')[0];
        
        if (linkPage === currentPage.split('/').pop()) {
            link.classList.add('active');
            activeFound = true;
            
            // Also add active to parent li for dropdown items
            if (link.parentElement && link.parentElement.tagName === 'LI') {
                link.parentElement.classList.add('active');
                
                // If this is a dropdown item, also mark parent dropdown as active
                const parentDropdown = link.closest('.dropdown');
                if (parentDropdown) {
                    const dropdownToggle = parentDropdown.querySelector('a');
                    if (dropdownToggle) {
                        dropdownToggle.classList.add('active');
                    }
                }
            }
        }
    });
    
    // Fallback: if no match found and we're on index/home, activate home
    if (!activeFound && (currentPage === 'index.html' || currentPage === '/' || currentPage === '')) {
        const homeLink = document.querySelector('#navmenu a[href="index.html"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
}

// Load everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadHeaderFooter();
});
