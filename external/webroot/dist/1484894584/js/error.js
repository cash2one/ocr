duAI([5],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(41);


/***/ },

/***/ 41:
/***/ function(module, exports, __webpack_require__) {

	/**
	* @file 错误页面脚本入口
	* @author shiliang@baidu.com
	*/
	'use strict';

	var _jquery = __webpack_require__(18);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _jquery2.default)(document).ready(function () {
	    var second = 4;
	    setInterval(function () {
	        (0, _jquery2.default)('#error-back').html(second-- + '秒后返回');
	        if (second === 0) {
	            window.open('//ai.baidu.com', '_self');
	        }
	    }, 1000);
	});

/***/ }

});