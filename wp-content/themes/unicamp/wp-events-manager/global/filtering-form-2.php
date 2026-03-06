<?php
/**
 * The Template for displaying filtering form bar.
 *
 * Override this template by copying it to unicamp-child/wp-events-manager/global/filtering-form.php
 *
 * @author        ThimPress, leehld
 * @package       WP-Events-Manager/Template
 * @version       2.1.7
 */

defined( 'ABSPATH' ) || exit;


$type = 'Unicamp_WP_Widget_Event_Filtering';
global $wp_widget_factory;

if ( ! is_object( $wp_widget_factory ) || ! isset( $wp_widget_factory->widgets ) || ! isset( $wp_widget_factory->widgets[ $type ] ) ) {
	return;
}
?>

<div class="row">
    <div class="col-md-12">
        <div style="align-items: center;">
            <input type="search" class="form-input form-input-text" placeholder="Keyword…" value="" name="filter_name">
            <span class="form-icon" style="margin-left: -30px;"><i class="far fa-search"></i></span>
        </div>
    </div>
</div>


