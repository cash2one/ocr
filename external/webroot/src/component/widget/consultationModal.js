/**
 * @file 技术咨询模态框容器
 * @author shiliang@baidu.com
 */

import $ from 'jquery';

import Modal from '../common/modal';
import {sendConsultation} from '../../model/consultation';
import {checkQRCode} from '../../model/qrCode';
import {setPlaceHolder} from '../common/placeholder';

import applyTpl from 'partials/consultation/apply.hbs';
import failTpl from 'partials/consultation/fail.hbs';
import successTpl from 'partials/consultation/success.hbs';
import loadingTpl from 'partials/consultation/loading.hbs';

export default class ConsultationModal extends Modal {
    constructor(container = 'body', id = 'consultation-modal', title = '合作咨询') {
        super(container, id, title);
        this.init();
    }

    init() {
        super.init();
        super.getModal().addClass('consult-modal');
        this.reset();
    }

    hide() {
        super.hide();
        this.reset();
    }

    reset() {
        this.setContent(applyTpl({}));
        setPlaceHolder(this.getModal());
    }

    apply() {
        this.setContent(loadingTpl({}));
    }

    applySuccess() {
        this.setContent(successTpl({}));
    }

    applyFail() {
        this.setContent(failTpl({}));
    }

    refreshQRCode() {
        this.getModal().find('.qr-code-input img')
            .attr('src', '/index/seccode?action=show&t=' + new Date().getTime());
    }

    bindEvent() {
        super.bindEvent();
        let modal = this.getModal();

        modal.on('click', 'button.submit', e => {
            e.preventDefault();

            const form = $('#consult-form');
            const inputsToCheck = [
                'input[name=company]', 'input[name=username]',
                'input[name=phone]', 'input[name=siteUrl]',
                '[name=requirement]', 'input[name=code]'
            ];

            // 清楚错误提示
            form.find(inputsToCheck.join()).removeClass('has-error');
            form.find('.consult-info-warning').html('');

            for (let i = 0, len = inputsToCheck.length; i < len; i++) {
                const input = form.find(inputsToCheck[i]);

                if (!input.val()) {
                    input.addClass('has-error');
                    form.find('.info-warning').html(input.attr('placeholder'));
                    return false;
                }
            }

            checkQRCode({
                code: form.find('input[name=code]').val(),
                success: res => {
                    if (res.errno !== 0) {
                        let codeInput = form.find('input[name=code]');
                        codeInput.addClass('has-error');
                        form.find('.info-warning').html(codeInput.attr('placeholder'));
                        this.refreshQRCode();
                        return false;
                    }

                    sendConsultation({
                        data: {
                            tech: form.find('select[name=tech]').val(),
                            company: form.find('input[name=company]').val(),
                            username: form.find('input[name=username]').val(),
                            phone: form.find('input[name=phone]').val(),
                            trade: form.find('input[name=trade]').val(),
                            siteUrl: form.find('input[name=siteUrl]').val(),
                            business: form.find('textarea[name=business]').val(),
                            requirement: form.find('textarea[name=requirement]').val(),
                            code: form.find('input[name=code]').val(),
                            urlFrom: window.location.href
                        },
                        success: res => {
                            if (res.errno === 0) {
                                this.applySuccess();
                            }
                            else {
                                this.applyFail();
                                this.refreshQRCode();
                            }
                        },
                        fail: () => this.applyFail()
                    });

                    this.apply();
                },
                fail: () => this.applyFail()
            });
        });

        modal.on('click', 'button.cancel', e => {
            e.preventDefault();
            this.hide();
        });

        modal.on('click', 'button.back', e => {
            e.preventDefault();
            this.reset();
        });

        modal.on('click', '.qr-code-input>a', e => {
            e.preventDefault();
            this.refreshQRCode();
        });
    }
}
