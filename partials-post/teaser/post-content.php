<div class="post__content">
    <?php get_template_part('partials-post/post', 'meta'); ?>
    <section class="post__content--inner">
        <?php echo (has_excerpt()) ? the_excerpt() : paragraph_excerpt(get_the_content()); ?>
        <a class="button button--big" href="<?php the_permalink(); ?>" title="Read more of &ldquo;<?php the_title(); ?>&rdquo;">
            Read more
        </a>
    </section>
</div>