'use strict';

jQuery(document).ready(function ($) {

    const selectors = {
        settings: '.wpie-settings__main',
        form_block: '.wpie-tabs-contents',
        items_list: '.wpie-items__list',
        full_editor: '.wpie-fulleditor',
        text_editor: '.wpie-texteditor',
        color_picker: '.wpie-color',
        image_download: '.wpie-image-download',

        icon_picker: '[data-field="menu_1-item_icon"]',
        item_type: '[data-field="menu_1-item_type"]',
        hold_open: '[data-field="menu_1-hold_open"]',

        checkbox: '.wpie-field input[type="checkbox"]',
        add_item: '.wpie-add-button',
        icon_type: `[data-field-box*="icon_type"] select, [data-field-box*="menu_1-icon_type"] select`,

        enable_tracking: '[data-field="menu_1-enable_tracking"]',
        radius_icon: '[data-field="menu_1-radius_icon"]',
        radius_label: '[data-field="menu_1-radius_label"]',
        item: '#wpie-items-list .wpie-item',
        item_remove: '.wpie-item_heading .wpie_icon-trash',
        item_heading: '.wpie-item .wpie-item_heading',
        delete_link: '.wpie-link-delete, .delete a',
        item_duplicate: '.wpie-item_heading .wpie_icon-copy',
    };


    function set_up() {


        $(selectors.full_editor).wowFullEditor();
        $(selectors.text_editor).wowTextEditor();

        $('.wpie-icon-box').wowIconPicker();

        $(selectors.image_download).wowImageDownload();
        $(selectors.color_picker).wpColorPicker({
            change: function (event, ui) {
                $(selectors.item).wowFloatMenuLiveBuilder();
            },
        });

        $('.wp-picker-holder').on('click', function () {
            $(selectors.item).wowFloatMenuLiveBuilder();
        });

        $(selectors.item).wowFloatMenuLiveBuilder();

        $(selectors.items_list).sortable({
            items: '> .wpie-item',
            placeholder: "wpie-item ui-state-highlight",
            cancel: '.wpie-item_content',

            update: function (event, ui) {
                $(selectors.item).wowFloatMenuLiveBuilder();
            },

            sort: function (event, ui) {
                // Викликаємо liveBuilder
                if (typeof $(selectors.item).wowFloatMenuLiveBuilder === "function") {
                    $(selectors.item).wowFloatMenuLiveBuilder();
                }
            },

            stop: function (event, ui) {
                // Викликаємо liveBuilder
                if (typeof $(selectors.item).wowFloatMenuLiveBuilder === "function") {
                    $(selectors.item).wowFloatMenuLiveBuilder();
                }
            }

        });

        $(selectors.items_list).disableSelection();

        $(selectors.checkbox).each(set_checkbox);
        $(selectors.item_type).each(item_type);
        $(selectors.icon_type).each(icon_type);
        $(selectors.hold_open).each(hold_open);
        $(selectors.radius_icon).each(radius_icon);
        $(selectors.radius_label).each(radius_label);

        $(selectors.enable_tracking).each(enable_tracking);
    }

    function initialize_events() {
        $(selectors.settings).on('change', selectors.checkbox, set_checkbox);
        $(selectors.settings).on('change', selectors.hold_open, hold_open);
        $(selectors.settings).on('change', selectors.radius_icon, radius_icon);
        $(selectors.settings).on('change', selectors.radius_label, radius_label);
        $(selectors.settings).on('click', selectors.add_item, clone_button);
        $(selectors.settings).on('change', selectors.item_type, item_type);
        $(selectors.settings).on('change', selectors.icon_type, icon_type);
        $(selectors.settings).on('change', selectors.enable_tracking, enable_tracking);
        $(selectors.settings).on('click', selectors.item_remove, item_remove);
        $(selectors.settings).on('click', selectors.item_heading, item_toggle);
        $(document).on('click', selectors.delete_link, delete_menu);
        $(selectors.settings).on('click', selectors.item_duplicate, item_duplicate);

        $(selectors.settings).on('change click keyup', selectors.item, function () {
            $(selectors.item).wowFloatMenuLiveBuilder();
        });
    }

    function initialize() {
        set_up();
        initialize_events();
        $(selectors.form_block).css('opacity', 1);
    }

    // Set the checkboxes
    function set_checkbox() {
        const next = $(this).next('input[type="hidden"]');
        if ($(this).is(':checked')) {
            next.val('1');
        } else {
            next.val('0');
        }
    }

    function hold_open() {
        const parent = get_parent_fields($(this));
        const hovering = parent.find('[data-field-box="menu_1-hover_hide"]');
        hovering.addClass('is-hidden');

        if ($(this).is(':checked')) {
            hovering.removeClass('is-hidden');
        }
    }

    function item_duplicate() {
        const userConfirmed = confirm("Do you want to duplicate this element?");
        if (userConfirmed) {
            const parent = get_parent_fields($(this), '.wpie-items__list');
            const item = $(this).closest('.wpie-item');

            let selectedValues = {};
            item.find('select').each(function () {
                selectedValues[$(this).attr('name')] = $(this).val();
            });

            $(item).attr('open', 'false');
            const clonedItem = item.clone(true, true);
            cleaningItem(clonedItem);

            clonedItem.find('select').each(function () {
                let name = $(this).attr('name');
                if (selectedValues[name]) {
                    $(this).val(selectedValues[name]);
                }
            });

            $(clonedItem).attr('open', '');
            item.after(clonedItem);
            set_up();
        }
    }

    function cleaningItem(item) {

        $(item).find('select').each(function () {
            let selectedValue = $(this).val();
        });

        $(item).find('.wpie-fulleditor').each(function () {
            const field = $(this);
            const id = $(this).attr('id');
            field.removeAttr('style id aria-hidden');
            const parent = $(this).closest('.wpie-field__label');
            const editor = $(parent).find('.wp-editor-wrap');
            if (editor.hasClass('tmce-active')) {
                let content = tinyMCE.get(id)?.getContent();
                field.val(content);
            }
            $(editor).remove();
            $(parent).prepend(field);
        });

        $(item).find('.wpie-color').each(function () {
            const field = $(this);
            field.removeAttr('style');
            const parent = $(this).closest('.wpie-field');
            const picker = $(parent).find('.wp-picker-container');
            $(picker).remove();
            $(parent).append(field);
        });

        $(item).find('.wpie-icon-box').each(function () {
            const field = $(this);
            field.removeAttr('style');
            let $this = $(this);

            // Видаляємо збережені дані плагіна
            $this.removeData('fontIconPicker');

            // Видаляємо додані DOM-елементи (панель вибору)
            $this.siblings('.fip-box').remove();

            // Видаляємо додані класи
            $this.removeClass('fip fip-theme-darkgrey');

            // Відновлюємо оригінальний <select>
            $this.show();

            const parent = $(this).closest('.wpie-field__label');
            const picker = $(parent).find('.icons-selector');
            $(picker).remove();
        });

    }


    // Clone menu item
    function clone_button(e) {
        e.preventDefault();
        const parent = get_parent_fields($(this), '.wpie-items__list');
        const selector = $(parent).find('.wpie-buttons__hr');
        const template = $('#template-button').clone().html();

        $(template).insertBefore($(selector));

        set_up();
    }

    // Change the button Type
    function item_type() {
        const parent = get_parent_fields($(this), '.wpie-fieldset');
        const box = get_field_box($(this));
        const type = $(this).val();
        const fields = parent.find('[data-field-box]').not(box);
        const parentTab = get_parent_fields($(this), '.wpie-tabs-wrapper');

        parentTab.find('.wpie-tab__type-menu').addClass('is-hidden');
        fields.addClass('is-hidden');

        const linkText = parent.find('[data-field-box="menu_1-item_link"] .wpie-field__title');
        linkText.text('Link');

        // Mapping menu types to the respective field boxes.
        const typeFieldMapping = {
            link: ['menu_1-item_link', 'menu_1-new_tab'],
            back: ['menu_1-new_tab'],
            next_post: ['menu_1-new_tab'],
            previous_post: ['menu_1-new_tab'],
            share: ['menu_1-item_share'],
            translate: ['menu_1-gtranslate', 'menu_1-new_tab'],
            smoothscroll: ['menu_1-item_link'],
            download: ['menu_1-item_link', 'menu_1-download'],
            login: ['menu_1-item_link', 'menu_1-new_tab'],
            logout: ['menu_1-item_link'],
            lostpassword: ['menu_1-item_link', 'menu_1-new_tab'],
            register: ['menu_1-new_tab'],
            email: ['menu_1-item_link'],
            telephone: ['menu_1-item_link'],
            id: ['menu_1-item_modal'],
            class: ['menu_1-item_modal'],
            text: ['menu_1-item_link', 'menu_1-new_tab', 'menu_1-item_text', 'item-text-box', 'menu_1-item_text_width'],
            popup: [`menu_1-popuptitle`, `menu_1-popupcontent`, 'item-popup-box'],
            search: ['menu_1-item_link'],
            bookmark: ['menu_1-item_link'],
            copyUrl: ['menu_1-item_link'],
            play: ['menu_1-item_link'],
            pause: ['menu_1-item_link'],
            muted: ['menu_1-item_link'],
            loop: ['menu_1-item_link'],
            reset: ['menu_1-item_link'],
            volumeUp: ['menu_1-item_link'],
            volumeDown: ['menu_1-item_link'],
        };

        // Customize the link text for certain types
        const linkTextMapping = {
            login: 'Redirect URL',
            logout: 'Redirect URL',
            lostpassword: 'Redirect URL',
            email: 'Email',
            telephone: 'Telephone',
            download: 'File URL',
            search: 'Placeholder Text',
            bookmark: 'Message',
            copyUrl: 'Message',
            play: 'Selector',
            pause: 'Selector',
            muted: 'Selector',
            loop: 'Selector',
            reset: 'Selector',
            volumeUp: 'Selector',
            volumeDown: 'Selector',
        };

        if (typeFieldMapping[type]) {
            const fieldsToShow = typeFieldMapping[type];
            fieldsToShow.forEach(field => {
                parent.find(`[data-field-box="${field}"]`).removeClass('is-hidden');
            });

            if (linkTextMapping[type])
                linkText.text(linkTextMapping[type]);
        }
    }

    function icon_type() {
        const type = $(this).val();
        const box = get_field_box($(this));
        const parent = get_parent_fields($(this));
        const fields = parent.find('[data-field-box]').not(box);
        fields.addClass('is-hidden');

        const fieldMap = {
            icon: ['icon', 'menu_1-item_icon', 'menu_1-icon_text'],
            image: ['image', 'menu_1-item_custom_link', 'menu_1-image_alt', 'menu_1-image_full',  'menu_1-icon_text'],
            class: ['icon_class', 'menu_1-icon_class', 'menu_1-icon_text'],
            emoji: ['emoji', 'menu_1-icon_emoji', 'menu_1-icon_text'],
            text: ['text', 'menu_1-item_custom_text'],
        }

        if (fieldMap[type]) {
            const fieldsToShow = fieldMap[type];
            fieldsToShow.forEach(field => {
                parent.find(`[data-field-box|="${field}"]`).removeClass('is-hidden');
            });
        }
    }

    // Enable Event Tracking
    function enable_tracking() {
        const fieldset = get_parent_fields($(this), '.wpie-fieldset');
        const tracking_field = fieldset.find('.wpie-fields').eq(1);
        tracking_field.addClass('is-hidden');
        if ($(this).is(':checked')) {
            tracking_field.removeClass('is-hidden');
        }
    }

    function radius_icon() {
        const fieldset = get_parent_fields($(this));
        const fields = $(fieldset).next();
        fields.addClass('is-hidden');
        if ($(this).is(':checked')) {
            fields.removeClass('is-hidden');
        }
    }

    function radius_label() {
        const fieldset = get_parent_fields($(this));
        const fields = $(fieldset).next();
        fields.addClass('is-hidden');
        if ($(this).is(':checked')) {
            fields.removeClass('is-hidden');
        }
    }

    function item_remove() {
        const userConfirmed = confirm("Are you sure you want to remove this element?");
        if (userConfirmed) {
            const parent = $(this).closest('.wpie-item');
            $(parent).remove();
        }
    }

    function item_toggle() {
        const parent = get_parent_fields($(this), '.wpie-item');
        const val = $(parent).attr('open') ? '0' : '1';
        $(parent).find('.wpie-item__toggle').val(val);
    }

    function delete_menu(e) {
        const proceed = confirm("Are you sure want to Delete Menu?");
        if (!proceed) {
            e.preventDefault();
        }
    }

    function get_parent_fields($el, $class = '.wpie-fields') {
        return $el.closest($class);
    }

    function get_field_box($el, $class = '.wpie-field') {
        return $el.closest($class);
    }

    initialize();
});