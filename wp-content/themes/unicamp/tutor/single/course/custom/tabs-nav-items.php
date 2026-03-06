<?php
/**
 * Display tabs nav
 *
 * @since   v.1.0.0
 * @author  thememove
 * @url https://thememove.com
 *
 * @package Unicamp/TutorLMS/Templates
 * @version 2.0.0
 */

defined( 'ABSPATH' ) || exit;

/**
 * @var Unicamp_Course $unicamp_course
 */
global $unicamp_course;

/**
 * @var WP_Query $topics
 */
$topics = $unicamp_course->get_topics();

$course_nav_items = apply_filters( 'tutor_course/single/enrolled/nav_items', [
	'questions'     => __( 'Q&A', 'unicamp' ),
	'announcements' => __( 'Announcements', 'unicamp' ),
] );
?>
<li class="active tutor-single-course-tabs-nav--overview">
	<a href="#tutor-course-tab-overview"><?php esc_html_e( 'Overview', 'unicamp' ); ?></a>
</li>
<?php if ( $topics->have_posts() ): ?>
	<li class="tutor-single-course-tabs-nav--curriculum">
		<a href="#tutor-course-tab-curriculum"><?php esc_html_e( 'Curriculum', 'unicamp' ); ?></a>
	</li>
<?php endif; ?>
<?php if ( $unicamp_course->is_viewable() && ! empty( $unicamp_course->get_attachments() ) ): ?>
	<li class="tutor-single-course-tabs-nav--resources">
		<a href="#tutor-course-tab-resources"><?php esc_html_e( 'Resources', 'unicamp' ); ?></a>
	</li>
<?php endif; ?>
<?php if ( $unicamp_course->is_viewable() ): ?>
	<li class="tutor-single-course-tabs-nav--question-and-answer">
		<a href="#tutor-course-tab-question-and-answer"><?php esc_html_e( 'Question & Answer', 'unicamp' ); ?></a>
	</li>
<?php endif; ?>
<li class="tutor-single-course-tabs-nav--instructors">
	<a href="#tutor-course-tab-instructors"><?php esc_html_e( 'Instructors', 'unicamp' ); ?></a>
</li>
<?php if ( $unicamp_course->is_viewable() ): ?>
	<li class="tutor-single-course-tabs-nav--announcements">
		<a href="#tutor-course-tab-announcements"><?php esc_html_e( 'Announcements', 'unicamp' ); ?></a>
	</li>
<?php endif; ?>
<?php if ( $unicamp_course->is_viewable() && isset( $course_nav_items['google-classroom-stream'] ) ): ?>
	<li class="tutor-single-course-tabs-nav--google-classroom-stream">
		<a href="#tutor-course-tab-google-classroom-stream"><?php echo esc_html( $course_nav_items['google-classroom-stream'] ); ?></a>
	</li>
<?php endif; ?>
<?php if ( $unicamp_course->is_viewable() && class_exists( '\TUTOR_GB\GradeBook' ) ): ?>
	<li class="tutor-single-course-tabs-nav--gradebook">
		<a href="#tutor-course-tab-gradebook"><?php esc_html_e( 'Gradebook', 'unicamp' ); ?></a>
	</li>
<?php endif; ?>
<?php if ( $unicamp_course->get_reviews() ) : ?>
	<li class="tutor-single-course-tabs-nav--reviews">
		<a href="#tutor-course-tab-reviews"><?php esc_html_e( 'Reviews', 'unicamp' ); ?></a>
	</li>
<?php endif; ?>
