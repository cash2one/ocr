import $ from 'jquery';

// 增加placeholder兼容性
export function setPlaceHolder(container) {
    function hasPlaceHolder() {
        let input = document.createElement('input');
        return 'placeholder' in input;
    }
    if (!hasPlaceHolder()) {
        container.find('input[placeholder], textarea[placeholder]').each(function (i, e) {
            let input = $(e);
            input.parent().css('position', 'relative');
            let hint = $('<span class="hint">' + input.attr('placeholder') + '</span>');
            hint.css({
                position: 'absolute',
                top: '5px',
                left: '10px',
                padding: input.css('padding'),
                color: '#ccc'
            });
            $(e).after(hint);
        });

        let togglePlaceholder = function () {
            let value = $(this).val();
            $(this).siblings('.hint').toggle(value === '');
        }

        container.off('blur keypress', 'input[placeholder], textarea[placeholder]', togglePlaceholder)
            .on('blur keypress', 'input[placeholder], textarea[placeholder]', togglePlaceholder);
    }
}
