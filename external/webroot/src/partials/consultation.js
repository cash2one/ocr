/**
 * @file 技术咨询模态框模板
 * @author shiliang@baidu.com
 */
'use strict';

export const CONSULTATION_TMPL = {
    'APPLY': [
        '<form id="consult-form">',
            '<p>您希望咨询的技术：（单选）</p>',
            '<div>',
                '<ul class="tech-list">',
                    '<li><label><input type="radio" name="tech" value="机器学习" checked>机器学习</label></li>',
                    '<li><label><input type="radio" name="tech" value="语音技术">语音技术</label></li>',
                    '<li><label><input type="radio" name="tech" value="图像技术">图像技术</label></li>',
                    '<li><label><input type="radio" name="tech" value="自然语言">自然语言</label></li>',
                    '<li><label><input type="radio" name="tech" value="用户画像">用户画像</label></li>',
                    '<li><label><input type="radio" name="tech" value="增强现实">增强现实</label></li>',
                    '<li><label><input type="radio" name="tech" value="解决方案">解决方案</label></li>',
                    '<li><label><input type="radio" name="tech" value="我不确定">我不确定</label></li>',
                '</ul>',
            '</div>',
            '<div>',
                '<input type="text" maxlength="50"  placeholder="请输入您的公司/单位名称（必填）" value="请输入您的公司/单位名称（必填）" name="company">',
            '</div>',
            '<div>',
                '<input type="text" maxlength="50" placeholder="请输入您的姓名/称呼（必填）" value="请输入您的姓名/称呼（必填）" name="username">',
            '</div>',
            '<div>',
                '<input type="text" maxlength="50" placeholder="请输入您的联系电话：手机/固定电话（必填）" value="请输入您的联系电话：手机/固定电话（必填）" name="phone">',
            '</div>',
            '<div>',
                '<input type="text" maxlength="50"  placeholder="请输入其他联系方式：邮箱/QQ等（选填）" value="请输入其他联系方式：邮箱/QQ等（选填）" name="contactWay">',
            '</div>',
            '<div>',
                '<textarea placeholder="请输入您的合作方式及内容，限500字内" maxLenght="500" name="content" value="请输入您的合作方式及内容，限500字内"></textarea>',
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
            '<p>提交成功</p>',
            '<div class="qr-code-alert">',
                '<p>您的咨询已提交，我们会及时和您联系！</p>',
                '<p>欢迎您加关注我们的官方微信，获取最新动态！</p>',
                '<div class="qr-code-img"></div>',
            '</div>',
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