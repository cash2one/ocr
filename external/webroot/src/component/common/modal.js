/**
 * @file 基础模态框容器
 * @author shiliang@baidu.com
 */

import $ from 'jquery';

import modalTpl from 'partials/modal/modal.hbs';

export default class Modal {
    constructor(container = 'body', id, title = '') {
        this.container = container;
        this.id = id || ('modal-' + new Date().getTime());
        this.title = title;
        this.isOpen = false;
    }

    init() {
        const html = modalTpl({id: this.id, title: this.title});
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

        const $body = $('body');

        $body.off('close', close);

        // fixme 咨询按键需要百度统计统计点击次数，所以不能阻止冒泡，故在这里做一个dirty solution
        $body.on('click', (e) => {
            const $target = $(e.target);

            if ($target.add($target.parents()).hasClass('consult')) {
                return;
            }

            close();
        });
    }
}
