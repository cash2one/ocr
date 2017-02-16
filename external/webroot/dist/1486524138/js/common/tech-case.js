duAI([29],{

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @file tech-case点击切换
 * @author chenweiwei01@baidu.com
 */


var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $target = (0, _jquery2.default)('.tech-case-option-btn');
var $caseCon = (0, _jquery2.default)('.tech-case-item');

$target.on('click', function () {
    var i = (0, _jquery2.default)(this).index();

    (0, _jquery2.default)(this).addClass('active').siblings().removeClass('active');

    $caseCon.eq(i).addClass('active').siblings().removeClass('active');
});

/***/ }),

/***/ 130:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ })

},[130]);
//# sourceMappingURL=tech-case.js.map