<?php
/**
 * Class Maker — create floating menu items.
 *
 * @package FloatMenuLite\Publish
 *
 * Methods:
 *  - __construct($id, $param)           — Constructor. Initializes menu ID, parameters, menu items.
 *  - init()                             — Renders the main menu container and returns HTML output.
 *  - create_properties()                — Generates CSS properties for the menu.
 *  - create_options()                   — Returns JSON-encoded data attributes for frontend JS.
 *  - create_items()                     — Renders all menu items (buttons) in a loop.
 *  - create_item($i, $sub, $next_sub)   — Renders a single menu item (with/without sub-menu).
 *  - create_link($i)                    — Builds the <a> or <form> for the menu item.
 *  - create_link_properties($i)         — Builds inline CSS properties for a menu item.
 *  - create_action($i)                  — Builds href/action/target attributes for a menu link.
 *  - create_icon($i)                    — Renders icon/image/text/emoji for a menu item.
 *  - create_label($i)                   — Renders label/tooltip or search field for a menu item.
 */

namespace FloatMenuLite\Publish;


use FloatMenuLite\WOWP_Plugin;

defined( 'ABSPATH' ) || exit;

class Maker {
	private $id;
	private $param;
	private int $count;
	/**
	 * @var array|mixed
	 */
	private $menu;

	public function __construct( $id, $param ) {
		$this->id    = $id;
		$this->param = $param;
		$this->count = ! empty( $param['menu_1']['item_type'] ) ? count( $param['menu_1']['item_type'] ) : 0;
		$this->menu  = ! empty( $this->count ) ? $param['menu_1'] : [];
	}

	public function init(): string {
		$out = '';

		if ( $this->count === 0 ) {
			return $out;
		}

		$classes = 'floating-menu notranslate float-menu-' . absint( $this->id );
		$style   = $this->create_properties();
		$options = $this->create_options();

		$out = '<div dir="ltr" class="' . esc_attr( $classes ) . '" style="' . esc_attr( $style ) . '" data-float-menu="' . esc_attr( $options ) . '">';
		$out .= ! empty( $this->param['horizontal'] ) ? '<ul class="fm-bar is-horizontal">' : '<ul class="fm-bar">';
		$out .= $this->create_items();
		$out .= '</ul></div>';

		return $out;
	}

	private function create_properties(): string {
		$param      = $this->param;
		$out        = '';
		$properties = [];

		if ( isset( $param['labelSpeed'] ) && $param['labelSpeed'] !== '9999' ) {
			$properties['--fm-link-duration'] = $param['labelSpeed'];
		}

		if ( isset( $param['zindex'] ) && $param['zindex'] !== '400' ) {
			$properties['--fm-z-index'] = $param['zindex'];
		}

		if ( isset( $param['iconSize'] ) && $param['iconSize'] !== '24' ) {
			$properties['--fm-icon-size'] = $param['iconSize'];
		}

		if ( ! empty( $param['boxSize_on'] ) && ! empty( $param['boxSize'] ) ) {
			$properties['--fm-icon-box'] = $param['boxSize'];
		}

		if ( isset( $param['textSize'] ) && $param['textSize'] !== '12' ) {
			$properties['--fm-icon-text'] = $param['textSize'];
		}

		if ( isset( $param['labelSize'] ) && $param['labelSize'] !== '15' ) {
			$properties['--fm-label-size'] = $param['labelSize'];
		}

		$properties = apply_filters( WOWP_Plugin::PREFIX . '_maker_properties', $properties, $param );


		if ( ! empty( $properties ) ) {
			foreach ( $properties as $property => $value ) {
				$out .= $property . ':' . $value . ';';
			}
		}

		return $out;

	}

