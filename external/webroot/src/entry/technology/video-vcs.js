/**
 * @file 色情识别脚本入口
 * @author shiliang@baidu.com
 */

import $ from 'jquery';
import Vue from 'vue';

import videoCover from './videoDemo/video-cover.vue';

/* eslint-disable */
import '!file-loader?name=./../../template/cloud/[name].html!extract-loader!html-loader!view/technology/video-vcs.html';
/* eslint-enable */
import '../../less/technology/video-vcs.less';

// case点击效果
$('.case-indicator > li').click(function () {
    $('.case-indicator > li').each((i, e) => {
        $(e).toggleClass('active', i === $(this).index());
    });
    $('.case-item').each((i, e) => {
        $(e).toggleClass('active', i === $(this).index());
    });
});

new Vue(videoCover);
