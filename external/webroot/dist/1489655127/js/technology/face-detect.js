duAI([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _modal = __webpack_require__(5);

var _modal2 = _interopRequireDefault(_modal);

var _alert = __webpack_require__(40);

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
/* 8 */
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

function getHeader(_ref6) {
    var _ref6$imageUrl = _ref6.imageUrl,
        imageUrl = _ref6$imageUrl === undefined ? null : _ref6$imageUrl,
        type = _ref6.type,
        _ref6$success = _ref6.success,
        success = _ref6$success === undefined ? _jquery2.default.noop : _ref6$success,
        _ref6$fail = _ref6.fail,
        fail = _ref6$fail === undefined ? _jquery2.default.noop : _ref6$fail;

    _jquery2.default.post('/aidemo', {
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

    _jquery2.default.post('/aidemo', {
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

    _jquery2.default.post('/aidemo', {
        type: 'tts',
        speed: data.speed,
        vol: data.vol,
        person: data.person,
        text: data.text
    }).success(success).fail(fail);
}

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports) {

module.exports = "/ai_dist/1489655127/ai_images/technology/bfr-detect/demo-card-1.jpg";

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "/ai_dist/1489655127/ai_images/technology/bfr-detect/demo-card-2.jpg";

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = "/ai_dist/1489655127/ai_images/technology/bfr-detect/demo-card-3.jpg";

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = "/ai_dist/1489655127/ai_images/technology/bfr-detect/demo-card-4.png";

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = "/ai_dist/1489655127/ai_images/technology/bfr-detect/demo-card-5.png";

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = "/ai_dist/1489655127/ai_images/technology/bfr-detect/demo-card-6.jpg";

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "/ai_dist/1489655127/ai_images/technology/bfr-detect/demo-card-7.jpg";

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "/ai_dist/1489655127/ai_images/technology/bfr-detect/demo-card-8.jpg";

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _lodash = __webpack_require__(19);

var _lodash2 = _interopRequireDefault(_lodash);

var _demoCanvas = __webpack_require__(25);

var _demoCanvas2 = _interopRequireDefault(_demoCanvas);

var _demoAPI = __webpack_require__(8);

var _alertModal = __webpack_require__(7);

var _alertModal2 = _interopRequireDefault(_alertModal);

__webpack_require__(32);

__webpack_require__(31);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
// demo图片路径集合，TODO 后填充图片地址，略不合理
var demoImagePaths = [
// 静态引入，不要尝试些变量！
__webpack_require__(10), __webpack_require__(11), __webpack_require__(12), __webpack_require__(13), __webpack_require__(14), __webpack_require__(15), __webpack_require__(16), __webpack_require__(17)];
/* eslint-enable */

// 结果json展示容器
/**
 * @file bfb-人脸检测脚本入口
 * @author shiliang@baidu.com
 *         Franck Chen(chenfan02@baidu.com)
 */

var $jsonViewer = (0, _jquery2.default)('#demo-json').find('> p');
// 多人脸展示窗(容器)
var $multiFaceGallery = (0, _jquery2.default)('#result-gallery');
// 多人脸列表
var $multiFaceList = $multiFaceGallery.find('ul');
// 功能动画容器
var $techIntroDetail = (0, _jquery2.default)('.tech-intro-detail');
// 结果区
var $demoResult = (0, _jquery2.default)('#demo-result');
var $canvasContainer = $demoResult.find('.canvas-container');
// 用于上传文件的input, input[type='file']
var $uploadFileInput = (0, _jquery2.default)('#demo-photo-upload').find('> input');
var $demoPhotoUrl = (0, _jquery2.default)('#demo-photo-url');
// 用于盛放人脸分析数据的容器
var $faceDetail = (0, _jquery2.default)('#face-details');

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
        (0, _jquery2.default)('.tech-intro-detail').trigger('demo');
    }
}, 300));

// 绑定功能介绍动画
$techIntroDetail.one('demo', function () {
    $techIntroDetail.addClass('scanned');
});

// 线上demo开始
var isScanning = false;

// 重置demo相关dom
var resetDemo = function resetDemo() {
    isScanning = false;

    $jsonViewer.empty();

    $canvasContainer.attr('class', 'canvas-container');
    (0, _jquery2.default)('#demo-photo-upload, #scan-photo').removeClass('disabled');

    // 清空用于输入图片地址的url
    $uploadFileInput.val('');

    $multiFaceGallery.hide();
    $multiFaceList.empty();

    $faceDetail.hide().empty();
};

// 画人脸结果区块
var drawRect = function drawRect(data) {
    var $canvas = $demoResult.find('canvas');
    var scale = $canvas.attr('data-scale');
    var ctx = $canvas[0].getContext('2d');

    // 处理每一张人脸
    for (var i = 0, len = data.length; i < len; i++) {
        var record = data[i];
        var location = record.location;

        ctx.save();
        ctx.lineWidth = 4 / scale;
        ctx.strokeStyle = 'rgba(0, 115, 235, 0.8)';
        ctx.translate(location.left, location.top);
        // 区块追随人脸倾斜角度
        ctx.rotate(record.rotation_angle / 180 * Math.PI);
        ctx.rect(0, 0, location.width, location.height);
        ctx.stroke();
        ctx.restore();
    }
};

// 画人脸结果Land Mark
var drawLandMark = function drawLandMark(data, hasOffset) {
    var $canvas = $demoResult.find('canvas');
    var scale = $canvas.attr('data-scale');
    var ctx = $canvas[0].getContext('2d');

    var offset = hasOffset ? { x: data.location.left, y: data.location.top } : { x: 0, y: 0 };
    var rotatedAngel = hasOffset ? data.rotation_angle : 0;

    var getAngle = function getAngle(x, y) {
        return 360 * Math.atan(y / x) / (2 * Math.PI);
    };

    var getRadius = function getRadius(x, y) {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    };

    for (var i = 0, len = data.landmark72.length; i < len; i++) {
        var record = data.landmark72[i];

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.fillStyle = 'rgba(0, 115, 235, 0.8)';
        ctx.strokeStyle = 'transparent';

        var angle = (getAngle(record.x - offset.x, record.y - offset.y) - rotatedAngel) / 180 * Math.PI;
        var radius = getRadius(record.x - offset.x, record.y - offset.y);

        ctx.arc(radius * Math.cos(angle), radius * Math.sin(angle), 2 / scale, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
};

// 打开关闭结果画廊
var toggleGallery = function toggleGallery(isOpen) {
    $multiFaceGallery.toggle(isOpen);
};

// 设置多人脸展示窗, 在图片中包含多张人脸时会调用这里
var setGalleryContent = function setGalleryContent(data) {
    var originalImage = new Image();

    // 根据数据，从源图片中裁剪每一张人脸,生成小图，放入展示窗中
    originalImage.onload = function () {
        for (var i = 0, len = data.result.length; i < len; i++) {
            var record = data.result[i];
            // 利用canvas裁剪图片, 大小根据返回数据中人脸尺寸决定
            var canvas = (0, _jquery2.default)('<canvas>').attr('width', record.location.width).attr('height', record.location.height);

            var ctx = canvas[0].getContext('2d');
            ctx.rotate(-record.rotation_angle * Math.PI / 180);
            ctx.translate(-record.location.left, -record.location.top);
            ctx.drawImage(originalImage, 0, 0);

            var galleryItem = (0, _jquery2.default)('<li><img src="' + canvas[0].toDataURL() + '"></li>');
            galleryItem.data('face', record).data('isAll', false);
            $multiFaceList.append(galleryItem);
        }
    };

    originalImage.src = $multiFaceGallery.find('img').eq(0).attr('src');
};

// 初始画廊
var initGallery = function initGallery(imgSrc, data) {
    var galleryItem = (0, _jquery2.default)('<li class="active"><img src="' + imgSrc + '"></li>');
    galleryItem.data('face', data).data('isAll', true);
    $multiFaceList.empty().append(galleryItem);
};

var FACE_PROPERTY_DICT = {
    age: {
        name: '年龄',
        transform: function transform(value) {
            return Math.round(value);
        }
    },
    race: {
        name: '人种',
        transform: function transform(value) {
            return {
                yellow: '黄种人',
                white: '白种人',
                black: '黑种人',
                arabs: '阿拉伯人'
            }[value];
        }
    },
    gender: {
        name: '性别',
        transform: function transform(value) {
            return {
                male: '男性',
                female: '女性'
            }[value];
        }
    },
    expression: {
        name: '表情',
        transform: function transform(value) {
            return {
                0: '不笑',
                1: '微笑',
                2: '大笑'
            }[value];
        }
    },
    glasses: {
        name: '眼镜',
        transform: function transform(value) {
            return {
                0: '无眼镜',
                1: '普通眼镜',
                2: '墨镜'
            }[value];
        }
    }
};

// 显示人脸分析数据结果
var showScanResult = function showScanResult(data, isAll) {
    $faceDetail.empty();

    if (isAll) {
        $faceDetail.hide();

        return false;
    }

    $faceDetail.show();

    // 生成人脸数据分析
    Object.keys(FACE_PROPERTY_DICT).forEach(function (key) {
        var label = FACE_PROPERTY_DICT[key].name;
        var value = FACE_PROPERTY_DICT[key].transform(data[key]);

        // TODO 减少DOM操作次数
        $faceDetail.append((0, _jquery2.default)('<li></li>').html(label + ' : ' + value));
    });
};

var startScan = function startScan(type, imgSrc, url) {
    $jsonViewer.empty();

    // 因为不见得所有图片都包含多张人脸，所以先隐藏多人脸部分
    toggleGallery(false);

    $canvasContainer.attr('class', 'canvas-container loading');

    $faceDetail.hide().empty();

    var options = {
        success: function success(res) {
            (0, _jquery2.default)('#demo-photo-upload, #scan-photo').removeClass('disabled');
            $jsonViewer.html(JSON.stringify(res, null, '\t'));
            $canvasContainer.removeClass('loading');

            var errno = res.errno,
                msg = res.msg,
                data = res.data;


            if (errno !== 0 || !data.result_num) {
                $canvasContainer.toggleClass('error-upload-fail', errno === 107).toggleClass('error-timeout', errno === 28).toggleClass('error-image-format', errno === 106);

                $canvasContainer.toggleClass('error-no-result', !data || !data.result_num);

                $canvasContainer.empty();

                isScanning = false;

                if ([106, 107, 28, 0].indexOf(errno) === -1) {
                    new _alertModal2.default(msg);
                }

                return isScanning;
            }

            $canvasContainer.toggleClass('has-result', data.result_num >= 1);

            initGallery(imgSrc, data.result);

            if (data.result_num === 1) {
                toggleGallery(false);
                drawLandMark(data.result[0]);
                showScanResult(data.result[0], false);
            } else {
                toggleGallery(true);
                setGalleryContent(data);
                drawRect(data.result);
                showScanResult(null, true);
            }

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

    // TODO 从名字完全看不出来是要调用ajax
    (0, _demoAPI.scanFace)(options);
};

// 用户上传图片的监测
$uploadFileInput.change(function (e) {
    var $target = (0, _jquery2.default)(e.target);

    if ($target.val() === '') {
        return false;
    }

    // 如果正处于监测中，提示用户
    if (isScanning) {
        new _alertModal2.default('操作正在进行中，请稍候再试！');
        return;
    }

    isScanning = true;

    (0, _jquery2.default)('#demo-photo-upload, #scan-photo').addClass('disabled');
    var file = $target[0].files[0];

    new _demoCanvas2.default({
        selector: '#demo-result .canvas-container',
        image: file,
        type: 'stream',
        success: function success(imgSrc) {
            $uploadFileInput.val('');
            startScan('stream', imgSrc);
        },

        fail: resetDemo
    });
});

// 点击监测按键的处理
(0, _jquery2.default)('#scan-photo').click(function (e) {
    var $target = (0, _jquery2.default)(e.target);

    if (isScanning) {
        new _alertModal2.default('操作正在进行中，请稍候再试！');
        return;
    }

    if ($target.hasClass('disabled') || !$demoPhotoUrl.val()) {
        return;
    }

    isScanning = true;

    (0, _jquery2.default)('#demo-photo-upload, #scan-photo').addClass('disabled');
    var url = $demoPhotoUrl.val();

    new _demoCanvas2.default({
        selector: '#demo-result .canvas-container',
        image: url,
        type: 'url',
        apiType: 'face',
        success: function success(imgSrc) {
            startScan('url', imgSrc, url);
        },

        fail: resetDemo
    });
});

// 阻止多次上传 TODO 通过disabled属性控制
(0, _jquery2.default)('#demo-photo-upload').click(function () {
    if ((0, _jquery2.default)(this).hasClass('disabled')) {
        return false;
    }
});

// FIXME bug
var $demoImgContainer = (0, _jquery2.default)('.demo-card-list > li');
$demoImgContainer.each(function (index, element) {
    (0, _jquery2.default)(element).find('img').attr('src', '' + demoImagePaths[index]);
});

// 绑定实例图点击事件
$demoImgContainer.click(function (e) {
    var $target = (0, _jquery2.default)(e.target);

    if (isScanning) {
        new _alertModal2.default('操作正在进行中，请稍候再试！');
        return;
    }

    if ($target.hasClass('active')) {
        return;
    }

    isScanning = true;

    $target.addClass('active').siblings().removeClass('active');

    var url = '' + window.location.protocol + (0, _jquery2.default)(this).find('img').attr('src');

    (0, _jquery2.default)('#demo-photo-upload, #scan-photo').addClass('disabled');

    new _demoCanvas2.default({
        selector: '#demo-result .canvas-container',
        image: url,
        type: 'url',
        success: function success(imgSrc) {
            startScan('url', imgSrc, url);
        },

        fail: resetDemo
    });
});

// 多人脸展示窗点击处理
$multiFaceGallery.on('click', 'li', function (e) {
    var $target = (0, _jquery2.default)(e.target);

    if ($target.hasClass('active')) {
        return;
    }

    $target.addClass('active').siblings().removeClass('active');

    var faceData = $target.data('face');
    var isAll = $target.data('isAll');

    new _demoCanvas2.default({
        selector: '#demo-result .canvas-container',
        image: (0, _jquery2.default)(this).find('img').attr('src'),
        toCheck: false,
        // scale: isAll ? 1 : 2,
        success: function success() {
            if (isAll) {
                drawRect(faceData);
            } else {
                drawLandMark(faceData, true);
            }

            showScanResult(faceData, isAll);
        },

        fail: resetDemo
    });
});

// 触发初始化效果
$demoImgContainer.eq(0).click();

/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
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

var _demoAPI = __webpack_require__(8);

var _alertModal = __webpack_require__(7);

var _alertModal2 = _interopRequireDefault(_alertModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable */
var notFoundImg = __webpack_require__(34);
var formatImg = __webpack_require__(33);
var tooLargeImg = __webpack_require__(35);
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
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "../../view/face-detect.html";

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = "/ai_dist/1489655127/ai_images/error/image-format.png";

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = "/ai_dist/1489655127/ai_images/error/not-found.png";

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = "/ai_dist/1489655127/ai_images/error/too-large.png";

/***/ }),
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(1);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"ai-modal alert\" id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n    <header class=\"modal-header\">\n        <h3>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h3>\n        <a class=\"modal-x\"></a>\n    </header>\n    <section class=\"modal-content\">\n        <div style=\"text-align: center; color: #666;font-size: 14px;margin-bottom: 20px;\">\n            "
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n        </div>\n        <div style=\"text-align: center;\">\n            <button type=\"button\" class=\"btn-normal cancel\">确定</button>\n        </div>\n    </section>\n</div>\n";
},"useData":true});

/***/ }),
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(21);


/***/ })
],[62]);