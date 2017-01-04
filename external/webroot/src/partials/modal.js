/**
 * @file 基本模态框模板
 * @author shiliang@baidu.com
 */
'use strict';

export const MODAL_TMPL = [
    '<div class="ai-modal" id="<%= id %>">',
        '<header class="modal-header">',
            '<h3><%= title %></h3>',
            '<a class="modal-x"></a>',
        '</header>',
        '<section class="modal-content">',
        '</section>',
    '</div>'
].join('');

export const ALERT_MODAL_TMPL = [
    '<div class="ai-modal alert" id="<%= id %>">',
    '<header class="modal-header">',
    '<h3><%= title %></h3>',
    '<a class="modal-x"></a>',
    '</header>',
    '<section class="modal-content">',
        '<div style="text-align: center; color: #666;font-size: 14px;margin-bottom: 20px;"><%=content%></div>',
        '<div style="text-align: center;">',
            '<button type="button" class="btn-normal cancel">确定</button>',
        '</div>',
    '</section>',
    '</div>'
].join('');



export const CONFIRM_MODAL_TMPL = [
    '<div class="ai-modal alert" id="<%= id %>">',
        '<header class="modal-header">',
            '<h3><%= title %></h3>',
            '<a class="modal-x"></a>',
        '</header>',
        '<section class="modal-content">',
            '<div style="text-align: center; color: #666;font-size: 14px;margin-bottom: 20px;"><%=content%></div>',
            '<div style="text-align: center;">',
                '<button type="button" class="btn-primary submit">确定</button>',
                '<button type="button" class="btn-normal cancel" style="margin-left: 15px;">取消</button>',
            '</div>',
        '</section>',
    '</div>'
].join('');