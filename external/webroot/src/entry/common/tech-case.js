/**
 * @file tech-case点击切换
 * @author chenweiwei01@baidu.com
 */

import $ from 'jquery';

const $techCaseOptionBtn = $('.tech-case-option-btn');

$techCaseOptionBtn.on('click', ({target}) => {
    const $target = $(target);

    if ($target.hasClass('tech-case-active')) {
        return;
    }

    $target
        .addClass('tech-case-active')
        .siblings()
        .removeClass('tech-case-active');

    const $techCaseItem = $('.tech-case-item').eq($target.index());

    $techCaseItem
        .addClass('tech-case-active')
        .siblings()
        .removeClass('tech-case-active');
});


