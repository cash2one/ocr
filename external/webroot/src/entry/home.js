/**
 * @file 主页脚本入口
 * @author shiliang@baidu.com
 */
'use strict';

import $ from 'jquery';
import News from '../component/widget/news';

$(document).ready(function () {
    // 首页轮播图
    let currentBannerNum = 0;
    let bannerInterval = null;
    const refreshTime = 6000;

    function resetInterval(interval, callback) {
        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(callback, refreshTime);
        return interval;
    }

    function setBannerNum(bannerNum) {
        currentBannerNum = bannerNum;
        bannerInterval = resetInterval(bannerInterval, refreshBanner);
    }

    function refreshBanner() {
        let banners = $('.banner-content > li');
        banners.each(function (i, e) {
            $(e).toggleClass('active', i === (currentBannerNum % banners.length));
            if ($(e).hasClass('video-bg')) {
                let video = $(e).find('video')[0];
                if (video.currentTime === undefined) {
                    return;
                }
                try {
                    if (i === (currentBannerNum % banners.length)) {
                        video.play();
                    } else {
                        video.currentTime = 0;
                        video.pause();
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        });
        $('.banner-indicator > li').each(function (i, e) {
            $(e).toggleClass('active', i === (currentBannerNum % banners.length));
        });
        currentBannerNum++;
    }

    $('.banner-indicator > li').click(function () {
        let newBannerNum = $(this).index();
        currentBannerNum = newBannerNum;
        refreshBanner();
        setBannerNum(newBannerNum + 1);
    });

    setBannerNum(currentBannerNum + 1);

    // 渲染底部新闻
    new News({
        selector: '.page-content .news-container',
        newsCounter: 3
    }).render();

    // 解决方案点击响应
    $('.solution-tab a').click(function (e) {
        e.preventDefault();
        $('.solution-tab a').removeClass('active');
        $(this).addClass('active');
        $('.solution-detail > div').hide();
        $($(this).attr('href')).show();
    });
});