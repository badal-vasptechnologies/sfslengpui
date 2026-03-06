<?php

use FloatMenuLite\WOWP_Plugin;

defined( 'ABSPATH' ) || exit;

$args = [

	'position' => [
		'title' => __( 'Position', 'float-menu' ),
		'icon'  => 'wpie_icon-pointer',
		[
			'menu' => [
				'type'  => 'select',
				'title' => __( 'Side', 'float-menu' ),
				'val'   => 'left',
				'atts'  => [
					'left'  => __( 'Left', 'float-menu' ),
					'right' => __( 'Right', 'float-menu' ),
				],
			],

			'align' => [
				'type'  => 'select',
				'title' => __( 'Align', 'float-menu' ),
				'val'   => 'center',
				'atts'  => [
					'top'    => __( 'Top', 'float-menu' ),
					'center' => __( 'Center', 'float-menu' ),
					'bottom' => __( 'Bottom', 'float-menu' ),
				],
			],

			'top_offset' => [
				'type'  => 'number',
				'title' => __( 'Top offset', 'float-menu' ),
				'val'   => '0',
				'addon' => __( 'px', 'float-menu' ),
			],

			'side_offset' => [
				'type'  => 'number',
				'title' => __( 'Side offset', 'float-menu' ),
				'val'   => '0',
				'addon' => __( 'px', 'float-menu' ),
			],
		],
		[
			'horizontal' => [
				'type'  => 'checkbox',
				'title' => __( 'Horizontal', 'float-menu' ),
				'label' => __( 'Apply', 'float-menu' ),
				'val'   => '0',
			],
		]
	],

	'appearance' => [
		'title' => __( 'Appearance', 'float-menu' ),
		'icon'  => 'wpie_icon-paintbrush',
		[
			'shape' => [
				'type'  => 'select',
				'title' => __( 'Shape', 'float-menu' ),
				'val'   => 'square',
				'atts'  => [
					'square'      => __( 'Square', 'float-menu' ),
					'round'       => __( 'Round', 'float-menu' ),
					'rounded'     => __( 'Rounded', 'float-menu' ),
					'rounded-out' => __( 'Rounded-out', 'float-menu' ),
				],
			],

			'sideSpace' => [
				'type'  => 'select',
				'title' => __( 'Side Space', 'float-menu' ),
				'val'   => 'true',
				'atts'  => [
					'true'  => __( 'Yes', 'float-menu' ),
					'false' => __( 'No', 'float-menu' ),
				],
			],

			'buttonSpace' => [
				'type'  => 'select',
				'title' => __( 'Button Space', 'float-menu' ),
				'val'   => 'true',
				'atts'  => [
					'true'  => __( 'Yes', 'float-menu' ),
					'false' => __( 'No', 'float-menu' ),
				],
			],

			'zindex' => [
				'type'  => 'number',
				'title' => __( 'Z-index', 'float-menu' ),
				'val'   => '9999',
			],

		],
		[

			'labelsOn' => [
				'type'  => 'select',
				'title' => __( 'Label On', 'float-menu' ),
				'val'   => 'true',
				'atts'  => [
					'true'  => __( 'Yes', 'float-menu' ),
					'false' => __( 'No', 'float-menu' ),
				],
			],

			'labelSpace' => [
				'type'  => 'select',
				'title' => __( 'Label Space', 'float-menu' ),
				'val'   => 'true',
				'atts'  => [
					'true'  => __( 'Yes', 'float-menu' ),
					'false' => __( 'No', 'float-menu' ),
				],
			],

			'labelConnected' => [
				'type'  => 'select',
				'title' => __( 'Label Connected', 'float-menu' ),
				'val'   => 'true',
				'atts'  => [
					'true'  => __( 'Yes', 'float-menu' ),
					'false' => __( 'No', 'float-menu' ),
				],
			],

			'labelEffect' => [
				'type'  => 'select',
				'title' => __( 'Label Effect', 'float-menu' ),
				'val'   => 'true',
				'atts'  => [
					'none'           => __( 'None', 'float-menu' ),
					'fade'           => __( 'Fade', 'float-menu' ),
				],
			],

			'labelSpeed' => [
				'type'  => 'number',
				'title' => __( 'Label Speed', 'float-menu' ),
				'val'   => '400',
				'addon' => __( 'ms', 'float-menu' ),
			],


		]
	],

	'size' => [
		'title' => __( 'Size', 'float-menu' ),
		'icon'  => 'wpie_icon-text',
		[
			'boxSize' => [
				'type'  => 'number',
				'val'   => '48',
				'addon' => __( 'px', 'float-menu' ),
				'title' => [
					'label'  => __( 'Box', 'float-menu' ),
					'name'   => 'boxSize_on',
					'toggle' => true,
				],
			],

			'iconSize' => [
				'type'  => 'number',
				'title' => __( 'Icon', 'float-menu' ),
				'val'   => '24',
				'addon' => __( 'px', 'float-menu' ),
			],

			'labelSize' => [
				'type'  => 'number',
				'title' => __( 'Label', 'float-menu' ),
				'val'   => '15',
				'addon' => __( 'px', 'float-menu' ),
			],

			'textSize' => [
				'type'  => 'number',
				'title' => __( 'Text under Icon', 'float-menu' ),
				'val'   => '12',
				'addon' => __( 'px', 'float-menu' ),
			],

		],
		[
			'mobilieScreen' => [
				'type'  => 'number',
				'title' => __( 'Mobile Screen', 'float-menu' ),
				'val'   => '480',
				'addon' => __( 'px', 'float-menu' ),
			],
		],
		[

			'boxSizeMobile' => [
				'type'  => 'number',
				'val'   => '48',
				'addon' => __( 'px', 'float-menu' ),
				'title' => [
					'label'  => __( 'Box for mobile', 'float-menu' ),
					'name'   => 'boxSizeMobile_on',
					'toggle' => true,
				],
			],

			'mobiliconSize' => [
				'type'  => 'number',
				'title' => __( 'Icon for mobile', 'float-menu' ),
				'val'   => '24',
				'addon' => __( 'px', 'float-menu' ),
			],

			'mobillabelSize' => [
				'type'  => 'number',
				'title' => __( 'Label for mobile', 'float-menu' ),
				'val'   => '15',
				'addon' => __( 'px', 'float-menu' ),
			],

			'textSizeMobile' => [
				'type'  => 'number',
				'title' => __( 'Text under Icon', 'float-menu' ),
				'val'   => '12',
				'addon' => __( 'px', 'float-menu' ),
			],
		]
	],
];

$args = apply_filters( WOWP_Plugin::PREFIX . '_settings_options', $args );

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