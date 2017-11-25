<?php
add_action( 'show_user_profile', 'my_show_extra_profile_fields' );
add_action( 'edit_user_profile', 'my_show_extra_profile_fields' );

function my_show_extra_profile_fields( $user ) { ?>

<h3>Extra profile information</h3>

<table class="form-table">

    <tr>
        <th><label for="twitter">Twitter</label></th>

        <td>
            <input type="text" name="twitter" id="twitter" value="<?php echo esc_attr( get_the_author_meta( 'twitter', $user->ID ) ); ?>" class="regular-text" /><br />
            <span class="description">Please enter your Twitter username.</span>
        </td>
    </tr>

</table>
<?php }

add_action( 'personal_options_update', 'my_save_extra_profile_fields' );
add_action( 'edit_user_profile_update', 'my_save_extra_profile_fields' );

function my_save_extra_profile_fields( $user_id ) {

    if ( !current_user_can( 'edit_user', $user_id ) )
        return false;

    /* Copy and paste this line for additional fields. Make sure to change 'twitter' to the field ID. */
    update_usermeta( $user_id, 'twitter', $_POST['twitter'] );
}



// Set the hero image for other pages
/**
 * Plugin Name: 	Media Selector test plugin
 * Plugin URI:		http://jeroensormani.com/
 * Description:		Add a media selector to your settings page.
 * Version: 		0.0.1
 * Author: 			Jeroen Sormani
 * Author URI: 		http://www.jeroensormani.com/
 */



function my_admin_enqueue($hook_suffix) {
    if($hook_suffix == 'settings_page_media-selector') {
        wp_register_script( 'custom_wp_admin_script', get_template_directory_uri() . '/php/admin-script.js', false, '1.0.0' );
        wp_enqueue_script( 'custom_wp_admin_script' );
    }
}

add_action('admin_enqueue_scripts', 'my_admin_enqueue');

add_action( 'admin_menu', 'register_media_selector_settings_page' );

function register_media_selector_settings_page() {
	add_submenu_page( 'options-general.php', 'Media Selector', 'Media Selector', 'manage_options', 'media-selector', 'media_selector_settings_page_callback' );
}

function media_selector_settings_page_callback() {

	// Save attachment ID
	if ( isset( $_POST['submit_image_selector'] ) && isset( $_POST['image_attachment_id'] ) ) :
		update_option( 'media_selector_attachment_id', absint( $_POST['image_attachment_id'] ) );
	endif;

	wp_enqueue_media();

	?><form method='post' style='margin: 1rem;' data-hook="<?php echo $my_saved_attachment_post_id; ?>">
		<div class='image-preview-wrapper' style='margin: 1rem 0;'>
			<img id='image-preview' src='<?php echo wp_get_attachment_url( get_option( 'media_selector_attachment_id' ) ); ?>' height='100'>
		</div>
		<input id="upload_image_button" type="button" class="button" value="<?php _e( 'Upload image' ); ?>" />
		<input type='hidden' name='image_attachment_id' id='image_attachment_id' value='<?php echo get_option( 'media_selector_attachment_id' ); ?>'>
		<input type="submit" name="submit_image_selector" value="Save" class="button-primary">
	</form><?php

}


add_action( 'admin_footer', 'media_selector_print_scripts' );

function media_selector_print_scripts() {

	$my_saved_attachment_post_id = get_option( 'media_selector_attachment_id', 0 );


}


// Rewrite enqueued js to be async
add_filter( 'script_loader_tag', function ( $tag, $handle ) {
    if( is_admin() ) {
        return $tag;
    }
    return str_replace( ' src', ' async src', $tag );
}, 10, 2 );
