<button 
    id="return_to_top" 
    class="button" 
    type="button" 
    data-state="not-shown" 
    data-role="button" 
    aria-label="Return to the top of the content" 
    onClick="skipToContent()">
    <svg fill="#ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
    </svg>
</button>
<?php get_template_part('partials-page/page', 'colophon'); ?>
<?php wp_footer(); ?>
<?php get_template_part('partials-page/page', 'scripts'); ?>
</body></html>
