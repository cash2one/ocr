/**
 * @file 邮件订阅模态框容器
 * @author shiliang@baidu.com
 */

import $ from 'jquery';

import Modal from '../common/modal';
import {subscribe} from '../../model/subscription';
import {checkQRCode} from '../../model/qrCode';
import {setPlaceHolder} from '../common/placeholder';

import subscriptionTpl from 'partials/subscription/apply.hbs';
import loadingTpl from 'partials/subscription/loading.hbs';
import successTpl from 'partials/subscription/success.hbs';
import failTpl from 'partials/subscription/fail.hbs';

export default class SubscriptionModal extends Modal {
    constructor(container = 'body', id = 'subscription-modal', title = '订阅百度大脑最新消息') {
        super(container, id, title);
        this.init();
    }

    init() {
        super.init();
        super.getModal().addClass('subscription-modal');
        this.reset();
    }

    hide() {
        super.hide();
        this.reset();
    }

    reset() {
        this.setContent(subscriptionTpl({}));
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
            let form = $('#subscribe-form');
            let inputsToCheck = [
                'input[name=username]', 'input[name=email]', 'input[name=code]'
            ];
            form.find(inputsToCheck.join()).removeClass('has-error');
            form.find('.info-warning').html('');
            for (let i = 0, len = inputsToCheck.length; i < len; i++) {
                let input = form.find(inputsToCheck[i]);
                let value = input.val();
                let reg = input.attr('data-regex');

                if (!value) {
                    input.addClass('has-error');
                    form.find('.info-warning').html(input.attr('placeholder'));
                    return false;
                }
                if (reg && !new RegExp(reg).test(value)) {
                    input.addClass('has-error');
                    form.find('.info-warning').html(input.attr('placeholder') + '，并确保格式正确');
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
                    subscribe({
                        data: {
                            name: form.find('input[name=username]').val(),
                            email: form.find('input[name=email]').val(),
                            code: form.find('input[name=code]').val()
                        },
                        success: res => {
                            if (res.errno === 0) {
                                this.applySuccess();
                            } else {
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
