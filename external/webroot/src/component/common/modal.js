/**
 * @file 基础模态框容器
 * @author shiliang@baidu.com
 */
'use strict';

import {MODAL_TMPL} from '../../partials/modal';
import EJS from 'ejs';
import $ from 'jquery';

export default class Modal {
    constructor(container = 'body', id, title = '') {
        this.container = container;
        this.id = id || ('modal-' + new Date().getTime());
        this.title = title;
        this.isOpen = false;
    }

    init() {
        let html = EJS.render(MODAL_TMPL, {id: this.id, title: this.title});
        $(this.container).append(html);
        this.bindEvent();
    }

    setContent(html) {
        this.getModal().find('.modal-content').html(html);
    }

    show() {
        this.isOpen = true;
        this.getModal().show();
        $('body').addClass('modal-show');
    }

    hide() {
        this.isOpen = false;
        this.getModal().hide();
        $('body').removeClass('modal-show');
    }

    destroy() {
        this.hide();
        this.getModal().remove();
    }

    getModal() {
        return $('#' + this.id);
    }

    bindEvent() {
        this.getModal().on('click', '.modal-x', () => {
            this.hide();
        });

        this.getModal().on('click', e => {
            e.stopPropagation();
        });

        this.getModal().on('close', () => {
            if (this.isOpen) {
                this.hide();
            }
        });

        function close() {
            $('.ai-modal').trigger('close');
        }

        $('body').off('close', close).on('click', close);
    }
}