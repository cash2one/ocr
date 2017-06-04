/**
 * @file 提示模态框容器
 * @author shiliang@baidu.com
 */

import $ from 'jquery';
import Modal from '../common/modal';

import alertModalTpl from 'partials/modal/alert.hbs';

export default class AlertModal extends Modal {
    constructor(content) {
        super();
        this.title = '提示';
        this.content = content || '';
        this.init();
    }

    init() {
        const html = alertModalTpl(
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
    }

}
