
/**
* Template Name: Sailor
* Template URL: https://bootstrapmade.com/sailor-free-bootstrap-theme/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

function initMainJS() {
"use strict";

// Apply .scrolled class to the body as the page is scrolled down
function toggleScrolled() {
const selectBody = document.querySelector('body');
const selectHeader = document.querySelector('.header');
if (!selectHeader) return;
if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
}
document.addEventListener('scroll', toggleScrolled);
window.addEventListener('load', toggleScrolled);

// Mobile nav toggle
const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
function mobileNavToogle() {
document.querySelector('body').classList.toggle('mobile-nav-active');
if (mobileNavToggleBtn) {
mobileNavToggleBtn.classList.toggle('bi-list');
mobileNavToggleBtn.classList.toggle('bi-x');
}
}
if (mobileNavToggleBtn) {
mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
}

// Hide mobile nav on same-page/hash links
document.querySelectorAll('#navmenu a').forEach(navmenu => {
navmenu.addEventListener('click', () => {
if (document.querySelector('.mobile-nav-active')) {
mobileNavToogle();
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

// Preloader
const preloader = document.querySelector('#preloader');
if (preloader) {
window.addEventListener('load', () => {
preloader.remove();
});
}

// Scroll top button
let scrollTop = document.querySelector('.scroll-top');
function toggleScrollTop() {
if (scrollTop) {
window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
}
}
if (scrollTop) {
scrollTop.addEventListener('click', (e) => {
e.preventDefault();
window.scrollTo({
top: 0,
behavior: 'smooth'
});
});
}
window.addEventListener('load', toggleScrollTop);
document.addEventListener('scroll', toggleScrollTop);

// Animation on scroll function and init
function aosInit() {
if (typeof AOS !== 'undefined') {
AOS.init({
duration: 600,
easing: 'ease-in-out',
once: true,
mirror: false
});
}
}
window.addEventListener('load', aosInit);

// Auto generate the carousel indicators
document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
const carousel = carouselIndicator.closest('.carousel');
if (!carousel) return;
carousel.querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
if (index === 0) {
carouselIndicator.innerHTML += `<li data-bs-target="#${carousel.id}" data-bs-slide-to="${index}" class="active"></li>`;
} else {
carouselIndicator.innerHTML += `<li data-bs-target="#${carousel.id}" data-bs-slide-to="${index}"></li>`;
}
});
});

// Initiate glightbox
if (typeof GLightbox !== 'undefined') {
GLightbox({ selector: '.glightbox' });
}

// Init isotope layout and filters
if (typeof Isotope !== 'undefined' && typeof imagesLoaded !== 'undefined') {
document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

let initIsotope;
imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
itemSelector: '.isotope-item',
layoutMode: layout,
filter: filter,
sortBy: sort
});
});

isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
filters.addEventListener('click', function() {
isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
this.classList.add('filter-active');
initIsotope.arrange({
filter: this.getAttribute('data-filter')
});
if (typeof aosInit === 'function') {
aosInit();
}
}, false);
});
});
}

// Initiate Pure Counter
if (typeof PureCounter !== 'undefined') {
new PureCounter();
}

// Animate the skills items on reveal
if (typeof Waypoint !== 'undefined') {
let skillsAnimation = document.querySelectorAll('.skills-animation');
skillsAnimation.forEach((item) => {
new Waypoint({
element: item,
offset: '80%',
handler: function(direction) {
let progress = item.querySelectorAll('.progress .progress-bar');
progress.forEach(el => {
el.style.width = el.getAttribute('aria-valuenow') + '%';
});
}
});
});
}

// Init swiper sliders
function initSwiper() {
if (typeof Swiper === 'undefined') return;
document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
let config = JSON.parse(
swiperElement.querySelector(".swiper-config").innerHTML.trim()
);

if (swiperElement.classList.contains("swiper-tab")) {
initSwiperWithCustomPagination(swiperElement, config);
} else {
new Swiper(swiperElement, config);
}
});
}
window.addEventListener("load", initSwiper);

// Members section
function createMemberElement(member) {
return `
<div class="member-slide">
<a href="members.html" class="member-logo-link" aria-label="View members page">
<img src="assets/img/members/${member.src}"
class="img-fluid"
alt="${member.alt}"
loading="lazy">
</a>
</div>
`;
}

function createSlides(members) {
return members.map(member => `
<div class="swiper-slide">
${createMemberElement(member)}
</div>
`).join('');
}

// ============ MEMBERS SECTION ============
let membersSwiper = null;

async function initMembers() {
const wrapper = document.getElementById('members-wrapper');
if (!wrapper) return; // Skip if members section doesn't exist
try {
const response = await fetch('members.json');
const membersData = await response.json();
membersData.sort((a, b) => a.alt.localeCompare(b.alt));
wrapper.innerHTML = createSlides(membersData);
const startIndex = Math.floor(Math.random() * membersData.length);
membersSwiper = new Swiper('#members-swiper', {
loop: true,
initialSlide: startIndex,
speed: 1200,
autoplay: {
delay: 4000,
disableOnInteraction: false
},
allowTouchMove: false,
slidesPerView: 5,
slidesPerGroup: 3,
spaceBetween: 20,
centeredSlides: false,
loopedSlides: Math.ceil(membersData.length / 3) * 3,
loopAdditionalSlides: Math.ceil(membersData.length / 3) * 3,
breakpoints: {
0: {
slidesPerView: 1,
slidesPerGroup: 1
},
480: {
slidesPerView: 2,
slidesPerGroup: 2
},
768: {
slidesPerView: 3,
slidesPerGroup: 3
},
1024: {
slidesPerView: 5,
slidesPerGroup: 3
}
}
});
} catch (error) {
console.error('Failed to load members:', error);
}
}

window.addEventListener('load', initMembers);
// ============ END MEMBERS SECTION ============
// ============ SUSHI BELT — ALL MEMBER LOGOS IN TWO OPPOSING ROWS ============

// Shuffle all images, then split into two halves
const shuffled = shuffleArray([...allMemberImages]);
const half = Math.ceil(shuffled.length / 2);
const row1 = shuffled.slice(0, half);
const row2 = shuffled.slice(half);

// Build items — duplicate to create seamless loop
const items1 = row1.map(buildSushiItem).join('') + row1.map(buildSushiItem).join('');
const items2 = row2.map(buildSushiItem).join('') + row2.map(buildSushiItem).join('');

track1.innerHTML = items1;
track2.innerHTML = items2;
}



// If header is static, run on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
if (document.querySelector('.header')) {
initMainJS();
}
});
