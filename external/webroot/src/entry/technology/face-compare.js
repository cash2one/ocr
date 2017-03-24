/**
 * @file bfb-人脸对比脚本入口
 * @author shiliang@baidu.com
 */

import $ from 'jquery';
import throttle from 'lodash.throttle';
import 'less/technology/face-compare.less';

/* eslint-disable */
import '!file-loader?name=./../../template/cloud/[name].html!extract-loader!html-loader!view/technology/face-compare.html';
/* eslint-enable */

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

    // 触发功能介绍动画
    $(window).scroll(
        throttle(
            () => {
                if ($(document).scrollTop() >= 100) {
                    $('.tech-intro-detail').trigger('demo');
                }
            },
            300
        )
    );

    // 绑定功能介绍动画
    $('.tech-intro-detail').one('demo', function () {
        $('.compare-group').addClass('scanned');
    });
});
