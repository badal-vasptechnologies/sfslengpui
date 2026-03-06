<?php
/**
 * The Template for displaying event start date
 *
 * Override this template by copying it to unicamp-child/wp-events-manager/loop/start-date.php
 *
 * @author        ThemeMove
 * @package       Unicamp/WP-Events-Manager/Template
 * @version       1.0
 */

defined( 'ABSPATH' ) || exit;

$date_start = get_post_meta( get_the_ID(), 'tp_event_date_start', true );
$time_from  = $date_start ? strtotime( $date_start ) : time();

$post_id = get_the_ID();

// Fetch post data
$post = get_post($post_id);
$file_url = '';
$file_type = '';

// Detect PDF or image URL in post content
if ($post && !empty($post->post_content)) {
    // Try to match PDF
    if (preg_match('/https?:\/\/[^\s"]+\.pdf/i', $post->post_content, $matches)) {
        $file_url = esc_url($matches[0]);
        $file_type = 'pdf';
    }
    // Try to match image (jpg, jpeg, png)
    elseif (preg_match('/https?:\/\/[^\s"]+\.(jpg|jpeg|png)/i', $post->post_content, $matches)) {
        $file_url = esc_url($matches[0]);
        $file_type = 'image';
    }
}

// Fallback (optional demo PDF)
if (empty($file_url)) {
    $file_url = 'https://sn.laksvrddhi.com/wp-content/uploads/2025/10/nvol1-compressed.pdf';
    $file_type = 'pdf';
}

?>
<div class="event-start-date" style="width: 130px;">
    <a href="<?php echo $file_url; ?>" class="event-image unicamp-image" target="_blank">
    	<div class="post-thumbnail">
    	<div class="left-box">
        	<div class="event-date" style="padding: 8px;">
        		<div class="event-date--day"><?php echo date("d", $time_from); ?></div>
        		<div class="event-date--month"><?php echo date("M", $time_from); ?></div>
        	</div>
        </div>
    	</div>
    </a>
</div>
    

