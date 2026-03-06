<?php

/**
 * Class WOWP_Admin
 *
 * The main admin class responsible for initializing the admin functionality of the plugin.
 *
 * @package    FloatMenuLite
 * @subpackage Admin
 * @author     Dmytro Lobov <dev@wow-company.com>, Wow-Company
 * @copyright  2024 Dmytro Lobov
 * @license    GPL-2.0+
 */

namespace FloatMenuLite;

use FloatMenuLite\Admin\AdminActions;
use FloatMenuLite\Admin\Dashboard;
use FloatMenuLite\Admin\Demo;
use FloatMenuLite\Admin\Settings;

defined( 'ABSPATH' ) || exit;

class WOWP_Admin {
	public function __construct() {
		Dashboard::init();
		AdminActions::init();
		Demo::init();

		add_action( 'wp_ajax_' . WOWP_Plugin::PREFIX . '_ajax_settings', [ Settings::class, 'save_item' ] );
		add_action( WOWP_Plugin::PREFIX . '_admin_header_links', [ $this, 'plugin_links' ] );
		add_filter( WOWP_Plugin::PREFIX . '_save_settings', [ $this, 'save_settings' ] );
		add_action( WOWP_Plugin::PREFIX . '_admin_load_assets', [ $this, 'load_assets' ] );
	}

	public function plugin_links(): void {
		$links = [
			'change' => __( 'Check for Updates', 'float-menu' ),
			'rating' => __( 'Rate Us', 'float-menu',  ),
			'pro'    => __( 'Pro Plugin', 'float-menu' ),
			'docs'   => __( 'Documentation', 'float-menu' ),
			'demo'   => __( 'Pro Demo', 'float-menu' ),
		];

		echo '<div class="wpie-links">';

		$i = 1;
		foreach ( $links as $slug => $title ) {

			$link = WOWP_Plugin::info( $slug );
			if ( empty( $link ) ) {
				continue;
			}

			if ( $i % 3 === 0 ) {
				echo '<span class="wpie-links-divider">|</span>';
			}

			echo '<a href="' . esc_url( $link ) . '" class="wowp-link-' . esc_attr( $slug ) . '" target="_blank">' . esc_html( $title ) . '</a>';

			$i ++;
		}

		echo '</div>';
	}

	public function save_settings( $request ) {

		$param = ! empty( $request ) ? map_deep( wp_unslash( $request ), 'sanitize_text_field' ) : [];

		if ( isset( $request['menu_1']['item_text'] ) ) {
			$param['menu_1']['item_text'] = map_deep( wp_unslash( $request['menu_1']['item_text'] ), array(
				$this,
				'sanitize_text'
			) );
		}

		if ( isset( $request['menu_1']['popupcontent'] ) ) {
			$param['menu_1']['popupcontent'] = map_deep( wp_unslash( $request['menu_1']['popupcontent'] ), array(
				$this,
				'sanitize_text'
			) );
		}

		if ( isset( $request['menu_1']['item_link'] ) ) {
			$param['menu_1']['item_link'] = map_deep( wp_unslash( $request['menu_1']['item_link'] ), array($this, 'sanitize_link') );
		}

		return $param;
	}

	public function sanitize_text( $text ): string {
		return wp_kses_post( wp_unslash( $text ) );
	}

	public function sanitize_tooltip( $text ): string {
		return sanitize_text_field( wp_unslash( $text ) );
	}

	public function sanitize_link( $link ) {
		if ( wp_http_validate_url( $link ) ) {
			return esc_url_raw( $link );
		}
		return sanitize_text_field(  $link  );
	}


	public function load_assets(): void {

		wp_enqueue_style( 'wp-color-picker' );
		wp_enqueue_script( 'wp-color-picker' );
		wp_enqueue_script( 'jquery-ui-sortable' );
		wp_enqueue_editor();
		wp_enqueue_media();

		$handle     = WOWP_Plugin::SLUG;
		$version    = WOWP_Plugin::info( 'version' );
		$url_assets = WOWP_Plugin::url() . 'vendors/';

		$url_fontawesome = $url_assets . 'fontawesome/css/all.min.css';
		wp_enqueue_style( $handle . '-fontawesome', $url_fontawesome, null, '7.0' );

		$fonticonpicker_js = $url_assets . 'fonticonpicker/js/jquery.fonticonpicker.js';
		wp_enqueue_script( $handle . '-fonticonpicker', $fonticonpicker_js, array( 'jquery' ), $version, true );

		$fonticonpicker_css = $url_assets . 'fonticonpicker/css/base/jquery.fonticonpicker.css';
		wp_enqueue_style( $handle . '-fonticonpicker', $fonticonpicker_css, null, $version );

		$fonticonpicker_dark_css = $url_assets . 'fonticonpicker/css/themes/dark-grey-theme/jquery.fonticonpicker.darkgrey.css';
		wp_enqueue_style( $handle . '-fonticonpicker-darkgrey', $fonticonpicker_dark_css, null, $version );

	}

}