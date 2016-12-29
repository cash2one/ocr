/**
 * @file 拨测服务方案脚本入口
 * @author chenweiwei01@baidu.com
 */
'use strict';

import $ from 'jquery';

$(document).ready(function () {
    // case点击效果
    $('.case-indicator > li').click(function () {
        $('.case-indicator > li').each((i, e) => {
            $(e).toggleClass('active', i === $(this).index());
        });
        $('.case-item').each((i, e) => {
            $(e).toggleClass('active', i === $(this).index());
        });
    });
});