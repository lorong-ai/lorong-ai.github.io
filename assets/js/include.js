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
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    
    /* Matches the 8px rounding of the "Join Us" button */
    border-radius: 8px; 
    
    padding: 0.5rem 1rem;
    
    /* Centralized and tightly wrapped */
    width: fit-content;
    max-width: 92vw;
    
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: center; /* Centers contents since we are using fit-content */
    gap: 3rem; /* Adds even spacing between Logo, Nav, and CTA */
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
    /* Increased by ~10% */
    max-height: 46px; 
    transition: transform 0.3s ease;
  }

  .floating-header .navmenu {
    display: flex;
    justify-content: center;
  }

  .floating-header .navmenu ul {
    margin: 0;
    padding: 0;
    display: flex;
    list-style: none;
    align-items: center;
    gap: 1.5rem;
  }

  .floating-header .navmenu a {
    color: #1a1a1a;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 0.95rem;
    text-decoration: none;
    transition: color 0.3s;
  }

  .floating-header .navmenu a:hover,
  .floating-header .navmenu a.active {
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
    white-space: nowrap;i
  }

  .floating-header .btn-getstarted:hover {
    background: #0f803a;
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(19, 155, 72, 0.2);
  }

  /* Mobile responsiveness */
  @media (max-width: 1199px) {
    .floating-header {
      gap: 1.5rem; /* Reduce gap on medium screens */
    }
    .floating-header .navmenu ul {
      display: none; /* Hide default nav on mobile, handled by mobile toggle */
    }
  }

  @media (max-width: 768px) {
    .floating-header-wrapper {
      top: 1rem;
    }
    .floating-header {
      width: 95%;
      padding: 0.5rem 1rem;
      gap: 1rem; /* Tighten gap for mobile */
      justify-content: space-between; /* Spread elements out on tiny screens */
    }
    .floating-header .btn-getstarted {
      padding: 0.5rem 1rem;
      font-size: 0.85rem;
    }
    .floating-header .logo-container img {
      max-height: 38px; /* Slightly smaller on mobile */
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
      
      <nav id="navmenu" class="navmenu" aria-label="Main navigation">
          <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="events.html">Events</a></li>
              <li><a href="resources.html">Resources</a></li>
              <li><a href="about.html">About Us</a></li>
          </ul>
          <i class="mobile-nav-toggle d-xl-none bi bi-list" aria-label="Open mobile menu" aria-controls="navmenu" aria-expanded="false"></i>
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

    // Initialize JavaScript functionality after loading
    if (typeof initMainJS === 'function') {
        initMainJS();
    } else {
        // Fallback initialization
        initializeBasicNavigation();
    }
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