duAI([0],{

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _lodash = __webpack_require__(8);

var _lodash2 = _interopRequireDefault(_lodash);

__webpack_require__(18);

__webpack_require__(23);

var _getBase64ByFileReader = __webpack_require__(19);

var _getBase64ByFileReader2 = _interopRequireDefault(_getBase64ByFileReader);

__webpack_require__(28);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
var formatImg = __webpack_require__(24); /**
                                                                       * @file ocr-生僻字识别脚本入口
                                                                       * @author chenweiwei01@baidu.com
                                                                       *         FranckChen(chenfan02@baidu.com)
                                                                       */

var tooLargeImg = __webpack_require__(27);
var noResult = __webpack_require__(25);
var timeoutImg = __webpack_require__(26);

// fixme 很不合理
/* eslint-enable */

var $window = (0, _jquery2.default)(window);
var $document = (0, _jquery2.default)(document);
// Demo实例图片
var $techDemoSelect = (0, _jquery2.default)('.tech-demo-card-item');
// 结果json展示容器
var $jsonViewer = (0, _jquery2.default)('#demo-json').find('> p');
// 识别结果容器
var $demoResult = (0, _jquery2.default)('#demo-result');
var $fileUpload = (0, _jquery2.default)('#img-upload');
// 检查按键(点击后扫描url中的图片)
var $scanUrlBtn = (0, _jquery2.default)('#scan-url');
// 使用url上传图片
var $scanPhotoUrl = (0, _jquery2.default)('#demo-photo-url');

// 常量
var FILE_TYPE_ERROR = 1;
var FILE_OVER_SIZE = 2;

var isScanning = false;

$window.on('scroll.demo', (0, _lodash2.default)(function () {
    if ($document.scrollTop() >= 100) {
        playDemo();

        $window.off('.demo');
    }
}, 300));

// 功能介绍动画
var playDemo = function playDemo() {
    var $techFunctionDemoOrigin = (0, _jquery2.default)('.tech-function-original-card');
    var $techFunctionDemoResult = (0, _jquery2.default)('.tech-function-scan-result');

    $techFunctionDemoOrigin.addClass('tech-function-scanning');

    setTimeout(function () {
        $techFunctionDemoOrigin.removeClass('tech-function-scanning').addClass('tech-function-scanned');
        $techFunctionDemoResult.addClass('tech-function-scanned');
    }, 3000);
};

/**
 * 填充JSON预览内容
 *
 * @param {string=} text 内容
 */
var setJsonViewer = function setJsonViewer() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    $jsonViewer.text(text);
};

// 显示demo图片
var showImage = function showImage(imgUrl) {
    var demoOrigin = (0, _jquery2.default)('#demo-origin');

    demoOrigin.html('<img class="tech-demo-origin-img" src="' + imgUrl + '">');
};

var showLoading = function showLoading() {
    $demoResult.html('<div id="result-loading"></div>');
};

/**
 * 展示识别结果
 *
 * @param {Object=} data 文字识别接口返回的数据
 */
var showResult = function showResult(data) {
    if (!data) {
        $demoResult.html('');

        return;
    }

    var wordsResult = data.words_result || [];

    var htmlArr = [];

    for (var i = 0, len = wordsResult.length; i < len; i++) {
        var record = wordsResult[i];
        var location = record.location;

        var template = ['<tr>', '    <td>' + (i + 1) + '</td>', '    <td>' + record.words + '</td>', '</tr>'];

        htmlArr.push(template.join('\r'));
    }

    var tableHtml = htmlArr.length > 0 ? ['<div id="json-table">', '<table cellspacing="0">', '    <thead>', '        <tr>', '            <th class="result-index">编号</th>', '            <th class="result-connent">识别结果</th>', '        </tr>', '    </thead>', '    <tbody>' + htmlArr.join('\r') + '</tbody>', '</table>', '</div>'].join('\r') : '<img src="' + noResult + '">';

    $demoResult.html(tableHtml);
};

/**
 * 报告错误结果
 *
 * @param {number=} errno 错误码
 */
var showError = function showError(errno) {
    showResult();
    setJsonViewer('');

    if (!errno) {
        showImage(formatImg);

        return;
    }

    switch (errno) {
        // 图片格式错误
        case 104:
        case FILE_TYPE_ERROR:
            showImage(formatImg);

            return;
        case FILE_OVER_SIZE:
            showImage(tooLargeImg);

            return;
        // 接口超时
        // 上传失败
        case 107:
        case 28:
        default:
            showImage(formatImg);

            return;
    }
};

/**
 * 通过提交图片url的方式扫描生僻字
 *
 * @param {string} imageUrl 图片地址
 * @param {string=} base64 图片base64
 * @return {Promise}
 */
var scan = function scan(imageUrl, base64) {
    /* eslint-disable */
    var dfd = _jquery2.default.Deferred();
    /* eslint-enable */

    // 屏蔽扫面
    isScanning = true;

    showImage(imageUrl || base64);
    showLoading();
    setJsonViewer('');

    // 按键置灰
    $scanUrlBtn.prop('disabled', true);
    $fileUpload.prop('disabled', true);

    // 不能一次提供两个参数
    if (imageUrl && base64) {
        dfd.reject();
    }

    _jquery2.default.post({
        url: '/aidemo',
        data: {
            'type': 'general_enhanced',
            'image': base64,
            'image_url': imageUrl
        }
    }).then(function (_ref) {
        var errno = _ref.errno,
            msg = _ref.msg,
            data = _ref.data;

        isScanning = false;

        $scanUrlBtn.prop('disabled', false);
        $fileUpload.prop('disabled', false);

        // 无误的情况下返回文字识别结果JSON
        if (errno === 0) {
            dfd.resolve(data);

            return;
        }

        dfd.reject(errno, msg);
    }, function () {
        isScanning = false;

        $scanUrlBtn.prop('disabled', false);
        $fileUpload.prop('disabled', false);

        dfd.reject(28, '网络错误');
    });

    return dfd.promise();
};

/**
 * 填充demo展示区，主要是2处内容 -- 核心数据、原始json返回
 *
 * @param {string=} JSONData JSON数据
 */
var showDemoResult = function showDemoResult(JSONData) {
    // 格式化JSON
    setJsonViewer(JSONData ? JSON.stringify(JSONData, null, '\t') : '');
    // 显示识别结果
    showResult(JSONData);
};

/**
 * 校验图片文件是否符合demo要求
 *
 * @param {File} file 文件
 * @return {Object}
 */
var validateImgFile = function validateImgFile(file) {
    var validMIMEType = ['image/jpeg', 'image/png', 'image/bmp'];

    var type = file.type,
        size = file.size;


    if (validMIMEType.indexOf(type) < 0) {
        return {
            isValid: false,
            reason: FILE_TYPE_ERROR
        };
    }

    if (size > 2 * 1024 * 1024) {
        return {
            isValid: false,
            reason: FILE_OVER_SIZE
        };
    }

    return {
        isValid: true
    };
};

// fixme
// 实例图片点击点击
$techDemoSelect.on('click', function (e) {
    var $currentTarget = (0, _jquery2.default)(e.currentTarget);

    if ($currentTarget.hasClass('tech-demo-card-active') || isScanning) {
        return;
    }

    $currentTarget.addClass('tech-demo-card-active').siblings().removeClass('tech-demo-card-active');

    // TODO demo结构不合理
    var demoUrl = '' + window.location.protocol + $currentTarget.find('img').eq(0).attr('src');

    scan(demoUrl).then(function (data) {
        showDemoResult(data);
    }, showError);
});

$scanUrlBtn.on('click', function () {
    // 用户输入的url
    var demoUrl = $scanPhotoUrl.val().trim();

    if (!demoUrl) {
        return;
    }

    scan(demoUrl).then(function (data) {
        showDemoResult(data);
    }, showError);
});

// 用户上传图片时
$fileUpload.on('change', function (e) {
    if (!(0, _jquery2.default)(e.target).val()) {
        return;
    }

    var imgFile = e.target.files[0];

    // 上传前在本地校验图片
    var validateResult = validateImgFile(imgFile);

    if (!validateResult.isValid) {
        switch (validateResult.reason) {
            case FILE_TYPE_ERROR:
                showError(FILE_TYPE_ERROR);
                return;
            case FILE_OVER_SIZE:
                showError(FILE_OVER_SIZE);
                return;
        }
    }

    (0, _getBase64ByFileReader2.default)(imgFile).then(function (base64) {
        // TODO 没设计好,promise没串起来
        scan('', base64).then(function (data) {
            showDemoResult(data);
        }, showError);
    }, showError);
});

// 页面加载后，分析第一张demo图片
var firstImg = '' + window.location.protocol + $techDemoSelect.eq(0).find('img').attr('src');

scan(firstImg).then(function (data) {
    showDemoResult(data);
}, showError);

/***/ }),

/***/ 18:
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

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (imageFile) {
    var dfd = _jquery2.default.Deferred();
    var reader = new FileReader();

    reader.readAsDataURL(imageFile);

    reader.onload = function (e) {
        dfd.resolve(e.target.result);
    };

    reader.onerror = dfd.reject;

    return dfd.promise();
};

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 24:
/***/ (function(module, exports) {

module.exports = "/ai_dist/1495804556/ai_images/error/image-format.png";

/***/ }),

/***/ 25:
/***/ (function(module, exports) {

module.exports = "/ai_dist/1495804556/ai_images/error/no-general-result.png";

/***/ }),

/***/ 26:
/***/ (function(module, exports) {

module.exports = "/ai_dist/1495804556/ai_images/error/timeout.png";

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

module.exports = "/ai_dist/1495804556/ai_images/error/too-large.png";

/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./../../template/cloud/ocr-general_enhanced.html";

/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ })

},[54]);
//# sourceMappingURL=ocr-general_enhanced.js.map