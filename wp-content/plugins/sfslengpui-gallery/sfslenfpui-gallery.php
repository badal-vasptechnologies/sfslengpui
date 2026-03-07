<?php
/*
Plugin Name: SFS Lengpui Gallery
Description: Custom album-style photo gallery plugin for SFS Lengpui website
Version: 1.1
Author: rex
*/

if (!defined('ABSPATH')) {
    exit;
}

define('SFSLENGPUI_GALLERY_VERSION', '1.1');
define('SFSLENGPUI_GALLERY_ALBUM_TAXONOMY', 'sfs_gallery_album');

// Enqueue styles
function sfslengpui_gallery_styles()
{
    wp_enqueue_style(
        'sfslengpui-gallery-style',
        plugin_dir_url(__FILE__) . 'gallery.css',
        array(),
        SFSLENGPUI_GALLERY_VERSION
    );
}
add_action('wp_enqueue_scripts', 'sfslengpui_gallery_styles');

/**
 * Register "Albums" taxonomy for Media Library items (attachments).
 */
function sfslengpui_register_gallery_album_taxonomy()
{
    $labels = array(
        'name' => __('Albums', 'sfslengpui-gallery'),
        'singular_name' => __('Album', 'sfslengpui-gallery'),
        'search_items' => __('Search Albums', 'sfslengpui-gallery'),
        'all_items' => __('All Albums', 'sfslengpui-gallery'),
        'parent_item' => __('Parent Album', 'sfslengpui-gallery'),
        'parent_item_colon' => __('Parent Album:', 'sfslengpui-gallery'),
        'edit_item' => __('Edit Album', 'sfslengpui-gallery'),
        'update_item' => __('Update Album', 'sfslengpui-gallery'),
        'add_new_item' => __('Add New Album', 'sfslengpui-gallery'),
        'new_item_name' => __('New Album Name', 'sfslengpui-gallery'),
        'menu_name' => __('Albums', 'sfslengpui-gallery'),
    );

    register_taxonomy(
        SFSLENGPUI_GALLERY_ALBUM_TAXONOMY,
        'attachment',
        array(
            'labels' => $labels,
            'hierarchical' => true,
            'show_ui' => true,
            'show_admin_column' => true,
            'show_in_rest' => true,
            'public' => false,
            'update_count_callback' => '_update_generic_term_count',
            'query_var' => false,
            'rewrite' => false,
        )
    );
}
add_action('init', 'sfslengpui_register_gallery_album_taxonomy');

/**
 * Add a quick help page under Media.
 */
function sfslengpui_gallery_register_help_page()
{
    add_media_page(
        __('SFS Gallery', 'sfslengpui-gallery'),
        __('SFS Gallery', 'sfslengpui-gallery'),
        'upload_files',
        'sfslengpui-gallery-help',
        'sfslengpui_gallery_render_help_page'
    );
}
add_action('admin_menu', 'sfslengpui_gallery_register_help_page');

function sfslengpui_gallery_render_help_page()
{
    if (!current_user_can('upload_files')) {
        wp_die(esc_html__('You do not have permission to access this page.', 'sfslengpui-gallery'));
    }

    $albums_url = admin_url('edit-tags.php?taxonomy=' . SFSLENGPUI_GALLERY_ALBUM_TAXONOMY . '&post_type=attachment');
    $media_url = admin_url('upload.php');

    echo '<div class="wrap">';
    echo '<h1>' . esc_html__('SFS Gallery Setup', 'sfslengpui-gallery') . '</h1>';
    echo '<p>' . esc_html__('This gallery now reads images from the WordPress Media Library.', 'sfslengpui-gallery') . '</p>';
    echo '<ol>';
    echo '<li>' . sprintf(
        wp_kses_post(__('Create album categories in <a href="%s">Media > Albums</a>.', 'sfslengpui-gallery')),
        esc_url($albums_url)
    ) . '</li>';
    echo '<li>' . sprintf(
        wp_kses_post(__('Upload images in <a href="%s">Media > Library</a>.', 'sfslengpui-gallery')),
        esc_url($media_url)
    ) . '</li>';
    echo '<li>' . esc_html__('Edit each image and assign it to one or more Albums.', 'sfslengpui-gallery') . '</li>';
    echo '<li>' . esc_html__('Use shortcode: [sfslengpui_gallery]', 'sfslengpui-gallery') . '</li>';
    echo '</ol>';
    echo '<p><strong>' . esc_html__('Legacy mode:', 'sfslengpui-gallery') . '</strong> ' . esc_html__('[sfslengpui_gallery source="folders" folder="gallery"]', 'sfslengpui-gallery') . '</p>';
    echo '</div>';
}

