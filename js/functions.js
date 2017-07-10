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

function return_to_top() {
	var distance = (document_height / screen_height);
	var content_top = (0 + screen_height - $('#masthead').height());
	if (distance > 5) {
		var transition_speed = 300;
	} else {
		var transition_speed = 800;
	}
	$("html body").animate({
		scrollTop: (content_top)
	}, transition_speed);
	return false;
	// TODO: fix nav bar hide on skip-link...
}

function nudge() {
	$("html, body").animate({
		scrollTop: screen_height
	}, transition_speed_slowest);
	return false;
}

function max_height() {
	$('.max-height').css('height', screen_height);
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
	if ($("body").length) {
		$(window).scroll(function() {
      let vaporise = document.querySelector('.vaporise .hero__title')
			let parallax = document.querySelector('.vaporise .hero-full')
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
			// end Hero Parallax - Post
		})
	}
}

function sidebar(variant) {
	var this_sidebar = "#sidebar--" + variant;
	var not_this_sidebar = '.sidebar:not(' + this_sidebar + ')';
	$(not_this_sidebar).removeClass('open');
	$(this_sidebar).toggleClass('open');
}

function bsod() {
	$('#bsod').animate({
		'opacity': 0
	}, 500, function() {
		$(this).remove();
	});
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
};
