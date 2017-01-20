duAI([46],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(246);


/***/ },

/***/ 246:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @file nlp-短文本相似度脚本入口
	 * @author shiliang@baidu.com
	 */
	'use strict';

	var _jquery = __webpack_require__(18);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _simnetData = __webpack_require__(247);

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
	        (0, _jquery2.default)(this).find('.intro-demo').addClass('scanned');
	    });

	    // 刷新demo
	    var demoCounter = 0;
	    var maxScore = 0;
	    (0, _jquery2.default)('.refresh-demo').click(function () {
	        maxScore = 0;
	        var demoData = _simnetData.SIMNET_DATA[demoCounter++ % _simnetData.SIMNET_DATA.length];
	        (0, _jquery2.default)('.demo-input').html(demoData.text);
	        var options = [];
	        for (var word in demoData.options) {
	            var html = ['<li>', '<a role="button" data-score="' + demoData.options[word] + '" class="btn-normal">', word, '</a>', '</li>'].join('');
	            maxScore = demoData.options[word] > maxScore ? demoData.options[word] : maxScore;
	            options.push((0, _jquery2.default)(html));
	        }
	        (0, _jquery2.default)('#demo-options').html(options).find('a.btn-normal').eq(0).click();
	    });

	    // demo选项切换
	    (0, _jquery2.default)('#demo-options').on('click', 'a.btn-normal', function () {
	        (0, _jquery2.default)('#demo-options .btn-normal').removeClass('selected');
	        var option = (0, _jquery2.default)(this);
	        option.addClass('selected');
	        var score = parseFloat(option.attr('data-score'));
	        (0, _jquery2.default)('.demo-score-detail').html(score).toggleClass('good', maxScore === score).toggleClass('bad', maxScore !== score);
	    });

	    (0, _jquery2.default)('.refresh-demo').click();
	});

/***/ },

/***/ 247:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * @file nlp-短文本相似度数据
	 * @author shiliang@baidu.com
	 */
	var SIMNET_DATA = exports.SIMNET_DATA = [{
	    text: '车头如何放置车牌',
	    options: {
	        '前牌照怎么装': 0.761517,
	        '如何办理北京车牌': 0.486205,
	        '后牌照怎么装': 0.697181
	    }
	}, {
	    text: '信号忽强忽弱',
	    options: {
	        '信号忽高忽低': 0.949734,
	        '信号忽左忽右': 0.914491,
	        '信号忽然中断': 0.695907
	    }
	}, {
	    text: '如何学好深度学习',
	    options: {
	        '深入学习习近平讲话材料': 0.312354,
	        '机器学习教程': 0.608247,
	        '人工智能教程': 0.525389
	    }
	}, {
	    text: '香蕉的翻译',
	    options: {
	        '香蕉用英文怎么说': 0.826361,
	        '香蕉怎么吃': 0.579909,
	        '桔子用英文怎么说': 0.521520
	    }
	}, {
	    text: '小儿腹泻偏方',
	    options: {
	        '宝宝拉肚子偏方': 0.903965,
	        '小儿感冒偏方': 0.740181,
	        '腹泻偏方': 0.810619
	    }
	}, {
	    text: '英雄联盟好玩吗，怎么升级',
	    options: {
	        'lol攻略': 0.589435,
	        '英雄联盟服务器升级': 0.537899,
	        '怎么打好lol': 0.664038
	    }
	}, {
	    text: '红米更新出错',
	    options: {
	        '红米升级系统出错': 0.900544,
	        '红米账户出错': 0.778519,
	        '如何买到小米手机': 0.263091
	    }
	}, {
	    text: '李彦宏是百度公司创始人',
	    options: {
	        '百度是李彦宏创办的': 0.877645,
	        '马化腾创办了腾讯公司': 0.682594,
	        '姚明是NBA的著名球星': 0.320592
	    }
	}, {
	    text: '中国有五千年的历史',
	    options: {
	        '中国是个历史悠久的国家': 0.758613,
	        '中国有很多少数民族': 0.583308,
	        '中国有13亿人口': 0.649412
	    }
	}, {
	    text: '北京成功申办了2008年奥运会',
	    options: {
	        '2008年奥运会在北京举行': 0.809656,
	        '伦敦奥运会在2012年举行': 0.532129,
	        '东京奥运会即将举办': 0.481673
	    }
	}];

/***/ }

});