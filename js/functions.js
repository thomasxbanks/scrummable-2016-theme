function debouncer(func, timeout) {
	var timeoutID, timeout = timeout || 200;
	return function() {
		var scope = this,
			args = arguments;
		clearTimeout(timeoutID);
		timeoutID = setTimeout(function() {
			func.apply(scope, Array.prototype.slice.call(args));
		}, timeout);
	}
}

let numberizePixels = (element) => {
	let elementHeight = window.getComputedStyle(element).getPropertyValue('height')
	return ~~(elementHeight.substr(0,(elementHeight.length - 2)))
}

function return_to_top() {
	window.scrollTo(0, numberizePixels(document.querySelector('.hero-full')))
}



function max_height() {
	document.querySelectorAll('.max-height').forEach((maxHeight)=>{
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
	//@TODO: destroy jQuery
	$(".hero-full").each(
		function() {
			var url = $(this).attr("src");
			var thumb = $(this).prev();
			if (detectIE()) {
				var parent = $(this).parent();
				$(parent).css('background-image', 'url(' + url + ')');
				$('.hero-full').addClass('hide');
			}
			$(this).load(function() {
				$(thumb).addClass('hide');
			}).attr('src', url);
		}
	);
}

function vaporise() {
	//@TODO: destroy jQuery
	window.onscroll = function() {
      let vaporise = document.querySelector('.vaporise .hero__title')
			let parallax = document.querySelector('.vaporise .hero-full')
			if (vaporise) {
				let scroll = window.pageYOffset;
				let opacity = ((1 - (scroll / 1000)) > 0) ? (1 - (scroll / 1000)) : 0
				let scale = ((1 + (scroll / 1000)) > 1) ? (1 + (scroll / 1000)) : 1
				let blur = ((1 + (scroll / 10)) > 1) ? (1 + (scroll / 100)) : 0
				if (scroll < browser.height) {
					parallax.style.marginTop = (0 + (scroll / 2)) + "px"
					vaporise.style.opacity = opacity
					vaporise.style.transform = `scale(${scale})`
					vaporise.style.filter = `blur(${blur}px)`
				}
			}
			// end Hero Parallax - Post
		}
}

function sidebar(variant) {
	document.querySelectorAll('.sidebar').forEach((sidebar)=>{
		sidebar.setAttribute('data-state', 'closed')
	})
	document.querySelectorAll('#sidebar--' + variant).forEach((thisSidebar) => {
		thisSidebar.setAttribute('data-state', 'open')
	})
}

function bsod() {
	if (document.querySelector('.error404')) {
		document.querySelector('#bsod').style.transition = 'opacity ease-in 500ms'
		document.querySelector('#bsod').style.opacity = 0
		setTimeout(()=>{
				document.querySelector('#bsod').outerHTML = ''
		}, 500)
	}
}

function global_functions() {
	screen_size();
	max_height();
	persistent_element_heights();
	if ($(window).scrollTop() > 0) {
		$('#masthead.fade-in').addClass('open');
	}
	progressive_media();
	vaporise();

	// Load hero images _after_ everything else has loaded (including thumbnails)
	// This greatly improves page loading speeds
	document.querySelectorAll('.hero-full').forEach((hero)=>{
		let src = hero.getAttribute('data-src')
		hero.setAttribute('src', src)
	})
	// END Load Hero images later

};
