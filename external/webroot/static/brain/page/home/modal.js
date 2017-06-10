/**
 * @file: brain.js
 * ver: 1.0
 * update: 2016/05/10
 */

(function () {
    var modal = Modal();
    var fragment = '<div class="modal-head">订阅百度大脑最新消息<span class="x"></span></div>'
        + '<div style="margin-top: 20px" class="modal-form">'
        + '<td class="modal-form"><form class="frm">'
        + '<table style="width: 100%; font-size: 14px;line-height: 40px;">'
        + '<tr><td style="text-align: right; width: 106px">姓名</td><td  style="padding-left: 20px"><input type="text" name="name"/></td></tr>'
        + '<tr><td style="text-align: right; width: 106px">性别</td><td  style="padding-left: 20px"><label style="margin-right: 20px"><input checked type="radio" value="1" name="sex"/><span>先生</span></label><label><input type="radio" value="2" name="sex"/><span>女士</span></label></td></tr>'
        + '<tr><td style="text-align: right; width: 106px">邮箱</td><td  style="padding-left: 20px"><input type="text" name="email"/></td></tr>'
        + '<tr><td style="text-align: right; width: 106px">验证码</td>'
        + '<td  style="padding-left: 20px" class="qr-code-input">'
        + '<input type="text" maxlength="4"  style="width:60px !important" name="code">'
        + '<a style="margin-right: 45%;"><img alt="点击刷新验证码" style="margin-top:2px"  src="/index/seccode?action=show"></a>'
        + '</td></tr>'
        + '</table><p class="error"></p>'
        + '<div style="text-align: center;position: relative;left: 7px;">'
        + '<input type="submit" class="sub" value="提交"/>'
        + '<span class="cancel">取消</span>'
        + '</div>'
        + '</form></div>'
        + '<div class="modal-loading">正在提交...........</div>'
        + '<div class="modal-success"></div>'
        + '<div class="modal-error"><span class="back">返回</span></div>'
        + '</div>';

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

    $(document.body).on('click', '.get-qr-code', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.get-qr-code > img').show();
    });

    $(document.body).on('click', function (e) {
        $('.get-qr-code > img').hide();
    });

    $(document.body).on('submit', '.frm', function (e) {
        e.preventDefault();
        var url = '/index/subscribe';
        var arr = $(this).serializeArray();
        var $error = $('.error');
        var isPass = 1;
        var test = [
            {
                tester: function (val) {
                    if (!val) {
                        return false;
                    }
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
        for (var i = 0, len = arr.length - 1; i < len; i++) {
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
            $.post('/index/seccode', {
                action: 'check',
                code: arr[3].value
            }, 'json').success(function (res) {
                if (res.errno !== 0) {
                    $error.html('验证码输入错误');
                    return;
                }
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
            }).fail(function () {
                $('.modal-loading').hide();
                $('.modal-error').show();
                $('.modal-success').hide();
            });
        }
    });

    var consultModalHedaer = '<div class="modal-head">合作咨询<span class="x"></span></div>';
    var consultModalHtml = {
        info: consultModalHedaer + [
            '<form id="consult-form" class="consult-modal-content">',
            '<div>您希望咨询的技术：（单选）</div>',
            '<div>',
            '<ul>',
            '<li><label><input type="radio" name="tech" value="机器学习" checked>机器学习</label></li>',
            '<li><label><input type="radio" name="tech" value="语音技术">语音技术</label></li>',
            '<li><label><input type="radio" name="tech" value="图像技术">图像技术</label></li>',
            '<li><label><input type="radio" name="tech" value="自然语言">自然语言</label></li>',
            '<li><label><input type="radio" name="tech" value="用户画像">用户画像</label></li>',
            '<li><label><input type="radio" name="tech" value="我不确定">我不确定</label></li>',
            '</ul>',
            '</div>',
            '<div>',
            '<input type="text" maxlength="50"  placeholder="请输入您的公司/单位名称（必填）" name="company">',
            '</div>',
            '<div>',
            '<input type="text" maxlength="50" placeholder="请输入您的姓名/称呼（必填）" name="username">',
            '</div>',
            '<div>',
            '<input type="text" maxlength="50" placeholder="请输入您的联系电话：手机/固定电话（必填）" name="phone">',
            '</div>',
            '<div>',
            '<input type="text" maxlength="50"  placeholder="请输入其他联系方式：邮箱/QQ等（选填）" name="contactWay">',
            '</div>',
            '<div>',
            '<textarea placeholder="请输入您的合作方式及内容，限500字内" maxLenght="500" name="content"></textarea>',
            '</div>',
            '<div class="qr-code-input">',
            '<input type="text" maxlength="4"  placeholder="请输入正确的验证码" name="code">',
            '<a><img alt="点击刷新验证码" src="/index/seccode?action=show"></a>',
            '</div>',
            '<div id="consult-info-warning"></div>',
            '<div class="form-actions">',
            '<button type="submit" class="btn-primary" id="consult-info-submit">提交</button>',
            '<button type="button" class="btn-cancel" id="consult-info-cancel">取消</button>',
            '</div>',
            '</form>'
        ].join(''),
        loading: consultModalHedaer + [
            '<div class="consult-modal-content">',
            '<div class="loading">正在提交<span class="loading-dot">...........</span></div>',
            '</div>'
        ].join(''),
        success: consultModalHedaer + [
            '<div class="consult-modal-content">',
            '<div class="alert-image">',
            '<img src="/index/static/brain/page/home/img/consult-success.png">',
            '</div>',
            '<div>',
            '<p>提交成功</p>',
            '</div>',
            '<div class="qr-code-alert">',
            '<p>您的咨询已提交，我们会及时和您联系！</p>',
            '<p>欢迎您加关注我们的官方微信，获取最新动态！</p>',
            '<div>',
            '<img src="/index/static/brain/page/home/img/qr-code.png">',
            '</div>',
            '</div>',
            '</div>'
        ].join(''),
        fail: consultModalHedaer + [
            '<div class="consult-modal-content">',
            '<div class="alert-image">',
            '<img src="/index/static/brain/page/home/img/consult-fail.png">',
            '</div>',
            '<div>',
            '<p>出了点小问题，请稍候重试</p>',
            '</div>',
            '<div class="form-actions">',
            '<button type="submit" class="btn-primary" id="consult-info-back">返回</button>',
            '<button type="button" class="btn-cancel" id="consult-info-cancel">取消</button>',
            '</div>',
            '</div>'
        ].join('')
    };

    $(document.body).on('click', '.consult', function (e) {
        e.preventDefault();
        modal.container.html(consultModalHtml.info);
        modal.open();
    });

    $(document.body).on('click', '#consult-info-submit', function (e) {
        e.preventDefault();
        var form = $('#consult-form');
        var inputsToCheck = [
            'input[name=company]', 'input[name=username]', 'input[name=phone]', 'input[name=code]'
        ];
        form.find(inputsToCheck.join()).removeClass('has-error');
        form.find('#consult-info-warning').html('');
        for (var i = 0, len = inputsToCheck.length; i < len; i++) {
            var input = form.find(inputsToCheck[i]);
            if (!input.val()) {
                input.addClass('has-error');
                form.find('#consult-info-warning').html(input.attr('placeholder'));
                return false;
            }
        }

        $.post('/index/seccode', {
            action: 'check',
            code: form.find('input[name=code]').val()
        }, 'json').success(function (res) {
            if (res.errno !== 0) {
                var codeInput = form.find('input[name=code]');
                codeInput.addClass('has-error');
                form.find('#consult-info-warning').html(codeInput.attr('placeholder'));
                $('.qr-code-input img').attr('src', '/index/seccode?action=show&t=' + new Date().getTime());
                return false;
            }
            modal.container.html(consultModalHtml.loading);
            $.post('/index/case', {
                tech: form.find('input[name=tech]:checked').val(),
                company: form.find('input[name=company]').val(),
                username: form.find('input[name=username]').val(),
                phone: form.find('input[name=phone]').val(),
                contactWay: form.find('input[name=contactWay]').val(),
                content: form.find('textarea[name=content]').val(),
                code: form.find('input[name=code]').val(),
                action: 'add'
            }, function (res) {
                if (res.errno !== 0) {
                    modal.container.html(consultModalHtml.fail);
                    return false;
                }
                modal.container.html(consultModalHtml.success);
            }).fail(function () {
                modal.container.html(consultModalHtml.fail);
            });
        }).fail(function () {
            modal.container.html(consultModalHtml.fail);
        });
    });

    $(document.body).on('click', '#consult-info-cancel', function (e) {
        e.preventDefault();
        modal.close();
    });

    $(document.body).on('click', '#consult-info-back', function (e) {
        e.preventDefault();
        modal.container.html(consultModalHtml.info);
    });
    $(document.body).on('click', '.qr-code-input>a', function (e) {
        e.preventDefault();
        $(this).find('img').attr('src', '/index/seccode?action=show&t=' + new Date().getTime());
    });
})();

// 基于复用的思路是对的，但是类的使用有点奇怪。。。
function Modal() {
    if (!Modal.container) {
        Modal.container = $(
            '<div style="position: fixed; left: 0; top: 0; width: 100%; height: 100%; display: none">'
            + '<div class="modal-bg" style="position: absolute;width: 100%; height: 100%;top: 0; left: 0;">'
            + '</div>'
            + '<div class="modal-content"></div>'
            + '</div>');
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
    };
}
