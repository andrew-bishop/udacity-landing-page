/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const navigation = document.createDocumentFragment();
const navContainer = document.getElementById('navbar__list');
const sectionList = document.querySelectorAll('section[data-nav]');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

const removeActiveClass = (elem) => {
    for (const section of sectionList) {
        if (elem !== section && section.classList.contains('section__active')) {
            section.classList.remove('section__active');
        }
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const buildNav = (container) => {
    for (const section of sectionList) {
        const navElement = document.createElement('li');
        const sectionID = section.id;
        const sectionHeading = section.getAttribute('data-nav');

        navElement.innerHTML = `<a href="#${sectionID}" class="menu__link">${sectionHeading}</a>`;
        navigation.appendChild(navElement);
    }
    container.appendChild(navigation);
}

// Add class 'active' to section when near top of viewport
const showActiveSection = () => {
    for (const section of sectionList) {
        const sectionRect= section.getBoundingClientRect();
        const sectionPositionTop = sectionRect.top;

        if (sectionPositionTop < 100 && sectionPositionTop > -100) {
            removeActiveClass(section);
            section.classList.add('section__active');
        }
    }
}

// Scroll to anchor ID using scrollTO event
const navScroll = (elem) => {
    const sectionID = elem.hash.slice(1);
    const section = document.getElementById(sectionID);

    window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
    });
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', function() {
    buildNav(navContainer);
});

// Scroll to section on link click
navContainer.addEventListener('click', function(e) {
    e.preventDefault();
    navScroll(e.target);
});

// Set sections as active
window.addEventListener('scroll', function() {
    showActiveSection();
});
