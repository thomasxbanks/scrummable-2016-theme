<?php
function custom_post($variant) {
    global $count;
    $post_classes = "post";
    $post_classes .= " post-" . $variant;
    (is_sticky()) ? $post_classes .= " post-featured" : null;
    switch ($count) {
      case 1:
          $post_classes .= " item-8";
          break;
      case 2:
          $post_classes .= " item-4";
          break;
      case 3:
          $post_classes .= " item-5";
          break;
      case 4:
          $post_classes .= " item-7";
          break;
          case 5:
            $post_classes .= " item-12";
            break;
      case 9:
      case 10:
          $post_classes .= " item-6";
          break;
      default:
          $post_classes .= " item-4";
          break;
  }

  ?>
  <article id="post--<?php the_ID(); ?>" class="<?php echo $post_classes; ?>" itemscope itemtype="https://schema.org/Blog">
    <?php get_template_part('partials-post/' . $variant . '/post', 'hero'); ?>
      <div class="inner">
          <?php get_template_part('partials-post/' . $variant . '/post', 'content'); ?>
          <?php get_template_part('partials-post/post', 'footer'); ?>
          <?php if ($variant == 'single') {
            echo ($auth_bio = nl2br(get_the_author_meta('description'))) ? "<div class=\"post__author--bio\">" . $auth_bio . "</div><br />" : null;
          } ?>
          <?php if (($variant == 'single') && (comments_open())) { ?>
            <div class="post__content central-column">
              <?php comments_template(); ?>
            </div>
          <?php } ?>
      </div>
  </article>
<?php }
