var body = document.body,
	  html = document.documentElement

let document_height = () => {
	return Math.max(body.scrollHeight, body.offsetHeight,
		html.clientHeight, html.scrollHeight, html.offsetHeight)
}


// What are the browser dimensions?
let browser = {
	width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
	height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
}

let elementSize = {
	colophon: {
		height: document.querySelector('#colophon').clientHeight
	},
	masthead: {
		height: document.querySelector('#masthead').clientHeight
	}
}


function debouncer(func, timeout) {
	var timeoutID, timeout = timeout || 200;
	return function () {
		var scope = this,
			args = arguments;
		clearTimeout(timeoutID);
		timeoutID = setTimeout(function () {
			func.apply(scope, Array.prototype.slice.call(args));
		}, timeout);
	}
}

let numberizePixels = (element) => {
	let elementHeight = window.getComputedStyle(element).getPropertyValue('height')
	return ~~(elementHeight.substr(0, (elementHeight.length - 2)))
}


let return_to_top = () => {
	scrollIt(
		numberizePixels(document.querySelector('.hero-full'))
	)
}

let max_height = () => {
	let maxHeightElements = document.querySelectorAll('.max-height')
	for (var i = 0; i < maxHeightElements.length; i++) {
		maxHeightElements[i].style.height = browser.height
	}
}

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
}



function vaporise(scroll) {
	if (document.querySelector('.vaporise')) {
		if (scroll < browser.height) {
			let vaporise = document.querySelector('.vaporise .hero__title')
			let parallax = document.querySelector('.vaporise .hero-full')
			let opacity = ((1 - (scroll / 1000)) > 0) ? (1 - (scroll / 1000)) : 0
			let scale = ((1 + (scroll / 1000)) > 1) ? (1 + (scroll / 1000)) : 1
			let blur = ((1 + (scroll / 10)) > 1) ? (1 + (scroll / 100)) : 0
			parallax.style.transform = `translate3d(0, ${(0 + (scroll / 2))}px, 0)`
			vaporise.style.opacity = opacity
			vaporise.style.transform = `scale(${scale})`
			vaporise.style.filter = `blur(${blur}px)`
		}
	}
}

function sidebar(variant) {
	let otherSidebars = document.querySelectorAll(`.sidebar:not([id="sidebar--${variant}"])`)
	for (var i = 0; i < otherSidebars.length; i++) {
		otherSidebars[i].setAttribute('data-state', 'closed')
	}
	document.querySelector('#sidebar--' + variant).setAttribute('data-state', 'open')
}

function bsod() {
	if (document.querySelector('.error404')) {
		document.querySelector('#bsod').style.transition = 'opacity ease-in 500ms'
		setTimeout(() => {
			document.querySelector('#bsod').style.opacity = 0
			setTimeout(() => {
				document.querySelector('#bsod').outerHTML = ''
			}, 1000)
		}, 2000)
	}
}

function global_functions() {
	document_height()
	max_height()
	if (window.pageYOffset > 0) {
		document.querySelector('#masthead').classList.add('fade-in')
		document.querySelector('#masthead').classList.add('open')
	}
}

// Functions on load

// onLoad operations
window.onload = () => {

	global_functions()
	// Load hero images _after_ everything else has loaded (including thumbnails)
	// This greatly improves page loading speeds
	let heroImages = document.querySelectorAll('.hero-full')
	for (var i = 0; i < heroImages.length; i++) {
		let src = heroImages[i].getAttribute('data-src')
		let thumb = heroImages[i].previousElementSibling
		if (detectIE()) {
			heroImages[i].parentElement.style.backgroundImage = 'url("' + src + '")'
			thumb.classList.add('hide')
		} else {
			heroImages[i].setAttribute('src', src)
			heroImages[i].onload = () => {
				thumb.classList.add('hide')
			}
		}
	}

	// END Load Hero images later
}


// If Browser is Internet Explorer or Edge
if (detectIE()) {
	document.querySelector('html').classList.add('is-ie')
} else {
	document.querySelector('html').classList.add('not-ie')
}

// Functions on Scroll
var CurrentScroll = 0;

window.onscroll = function () {


	var scroll = window.pageYOffset;

	// log for debug
	//console.log(browser.height, scroll);
	// Show/hide Masthead
	if (scroll > (browser.height / 2)) {
		document.querySelector('#masthead').classList.add('open')
	} else {
		document.querySelector('#masthead').classList.remove('open')
	}

	if (scroll > browser.height) {
		document.querySelector('.scroll-up').setAttribute('data-state', 'shown')
		document.querySelector('.scroll-down').setAttribute('data-state', 'hidden')
	} else {
		document.querySelector('.scroll-up').setAttribute('data-state', 'hidden')
		document.querySelector('.scroll-down').setAttribute('data-state', 'shown')
	}

// 	const measurements = () => {
// return `document_height: ${document_height()}\n
// scroll: ${scroll}\n
// browser.height: ${browser.height}`
// 	}
	// console.log(measurements())

	//console.log("doc_height: "+document_height+". \browser.height: "+browser.height+". \ndoc - screen: "+(document_height - (browser.height * 2))+". scroll: "+scroll)

	if (scroll > (document_height() - (browser.height * 2))) {
		document.querySelector('button#return_to_top').setAttribute('data-state', 'is-shown')
	} else {
		document.querySelector('button#return_to_top').setAttribute('data-state', 'not-shown')
	}

	// close nav on scroll
	let sidebars = document.querySelectorAll('.sidebar')
	for (var i = 0; i < sidebars.length; i++) {
		if (sidebars[i].getAttribute('data-state') === 'open') {
			sidebar('all')
		}
	}

	// Vaporise headers
	vaporise(scroll)

	// Directional scroll

	if (scroll > CurrentScroll) {
		// Scroll down the page

		document.querySelector('#masthead').classList.add('slide-away')

	} else {
		// Scroll up the page
		document.querySelector('#masthead').classList.remove('slide-away')
	}

	CurrentScroll = scroll; //Updates current scroll position

}

// Mobile Nav Controls
let navButtons = document.querySelectorAll('.nav-icon button')
for (var i = 0; i < navButtons.length; i++) {
	navButtons[i].addEventListener('click', (e) => {
		let variant = e.currentTarget.getAttribute('data-sidebar')
		let currentState = document.querySelector(`#sidebar--${variant}`).getAttribute('data-state')
		if (currentState === 'open') {
			sidebar('all')
		} else {
			sidebar(variant)
		}
	})
}
// end Mobile Nav Controls


// 404 page overlay
bsod()


// Functions on resize
window.onresize = function (e) {
	// onResize operations
	global_functions()
}

let anchors = document.querySelectorAll('a[href^="#"]')
anchors.forEach((anchor)=>{
	anchor.addEventListener('click', (e) => {
		scrollIt(
			document.querySelector(e.currentTarget.getAttribute('href').split('#')[1]),
			300,
			'easeOutQuad',
			() => console.log(`Just finished scrolling to ${window.pageYOffset}px`)
		)
	})
})