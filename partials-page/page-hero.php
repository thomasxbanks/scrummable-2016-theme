<?php
$classes = "post__wrapper--image";
$classes .= " hero__image--page";
(!is_mobile()) ? $classes .= " vaporise" : null;
$thumb_id = get_post_thumbnail_id(get_the_ID());
$alt_text = get_post_meta($thumb_id, '_wp_attachment_image_alt', true);


$twitter_icon = "<i class='icon-twitter-follow'><svg xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300.00006 244.18703\" height=\"13\" width=\"16\" version=\"1.1\" xmlns:cc=\"http://creativecommons.org/ns#\" xmlns:dc=\"http://purl.org/dc/elements/1.1/\"><g style=\"\" transform=\"translate(-539.18 -568.86)\"><path d=\"m633.9 812.04c112.46 0 173.96-93.168 173.96-173.96 0-2.6463-0.0539-5.2806-0.1726-7.903 11.938-8.6302 22.314-19.4 30.498-31.66-10.955 4.8694-22.744 8.1474-35.111 9.6255 12.623-7.5693 22.314-19.543 26.886-33.817-11.813 7.0031-24.895 12.093-38.824 14.841-11.157-11.884-27.041-19.317-44.629-19.317-33.764 0-61.144 27.381-61.144 61.132 0 4.7978 0.5364 9.4646 1.5854 13.941-50.815-2.5569-95.874-26.886-126.03-63.88-5.2508 9.0354-8.2785 19.531-8.2785 30.73 0 21.212 10.794 39.938 27.208 50.893-10.031-0.30992-19.454-3.0635-27.69-7.6468-0.009 0.25652-0.009 0.50661-0.009 0.78077 0 29.61 21.075 54.332 49.051 59.934-5.1376 1.4006-10.543 2.1516-16.122 2.1516-3.9336 0-7.766-0.38716-11.491-1.1026 7.7838 24.293 30.355 41.971 57.115 42.465-20.926 16.402-47.287 26.171-75.937 26.171-4.929 0-9.7983-0.28036-14.584-0.84634 27.059 17.344 59.189 27.464 93.722 27.464\" fill=\"white\"/></g></svg></i>"

?>
<header class="post__header">
    <section class="hero-image <?php echo $classes; ?>" data-role="hero-image" aria-label="Page Main Image">
        <?php
        if (!is_page()) { ?>
            <img class="hero-thumb" src="<?php echo wp_get_attachment_thumb_url( get_option( media_selector_attachment_id ) ); ?>" alt="<?php echo (count($alt_text)) ? $alt_text : get_the_title(); ?>">
            <img class="hero-full" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="<?php echo wp_get_attachment_url( get_option( media_selector_attachment_id ) ); ?>" alt="<?php echo (count($alt_text)) ? $alt_text : get_the_title(); ?>">
        <?php } else { ?>
            <img class="hero-thumb" src="<?php echo (get_the_post_thumbnail_url(get_the_ID())) ? the_post_thumbnail_url('medium') : wp_get_attachment_url( get_option( media_selector_attachment_id ) ); ?>" alt="<?php echo (count($alt_text)) ? $alt_text : get_the_title(); ?>">
            <img class="hero-full" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="<?php echo (get_the_post_thumbnail_url(get_the_ID())) ? the_post_thumbnail_url('full') : wp_get_attachment_url( get_option( media_selector_attachment_id ) ); ?>" alt="<?php echo (count($alt_text)) ? $alt_text : get_the_title(); ?>">
        <?php } ?>
        <div class="hero__title--wrapper">
            <h1 class="hero__title hero__title--page">
                <?php echo (!is_front_page()) ? wp_title('', true, 'right') : bloginfo('name'); ?>
                <?php echo ($cat_desc = category_description()) ? "<p>" . $cat_desc . "</p>" : null; ?>
                <?php echo ($auth_bio = nl2br(get_the_author_meta('description'))) ? "<p>" . $auth_bio . "</p>" : null; ?>
                <?php echo ($twitter_url = get_the_author_meta('twitter')) ? "<a class='link-twitter-follow' href='http://twitter.com/" . $twitter_url . "' title='Follow ".get_the_author_meta("display_name")." on Twitter'>". $twitter_icon ."@" . $twitter_url . "</a>" : null; ?>
            </h1>
        </div>
    </section>
</header>
<a id="content" name="content"></a>