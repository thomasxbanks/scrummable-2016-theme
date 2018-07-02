<?php
if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip')) {
    ob_start("ob_gzhandler");
} else {
    ob_start();
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html lang="EN" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <!-- pre-fetch the cdn for the googlefonts and analytics. Performance advantage -->
  <link rel="dns-prefetch" href="//fonts.googleapis.com">
  <link rel="dns-prefetch" href="//google-analytics.com">
  <link rel="dns-prefetch" href="//www.google-analytics.com">
	<!-- Favicons, app icons, and manifest -->
	

<link rel="apple-touch-icon" sizes="180x180" href="/img/favicons/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/img/favicons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/img/favicons/favicon-16x16.png">
<link rel="manifest" href="/img/favicons/site.webmanifest">
<link rel="mask-icon" href="/img/favicons/safari-pinned-tab.svg" color="#a1213d">
<link rel="shortcut icon" href="/img/favicons/favicon.ico">
<meta name="msapplication-TileColor" content="#a1213d">
<meta name="msapplication-config" content="/img/favicons/browserconfig.xml">
<meta name="theme-color" content="#a1213d">


	<title>
		<?php wp_title(' | ', true, 'right'); ?>
		<?php bloginfo('name'); ?>
	</title>
	<?php get_template_part('partials-page/page', 'head'); ?>
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>"/>
	<!--Uncomment this to use a favicon.ico in the theme directory: -->
	<!--<link rel="SHORTCUT ICON" href="<?php bloginfo('template_directory'); ?>/favicon.ico"/>-->
	<?php if (is_singular()) {
		wp_enqueue_script('comment-reply');
	} ?>
	<?php wp_head(); ?>
	<link href="https://fonts.googleapis.com/css?family=Comfortaa:300" rel="stylesheet">
  <?php get_template_part('partials-page/page', 'meta'); ?>
</head>
<body <?php body_class(); ?>>
<?php get_template_part('partials-page/page', 'masthead'); ?>
