/**
 * @file 基本模态框模板
 * @author shiliang@baidu.com
 */
'use strict';

export const MODAL_TMPL = [
    '<div class="modal" id="<%= id %>">',
        '<header class="modal-header">',
            '<h3><%= title %></h3>',
            '<a class="modal-x"></a>',
        '</header>',
        '<section class="modal-content">',
        '</section>',
    '</div>'
].join('');