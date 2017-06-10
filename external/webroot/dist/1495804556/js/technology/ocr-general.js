duAI([0],{

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _lodash = __webpack_require__(10);

var _lodash2 = _interopRequireDefault(_lodash);

var _demoCanvas = __webpack_require__(18);

var _demoCanvas2 = _interopRequireDefault(_demoCanvas);

var _demoAPI = __webpack_require__(7);

var _alertModal = __webpack_require__(6);

var _alertModal2 = _interopRequireDefault(_alertModal);

__webpack_require__(24);

__webpack_require__(28);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-enable */

/* eslint-disable */
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
    (0, _jquery2.default)(window).scroll((0, _lodash2.default)(function () {
        if ((0, _jquery2.default)(document).scrollTop() >= 100) {
            (0, _jquery2.default)('.tech-function-detail').trigger('demo');
        }
    }, 300));

    (0, _jquery2.default)(window).scroll((0, _lodash2.default)(function () {
        if ((0, _jquery2.default)(document).scrollTop() >= 500) {
            (0, _jquery2.default)('.tech-tab').addClass('tech-top');
        } else {
            (0, _jquery2.default)('.tech-tab').removeClass('tech-top');
        }
    }, 16));

    // tab切换
    (0, _jquery2.default)('.ocr-general-1, .ocr-general-2').hide();
    (0, _jquery2.default)('.tech-tab-list .tech-tab-item').eq(0).addClass('tech-tab-change');
    (0, _jquery2.default)('.tech-tab-list').on('click', '.tech-tab-item', function () {
        (0, _jquery2.default)(this).addClass('tech-tab-change').siblings().removeClass('tech-tab-change');
        (0, _jquery2.default)('.ocr-general-' + (0, _jquery2.default)(this).index()).show().siblings('.ocr-general').hide();
    });

    // 绑定功能介绍动画
    (0, _jquery2.default)('.tech-function-detail').one('demo', function () {
        (0, _jquery2.default)('.tech-function-original-card').addClass('tech-function-scanning');
        setTimeout(function () {
            (0, _jquery2.default)('.tech-function-original-card').removeClass('tech-function-scanning').addClass('tech-function-scanned');
            (0, _jquery2.default)('.tech-function-scan-result').addClass('tech-function-scanned');
        }, 3000);
    });

    // 线上demo开始
    var isScanning = false;

    var resetDemo = function resetDemo() {
        (0, _jquery2.default)('#demo-json > p').empty();
        (0, _jquery2.default)('#demo-result .result-background').attr('class', 'result-background');
        (0, _jquery2.default)('#demo-photo-upload, #scan-photo').removeClass('disabled');
        (0, _jquery2.default)('#demo-photo-upload  > input').val('');
        isScanning = false;
    };

    var startScan = function startScan(type, imgSrc, url) {
        (0, _jquery2.default)('#demo-result .result-background').attr('class', 'result-background loading');
        (0, _jquery2.default)('#demo-result tbody').empty();
        var options = {
            success: function success(res) {
                (0, _jquery2.default)('#demo-photo-upload, #scan-photo').removeClass('disabled');
                (0, _jquery2.default)('#demo-json > p').html(JSON.stringify(res, null, '\t'));
                (0, _jquery2.default)('#demo-result .result-background').removeClass('loading');

                if (res.errno !== 0) {
                    (0, _jquery2.default)('#demo-result .result-background').toggleClass('has-result man female', false).toggleClass('error-upload-fail', res.errno === 107).toggleClass('error-timeout', res.errno === 28).toggleClass('error-image-format', res.errno === 106);
                    isScanning = false;
                    if ([106, 107, 28].indexOf(res.errno) === -1) {
                        new _alertModal2.default(res.msg);
                    }
                    return false;
                }
                var hasNoResult = !res.data.words_result_num;
                for (var i = 0, len = res.data.words_result_num; i < len; i++) {
                    var record = res.data.words_result[i];
                    (0, _jquery2.default)('#demo-result tbody').append(['<tr>', '<td>' + (i + 1) + '</td>', '<td>' + record.words + '</td>', '</tr>'].join(''));
                }

                (0, _jquery2.default)('#demo-result .result-background').toggleClass('has-result', !hasNoResult).toggleClass('error-no-result', hasNoResult);
                isScanning = false;
            },
            fail: function fail(xhr) {
                new _alertModal2.default('接口发生错误：' + xhr.status + ' - ' + xhr.statusText);
                resetDemo();
            }
        };
        if (type === 'url') {
            options.imageUrl = url;
        } else if (type === 'stream') {
            options.image = imgSrc;
        }

        (0, _demoAPI.scanGeneralText)(options);
    };

    // 上传图片
    (0, _jquery2.default)('#demo-photo-upload  > input').change(function (e) {
        if ((0, _jquery2.default)(this).val() === '') {
            return false;
        }
        if (isScanning) {
            new _alertModal2.default('操作正在进行中，请稍候再试！');
            return;
        }
        isScanning = true;
        (0, _jquery2.default)('#demo-photo-upload, #scan-photo').addClass('disabled');
        var file = (0, _jquery2.default)(this)[0].files[0];
        new _demoCanvas2.default({
            selector: '#demo-origin-general',
            image: file,
            type: 'stream',
            success: function success(imgSrc) {
                (0, _jquery2.default)('#demo-photo-upload  > input').val('');
                startScan('stream', imgSrc);
            },

            fail: resetDemo
        });
    });

    // demo 检测输入框事件绑定
    (0, _jquery2.default)('#demo-photo-url').change(function () {
        (0, _jquery2.default)('.demo-card-list > li').removeClass('active');
    });

    // 检测按钮事件
    (0, _jquery2.default)('#scan-photo').click(function () {
        if (isScanning) {
            new _alertModal2.default('操作正在进行中，请稍候再试！');
            return;
        }
        if ((0, _jquery2.default)(this).hasClass('disabled') || !(0, _jquery2.default)('#demo-photo-url').val()) {
            return false;
        }
        isScanning = true;
        var url = (0, _jquery2.default)('#demo-photo-url').val();
        (0, _jquery2.default)('#demo-photo-upload, #scan-photo').addClass('disabled');
        new _demoCanvas2.default({
            selector: '#demo-origin-general',
            image: url,
            type: 'url',
            apiType: 'commontext',
            success: function success(imgSrc) {
                startScan('url', imgSrc, url);
            },

            fail: resetDemo
        });
    });

    // 阻止多次上传
    (0, _jquery2.default)('#demo-photo-upload').click(function () {
        if ((0, _jquery2.default)(this).hasClass('disabled')) {
            return false;
        }
    });

    var $demoCardImgList = (0, _jquery2.default)('.demo-card-list > li');

    // 绑定实例图点击事件
    $demoCardImgList.click(function () {
        if (isScanning) {
            new _alertModal2.default('操作正在进行中，请稍候再试！');
            return;
        }
        isScanning = true;
        (0, _jquery2.default)('.demo-card-list > li').removeClass('active');
        (0, _jquery2.default)(this).addClass('active');
        var url = '' + window.location.protocol + (0, _jquery2.default)(this).find('img').attr('src');
        (0, _jquery2.default)('#demo-photo-upload, #scan-photo').addClass('disabled');
        new _demoCanvas2.default({
            selector: '#demo-origin-general',
            image: url,
            type: 'url',
            toCheck: false,
            success: function success(imgSrc) {
                startScan('url', imgSrc, url);
            },

            fail: resetDemo
        });
    });

    // 触发初始化效果
    (0, _jquery2.default)('.demo-card-list > li')[0].click();
}); /**
     * @file ocr-通用印刷文字识别脚本入口
     * @author shiliang@baidu.com
     */

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @file 用于绘制根据图片识别返回数据绘制图片的插件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author shiliang@baidu.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _demoAPI = __webpack_require__(7);

