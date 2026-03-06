<?php
/**
 * Page Name: Upgrade to Pro
 *
 */

use FloatMenuLite\WOWP_Plugin;

$features = [
	'core'             => [
		[
			'title' => __( 'Submenus', 'float-menu' ),
			'desc'  => __( 'By grouping related items under submenu, you can improve user experience by making navigation more intuitive and organized. Users can easily find the specific information they need without feeling overwhelmed by a long list of top-level menu items. ', 'float-menu' ),
			'link'  => 'https://share.cleanshot.com/zk2VMYwH',
		],
		[
			'title' => __( 'Beautiful Animations', 'float-menu' ),
			'desc'  => __( 'Choose from 7 elegant animations to showcase your menu items. ', 'float-menu' ),
			'link'  => 'https://share.cleanshot.com/MgVPrRgq',
		],
        [
			'title' => __( 'Deeper Analytics', 'float-menu' ),
			'desc'  => __( ' Empower with a deeper understanding of how users interact with your menu! This powerful feature allows you to track user clicks on specific menu items within Google Analytics. ', 'float-menu' ),
		],
		[
			'title' => __( 'Icon with Text', 'float-menu' ),
			'desc'  => __( 'Combine an icon with a short text label inside a single button. This clear and intuitive visual cue improves menu clarity and enhances user experience.', 'float-menu' ),
			'demo'  => ' https://demo.wow-estore.com/float-menu-pro/icon-with-text/',
		],
		[
			'title' => __( 'Custom Border Radius', 'float-menu' ),
			'desc'  => __( 'Independently customize the border radius for each menu item’s icon and label. This allows for unique shapes, better design flexibility, and seamless integration with your site’s style.', 'float-menu' ),
			'demo'  => ' https://demo.wow-estore.com/float-menu-pro/custom-border-radius/',
		],
		[
			'title' => __( 'Extra Text & Label Fonts', 'float-menu' ),
			'desc'  => __( 'Display extended text descriptions and customize font styles for labels to provide detailed menu information.', 'float-menu' ),
			'link'  => 'https://share.cleanshot.com/xVw9jlnw',
		],
        [
			'title' => __( 'Create Popup', 'float-menu' ),
			'desc'  => __( 'Configure popups that open upon clicking on menu items.', 'float-menu' ),
			'link'  => 'https://share.cleanshot.com/q6kz1q5P',
		],

	],
	'functional-links' => [
		[
			'title' => __( 'Translate', 'float-menu' ),
			'desc'  => __( 'Empower your visitors to translate your website content in real-time. Integrate this link type to break down language barriers and cater to a global audience.', 'float-menu' ),
			'demo'  => 'https://demo.wow-estore.com/float-menu-pro/translate-page/',
		],
		[
			'title' => __( 'Social Sharing', 'float-menu' ),
			'desc'  => __( 'Boost your website\'s reach by incorporating a "Share" link. Choose from a staggering 29 different social media services, allowing users to effortlessly share your content across their preferred platforms.', 'float-menu' ),
			'demo'  => 'https://demo.wow-estore.com/float-menu-pro/share/',
		],
		[
			'title' => __( 'Next/Previous Post', 'float-menu' ),
			'desc'  => __( 'Simplify post navigation for readers. These link types automatically direct users to the next or previous post within the current category, keeping them engaged and exploring related content. ', 'float-menu' ),
			'link'  => 'https://share.cleanshot.com/mRSL1QZ4',
		],
		[
			'title' => __( 'Forced Download', 'float-menu' ),
			'desc'  => __( 'Offer downloadable resources like brochures, ebooks, or software directly through your floating menus. This eliminates the need for users to navigate to separate download pages. ', 'float-menu' ),
			'demo'  => 'https://demo.wow-estore.com/float-menu-pro/actions/',
		],
		[
			'title' => __( 'Scroll To Top/Bottom', 'float-menu' ),
			'desc'  => __( 'Provide users with convenient links to instantly scroll to the top or bottom of your webpage. This is particularly helpful for long pages or content-heavy sections.', 'float-menu' ),
			'demo'  => 'https://demo.wow-estore.com/float-menu-pro/scrolling/',
		],
		[
			'title' => __( 'Smooth Scroll', 'float-menu' ),
			'desc'  => __( 'Enhance user experience with smooth scrolling animations. This link type ensures a visually pleasing and seamless transition when users navigate to different sections of your webpage.', 'float-menu' ),
			'demo'  => 'https://demo.wow-estore.com/float-menu-pro/scrolling/',
		],
		[
			'title' => __( 'Print', 'float-menu' ),
			'desc'  => __( 'With a single click on the Print link, users can initiate the built-in printing function of their web browser. No more cumbersome text selection or manual copying.', 'float-menu' ),
			'demo'  => 'https://demo.wow-estore.com/float-menu-pro/actions/',
		],
		[
			'title' => __( 'Search', 'float-menu' ),
			'desc'  => __( 'Integrate a search function directly into your floating menu. This empowers users to quickly find specific information on your website, improving overall user experience.', 'float-menu' ),
			'link'  => 'https://share.cleanshot.com/wbTsnGqk',
		],
		[
			'title' => __( 'Email', 'float-menu' ),
			'desc'  => __( 'Integrate an Email link into your floating menu, allowing users to effortlessly initiate email communication. This streamlines the process for users who may have questions, require additional information, or want to express feedback.', 'float-menu' ),
			'demo'  => 'https://demo.wow-estore.com/float-menu-pro/actions/',
		],
		[
			'title' => __( 'One-Click Calling', 'float-menu' ),
			'desc'  => __( 'Provide a Telephone link within your floating menu, enabling users to directly initiate a phone call to your business with a single click. This is particularly valuable for websites with a strong focus on customer service or those offering phone consultations.', 'float-menu' ),
			'demo'  => 'https://demo.wow-estore.com/float-menu-pro/actions/',
		],
		[
			'title' => __( 'User Links', 'float-menu' ),
			'desc'  => __( 'This includes Login links for effortless account access, Logout links for secure sign-outs, Registration links for simplified account creation, and Password Recovery links for stress-free password retrieval, all readily available within the menu, empowering users to manage their accounts and interact with your website seamlessly. ', 'float-menu' ),
		],
		[
			'title' => __( 'Media & Navigation Control', 'float-menu' ),
			'desc'  => __( 'Take control of your media players directly from the menu with Play, Pause, Mute, and Volume commands. Plus, integrated browser navigation like Go Back and Go Forward for a smoother browsing experience.', 'float-menu' ),
		],
		[
			'title' => __( 'Copy URL & Bookmark', 'float-menu' ),
			'desc'  => __( 'Allow users to quickly copy the current page URL to their clipboard or add your site to their browser bookmarks with a single click.', 'float-menu' ),
		],
	],

	'icons'              => [
		[
			'title' => __( 'Custom Icons', 'float-menu' ),
			'desc'  => __( 'Break free from the limitations of pre-defined icon libraries. Custom icons allow you to utilize any image or icon that complements your website\'s design.', 'float-menu' ),
			'link'  => 'https://share.cleanshot.com/4zGhqDwC',
		],
		[
			'title' => __( 'Icon Settings', 'float-menu' ),
			'desc'  => __( 'Rotate and flip icons to enhance visual appeal.', 'float-menu' ),
			'link'  => 'https://share.cleanshot.com/0thhSXx6',
		],
		[
			'title' => __( 'Emoji and Letter', 'float-menu' ),
			'desc'  => __( ' Sometimes, a simple emoji or letter can be the most effective way to represent a menu item. Float Menu Pro allows you to utilize emojis or individual letters as icons, offering a playful and informal touch to your menus.', 'float-menu' ),
		],
	],
	'visibility-control' => [
		[
			'title' => __( 'Hiding/Showing', 'float-menu' ),
			'desc'  => __( 'Allows you to control the visibility of your floating menus based on the user\'s scroll position on the webpage.', 'float-menu' ),
			'link'  => 'https://demo.wow-estore.com/float-menu-pro/hide-after-position/',
		],
		[
			'title' => __( 'Timed Appearance', 'float-menu' ),
			'desc'  => __( 'Set a delay to show or hide the menu after the user has spent a specific amount of time on the page.', 'float-menu' ),
		],
		[
			'title' => __( 'Activate by URL', 'float-menu' ),
			'desc'  => __( 'Target specific pages based on URL parameters (e.g., show a floating menu only on a page with URL parameter)', 'float-menu' ),
			'link'  => 'https://share.cleanshot.com/8hW85MPK',
		],
		[
			'title' => __( 'Activate by Referrer URL', 'float-menu' ),
			'desc'  => __( 'To display different floating menus for visitors arriving from specific websites.', 'float-menu' ),
			'link'  => 'https://share.cleanshot.com/F9mqHfD9',
		],
		[
			'title' => __( 'Display Rules', 'float-menu' ),
			'desc'  => __( 'Control exactly where your popup appear using page types, post categories/tags, author pages, taxonomies and date archives.', 'float-menu' ),
			'link'  => 'https://share.cleanshot.com/f3t2jbFf',
		],
		[
			'title' => __( 'Devices Rules', 'float-menu' ),
			'desc'  => __( 'Ensure optimal menu visibility across all devices with options to hide/remove on specific screen sizes.', 'float-menu' ),
			'link'  => 'https://share.cleanshot.com/LC56C6zt',
		],
		[
			'title' => __( 'User Role Permissions', 'float-menu' ),
			'desc'  => __( 'Define which user roles (e.g., Administrator, Editor, Author) have the ability to see the menu items. This can be helpful for displaying internal menus relevant only to website administrators or managing menus for specific user groups.', 'float-menu' ),
			'link'  => 'https://share.cleanshot.com/vmpM4dSS',
		],
		[
			'title' => __( 'Multilingual Support', 'float-menu' ),
			'desc'  => __( 'For websites catering to a global audience, Float Menu Pro allows you to restrict menu visibility to specific languages. This ensures users only see menus relevant to their chosen language setting. ', 'float-menu' ),
			'link'  => 'https://share.cleanshot.com/RVcWLDmw',
		],
		[
			'title' => __( 'Scheduling', 'float-menu' ),
			'desc'  => __( 'Schedule menu appearances based on specific days, times, and dates. This allows you to promote temporary events or campaigns without cluttering your website permanently. ', 'float-menu' ),
		],
		[
			'title' => __( 'Browser Compatibility', 'float-menu' ),
			'desc'  => __( 'Ensure your menus display correctly across a wide range of browsers. If necessary, you can choose to hide menus for specific browsers to address compatibility issues with outdated software versions.', 'float-menu' ),
			'link'  => 'https://share.cleanshot.com/3VsbRhNt',
		],
	],
];

