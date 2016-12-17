/**
 * @file 主页脚本入口
 * @author shiliang@baidu.com
 */
'use strict';

import $ from 'jquery';
import News from '../component/widget/news';


$(document).ready(function () {
    // 渲染底部新闻
    new News({
        selector: '.page-content .news-container',
        newsCounter: 3
    }).render();

    $('.solution-tab a').click(function (e) {
        e.preventDefault();
        $('.solution-tab a').removeClass('active');
        $(this).addClass('active');
        $('.solution-detail > div').hide();
        $($(this).attr('href')).show();
    });
});