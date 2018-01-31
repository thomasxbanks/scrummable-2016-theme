var body = document.body,
    html = document.documentElement;

let document_height = () => {
	return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
};

// What are the browser dimensions?
let browser = {
	width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
	height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
};

let elementSize = {
	colophon: {
		height: document.querySelector('#colophon').clientHeight
	},
	masthead: {
		height: document.querySelector('#masthead').clientHeight
	}

	// https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/

};function scrollIt(destination, duration = 200, easing = 'linear', callback) {

	const easings = {
		linear(t) {
			return t;
		},
		easeInQuad(t) {
			return t * t;
		},
		easeOutQuad(t) {
			return t * (2 - t);
		},
		easeInOutQuad(t) {
			return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
		},
		easeInCubic(t) {
			return t * t * t;
		},
		easeOutCubic(t) {
			return --t * t * t + 1;
		},
		easeInOutCubic(t) {
			return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
		},
		easeInQuart(t) {
			return t * t * t * t;
		},
		easeOutQuart(t) {
			return 1 - --t * t * t * t;
		},
		easeInOutQuart(t) {
			return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
		},
		easeInQuint(t) {
			return t * t * t * t * t;
		},
		easeOutQuint(t) {
			return 1 + --t * t * t * t * t;
		},
		easeInOutQuint(t) {
			return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
		}
	};

	const start = window.pageYOffset;
	const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

	const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
	const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
	const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
	const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

	if ('requestAnimationFrame' in window === false) {
		window.scroll(0, destinationOffsetToScroll);
		if (callback) {
			callback();
		}
		return;
	}

	function scroll() {
		const now = 'now' in window.performance ? performance.now() : new Date().getTime();
		const time = Math.min(1, (now - startTime) / duration);
		const timeFunction = easings[easing](time);
		window.scroll(0, Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start));

		if (window.pageYOffset === destinationOffsetToScroll) {
			if (callback) {
				callback();
			}
			return;
		}

		requestAnimationFrame(scroll);
	}

	scroll();
}

function debouncer(func, timeout) {
	var timeoutID,
	    timeout = timeout || 200;
	return function () {
		var scope = this,
		    args = arguments;
		clearTimeout(timeoutID);
		timeoutID = setTimeout(function () {
			func.apply(scope, Array.prototype.slice.call(args));
		}, timeout);
	};
}

let numberizePixels = element => {
	let elementHeight = window.getComputedStyle(element).getPropertyValue('height');
	return ~~elementHeight.substr(0, elementHeight.length - 2);
};

let return_to_top = () => {
	scrollIt(numberizePixels(document.querySelector('.hero-full')), 300, 'easeOutQuad');
};

let max_height = () => {
	let maxHeightElements = document.querySelectorAll('.max-height');
	for (var i = 0; i < maxHeightElements.length; i++) {
		maxHeightElements[i].style.height = browser.height;
	}
};

const detectIE = () => {
	var ua = window.navigator.userAgent;

	// Test values; Uncomment to check result …

	// IE 10
	// ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

	// IE 11
	// ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

	// IE 12 / Spartan
	// ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

	// Edge (IE 12+)
	// ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
		// IE 11 => return version number
		var rv = ua.indexOf('rv:');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	var edge = ua.indexOf('Edge/');
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
			let vaporise = document.querySelector('.vaporise .hero__title');
			let parallax = document.querySelector('.vaporise .hero-full');
			let opacity = 1 - scroll / 1000 > 0 ? 1 - scroll / 1000 : 0;
			let scale = 1 + scroll / 1000 > 1 ? 1 + scroll / 1000 : 1;
			let blur = 1 + scroll / 10 > 1 ? 1 + scroll / 100 : 0;
			parallax.style.transform = `translate3d(0, ${0 + scroll / 2}px, 0)`;
			vaporise.style.opacity = opacity;
			vaporise.style.transform = `scale(${scale})`;
			vaporise.style.filter = `blur(${blur}px)`;
		}
	}
}

function sidebar(variant) {
	let otherSidebars = document.querySelectorAll(`.sidebar:not([id="sidebar--${variant}"])`);
	otherSidebars.forEach(otherSidebar => {
		otherSidebar.setAttribute('data-state', 'closed');
	});
	document.querySelector('#sidebar--' + variant).setAttribute('data-state', 'open');
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

function global_functions() {
	document_height();
	max_height();
	if (window.pageYOffset > 0) {
		document.querySelector('#masthead').classList.add('fade-in');
		document.querySelector('#masthead').classList.add('open');
	}
}

// Functions on load

// onLoad operations
window.onload = () => {

	global_functions();
	// Load hero images _after_ everything else has loaded (including thumbnails)
	// This greatly improves page loading speeds
	let heroImages = document.querySelectorAll('.hero-full');
	heroImages.forEach(heroImage => {
		let src = heroImage.getAttribute('data-src');
		let thumb = heroImage.previousElementSibling;
		if (detectIE()) {
			heroImage.parentElement.style.backgroundImage = 'url("' + src + '")';
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
var CurrentScroll = 0;

window.onscroll = function () {

	var scroll = window.pageYOffset;

	// log for debug
	//console.log(browser.height, scroll);
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

	// 	const measurements = () => {
	// return `document_height: ${document_height()}\n
	// scroll: ${scroll}\n
	// browser.height: ${browser.height}`
	// 	}
	// console.log(measurements())

	//console.log("doc_height: "+document_height+". \browser.height: "+browser.height+". \ndoc - screen: "+(document_height - (browser.height * 2))+". scroll: "+scroll)

	if (scroll > document_height() - browser.height * 2) {
		document.querySelector('button#return_to_top').setAttribute('data-state', 'is-shown');
	} else {
		document.querySelector('button#return_to_top').setAttribute('data-state', 'not-shown');
	}

	// close nav on scroll
	let sidebars = document.querySelectorAll('.sidebar');
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

	CurrentScroll = scroll; //Updates current scroll position
};

// Mobile Nav Controls
let navButtons = document.querySelectorAll('.nav-icon button');
navButtons.forEach(navButton => {
	navButton.addEventListener('click', e => {
		let variant = e.currentTarget.getAttribute('data-sidebar');
		if (variant !== 'skip-link') {
			let currentState = document.querySelector(`#sidebar--${variant}`).getAttribute('data-state');
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
	global_functions();
};

let anchors = document.querySelectorAll('a[href^="#"]');
anchors.forEach(anchor => {
	anchor.addEventListener('click', e => {
		scrollIt(document.querySelector(e.currentTarget.getAttribute('href').split('#')[1]), 300, 'easeOutQuad');
	});
});
