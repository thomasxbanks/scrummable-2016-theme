<!-- General site meta -->
<meta name="description" content="<?php echo (is_single()) ? paragraph_excerpt(get_the_content()) : bloginfo('description'); ?>">
<meta name="keywords" content="<?php $categories = get_categories(array('orderby' => 'name','order' => 'ASC'));foreach ($categories as $category) {echo esc_html($category->name) . ' | ';} ?>">
<meta name="author" content="<?php echo (is_single()) ? get_the_author_meta('display_name') : 'Scrummable'; ?>">

<!-- Twitter specific site meta -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:creator" content="<?php echo (get_the_author_meta('twitter')) ? get_the_author_meta('twitter') : '@scrummable'; ?>">
<meta name="twitter:site" content="<?php echo (get_the_author_meta('twitter')) ? get_the_author_meta('twitter') : '@scrummable'; ?>">
<meta name="twitter:title" content="<?php echo (!is_front_page()) ? wp_title('', true, 'right') : bloginfo('name'); ?>">
<meta name="twitter:description" content="<?php echo (has_excerpt()) ? the_excerpt() : paragraph_excerpt(get_the_content()); ?>">
<meta name="twitter:image:src" content="<?php echo (get_the_post_thumbnail_url(get_the_ID())) ? the_post_thumbnail_url('full') : wp_get_attachment_url( get_option( media_selector_attachment_id ) ); ?>">
<meta name="twitter:image:width" content="280">
<meta name="twitter:image:height" content="150">

<!-- Facebook specific site meta -->
<meta property="og:site_name" content="<?php echo get_bloginfo('name'); ?>" />
<meta property="og:title" content="<?php echo (!is_front_page()) ? wp_title('', true, 'right') : bloginfo('name'); ?>" />
<meta property="og:type" content="article" />
<meta property="og:article:published_time" content="<?php echo get_the_date('Y-m-d H:i:s'); ?>" />
<meta property="og:article:tag" content="<?php $categories = get_categories(array('orderby' => 'name','order' => 'ASC'));foreach ($categories as $category) {echo esc_html($category->name) . ' | ';} ?>" />
<meta property="og:article:author" content="<?php echo (is_single()) ? get_the_author_meta('display_name') : get_bloginfo('name'); ?>" />
<meta property="og:url" content="<?php the_permalink(); ?>" />
<meta property="og:image" content="<?php echo (get_the_post_thumbnail_url(get_the_ID())) ? the_post_thumbnail_url('full') : wp_get_attachment_url( get_option( media_selector_attachment_id ) ); ?>" />