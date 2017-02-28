duAI([14],{

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @file 提示模态框容器
 * @author shiliang@baidu.com
 */


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _ejs = __webpack_require__(3);

var _ejs2 = _interopRequireDefault(_ejs);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _modal = __webpack_require__(4);

var _modal2 = _interopRequireDefault(_modal);

var _modal3 = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AlertModal = function (_Modal) {
    _inherits(AlertModal, _Modal);

    function AlertModal(content) {
        _classCallCheck(this, AlertModal);

        var _this = _possibleConstructorReturn(this, (AlertModal.__proto__ || Object.getPrototypeOf(AlertModal)).call(this));

        _this.title = '提示';
        _this.content = content || '';
        _this.init();
        return _this;
    }

    _createClass(AlertModal, [{
        key: 'init',
        value: function init() {
            var html = _ejs2.default.render(_modal3.ALERT_MODAL_TMPL, {
                id: this.id,
                title: this.title,
                content: this.content
            });
            (0, _jquery2.default)(this.container).append(html);
            this.bindEvent();
            _get(AlertModal.prototype.__proto__ || Object.getPrototypeOf(AlertModal.prototype), 'show', this).call(this);
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.getModal().hide().remove();
            (0, _jquery2.default)('body').removeClass('modal-show');
        }
    }, {
        key: 'bindEvent',
        value: function bindEvent() {
            var _this2 = this;

            _get(AlertModal.prototype.__proto__ || Object.getPrototypeOf(AlertModal.prototype), 'bindEvent', this).call(this);
            var modal = this.getModal();

            modal.on('click', 'button.cancel', function (e) {
                e.preventDefault();
                _this2.hide();
            });
        }
    }]);

    return AlertModal;
}(_modal2.default);

exports.default = AlertModal;

/***/ }),

