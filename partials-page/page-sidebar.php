<aside id="sidebar--nav-primary" class="sidebar" data-role="navigation" aria-label="Primary Navigation">
    <nav id="nav-primary" class="central-column" data-state="closed">
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