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


function return_to_top() {
	window.scrollTo(0, numberizePixels(document.querySelector('.hero-full')))
}



function max_height() {
	document.querySelectorAll('.max-height').forEach((maxHeight) => {
		maxHeight.style.height = browser.height
	})
}

function detectIE() {
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

function progressive_media() {
	document.querySelectorAll('.hero-full').forEach((hero)=>{
		let full = hero.getAttribute('data-src')
		let thumb = hero.previousElementSibling
		if (detectIE()){
			let parent = hero.parentElement
			parent.style.backgroundImage = full
			hero.style.display = 'none'
		}
		hero.addEventListener('load', ()=>{
			thumb.classList.add('hide')
		})
	})
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
	document.querySelectorAll(`.sidebar:not([id="sidebar--${variant}"])`).forEach((sidebar) => {
		sidebar.setAttribute('data-state', 'closed')
	})
	document.querySelectorAll('#sidebar--' + variant).forEach((thisSidebar) => {
		thisSidebar.setAttribute('data-state', 'open')
	})
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
	screen_size()
	max_height()
	console.log(elementSize)
	if (window.pageYOffset > 0) {
		document.querySelector('#masthead').classList.add('fade-in')
		document.querySelector('#masthead').classList.add('open')
	}
	progressive_media()

	// Load hero images _after_ everything else has loaded (including thumbnails)
	// This greatly improves page loading speeds
	document.querySelectorAll('.hero-full').forEach((hero) => {
		let src = hero.getAttribute('data-src')
		hero.setAttribute('src', src)
	})
	// END Load Hero images later

};