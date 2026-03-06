=== YouTube Playlist Player ===
Contributors: butterflymedia
Donate link: https://www.buymeacoffee.com/wolffe
Tags: youtube, player, playlist, video, carousel
Requires at least: 4.9
Tested up to: 6.9
Requires PHP: 7.0
Stable tag: 4.7.4
License: GPLv3 or later
License URI: https://www.gnu.org/licenses/gpl-3.0.html

Display a YouTube player (with an optional playlist) on any post or page using a simple shortcode.

== Description ==

Display a YouTube player (with an optional playlist) on any post or page using a simple shortcode. The plugin supports a static YouTube player (no video title) and a dynamic one (video title) using the YouTube Data API v3.

Embedded players must have a viewport that is at least 200px by 200px. If the player displays controls, it must be large enough to fully display the controls without shrinking the viewport below the minimum size. We recommend 16:9 players be at least 480 pixels wide and 270 pixels tall.

The YouTube player is responsive and it will work on all themes and screen sizes!

* Uses a simple shortcode which can be used in posts, pages, custom post types, widgets, reusable blocks.
* Uses the default YouTube Embed Code (iframe) with optional privacy-enhanced mode.
* Uses correct aspect ratio for videos using a Fluid Video technology.
* Uses native HTML5 Lazy loading.
* Used modern code and is optimised for speed.
* 100% free with no ads inside.

### Static YouTube Playlist Player

Example: `[yt_playlist mainid="xcJtL7QggTI" vdid="xcJtL7QggTI, AheYbU8J5Tc, X0zGS4-UKgg, 74SZXCQb44s, 2M0XCH9q3YI, CTNgVQGLy24, B8RpvoHsgI8"]`

### YouTube V3 API Playlist Player

Example: `[yt_playlist_v3 mainid="xcJtL7QggTI" vdid="xcJtL7QggTI, AheYbU8J5Tc, X0zGS4-UKgg, 74SZXCQb44s, 2M0XCH9q3YI, CTNgVQGLy24, B8RpvoHsgI8"]`

### YouTube Channel Feed with Lightbox Player

Example: `[yt_feed channels="UCpVm7bg6pXKo1Pr6k5kxG9A" results="9"]`

