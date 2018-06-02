<?php
$classes_masthead = "header--page";

if (is_front_page()) {
    $classes_masthead .= " fade-in";
    $classes_masthead .= " home";
} else {
    $classes_masthead .= " considerate";
} ?>

<header id="masthead" class="<?php echo $classes_masthead; ?>">
    <section id="branding">
        <div id="site-title">
            <span class="company_logo">
                <a href="<?php echo esc_url(home_url('/')); ?>" title="<?php echo esc_html(get_bloginfo('name')); ?>" rel="home">
                    <?php echo esc_html(get_bloginfo('name')); ?>
                </a>
            </span>
        </div>
        <?php get_template_part('partials-page/page', 'navigation'); ?>
    </section>
    <?php get_template_part('partials-page/page', 'sidebar'); ?>
</header>