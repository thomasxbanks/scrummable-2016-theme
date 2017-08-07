<footer id="colophon" class="footer--page" data-role="page footer" aria-label="Page footer and colophon">
	<div id="copyright">
		<small>
			&copy; <?php copyright_date(); ?> scrummable // <?php echo get_bloginfo('description'); ?>
		</small>
	</div>
	<?php
		if (microtime(true) %2 === 0) {
		?><style>.easter-egg { color: rgba(0,0,0,0.3); float: right; text-decoration: none; } </style><a class="easter-egg" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=pXPXMxsXT28">π</a><?php
		}
	?>
</footer>