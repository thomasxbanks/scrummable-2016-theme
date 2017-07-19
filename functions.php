<?php

/* sidebar */
if (function_exists('register_sidebar')) {
    register_sidebar(array('description' => 'Left Sidebar'));
}

/* nav menus */
if (function_exists('register_nav_menu')) {
    register_nav_menu('header_nav', __('Header Navigation Menu'));
    register_nav_menu('footer_nav', __('Footer Navigation Menu'));
}

/* automatic feed links */
add_theme_support('automatic-feed-links');
add_theme_support('post-thumbnails', array('post', 'page'));
get_template_part('php/functions', 'custom');
get_template_part('php/functions', 'post');
get_template_part('php/functions', 'admin');
get_template_part('php/functions', 'editor-style');


function scrummable_scripts()
{
    wp_enqueue_style('scrummable-style', get_stylesheet_uri());

    wp_enqueue_script('jQuery', '//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js');
    wp_enqueue_script('scrummable-js', get_template_directory_uri() . '/app.js', array('jQuery'), '20170710', true);
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}

add_action('wp_enqueue_scripts', 'scrummable_scripts');

// Removes query strings from asset urls for performance
function _remove_script_version($src)
{
    $parts = explode('?', $src);
    return $parts[0];
}
add_filter('script_loader_src', '_remove_script_version', 15, 1);
add_filter('style_loader_src', '_remove_script_version', 15, 1);

// Modify revisions to reduce database size
define('AUTOSAVE_INTERVAL', 300);
define('WP_POST_REVISIONS', false);

// Remove emoji support for performance
/**
* Disable the emoji's
*/
function disable_emojis()
{
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_styles', 'print_emoji_styles');
    remove_filter('the_content_feed', 'wp_staticize_emoji');
    remove_filter('comment_text_rss', 'wp_staticize_emoji');
    remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
    add_filter('tiny_mce_plugins', 'disable_emojis_tinymce');
    add_filter('wp_resource_hints', 'disable_emojis_remove_dns_prefetch', 10, 2);
}
add_action('init', 'disable_emojis');

/**
* Filter function used to remove the tinymce emoji plugin.
*
* @param array $plugins
* @return array Difference betwen the two arrays
*/
function disable_emojis_tinymce($plugins)
{
    if (is_array($plugins)) {
        return array_diff($plugins, array( 'wpemoji' ));
    } else {
        return array();
    }
}

/**
* Remove emoji CDN hostname from DNS prefetching hints.
*
* @param array $urls URLs to print for resource hints.
* @param string $relation_type The relation type the URLs are printed for.
* @return array Difference betwen the two arrays.
*/
function disable_emojis_remove_dns_prefetch($urls, $relation_type)
{
    if ('dns-prefetch' == $relation_type) {
        /** This filter is documented in wp-includes/formatting.php */
$emoji_svg_url = apply_filters('emoji_svg_url', 'https://s.w.org/images/core/emoji/2/svg/');

        $urls = array_diff($urls, array( $emoji_svg_url ));
    }

    return $urls;
}

// display featured post thumbnails in WordPress feeds
function wcs_post_thumbnails_in_feeds($content)
{
    global $post;
    if (has_post_thumbnail($post->ID)) {
        $content = '<p>' . get_the_post_thumbnail($post->ID) . '</p>' . $content;
    }
    return $content;
}
add_filter('the_excerpt_rss', 'wcs_post_thumbnails_in_feeds');
add_filter('the_content_feed', 'wcs_post_thumbnails_in_feeds');