	private function create_options() {
		$param            = $this->param;
		$data             = [];
		$data['position'] = [
			$param['menu'] ?? 'left',
			! empty( $param['align'] ) ? $param['align'] : 'center',
		];

		$data['appearance'] = [
			'shape' => '-' . ( $param['shape'] ?? 'square' ),
		];

		if ( ! isset( $param['sideSpace'] ) || $param['sideSpace'] === 'true' ) {
			$data['appearance']['sideSpace'] = true;
		}

		if ( ! isset( $param['buttonSpace'] ) || $param['buttonSpace'] === 'true' ) {
			$data['appearance']['buttonSpace'] = true;
		}

		if ( ! isset( $param['labelConnected'] ) || $param['labelConnected'] === 'true' ) {
			$data['appearance']['labelConnected'] = true;
		}

		if ( ! isset( $param['subSpace'] ) || $param['subSpace'] === 'true' ) {
			$data['appearance']['subSpace'] = true;
		}


		if ( ! empty( $param['side_offset'] ) || ! empty( $param['top_offset'] ) ) {
			$sideOffset     = ! empty( $param['side_offset'] ) ? esc_attr( $param['side_offset'] ) : 0;
			$topOffset      = ! empty( $param['top_offset'] ) ? esc_attr( $param['top_offset'] ) : 0;
			$data['offset'] = [ $sideOffset, $topOffset ];
		}

		$data['mobile']   = [
			$param['mobilieScreen'] ?? 480,
			$param['mobiliconSize'] ?? 24,
			$param['mobillabelSize'] ?? 15,
		];
		$data['mobile'][] = isset( $param['boxSizeMobile'] ) && ! empty( $param['boxSizeMobile_on'] ) ? $param['boxSizeMobile'] : 0;
		$data['mobile'][] = isset( $param['textSizeMobile'] ) ? $param['textSizeMobile'] : 12;

		if ( ! empty( $param['mobile_on'] ) || ! empty( $param['desktop_on'] ) ) {
			$data['screen'] = [];
			if ( ! empty( $param['mobile_on'] ) ) {
				$data['screen']['small'] = $param['mobile'] ?? 480;
			}
			if ( ! empty( $param['desktop_on'] ) ) {
				$data['screen']['large'] = $param['desktop'] ?? 1024;
			}
		}

		$data['label'] = [];

		if ( empty( $param['labelSpace'] ) || $param['labelSpace'] === 'true' ) {
			$data['label']['space'] = 2;
		}

		if ( ! empty( $param['labelsOn'] ) && $param['labelsOn'] === 'false' ) {
			$data['label']['off'] = true;
		}

		if ( ! empty( $param['mobile_rules_on'] ) ) {
			$data['mobileRules'] = true;
		}

		$data['remove'] = true;

		$data = apply_filters( WOWP_Plugin::PREFIX . '_maker_options', $data, $param );

		return wp_json_encode( $data );
	}


	private function create_items(): string {
		$out  = '';
		$menu = $this->menu;

		for ( $i = 0; $i < $this->count; $i ++ ) {
			$type = $menu['item_type'][ $i ] ?? '';

			if ( $type === 'next_post' ) {
				$next_post = get_next_post( true );
				if ( empty( $next_post ) ) {
					continue;
				}
			} elseif ( $type === 'previous_post' ) {
				$previous_post = get_previous_post( true );
				if ( empty( $previous_post ) ) {
					continue;
				}
			} elseif ( $type === 'back' ) {
				if ( empty( $_SERVER['HTTP_REFERER'] ) ) {
					continue;
				}
			}

			$next_i   = $i + 1;
			$sub      = ! empty( $menu['item_sub'][ $i ] ) ? absint( $menu['item_sub'][ $i ] ) : 0;
			$next_sub = ! empty( $menu['item_sub'][ $next_i ] ) ? absint( $menu['item_sub'][ $next_i ] ) : 0;
			$out      .= $this->create_item( $i, $sub, $next_sub );

		}

		return $out;
	}

	private function create_item( $i, $sub, $next_sub ): string {
		$item       = $this->create_link( $i );
		$properties = $this->create_link_properties( $i );

		if ( $sub === 0 && $next_sub === 1 ) {
			return "<li class='fm-item fm-has-sub' style='" . esc_attr( $properties ) . "'>
                    {$item}
                    <ul class='fm-bar fm-sub'>";
		}

		if ( $sub === 1 && $next_sub === 0 ) {
			return "<li class='fm-item' style='" . esc_attr( $properties ) . "'>{$item}</li>
                </ul></li>";
		}

		return "<li class='fm-item' style='" . esc_attr( $properties ) . "'>{$item}</li>";
	}

	private function create_link( $i ): string {

		$class = ! empty( $this->menu['button_class'][ $i ] ) ? ' ' . $this->menu['button_class'][ $i ] : '';
		$id    = ! empty( $this->menu['button_id'][ $i ] ) ? $this->menu['button_id'][ $i ] : '';
		$rel   = ! empty( $this->menu['link_rel'][ $i ] ) ? $this->menu['link_rel'][ $i ] : '';
		$aria  = ! empty( $this->menu['aria_label'][ $i ] ) ? $this->menu['aria_label'][ $i ] : '';

		if ( ! empty( $this->menu['hold_open'][ $i ] ) ) {
			$class .= ' -active fm-hold-open';
		}

		if ( ! empty( $this->menu['hold_open'][ $i ] ) && ! empty( $this->menu['hover_hide'][ $i ] ) ) {
			$class .= ' fm-hovering-hide';
		}

		if ( empty( $this->menu['item_tooltip'][ $i ] ) ) {
			$class .= ' -label-hidden';
		}

		$out = '<a';
		if ( $this->menu['item_type'][ $i ] === 'search' ) {
			$out = '<form';
		}
		$out .= ! empty( $id ) ? ' id="' . esc_attr( $id ) . '"' : '';
		$out .= ' class="fm-link' . esc_attr( $class ) . '"';
		$out .= ! empty( $rel ) ? ' rel="' . esc_attr( $rel ) . '"' : '';
		$out .= ! empty( $aria ) ? ' aria-label="' . esc_attr( $aria ) . '"' : '';
		$out .= $this->create_action( $i );
		$out .= '>';
		$out .= $this->create_icon( $i );
		$out .= $this->create_label( $i );

		if ( $this->menu['item_type'][ $i ] === 'search' ) {
			$out .= '</form>';
		} else {
			$out .= '</a>';
		}

		$out = apply_filters( WOWP_Plugin::PREFIX . '_maker_link', $out, $this->menu, $this->param, $i, $this->id );

		return $out;
	}