/***/ 10:
/***/ (function(module, exports) {

module.exports = "/ai_dist/1487644629/ai_images/error/too-large.png";

/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(48);


/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @file demo API接口定义
 * @author shiliang@baidu.com
 */


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.scanIDCard = scanIDCard;
exports.scanBankCard = scanBankCard;
exports.scanGeneralText = scanGeneralText;
exports.scanFace = scanFace;
exports.scanPornography = scanPornography;
exports.getHeader = getHeader;
exports.evaluateWakeWords = evaluateWakeWords;
exports.exportWakeWords = exportWakeWords;
exports.synthesizeSpeech = synthesizeSpeech;

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scanIDCard(_ref) {
    var _ref$image = _ref.image,
        image = _ref$image === undefined ? null : _ref$image,
        _ref$imageUrl = _ref.imageUrl,
        imageUrl = _ref$imageUrl === undefined ? null : _ref$imageUrl,
        _ref$success = _ref.success,
        success = _ref$success === undefined ? _jquery2.default.noop : _ref$success,
        _ref$fail = _ref.fail,
        fail = _ref$fail === undefined ? _jquery2.default.noop : _ref$fail;

    _jquery2.default.post('http://ai.baidu.com/aidemo', {
        type: 'idcard',
        image: image,
        'image_url': imageUrl
    }).success(success).fail(fail);
}

function scanBankCard(_ref2) {
    var _ref2$image = _ref2.image,
        image = _ref2$image === undefined ? null : _ref2$image,
        _ref2$imageUrl = _ref2.imageUrl,
        imageUrl = _ref2$imageUrl === undefined ? null : _ref2$imageUrl,
        _ref2$success = _ref2.success,
        success = _ref2$success === undefined ? _jquery2.default.noop : _ref2$success,
        _ref2$fail = _ref2.fail,
        fail = _ref2$fail === undefined ? _jquery2.default.noop : _ref2$fail;

    _jquery2.default.post('http://ai.baidu.com/aidemo', {
        type: 'bankcard',
        image: image,
        'image_url': imageUrl
    }).success(success).fail(fail);
}

function scanGeneralText(_ref3) {
    var _ref3$image = _ref3.image,
        image = _ref3$image === undefined ? null : _ref3$image,
        _ref3$imageUrl = _ref3.imageUrl,
        imageUrl = _ref3$imageUrl === undefined ? null : _ref3$imageUrl,
        _ref3$success = _ref3.success,
        success = _ref3$success === undefined ? _jquery2.default.noop : _ref3$success,
        _ref3$fail = _ref3.fail,
        fail = _ref3$fail === undefined ? _jquery2.default.noop : _ref3$fail;

    _jquery2.default.post('http://ai.baidu.com/aidemo', {
        type: 'commontext',
        image: image,
        'image_url': 'http://ai.bdstatic.com/dist/1488185410/ai_images/technology/ocr-general/demo-card-3.png'
        // 'image_url': imageUrl
    }).success(success).fail(fail);
}

function scanFace(_ref4) {
    var _ref4$image = _ref4.image,
        image = _ref4$image === undefined ? null : _ref4$image,
        _ref4$imageUrl = _ref4.imageUrl,
        imageUrl = _ref4$imageUrl === undefined ? null : _ref4$imageUrl,
        _ref4$success = _ref4.success,
        success = _ref4$success === undefined ? _jquery2.default.noop : _ref4$success,
        _ref4$fail = _ref4.fail,
        fail = _ref4$fail === undefined ? _jquery2.default.noop : _ref4$fail;

    _jquery2.default.post('http://ai.baidu.com/aidemo', {
        type: 'face',
        image: image,
        'image_url': imageUrl
    }).success(success).fail(fail);
}

function scanPornography(_ref5) {
    var _ref5$image = _ref5.image,
        image = _ref5$image === undefined ? null : _ref5$image,
        _ref5$imageUrl = _ref5.imageUrl,
        imageUrl = _ref5$imageUrl === undefined ? null : _ref5$imageUrl,
        _ref5$success = _ref5.success,
        success = _ref5$success === undefined ? _jquery2.default.noop : _ref5$success,
        _ref5$fail = _ref5.fail,
        fail = _ref5$fail === undefined ? _jquery2.default.noop : _ref5$fail;

    _jquery2.default.post('http://ai.baidu.com/aidemo', {
        type: 'pornography',
        image: image,
        'image_url': imageUrl
    }).success(success).fail(fail);
}

function getHeader(_ref6) {
    var _ref6$imageUrl = _ref6.imageUrl,
        imageUrl = _ref6$imageUrl === undefined ? null : _ref6$imageUrl,
        type = _ref6.type,
        _ref6$success = _ref6.success,
        success = _ref6$success === undefined ? _jquery2.default.noop : _ref6$success,
        _ref6$fail = _ref6.fail,
        fail = _ref6$fail === undefined ? _jquery2.default.noop : _ref6$fail;

    _jquery2.default.post('http://ai.baidu.com/aidemo', {
        action: 'getHeader',
        type: type,
        'image_url': imageUrl
    }).success(success).fail(fail);
}

function evaluateWakeWords(_ref7) {
    var _ref7$words = _ref7.words,
        words = _ref7$words === undefined ? null : _ref7$words,
        _ref7$success = _ref7.success,
        success = _ref7$success === undefined ? _jquery2.default.noop : _ref7$success,
        _ref7$fail = _ref7.fail,
        fail = _ref7$fail === undefined ? _jquery2.default.noop : _ref7$fail;

    _jquery2.default.post('http://ai.baidu.com/aidemo', {
        type: 'wakescore',
        kw: words
    }).success(success).fail(fail);
}

function exportWakeWords(_ref8) {
    var _ref8$words = _ref8.words,
        words = _ref8$words === undefined ? null : _ref8$words,
        _ref8$success = _ref8.success,
        success = _ref8$success === undefined ? _jquery2.default.noop : _ref8$success;

    window.open('/aidemo?type=wakedownload&kw=' + words, '_blank');
    success();
}

function synthesizeSpeech(_ref9) {
    var _ref9$data = _ref9.data,
        data = _ref9$data === undefined ? {} : _ref9$data,
        _ref9$success = _ref9.success,
        success = _ref9$success === undefined ? _jquery2.default.noop : _ref9$success,
        _ref9$fail = _ref9.fail,
        fail = _ref9$fail === undefined ? _jquery2.default.noop : _ref9$fail;

    _jquery2.default.post('http://ai.baidu.com/aidemo', {
        type: 'tts',
        speed: data.speed,
        vol: data.vol,
        person: data.person,
        text: data.text
    }).success(success).fail(fail);
}

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @file ocr-生僻字识别脚本入口
 * @author chenweiwei01@baidu.com
 */


var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

__webpack_require__(92);

var _demoCanvas = __webpack_require__(6);

var _demoCanvas2 = _interopRequireDefault(_demoCanvas);

var _demoAPI = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Demo实例图片
var $techDemoSelect = (0, _jquery2.default)('.tech-demo-examples img');

// 实例图片点击点击
$techDemoSelect.on('click', function (_ref) {
    var target = _ref.target;

    var $target = (0, _jquery2.default)(target);

    if ($target.hasClass('active')) {
        return;
    }

    $target.addClass('active').siblings().removeClass('active');

    var demoUrl = '' + window.location.protocol + $target.attr('src');
    new _demoCanvas2.default({
        selector: '#demo-origin',
        image: demoUrl,
        type: 'url',
        toCheck: false,
        success: function success(imgSrc) {
            startScan('url', imgSrc, demoUrl);
        }
    });
});

var startScan = function startScan(type, imgSrc, url) {
    var options = {
        success: function success(res) {
            (0, _jquery2.default)('#demo-json').html('<p>' + JSON.stringify(res, null, '\t') + '</p>');
            var result = res.data.words_result;
            result.forEach(function (value, key) {
                (0, _jquery2.default)('.demo-result-table').append(['<tr>' + '<td>' + (key + 1) + '</td>', '<td>' + value.words + '</td>', '<td>' + value.location.left + '</td>', '<td>' + value.location.top + '</td>', '<td>' + value.location.width + '</td>', '<td>' + value.location.height + '</td>', '</tr>'].join(''));
            });
        }
    };
    options.imageUrl = url;
    (0, _demoAPI.scanGeneralText)(options);
};

// $techDemoSelect.click();

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @file 用于绘制根据图片识别返回数据绘制图片的插件
 * @author shiliang@baidu.com
 */


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _demoAPI = __webpack_require__(2);

var _alertModal = __webpack_require__(1);

var _alertModal2 = _interopRequireDefault(_alertModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable */
var notFoundImg = __webpack_require__(9);
var formatImg = __webpack_require__(8);
var tooLargeImg = __webpack_require__(10);
/* eslint-enable */

var DemoCanvas = function () {
    function DemoCanvas(_ref) {
        var _this = this;

        var selector = _ref.selector,
            image = _ref.image,
            type = _ref.type,
            apiType = _ref.apiType,
            _ref$toCheck = _ref.toCheck,
            toCheck = _ref$toCheck === undefined ? true : _ref$toCheck,
            _ref$scale = _ref.scale,
            scale = _ref$scale === undefined ? 1 : _ref$scale,
            success = _ref.success,
            fail = _ref.fail;

        _classCallCheck(this, DemoCanvas);

        if (!(0, _jquery2.default)(selector).context) {
            throw 'DemoCanvas：未寻找到容器!';
        }
        this.container = (0, _jquery2.default)(selector);
        this.type = type;
        this.scale = scale;
        this.apiType = apiType;
        this.image = new Image();
        this.success = success || _jquery2.default.noop;
        this.fail = fail || _jquery2.default.noop;

        this.image.onerror = function () {
            _this.fail();
            new _alertModal2.default('图片加载失败，请重试');
        };

        if (toCheck) {
            var promise = {
                'url': this.checkByUrl,
                'stream': this.checkByStream
            }[this.type](image, apiType);

            _jquery2.default.when(promise).then(function (resultImg) {
                _this.image.onload = function () {
                    _this.render(true);
                };
                _this.image.src = resultImg;
            }, function (errorImg) {
                _this.image.onload = function () {
                    _this.render(false);
                };
                _this.image.src = errorImg;
            });
        } else {
            this.image.onload = function () {
                _this.render(true);
            };
            this.image.src = image;
        }
    }

    _createClass(DemoCanvas, [{
        key: 'checkByUrl',
        value: function checkByUrl(image, apiType) {
            var dfd = _jquery2.default.Deferred();
            (0, _demoAPI.getHeader)({
                imageUrl: image,
                type: apiType,
                success: function success(res) {
                    var contentType = res.data['Content-Type'];
                    var contentSize = res.data['Content-Length'];
                    if (!contentType && !contentSize || res.errno !== 0) {
                        // console.error('此错误可能是由于图片的同源策略造成的!');
                        dfd.reject(notFoundImg);
                        return;
                    }
                    if (!/image\/(png|bmp|jpg|jpeg)/.test(contentType)) {
                        dfd.reject(formatImg);
                        return;
                    }
                    if (contentSize > 2 * 1024 * 1024) {
                        dfd.reject(tooLargeImg);
                        return;
                    }
                    dfd.resolve(res.data.image_data);
                },
                fail: function fail() {
                    dfd.reject(notFoundImg);
                }
            });
            return dfd.promise();
        }
    }, {
        key: 'checkByStream',
        value: function checkByStream(image) {
            var dfd = _jquery2.default.Deferred();
            var reader = new FileReader();
            if (!image) {
                dfd.reject(notFoundImg);
                return dfd.promise();
            }
            reader.readAsDataURL(image);
            reader.onload = function (e) {
                if (!/image\/(png|bmp|jpeg)/.test(image.type)) {
                    dfd.reject(formatImg);
                    return false;
                }
                if (image.size > 2 * 1024 * 1024) {
                    dfd.reject(tooLargeImg);
                    return false;
                }
                dfd.resolve(e.target.result);
            };
            reader.onerror = function () {
                dfd.reject(notFoundImg);
            };
            return dfd.promise();
        }
    }, {
        key: 'render',
        value: function render(isSuccessful) {
            var cWidth = this.container.width();
            var cHeight = this.container.height();
            var iWidth = this.image.width;
            var iHeight = this.image.height;

            var canvas = (0, _jquery2.default)('<canvas>您的浏览器暂时不支持canvas，请选用现代浏览器！</canvas>').attr('width', iWidth).attr('height', iHeight);
            var ctx = canvas[0].getContext('2d');
            ctx.drawImage(this.image, 0, 0);

            var wRatio = iWidth / cWidth;
            var hRatio = iHeight / cHeight;

            var scaleRatio = this.scale * (wRatio > 1 || hRatio > 1 ? 1 / (wRatio >= hRatio ? wRatio : hRatio) : 1);

            canvas.css({
                'position': 'relative',
                'left': '50%',
                'top': '50%',
                '-webkit-transform': 'translate(-50%, -50%) scale(' + scaleRatio + ')',
                '-moz-transform': 'translate(-50%, -50%) scale(' + scaleRatio + ')',
                '-o-transform': 'translate(-50%, -50%) scale(' + scaleRatio + ')',
                'transform': 'translate(-50%, -50%) scale(' + scaleRatio + ')'
            });
            canvas.attr('data-scale', scaleRatio);
            this.container.empty().append(canvas);
            if (isSuccessful) {
                this.success(this.image.src);
            } else {
                this.fail();
            }
        }
    }]);

    return DemoCanvas;
}();

exports.default = DemoCanvas;

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = "/ai_dist/1487644629/ai_images/error/image-format.png";

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = "/ai_dist/1487644629/ai_images/error/not-found.png";

/***/ }),

/***/ 92:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[160]);
//# sourceMappingURL=ocr-uncommon.js.map