/**
 * Album Gallery Shortcode
 *
 * Default (WordPress way):
 *   [sfslengpui_gallery]
 *
 * Optional flat media mode:
 *   [sfslengpui_gallery mode="flat"]
 *
 * Legacy folder mode (backward compatible):
 *   [sfslengpui_gallery source="folders" folder="gallery"]
 *   [sfslengpui_gallery source="folders" folder="gallery" mode="flat"]
 */
function sfslengpui_gallery_shortcode($atts)
{
    $atts = shortcode_atts(
        array(
            'source' => 'media',       // 'media' (default) or 'folders'
            'folder' => 'gallery',
            'mode' => 'albums',        // 'albums' or 'flat'
            'title' => 'Photo Gallery',
            'taxonomy' => SFSLENGPUI_GALLERY_ALBUM_TAXONOMY,
            'size' => 'full',
        ),
        $atts,
        'sfslengpui_gallery'
    );

    $source = strtolower(trim($atts['source']));
    $mode = strtolower(trim($atts['mode']));
    $taxonomy = sanitize_key($atts['taxonomy']);
    $image_size = sanitize_key($atts['size']);

    if ($mode !== 'flat') {
        $mode = 'albums';
    }

    if ($source !== 'folders') {
        $source = 'media';
    }

    // ===== LEGACY FOLDER SOURCE =====
    if ($source === 'folders') {
        $folder = trim($atts['folder'], '/\\');
        $base_dir = plugin_dir_path(__FILE__) . $folder;
        $base_url = plugin_dir_url(__FILE__) . $folder;

        if (!is_dir($base_dir)) {
            return '<p>Gallery folder not found.</p>';
        }

        if ($mode === 'flat') {
            return sfslengpui_flat_gallery_from_folder($base_dir, $base_url);
        }

        $albums = sfslengpui_get_folder_albums($base_dir, $base_url);
        if (empty($albums)) {
            return '<p>No albums found. Create subfolders with images inside the gallery folder.</p>';
        }

        return sfslengpui_render_album_gallery($albums);
    }

    // ===== MEDIA LIBRARY SOURCE (default) =====
    if ($mode === 'flat') {
        return sfslengpui_flat_gallery_from_media($image_size);
    }

    if (!taxonomy_exists($taxonomy)) {
        return '<p>Gallery album taxonomy is not registered.</p>';
    }

    $albums = sfslengpui_get_media_albums($taxonomy, $image_size);
    if (empty($albums)) {
        return '<p>No albums found in Media Library. Create albums in Media > Albums and assign images to them.</p>';
    }

    return sfslengpui_render_album_gallery($albums);
}
add_shortcode('sfslengpui_gallery', 'sfslengpui_gallery_shortcode');

/**
 * Build album data from Media Library taxonomy terms.
 */
function sfslengpui_get_media_albums($taxonomy, $image_size)
{
    $albums = array();

    $terms = get_terms(
        array(
            'taxonomy' => $taxonomy,
            'hide_empty' => false,
            'orderby' => 'name',
            'order' => 'ASC',
        )
    );

    if (is_wp_error($terms) || empty($terms)) {
        return $albums;
    }

    foreach ($terms as $term) {
        $attachment_ids = get_posts(
            array(
                'post_type' => 'attachment',
                'post_status' => 'inherit',
                'post_mime_type' => 'image',
                'posts_per_page' => -1,
                'orderby' => 'menu_order ID',
                'order' => 'ASC',
                'fields' => 'ids',
                'tax_query' => array(
                    array(
                        'taxonomy' => $taxonomy,
                        'field' => 'term_id',
                        'terms' => $term->term_id,
                    ),
                ),
            )
        );

        if (empty($attachment_ids)) {
            continue;
        }

        $image_urls = array();
        $cover_url = '';

        foreach ($attachment_ids as $attachment_id) {
            $image_url = wp_get_attachment_image_url($attachment_id, $image_size);
            if (!$image_url) {
                $image_url = wp_get_attachment_url($attachment_id);
            }
            if (!$image_url) {
                continue;
            }

            if ($cover_url === '') {
                $cover_url = wp_get_attachment_image_url($attachment_id, 'medium_large');
                if (!$cover_url) {
                    $cover_url = $image_url;
                }
            }

            $image_urls[] = $image_url;
        }

        if (empty($image_urls)) {
            continue;
        }

        $albums[] = array(
            'name' => $term->name,
            'cover' => $cover_url,
            'images' => $image_urls,
        );
    }

    return $albums;
}

/**
 * Build album data from plugin folders (legacy mode).
 */
