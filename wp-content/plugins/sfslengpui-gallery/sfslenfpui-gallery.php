<?php
/*
Plugin Name: SFS Lengpui Gallery
Description: Custom album-style photo gallery plugin for SFS Lengpui website
Version: 2.3
Author: rex
*/

if (!defined('ABSPATH')) {
    exit;
}

define('SFSLENGPUI_GALLERY_VERSION', '2.3');
define('SFSLENGPUI_GALLERY_ALBUM_TAXONOMY', 'sfs_gallery_album');

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('sfslengpui-gallery-style', plugin_dir_url(__FILE__) . 'gallery.css', array(), SFSLENGPUI_GALLERY_VERSION);
});

add_action('init', function () {
    register_taxonomy(SFSLENGPUI_GALLERY_ALBUM_TAXONOMY, 'attachment', array(
        'labels' => array(
            'name' => 'Albums',
            'singular_name' => 'Album',
            'menu_name' => 'Albums',
            'all_items' => 'All Albums',
            'edit_item' => 'Edit Album',
            'view_item' => 'View Album',
            'update_item' => 'Update Album',
            'add_new_item' => 'Add New Album',
            'new_item_name' => 'New Album Name',
            'search_items' => 'Search Albums'
        ),
        'hierarchical' => true,
        'show_ui' => true,
        'show_admin_column' => true,
        'show_in_rest' => true,
        'public' => false,
        'rewrite' => false,
    ));

    register_post_type('sfs_video', array(
        'labels' => array(
            'name' => 'Videos',
            'singular_name' => 'Video',
            'add_new' => 'Add New Video',
            'add_new_item' => 'Add New Video',
            'edit_item' => 'Edit Video',
            'new_item' => 'New Video',
            'view_item' => 'View Video',
            'search_items' => 'Search Videos',
            'not_found' => 'No videos found',
            'menu_name' => 'SFS Videos',
        ),
        'public' => true,
        'has_archive' => false,
        'menu_icon' => 'dashicons-video-alt3',
        'supports' => array('title', 'thumbnail'),
        'show_in_menu' => 'upload.php',
    ));
});

add_action('add_meta_boxes_sfs_video', function () {
    add_meta_box('sfs_video_url_box', 'Video Details', function ($post) {
        $url = get_post_meta($post->ID, '_sfs_video_url', true);
        echo '<p><label><strong>Video Link (YouTube, Vimeo, or MP4):</strong></label><br>';
        echo '<input type="url" id="sfs_video_url" name="sfs_video_url" value="' . esc_attr($url) . '" class="widefat" placeholder="https://www.youtube.com/watch?v=..." /><br>';
        echo '<button type="button" id="sfs_upload_video_btn" class="button" style="margin-top:10px;">Upload/Select Video</button><br>';
        echo '<small>Paste the full URL or click the button to upload a local video.</small></p>';
    }, 'sfs_video', 'normal', 'high');
});

add_action('save_post_sfs_video', function ($post_id) {
    if (array_key_exists('sfs_video_url', $_POST)) {
        update_post_meta($post_id, '_sfs_video_url', esc_url_raw($_POST['sfs_video_url']));
    }
});

add_filter('manage_edit-' . SFSLENGPUI_GALLERY_ALBUM_TAXONOMY . '_columns', function ($columns) {
    $columns['sfs_images'] = 'Manage Images';
    $columns['sfs_order'] = 'Order';
    return $columns;
});

add_filter('manage_' . SFSLENGPUI_GALLERY_ALBUM_TAXONOMY . '_custom_column', function ($content, $column_name, $term_id) {
    if ($column_name === 'sfs_images') {
        return sprintf('<button type="button" class="button button-primary sfslengpui-add-images" data-term-id="%d">Add Images</button>', $term_id);
    }
    if ($column_name === 'sfs_order') {
        return get_term_meta($term_id, 'sfslengpui_album_order', true) ?: '0';
    }
    return $content;
}, 10, 3);

add_action('admin_menu', function () {
    add_media_page('Reorder Albums', 'Reorder Albums', 'upload_files', 'sfs-reorder', 'sfslengpui_render_reorder_screen');
});

