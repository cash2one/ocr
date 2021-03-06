/**
 * @file AR脚本入口
 * @author shiliang@baidu.com
 */

import $ from 'jquery';
import 'less/technology/ar.less';

/* eslint-disable */
import '!file-loader?name=./../../template/cloud/[name].html!extract-loader!html-loader!view/technology/ar.html';
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
});
