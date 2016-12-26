/**
 * @file 提示模态框容器
 * @author shiliang@baidu.com
 */
'use strict';

import EJS from 'ejs';
import $ from 'jquery';
import Modal from '../common/modal';
import {ALERT_MODAL_TMPL} from '../../partials/modal';


export default class AlertModal extends Modal {
    constructor(content) {
        super();
        this.title = '提示';
        this.content = content || '';
        this.init();
    }

    init() {
        let html = EJS.render(
            ALERT_MODAL_TMPL,
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