	private function create_link_properties( $i ): string {
		$menu = $this->menu;
		$out  = '';

		$data = [
			'--fm-color'            => $menu['color'][ $i ] ?? '#ffffff',
			'--fm-background'       => $menu['bcolor'][ $i ] ?? '#184c72',
			'--fm-hover-color'      => $menu['hcolor'][ $i ] ?? '#ffffff',
			'--fm-hover-background' => $menu['hbcolor'][ $i ] ?? '#184c72',
		];


		if ( ! empty( $data ) ) {
			foreach ( $data as $property => $value ) {
				$out .= $property . ':' . $value . ';';
			}
		}

		return $out;
	}

	private function create_action( $i ): string {
		$menu   = $this->menu;
		$type   = $menu['item_type'][ $i ] ?? 'link';
		$target = ! empty( $menu['new_tab'][ $i ] ) ? '_blank' : '_self';
		$out    = ' ';

		switch ( $type ) {
			case 'link':
				$link = ! empty( $menu['item_link'][ $i ] ) ? $menu['item_link'][ $i ] : '#';
				$out  .= 'href="' . esc_attr( $link ) . '" target="' . esc_attr( $target ) . '"';
				break;
			case 'login':
			case 'logout':
			case 'lostpassword':
				$redirect = ! empty( $menu['item_link'][ $i ] ) ? $menu['item_link'][ $i ] : '#';
				$link     = call_user_func( 'wp_' . $type . '_url', $redirect );
				$out      .= 'href="' . esc_url( $link ) . '" target="' . esc_attr( $target ) . '"';
				break;
			case 'register':
				$link = wp_registration_url();
				$out  .= 'href="' . esc_url( $link ) . '" target="' . esc_attr( $target ) . '"';
				break;
			default:
				$link = ! empty( $menu['item_link'][ $i ] ) ? $menu['item_link'][ $i ] : '#';
				$out  .= 'href="' . esc_attr( $link ) . '" target="' . esc_attr( $target ) . '"';
				break;
		}

		$out = apply_filters( WOWP_Plugin::PREFIX . '_maker_action', $out, $menu, $i, $type, $target );

		return $out;
	}

