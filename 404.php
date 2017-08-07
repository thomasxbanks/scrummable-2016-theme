<?php // WP 404 ALERTS @ http://wp-mix.com/wordpress-404-email-alerts/

// set status
header("HTTP/1.1 404 Not Found");
header("Status: 404 Not Found");

// site info
$blog = get_bloginfo('name');
$site = get_bloginfo('url') . '/';
$email = get_bloginfo('admin_email');

// theme info
if (!empty($_COOKIE["nkthemeswitch" . COOKIEHASH])) {
    $theme = clean($_COOKIE["nkthemeswitch" . COOKIEHASH]);
} else {
    $theme_data = wp_get_theme();
    $theme = clean($theme_data->Name);
}

// referrer
if (isset($_SERVER['HTTP_REFERER'])) {
    $referer = clean($_SERVER['HTTP_REFERER']);
} else {
    $referer = "undefined";
}
// request URI
if (isset($_SERVER['REQUEST_URI']) && isset($_SERVER["HTTP_HOST"])) {
    $request = clean('http://' . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]);
} else {
    $request = "undefined";
}
// query string
if (isset($_SERVER['QUERY_STRING'])) {
    $string = clean($_SERVER['QUERY_STRING']);
} else {
    $string = "undefined";
}
// IP address
if (isset($_SERVER['REMOTE_ADDR'])) {
    $address = clean($_SERVER['REMOTE_ADDR']);
} else {
    $address = "undefined";
}
// user agent
if (isset($_SERVER['HTTP_USER_AGENT'])) {
    $agent = clean($_SERVER['HTTP_USER_AGENT']);
} else {
    $agent = "undefined";
}
// identity
if (isset($_SERVER['REMOTE_IDENT'])) {
    $remote = clean($_SERVER['REMOTE_IDENT']);
} else {
    $remote = "undefined";
}
// log time
$time = clean(date("F jS Y, h:ia", time()));

// sanitize
function clean($string)
{
    $string = rtrim($string);
    $string = ltrim($string);
    $string = htmlentities($string, ENT_QUOTES);
    $string = str_replace("\n", "<br>", $string);

    if (get_magic_quotes_gpc()) {
        $string = stripslashes($string);
    }
    return $string;
}

$message =
    "TIME: " . $time . "\n" .
    "*404: " . $request . "\n" .
    "SITE: " . $site . "\n" .
    "THEME: " . $theme . "\n" .
    "REFERRER: " . $referer . "\n" .
    "QUERY STRING: " . $string . "\n" .
    "REMOTE ADDRESS: " . $address . "\n" .
    "REMOTE IDENTITY: " . $remote . "\n" .
    "USER AGENT: " . $agent . "\n\n\n";

wp_mail($email, "404 Alert: " . $blog, $message, "From: $email");
?>
<?php get_header(); ?>
<div id="bsod">
    <img src="<?php echo get_template_directory_uri() . "/img/bsod.jpg"; ?>" alt="Blue screen of death">
</div>
<section id="main" class="container" data-role="main" aria-label="Main page content">
    <?php
$classes = "post__wrapper--image";
$classes .= " hero__image--page";
(!is_mobile()) ? $classes .= " vaporise" : null;
?>
<header class="post__header">
    <section class="hero-image <?php echo $classes; ?>" data-role="hero-image" aria-label="Page Main Image">
         <img class="hero-full" src="<?php echo get_template_directory_uri() . "/img/moon-moon.jpg"; ?>" alt="Moon Moon, the worst wolf on the internet, collides with another wolf from his pack.">
        <div class="hero__title--wrapper">
            <h1 class="hero__title hero__title--page">
                Good job, Moon Moon!
            </h1>
        </div>
    </section>
</header>

    <article class="page--single page__content page__content--fourohfour" id="post-<?php the_ID(); ?>">
        <div class="page__content">
            <section class="page__content--inner">
                <p>
                    Something gan aglay but panic ye not!
                </p>
                <p>
                    The dev team have used some kind of code-wizardy to report this mistake to someone who can actually factually fix it.
                </p>
                <p>
                    If you're not too annoyed with us and want to carry on using the site, you can still use the handy menu and/or search bar to look around.
                </p>
            </section>
        </div>
    </article>
</section>
<?php get_footer(); ?>

