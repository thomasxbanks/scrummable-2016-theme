<?php
// Variables
$the_category = get_the_category_list();
$the_tags = get_the_tag_list();
?>
<footer id="post__footer--<?php echo get_the_ID(); ?>" class="post__footer post__content central-column" data-role="post footer" aria-label="Post Footer">
    <?php if (($the_category) || ($the_tags)) { ?>
        <?php ($the_category) ? get_template_part('partials-post/post', 'cats') : null; ?>
        <?php ($the_tags) ? get_template_part('partials-post/post', 'tags') : null; ?>
    <?php } ?>
</footer>