function sfslengpui_get_albums_sorted()
{
    $terms = get_terms(array('taxonomy' => SFSLENGPUI_GALLERY_ALBUM_TAXONOMY, 'hide_empty' => false));
    if (is_wp_error($terms) || empty($terms))
        return array();

    usort($terms, function ($a, $b) {
        $oa = (int) get_term_meta($a->term_id, 'sfslengpui_album_order', true);
        $ob = (int) get_term_meta($b->term_id, 'sfslengpui_album_order', true);
        return ($oa == $ob) ? strnatcasecmp($a->name, $b->name) : ($oa - $ob);
    });
    return $terms;
}

function sfslengpui_render_reorder_screen()
{
    $terms = sfslengpui_get_albums_sorted();
    ?>
    <div class="wrap">
        <h1>Reorder Gallery Albums</h1>
        <p>Drag and drop the albums below to change their display order on the website.</p>
        <ul id="sfs-sortable"
            style="background:#fff; border:1px solid #ccd0d4; max-width:600px; padding:0; list-style:none; border-radius:4px;">
            <?php foreach ($terms as $term): ?>
                <li data-id="<?php echo $term->term_id; ?>"
                    style="padding:15px; border-bottom:1px solid #eee; cursor:move; background:#fff; display:flex; align-items:center;">
                    <span class="dashicons dashicons-move" style="margin-right:15px; color:#999;"></span>
                    <strong><?php echo esc_html($term->name); ?></strong>
                </li>
            <?php endforeach; ?>
        </ul>
        <div style="margin-top:20px;">
            <button id="sfs-save-order" class="button button-primary button-large">Save New Order</button>
            <span id="sfs-status" style="margin-left:15px; font-weight:bold; color:#46b450;"></span>
        </div>
    </div>
    <script>
        jQuery(document).ready(function ($) {
            $("#sfs-sortable").sortable();
            $("#sfs-save-order").click(function () {
                var order = [];
                $("#sfs-sortable li").each(function () { order.push($(this).data("id")); });
                $("#sfs-status").text("Saving...");
                $.post(ajaxurl, { action: "sfs_save_bulk_order", order: order, nonce: "<?php echo wp_create_nonce('sfs-reorder'); ?>" }, function () {
                    $("#sfs-status").text("Order Saved!").fadeOut(3000, function () { $(this).text("").show(); });
                });
            });
        });
    </script>
    <?php
}


