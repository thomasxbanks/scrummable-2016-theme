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

	console.log(document_height);
}

function is_at_top() {
	var panel_offset = $('#page__content_ajax').offset();
	var panel_left = panel_offset.top;
	if (panel_left == 0) {
		return true;
	} else {
		return false;
	}
}

function persistent_element_heights() {
	colophon_height = $('#colophon').height();
	masthead_height = $('#masthead').height();
}