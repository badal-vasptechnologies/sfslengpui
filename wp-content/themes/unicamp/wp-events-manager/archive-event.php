<?php
/**
 * The Template for displaying archive events page.
 *
 * Override this template by copying it to unicamp-child/wp-events-manager/archive-event.php
 *
 * @author        ThimPress, leehld
 * @package       WP-Events-Manager/Template
 * @version       2.1.7
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>
<div id="page-content" class="page-content">

	<?php wpems_get_template( 'global/filtering-form.php' ); ?>

	<div class="container" style="padding-left: 90px; padding-right: 90px;">
		<div class="row">

			<?php Unicamp_Sidebar::instance()->render( 'left' ); ?>

			<div class="page-main-content">

				<?php
				// Before main content
				do_action( 'tp_event_before_main_content' );
				do_action( 'tp_event_archive_description' );
				
				// -----------------------------
				// Custom Dynamic Event Query
				// -----------------------------
				
				$default_term = 'information';
				$current_term_slug = isset( $_GET['type'] ) ? sanitize_text_field( wp_unslash( $_GET['type'] ) ) : $default_term;
				$posts_per_page = 10;

				// Get current page for pagination
				$paged = 1;
				if ( get_query_var( 'paged' ) ) {
					$paged = get_query_var( 'paged' );
				} elseif ( isset( $_GET['paged'] ) ) {
					$paged = intval( $_GET['paged'] );
				}

				// Query args
				$event_args = array(
					'post_type'      => 'tp_event',
					'posts_per_page' => $posts_per_page,
					'paged'          => $paged,
					'tax_query'      => array(
						array(
							'taxonomy' => 'tp_event_category',
							'field'    => 'slug',
							'terms'    => $current_term_slug,
						),
					),
				);
				
				?>
                <?php if ( $current_term_slug == 'event' ) : ?>
					<h2 class="event-caption">Explore SFS Events</h2>
					<div class="heading-divider" style="background:#ae152d; width: 66px; height: 3px;"></div>
					<br>
				<?php else : ?>
					<h2 class="event-caption">Recent Announcements</h2>
					<div class="heading-divider" style="background:#ae152d; width: 66px; height: 3px;"></div>
					<br>
				<?php endif; ?>
				<div class="archive-filter-bars row row-xs-center">

					<div class="archive-filter-bar archive-filter-bar-left col-md-6">
						<div class="inner">
							<form id="archive-form-filtering" class="archive-form-filtering event-form-filtering" method="get">
								<?php
								$options         = Unicamp_Event::instance()->get_filtering_type_options();
								$selected        = Unicamp_Event::instance()->get_selected_type_option();
								$select_settings = [
									'fieldLabel' => esc_html__( 'Event Type:', 'unicamp' ),
								];
								?>
								<select class="unicamp-nice-select event-type" name="filter_type"
									data-select="<?php echo esc_attr( wp_json_encode( $select_settings ) ); ?>">
									<?php foreach ( $options as $value => $text ) : ?>
										<option value="<?php echo esc_attr( $value ); ?>" <?php selected( $selected, $value ); ?>>
											<?php echo esc_html( $text ); ?>
										</option>
									<?php endforeach; ?>
								</select>
								<input type="hidden" name="paged" value="1">
								<input type="hidden" name="type" value="<?php echo isset( $_GET['type'] ) ? esc_attr( $_GET['type'] ) : 'information'; ?>">
							</form>
						</div>
					</div>

					<div class="archive-filter-bar archive-filter-bar-left col-md-6">
						<?php wpems_get_template( 'global/filtering-form-2.php' ); ?>
					</div>

				</div>

				<?php if ( have_posts() ) : ?>
					<?php do_action( 'tp_event_before_event_loop' ); ?>

					<?php
					

					$event_query = new WP_Query( $event_args );

					if ( $event_query->have_posts() ) :
						wpems_get_template( 'loop/loop-start.php' );
						$event_style = Unicamp::setting( 'event_archive_style' );
						?>

						<?php if ( $current_term_slug == 'event' ) : ?>
						    <hr>
							<?php while ( $event_query->have_posts() ) : $event_query->the_post(); ?>
								<?php wpems_get_template_part( 'content-event', $event_style ); ?>
							<?php endwhile; ?>
						<?php else : ?>
						    <hr>
							<?php while ( $event_query->have_posts() ) : $event_query->the_post(); ?>
								<?php wpems_get_template_part( 'content-event-info', $event_style ); ?>
							<?php endwhile; ?>
						<?php endif; ?>

						<?php wpems_get_template( 'loop/loop-end.php' ); ?>

						<?php
						// -----------------------------
						// Custom Pagination
						// -----------------------------
						$total_pages = $event_query->max_num_pages;

						if ( $total_pages > 1 ) {

                            //  Current page
                            $paged = max( 1, get_query_var( 'paged', 1 ) );
                        
                            // Preserve URL parameters
                            $keep_args = array();
                            $keep_args['type'] = $current_term_slug; // always keep your active type (event/information)
                        
                            if ( isset( $_GET['filter_type'] ) && $_GET['filter_type'] !== '' ) {
                                $keep_args['filter_type'] = sanitize_text_field( wp_unslash( $_GET['filter_type'] ) );
                            }
                        
                            //  Proper base URL
                            // Use the current post type archive as the base for pagination
                            $base_url = trailingslashit( get_post_type_archive_link( 'tp_event' ) );
                        
                            // Append /page/%#%/ before query parameters
                            $base = $base_url . 'page/%#%/';
                        
                            echo '<div class="unicamp-pagination event-pagination">';
                        
                            //  Generate pagination links cleanly
                            echo paginate_links( array(
                                'base'      => $base,
                                'format'    => '', // We’re using pretty permalinks
                                'current'   => $paged,
                                'total'     => $total_pages,
                                'prev_text' => '<span class="prev">&laquo; Previous</span>',
                                'next_text' => '<span class="next">Next &raquo;</span>',
                                'add_args'  => $keep_args, // Ads ?type=event or ?type=information
                                'escape'    => false,      // revents #038;
                            ) );
                        
                            echo '</div>';
                        }


						?>

						<?php wp_reset_postdata(); ?>
					<?php endif; ?>
				<?php else : ?>
					<?php unicamp_load_template( 'global/content-none' ); ?>
				<?php endif; ?>

				<?php
				// After main content
				do_action( 'tp_event_after_main_content' );
				?>
			</div>

			<?php Unicamp_Sidebar::instance()->render( 'right' ); ?>

		</div>
	</div>
</div>

<?php get_footer(); ?>
