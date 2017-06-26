<aside id="sidebar--nav-primary" class="sidebar" data-role="navigation" aria-label="Primary Navigation">
    <nav id="nav-primary" class="closed">
        <ul class="list--blocks">
                <?php wp_list_pages( array( 'title_li' => '' ) ); ?>
            <?php
            $categories = get_categories(array(
                'orderby' => 'name',
                'order' => 'ASC'
            ));

            foreach ($categories as $category) {
                $category_link = sprintf('<a href="%1$s" alt="%2$s">%3$s</a>',
                    esc_url(get_category_link($category->term_id)),
                    esc_attr(sprintf(__('View all posts in %s', 'textdomain'), $category->name)),
                    esc_html($category->name)
                );
                echo '<li>' . sprintf(esc_html__('%s', 'textdomain'), $category_link) . '</li> ';
            } ?>
        </ul>
    </nav>
</aside>
<aside id="sidebar--settings" class="sidebar" data-role="settings" aria-label="Settings">
    <nav id="nav-settings" class="closed">
        <ul class="list--blocks">
            <li><a href="#">Settings</a></li>
            <li><a href="#">Other Settings</a></li>
            <li><a href="#">More Settings</a></li>
        </ul>
    </nav>
</aside>
<aside id="sidebar--search" class="sidebar" data-role="search" aria-label="Search">
    <nav id="nav-search" class="closed">
        <ul class="list--blocks">
            <li><?php get_search_form(); ?></li>
        </ul>
    </nav>
</aside>