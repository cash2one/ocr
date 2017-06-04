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
        const pathname = window.location.pathname;

        // shift去除第一个空字段
        const pathData = pathname.split('/');
        pathData.shift();

        // 总类别分两个 技术(tech)和解决方案(solution)
        const [category, subCategory] = pathData;
        // 表单选中项
        let selectedOption = 'OCR文字识别';

        if (category === 'solution') {
            switch (subCategory) {
                case 'robot':
                    selectedOption = '机器人';
                    break;
                case 'facegate':
                    selectedOption = '人脸闸机';
                    break;
                case 'faceprint':
                    selectedOption = '人脸核身';
                    break;
                case 'dialog':
                    selectedOption = '号码风险识别';
                    break;
            }
        }
        else if (category === 'tech') {
            switch (subCategory) {
                case 'nlp':
                    selectedOption = 'NLP自然语言处理';
                    break;
                case 'ocr':
                    selectedOption = 'OCR文字识别';
                    break;
                case 'speech':
                    selectedOption = '语音技术';
                    break;
                case 'imagecensoring':
                    selectedOption = '图像审核';
                    break;
                case 'face':
                    selectedOption = '人脸识别';
                    break;
                case 'ar':
                    selectedOption = 'AR增强现实';
                    break;
            }
        }

        this.setContent(applyTpl({
            options: [
                'OCR文字识别', '人脸识别', '图像审核', '语音技术',
                'NLP自然语言处理', '用户画像', '机器学习', 'AR增强现实',
                '机器人', '人脸核身', '人脸闸机', '号码风险识别',
                '我不确定'
            ],
            // 表单当前选中项，根据打开不同的页面，选中项不同
            selectedOption
        }));

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
                'input[name=phone]', 'input[name=email]',
                'input[name=siteUrl]', '[name=requirement]',
                'input[name=code]'
            ];

            // 清楚错误提示
            form.find(inputsToCheck.join()).removeClass('has-error');
            form.find('.consult-info-warning').html('');

            for (let i = 0, len = inputsToCheck.length; i < len; i++) {
                const input = form.find(inputsToCheck[i]);
                const infoWarning = form.find('.info-warning');
                const inputVal = input.val().trim();
                const reg = /([\w\.]+)@([\w\.]+)\.(\w+)/;

                if (!inputVal) {
                    input.addClass('has-error');
                    infoWarning.text(input.attr('placeholder'));
                    return;
                }
                // 校验邮箱格式
                if (input.attr('name') === 'email' && !reg.test(inputVal)) {
                    input.addClass('has-error');
                    infoWarning.text('请输入正确的邮箱格式');
                    return;
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
                            email: form.find('input[name=email]').val(),
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