add_action('admin_enqueue_scripts', function ($hook) {
    wp_enqueue_media();
    wp_enqueue_script('jquery-ui-sortable');
    wp_add_inline_script('jquery', '
        jQuery(document).ready(function($){
            $(document).on("click", ".sfslengpui-add-images", function(e){
                e.preventDefault();
                var termId = $(this).data("term-id");
                var frame = wp.media({ title: "Add Images to Album", button: { text: "Add to Album" }, multiple: true });
                frame.on("select", function(){
                    var ids = [];
                    frame.state().get("selection").each(function(a){ ids.push(a.id); });
                    $.post(ajaxurl, {action: "sfs_add_images", term_id: termId, ids: ids, nonce: "' . wp_create_nonce('sfs-add') . '"}, function(){
                        alert("Images added successfully!");
                    });
                }).open();
            });

            // Local Video Uploader
            $(document).on("click", "#sfs_upload_video_btn", function(e){
                e.preventDefault();
                var frame = wp.media({ title: "Select/Upload Video", button: { text: "Use this Video" }, multiple: false, library: { type: "video" } });
                frame.on("select", function(){
                    var attachment = frame.state().get("selection").first().toJSON();
                    $("#sfs_video_url").val(attachment.url);
                }).open();
            });
        });
    ');
});

add_action('wp_ajax_sfs_save_bulk_order', function () {
    check_ajax_referer('sfs-reorder', 'nonce');
    foreach ((array) $_POST['order'] as $idx => $id)
        update_term_meta(intval($id), 'sfslengpui_album_order', $idx);
    wp_send_json_success();
});

add_action('wp_ajax_sfs_add_images', function () {
    check_ajax_referer('sfs-add', 'nonce');
    $tid = intval($_POST['term_id']);
    foreach ((array) $_POST['ids'] as $id)
        wp_set_object_terms(intval($id), $tid, SFSLENGPUI_GALLERY_ALBUM_TAXONOMY, true);
    wp_send_json_success();
});

add_shortcode('sfslengpui_gallery', function ($atts) {
    $atts = shortcode_atts(array('size' => 'full'), $atts);
    $albums = sfslengpui_get_albums_sorted();
    $videos = get_posts(array(
        'post_type' => 'sfs_video',
        'posts_per_page' => -1,
        'orderby' => 'menu_order',
        'order' => 'ASC'
    ));

    $html = '<section class="sfs-gallery-section">';
    $html .= '<div class="sfs-gallery-container">';

    $html .= '<div class="sfs-gallery-tabs">';
    $html .= '<button type="button" class="sfs-tab-btn active" onclick="sfsShowTab(\'photos\', this)">Photo Gallery</button>';
    $html .= '<button type="button" class="sfs-tab-btn" onclick="sfsShowTab(\'videos\', this)">Video Gallery</button>';
    $html .= '</div>';

    $html .= '<div id="sfs-tab-photos" class="sfs-tab-content active">';
    if (empty($albums)) {
        $html .= "<p style='text-align:center;'>No photo albums found.</p>";
    } else {
        $html .= '<div class="sfs-folder-grid">';
        foreach ($albums as $album) {
            $images = get_posts(array(
                'post_type' => 'attachment',
                'post_status' => 'inherit',
                'posts_per_page' => -1,
                'fields' => 'ids',
                'tax_query' => array(array('taxonomy' => SFSLENGPUI_GALLERY_ALBUM_TAXONOMY, 'field' => 'term_id', 'terms' => $album->term_id))
            ));
            if (empty($images))
                continue;

            $urls = array();
            foreach ($images as $id)
                $urls[] = wp_get_attachment_image_url($id, $atts['size']) ?: wp_get_attachment_url($id);
            $cover = wp_get_attachment_image_url($images[0], 'medium_large') ?: $urls[0];
            $json = esc_attr(wp_json_encode($urls));

            $html .= sprintf(
                '<div class="sfs-folder-item" onclick="if(window.sfsOpenFolder){ sfsOpenFolder(\'%s\', %s); }"><img src="%s" alt="%s" style="pointer-events:none;"><div class="sfs-event-name" style="pointer-events:none;">%s</div></div>',
                esc_js($album->name),
                $json,
                esc_url($cover),
                esc_attr($album->name),
                esc_html($album->name)
            );
        }
        $html .= '</div>';
    }
    $html .= '</div>'; 

    $html .= '<div id="sfs-tab-videos" class="sfs-tab-content">';
    if (empty($videos)) {
        $html .= "<p style='text-align:center;'>No videos found.</p>";
    } else {
        $html .= '<div class="sfs-folder-grid">';
        foreach ($videos as $video) {
            $url = get_post_meta($video->ID, '_sfs_video_url', true);
            $thumb = get_the_post_thumbnail_url($video->ID, 'medium_large') ?: plugin_dir_url(__FILE__) . 'video-placeholder.png';

            $html .= sprintf(
                '<div class="sfs-folder-item" onclick="if(window.sfsOpenVideo){ sfsOpenVideo(\'%s\', \'%s\'); }"><img src="%s" alt="%s" style="pointer-events:none;"><div class="sfs-event-name" style="pointer-events:none;">%s</div></div>',
                esc_js($video->post_title),
                esc_url($url),
                esc_url($thumb),
                esc_attr($video->post_title),
                esc_html($video->post_title)
            );
        }
        $html .= '</div>';
    }
    $html .= '</div>'; 

    $html .= '</div></section>';
    return $html;
});

add_action('wp_footer', function () {
    ?>
    <div class="sfs-modal" id="sfsFolderModal" style="display:none !important; z-index:99999999 !important;">
        <div class="sfs-modal-content">
            <div class="sfs-modal-header">
                <h2 id="sfsEventTitle"></h2>
                <button type="button" class="sfs-close" onclick="sfsCloseFolder()">&times;</button>
            </div>
            <div id="sfsModalImages" class="sfs-modal-images"></div>
        </div>
    </div>
    <div class="sfs-fullscreen-modal" id="sfsFullscreenModal" style="display:none; z-index:999999999 !important;">
        <button type="button" class="sfs-fullscreen-close" onclick="sfsCloseFullscreen()">&times;</button>
        <button type="button" class="sfs-nav-button sfs-nav-prev" onclick="sfsNavigateImage(-1)">&#10094;</button>
        <div class="sfs-fullscreen-content"><img id="sfsFullscreenImage" src=""></div>
        <button type="button" class="sfs-nav-button sfs-nav-next" onclick="sfsNavigateImage(1)">&#10095;</button>
    </div>
    <script>
        (function () {
            var sfsImgs = [], sfsIdx = 0;

            window.sfsShowTab = function (tabId, btn) {
                document.querySelectorAll('.sfs-tab-content').forEach(function (el) { el.classList.remove('active'); });
                document.querySelectorAll('.sfs-tab-btn').forEach(function (el) { el.classList.remove('active'); });
                document.getElementById('sfs-tab-' + tabId).classList.add('active');
                btn.classList.add('active');
            };

            window.sfsOpenVideo = function (name, url) {
                var m = document.getElementById('sfsFolderModal'), t = document.getElementById('sfsEventTitle'), c = document.getElementById('sfsModalImages');
                if (!m) return;
                t.textContent = name;
                c.innerHTML = '';
                var frame;
                if (url.includes('youtube.com') || url.includes('youtu.be')) {
                    var vidId = url.split('v=')[1] || url.split('/').pop().split('?')[0];
                    if (vidId && vidId.includes('&')) vidId = vidId.split('&')[0];
                    frame = '<iframe width="100%" height="500" src="https://www.youtube.com/embed/' + vidId + '?autoplay=1" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>';
                } else if (url.includes('vimeo.com')) {
                    var vidId = url.split('/').pop();
                    frame = '<iframe src="https://player.vimeo.com/video/' + vidId + '?autoplay=1" width="100%" height="500" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>';
                } else {
                    frame = '<video controls autoplay style="width:100%; max-height:500px;"><source src="' + url + '" type="video/mp4"></video>';
                }
                c.innerHTML = '<div class="sfs-video-wrapper" style="padding:20px;">' + frame + '</div>';
                document.body.classList.add('sfs-modal-open');
                m.classList.add('sfs-active'); m.style.setProperty('display', 'block', 'important');
            };

            window.sfsOpenFolder = function (name, imgs) {
                var m = document.getElementById('sfsFolderModal'), t = document.getElementById('sfsEventTitle'), c = document.getElementById('sfsModalImages');
                if (!m) return;
                t.textContent = name; c.innerHTML = '';
                sfsImgs = imgs;
                imgs.forEach(function (src, i) {
                    var img = document.createElement('img'); img.src = src;
                    img.onclick = function () { sfsOpenFS(src, imgs, i); };
                    c.appendChild(img);
                });
                document.body.classList.add('sfs-modal-open');
                m.classList.add('sfs-active'); m.style.setProperty('display', 'block', 'important');
            };

            window.sfsCloseFolder = function () {
                var m = document.getElementById('sfsFolderModal'), c = document.getElementById('sfsModalImages');
                document.body.classList.remove('sfs-modal-open');
                if (m) { m.classList.remove('sfs-active'); m.style.setProperty('display', 'none', 'important'); }
                if (c) { c.innerHTML = ''; } 
            };

            function sfsOpenFS(src, imgs, idx) {
                var m = document.getElementById('sfsFullscreenModal'), i = document.getElementById('sfsFullscreenImage');
                i.src = src; sfsImgs = imgs; sfsIdx = idx;
                m.style.display = 'flex'; m.classList.add('sfs-active');
                document.body.classList.add('sfs-modal-open');
            }

            window.sfsCloseFullscreen = function () {
                var m = document.getElementById('sfsFullscreenModal');
                if (m) { m.style.display = 'none'; m.classList.remove('sfs-active'); }
                if (!document.getElementById('sfsFolderModal').classList.contains('sfs-active')) document.body.classList.remove('sfs-modal-open');
            };

            window.sfsNavigateImage = function (d) {
                if (!sfsImgs.length) return;
                sfsIdx = (sfsIdx + d + sfsImgs.length) % sfsImgs.length;
                document.getElementById('sfsFullscreenImage').src = sfsImgs[sfsIdx];
            };

            document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { sfsCloseFullscreen(); sfsCloseFolder(); } });
        })();
    </script>
    <?php
});
