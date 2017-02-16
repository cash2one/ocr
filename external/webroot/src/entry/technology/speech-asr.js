/**
 * @file speech-语音识别脚本入口
 * @author chenweiwei01@baidu.com
 */
'use strict';

import $ from 'jquery';

import 'less/technology/speech-asr.less';

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
