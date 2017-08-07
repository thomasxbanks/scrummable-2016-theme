function screen_size() {
	screen_width = window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;

	screen_height = window.innerHeight
		|| document.documentElement.clientHeight
		|| document.body.clientHeight;
}

function document_height() {
	var body = document.body,
		html = document.documentElement;

	document_height = Math.max(body.scrollHeight, body.offsetHeight,
		html.clientHeight, html.scrollHeight, html.offsetHeight);

	// console.log(document_height);
}

// What are the browser dimensions?
let browser = {
  width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
  height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
}

function persistent_element_heights() {
	colophon_height = $('#colophon').height();
	masthead_height = $('#masthead').height();
}