	private function create_icon( $i ): string {
		$menu = $this->menu;

		$type      = ! empty( $menu['icon_type'][ $i ] ) ? $menu['icon_type'][ $i ] : 'icon';
		$rotate    = ! empty( $menu['icon_rotate'][ $i ] ) ? $menu['icon_rotate'][ $i ] : 0;
		$flip      = ! empty( $menu['icon_flip'][ $i ] ) ? $menu['icon_flip'][ $i ] : '';
		$animation = ! empty( $menu['item_icon_anomate'][ $i ] ) ? $menu['item_icon_anomate'][ $i ] : '';

		$class = '';
		if ( ! empty( $animation ) ) {
			$class .= ' ' . $animation;
		}
		if ( ! empty( $flip ) ) {
			$class .= ' ' . $flip;
		}
		if ( ! empty( $menu['image_full'][ $i ] ) && $type === 'image' ) {
			$class .= ' -full';
		}

		$style = '';
		if ( ! empty( $rotate ) ) {
			$style .= '--_rotate:' . $rotate . ';';
		}

		if ( ! empty( $this->menu['icon_text_weight'][ $i ] ) && $this->menu['icon_text_weight'][ $i ] !== 'normal' ) {
			$style .= '--fm-icon-text-weight:' . esc_attr( $this->menu['icon_text_weight'][ $i ] ) . ';';
		}

		if ( ! empty( $menu['radius_icon'][ $i ] ) ) {
			$style .= '--fm-icon-radius: ' . $menu['icon_radius_top_left'][ $i ] . 'px ';
			$style .= $menu['icon_radius_top_right'][ $i ] . 'px ';
			$style .= $menu['icon_radius_bottom_right'][ $i ] . 'px ';
			$style .= $menu['icon_radius_bottom_left'][ $i ] . 'px;';
		}

		$out = '<span class="fm-icon' . esc_attr( $class ) . '"';
		$out .= ! empty( $style ) ? ' style="' . esc_attr( $style ) . '"' : '';
		$out .= '>';

		switch ( $type ) {
			case 'icon':
				$icon = ! empty( $menu['item_icon'][ $i ] ) ? $menu['item_icon'][ $i ] : '';
				$out  .= '<span class="' . esc_attr( $icon ) . '"></span>';
				break;
			case 'image':
				$link = ! empty( $menu['item_custom_link'][ $i ] ) ? $menu['item_custom_link'][ $i ] : '';
				$alt  = ! empty( $menu['image_alt'][ $i ] ) ? $menu['image_alt'][ $i ] : '';
				$out  .= '<img src="' . esc_url( $link ) . '" alt="' . esc_attr( $alt ) . '">'; // phpcs:ignore PluginCheck.CodeAnalysis.ImageFunctions.NonEnqueuedImage
				break;
			case 'class':
				$icon = ! empty( $menu['icon_class'][ $i ] ) ? $menu['icon_class'][ $i ] : '';
				$out  .= '<span class="' . esc_attr( $icon ) . '"></span>';
				break;
			case 'emoji':
				$icon = ! empty( $menu['icon_emoji'][ $i ] ) ? $menu['icon_emoji'][ $i ] : '';
				$out  .= '<span>' . wp_kses_post( $icon ) . '</span>';
				break;
			case 'text':
				$icon = ! empty( $menu['item_custom_text'][ $i ] ) ? $menu['item_custom_text'][ $i ] : '';
				$out  .= '<span>' . wp_kses_post( $icon ) . '</span>';
				break;
		}
		$out .= ! empty( $menu['icon_text'][ $i ] ) ? '<span class="icon-text">' . esc_html( $menu['icon_text'][ $i ] ) . '</span>' : '';

		$out .= '</span>';

		return $out;
	}

	private function create_label( $i ): string {
		$menu  = $this->menu;
		$style = '';
		if ( ! empty( $this->menu['item_tooltip_font'][ $i ] ) && $this->menu['item_tooltip_font'][ $i ] !== 'inherit' ) {
			$style .= '--fm-label-font:' . esc_attr( $this->menu['item_tooltip_font'][ $i ] ) . ';';
		}
		if ( ! empty( $this->menu['item_tooltip_style'][ $i ] ) && $this->menu['item_tooltip_style'][ $i ] !== 'normal' ) {
			$style .= '--fm-label-font-style:' . esc_attr( $this->menu['item_tooltip_style'][ $i ] ) . ';';
		}
		if ( ! empty( $this->menu['item_tooltip_weight'][ $i ] ) && $this->menu['item_tooltip_weight'][ $i ] !== 'normal' ) {
			$style .= '--fm-label-weight:' . esc_attr( $this->menu['item_tooltip_weight'][ $i ] ) . ';';
		}

		if ( ! empty( $menu['radius_label'][ $i ] ) ) {
			$style .= '--fm-label-radius: ' . $menu['icon_radius_top_left'][ $i ] . 'px ';
			$style .= $menu['label_radius_top_right'][ $i ] . 'px ';
			$style .= $menu['label_radius_bottom_right'][ $i ] . 'px ';
			$style .= $menu['label_radius_bottom_left'][ $i ] . 'px;';
		}

		$icon_type = ! empty( $this->menu['icon_type'][ $i ] ) ? $this->menu['icon_type'][ $i ] : 'icon';
		$icon      = ! empty( $this->menu['item_icon'][ $i ] ) ? $this->menu['item_icon'][ $i ] : '';

		$class = '';
		if ( $icon_type === 'icon' && empty( $icon ) ) {
			$class = ' fm-empty-icon';
		}


		$out = '<span class="fm-label' . esc_attr( $class ) . '"';
		$out .= ! empty( $style ) ? ' style="' . esc_attr( $style ) . '"' : '';
		$out .= '>';

		$label = ! empty( $this->menu['item_tooltip'][ $i ] ) ? $this->menu['item_tooltip'][ $i ] : '';

		if ( $this->menu['item_type'][ $i ] === 'search' ) {
			$out .= '<input type="search" class="fm-input" name="s" placeholder="' . esc_attr( $label ) . '">';
		} else if ( ! empty( $label ) ) {
			if ( is_email( $label ) ) {
				$out .= antispambot( $label );
			} else {
				$out .= esc_html( $label );
			}
		}

		$out .= '</span>';

		return $out;
	}

}