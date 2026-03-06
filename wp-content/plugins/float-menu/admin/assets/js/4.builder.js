'use strict';
(function ($) {

    $.fn.wowFloatMenuLiveBuilder = function () {
        this.each(function (index, element) {
            const labelText = $(this).find('[data-field="menu_1-item_tooltip"]').val();
            const linkType = $(this).find('[data-field="menu_1-item_type"]').val();
            let typeText = $(this).find('[data-field="menu_1-item_type"] option:selected').text();

            if(linkType === 'share') {
                const text = $(this).find('[data-field="menu_1-item_share"] option:selected').text();
                typeText = typeText + ': '+text;
            }

            if(linkType === 'translate') {
                const text = $(this).find('[data-field="menu_1-gtranslate"] option:selected').text();
                typeText = typeText + ': '+text;
            }

            if(linkType === 'smoothscroll') {
                const text = $(this).find('[data-field="menu_1-item_link"]').val();
                typeText = typeText + ': '+text;
            }

            const iconValue = getIcon(this);

            const sub = $(element).find('.wpie-item__parent');

            if ($(element).hasClass('shifted-right')) {
                sub.val(1);
            }  else {
                sub.val(0);
            }


            const icon = $(this).find('.wpie-item_heading_icon');
            const label = $(this).find('.wpie-item_heading_label');
            const type = $(this).find('.wpie-item_heading_type');

            const color = $(this).find('[data-field="menu_1-color"]').val();
            const hcolor = $(this).find('[data-field="menu_1-hcolor"]').val();
            const bcolor = $(this).find('[data-field="menu_1-bcolor"]').val();
            const hbcolor = $(this).find('[data-field="menu_1-hbcolor"]').val();
            const font = $(this).find('[data-field="menu_1-item_tooltip_font"]').val();
            const style = $(this).find('[data-field="menu_1-item_tooltip_style"]').val();
            const weight = $(this).find('[data-field="menu_1-item_tooltip_weight"]').val();

            icon.css({'color': color, 'background': bcolor});
            label.css({
                'color': color,
                'background': bcolor,
                'font-family': font,
                'font-style': style,
                'font-weight': weight
            });

            icon.add(label).hover(
                function () { // This runs when the mouse enters either the icon or label
                    icon.css({'color': hcolor, 'background': hbcolor});
                    label.css({'color': hcolor, 'background': hbcolor});
                },
                function () { // This runs when the mouse leaves either the icon or label
                    icon.css({'color': color, 'background': bcolor});
                    label.css({'color': color, 'background': bcolor});
                }
            );


            label.text(labelText);
            type.text(typeText);
            icon.html(iconValue);
        });

        function getIcon(element) {
            const iconRotate = $(element).find('[data-field|="menu_1-icon_rotate"]').val();
            const iconFlip = $(element).find('[data-field|="menu_1-icon_flip"]').val();

            let style = ' style="';
            if (iconRotate !== '' || iconRotate !== '0') {
                style += `rotate: ${iconRotate}deg;`;
            }

            if (iconFlip !== '') {
                if (iconFlip === '-flip-horizontal') {
                    style += `scale: -1 1;`;
                }
                if (iconFlip === '-flip-vertical') {
                    style += `scale: 1 -1;`;
                }
                if (iconFlip === '-flip-both') {
                    style += `scale: -1 -1;`;
                }
            }

            style += '"';

            const type = $(element).find('[data-field|="menu_1-icon_type"]').val();

            if (type === 'icon') {
                let icon = $(element).find('.selected-icon').html();
                if (icon === undefined || $.trim(icon) === '<i class="fip-icon-block"></i>') {
                    icon = $(element).find('[data-field|="menu_1-item_icon"]').val();
                    icon = `<i class="${icon}"></i>`;
                }
                icon = icon.replace('class=', style + ' class=');
                return icon;
            }

            if (type === 'image') {
                let icon = $(element).find('[data-field|="menu_1-item_custom_link"]').val();
                return `<img src="${icon}" ${style}>`;
            }

            if (type === 'class') {
                let icon = $(element).find('[data-field|="menu_1-icon_class"]').val();
                return `<i class="dashicons dashicons-camera-alt" ${style}></i>`;
            }

            if (type === 'emoji') {
                let icon = $(element).find('[data-field|="menu_1-icon_emoji"]').val();
                return `<span ${style}>${icon}</span>`;
            }

            if (type === 'text') {
                let icon = $(element).find('[data-field|="menu_1-item_custom_text"]').val();
                return `<span ${style}>${icon}</span>`;
            }

            return '';

        }

        function isValidURL(string) {
            var regex = new RegExp(
                '^(https?:\\/\\/)?' + // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
            return !!regex.test(string);
        }
    }

}(jQuery));