?>

    <div class="wpie-block-tool is-white">

        <div class="wowp-pro-upgrade">
            <div>
                <h3>Unlock PRO Features</h3>
                <p>Upgrade to Float Menu Pro and get advanced features like</p>
                <div class="buttons">
                    <a href="<?php echo esc_url( WOWP_Plugin::info( 'pro' ) ); ?>" target="_blank"
                       class="button button-primary">Get Float Menu Pro </a>
                    <a href="<?php echo esc_url( WOWP_Plugin::info( 'demo' ) ); ?>" target="_blank" class="button-link">Try
                        Demo <span>→</span></a>
                </div>
            </div>
            <dl class="wowp-pro__profits">
                <div class="wowp-pro__profit">
                    <dt><span class="wpie-icon wpie_icon-money-time"></span>No Yearly Fees</dt>
                    <dd>One-time payment. Use it forever.</dd>
                </div>
                <div class="wowp-pro__profit">
                    <dt><span class="wpie-icon wpie_icon-refund"></span>14-Day Money-Back Guarantee</dt>
                    <dd>Try it risk-free. Get a full refund if you are not satisfied.</dd>
                </div>
                <div class="wowp-pro__profit">
                    <dt><span class="wpie-icon wpie_icon-cloud-data-sync"></span>Lifetime Free Updates</dt>
                    <dd>Always stay up to date for no extra cost.</dd>
                </div>
                <div class="wowp-pro__profit">
                    <dt><span class="wpie-icon wpie_icon-customer-support"></span>Priority Support</dt>
                    <dd>Fast, friendly, and expert help whenever you need it.</dd>
                </div>
            </dl>

        </div>

        <div class="wowp-pro-features">


            <h3 class="wpie-tabs">
				<?php
				$i = 0;
				foreach ( $features as $key => $feature ) {
					$class = ( $i === 0 ) ? ' selected' : '';
					$i ++;
					$name = str_replace( '-', ' ', $key );
					echo '<label class="wpie-tab-label' . esc_attr( $class ) . '" for="features-' . absint( $i ) . '">' . esc_html( ucwords( $name ) ) . '</label>';
				} ?>
            </h3>

            <div class="wpie-tabs-contents">

				<?php
				$i = 0;
				foreach ( $features as $key => $feature ) {
					$i ++;
					echo '<input type="radio" class="wpie-tab-toggle" name="features" value="1" id="features-' . absint( $i ) . '" ' . checked( 1, $i, false ) . '>';
					echo '<div class="wpie-tab-content">';
					echo '<dl>';
					foreach ( $feature as $value ) {
						echo '<div>';
						echo '<dt>' . esc_html( $value['title'] );

						if ( isset($value['link'] )) {
							echo '<a href="' . esc_url( $value['link'] ) . '" target="_blank">How It Works <span class="wpie-icon wpie_icon-chevron-down"></span></a> ';
						}
						if ( isset($value['demo'] )) {
							echo '<a href="' . esc_url( $value['demo'] ) . '" target="_blank">Try the Demo <span class="wpie-icon wpie_icon-chevron-down"></span></a>';
						}
						echo '</dt>';
						echo '<dd>' . esc_html( $value['desc'] ) . '</dd>';
						echo '</div>';
					}
					echo '</dl>';
					echo '</div>';
				} ?>


            </div>

        </div>

    </div>
<?php