var _alertModal = __webpack_require__(6);

var _alertModal2 = _interopRequireDefault(_alertModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable */
var notFoundImg = __webpack_require__(26);
var formatImg = __webpack_require__(25);
var tooLargeImg = __webpack_require__(27);
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
                url: this.checkByUrl,
                stream: this.checkByStream
            }[this.type](image, apiType);

            promise.then(function (resultImg) {
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

            // 图片缩放
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

/***/ 24:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 25:
/***/ (function(module, exports) {

module.exports = "/ai_dist/1495804556/ai_images/error/image-format.png";

/***/ }),

/***/ 26:
/***/ (function(module, exports) {

module.exports = "/ai_dist/1495804556/ai_images/error/not-found.png";

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

module.exports = "/ai_dist/1495804556/ai_images/error/too-large.png";

/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./../../template/cloud/ocr-general.html";

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(1);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"ai-modal alert\" id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n    <header class=\"modal-header\">\r\n        <h3>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h3>\r\n        <a class=\"modal-x\"></a>\r\n    </header>\r\n    <section class=\"modal-content\">\r\n        <div style=\"text-align: center; color: #666;font-size: 14px;margin-bottom: 20px;\">\r\n            "
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n        </div>\r\n        <div style=\"text-align: center;\">\r\n            <button type=\"button\" class=\"btn-normal cancel\">确定</button>\r\n        </div>\r\n    </section>\r\n</div>\r\n";
},"useData":true});

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13);


/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _modal = __webpack_require__(4);

