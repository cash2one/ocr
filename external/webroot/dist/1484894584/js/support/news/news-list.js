duAI([26],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(110);


/***/ },

/***/ 110:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _jquery = __webpack_require__(18);

	var _jquery2 = _interopRequireDefault(_jquery);

	__webpack_require__(111);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable */
	var countPerPage = 10;
	var page = (0, _jquery2.default)('.pg').page({ pageNum: countPerPage });

	var url = './news?action=list&pn=0&rn=9999999';
	var dom = (0, _jquery2.default)('#news-container');

	_jquery2.default.get(url, undefined, undefined, 'json').then(function (d) {
	    return d.data.map(function (item) {
	        return {
	            title: item.title,
	            desc: item.abs,
	            time: transformTime(parseInt(item.time, 10) * 1000),
	            href: './news?action=detail&id=' + item.id
	        };
	    });
	}, function () {
	    return [];
	}).always(function (d) {
	    // 不管返回多少，只取10条
	    r(d.slice(0, countPerPage));

	    page.onChange(function (o) {
	        r(d.slice(o.index * countPerPage, o.index * countPerPage + countPerPage));
	        document.documentElement.scrollTop = 0;
	    });

	    page(d.length);
	});

	function r(d) {
	    var s = [];

	    d.forEach(function (_ref) {
	        var title = _ref.title,
	            desc = _ref.desc,
	            time = _ref.time,
	            href = _ref.href;

	        var articleHTML = ['<div class="news-list">', '    <a href=' + href + '>', '        <h2 class="block-title">' + title + '<span class="time">' + time + '</span></h2>', '    </a>', '    <p>' + desc + '</p>', '</div>'].join('\r');

	        s.push(articleHTML);
	    });

	    // 填充新闻列表
	    dom.html(s.join('\r'));
	}

	function transformTime(time) {
	    var t = new Date();
	    t.setTime(time);
	    var year = t.getFullYear();
	    var month = t.getMonth() + 1;
	    month = month < 10 ? '0' + month : month;
	    var date = t.getDate();
	    date = date < 10 ? '0' + date : date;

	    return [year, month, date].join('-');
	}
	/* eslint-enable */

/***/ },

/***/ 111:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _jquery = __webpack_require__(18);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_jquery2.default.extend(_jquery2.default.fn, {
	    page: function page(options) {
	        var total;
	        var pageNum = options.pageNum || 10;
	        var now = 0;
	        var cbs = [];
	        var me = this;

	        me.on('click', '.prev', function () {
	            if (now > 0) {
	                now--;
	            }
	            rWithEvent();
	        });

	        me.on('click', '.next', function () {
	            var pc = pageCount(total, pageNum);
	            if (now < pc - 1) {
	                now++;
	            }
	            rWithEvent();
	        });

	        me.on('click', '.page-num', function () {
	            var i = (0, _jquery2.default)(this).data('index');
	            now = ~~i;
	            rWithEvent();
	        });

	        me.on('click', '.first', function () {
	            now = 0;
	            rWithEvent();
	        });

	        me.on('click', '.last', function () {
	            now = pageCount(total, pageNum) - 1;
	            rWithEvent();
	        });

	        me.on('click', '.page-tip', function () {
	            var pan = (0, _jquery2.default)('.pan', me);
	            if (pan.children().length) {
	                pan.empty();
	                return;
	            }
	            panel(pan, [10, 20, 50], function (d) {
	                pageNum = d;
	                now = 0;
	                rWithEvent();
	            });
	        });

	        me.on('submit', '.sl-index', function (e) {
	            e.preventDefault();
	            var val = parseInt((0, _jquery2.default)(this).find('input').val(), 10);
	            if (isNaN(val)) {
	                val = 0;
	            }
	            if (val < 1) {
	                val = 1;
	            }
	            if (val > pageCount(total, pageNum)) {
	                val = pageCount(total, pageNum);
	            }
	            now = val - 1;
	            rWithEvent();
	        });

	        function r() {
	            var t = '<div class="cfx" style="text-align: center">';
	            t += r1();
	            t += r3();
	            // t += r2();
	            t += '</div>';
	            me.html(t);
	        }

	        function r1() {
	            var t = '<div class="page" style="display: inline-block; vertical-align: middle">'
	            // + '<span class="pg-func first'
	            // + (now === 0 ? ' disabled' : '')
	            // + '">|&lt;</span>'
	            + '<span class="pg-func prev' + (now === 0 ? ' disabled' : '') + '">上一页</span>';

	            var pc = pageCount(total, pageNum);
	            for (var i = 0; i < pc; i++) {
	                if (i === now - 3 && i > 0) {
	                    t += '<span>...</span>';
	                }
	                if (i < now + 3 && i > now - 3 || i === pc - 1 || i === 0) {
	                    t += '<span class="page-num' + (i === now ? ' pg-on' : '') + '" data-index="' + i + '">' + (i + 1) + '</span>';
	                }

	                if (i === now + 3 && i < pc - 1) {
	                    t += '<span>...</span>';
	                }
	            }
	            t += '<span class="pg-func next' + (now === pc - 1 ? ' disabled' : '') + '">下一页</span>'
	            // + '<span class="pg-func last'
	            // + (now === pc - 1 ? ' disabled' : '')
	            // + '">&gt;|</span>'
	            + '</div>';
	            return t;
	        }

	        function r2() {
	            var t = '<div class="pg-lt">' + '<span style="margin-right: 20px">共有' + total + '条</span>' + '<span>每页显示' + '<span style="margin-left: 10px; position: relative">' + '<span class="page-tip dw-arw">' + pageNum + '</span>' + '<i class="pan" style="width: 100%;text-indent: 10px;' + 'position: absolute; top: 30px ;left: 0;"></i>' + '</span>' + '</span>' + '</div>';
	            return t;
	        }

	        function r3() {
	            var t = '<div style="display: inline-block; vertical-align: middle">' + '<span style="margin-left: 20px"><form style="display: inline-block" class="sl-index" >' + '去第<input style="text-align: center; margin:0 10px;width: 30px;height: 20px;color: #333333;" ' + 'type="text" value="' + (now + 1) + '"/>页</form></span>' + '</div>';
	            return t;
	        }

	        function pageCount(total, pageNum) {
	            return ~~((total - 0.1) / pageNum) + 1;
	        }

	        function rWithEvent() {
	            r();
	            cbs.forEach(function (cb) {
	                cb({
	                    pageNum: pageNum,
	                    index: now
	                });
	            });
	        }

	        function ret(iTotal) {
	            total = iTotal;
	            now = 0;
	            r();
	        }

	        ret.onChange = function (cb) {
	            cbs.push(cb);
	        };
	        Object.defineProperties(ret, {
	            pageNum: {
	                get: function get() {
	                    return pageNum;
	                }
	            },
	            index: {
	                get: function get() {
	                    return now;
	                }
	            }
	        });
	        return ret;
	    }
	}); /* eslint-disable */


	function panel(el, arr, cb) {
	    var s = '<ul class="pn">';
	    arr.forEach(function (x) {
	        s += '<li data-l="' + x + '">' + x + '</li>';
	    });
	    s += '</ul>';
	    el.html(s);
	    el.find('li').on('click', function () {
	        cb((0, _jquery2.default)(this).data('l'));
	    });
	}
	/* eslint-enable */

/***/ }

});