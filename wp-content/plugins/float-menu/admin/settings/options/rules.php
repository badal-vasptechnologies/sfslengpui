<?php

use FloatMenuLite\WOWP_Plugin;

defined( 'ABSPATH' ) || exit;

$args = [
	'rules' => [
		'title' => __( 'Display Rules', 'float-menu' ),
		'icon'  => 'wpie_icon-roadmap',
		[
			'show' => [
				'type'  => 'select',
				'title' => __( 'Display', 'float-menu' ),
				'val'   => 'everywhere',
				'atts'  => [
					'general_start' => __( 'General', 'float-menu' ),
					'shortcode'     => __( 'Shortcode', 'float-menu' ),
					'everywhere'    => __( 'Everywhere', 'float-menu' ),
					'general_end'   => __( 'General', 'float-menu' ),
				],
			],
		],
	],

	'responsive' => [
		'title' => __( 'Responsive Visibility', 'float-menu' ),
		'icon'  => 'wpie_icon-laptop-mobile',
		[
			'mobile_rules_on' => [
				'type'  => 'checkbox',
				'title' => __( 'Mobile Rules', 'float-menu' ),
				'label' => __( 'Enable', 'float-menu' ),
			],
		],
		[

			'mobile' => [
				'type'  => 'number',
				'title' => [
					'label'  => __( 'Hide on smaller screens', 'float-menu' ),
					'name'   => 'mobile_on',
					'toggle' => true,
				],
				'val'   => 480,
				'addon' => 'px',
			],

			'desktop' => [
				'type'  => 'number',
				'title' => [
					'label'  => __( 'Hide on larger screens', 'float-menu' ),
					'name'   => 'desktop_on',
					'toggle' => true,
				],
				'val'   => 1024,
				'addon' => 'px'
			],
		],


	],

	'other' => [
		'title' => __( 'Other', 'float-menu' ),
		'icon'  => 'wpie_icon-gear',
		[
			'fontawesome' => [
				'type'  => 'checkbox',
				'title' => __( 'Disable Font Awesome Icon', 'float-menu' ),
				'val'   => 0,
				'label' => __( 'Disable', 'float-menu' ),
			],
		],
	],

];

$args = apply_filters( WOWP_Plugin::PREFIX . '_rules_options', $args );

$data = [
	'args' => $args,
	'opt'  => [],
];

foreach ( $args as $i => $group ) {

	if ( is_array( $group ) ) {

		foreach ( $group as $k => $v ) {

			if ( is_array( $v ) ) {
				foreach ( $v as $key => $val ) {
					$data['opt'][ $key ] = $val;
				}
			}
		}
	}
}

return $data;
