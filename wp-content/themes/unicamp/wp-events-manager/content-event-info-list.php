<?php
/**
 * The Template for displaying content events style list.
 *
 * Override this template by copying it to unicamp-child/wp-events-manager/content-event-list.php
 *
 * @author        ThemeMove
 * @package       Unicamp/WP-Events-Manager/Template
 * @version       1.0.0
 */

defined( 'ABSPATH' ) || exit;

/**
 * tp_event_before_loop_event hook
 */
do_action( 'tp_event_before_loop_event' );

if ( post_password_required() ) {
	echo get_the_password_form();

	return;
}

$extra_classes = 'grid-item';
?>

<div id="event-<?php the_ID(); ?>" <?php post_class( $extra_classes ); ?>>

	<?php
	/**
	 * tp_event_before_loop_event_summary hook
	 *
	 * @hooked tp_event_show_event_sale_flash - 10
	 * @hooked tp_event_show_event_images - 20
	 */
	do_action( 'tp_event_before_loop_event_item' );
	?>

	<div class="unicamp-box">
        <?php wpems_get_template( 'loop/start-date-new.php' ); ?>
		<div class="event-caption">
			<div class="event-caption-left">
				<?php wpems_get_template( 'loop/title-no-link.php' ); ?>
				<?php wpems_get_template( 'loop/start-date-info.php' ); ?>
			</div>
		</div>
	</div>

	<?php
	/**
	 * tp_event_after_loop_event_item hook
	 *
	 * @hooked tp_event_show_event_sale_flash - 10
	 * @hooked tp_event_show_event_images - 20
	 */
	do_action( 'tp_event_after_loop_event_item' );
	?>
</div>

<?php do_action( 'tp_event_after_loop_event' ); ?>
