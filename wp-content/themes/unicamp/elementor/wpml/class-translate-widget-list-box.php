<?php

namespace Unicamp_Elementor;

use WPML_Elementor_Module_With_Items;

defined( 'ABSPATH' ) || exit;

class Translate_Widget_List_Box extends WPML_Elementor_Module_With_Items {

	/**
	 * Repeater field id
	 *
	 * @return string
	 */
	public function get_items_field() {
		return 'items';
	}

	/**
	 * Repeater items field id
	 *
	 * @return array List inner fields translatable.
	 */
	public function get_fields() {
		return [
			'text',
			'link' => [ 'url' ],
		];
	}

	/**
	 * @param string $field
	 *
	 * @return string
	 */
	protected function get_title( $field ) {
		switch ( $field ) {
			case 'text':
				return esc_html__( 'Item List Box Text', 'unicamp' );

			case 'url':
				return esc_html__( 'Item List Box Link', 'unicamp' );

			default:
				return '';
		}
	}

	/**
	 * @param string $field
	 *
	 * @return string
	 */
	protected function get_editor_type( $field ) {
		switch ( $field ) {
			case 'text':
				return 'AREA';

			case 'url':
				return 'LINK';

			default:
				return '';
		}
	}
}
