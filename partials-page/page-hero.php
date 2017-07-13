<?php
$classes = "post__wrapper--image";
$classes .= " hero__image--page";
(!is_mobile()) ? $classes .= " vaporise" : null;
$thumb_id = get_post_thumbnail_id(get_the_ID());
$alt_text = get_post_meta($thumb_id, '_wp_attachment_image_alt', true);
?>
<?php echo "XXX - " . wp_get_attachment_url( get_option( media_selector_attachment_id ) ) . " - YYY"; ?>
<header class="post__header">
    <section class="hero-image <?php echo $classes; ?>" data-role="hero-image" aria-label="Page Main Image">
        <?php
        if (!is_page()) { ?>
            <img class="hero-thumb" src="<?php echo wp_get_attachment_url( get_option( media_selector_attachment_id ) ); ?>" alt="<?php echo (count($alt_text)) ? $alt_text : get_the_title(); ?>">
            <img class="hero-full" src="<?php echo wp_get_attachment_url( get_option( media_selector_attachment_id ) ); ?>" alt="<?php echo (count($alt_text)) ? $alt_text : get_the_title(); ?>">
        <?php } else { ?>
            <img class="hero-thumb" src="<?php echo (get_the_post_thumbnail_url(get_the_ID())) ? the_post_thumbnail_url('medium') : wp_get_attachment_url( get_option( media_selector_attachment_id ) ); ?>" alt="<?php echo (count($alt_text)) ? $alt_text : get_the_title(); ?>">
            <img class="hero-full" src="<?php echo (get_the_post_thumbnail_url(get_the_ID())) ? the_post_thumbnail_url('full') : wp_get_attachment_url( get_option( media_selector_attachment_id ) ); ?>" alt="<?php echo (count($alt_text)) ? $alt_text : get_the_title(); ?>">
        <?php } ?>
        <div class="hero__title--wrapper">
            <h1 class="hero__title hero__title--page">
                <?php echo (!is_front_page()) ? wp_title('', true, 'right') : bloginfo('name'); ?>
                <?php echo ($cat_desc = category_description()) ? "<p>" . $cat_desc . "</p>" : null; ?>
                <?php echo ($auth_bio = nl2br(get_the_author_meta('description'))) ? "<p>" . $auth_bio . "</p>" : null; ?>
                <?php echo ($twitter_url = get_the_author_meta('twitter')) ? "<p><a href='http://twitter.com/" . $twitter_url . "' title='Follow ".get_the_author_meta("display_name")." on Twitter'><i class='fa fa-twitter'></i></a></p>" : null; ?>
            </h1>
        </div>
    </section>
</header>
