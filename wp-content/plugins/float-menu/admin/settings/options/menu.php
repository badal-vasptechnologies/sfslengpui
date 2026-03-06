<?php


use FloatMenuLite\WOWP_Plugin;

defined( 'ABSPATH' ) || exit;

$args = [

	'style' => [
		[
			'item_tooltip' => [
				'type'  => 'text',
				'title' => __( 'Text', 'float-menu' ),
			],
		],
		[
			'item_tooltip_font' => [
				'type'  => 'select',
				'title' => __( 'Font Family', 'float-menu' ),
				'atts'  => [
					'inherit'         => __( 'Use Your Themes', 'float-menu' ),
					'Tahoma'          => __( 'Tahoma', 'float-menu' ),
					'Georgia'         => __( 'Georgia', 'float-menu' ),
					'Comic Sans MS'   => __( 'Comic Sans MS', 'float-menu' ),
					'Arial'           => __( 'Arial', 'float-menu' ),
					'Lucida Grande'   => __( 'Lucida Grande', 'float-menu' ),
					'Times New Roman' => __( 'Times New Roman', 'float-menu' ),
				],
			],

			'item_tooltip_style' => [
				'type'  => 'select',
				'title' => __( 'Font Style', 'float-menu' ),
				'atts'  => [
					'normal' => __( 'Normal', 'float-menu' ),
					'italic' => __( 'Italic', 'float-menu' ),
				],
			],

			'item_tooltip_weight' => [
				'type'  => 'select',
				'title' => __( 'Font Weight ', 'float-menu' ),
				'atts'  => [
					'normal'  => __( 'Normal', 'float-menu' ),
					'lighter' => __( 'Lighter', 'float-menu' ),
					'bold'    => __( 'Bold', 'float-menu' ),
					'bolder'  => __( 'Bolder', 'float-menu' ),
				],
			],
		],
		[
			'color' => [
				'type'  => 'text',
				'val'   => '#ffffff',
				'atts'  => [
					'class'              => 'wpie-color',
					'data-alpha-enabled' => 'true',
				],
				'title' => __( 'Color', 'float-menu' ),
			],

			'hcolor' => [
				'type'  => 'text',
				'val'   => '#ffffff',
				'atts'  => [
					'class'              => 'wpie-color',
					'data-alpha-enabled' => 'true',
				],
				'title' => __( 'Hover Color', 'float-menu' ),
			],

			'bcolor' => [
				'type'  => 'text',
				'val'   => '#184c72',
				'atts'  => [
					'class'              => 'wpie-color',
					'data-alpha-enabled' => 'true',
				],
				'title' => __( 'Background', 'float-menu' ),
			],

			'hbcolor' => [
				'type'  => 'text',
				'val'   => '#184c72',
				'atts'  => [
					'class'              => 'wpie-color',
					'data-alpha-enabled' => 'true',
				],
				'title' => __( 'Hover Background', 'float-menu' ),
			],
		],
	],

	'type' => [
		[
			'item_type' => [
				'type'  => 'select',
				'title' => __( 'Type', 'float-menu' ),
				'atts'  => [
					'links_start'  => __( 'Links', 'float-menu' ),
					'link'         => __( 'Link', 'float-menu' ),
					'login'        => __( 'Login', 'float-menu' ),
					'logout'       => __( 'Logout', 'float-menu' ),
					'lostpassword' => __( 'Lostpassword', 'float-menu' ),
					'register'     => __( 'Register', 'float-menu' ),
					'links_end'    => __( 'Links', 'float-menu' ),
				],
			],

			'item_link' => [
				'type'  => 'text',
				'title' => __( 'Link', 'float-menu' ),
				'class' => 'is-hidden',
			],

			'new_tab' => [
				'type'  => 'checkbox',
				'title' => __( 'Open in new Window', 'float-menu' ),
				'label' => __( 'Enable', 'float-menu' ),
				'class' => 'is-hidden',
			],
		],
	],

	'icon' => [
		[
			'icon_type'        => [
				'type'    => 'select',
				'title'   => __( 'Icon Type', 'float-menu' ),
				'value'   => 'icon',
				'options' => [
					'icon' => __( 'Icon', 'float-menu' ),
					'text' => __( 'Text', 'float-menu' ),
				]
			],

			'item_custom_text' => [
				'type'  => 'text',
				'title' => __( 'Enter text', 'float-menu' ),
				'atts'  => [
					'placeholder' => __( 'Enter text', 'float-menu' )
				],
			],

			'item_icon' => [
				'type'    => 'text',
				'title'   => __( 'Icon', 'float-menu' ),
				'value'   => 'fas fa-wand-magic-sparkles',
				'options' => [
					'class' => 'wpie-icon-box',
				],
			],
		],
	],


	'attributes' => [
		[
			'button_id' => [
				'type'  => 'text',
				'title' => __( 'ID for element', 'float-menu' ),
			],

			'button_class' => [
				'type'  => 'text',
				'title' => __( 'Class for element', 'float-menu' ),
			],

			'link_rel' => [
				'type'  => 'text',
				'title' => __( 'Attribute: rel', 'float-menu' ),
			],

			'aria_label' => [
				'type'  => 'text',
				'title' => __( 'Aria label', 'float-menu' ),
			],
		],
	],
];

$args = apply_filters( WOWP_Plugin::PREFIX . '_menu_options', $args );

$prefix = 'menu_1-';
$data   = [
	'args' => $args,
	'opt'  => [],
	'tabs' => [],
];

foreach ( $args as $i => $group ) {
	$data['tabs'][] = $i;

	if ( is_array( $group ) ) {

		foreach ( $group as $k => $v ) {

			foreach ( $v as $key => $val ) {
				$group_key                 = $prefix . $key;
				$data['opt'][ $group_key ] = $val;
			}

		}
	}
}

return $data;