function sfslengpui_get_folder_albums($base_dir, $base_url)
{
    $albums = array();
    $items = scandir($base_dir);

    foreach ($items as $item) {
        if ($item === '.' || $item === '..') {
            continue;
        }

        $item_path = $base_dir . '/' . $item;
        if (!is_dir($item_path)) {
            continue;
        }

        $images = glob($item_path . '/*.{jpg,jpeg,png,gif,webp,JPG,JPEG,PNG,GIF,WEBP}', GLOB_BRACE);
        if (empty($images)) {
            continue;
        }

        usort(
            $images,
            function ($a, $b) {
                return strnatcasecmp(basename($a), basename($b));
            }
        );

        $image_urls = array();
        foreach ($images as $img) {
            $image_urls[] = $base_url . '/' . $item . '/' . rawurlencode(basename($img));
        }

        if (empty($image_urls)) {
            continue;
        }

        $album_name = str_replace(array('-', '_'), ' ', $item);
        $album_name = ucwords($album_name);

        $albums[] = array(
            'name' => $album_name,
            'cover' => $image_urls[0],
            'images' => $image_urls,
        );
    }

    return $albums;
}

/**
 * Render album view (same frontend UI for both data sources).
 */
function sfslengpui_render_album_gallery($albums)
{
    $output = '';

    $output .= '<section class="sfs-gallery-section">';
    $output .= '<div class="sfs-gallery-container">';
    $output .= '<div class="sfs-folder-grid">';

    foreach ($albums as $album) {
        $json_images = esc_attr(wp_json_encode($album['images']));
        $output .= '<div class="sfs-folder-item" data-album-name="' . esc_attr($album['name']) . '" data-album-images="' . $json_images . '">';
        $output .= '<img src="' . esc_url($album['cover']) . '" alt="' . esc_attr($album['name']) . '" loading="lazy">';
        $output .= '<div class="sfs-event-name">' . esc_html($album['name']) . '</div>';
        $output .= '</div>';
    }

    $output .= '</div>'; // .sfs-folder-grid
    $output .= '</div>'; // .sfs-gallery-container

    // Album Modal
    $output .= '<div class="sfs-modal" id="sfsFolderModal">';
    $output .= '<div class="sfs-modal-content">';
    $output .= '<div class="sfs-modal-header">';
    $output .= '<h2 id="sfsEventTitle"></h2>';
    $output .= '<button class="sfs-close" onclick="sfsCloseFolder()">&times;</button>';
    $output .= '</div>';
    $output .= '<div class="sfs-modal-images" id="sfsModalImages"></div>';
    $output .= '</div>';
    $output .= '</div>';

    // Fullscreen Image Modal
    $output .= '<div class="sfs-fullscreen-modal" id="sfsFullscreenModal">';
    $output .= '<button class="sfs-fullscreen-close" onclick="sfsCloseFullscreen()">&times;</button>';
    $output .= '<button class="sfs-nav-button sfs-nav-prev" onclick="sfsNavigateImage(-1)">&#10094;</button>';
    $output .= '<div class="sfs-fullscreen-content">';
    $output .= '<img id="sfsFullscreenImage" src="" alt="Fullscreen Image">';
    $output .= '</div>';
    $output .= '<button class="sfs-nav-button sfs-nav-next" onclick="sfsNavigateImage(1)">&#10095;</button>';
    $output .= '</div>';

    $output .= '</section>';

    // Inline JS (only once)
    $output .= sfslengpui_gallery_inline_js();

    return $output;
}

/**
 * Flat gallery from Media Library.
 */
function sfslengpui_flat_gallery_from_media($image_size)
{
    $attachment_ids = get_posts(
        array(
            'post_type' => 'attachment',
            'post_status' => 'inherit',
            'post_mime_type' => 'image',
            'posts_per_page' => -1,
            'orderby' => 'date',
            'order' => 'DESC',
            'fields' => 'ids',
        )
    );

    if (empty($attachment_ids)) {
        return '<p>No images found in Media Library.</p>';
    }

    $output = '<div class="sfslengpui-gallery">';
    $has_images = false;

    foreach ($attachment_ids as $attachment_id) {
        $url = wp_get_attachment_image_url($attachment_id, $image_size);
        if (!$url) {
            $url = wp_get_attachment_url($attachment_id);
        }
        if (!$url) {
            continue;
        }

        $has_images = true;
        $output .= '<div class="sfslengpui-gallery-item">';
        $output .= '<img src="' . esc_url($url) . '" alt="" loading="lazy">';
        $output .= '</div>';
    }

    $output .= '</div>';

    if (!$has_images) {
        return '<p>No images found in Media Library.</p>';
    }

    return $output;
}

/**
 * Flat gallery from plugin folder (legacy mode).
 */
