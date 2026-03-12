<?php
/**
 * Define constant
 */
$theme = wp_get_theme();

if ( ! empty( $theme['Template'] ) ) {
	$theme = wp_get_theme( $theme['Template'] );
}

if ( ! defined( 'UNICAMP_DS' ) ) {
	define( 'UNICAMP_DS', DIRECTORY_SEPARATOR );
}

define( 'UNICAMP_THEME_NAME', $theme['Name'] );
define( 'UNICAMP_THEME_VERSION', $theme['Version'] );
define( 'UNICAMP_THEME_DIR', get_template_directory() );
define( 'UNICAMP_THEME_URI', get_template_directory_uri() );
define( 'UNICAMP_THEME_ASSETS_DIR', get_template_directory() . '/assets' );
define( 'UNICAMP_THEME_ASSETS_URI', get_template_directory_uri() . '/assets' );
define( 'UNICAMP_THEME_IMAGE_URI', UNICAMP_THEME_ASSETS_URI . '/images' );
define( 'UNICAMP_THEME_SVG_DIR', UNICAMP_THEME_ASSETS_DIR . '/svg' );
define( 'UNICAMP_THEME_SVG_URI', UNICAMP_THEME_ASSETS_URI . '/svg' );
define( 'UNICAMP_FRAMEWORK_DIR', get_template_directory() . UNICAMP_DS . 'framework' );
define( 'UNICAMP_CUSTOMIZER_DIR', UNICAMP_THEME_DIR . UNICAMP_DS . 'customizer' );
define( 'UNICAMP_WIDGETS_DIR', get_template_directory() . UNICAMP_DS . 'widgets' );
define( 'UNICAMP_PROTOCOL', is_ssl() ? 'https' : 'http' );
define( 'UNICAMP_IS_RTL', is_rtl() ? true : false );

define( 'UNICAMP_TUTOR_DIR', get_template_directory() . UNICAMP_DS . 'framework' . UNICAMP_DS . 'tutor' );
define( 'UNICAMP_FAQ_DIR', get_template_directory() . UNICAMP_DS . 'framework' . UNICAMP_DS . 'faq' );

define( 'UNICAMP_ELEMENTOR_DIR', get_template_directory() . UNICAMP_DS . 'elementor' );
define( 'UNICAMP_ELEMENTOR_URI', get_template_directory_uri() . '/elementor' );
define( 'UNICAMP_ELEMENTOR_ASSETS', get_template_directory_uri() . '/elementor/assets' );

/**
 * Load Framework.
 */
require_once UNICAMP_FRAMEWORK_DIR . '/class-functions.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-debug.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-aqua-resizer.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-performance.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-static.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-init.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-helper.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-global.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-actions-filters.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-kses.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-notices.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-popup.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-admin.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-compatible.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-customize.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-nav-menu.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-enqueue.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-image.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-minify.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-color.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-datetime.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-import.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-kirki.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-login-register.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-metabox.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-plugins.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-custom-css.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-templates.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-walker-nav-menu.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-sidebar.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-top-bar.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-header.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-title-bar.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-footer.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-post-type-blog.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-image-hotspot.php';

require_once UNICAMP_WIDGETS_DIR . '/class-widget-init.php';

require_once UNICAMP_TUTOR_DIR . '/class-tutor.php';

require_once UNICAMP_FAQ_DIR . '/main.php';

unicamp_require_once( UNICAMP_THEME_DIR . '/wp-events-manager/_classes/main.php' );
unicamp_require_once( UNICAMP_THEME_DIR . '/video-conferencing-zoom/_classes/main.php' );
unicamp_require_once( UNICAMP_THEME_DIR . '/buddypress/_classes/main.php' );

require_once UNICAMP_FRAMEWORK_DIR . '/woocommerce/class-woo.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-content-protected.php';
require_once UNICAMP_FRAMEWORK_DIR . '/tgm-plugin-activation.php';
require_once UNICAMP_FRAMEWORK_DIR . '/tgm-plugin-registration.php';
require_once UNICAMP_FRAMEWORK_DIR . '/class-tha.php';

require_once UNICAMP_ELEMENTOR_DIR . '/class-entry.php';

/**
 * Init the theme
 */
Unicamp_Init::instance()->initialize();




/**
 * Shortcode to display Examination Schedule Table
 */

