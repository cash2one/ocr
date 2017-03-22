/**
 * @file 提示模态框容器
 * @author shiliang@baidu.com
 */

import $ from 'jquery';
import Modal from '../common/modal';

import confirmModalTpl from 'partials/modal/confirm.hbs';

export default class ConfirmModal extends Modal {
    constructor(title, content, confirm = $.noop) {
        super();
        this.title = title || '确认信息';
        this.content = content || '';
        this.confirm = confirm;
        this.init();
    }

    init() {
        const html = confirmModalTpl(
            {
                id: this.id,
                title: this.title,
                content: this.content
            }
        );
        $(this.container).append(html);
        this.bindEvent();
        super.show();
    }

    hide() {
        this.getModal().hide().remove();
        $('body').removeClass('modal-show');
    }

    bindEvent() {
        super.bindEvent();
        let modal = this.getModal();

        modal.on('click', 'button.cancel', e => {
            e.preventDefault();
            this.hide();
        });

        modal.on('click', 'button.submit', e => {
            e.preventDefault();
            this.confirm();
            this.hide();
        });
    }

}
