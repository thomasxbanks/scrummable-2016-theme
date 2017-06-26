// Functons on load
$(document).ready(function () {
	// onLoad operations
	document_height();
	global_functions();

	// If Browser is Internet Explorer or Edge
	if (detectIE()) {
		var imgUrl = $('#hero_image').find('img').prop('src');
		$('#hero_image').css('background-image', 'url("' + imgUrl + '")');
		$('#hero_image img').css('opacity', 0);
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
		console.log(screen_height, scroll);
		// Show/hide Masthead
		if (scroll > (screen_height / 2)) {
			$('.home #masthead.fade-in').addClass('open');
		} else {
			$('.home #masthead.fade-in').removeClass('open');
		}

		if (scroll > screen_height) {
			$('#masthead [aria-label="Skip to content"] .fa').removeClass('fa-arrow-down');
			$('#masthead [aria-label="Skip to content"] .fa').addClass('fa-arrow-up');
		} else {
			$('#masthead [aria-label="Skip to content"] .fa').removeClass('fa-arrow-up');
			$('#masthead [aria-label="Skip to content"] .fa').addClass('fa-arrow-down');
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

		// Parallax Hero Image
		$('.entry-header.parallax img').css({
			'margin-top': (0 + (($(this).scrollTop()) / 5)) + "px"
		});

		$('.entry-header.parallax h1').css({
			'filter': 'blur(' + ($(this).scrollTop() / 10) + 'px)',
			'-webkit-filter': 'blur(' + ($(this).scrollTop() / 10) + 'px)',
			'opacity': (1 - ($(this).scrollTop()) / 1000)
		});
	});

	// Mobile Nav Controls
	$('.nav-icon button').on("click", function () {
		var variant = $(this).attr('data-sidebar');
		sidebar(variant);
	})
	// end Mobile Nav Controls

	// Pagination AJAX
	$('#load_posts').on("click", function (e) {
		e.preventDefault(e);
		var data_page = (parseInt($(this).attr('data-page')) + 1);
		var data_last_page = parseInt($(this).attr('data-last-page'));
		var page_url = "/page/" + data_page;
		$.ajax({
			type: "GET",
			url: page_url,
			async: false,
			success: function (html) {
				$(html).find("article.post--teaser").each(function () {
					$('.masonry').append($(this)).masonry('appended', $(this));
				});
				$('#load_posts').attr('data-page', data_page);
				progressive_media();
				if (data_page >= data_last_page) {
					$('#load_posts').animate({'opacity': 0}, 500, function () {
						$(this).remove();
					});
				}
			}
		});
	});
	// end Pagaination AJAX

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