function test_routine_class_1_2() {
    ob_start();
    ?>
    <style>
        .unicamp-custom-table-container {
            margin: 20px 0;
            overflow-x: auto;
        }
        .unicamp-custom-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 15px;
            line-height: 1.5;
            color: #333;
            border: 1px solid #dee2e6;
        }
        .unicamp-custom-table th {
            background-color: #2c3e50; /* Professional professional dark color often used in education themes */
            color: #ffffff;
            font-weight: 600;
            padding: 15px;
            text-align: center;
            border: 1px solid #dee2e6;
            text-transform: uppercase;
            font-size: 13px;
            letter-spacing: 0.5px;
        }
        .unicamp-custom-table td {
            padding: 12px 15px;
            border: 1px solid #dee2e6;
            text-align: center;
        }
        .unicamp-custom-table tbody tr:nth-child(even) {
            background-color: #f8f9fa;
        }
        .unicamp-custom-table tbody tr:hover {
            background-color: #f1f3f5;
        }
    </style>
    <div class="unicamp-custom-table-container">
        <table class="unicamp-custom-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>1st Session (9:00 - 10:00)</th>
                    <th>2nd Session (10:00 - 11:00)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>27/01/2026</td>
                    <td>English</td>
                    <td>God's Ways</td>
                </tr>
                <tr>
                    <td>28/01/2026</td>
                    <td>Maths</td>
                    <td>G.K</td>
                </tr>
                <tr>
                    <td>29/01/2026</td>
                    <td>Mizo</td>
                    <td>Conversation</td>
                </tr>
                <tr>
                    <td>30/01/2026</td>
                    <td>I.T</td>
                    <td>Grammar</td>
                </tr>
            </tbody>
        </table>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode( 'class_1_2_routine', 'test_routine_class_1_2' );