Check out the [official YouTube Playlist Player website](https://getbutterfly.com/wordpress-plugins/youtube-playlist-player/) and a [YouTube Playlist Player demo](https://getbutterfly.com/wordpress-plugins/youtube-playlist-player/).

Check out a [Property Videos & Virtual Tours](https://kmproperty.ie/buy/videos-virtual-tours/) demo.

Check out more [WordPress plugins here](https://getbutterfly.com/wordpress-plugins/).

== Installation ==

1. Upload to your plugins folder, usually `wp-content/plugins/`
2. Activate the plugin on the plugins screen.
3. Configure the plugin from Settings -> YouTube Playlist Player.

== Screenshots ==

1. Front-end player #1
2. Front-end player #2
3. Dashboard
4. General Settings
5. YouTube API
6. Help/Usage

== Changelog ==

= 4.7.4 =
* FIX: Add `referrerpolicy="strict-origin-when-cross-origin"` to YouTube iframes to ensure HTTP Referer is sent per YouTube embedded player requirements
* UPDATE: Update WordPress compatibility

= 4.7.3 =
* UPDATE: Update WordPress compatibility

= 4.7.2 =
* UPDATE: Update WordPress compatibility
* SECURITY: Increase plugin security by sanitizing and unslashing options

= 4.7.1 =
* FIX: Fix a missing JavaScript dependency

= 4.7.0 =
* UPDATE: Update WordPress compatibility
* UPDATE: Update the channels shortcode to use Grid instead of Flexbox CSS
* UPDATE: Reduce the number of tags to 5

= 4.6.9 =
* UPDATE: Update WordPress compatibility

= 4.6.8 =
* FIX: Fix Cross Site Scripting (XSS) vulnerability (props yuyudhn via Patchstack)

= 4.6.7 =
* FIX: Fix missing scripts and styles for the new channel feed feature

= 4.6.6 =
* FEATURE: Add YouTube channel feeds
* UPDATE: Update WordPress compatibility

= 4.6.5 =
* FIX: Fix Cross Site Scripting (XSS) vulnerability (props Skalucy via Patchstack)
* UPDATE: Update PHP coding standards
* UPDATE: Update WordPress compatibility

= 4.6.4 =
* FIX: Fix Cross Site Scripting (XSS) vulnerability (props Yudha P. via Patchstack)
* UPDATE: Update copyright year
* UPDATE: Remove unused patterns from PHPCS ruleset

= 4.6.3 =
* UPDATE: Update author banner
* UPDATE: Update WordPress compatibility for pre-5.0 versions
* UPDATE: Update WPCS ruleset
* UPDATE: Replace back-end PNG image with inline SVG

= 4.6.2 =
* FIX: Fix wrong class in plugin documentation
* FIX: Clarify usage in plugin documentation and `readme.txt`
* UPDATE: Add cleanup routine after plugin uninstallation (delete 6 options)
* UPDATE: Update `readme.txt` with shortcodes and features

= 4.6.1 =
* FIX: Fix a content filtering issue with "Rate my post" plugin (props @sabelya)
* UPDATE: Update WordPress compatibility

= 4.6.0 =
* FIX: Remove a redundant variable
* UPDATE: Update WordPress compatibility
* UPDATE: Update codebase to conform to latest WordPress Coding Standards (WPCS) ruleset

= 4.5.9 =
* FIX: Fix documentation link
* UPDATE: Update WordPress compatibility

= 4.5.8 =
* UPDATE: Update PHP 8 compatibility
* UPDATE: Add lazy loading for iframes
* UPDATE: Implement strict use for JavaScript

= 4.5.7 =
* UPDATE: Update WordPress compatibility
* UPDATE: Remove old, unused code

= 4.5.6 =
* FIX: Fix aspect-ratio for Firefox and Safari (props @sabelya)
* UPDATE: Update PHP coding standards (function naming)
* UPDATE: Update plugin assets

= 4.5.5 =
* FIX: Sanitize URL parameter in back-end
* UPDATE: Combine and minify JavaScript
* UPDATE: Minify CSS
* UPDATE: Optimize DOM loaded functions
* PERFORMANCE: Remove `setInterval()` for detecting YouTube iframe
* PERFORMANCE: Add version number to CSS to break caching
* PERFORMANCE: Remove heavy JavaScript for detecting video aspect ratio
* PERFORMANCE: Implement modern CSS aspect-ratio for Core Web Vitals compatibility

= 4.5.4 =
* FIX: Fix YouTube API V3 demo
* FIX: Fix YouTube API V3 click event (switch to event delegation)
* UPDATE: Update classic playlist JavaScript to ES6
* UPDATE: Update `readme.txt` links
* UPDATE: Add donation link

= 4.5.3 =
* UPDATE: Update WordPress compatibility

= 4.5.2 =
* UPDATE: Update WordPress compatibility
* UPDATE: Update JavaScript to ES6
* FIX: Fix version number for enqueued scripts

= 4.5.1 =
* FIX: Fix issue with playlist not appearing
* FIX: Fix issue with playlist styling
* UPDATE: Refactor JS for less overhead
* UPDATE: Update WordPress compatibility
* UPDATE: Update demo link

= 4.5.0 =
* UPDATE: Update PHP requirements
* UPDATE: Update WordPress compatibility

= 4.4.1 =
* FIX: Fix a strict check
* FIX: Add spaces removal for V3 shortcode (main video)
* FIX: Add spaces removal for V3 shortcode (playlist)

= 4.4.0 =
* UPDATE: Update WordPress compatibility
* UPDATE: Remove jQuery dependency
* UPDATE: Force cache clearing for JavaScript actions

= 4.3.5 =
* UPDATE: Code quality fixes
* UPDATE: Update JavaScript DOM loading detection

= 4.3.4 =
* UPDATE: Update WordPress compatibility
* UPDATE: Mobile UI tweaks

= 4.3.3 =
* FIX: Fix localized issue not saving options

= 4.3.2 =
* UPDATE: Update WordPress compatibility
* UPDATE: Add new screenshots
* UPDATE: UI tweaks

= 4.3.1 =
* FIX: Remove old code
* UPDATE: Refactor and move player functions
* UPDATE: Add YouTube related options
* UPDATE: Remove unused option
* UPDATE: Add more documentation (+ YouTube API how-to)
* UPDATE: Add more/better YouTube branding

= 4.3 =
* FIX: Load JS/CSS assets only when shortcode is present
* FEATURE: Add YouTube API V3
* FEATURE: Add new settings screen
* FEATURE: Add new shortcode
* UPDATE: Add a bit of documentation
* UPDATE: Add more/better YouTube branding

= 4.2.4 =
* FIX: YouTube Branding fixes
* FIX: Author box layout fixes

= 4.2.3 =
* FIX: Regression fix for previous version (add interval checking)

= 4.2.2 =
* FIX: Fix player detection before being loaded

= 4.2.1 =
* FIX: Fix JS code being executed on all pages
* UPDATE: Update readme.txt

= 4.2 =
* FIX: Add PHP compatibility
* FIX: Fix/update old screenshots
* FIX: Remove jQuery dependency
* FIX: Fix JS codeflow
* UPDATE: Update WordPress compatibility
* UPDATE: Update readme.txt and general information

= 4.1.6 =
* FIX: Fix script being included before jQuery
* FIX: Fix duplicated variable assignment
* FIX: Fix strict variable assignment
* FIX: Remove unused colour picker script
* UPDATE: Update plugin usage details
* UPDATE: Small admin UI tweaks
* UPDATE: Remove `novd` argument and switch to internal count

= 4.1.5 =
* PERFORMANCE: Stop options from autoloading
* UPDATE: Update WordPress compatibility
* UPDATE: Better i18n options
* UPDATE: Remove unused colour option

= 4.1.4 =
* FIX: Remove version constant
* FIX: Better security tweaks
* UPDATE: Update admin menu name to reflect the plugin

= 4.1.3 =
* FIX: License update
* FIX: Official link update

= 4.1.2 =
* FIX: Fix color picker enqueue dependency
* UPDATE: Move all JS code to a separate file
* UPDATE: Change the main video playlist function (JS) to accept parameters

= 4.1.1 =
* FIX: Remove hardcoded background colour
* FIX: Remove hardcoded padding and increase margin
* FIX: Correctly enqueue style.css
* UPDATE: Update default height and add option autoloading
* UPDATE: Completely refactor YouTube Javascript
* UPDATE: Remove all Flash (SWFObject) dependencies

= 4.1.0 =
* FIX: Add `index.php` file to plugin root
* UPDATE: Update plugin URLs
* UPDATE: Update CSS styles for better compatibility

= 4.0.1 =
* UPDATE: Add getButterfly ad box

= 4.0.0 =
* FIX: Change all HTTP links to HTTPS
* FIX: Update YouTube API and remove all deprecated functions and parameters
* FIX: Remove parameters with same values as the default ones
* FIX: Clean up the code (slight performance increase)
* FIX: Fix rare cases of line ending issues
* UI: Remove background color for better theme integration

= 3.2.0 =
* FIX: Fix IFRAME name target
* FEATURE: Add responsiveness

= 3.1.0 =
* FIX: Fix a PHP warning
* FIX: Remove deprecated options nonce
* FEATURE: Add usage details on the plugin page
* PROMOTION: Add link to premium version on CodeCanyon

= 3.0.2 =
* Add license link
* Add donate link
* Add default options
* Fix wrong internal version

= 3.0.1 =
* Add CSS vendor prefixes

= 3.0.0 =
* Initial release
