<?php
function custom_post($variant)
{ ?>
  <?php
  global $count;
  $post_classes = "post";
  $post_classes .= " post--" . $variant;
  (is_sticky()) ? $post_classes .= " post--featured" : null;
  switch ($count) {
      case 1:
          $post_classes .= " item-12";
          break;
      case 2:
      case 5:
          $post_classes .= " item-5";
          break;
      case 3:
      case 4:
          $post_classes .= " item-7";
          break;
      default:
          $post_classes .= " item-4";
          break;
  }
  ?>
  <article id="post--<?php the_ID(); ?>" class="<?php echo $post_classes; ?>" itemscope itemtype="https://schema.org/Blog">
      <div class="inner">
          <?php get_template_part('partials-post/' . $variant . '/post', 'hero'); ?>
          <?php get_template_part('partials-post/' . $variant . '/post', 'content'); ?>
          <?php get_template_part('partials-post/post', 'footer'); ?>
          <?php if (($variant == 'single') && (comments_open())) comments_template(); ?>
      </div>
  </article>







    <!-- <article id="post--<?php the_ID(); ?>" class="<?php echo $post_classes; ?>" itemscope itemtype="https://schema.org/Blog">
        <div class="inner">
            <?php
            // TODO: LOGICS!
            /*
             * to include:
             * if (is_sticky || is_previous || is_next) {
             * sticky { $flag_text = 'featured post' }
             * previous { $flag_text = 'previous post' }
             * next { $flag_text = 'next post' }
             * span.flag echo $flag_text
             *
             *
             * header
             * if teaser echo link
             * if teaser or mobile use thumbnail'large' else thumbnail'full'
             * if single and not mobile use vaporise
             *
             * content
             * if teaser use excerpt/1st para else use full
             *
             * footer
             * if single and comments_open show comments form
             * if single and comments_exist show comments
             * if single show onward journeys
*/
            ?>
            <?php get_template_part('partials-post/' . $variant . '/post', 'hero'); ?>
            <?php get_template_part('partials-post/' . $variant . '/post', 'content'); ?>
            <?php get_template_part('partials-post/post', 'footer'); ?>
            <?php if (($variant == 'single') && (comments_open())) comments_template(); ?>
        </div>
    </article> -->
<?php }

;
