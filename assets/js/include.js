// include.js - Script to include header and footer across all pages

// Header HTML content
const headerHTML = `
<header class="header d-flex align-items-center sticky-top">
    <div class="container-fluid container-xl position-relative d-flex align-items-center">
              <a href="index.html" class="logo d-flex align-items-center me-auto">
        <!-- Uncomment the line below if you also wish to use an image logo -->
        <img src="assets/img/lai_logo.png" alt="Lorong AI Logo">
      </a>
        <nav id="navmenu" class="navmenu" aria-label="Main navigation">
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="events.html">Events</a></li>
                <li><a href="resources.html">Community Resources</a></li>
                <li><a href="about.html">About Us</a></li>
            </ul>
            <i class="mobile-nav-toggle d-xl-none bi bi-list" aria-label="Open mobile menu" aria-controls="navmenu" aria-expanded="false"></i>
        </nav>
        <a class="btn-getstarted" href="https://form.gov.sg/670cf4d58f92af4544f2721f">Join us!</a>
    </div>
</header>`;

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
    // Get current page filename
    let currentPage = window.location.pathname.split('/').pop();
    
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
        
        if (linkPage === currentPage) {
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
    if (!activeFound && (currentPage === 'index.html' || currentPage === '')) {
        const homeLink = document.querySelector('#navmenu a[href="index.html"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
    
    // Debug log to help troubleshoot
    console.log('Current page:', currentPage, 'Active found:', activeFound);
}

// Load everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadHeaderFooter();
});