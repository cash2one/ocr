duAI([0],{

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

__webpack_require__(23);

__webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
var sentences = ['2003年10月15日，杨利伟乘由长征二号F火箭运载的神舟五号飞船首次进入太空，象征着中国太空事业向前迈进一大步，起到了里程碑的作用。', '1996年，曾经是微软员工的加布·纽维尔和麦克·哈灵顿一同创建了Valve软件公司。他们在1996年下半年从id software取得了雷神之锤引擎的使用许可，用来开发半条命系列。', '谢尔盖·科罗廖夫（1907年1月12日－1966年1月14日），原苏联宇航事业的伟大设计师与组织者 ，第一枚射程超过8000公里的洲际火箭（弹道导弹）的设计者，第一颗人造地球卫星的运载火箭的设计者、第一艘载人航天飞船的总设计师。', '现在，慕尼黑再保险公司不仅是此类行动的倡议者，更是将其大量气候数据整合进保险产品中，并与公众共享大量天气信息，参与到新能源领域的保障中。'];
/* eslint-enable */

/**
 * @file 词法分析demo
 * @author Franck Chen(chenfan02@baidu.com)
 */

var segments = [[{
    block: '2003年10月15日',
    type: 't'
}, {
    block: ',',
    type: 'w'
}, {
    block: '杨利伟',
    type: 'nr'
}, {
    block: '乘',
    type: 'v'
}, {
    block: '由',
    type: 'p'
}, {
    block: '长征二号F火箭',
    type: 'nz'
}, {
    block: '运载',
    type: 'v'
}, {
    block: '的',
    type: 'u'
}, {
    block: '神舟五号',
    type: 'nz'
}, {
    block: '飞船',
    type: 'n'
}, {
    block: '首次',
    type: 'm'
}, {
    block: '进入',
    type: 'v'
}, {
    block: '太空',
    type: 's'
}, {
    block: ',',
    type: 'w'
}, {
    block: '象征',
    type: 'v'
}, {
    block: '着',
    type: 'u'
}, {
    block: '中国',
    type: 'ns'
}, {
    block: '太空',
    type: 'n'
}, {
    block: '事业',
    type: 'n'
}, {
    block: '向前',
    type: 'vd'
}, {
    block: '迈进',
    type: 'v'
}, {
    block: '一大步',
    type: 'm'
}, {
    block: ',',
    type: 'w'
}, {
    block: '起',
    type: 'v'
}, {
    block: '到',
    type: 'v'
}, {
    block: '了',
    type: 'u'
}, {
    block: '里程碑',
    type: 'n'
}, {
    block: '的',
    type: 'u'
}, {
    block: '作用',
    type: 'n'
}, {
    block: '。',
    type: 'w'
}], [{
    block: '1996年',
    type: 't'
}, {
    block: ',',
    type: 'w'
}, {
    block: '曾经',
    type: 'd'
}, {
    block: '是',
    type: 'v'
}, {
    block: '微软',
    type: 'nt'
}, {
    block: '员工',
    type: 'n'
}, {
    block: '的',
    type: 'u'
}, {
    block: '加布',
    type: 'nr'
}, {
    block: '·',
    type: 'w'
}, {
    block: '纽维尔',
    type: 'nr'
}, {
    block: '和',
    type: 'c'
}, {
    block: '麦克',
    type: 'nr'
}, {
    block: '·',
    type: 'w'
}, {
    block: '哈灵顿',
    type: 'nr'
}, {
    block: '一同',
    type: 'd'
}, {
    block: '创建',
    type: 'v'
}, {
    block: '了',
    type: 'u'
}, {
    block: 'Valve软件公司',
    type: 'nt'
}, {
    block: '。',
    type: 'w'
}, {
    block: '他们',
    type: 'r'
}, {
    block: '在',
    type: 'p'
}, {
    block: '1996年',
    type: 't'
}, {
    block: '下半年',
    type: 't'
}, {
    block: '从',
    type: 'p'
}, {
    block: 'id software',
    type: 'nt'
}, {
    block: '取得',
    type: 'v'
}, {
    block: '了',
    type: 'u'
}, {
    block: '雷神之锤引擎',
    type: 'nz'
}, {
    block: '的',
    type: 'u'
}, {
    block: '使用',
    type: 'vn'
}, {
    block: '许可',
    type: 'vn'
}, {
    block: '，',
    type: 'w'
}, {
    block: '用来',
    type: 'v'
}, {
    block: '开发',
    type: 'v'
}, {
    block: '半条命',
    type: 'nz'
}, {
    block: '系列',
    type: 'n'
}, {
    block: '。',
    type: 'w'
}], [{
    block: '谢尔盖',
    type: 'nr'
}, {
    block: '·',
    type: 'w'
}, {
    block: '科罗廖夫',
    type: 'nr'
}, {
    block: '（',
    type: 'w'
}, {
    block: '1907年1月12日',
    type: 't'
}, {
    block: '－',
    type: 'w'
}, {
    block: '1966年1月14日',
    type: 't'
}, {
    block: '）',
    type: 'w'
}, {
    block: ',',
    type: 'w'
}, {
    block: '原',
    type: 'a'
}, {
    block: '苏联',
    type: 'ns'
}, {
    block: '宇航',
    type: 'n'
}, {
    block: '事业',
    type: 'n'
}, {
    block: '的',
    type: 'u'
}, {
    block: '伟大',
    type: 'a'
}, {
    block: '设计师',
    type: 'n'
}, {
    block: '与',
    type: 'c'
}, {
    block: '组织者',
    type: 'n'
}, {
    block: ',',
    type: 'w'
}, {
    block: '第一枚',
    type: 'm'
}, {
    block: '射程',
    type: 'n'
}, {
    block: '超过',
    type: 'v'
}, {
    block: '8000公里',
    type: 'm'
}, {
    block: '的',
    type: 'u'
}, {
    block: '洲际',
    type: 'a'
}, {
    block: '火箭',
    type: 'n'
}, {
    block: '（',
    type: 'w'
}, {
    block: '弹道导弹',
    type: 'nz'
}, {
    block: '）',
    type: 'w'
}, {
    block: '的',
    type: 'u'
}, {
    block: '设计者',
    type: 'n'
}, {
    block: ',',
    type: 'w'
}, {
    block: '第一颗',
    type: 'm'
}, {
    block: '人造地球卫星',
    type: 'nz'
}, {
    block: '的',
    type: 'u'
}, {
    block: '运载火箭',
    type: 'n'
}, {
    block: '的',
    type: 'u'
}, {
    block: '设计者',
    type: 'n'
}, {
    block: '、',
    type: 'w'
}, {
    block: '第一艘',
    type: 'm'
}, {
    block: '载人航天',
    type: 'vn'
}, {
    block: '飞船',
    type: 'n'
}, {
    block: '的',
    type: 'u'
}, {
    block: '总设计师',
    type: 'n'
}, {
    block: '。',
    type: 'w'
}], [{
    block: '现在',
    type: 't'
}, {
    block: ',',
    type: 'w'
}, {
    block: '慕尼黑再保险公司',
    type: 'nt'
}, {
    block: '不仅',
    type: 'c'
}, {
    block: '是',
    type: 'v'
}, {
    block: '此类',
    type: 'r'
}, {
    block: '行动',
    type: 'n'
}, {
    block: '的',
    type: 'u'
}, {
    block: '倡议者',
    type: 'n'
}, {
    block: ',',
    type: 'w'
}, {
    block: '更',
    type: 'd'
}, {
    block: '是',
    type: 'd'
}, {
    block: '将',
    type: 'p'
}, {
    block: '其',
    type: 'r'
}, {
    block: '大量',
    type: 'a'
}, {
    block: '气候',
    type: 'n'
}, {
    block: '数据',
    type: 'n'
}, {
    block: '整合',
    type: 'v'
}, {
    block: '进',
    type: 'v'
}, {
    block: '保险',
    type: 'n'
}, {
    block: '产品',
    type: 'n'
}, {
    block: '中',
    type: 'f'
}, {
    block: ',',
    type: 'w'
}, {
    block: '并',
    type: 'c'
}, {
    block: '与',
    type: 'p'
}, {
    block: '公众',
    type: 'n'
}, {
    block: '共享',
    type: 'v'
}, {
    block: '大量',
    type: 'm'
}, {
    block: '天气',
    type: 'n'
}, {
    block: '信息',
    type: 'n'
}, {
    block: ',',
    type: 'w'
}, {
    block: '参与',
    type: 'v'
}, {
    block: '到',
    type: 'v'
}, {
    block: '新能源',
    type: 'n'
}, {
    block: '领域',
    type: 'n'
}, {
    block: '的',
    type: 'u'
}, {
    block: '保障',
    type: 'vn'
}, {
    block: '中',
    type: 'f'
}, {
    block: '。',
    type: 'w'
}]];

var termsData = [[{
    block: '2003年10月15日',
    type: 'TIME'
}, {
    block: '杨利伟',
    type: 'PER'
}, {
    block: '中国',
    type: 'LOC'
}], [{
    block: '1996年',
    type: 'TIME'
}, {
    block: '微软',
    type: 'ORG'
}, {
    block: '加布·纽维尔',
    type: 'PER'
}, {
    block: '麦克·哈灵顿',
    type: 'PER'
}, {
    block: 'Valve软件公司',
    type: 'ORG'
}, {
    block: '1996年下半年',
    type: 'TIME'
}, {
    block: 'id software',
    type: 'ORG'
}], [{
    block: '谢尔盖·科罗廖夫',
    type: 'PER'
}, {
    block: '1907年1月12日',
    type: 'TIME'
}, {
    block: '1966年1月14日',
    type: 'TIME'
}, {
    block: '苏联',
    type: 'LOC'
}], [{
    block: '现在',
    type: 'TIME'
}, {
    block: '慕尼黑再保险公司',
    type: 'ORG'
}]];

// 词性对照表
var typeNameRef = {
    t: '时间词',
    w: '标点符号',
    nr: '人名',
    v: '动词',
    p: '介词',
    nz: '其他专名',
    nt: '机构团体',
    d: '副词',
    n: '名词',
    u: '助词',
    m: '数词',
    s: '处所词',
    ns: '地名',
    vd: '副动词',
    c: '连词',
    r: '代词',
    vn: '名动词',
    a: '形容词',
    f: '方位词'
};

// 专名对应表
var termRef = {
    TIME: '时间',
    PER: '人名',
    LOC: '地名',
    ORG: '机构'
};

// 总case数
var caseCount = segments.length;
// 当前看到的是第几个case
var currentCaseNum = 0;

// jQuery对象
var $segmentation = (0, _jquery2.default)('#segmentation');
var $wordType = (0, _jquery2.default)('#word-type');
var $demoSwitch = (0, _jquery2.default)('#demo-switch');
var $demoCase = (0, _jquery2.default)('#demo-case');
var $lexerDemoTabLabel = (0, _jquery2.default)('#lexer-demo-tab');
var $lexerDemoTab = (0, _jquery2.default)('[data-tab-id]');
var $termDemoTab = (0, _jquery2.default)('.lexer-demo-term-tab');

/**
 * 绘制demo视图
 *
 * @param {number} demoNum 当前要展示的是第几个demo
 */
var paintDemo = function paintDemo(demoNum) {
    // 分词结果集合
    var segmentationArr = [];
    // 词类集合
    var wordTypeArr = [];
    // 记录已存在的分类 TODO，使用set类型优化
    var existType = [];
    // 已存在的term
    var existTerm = [];

    // 填充case文字
    $demoCase.text(sentences[demoNum]);

    // 填充词性识别
    segments[demoNum].forEach(function (_ref) {
        var type = _ref.type,
            block = _ref.block;

        // 分词模板
        var segmentationHTML = '<div class="lexer-demo-block" data-word-type="' + type + '">' + block + '</div>';

        if (existType.indexOf(type) < 0) {
            existType.push(type);

            /* eslint-disable */
            // 词性模板
            var wordTypeHTML = ['<div class="lexer-demo-block word-type" data-word-type="' + type + '">', '    ' + typeNameRef[type], '</div>'].join('\r');
            /* eslint-enable */
            wordTypeArr.push(wordTypeHTML);
        }

        segmentationArr.push(segmentationHTML);
    });

    // 生成DOM
    $segmentation.html(segmentationArr.join('\r'));
    $wordType.html(wordTypeArr.join('\r'));

    // 绑定词性识别相关事件
    $wordType.find('.word-type').on('click', function (_ref2) {
        var target = _ref2.target;

        var $target = (0, _jquery2.default)(target);
        var wordType = $target.attr('data-word-type');

        $target.siblings().removeClass('selected').end().addClass('selected');

        // 复合词性的词随动
        $segmentation.children().removeClass('selected').end().find('[data-word-type="' + wordType + '"]').addClass('selected');
    });

    $segmentation.find('.lexer-demo-block').on('click', function (_ref3) {
        var target = _ref3.target;

        var $target = (0, _jquery2.default)(target);

        // 已经选中的点击无效
        if ($target.hasClass('selected')) {
            return;
        }

        var wordType = $target.attr('data-word-type');
        $target.siblings().removeClass('selected').end().addClass('selected');

        $wordType.children().removeClass('selected').end().find('[data-word-type="' + wordType + '"]').addClass('selected');
    });

    var termTmp = {};
    // 填充专业名词
    termsData[demoNum].forEach(function (_ref4) {
        var type = _ref4.type,
            block = _ref4.block;

        if (existTerm.indexOf(type) < 0) {
            existTerm.push(type);

            // 每个名字种类创建一个数组
            termTmp[type] = [];
        }

        // 专业名次入数据结构中
        termTmp[type].push(block);
    });

    var termTabContentHTML = [];

    // 拼接术语HTML
    Object.keys(termTmp).forEach(function (termNameEng) {
        // 顺序生成分词html完成拼接
        var blocks = termTmp[termNameEng].map(function (block) {
            return '<div class="lexer-demo-block">' + block + '</div>';
        }).join('\r');

        // 一个术语块
        var termHTML = ['<div class="lexer-demo-term">', '    <div class="lexer-demo-left-side">', '        <div class="lexer-demo-term-name">' + termRef[termNameEng] + '</div>', '        <div class="lexer-demo-term-name-eng">' + termNameEng + '</div>', '    </div>', '    <div class="lexer-demo-term-box">', '        ' + blocks, '    </div>', '</div>'].join('\r');

        termTabContentHTML.push(termHTML);
    });

    // 填充专业名词部分
    $termDemoTab.html(termTabContentHTML.join('\r'));
};

// 切换tab
$lexerDemoTabLabel.find('.lexer-demo-tab-label').on('click', function (_ref5) {
    var target = _ref5.target;

    var $target = (0, _jquery2.default)(target);

    $target.addClass('label-selected').siblings().removeClass('label-selected');

    var tabTarget = $target.attr('data-tab-for');

    $lexerDemoTab.removeClass('tab-show').filter('[data-tab-id="' + tabTarget + '"]').addClass('tab-show');
});

// 切换demo
$demoSwitch.on('click', function () {
    var nextCaseNum = currentCaseNum + 1;

    if (nextCaseNum >= caseCount) {
        nextCaseNum = 0;
    }

    paintDemo(nextCaseNum);

    currentCaseNum = nextCaseNum;
});

// 首屏
paintDemo(currentCaseNum);

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

/***/ }),

/***/ 20:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./../../view/nlp-lexical.html";

/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ })

},[50]);