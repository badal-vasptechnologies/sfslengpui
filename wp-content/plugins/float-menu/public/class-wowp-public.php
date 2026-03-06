<?php

/**
 * Class WOWP_Public
 *
 * This class handles the public functionality of the Float Menu Pro plugin.
 *
 * @package    FloatMenuLite
 * @subpackage Public
 * @author     Dmytro Lobov <dev@wow-company.com>, Wow-Company
 * @copyright  2024 Dmytro Lobov
 * @license    GPL-2.0+
 */

namespace FloatMenuLite;

use FloatMenuLite\Admin\DBManager;
use FloatMenuLite\Publish\Conditions;
use FloatMenuLite\Publish\Display;
use FloatMenuLite\Publish\Maker;
use FloatMenuLite\Publish\Singleton;

defined( 'ABSPATH' ) || exit;

class WOWP_Public {

	private string $prefix;

	public function __construct() {
		// prefix for plugin assets
		$this->prefix = '.min';
		add_shortcode( WOWP_Plugin::SHORTCODE, [ $this, 'shortcode' ] );
		add_shortcode( WOWP_Plugin::SHORTCODE . '-ready', [ $this, 'shortcode_ready' ] );

		add_action( 'wp_footer', [ $this, 'footer' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'assets' ] );
	}

	public function assets(): void {
		$handle          = WOWP_Plugin::SLUG;
		$assets          = plugin_dir_url( __FILE__ ) . 'assets/';
		$assets          = apply_filters( WOWP_Plugin::PREFIX . '_frontend_assets', $assets );
		$version         = WOWP_Plugin::info( 'version' );
		$url_fontawesome = WOWP_Plugin::url() . 'vendors/fontawesome/css/all.min.css';

		$this->check_shortcode();
		$this->check_display();

		$singleton = Singleton::getInstance();
		$args      = $singleton->getValue();


		if ( ! empty( $args ) ) {
			wp_enqueue_style( $handle, $assets . 'css/style' . $this->prefix . '.css', [], $version, $media = 'all' );
			wp_enqueue_script( $handle, $assets . 'js/floatMenu' . $this->prefix . '.js', array( 'jquery' ), $version,
				true );

			foreach ( $args as $id => $param ) {
				if ( empty( $param['fontawesome'] ) ) {
					wp_enqueue_style( $handle . '-fontawesome', $url_fontawesome, null, '7.1' );
				}
			}
		}
	}

	public function shortcode( $atts ): string {
		$atts = shortcode_atts(
			[ 'id' => "" ],
			$atts,
			WOWP_Plugin::SHORTCODE
		);

		if ( empty( $atts['id'] ) ) {
			return '';
		}

		$singleton = Singleton::getInstance();

		if ( $singleton->hasKey( $atts['id'] ) ) {
			return '';
		}

		$result = DBManager::get_data_by_id( $atts['id'] );

		if ( empty( $result->param ) ) {
			return '';
		}

		$conditions = Conditions::init( $result );

		if ( $conditions === false ) {
			return '';
		}

		$param = maybe_unserialize( $result->param );
		$singleton->setValue( $atts['id'], $param );

		return '';
	}

	public function shortcode_ready( $atts ): string {
		$atts = shortcode_atts(
			[ 'id' => "" ],
			$atts,
			WOWP_Plugin::SHORTCODE
		);

		if ( empty( $atts['id'] ) ) {
			return '';
		}
		$result = DBManager::get_data_by_id( $atts['id'] );

		if ( empty( $result->param ) ) {
			return '';
		}

		$conditions = Conditions::init( $result );
		if ( $conditions === false ) {
			return '';
		}

		$param = maybe_unserialize( $result->param );

		$maker = new Maker( $atts['id'], $param );

		return $maker->init();
	}


	public function footer(): void {
		$singleton = Singleton::getInstance();
		$args      = $singleton->getValue();

		if ( empty( $args ) ) {
			return;
		}

		$handle          = WOWP_Plugin::SLUG;
		$assets          = plugin_dir_url( __FILE__ ) . 'assets/';
		$assets          = apply_filters( WOWP_Plugin::PREFIX . '_frontend_assets', $assets );
		$version         = WOWP_Plugin::info( 'version' );
		$url_fontawesome = WOWP_Plugin::url() . 'vendors/fontawesome/css/all.min.css';

		wp_enqueue_style( $handle, $assets . 'css/style' . $this->prefix . '.css', [], $version, $media = 'all' );
		wp_enqueue_script( $handle, $assets . 'js/floatMenu' . $this->prefix . '.js', array( 'jquery' ), $version,
			true );

		$shortcodes = '';
		$check      = 0;

		foreach ( $args as $id => $param ) {

			if ( empty( $param['fontawesome'] ) ) {
				wp_enqueue_style( $handle . '-fontawesome', $url_fontawesome, null, '7.1' );
			}

			if ( $check === absint( $id ) ) {
				continue;
			}
			if ( str_contains( $id, 'shortcode_' ) ) {
				$check = $param;
				continue;
			}
			$shortcodes .= '[' . WOWP_Plugin::SHORTCODE . '-ready id="' . absint( $id ) . '" footer="true"]';
		}
		echo do_shortcode( $shortcodes );
	}

	private function check_display(): void {
		$results = DBManager::get_all_data();
		if ( $results !== false ) {
			$singleton = Singleton::getInstance();
			foreach ( $results as $result ) {
				$param = maybe_unserialize( $result->param );
				if ( Display::init( $result->id, $param ) === true && Conditions::init( $result ) === true ) {
					$singleton->setValue( $result->id, $param );
				}
			}
		}
	}

	private function check_shortcode(): void {
		global $post;
		$shortcode = WOWP_Plugin::SHORTCODE;
		$singleton = Singleton::getInstance();

		if ( is_a( $post, 'WP_Post' ) && has_shortcode( $post->post_content, $shortcode ) ) {
			$pattern = get_shortcode_regex( [ $shortcode ] );
			if ( preg_match_all( '/' . $pattern . '/s', $post->post_content, $matches )
			     && array_key_exists( 2, $matches )
			     && in_array( $shortcode, $matches[2] )
			) {
				foreach ( $matches[3] as $attrs ) {
					$attrs = shortcode_parse_atts( $attrs );
					if ( $attrs && is_array( $attrs ) && array_key_exists( 'id', $attrs ) ) {
						$result = DBManager::get_data_by_id( $attrs['id'] );

						if ( ! empty( $result->param ) ) {
							$param = maybe_unserialize( $result->param );
							if ( Conditions::init( $result ) === true ) {
								$singleton->setValue( $attrs['id'], $param );
							}
						}
					}
				}
			}
		}
	}

}