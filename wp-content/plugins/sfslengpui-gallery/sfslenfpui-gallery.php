<?php
/*
Plugin Name: SFS Lengpui Gallery
Description: Custom album-style photo gallery plugin for SFS Lengpui website
Version: 1.0
Author: IT Geek
*/

if (!defined('ABSPATH')) {
    exit;
}

// Enqueue styles
function sfslengpui_gallery_styles()
{
    wp_enqueue_style(
        'sfslengpui-gallery-style',
        plugin_dir_url(__FILE__) . 'gallery.css',
        array(),
        '1.0'
    );
}
add_action('wp_enqueue_scripts', 'sfslengpui_gallery_styles');


/**
 * Album Gallery Shortcode
 *
 * Usage: [sfslengpui_gallery folder="gallery"]
 *
 * Place album subfolders inside the specified folder.
 * Each subfolder becomes an album card.
 * The first image in each subfolder is used as the album cover.
 * The subfolder name is used as the album title (underscores and hyphens become spaces).
 *
 * Example directory structure:
 *   /gallery
 *     /school
 *       1.jpeg, 2.jpeg, ...
 *     /houses
 *       1.jpeg, 2.jpeg, ...
 *     /principal-and-staff
 *       photo1.jpeg, photo2.jpeg, ...
 *
 * You can also use the simple flat mode (no subfolders) like before:
 *   [sfslengpui_gallery folder="gallery" mode="flat"]
 */
function sfslengpui_gallery_shortcode($atts)
{

    $atts = shortcode_atts(
        array(
            'folder' => 'gallery',
            'mode' => 'albums',  // 'albums' or 'flat'
            'title' => 'Photo Gallery',
        ),
        $atts
    );

    $base_dir = plugin_dir_path(__FILE__) . $atts['folder'];
    $base_url = plugin_dir_url(__FILE__) . $atts['folder'];

    if (!is_dir($base_dir)) {
        return '<p>Gallery folder not found.</p>';
    }

    // ===== FLAT MODE (backward compatible) =====
    if ($atts['mode'] === 'flat') {
        return sfslengpui_flat_gallery($base_dir, $base_url);
    }

    // ===== ALBUM MODE =====
    $albums = array();
    $items = scandir($base_dir);

    foreach ($items as $item) {
        if ($item === '.' || $item === '..')
            continue;
        $item_path = $base_dir . '/' . $item;
        if (!is_dir($item_path))
            continue;

        // Collect images from this subfolder
        $images = glob($item_path . '/*.{jpg,jpeg,png,gif,webp,JPG,JPEG,PNG,GIF,WEBP}', GLOB_BRACE);
        if (empty($images))
            continue;

        // Sort images naturally
        usort($images, function ($a, $b) {
            return strnatcasecmp(basename($a), basename($b));
        });

        // Build image URLs
        $image_urls = array();
        foreach ($images as $img) {
            $image_urls[] = $base_url . '/' . $item . '/' . rawurlencode(basename($img));
        }

        // Pretty album name from folder name
        $album_name = str_replace(array('-', '_'), ' ', $item);
        $album_name = ucwords($album_name);

        // Cover = first image
        $cover_url = $image_urls[0];

        $albums[] = array(
            'name' => $album_name,
            'cover' => $cover_url,
            'images' => $image_urls,
        );
    }

    if (empty($albums)) {
        return '<p>No albums found. Create subfolders with images inside the gallery folder.</p>';
    }

    // Generate a unique ID to support multiple galleries on one page
    $gallery_id = 'sfs_gallery_' . wp_rand(1000, 9999);

    // ----- OUTPUT -----
    $output = '';

    // Hero banner
    // $output .= '<div class="photo-gallery-hero">';
    // $output .= '<div class="container">';
    // $output .= '<h1>' . esc_html($atts['title']) . '</h1>';
    // $output .= '</div>';
    // $output .= '</div>';

    // Album grid
    $output .= '<section class="sfs-gallery-section">';
    $output .= '<div class="sfs-gallery-container">';
    $output .= '<div class="sfs-folder-grid">';

    foreach ($albums as $idx => $album) {
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
add_shortcode('sfslengpui_gallery', 'sfslengpui_gallery_shortcode');


/**
 * Simple flat gallery (backward compatible)
 */
function sfslengpui_flat_gallery($dir, $base_url)
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
 * Inline JavaScript for the album gallery
 */
function sfslengpui_gallery_inline_js()
{
    static $js_outputted = false;
    if ($js_outputted)
        return '';
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
                sfsCurrentIndex = (sfsCurrentIndex + direction + sfsCurrentImages.length) % sfsCurrentImages.length;
                document.getElementById('sfsFullscreenImage').src = sfsCurrentImages[sfsCurrentIndex];
            };

            function sfsHandleKeys(e) {
                if (e.key === 'Escape') {
                    var fsModal = document.getElementById('sfsFullscreenModal');
                    if (fsModal.style.display === 'flex') {
                        sfsCloseFullscreen();
                    } else {
                        sfsCloseFolder();
                    }
                }
                if (e.key === 'ArrowLeft') sfsNavigateImage(-1);
                if (e.key === 'ArrowRight') sfsNavigateImage(1);
            }

            // Close when clicking outside modal content
            window.addEventListener('click', function (e) {
                var folderModal = document.getElementById('sfsFolderModal');
                var fsModal = document.getElementById('sfsFullscreenModal');
                if (e.target === folderModal) sfsCloseFolder();
                if (e.target === fsModal) sfsCloseFullscreen();
            });

            // Click handler for folder items via data attributes
            document.addEventListener('click', function (e) {
                var folderItem = e.target.closest('.sfs-folder-item');
                if (!folderItem) return;
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