/**
 * @file: brain.js
 * ver: 1.0
 * update: 2016/05/10
 */

(function () {
    $('[data-anim]').each(function (index, elem) {
        elem = $(elem);
        var delay = parseInt(elem.data('anim-delay'), 10) || 0;
        elem.addClass(elem.data('anim')).css({
            animationPlayState: 'paused'
        });
        setTimeout(function () {
            elem.css({
                animationPlayState: ''
            });
        }, delay * 1000);
    });

    $.get('./news?action=list&pn=0&rn=9999999', undefined, undefined, 'json')
        .then(function (d) {
            var dom = $('.add-news');
            var length = d.data.length;
            d.data = d.data.slice(0, 3);
            d.data.forEach(function (item) {
                dom.append(
                    '<a target="_blank" href="'
                    + './news?action=detail&id=' + item['id']
                    + '" title="' + item['title']
                    + '"><span class="js-content-item">'
                    + (item['title'].length > 20 ? item['title'].substring(0, 20) + '...' : item['title'])
                    + '[' + transformTime(1000 * item['time']) + ']</span></a>'
                );
            });

            dom.append('<a target="_blank" href="'
            + './news'
            + '"><span class="js-content-item">'
            + '更多>'
            + '</span></a>')
        });


    function transformTime(time) {
        var t = new Date(),
            year, month, date;
        t.setTime(time);
        year = t.getFullYear();
        month = t.getMonth() + 1;
        month = month < 10 ? ('0' + month) : month;
        date = t.getDate();
        date = date < 10 ? ('0' + date) : date;
        return [year, month, date].join('-');
    }

    var modal = Modal();
    var fragment = '<div class="modal-head">订阅百度大脑最新消息<span class="x"></span></div>' +
        '<div style="margin-top: 20px">' +
        '<div class="modal-form"><form class="frm">' +
        '<table style="width: 100%; line-height: 30px; font-size: 14px;">' +
        '<tr><td style="text-align: right; width: 106px">姓名</td><td  style="padding-left: 20px"><input type="text" name="name"/></td></tr>' +
        '<tr><td style="text-align: right; width: 106px">性别</td><td  style="padding-left: 20px"><label style="margin-right: 20px"><input checked type="radio" value="1" name="sex"/><span>先生</span></label><label><input type="radio" value="2" name="sex"/><span>女士</span></label></td></tr>' +
        '<tr><td style="text-align: right; width: 106px">邮箱</td><td  style="padding-left: 20px"><input type="text" name="email"/></td></tr>' +
        '</table><p class="error"></p>' +
        '<div style="text-align: center;position: relative;left: 7px;">' +
        '<input type="submit" class="sub" value="提交"/>' +
        '<span class="cancel">取消</span>' +
        '</div>' +
        '</form></div>' +
        '<div class="modal-loading">提示正在提交...........</div>' +
        '<div class="modal-success"></div>' +
        '<div class="modal-error"><span class="back">返回</span></div>' +
        '</div>';

    $(document.body).on('click', '.subscribe', function (e) {
        e.preventDefault();
        modal.container.html(fragment);
        modal.open();
    });

    $(document.body).on('click', '.cancel', function (e) {
        e.preventDefault();
        modal.close();
    });

    $(document.body).on('click', '.x', function (e) {
        e.preventDefault();
        modal.close();
    });

    $(document.body).on('click', '.back', function (e) {
        e.preventDefault();
        modal.close();
    });

    $(document.body).on('submit', '.frm', function (e) {
        e.preventDefault();
        var url = './subscribe';
        var arr = $(this).serializeArray();
        var $error = $('.error');
        var isPass = 1;
        var test = [
            {
                tester: function (val) {
                    if (!val)
                        return false;
                    return /^[\u4e00-\u9fa5a-zA-Z]+$/.test(val);
                },
                err: '请输入姓名'
            },
            {
                tester: function (val) {
                    return true;
                },
                err: ''
            },
            {
                tester: function (val) {
                    return /\S+@\S+\.\S+/.test(val);
                },
                err: '请输入正确的邮箱地址'
            }
        ];
        var testName = {
                tester: function (val) {
                    return /[\\ ,\\.,\\`,\\~,\\!,\\@,\\#,\\$,\\%,\\^,\\+,\\*,\\&,\\\\,\\\/,\\?,\\|,\\:,\\.,\\,\\{,\\},\\(,\\),\\'',\\;,\\=,\"\\-]/.test(val);
                },
                err: '姓名不支持输入特殊字符'
            };
        for (var i = 0,len = arr.length; i < len; i++) {
            if (!test[i].tester(arr[i].value)) {
                $error.html(test[i].err);
                isPass = 0;
                break;
            }
        }
        if (testName.tester(arr[0].value)) {
            $error.html(testName.err);
            isPass = 0;
        }
        if (isPass === 1) {
            $.ajax({
                url: url,
                method: 'post',
                data: arr,
                dataType: 'json',
                beforeSend: function () {
                    $('.modal-form').hide();
                    $('.modal-loading').show();
                },
                success: function (response) {
                    $('.modal-loading').hide();
                    if (response.errno === 0) {
                        $('.modal-error').hide();
                        $('.modal-success').show();
                    } else {
                        $('.modal-success').hide();
                        $('.modal-error').show();
                    }
                }
            });
        }
    });

})();

function Modal() {
    if (!Modal.container) {
        Modal.container = $(
            '<div style="position: fixed; left: 0; top: 0; width: 100%; height: 100%; display: none">' +
            '<div class="modal-bg" style="position: absolute;width: 100%; height: 100%;top: 0; left: 0;">' +
            '</div>' +
            '<div class="modal-content"></div>' +
            '</div>');
        $(document.body).append(Modal.container);
    }
    var container = Modal.container;
    return {
        container: Modal.container.find('.modal-content'),
        open: function () {
            container.show();
        },
        close: function () {
            container.hide();
        }
    }
}
