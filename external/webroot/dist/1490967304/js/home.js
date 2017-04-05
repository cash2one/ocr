duAI([0],{

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _news = __webpack_require__(7);

var _news2 = _interopRequireDefault(_news);

__webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _jquery2.default)(document).ready(function () {
    // 首页轮播图
    var currentBannerNum = 0;
    var bannerInterval = null;
    var refreshTime = 6000;
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
        var banners = (0, _jquery2.default)('.banner-content > li');
        banners.each(function (i, e) {
            (0, _jquery2.default)(e).toggleClass('active', i === currentBannerNum % banners.length);
            if ((0, _jquery2.default)(e).hasClass('video-bg')) {
                var video = (0, _jquery2.default)(e).find('video')[0];
                try {
                    if (i === currentBannerNum % banners.length) {
                        video.play();
                        (0, _jquery2.default)(e).find('video').css('opacity', 1);
                    } else {
                        video.currentTime = 0;
                        video.pause();
                        (0, _jquery2.default)(e).find('video').css('opacity', 0);
                    }
                } catch (err) {
                    // console.error(err);
                }
            }
        });
        (0, _jquery2.default)('.banner-indicator > li').each(function (i, e) {
            (0, _jquery2.default)(e).toggleClass('active', i === currentBannerNum % banners.length);
        });
        currentBannerNum++;
    }

    (0, _jquery2.default)('.banner-indicator > li').click(function () {
        var newBannerNum = (0, _jquery2.default)(this).index();
        currentBannerNum = newBannerNum;
        refreshBanner();
        setBannerNum(newBannerNum + 1);
    });

    (0, _jquery2.default)('.banner-indicator > li').eq(0).click();

    // 渲染底部新闻
    new _news2.default({
        selector: '.page-content .news-container',
        newsCounter: 3
    }).render();

    // 解决方案点击响应
    (0, _jquery2.default)('.solution-tab a').click(function (e) {
        e.preventDefault();
        (0, _jquery2.default)('.solution-tab a').removeClass('active');
        (0, _jquery2.default)(this).addClass('active');
        (0, _jquery2.default)('.solution-detail > div').hide();
        (0, _jquery2.default)((0, _jquery2.default)(this).attr('href')).show();
    });
}); /**
     * @file 主页脚本入口
     * @author shiliang@baidu.com
     */

/***/ }),

/***/ 20:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ })

},[49]);
//# sourceMappingURL=home.js.map