<div class="post__content">
    <?php get_template_part('partials-post/post', 'meta'); ?>
    <section class="post__content--inner">
        <?php echo (has_excerpt()) ? the_excerpt() : paragraph_excerpt(get_the_content()); ?>
        <br />
        <a class="read-more" href="<?php the_permalink(); ?>" title="Read more of &ldquo;<?php the_title(); ?>&rdquo;">Read more <span class="arrow">&rsaquo;</span><span class="underline" style="box-shadow: inset 0 -4px 0  #${post.color};"></span></a>
    </section>
</div>