function sfslengpui_flat_gallery_from_folder($dir, $base_url)
{
    $images = glob($dir . '/*.{jpg,jpeg,png,gif,webp,JPG,JPEG,PNG,GIF,WEBP}', GLOB_BRACE);

    if (empty($images)) {
        return '<p>No images found.</p>';
    }

    $output = '<div class="sfslengpui-gallery">';

    foreach ($images as $image) {
        $url = $base_url . '/' . rawurlencode(basename($image));
        $output .= '<div class="sfslengpui-gallery-item">';
        $output .= '<img src="' . esc_url($url) . '" alt="" loading="lazy">';
        $output .= '</div>';
    }

    $output .= '</div>';
    return $output;
}

/**
 * Backward-compatible function name.
 */
function sfslengpui_flat_gallery($dir, $base_url)
{
    return sfslengpui_flat_gallery_from_folder($dir, $base_url);
}

/**
 * Inline JavaScript for the album gallery.
 */
function sfslengpui_gallery_inline_js()
{
    static $js_outputted = false;
    if ($js_outputted) {
        return '';
    }
    $js_outputted = true;

    ob_start();
    ?>
    <script>
        (function () {
            var sfsCurrentImages = [];
            var sfsCurrentIndex = 0;

            window.sfsOpenFolder = function (eventName, images) {
                var modal = document.getElementById('sfsFolderModal');
                var eventTitle = document.getElementById('sfsEventTitle');
                var modalImages = document.getElementById('sfsModalImages');

                eventTitle.textContent = eventName;
                modalImages.innerHTML = '';

                images.forEach(function (src, index) {
                    var img = document.createElement('img');
                    img.src = src;
                    img.alt = eventName + ' Image ' + (index + 1);
                    img.loading = 'lazy';
                    img.onclick = function () { sfsOpenFullscreen(src, images, index); };
                    modalImages.appendChild(img);
                });

                document.body.classList.add('sfs-modal-open');
                modal.classList.add('sfs-active');
                modal.style.display = 'block';
                document.addEventListener('keydown', sfsHandleKeys);
            };

            window.sfsCloseFolder = function () {
                var modal = document.getElementById('sfsFolderModal');
                document.body.classList.remove('sfs-modal-open');
                modal.classList.remove('sfs-active');
                modal.style.display = 'none';
                document.removeEventListener('keydown', sfsHandleKeys);
            };

            function sfsOpenFullscreen(src, images, index) {
                var modal = document.getElementById('sfsFullscreenModal');
                var img = document.getElementById('sfsFullscreenImage');

                img.src = src;
                sfsCurrentImages = images;
                sfsCurrentIndex = index;

                modal.style.display = 'flex';
                document.body.classList.add('sfs-modal-open');
                modal.classList.add('sfs-active');
            }

            window.sfsCloseFullscreen = function () {
                var modal = document.getElementById('sfsFullscreenModal');
                document.body.classList.remove('sfs-modal-open');
                modal.classList.remove('sfs-active');
                modal.style.display = 'none';
                sfsCurrentImages = [];
                sfsCurrentIndex = 0;
            };

            window.sfsNavigateImage = function (direction) {
                if (!sfsCurrentImages.length) {
                    return;
                }
                sfsCurrentIndex = (sfsCurrentIndex + direction + sfsCurrentImages.length) % sfsCurrentImages.length;
                document.getElementById('sfsFullscreenImage').src = sfsCurrentImages[sfsCurrentIndex];
            };

            function sfsHandleKeys(e) {
                var fsModal = document.getElementById('sfsFullscreenModal');
                var isFullscreenOpen = fsModal && fsModal.style.display === 'flex';

                if (e.key === 'Escape') {
                    if (isFullscreenOpen) {
                        sfsCloseFullscreen();
                    } else {
                        sfsCloseFolder();
                    }
                }

                if (!isFullscreenOpen) {
                    return;
                }

                if (e.key === 'ArrowLeft') {
                    sfsNavigateImage(-1);
                }

                if (e.key === 'ArrowRight') {
                    sfsNavigateImage(1);
                }
            }

            // Close when clicking outside modal content
            window.addEventListener('click', function (e) {
                var folderModal = document.getElementById('sfsFolderModal');
                var fsModal = document.getElementById('sfsFullscreenModal');
                if (e.target === folderModal) {
                    sfsCloseFolder();
                }
                if (e.target === fsModal) {
                    sfsCloseFullscreen();
                }
            });

            // Click handler for folder items via data attributes
            document.addEventListener('click', function (e) {
                var folderItem = e.target.closest('.sfs-folder-item');
                if (!folderItem) {
                    return;
                }

                var albumName = folderItem.getAttribute('data-album-name');
                var albumImages = folderItem.getAttribute('data-album-images');

                if (albumName && albumImages) {
                    try {
                        var images = JSON.parse(albumImages);
                        sfsOpenFolder(albumName, images);
                    } catch (err) {
                        console.error('SFS Gallery: Could not parse album images', err);
                    }
                }
            });
        })();
    </script>
    <?php
    return ob_get_clean();
}
