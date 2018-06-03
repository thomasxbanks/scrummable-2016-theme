<section class="container navigation">
    <?php if (is_single()) :
        // @TODO: Custom loop through;
            // a) Get (max 5) user-defined "Related Posts"
            // b)
            //  - if (user-defined == 1 OR == 4) get (4 x same_cat_posts)
            //        - if (same_cat_posts < 4) get difference as random_posts
            //  - if (user-defined == 2 OR == 0 OR 5) get (3 x same_cat_posts)
            //        - if (same_cat_posts < 3) get difference as random_posts
            //  - if (user-defined == 3) get (2 x same_cat_posts)
            //        - if (same_cat_posts < 2) get difference as random_posts
        ?>
        <?php
        // Posts from the same category
        $categories = get_the_category();
        $category_id = $categories[0]->cat_ID;
        $this_post = $post->ID;
        $args = array(
            'cat' => $category_id,
            'post__not_in' => array($this_post),
            'posts_per_page' => '3',
            'order' => 'RAND',
            'orderby' => 'id'
        );
        $cat_query = new WP_Query($args); ?>
        <?php if ($cat_query->have_posts()) : $count = 0; ?>
            <section id="onward_journeys" class="central-column" data-role="more articles" aria-label="More articles">
            <?php while ($cat_query->have_posts()) : $cat_query->the_post(); ?>
                <?php $count++; custom_post('teaser'); ?>
            <?php endwhile; ?>
            <?php wp_reset_postdata(); ?>
        <?php else : ?>
            <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
        <?php endif; ?>
        </section>
    <?php endif; ?>
    <?php if ($wp_query->max_num_pages > 1) : ?>
        <?php if (7 !== 7) { //!is_mobile() ?>
            <div class="button__wrapper">
                <button id="load_posts" title="Load the next <?php echo get_option('posts_per_page'); ?> posts" class="button button--big" data-page="<?php echo (get_query_var('paged', 1) == '0') ? '1' : get_query_var('paged', 1); ?>" data-last-page="<?php echo $wp_query->max_num_pages; ?>">
                    Load more posts
                </button>
            </div>
        <?php } else { ?>
            <div class="button__wrapper">
                <?php
                (get_query_var('paged', 1) == '0') ? $current_page = '1' : $current_page = get_query_var('paged', 1);
                echo ($current_page < $wp_query->max_num_pages) ? "<a href=\"/page/" . ($current_page + 1) . "\" class=\"button button--big\" title=\"Load page ".($current_page + 1)."\">Next Posts</a>" : null;
                echo ($current_page > 1) ? "<a href=\"/page/" . ($current_page - 1) . "\" class=\"button button--big\" title=\"Load page ".($current_page - 1)."\">Previous Posts</a>" : null;
                ?>
                <?php //previous_posts_link('Previous posts'); ?>
                <?php //next_posts_link('Next posts'); ?>
            </div>
        <?php } ?>
    <?php endif; ?>
</section>
