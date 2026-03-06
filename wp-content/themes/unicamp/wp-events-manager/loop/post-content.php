<?php
defined('ABSPATH') || exit;

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


<a href="<?php echo $file_url ?>" style="color: black;" target="_blank">
   <i class="fa fa-paperclip" aria-hidden="true"></i>
</a>
