<?php
$classes = "post__wrapper--image";
$classes .= " hero__image--post";
(!is_mobile()) ? $classes .= " vaporise" : null;
$thumb_id = get_post_thumbnail_id(get_the_ID());
$alt_text = get_post_meta($thumb_id, '_wp_attachment_image_alt', true);
?>

<header class="post__header">
	<section class="hero-image <?php echo $classes; ?>" data-role="hero-image" aria-label="Post Main Image">
		<?php if (has_post_thumbnail()) : ?>
			<img class="hero-thumb" src="<?php the_post_thumbnail_url('medium'); ?>" alt="<?php echo (count($alt_text)) ? $alt_text : get_the_title(); ?>">
			<?php if (!is_mobile()) { ?>
				<img class="hero-full" src="<?php the_post_thumbnail_url('full'); ?>" alt="<?php echo (count($alt_text)) ? $alt_text : get_the_title(); ?>">
			<?php } else { ?>
				<img class="hero-full" src="<?php the_post_thumbnail_url('large'); ?>" alt="<?php echo (count($alt_text)) ? $alt_text : get_the_title(); ?>">
			<?php } ?>
		<?php endif; ?>
		<div class="hero__title--wrapper">
			<h1 class="hero__title hero__title--post" itemprop="headline">
				<?php echo get_the_title(); ?>
			</h1>
		</div>
	</section>
</header>
