<?php
/**
 * ONE-TIME: Create Primary Menu + Elementor Pages (UNICAMP SAFE)
 */
 
function my_child_theme_assets() {

    // Parent theme CSS
    wp_enqueue_style(
        'parent-style',
        get_template_directory_uri() . '/style.css'
    );

    // Child common CSS
    wp_enqueue_style(
        'child-common-style',
        get_stylesheet_directory_uri() . '/assets/css/common.css',
        array('parent-style'),
        wp_get_theme()->get('Version')
    );

}
add_action('wp_enqueue_scripts', 'my_child_theme_assets');

add_action('init', function () {

    // 🔒 Prevent re-run forever
    if ( get_option('primary_menu_imported') ) {
        return;
    }

    /* ---------------------------------
     * 1. CREATE / GET MENU
     * --------------------------------- */
    $menu_name = 'Primary Menu';
    $menu = wp_get_nav_menu_object($menu_name);

    if ( ! $menu ) {
        $menu_id = wp_create_nav_menu($menu_name);
    } else {
        $menu_id = $menu->term_id;
    }

    /* ---------------------------------
     * 2. CLEAR MENU ITEMS ONCE
     * --------------------------------- */
    $existing_items = wp_get_nav_menu_items($menu_id);
    if ( $existing_items ) {
        foreach ( $existing_items as $item ) {
            wp_delete_post($item->ID, true);
        }
    }

    /* ---------------------------------
     * 3. MENU STRUCTURE
     * --------------------------------- */
    $menu_items = [

        [ 'title' => 'Home', 'home' => true ],

        [
            'title' => 'About Us',
            'slug'  => 'about',
            'children' => [

                [ 'title' => 'Message', 'slug' => 'message' ],

                [
                    'title' => 'Our History',
                    'slug'  => 'our-history',
                    'children' => [
                        [ 'title' => 'Congregation', 'slug' => 'history' ],
                        [ 'title' => 'Province',     'slug' => 'province' ],
                    ]
                ],

                [
                    'title' => 'Patrons & Founder',
                    'slug'  => 'patrons-founder',
                    'children' => [
                        [ 'title' => 'St. Francis De Sales', 'slug' => 'pfsfs' ],
                        [ 'title' => 'Mother of Sorrows',    'slug' => 'pfmos' ],
                        [ 'title' => 'Fr. Peter Mermier',    'slug' => 'pffpm' ],
                    ]
                ],

                [ 'title' => 'Provincial Congress', 'slug' => 'provincial-congress' ],

                [
                    'title' => 'Our Spirituality',
                    'slug'  => 'our-spirituality',
                    'children' => [
                        [ 'title' => 'Fransalian Mission', 'slug' => 'fransalian-mission' ],
                        [ 'title' => 'Fransalian Vision',  'slug' => 'fransalian-vision' ],
                        [ 'title' => 'Our Charism',        'slug' => 'our-charism' ],
                        [ 'title' => 'Our Apostolate',     'slug' => 'our-apostolate' ],
                    ]
                ],

                [ 'title' => 'Statistics', 'slug' => 'statistics' ],
            ]
        ],

        [
            'title' => 'Apostolates',
            'slug'  => 'apostolates',
            'children' => [

                [
                    'title' => 'Parish Mission',
                    'slug'  => 'parish-mission',
                    'children' => [
                        [ 'title' => 'Parish Ministry',  'slug' => 'parish-ministry' ],
                        [ 'title' => 'Renewal Ministry', 'slug' => 'renewal-ministry' ],
                    ]
                ],

                [ 'title' => 'Overseas Mission', 'slug' => 'overseas-mission' ],
                [ 'title' => 'Education',        'slug' => 'education' ],
                [ 'title' => 'Formation',        'slug' => 'formation' ],

                [
                    'title' => 'Innovative Ministry',
                    'slug'  => 'innovative-ministry',
                    'children' => [
                        [ 'title' => 'Social Ministry',         'slug' => 'social-ministry' ],
                        [ 'title' => 'Youth Ministry',          'slug' => 'youth-ministry' ],
                        [ 'title' => 'Media Ministry',          'slug' => 'media-ministry' ],
                        [ 'title' => 'Technical Education',     'slug' => 'technical-ministry' ],
                        [ 'title' => 'Hospital Administration', 'slug' => 'hospital-ministry' ],
                    ]
                ],
            ]
        ],

        [
            'title' => 'Administration',
            'slug'  => 'administration',
            'children' => [
                [ 'title' => 'General Administration',    'slug' => 'general-administration' ],
                [ 'title' => 'Provincial Administration', 'slug' => 'provincial-administration' ],
                [ 'title' => 'Regional Administration',   'slug' => 'regional-administration' ],
                [ 'title' => 'Delegation',                'slug' => 'delegation' ],
            ]
        ],

        [
            'title' => 'Members',
            'slug'  => 'members',
            'children' => [
                [ 'title' => 'Priests',          'slug' => 'priests' ],
                [ 'title' => 'Scholastics',       'slug' => 'scholastics' ],
                [ 'title' => 'Deceased Members',  'slug' => 'deceased-members' ],
            ]
        ],

        [
            'title' => 'Centres',
            'slug'  => 'centres',
            'children' => [
                [ 'title' => 'Parishes',         'slug' => 'parishes' ],
                [ 'title' => 'Renewal Centres',  'slug' => 'renewal' ],
                [ 'title' => 'Schools',          'slug' => 'school' ],
                [ 'title' => 'Institutions',     'slug' => 'institution' ],
                [ 'title' => 'Formation Houses', 'slug' => 'formation-houses' ],
            ]
        ],

        [
            'title' => 'Vocation',
            'slug'  => 'vocation',
            'children' => [
                [ 'title' => 'Vocation Discernment', 'slug' => 'vocation-discernment' ],
                [ 'title' => 'Fransalian Formation', 'slug' => 'fransalian-formation' ],
                [ 'title' => 'Join MSFS',             'slug' => 'join-msfs' ],
            ]
        ],

        [
            'title' => 'Publications',
            'slug'  => 'publications',
            'children' => [

                [
                    'title' => 'General Circulars',
                    'slug'  => 'general-circulars-group',
                    'children' => [
                        [ 'title' => 'General Circulars',    'slug' => 'general-circulars' ],
                        [ 'title' => 'Provincial Circulars', 'slug' => 'provincial-circulars' ],
                    ]
                ],

                [ 'title' => 'Fransalian Publications', 'slug' => 'fransalian-publications' ],
                [ 'title' => 'Fransalian Prayers',      'slug' => 'fprayers' ],
                [ 'title' => 'Birthday List',           'slug' => 'birthday-list' ],
                [ 'title' => 'Status',                  'slug' => 'status' ],
            ]
        ],

        [
            'title' => 'Gallery',
            'slug'  => 'gallery',
            'children' => [
                [ 'title' => 'Photos', 'slug' => 'photos' ],
                [ 'title' => 'Videos', 'slug' => 'videos' ],
            ]
        ],

        [ 'title' => 'Contact Us', 'slug' => 'contact-us' ],

    ];


    /* ---------------------------------
     * 4. RECURSIVE MENU + PAGE BUILDER
     * --------------------------------- */
    function unicamp_build_menu($items, $menu_id, $parent = 0) {

        foreach ( $items as $item ) {

            // HOME
            if ( ! empty($item['home']) ) {

                $menu_item_id = wp_update_nav_menu_item($menu_id, 0, [
                    'menu-item-title'  => 'Home',
                    'menu-item-url'    => home_url('/'),
                    'menu-item-type'   => 'custom',
                    'menu-item-status' => 'publish',
                    'menu-item-parent-id' => $parent,
                ]);

            } else {

                // GET OR CREATE PAGE
                $page = get_page_by_path($item['slug']);

                if ( ! $page ) {
                    $page_id = wp_insert_post([
                        'post_title'  => $item['title'],
                        'post_name'   => $item['slug'],
                        'post_status' => 'publish',
                        'post_type'   => 'page',
                    ]);
                } else {
                    $page_id = $page->ID;
                }

                // 🔥 FORCE ELEMENTOR MODE
                update_post_meta($page_id, '_elementor_edit_mode', 'builder');
                update_post_meta($page_id, '_wp_page_template', 'elementor_header_footer');

                // ADD MENU ITEM AS PAGE
                $menu_item_id = wp_update_nav_menu_item($menu_id, 0, [
                    'menu-item-title'     => $item['title'],
                    'menu-item-object'    => 'page',
                    'menu-item-object-id' => $page_id,
                    'menu-item-type'      => 'post_type',
                    'menu-item-status'    => 'publish',
                    'menu-item-parent-id' => $parent,
                ]);
            }

            // CHILDREN
            if ( ! empty($item['children']) ) {
                unicamp_build_menu($item['children'], $menu_id, $menu_item_id);
            }
        }
    }

    unicamp_build_menu($menu_items, $menu_id);

    /* ---------------------------------
     * 5. ASSIGN MENU LOCATION (UNICAMP)
     * --------------------------------- */
    $locations = get_theme_mod('nav_menu_locations', []);
    $locations['primary'] = $menu_id;
    set_theme_mod('nav_menu_locations', $locations);

    // 🔒 LOCK FOREVER
    update_option('primary_menu_imported', true);
});
