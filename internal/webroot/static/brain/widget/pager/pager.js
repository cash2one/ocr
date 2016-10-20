define('brain:widget/pager/pager.js', function(require, exports, module){

var $ = window.jQuery;
$.extend($.fn, {
    page: function (options) {
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
            var i = $(this).data('index');
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
            var pan = $('.pan', me);
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
            var val = parseInt($(this).find('input').val(), 10);
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
                + '<span class="pg-func prev'
                + (now === 0 ? ' disabled' : '')
                + '">上一页</span>';

            var pc = pageCount(total, pageNum);
            for (var i = 0; i < pc; i++) {
                if (i === now - 3 && i > 0) {
                    t += '<span>...</span>';
                }
                if (i < now + 3 && i > now - 3 || i === pc - 1 || i === 0) {
                    t += '<span class="page-num'
                    + (i === now ? ' pg-on' : '')
                    + '" data-index="'
                    + i
                    + '">'
                    + (i + 1)
                    + '</span>';
                }

                if (i === now + 3 && i < pc - 1) {
                    t += '<span>...</span>';
                }
            }
            t += '<span class="pg-func next'
            + (now === pc - 1 ? ' disabled' : '')
            + '">下一页</span>'
                // + '<span class="pg-func last'
                // + (now === pc - 1 ? ' disabled' : '')
                // + '">&gt;|</span>'
            + '</div>';
            return t;
        }

        function r2() {
            var t = '<div class="pg-lt">'
                + '<span style="margin-right: 20px">共有' + total + '条</span>'
                + '<span>每页显示'
                + '<span style="margin-left: 10px; position: relative">'
                + '<span class="page-tip dw-arw">'
                + pageNum
                + '</span>'
                + '<i class="pan" style="width: 100%;text-indent: 10px;'
                + 'position: absolute; top: 30px ;left: 0;"></i>'
                + '</span>'
                + '</span>'
                + '</div>';
            return t;
        }

        function r3() {
            var t = '<div style="display: inline-block; vertical-align: middle">'
                + '<span style="margin-left: 20px"><form style="display: inline-block" class="sl-index" >'
                + '去第<input style="text-align: center; margin:0 10px;width: 32px;height: 32px;color: #646B7D;" '
                + 'type="text" value="' + (now + 1) + '"/>页</form></span>'
                + '</div>';
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
                get: function () {
                    return pageNum;
                }
            },
            index: {
                get: function () {
                    return now;
                }
            }
        });
        return ret;
    }
});

function panel(el, arr, cb) {
    var s = '<ul class="pn">';
    arr.forEach(function (x) {
        s += '<li data-l="'
        + x
        + '">'
        + x
        + '</li>';
    });
    s += '</ul>';
    el.html(s);
    el.find('li')
        .on('click', function () {
            cb($(this).data('l'));
        });
}

});