/**
 * @file 对IE9的placeholder进行兼容
 * @author shiliang@baidu.com
 */

import $ from 'jquery';

// 增加placeholder兼容性
export function setPlaceHolder(container) {
    function hasPlaceHolder() {
        let input = document.createElement('input');
        return 'placeholder' in input;
    }

    function togglePlaceholder() {
        let value = $(this).val();
        $(this).siblings('.hint').toggle(value === '');
    }

    if (!hasPlaceHolder()) {
        container.find('input[placeholder], textarea[placeholder]').each(function (i, e) {
            let input = $(e);
            input.parent().css({
                position: 'relative',
                zIndex: 'auto'
            });
            input.css({
                position: 'relative',
                zIndex: 2,
                backgroundColor: 'transparent'
            });
            let hint = $('<span class="hint">' + input.attr('placeholder') + '</span>');
            hint.css({
                position: 'absolute',
                top: '10px',
                left: '10px',
                padding: input.css('padding'),
                color: '#ccc',
                zIndex: 1
            });
            $(e).after(hint);
            hint.click(function () {
                input.focus();
                hint.hide();
            });
        });


        container.off('blur keypress', 'input[placeholder], textarea[placeholder]', togglePlaceholder)
            .on('blur keypress', 'input[placeholder], textarea[placeholder]', togglePlaceholder);
    }
}
