'use strict';

const body = document.body;
const html = document.documentElement;

const documentHeight = () => Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

// What are the browser dimensions?
const browser = {
  width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
  height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
};

const elementSize = {
  colophon: {
    height: document.querySelector('#colophon').clientHeight
  },
  masthead: {
    height: document.querySelector('#masthead').clientHeight
  }
};

function debouncer(func, timeout) {
  let timeoutID;
  timeout = timeout || 200;
  return function () {
    const args = arguments;
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      func.apply(this, Array.prototype.slice.call(args));
    }, timeout);
  };
}

const numberizePixels = element => {
  const elementHeight = window.getComputedStyle(element).getPropertyValue('height');
  return ~~elementHeight.substr(0, elementHeight.length - 2);
};

const skipToContent = () => {
  window.location.href = "#content";
};

const maxHeight = () => {
  const maxHeightElements = document.querySelectorAll('.max-height');
  for (let i = 0; i < maxHeightElements.length; i++) {
    maxHeightElements[i].style.height = browser.height;
  }
};

const detectIE = () => {
  const ua = window.navigator.userAgent;

  // Test values; Uncomment to check result …

  // IE 10
  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

  // IE 11
  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

  // IE 12 / Spartan
  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

  // Edge (IE 12+)
  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

  const msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  const trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    const rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  const edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
};

function vaporise(scroll) {
  if (document.querySelector('.vaporise')) {
    if (scroll < browser.height) {
      const vaporiseText = document.querySelector('.vaporise .hero__title');
      const parallax = document.querySelector('.vaporise .hero-full');
      const opacity = 1 - scroll / 1000 > 0 ? 1 - scroll / 1000 : 0;
      const scale = 1 + scroll / 1000 > 1 ? 1 + scroll / 1000 : 1;
      const blur = 1 + scroll / 10 > 1 ? 1 + scroll / 100 : 0;
      parallax.style.transform = `translate3d(0, ${0 + scroll / 2}px, 0)`;
      vaporiseText.style.opacity = opacity;
      vaporiseText.style.transform = `scale(${scale})`;
      vaporiseText.style.filter = `blur(${blur}px)`;
    }
  }
}

function sidebar(variant) {
  const otherSidebars = document.querySelectorAll(`.sidebar:not([id="sidebar--${variant}"])`);
  otherSidebars.forEach(otherSidebar => {
    otherSidebar.setAttribute('data-state', 'closed');
  });
  document.querySelector(`#sidebar--${variant}`).setAttribute('data-state', 'open');
}

function bsod() {
  if (document.querySelector('.error404')) {
    document.querySelector('#bsod').style.transition = 'opacity ease-in 500ms';
    setTimeout(() => {
      document.querySelector('#bsod').style.opacity = 0;
      setTimeout(() => {
        document.querySelector('#bsod').outerHTML = '';
      }, 1000);
    }, 2000);
  }
}

function globalFunctions() {
  documentHeight();
  maxHeight();
  if (window.pageYOffset > 0) {
    document.querySelector('#masthead').classList.add('fade-in');
    document.querySelector('#masthead').classList.add('open');
  }
}

// Functions on load

// onLoad operations
window.onload = () => {
  globalFunctions();
  // Load hero images _after_ everything else has loaded (including thumbnails)
  // This greatly improves page loading speeds
  const heroImages = document.querySelectorAll('.hero-full');
  heroImages.forEach(heroImage => {
    const src = heroImage.getAttribute('data-src');
    const thumb = heroImage.previousElementSibling;
    if (detectIE()) {
      heroImage.parentElement.style.backgroundImage = `url("${src}")`;
      thumb.classList.add('hide');
    } else {
      heroImage.setAttribute('src', src);
      heroImage.onload = () => {
        thumb.classList.add('hide');
      };
    }
  });

  // END Load Hero images later
};

// If Browser is Internet Explorer or Edge
if (detectIE()) {
  document.querySelector('html').classList.add('is-ie');
} else {
  document.querySelector('html').classList.add('not-ie');
}

// Functions on Scroll
let CurrentScroll = 0;

window.onscroll = function () {
  const scroll = window.pageYOffset;

  // log for debug
  // console.log(browser.height, scroll);
  // Show/hide Masthead
  if (scroll > browser.height / 2) {
    document.querySelector('#masthead').classList.add('open');
  } else {
    document.querySelector('#masthead').classList.remove('open');
  }

  if (scroll > browser.height) {
    document.querySelector('.scroll-up').setAttribute('data-state', 'shown');
    document.querySelector('.scroll-down').setAttribute('data-state', 'hidden');
  } else {
    document.querySelector('.scroll-up').setAttribute('data-state', 'hidden');
    document.querySelector('.scroll-down').setAttribute('data-state', 'shown');
  }

  if (scroll > documentHeight() - browser.height * 2) {
    document.querySelector('button#return_to_top').setAttribute('data-state', 'is-shown');
  } else {
    document.querySelector('button#return_to_top').setAttribute('data-state', 'not-shown');
  }

  // close nav on scroll
  const sidebars = document.querySelectorAll('.sidebar');
  sidebars.forEach(sidebar => {
    sidebar.setAttribute('data-state', 'closed');
  });

  // Vaporise headers
  vaporise(scroll);

  // Directional scroll

  if (scroll > CurrentScroll) {
    // Scroll down the page

    document.querySelector('#masthead').classList.add('slide-away');
  } else {
    // Scroll up the page
    document.querySelector('#masthead').classList.remove('slide-away');
  }

  CurrentScroll = scroll; // Updates current scroll position
};

// Mobile Nav Controls
const navButtons = document.querySelectorAll('.nav-icon .button');
navButtons.forEach(navButton => {
  navButton.addEventListener('click', e => {
    // console.log(e.currentTarget)
    const variant = e.currentTarget.getAttribute('data-sidebar');
    if (variant !== 'skip-link') {
      const currentState = document.querySelector(`#sidebar--${variant}`).getAttribute('data-state');
      if (currentState === 'open') {
        sidebar('all');
      } else {
        sidebar(variant);
      }
    }
  });
});

// end Mobile Nav Controls

// 404 page overlay
bsod();

// Functions on resize
window.onresize = function (e) {
  // onResize operations
  globalFunctions();
};
