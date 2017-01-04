/**
 * @file 邮件订阅模板
 * @author shiliang@baidu.com
 */
'use strict';

export const SUBSCRIPTION_TMPL = {
    'APPLY': [
        '<form id="subscribe-form">',
            '<div>',
                '<input type="text" maxlength="50" placeholder="请输入您的姓名/称呼（必填）" ',
                'name="username">',
            '</div>',
            '<div>',
                '<input type="text" maxlength="50" placeholder="请输入您的邮箱地址（必填）" name="email" ',
                'data-regex="^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$">',
            '</div>',
            '<div class="qr-code-input">',
                '<input type="text" maxlength="4"  placeholder="请输入正确的验证码" name="code">',
                '<a><img alt="点击刷新验证码" src="/index/seccode?action=show"></a>',
            '</div>',
            '<div class="info-warning"></div>',
            '<div class="form-actions">',
                '<button type="submit" class="btn-primary submit">提交</button>',
                '<button type="button" class="btn-normal cancel">取消</button>',
            '</div>',
        '</form>'
    ].join(''),
    'LOADING': [
        '<div class="consult-loading">正在提交<span class="loading-dot">...........</span></div>'
    ].join(''),
    'SUCCESS': [
        '<div class="consult-success">',
            '<div class="alert-image"></div>',
            '<p>您的邮箱已提交完毕，谢谢！</p>',
        '</div>'
    ].join(''),
    'FAIL': [
        '<div class="consult-fail">',
            '<div class="alert-image"></div>',
            '<p>出了点小问题，请稍候重试</p>',
            '<div class="fail-actions">',
                '<button type="button" class="btn-primary back">返回</button>',
                '<button type="button" class="btn-normal cancel">取消</button>',
            '</div>',
        '<div>'
    ].join('')
};