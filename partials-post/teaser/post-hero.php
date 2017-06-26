<?php
$classes = "post__wrapper--image";
$classes .= " hero__image--post";
$thumb_id = get_post_thumbnail_id(get_the_ID());
$alt_text = get_post_meta($thumb_id, '_wp_attachment_image_alt', true);
?>

<header class="post__header">
    <?php echo (is_sticky()) ? "<span class='flag'>Featured Post</span>" : null; ?>
    <a class='post__wrapper--link' href='<?php echo get_the_permalink(); ?>' title='<?php echo get_the_title(); ?>' itemprop="url">
        <section class="hero-image <?php echo $classes; ?>" data-role="hero-image" aria-label="Post Main Image">
            <?php if (has_post_thumbnail()) : ?>
                <img class="hero-thumb" src="<?php the_post_thumbnail_url('thumbnail'); ?>" alt="<?php echo (count($alt_text)) ? $alt_text : get_the_title(); ?>">
                <img class="hero-full" src="<?php the_post_thumbnail_url('medium'); ?>" alt="<?php echo (count($alt_text)) ? $alt_text : get_the_title(); ?>">
            <?php endif; ?>
            <div class="hero__title--wrapper">
                <h1 class="hero__title hero__title--post" itemprop="headline">
                    <?php echo get_the_title(); ?>
                </h1>
            </div>
        </section>
    </a>
</header>
