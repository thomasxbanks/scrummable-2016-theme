// Functions on load

// onLoad operations
document_height()
global_functions()

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
	//console.log(screen_height, scroll);
	// Show/hide Masthead
	if (scroll > (screen_height / 2)) {
		document.querySelector('#masthead').classList.add('open')
	} else {
		document.querySelector('#masthead').classList.remove('open')
	}

	if (scroll > screen_height) {
		document.querySelector('.scroll-up').setAttribute('data-state', 'shown')
		document.querySelector('.scroll-down').setAttribute('data-state', 'hidden')
	} else {
		document.querySelector('.scroll-up').setAttribute('data-state', 'hidden')
		document.querySelector('.scroll-down').setAttribute('data-state', 'shown')
	}

	//console.log("doc_height: "+document_height+". \nscreen_height: "+screen_height+". \ndoc - screen: "+(document_height - (screen_height * 2))+". scroll: "+scroll)

	if (scroll > (document_height - (screen_height * 2))) {
		document.querySelector('button#return_to_top').setAttribute('data-state', 'is-shown')
	} else {
		document.querySelector('button#return_to_top').setAttribute('data-state', 'not-shown')
	}

	// close nav on scroll
	document.querySelectorAll('.sidebar').forEach((navtray) => {
		if (navtray.getAttribute('data-state') === 'open') {
			sidebar('all')
		}
	})

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
document.querySelectorAll('.nav-icon button').forEach((navIcon) => {
	navIcon.addEventListener('click', (e) => {
		let variant = e.currentTarget.getAttribute('data-sidebar')
		let currentState = document.querySelector(`#sidebar--${variant}`).getAttribute('data-state')
		if (currentState === 'open') {
			sidebar('all')
		} else {
			sidebar(variant)
		}

	})
})
// end Mobile Nav Controls


// 404 page overlay
bsod()


// Functions on resize
window.onresize = function (e) {
	// onResize operations
	document_height()
	global_functions()
}