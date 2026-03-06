<?php

class Unicamp_Walker_Nav_Menu_Static extends Walker_Nav_Menu
{
    private $inside_custom_wrapper = false;

    public function display_element(
        $element,
        &$children_elements,
        $max_depth,
        $depth,
        $args,
        &$output
    ) {
        $id_field = $this->db_fields["id"];
        if (is_object($args[0])) {
            $args[0]->has_children = !empty(
                $children_elements[$element->$id_field]
            );
        }
        return parent::display_element(
            $element,
            $children_elements,
            $max_depth,
            $depth,
            $args,
            $output
        );
    }

    public function start_el(&$output, $item, $depth = 0, $args = [], $id = 0)
    {
        $indent = $depth ? str_repeat("\t", $depth) : "";

        if (!isset($item->ID)) {
            return;
        }

        $classes = !empty($item->classes) ? (array) $item->classes : [];
        $classes[] = "menu-item-" . $item->ID;
        if ($item->menu_item_parent === "0") {
            $classes[] = "level-1";
        }

        $class_names = join(
            " ",
            apply_filters(
                "nav_menu_css_class",
                array_filter($classes),
                $item,
                $args,
                $depth
            )
        );
        $class_names = $class_names
            ? ' class="' . esc_attr($class_names) . '"'
            : "";

        $id = apply_filters("nav_menu_item_id", "", $item, $args, $depth);
        $id = $id ? ' id="' . esc_attr($id) . '"' : "";

        $output .= $indent . "<li" . $id . $class_names . ">";

        $atts = [
            "title" => !empty($item->attr_title) ? $item->attr_title : "",
            "target" => !empty($item->target) ? $item->target : "",
            "rel" => !empty($item->xfn) ? $item->xfn : "",
            "href" => !empty($item->url) ? $item->url : "",
        ];

        $atts = apply_filters(
            "nav_menu_link_attributes",
            $atts,
            $item,
            $args,
            $depth
        );
        $attributes = "";
        foreach ($atts as $attr => $value) {
            if (!empty($value)) {
                if ($attr === "href") {
                    $value = esc_url($value);
                } else {
                    $value = esc_attr($value);
                }
                $attributes .= " " . $attr . '="' . $value . '"';
            }
        }

        $item_output = $args->before;
        $item_output .= "<a" . $attributes . '><div class="menu-item-wrap">';
        $item_output .=
            '<span class="menu-item-title">' .
            $args->link_before .
            apply_filters("the_title", $item->title, $item->ID) .
            $args->link_after .
            "</span>";

        if ($args->has_children) {
            $item_output .= '<span class="toggle-sub-menu"></span>';
        }

        $item_output .= "</div></a>";
        $item_output .= $args->after;

        // --- START CUSTOM WRAPPER ---
        if (in_array("menu-item-has-children", $classes) && $depth === 0) {
            $item_output .=
                '
			<div class="custom-submenu-wrapper-container" data-menu-id="' .
                esc_attr($item->ID) .
                '" style="display:none;">
				<div class="custom-submenu-wrapper">
					<div class="submenu-section left">
						<h4>' .
                esc_html($item->title) .
                '</h4>
						<p>Some static description or summary about this section.</p>
					</div>
					<div class="submenu-section center">';
            $this->inside_custom_wrapper = true;
        }
        // --- END CUSTOM WRAPPER ---

        $output .= apply_filters(
            "walker_nav_menu_start_el",
            $item_output,
            $item,
            $depth,
            $args
        );
    }

    public function start_lvl(&$output, $depth = 0, $args = [])
    {
        $class = "sub-menu children";
        $indent = str_repeat("\t", $depth);
        if ($this->inside_custom_wrapper && $depth === 0) {
            $output .=
                $indent .
                '<ul class="' .
                esc_attr($class) .
                '" style="position: static;">';
        } else {
            $output .= $indent . '<ul class="' . esc_attr($class) . '">';
        }
    }

    public function end_lvl(&$output, $depth = 0, $args = [])
    {
        $output .= "</ul>\n";
        if ($this->inside_custom_wrapper && $depth === 0) {
            $output .=
                '
					</div> <!-- .submenu-section.center -->
					<div class="submenu-section right">
						<img src="https://picsum.photos/200/300" alt="">
					</div>
				</div> <!-- .custom-submenu-wrapper -->
			</div> <!-- .custom-submenu-wrapper-container -->';
            $this->inside_custom_wrapper = false;
        }
    }

    public function end_el(&$output, $item, $depth = 0, $args = [])
    {
        $output .= "</li>\n";
    }
}