<div class="post__data post__data--meta">
    <ul class="list--hz mob-stack">
        <li class="date">
            <?php post_date(); ?>
        </li>
        <li class="author">
            <a href="<?php echo get_author_posts_url(get_the_author_meta('ID'), get_the_author_meta('user_nicename')); ?>" title="Read all posts from <?php echo the_author_meta('display_name'); ?>">
                <cite class="author" itemprop="author"><?php echo the_author_meta('display_name'); ?></cite>
            </a>
        </li>
        <li class="read_time">
            <?php
            $word_count = str_word_count(get_the_content(), 1);
            $time_to_read = round((count($word_count) / 200));
            echo $time_to_read . ' minute read';
            ?>
        </li>
        <?php if (comments_open()) { ?>
            <li class="comments">
                <?php comments_number('No comments', 'One comment', '% comments'); ?>
            </li>
            <?php
            $comment_count = get_comment_count($post->ID);
            if ($comment_count['approved'] > 0) {
                (is_single()) ? "<li class='read_comments'><a href=\"#comments\" title='Read the comments'>Read comments</a></li>" : null;
            } else {
                (is_single()) ? "<li class='write_comments'><a href=\"#comments\" title='Leave a comment'>Leave a comment</a></li>" : null;
            } ?>
        <?php } ?>
        <?php if (current_user_can('edit_post')) { ?>
            <li class="edit"><a href="<?php echo get_edit_post_link(); ?>">Edit post</a></li>
            <li class="twitter"><a href="#">Share post on Twitter</a></li>
            <li class="instagram"><a href="#">Share post on Instagram</a></li>
        <?php } ?>
    </ul>
</div>