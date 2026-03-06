<?php
/**
 * The Template for displaying title in loop.
 *
 * Override this template by copying it to unicamp-child/wp-events-manager/loop/title.php
 *
 * @author        ThimPress, leehld
 * @package       WP-Events-Manager/Template
 * @version       2.1.7
 */

defined( 'ABSPATH' ) || exit;

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
<h3 class="event-title">
  <a href="<?php echo $file_url; ?>" target="_blank" style="color:black !important;"><?php the_title(); ?></a>
</h3>


