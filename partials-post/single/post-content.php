<div class="post__content">
    <?php get_template_part('partials-post/post', 'meta'); ?>
    <section class="post__content--inner">
        <?php echo apply_filters('the_content', get_the_content()); ?>
    </section>
</div>