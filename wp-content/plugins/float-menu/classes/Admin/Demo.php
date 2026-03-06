<?php

namespace FloatMenuLite\Admin;

use FloatMenuLite\Update\UpdateDB;
use FloatMenuLite\WOWP_Plugin;

class Demo {

	public static function init() {
		add_action( WOWP_Plugin::PREFIX . '_admin_after_button', [ __CLASS__, 'demo_button' ] );
		add_action( 'wp_ajax_' . WOWP_Plugin::PREFIX . '_upload_demo', [ __CLASS__, 'upload_demo' ] );
	}

	public static function demo_button(): void {
		$demo = [
			'Simple-Floating-Menu' => [
				'name' => __( 'Simple Floating Menu', 'float-menu' ),
				'link' => 'https://lite.wow-estore.com/float-menu/',
			],
			'Social-Media-Menu'    => [
				'name' => __( 'Social Media Menu', 'float-menu' ),
				'link' => 'https://lite.wow-estore.com/float-menu/',
			],
			'Navigation-Menu'      => [
				'name' => __( 'Navigation Menu', 'float-menu' ),
				'link' => 'https://lite.wow-estore.com/float-menu/',
			],
			'Quick-Actions-Menu'   => [
				'name' => __( 'Quick Actions Menu', 'float-menu' ),
				'link' => 'https://lite.wow-estore.com/float-menu/',
				'in'   => 1,
			],

			'Share_pro' => [
				'name' => __( 'Share Buttons', 'float-menu' ),
				'link' => 'https://demo.wow-estore.com/float-menu-pro/share/',
			],

			'Save-Content_pro' => [
				'name' => __( 'Save Content', 'float-menu' ),
				'link' => 'https://demo.wow-estore.com/float-menu-pro/share/',
			],

			'Messaging_pro' => [
				'name' => __( 'Messaging', 'float-menu' ),
				'link' => 'https://demo.wow-estore.com/float-menu-pro/share/',
			],

			'Translate_pro' => [
				'name' => __( 'Translate', 'float-menu' ),
				'link' => 'https://demo.wow-estore.com/float-menu-pro/translate-page/',
			],

			'Icon-with-Text_pro' => [
				'name' => __( 'Icon with Text', 'float-menu' ),
				'link' => 'https://demo.wow-estore.com/float-menu-pro/icon-with-text/',
			],

			'Scrolling_pro' => [
				'name' => __( 'Scrolling', 'float-menu' ),
				'link' => 'https://demo.wow-estore.com/float-menu-pro/scrolling/',
			],

			'Icon-animation_pro' => [
				'name' => __( 'Icon animations', 'float-menu' ),
				'link' => 'https://demo.wow-estore.com/float-menu-pro/icon-animations/',
			],

			'Actions_pro' => [
				'name' => __( 'Actions', 'float-menu' ),
				'link' => 'https://demo.wow-estore.com/float-menu-pro/actions/',
				'in'   => 1,
			],

			'Show-After-Position_pro' => [
				'name' => __( 'Show after Position ', 'float-menu' ),
				'link' => 'https://demo.wow-estore.com/float-menu-pro/show-after-position/',
			],

			'Hide-after-Position_pro' => [
				'name' => __( ' Hide after Position ', 'float-menu' ),
				'link' => 'https://demo.wow-estore.com/float-menu-pro/hide-after-position/',
			],

            'menu-with-radius_pro' => [
				'name' => __( 'Menu with Custom Radius', 'float-menu' ),
				'link' => 'https://demo.wow-estore.com/float-menu-pro/custom-border-radius/',
			],

            'horizontal-menu_pro' => [
				'name' => __( 'Horizontal Menu', 'float-menu' ),
				'link' => 'https://demo.wow-estore.com/float-menu-pro/horizontal-menu/',
			],


			'Contact_pro' => [
				'name' => __( 'Contact', 'float-menu' ),
				'link' => 'https://demo.wow-estore.com/float-menu-pro/contact/',
			],
		];


		?>

        <button type="button" class="button" onclick="window.demoUpload.showModal()">
			<?php esc_html_e( 'Load Example', 'float-menu' ); ?>
        </button>

        <dialog id="demoUpload" class="wpie-dialog">
            <button type="button" class="wpie-dialog-close" onclick="window.demoUpload.close()">
                <span class="wpie-icon wpie_icon-xmark"></span>
            </button>
            <table>
                <thead>
                <tr>
                    <th>
						<?php esc_html_e( 'Name', 'float-menu' ); ?>
                    </th>
                    <th>
						<?php esc_html_e( 'Preview Link', 'float-menu' ); ?>
                    </th>
                    <th>
						<?php esc_html_e( 'Action', 'float-menu' ); ?>
                    </th>
                </tr>
                </thead>
                <tbody>
				<?php foreach ( $demo as $file => $item ) : ?>
                    <tr>
                        <td><?php echo esc_html( $item['name'] ); ?></td>
                        <td><a href="<?php echo esc_url( $item['link'] ); ?>"
                               target="_blank"><?php esc_html_e( 'Preview', 'float-menu' ); ?></a></td>
                        <td>
							<?php if ( strpos( $file, '_pro' ) === false || class_exists( '\FloatMenuLite\WOWP_PRO' ) )  : ?>
                                <button class="wpie-download"
                                        data-menu="<?php echo esc_attr( strtolower( $file ) ); ?>">
									<?php esc_html_e( 'Download', 'float-menu' ); ?>
                                </button>
							<?php else: ?>
                                <a href="<?php echo esc_url( WOWP_Plugin::info( 'pro' ) ); ?>"
                                   class="wpie-pro"><?php esc_html_e( 'Available in Pro', 'float-menu' ); ?></a>
							<?php endif; ?>
                        </td>
                    </tr>
				<?php endforeach; ?>
                </tbody>
            </table>
        </dialog>

		<?php
	}

	public static function upload_demo(): void {
		$menu = sanitize_key( $_POST['menu'] ?? '' );
		if ( strpos( $menu, '_pro' ) !== false ) {
			$demo_path = WOWP_Plugin::dir() . 'includes/pro/demo/' . $menu . '.json';
		} else {
			$demo_path = WOWP_Plugin::dir() . 'admin/demo/' . $menu . '.json';
		}


		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( [ 'message' => 'Permission denied' ], 403 );
		}

		if ( ! isset( $_POST['security'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['security'] ) ), WOWP_Plugin::PREFIX . '_settings' ) ) {
			wp_send_json_error( [ 'message' => 'Invalid nonce' ], 400 );
		}

		if ( file_exists( $demo_path ) ) {
			$settings = wp_json_file_decode( $demo_path );
			$columns  = DBManager::get_columns();

			foreach ( $settings as $key => $val ) {
				$data    = [];
				$formats = [];

				foreach ( $columns as $column ) {
					$name = $column->Field;

					$data[ $name ] = ! empty( $val->$name ) ? $val->$name : '';

					if ( $name === 'id' || $name === 'status' || $name === 'mode' ) {
						$formats[] = '%d';
					} else {
						$formats[] = '%s';
					}
				}

				$index = array_search( 'id', array_keys( $data ), true );
				unset( $data['id'], $formats[ $index ] );
				DBManager::insert( $data, $formats );
			}
		}

		wp_send_json_success( [ 'path' => $demo_path ] );
	}

}