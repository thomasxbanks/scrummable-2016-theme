<?php
// Makes the Visual Editor reflect the front-end
add_editor_style('css/editor-style.css');

// Adds extra styling capability to the Visual Editor
add_filter('mce_buttons_2', 'my_mce_buttons_2');

function my_mce_buttons_2($buttons)
{
    array_unshift($buttons, 'styleselect');
    return $buttons;
}

add_filter('tiny_mce_before_init', 'my_mce_before_init');

function my_mce_before_init($settings)
{

    $style_formats = array(
        array(
            'title' => 'Intro',
            'block' => 'div',
            'classes' => 'intro',
            'wrapper' => true
        ),
        array(
            'title' => 'Button',
            'selector' => 'a',
            'classes' => 'button button--default'
        ),
        array(
            'title' => 'Cite',
            'block' => 'cite',
            'classes' => 'quote__citation'
        ),
        array(
            'title' => '<code>',
            'block' => 'pre',
            'classes' => 'pre'
        )
    );

    $settings['style_formats'] = json_encode($style_formats);

    return $settings;

}