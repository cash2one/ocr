/**
 * @file 拨测服务方案脚本入口
 * @author chenweiwei01@baidu.com
 */
'use strict';

import $ from 'jquery';

import 'less/technology/nlp-word_embedding.less';

const $target = $('.tech-case-option-btn');
const $caseCon = $('.tech-case-item');

$target.on('click', function () {
    const i = $(this).index();

    $(this).addClass('active')
        .siblings()
        .removeClass('active');

    $caseCon.eq(i)
        .addClass('active')
        .siblings()
        .removeClass('active');
});


