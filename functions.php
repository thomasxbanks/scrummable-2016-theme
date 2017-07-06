<?php

/* sidebar */
if (function_exists('register_sidebar'))
    register_sidebar(array('description' => 'Left Sidebar'));

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
    wp_enqueue_style('scrummable-fa-style', '//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css');
    wp_enqueue_style('scrummable-style', get_stylesheet_uri());

    wp_enqueue_script('jQuery', 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js');
    wp_enqueue_script('masonry', 'https://cdnjs.cloudflare.com/ajax/libs/masonry/3.3.0/masonry.pkgd.js', array('jQuery'), '20130115', true);
    wp_enqueue_script('easings', 'https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js', array('jQuery'), '20130115', true);
    wp_enqueue_script('scrummable-js-vars', get_template_directory_uri() . '/js/variables.js', array(), '20120206', true);
    wp_enqueue_script('scrummable-js-calc', get_template_directory_uri() . '/js/calculations.js', array(), '20120206', true);
    wp_enqueue_script('scrummable-js-func', get_template_directory_uri() . '/js/functions.js', array(), '20120206', true);
    wp_enqueue_script('scrummable-js', get_template_directory_uri() . '/js/main.js', array(), '20120206', true);

    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}

add_action('wp_enqueue_scripts', 'scrummable_scripts');

// Removes query strings from asset urls for performance
function _remove_script_version( $src ){
$parts = explode( '?', $src );
return $parts[0];
}
add_filter( 'script_loader_src', '_remove_script_version', 15, 1 );
add_filter( 'style_loader_src', '_remove_script_version', 15, 1 );

// Modify revisions to reduce database size
define('AUTOSAVE_INTERVAL', 300 );
define('WP_POST_REVISIONS', false );