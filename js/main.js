// Functons on load
jQuery(document).ready(function ($) {
	// onLoad operations
	document_height();
	global_functions();

	// If Browser is Internet Explorer or Edge
	if (detectIE()) {
    var imgUrl = document.querySelectorAll('.hero-full')[0].getAttribute('src')
		//var imgUrl = $('#hero_image').find('img').prop('src');
    document.querySelector('#hero_image').style.backgroundImage = `url(${imgUrl})`
		// $('#hero_image').css('background-image', 'url("' + imgUrl + '")');
		document.querySelector('#hero_image img').style.opacity = 0
		$('html').addClass('is-ie');
	} else {
		$('html').addClass('not-ie');
	}

	// Detect jQuery
	$('html').toggleClass('no-jquery jquery');

	// Functions on Scroll
	var CurrentScroll = 0;
	$(window).on('scroll scrollstart', function () {
		var scroll = $(window).scrollTop();
		// log for debug
		// console.log(screen_height, scroll);
		// Show/hide Masthead
		if (scroll > (screen_height / 2)) {
			$('.home #masthead.fade-in').addClass('open');
		} else {
			$('.home #masthead.fade-in').removeClass('open');
		}

		if (scroll > screen_height) {
            document.querySelector('.scroll-up').setAttribute('data-state', 'shown')
            document.querySelector('.scroll-down').setAttribute('data-state', 'hidden')
		} else {
            document.querySelector('.scroll-up').setAttribute('data-state', 'hidden')
            document.querySelector('.scroll-down').setAttribute('data-state', 'shown')
		}

		//console.log("doc_height: "+document_height+". \nscreen_height: "+screen_height+". \ndoc - screen: "+(document_height - screen_height)+". scroll: "+scroll);

		if ((scroll > (document_height - (screen_height * 2))) && (document_height > screen_height)) {
			$('button#return_to_top').addClass('slideout');
		} else {
			$('button#return_to_top').removeClass('slideout');
		}

		// Directional scroll
		var NextScroll = $(this).scrollTop();
		if (NextScroll > CurrentScroll) {
			// Scroll down the page
			$('#masthead.considerate').addClass('slide-away');
			sidebar('all');

			// Scroll ended for 100ms
			clearTimeout($.data(this, 'scrollTimer'));
			$.data(this, 'scrollTimer', setTimeout(function () {

			}, 100));
			// end Scroll ended for 100ms
		}
		else {
			// Scroll up the page
			$('#masthead.considerate').removeClass('slide-away');
			sidebar('all');
		}

		CurrentScroll = NextScroll;  //Updates current scroll position

	});

	// Mobile Nav Controls
	$('.nav-icon button').on("click", function () {
		var variant = $(this).attr('data-sidebar');
		sidebar(variant);
	})
	// end Mobile Nav Controls


	// 404 page overlay
	$('#bsod').on("click", function () {
		$(this).animate({'opacity': 0}, 500, function () {
			$(this).remove();
		});
	});
	setTimeout(bsod, 3000);
	// end 404 page overlay
});

// Functions on resize
$(window).resize(debouncer(function (e) {
	// onResize operations
	//document_height();
	global_functions();
}));
