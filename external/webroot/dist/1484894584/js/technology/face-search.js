duAI([38],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(203);


/***/ },

/***/ 203:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @file bfb-人脸查找脚本入口
	 * @author shiliang@baidu.com
	 */
	'use strict';

	var _jquery = __webpack_require__(18);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _jquery2.default)(document).ready(function () {
	    // case点击效果
	    (0, _jquery2.default)('.case-indicator > li').click(function () {
	        var _this = this;

	        (0, _jquery2.default)('.case-indicator > li').each(function (i, e) {
	            (0, _jquery2.default)(e).toggleClass('active', i === (0, _jquery2.default)(_this).index());
	        });
	        (0, _jquery2.default)('.case-item').each(function (i, e) {
	            (0, _jquery2.default)(e).toggleClass('active', i === (0, _jquery2.default)(_this).index());
	        });
	    });

	    // 触发功能介绍动画
	    (0, _jquery2.default)(window).scroll(function () {
	        if ((0, _jquery2.default)(document).scrollTop() >= 100) {
	            (0, _jquery2.default)('.tech-intro-detail').trigger('demo');
	        }
	    });

	    // 绑定功能介绍动画
	    (0, _jquery2.default)('.tech-intro-detail').one('demo', function () {
	        var counter = 0;
	        var interval = setInterval(function () {
	            var faces = (0, _jquery2.default)('.face-list > li');
	            faces.each(function (i, e) {
	                (0, _jquery2.default)(e).toggleClass('scanning', i === counter);
	            });
	            if (counter === faces.length) {
	                clearInterval(interval);
	                (0, _jquery2.default)('.face-list > li').addClass('scanned');
	            }
	            counter++;
	        }, 700);
	    });
	});

/***/ }

});