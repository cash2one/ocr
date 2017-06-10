duAI([0],{

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(21);

__webpack_require__(22);

__webpack_require__(17);

/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $techCaseOptionBtn = (0, _jquery2.default)('.tech-case-option-btn'); /**
                                                                          * @file tech-case点击切换
                                                                          * @author chenweiwei01@baidu.com
                                                                          */

$techCaseOptionBtn.on('click', function (_ref) {
    var target = _ref.target;

    var $target = (0, _jquery2.default)(target);

    if ($target.hasClass('tech-case-active')) {
        return;
    }

    $target.addClass('tech-case-active').siblings().removeClass('tech-case-active');

    var $techCaseItem = (0, _jquery2.default)('.tech-case-item').eq($target.index());

    $techCaseItem.addClass('tech-case-active').siblings().removeClass('tech-case-active');
});

/***/ }),

/***/ 21:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./../../template/cloud/nlp-sentiment_classify.html";

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ })

},[49]);
//# sourceMappingURL=nlp-sentiment_classify.js.map