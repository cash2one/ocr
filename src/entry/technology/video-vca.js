/**
 * @file 色情识别脚本入口
 * @author shiliang@baidu.com
 */

import $ from 'jquery';
import Vue from 'vue';
import 'babel-polyfill';

import videoVca from './videoDemo/video-vca.vue';

/* eslint-disable */
import '!file-loader?name=./../../template/cloud/[name].html!extract-loader!html-loader!view/technology/video-vca.html';
/* eslint-enable */
import '../../less/technology/video-vca.less';

// case点击效果
$('.case-indicator > li').click(function () {
    $('.case-indicator > li').each((i, e) => {
        $(e).toggleClass('active', i === $(this).index());
    });
    $('.case-item').each((i, e) => {
        $(e).toggleClass('active', i === $(this).index());
    });
});

// TODO 受历史因素影响，代码jQuery和Vue共存，未来会优化
new Vue(videoVca);
