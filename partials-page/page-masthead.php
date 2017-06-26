<?php if (is_front_page()) {
    $classes_masthead = "fade-in";
} else {
    $classes_masthead = "open";
    $classes_masthead .= " considerate";
} ?>

<header id="masthead" class="header--page <?php echo $classes_masthead; ?>">
    <section id="branding">
        <div id="site-title">
            <h1 class="company_logo">
                <a href="<?php echo esc_url(home_url('/')); ?>" title="<?php echo esc_html(get_bloginfo('name')); ?>" rel="home">
                    <?php echo esc_html(get_bloginfo('name')); ?>
                </a>
            </h1>
        </div>
        <?php get_template_part('partials-page/page', 'navigation'); ?>
    </section>
    <?php get_template_part('partials-page/page', 'sidebar'); ?>
</header>