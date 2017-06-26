<article class="page--single page__content page__content--page" id="post-<?php the_ID(); ?>">
    <div class="page__content">
        <section class="page__content--inner">
            <?php echo apply_filters('the_content', get_the_content()); ?>
        </section>
    </div>
    <p><?php wp_link_pages('next_or_number=number&pagelink=page %'); ?></p>
    <p><?php edit_post_link('Edit', '[ ', ' ]'); ?></p>
</article>
<?php comments_template(); ?>