function test_routine_class_3_8() {
    ob_start();
    ?>
    <style>
        .unicamp-routine-wrapper {
            margin: 30px 0;
            overflow-x: auto;
        }
        .unicamp-routine-table {
            width: 100%;
            border-collapse: collapse;
            min-width: 900px;
            border: 1px solid #dee2e6;
            font-size: 14px;
        }
        .unicamp-routine-table th, 
        .unicamp-routine-table td {
            border: 1px solid #dee2e6;
            padding: 12px 10px;
            text-align: center;
        }
        .unicamp-routine-table thead tr.main-head th {
            background-color: #2c3e50;
            color: #fff;
            text-transform: uppercase;
            font-weight: 700;
        }
        .unicamp-routine-table thead tr.sub-head th {
            background-color: #f1f3f5;
            color: #495057;
            font-size: 12px;
            font-weight: 600;
        }
        .class-header-col {
            background-color: #34495e !important;
            width: 80px;
        }
        .class-name-cell {
            font-weight: 700;
            background-color: #f8f9fa;
            color: #2c3e50;
        }
        .unicamp-routine-table tbody tr:hover {
            background-color: #fefefe;
        }
    </style>
    <div class="unicamp-routine-wrapper">
        <table class="unicamp-routine-table">
            <thead>
                <tr class="main-head">
                    <th rowspan="2" class="class-header-col">CLASS</th>
                    <th colspan="2">27/01/2026</th>
                    <th colspan="2">28/01/2026</th>
                    <th colspan="2">29/01/2026</th>
                    <th colspan="2">30/01/2026</th>
                    <th colspan="2">02/02/2026</th>
                </tr>
                <tr class="sub-head">
                    <th>1ST</th>
                    <th>2ND</th>
                    <th>1ST</th>
                    <th>2ND</th>
                    <th>1ST</th>
                    <th>2ND</th>
                    <th>1ST</th>
                    <th>2ND</th>
                    <th>1ST</th>
                    <th>2ND</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="class-name-cell">III</td>
                    <td>EVS</td>
                    <td>MIZO</td>
                    <td>God's ways</td>
                    <td>GK</td>
                    <td>ENGLISH</td>
                    <td>GRAMMAR</td>
                    <td>HINDI</td>
                    <td>IT</td>
                    <td>MATHS</td>
                    <td>OFF</td>
                </tr>
                <!-- Row IV -->
                <tr>
                    <td class="class-name-cell">IV</td>
                    <td>MIZO</td>
                    <td>GK</td>
                    <td>ENGLISH</td>
                    <td>GRAM</td>
                    <td>EVS</td>
                    <td>IT</td>
                    <td>HINDI</td>
                    <td>God's Ways</td>
                    <td>MATHS</td>
                    <td>OFF</td>
                </tr>
                <!-- Row V -->
                <tr>
                    <td class="class-name-cell">V</td>
                    <td>HINDI</td>
                    <td>IT</td>
                    <td>EVS</td>
                    <td>God's Ways</td>
                    <td>MIZO</td>
                    <td>GK</td>
                    <td>ENGLISH</td>
                    <td>GRAM</td>
                    <td>MATHS</td>
                    <td>OFF</td>
                </tr>
                <!-- Row VI -->
                <tr>
                    <td class="class-name-cell">VI</td>
                    <td>ENG</td>
                    <td>GRAMMAR</td>
                    <td>MATHS</td>
                    <td>God's Ways</td>
                    <td>MIZO</td>
                    <td>HINDI</td>
                    <td>SCIENCE</td>
                    <td>GK</td>
                    <td>SS</td>
                    <td>IT</td>
                </tr>
                <!-- Row VII -->
                <tr>
                    <td class="class-name-cell">VII</td>
                    <td>SS</td>
                    <td>IT</td>
                    <td>SCIENCE</td>
                    <td>GK</td>
                    <td>MATHS</td>
                    <td>God's Ways</td>
                    <td>ENGLISH</td>
                    <td>GRAM</td>
                    <td>MIZO</td>
                    <td>HINDI</td>
                </tr>
                <!-- Row VIII -->
                <tr>
                    <td class="class-name-cell">VIII</td>
                    <td>ENG</td>
                    <td>GRAM</td>
                    <td>MATHS</td>
                    <td>God's Ways</td>
                    <td>MIZO</td>
                    <td>HINDI</td>
                    <td>SCIENCE</td>
                    <td>GK</td>
                    <td>SS</td>
                    <td>IT</td>
                </tr>
            </tbody>
        </table>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode( 'class_3_8_routine', 'test_routine_class_3_8' );

/**
 * Shortcode to display Examination Schedule Table for Class KG
 */
function test_routine_class_kg() {
    ob_start();
    ?>
    <style>
        .unicamp-kg-routine-wrapper {
            margin: 20px 0;
            overflow-x: auto;
        }
        .unicamp-kg-routine-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 15px;
            line-height: 1.5;
            color: #333;
            border: 1px solid #dee2e6;
        }
        .unicamp-kg-routine-table th {
            background-color: #2c3e50;
            color: #ffffff;
            font-weight: 600;
            padding: 15px;
            text-align: center;
            border: 1px solid #dee2e6;
            text-transform: uppercase;
            font-size: 13px;
            letter-spacing: 0.5px;
        }
        .unicamp-kg-routine-table td {
            padding: 12px 15px;
            border: 1px solid #dee2e6;
            text-align: center;
        }
        .date-day-cell {
            font-size: 14px;
        }
        .date-day-cell span {
            display: block;
            font-size: 11px;
            color: #666;
            margin-top: 4px;
        }
        .unicamp-kg-routine-table tbody tr:nth-child(even) {
            background-color: #f8f9fa;
        }
        .unicamp-kg-routine-table tbody tr:hover {
            background-color: #f1f3f5;
        }
    </style>
    <div class="unicamp-kg-routine-wrapper">
        <table class="unicamp-kg-routine-table">
            <thead>
                <tr>
                    <th>DATE (DAY)</th>
                    <th colspan="3">SUBJECTS</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="date-day-cell">11/02/2026<span>Thursday</span></td>
                    <td>MATHS</td>
                    <td>CONVERSATION</td>
                    <td>RECITATION</td>
                </tr>
                <tr>
                    <td class="date-day-cell">12/02/2026<span>Wednesday</span></td>
                    <td>ENGLISH</td>
                    <td>DICTATION</td>
                    <td>STORY TELLING</td>
                </tr>
                <tr>
                    <td class="date-day-cell">13/02/2026<span>Friday</span></td>
                    <td>SCIENCE</td>
                    <td>ART</td>
                    <td>RHYMES</td>
                </tr>
            </tbody>
        </table>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode( 'class_kg_routine', 'test_routine_class_kg' );

/**
 * Shortcode to display Examination Schedule Table for Class IX
 */
function test_routine_class_9() {
    ob_start();
    ?>
    <style>
        .unicamp-class9-routine-wrapper {
            margin: 20px 0;
            overflow-x: auto;
        }
        .unicamp-class9-routine-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 15px;
            line-height: 1.5;
            color: #333;
            border: 1px solid #dee2e6;
        }
        .unicamp-class9-routine-table th {
            background-color: #2c3e50;
            color: #ffffff;
            font-weight: 600;
            padding: 15px;
            text-align: center;
            border: 1px solid #dee2e6;
            text-transform: uppercase;
            font-size: 13px;
            letter-spacing: 0.5px;
        }
        .unicamp-class9-routine-table td {
            padding: 12px 15px;
            border: 1px solid #dee2e6;
            text-align: center;
        }
        .holiday-row td {
            background-color: #fff5f5 !important;
            color: #c53030 !important;
            font-weight: 700;
        }
        .unicamp-class9-routine-table tbody tr:nth-child(even):not(.holiday-row) {
            background-color: #f8f9fa;
        }
        .unicamp-class9-routine-table tbody tr:hover {
            background-color: #f1f3f5;
        }
    </style>
    <div class="unicamp-class9-routine-wrapper">
        <table class="unicamp-class9-routine-table">
            <thead>
                <tr>
                    <th>DATE</th>
                    <th>DAY</th>
                    <th>SUBJECT (CLASS IX)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>16-02-2026</td>
                    <td>Monday</td>
                    <td>Social Science</td>
                </tr>
                <tr>
                    <td>17-02-2026</td>
                    <td>Tuesday</td>
                    <td>GOD'S WAYS</td>
                </tr>
                <tr>
                    <td>18-02-2026</td>
                    <td>Wednesday</td>
                    <td>English</td>
                </tr>
                <tr>
                    <td>19-02-2026</td>
                    <td>Thursday</td>
                    <td>MIZO</td>
                </tr>
                <tr class="holiday-row">
                    <td>20-02-2026</td>
                    <td>Friday</td>
                    <td>STATE DAY (Holiday)</td>
                </tr>
                <tr>
                    <td>23-02-2026</td>
                    <td>Monday</td>
                    <td>Mathematics</td>
                </tr>
                <tr>
                    <td>25-02-2026</td>
                    <td>Wednesday</td>
                    <td>Science</td>
                </tr>
            </tbody>
        </table>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode( 'class_9_routine', 'test_routine_class_9' );

/**
 * Shortcode to display Third Terminal Examination Routine (Class I to VIII)
 */
function test_routine_third_terminal_1_8() {
    ob_start();
    ?>
    <style>
        .unicamp-terminal-routine-wrapper {
            margin: 20px 0;
            overflow-x: auto;
        }
        .unicamp-terminal-routine-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
            line-height: 1.4;
            color: #333;
            border: 1px solid #dee2e6;
            min-width: 1000px;
        }
        .unicamp-terminal-routine-table th {
            background-color: #2c3e50;
            color: #ffffff;
            font-weight: 600;
            padding: 12px 8px;
            text-align: center;
            border: 1px solid #dee2e6;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 0.5px;
        }
        .unicamp-terminal-routine-table td {
            padding: 10px 5px;
            border: 1px solid #dee2e6;
            text-align: center;
            vertical-align: middle;
        }
        .date-day-cell-terminal {
            font-weight: 600;
            background-color: #f8f9fa;
        }
        .date-day-cell-terminal span {
            display: block;
            font-size: 10px;
            color: #666;
            font-weight: normal;
            margin-top: 3px;
        }
        .split-sub {
            display: block;
            padding: 4px 0;
        }
        .split-sub + .split-sub {
            border-top: 1px solid #eee;
            margin-top: 4px;
        }
        .unicamp-terminal-routine-table tbody tr:hover {
            background-color: #fcfcfc;
        }
    </style>
    <div class="unicamp-terminal-routine-wrapper">
        <table class="unicamp-terminal-routine-table">
            <thead>
                <tr>
                    <th>DATES/DAYS</th>
                    <th>CLASS-I</th>
                    <th>CLASS-II</th>
                    <th>CLASS-III</th>
                    <th>CLASS-IV</th>
                    <th>CLASS-V</th>
                    <th>CLASS-VI</th>
                    <th>CLASS-VII</th>
                    <th>CLASS-VIII</th>
                </tr>
            </thead>
            <tbody>
                <!-- 16/02/2026 -->
                <tr>
                    <td class="date-day-cell-terminal">16/02/2026<span>Monday</span></td>
                    <td>MIZO</td>
                    <td>ENGLISH</td>
                    <td><span class="split-sub">ENGLISH</span><span class="split-sub">GRAMMAR</span></td>
                    <td><span class="split-sub">ENGLISH</span><span class="split-sub">GRAMMAR</span></td>
                    <td><span class="split-sub">ENGLISH</span><span class="split-sub">GRAMMAR</span></td>
                    <td><span class="split-sub">ENGLISH</span><span class="split-sub">GRAMMAR</span></td>
                    <td><span class="split-sub">SS</span><span class="split-sub">MIZO</span></td>
                    <td><span class="split-sub">MATHS</span><span class="split-sub">GK</span></td>
                </tr>
                <!-- 17/02/2026 -->
                <tr>
                    <td class="date-day-cell-terminal">17/02/2026<span>Tuesday</span></td>
                    <td>-</td>
                    <td>-</td>
                    <td><span class="split-sub">EVS</span><span class="split-sub">IT</span></td>
                    <td><span class="split-sub">HINDI</span><span class="split-sub">IT</span></td>
                    <td><span class="split-sub">HINDI</span><span class="split-sub">IT</span></td>
                    <td><span class="split-sub">SCIENCE</span><span class="split-sub">GK</span></td>
                    <td><span class="split-sub">HINDI</span><span class="split-sub">IT</span></td>
                    <td><span class="split-sub">ENGLISH</span><span class="split-sub">GRAMMAR</span></td>
                </tr>
                <!-- 18/02/2026 -->
                <tr>
                    <td class="date-day-cell-terminal">18/02/2026<span>Wednesday</span></td>
                    <td>-</td>
                    <td>-</td>
                    <td><span class="split-sub">MIZO</span><span class="split-sub">GK</span></td>
                    <td><span class="split-sub">MIZO</span><span class="split-sub">GK</span></td>
                    <td><span class="split-sub">EVS</span><span class="split-sub">GK</span></td>
                    <td><span class="split-sub">MIZO</span><span class="split-sub">IT</span></td>
                    <td><span class="split-sub">MATHS</span><span class="split-sub">OFF</span></td>
                    <td><span class="split-sub">SS</span><span class="split-sub">OFF</span></td>
                </tr>
                <!-- 19/02/2026 -->
                <tr>
                    <td class="date-day-cell-terminal">19/02/2026<span>Thursday</span></td>
                    <td>ENGLISH</td>
                    <td>MIZO</td>
                    <td><span class="split-sub">HINDI</span><span class="split-sub">GOD'S WAYS</span></td>
                    <td><span class="split-sub">EVS</span><span class="split-sub">GOD'S WAYS</span></td>
                    <td><span class="split-sub">MIZO</span><span class="split-sub">GOD'S WAYS</span></td>
                    <td><span class="split-sub">HINDI</span><span class="split-sub">GOD'S WAYS</span></td>
                    <td><span class="split-sub">SCIENCE</span><span class="split-sub">GOD'S WAYS</span></td>
                    <td><span class="split-sub">HINDI</span><span class="split-sub">GOD'S WAYS</span></td>
                </tr>
                <!-- 23/02/2026 -->
                <tr>
                    <td class="date-day-cell-terminal">23/02/2026<span>Monday</span></td>
                    <td>-</td>
                    <td>-</td>
                    <td><span class="split-sub">MATHS</span><span class="split-sub">OFF</span></td>
                    <td><span class="split-sub">MATHS</span><span class="split-sub">OFF</span></td>
                    <td><span class="split-sub">MATHS</span><span class="split-sub">OFF</span></td>
                    <td><span class="split-sub">MATHS</span><span class="split-sub">OFF</span></td>
                    <td><span class="split-sub">ENGLISH</span><span class="split-sub">GRAMMAR</span></td>
                    <td><span class="split-sub">MIZO</span><span class="split-sub">IT</span></td>
                </tr>
                <!-- 24/02/2026 -->
                <tr>
                    <td class="date-day-cell-terminal">24/02/2026<span>Tuesday</span></td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td><span class="split-sub">SS</span><span class="split-sub">OFF</span></td>
                    <td><span class="split-sub">MIZO</span><span class="split-sub">OFF</span></td>
                    <td><span class="split-sub">SCIENCE</span><span class="split-sub">OFF</span></td>
                </tr>
            </tbody>
        </table>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode( 'third_terminal_routine_class_1_8', 'test_routine_third_terminal_1_8' );