var _modal2 = _interopRequireDefault(_modal);

var _alert = __webpack_require__(33);

var _alert2 = _interopRequireDefault(_alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file 提示模态框容器
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author shiliang@baidu.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

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
            var html = (0, _alert2.default)({
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

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.scanIDCard = scanIDCard;
exports.scanBankCard = scanBankCard;
exports.scanGeneralText = scanGeneralText;
exports.scanFace = scanFace;
exports.scanPornography = scanPornography;
exports.scanTerrorgraphy = scanTerrorgraphy;
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

    _jquery2.default.post('/aidemo', {
        type: 'idcard',
        image: image,
        'image_url': imageUrl
    }).success(success).fail(fail);
} /**
   * @file demo API接口定义
   * @author shiliang@baidu.com
   */

function scanBankCard(_ref2) {
    var _ref2$image = _ref2.image,
        image = _ref2$image === undefined ? null : _ref2$image,
        _ref2$imageUrl = _ref2.imageUrl,
        imageUrl = _ref2$imageUrl === undefined ? null : _ref2$imageUrl,
        _ref2$success = _ref2.success,
        success = _ref2$success === undefined ? _jquery2.default.noop : _ref2$success,
        _ref2$fail = _ref2.fail,
        fail = _ref2$fail === undefined ? _jquery2.default.noop : _ref2$fail;

    _jquery2.default.post('/aidemo', {
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

    _jquery2.default.post('/aidemo', {
        type: 'commontext',
        image: image,
        'image_url': imageUrl
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

    _jquery2.default.post('/aidemo', {
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

    _jquery2.default.post('/aidemo', {
        type: 'pornography',
        image: image,
        'image_url': imageUrl
    }).success(success).fail(fail);
}

function scanTerrorgraphy(_ref6) {
    var _ref6$image = _ref6.image,
        image = _ref6$image === undefined ? null : _ref6$image,
        _ref6$imageUrl = _ref6.imageUrl,
        imageUrl = _ref6$imageUrl === undefined ? null : _ref6$imageUrl,
        _ref6$success = _ref6.success,
        success = _ref6$success === undefined ? _jquery2.default.noop : _ref6$success,
        _ref6$fail = _ref6.fail,
        fail = _ref6$fail === undefined ? _jquery2.default.noop : _ref6$fail;

    _jquery2.default.post('/aidemo', {
        type: 'terror',
        image: image,
        'image_url': imageUrl
    }).success(success).fail(fail);
}

function getHeader(_ref7) {
    var _ref7$imageUrl = _ref7.imageUrl,
        imageUrl = _ref7$imageUrl === undefined ? null : _ref7$imageUrl,
        type = _ref7.type,
        _ref7$success = _ref7.success,
        success = _ref7$success === undefined ? _jquery2.default.noop : _ref7$success,
        _ref7$fail = _ref7.fail,
        fail = _ref7$fail === undefined ? _jquery2.default.noop : _ref7$fail;

    _jquery2.default.post('/aidemo', {
        action: 'getHeader',
        type: type,
        'image_url': imageUrl
    }).success(success).fail(fail);
}

function evaluateWakeWords(_ref8) {
    var _ref8$words = _ref8.words,
        words = _ref8$words === undefined ? null : _ref8$words,
        _ref8$success = _ref8.success,
        success = _ref8$success === undefined ? _jquery2.default.noop : _ref8$success,
        _ref8$fail = _ref8.fail,
        fail = _ref8$fail === undefined ? _jquery2.default.noop : _ref8$fail;

    _jquery2.default.post('/aidemo', {
        type: 'wakescore',
        kw: words
    }).success(success).fail(fail);
}

function exportWakeWords(_ref9) {
    var _ref9$words = _ref9.words,
        words = _ref9$words === undefined ? null : _ref9$words,
        _ref9$success = _ref9.success,
        success = _ref9$success === undefined ? _jquery2.default.noop : _ref9$success;

    window.open('/aidemo?type=wakedownload&kw=' + words, '_blank');
    success();
}

function synthesizeSpeech(_ref10) {
    var _ref10$data = _ref10.data,
        data = _ref10$data === undefined ? {} : _ref10$data,
        _ref10$success = _ref10.success,
        success = _ref10$success === undefined ? _jquery2.default.noop : _ref10$success,
        _ref10$fail = _ref10.fail,
        fail = _ref10$fail === undefined ? _jquery2.default.noop : _ref10$fail;

    _jquery2.default.post('/aidemo', {
        type: 'tts',
        speed: data.speed,
        vol: data.vol,
        person: data.person,
        text: data.text
    }).success(success).fail(fail);
}

/***/ })

},[55]);
//# sourceMappingURL=ocr-general.js.map