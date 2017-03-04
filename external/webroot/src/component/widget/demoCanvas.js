/**
 * @file 用于绘制根据图片识别返回数据绘制图片的插件
 * @author shiliang@baidu.com
 */

import $ from 'jquery';
import {getHeader} from '../../model/demoAPI';
import AlertModal from './alertModal';

/* eslint-disable */
const notFoundImg = require('../../../ai_images/error/not-found.png');
const formatImg = require('../../../ai_images/error/image-format.png');
const tooLargeImg = require('../../../ai_images/error/too-large.png');
/* eslint-enable */

export default class DemoCanvas {
    constructor({selector, image, type, apiType, toCheck = true, scale = 1, success, fail}) {
        if (!$(selector).context) {
            throw 'DemoCanvas：未寻找到容器!';
        }

        this.container = $(selector);
        this.type = type;
        this.scale = scale;
        this.apiType = apiType;
        this.image = new Image();
        this.success = success || $.noop;
        this.fail = fail || $.noop;

        this.image.onerror = () => {
            this.fail();
            new AlertModal('图片加载失败，请重试');
        };

        if (toCheck) {
            let promise = {
                url: this.checkByUrl,
                stream: this.checkByStream
            }[this.type](image, apiType);

            promise.then(
                resultImg => {
                    this.image.onload = () => {
                        this.render(true);
                    };
                    this.image.src = resultImg;
                },
                errorImg => {
                    this.image.onload = () => {
                        this.render(false);
                    };
                    this.image.src = errorImg;
                }
            );
        }
        else {
            this.image.onload = () => {
                this.render(true);
            };
            this.image.src = image;
        }
    }

    checkByUrl(image, apiType) {
        let dfd = $.Deferred();

        getHeader({
            imageUrl: image,
            type: apiType,
            success(res) {
                let contentType = res.data['Content-Type'];
                let contentSize = res.data['Content-Length'];
                if ((!contentType && !contentSize) || res.errno !== 0) {
                    // console.error('此错误可能是由于图片的同源策略造成的!');
                    dfd.reject(notFoundImg);
                    return;
                }
                if (!/image\/(png|bmp|jpg|jpeg)/.test(contentType)) {
                    dfd.reject(formatImg);
                    return;
                }
                if (contentSize > 2 * 1024 * 1024) {
                    dfd.reject(tooLargeImg);
                    return;
                }
                dfd.resolve(res.data.image_data);
            },
            fail() {
                dfd.reject(notFoundImg);
            }
        });

        return dfd.promise();
    }

    checkByStream(image) {
        let dfd = $.Deferred();
        let reader = new FileReader();
        if (!image) {
            dfd.reject(notFoundImg);
            return dfd.promise();
        }
        reader.readAsDataURL(image);
        reader.onload = e => {
            if (!/image\/(png|bmp|jpeg)/.test(image.type)) {
                dfd.reject(formatImg);
                return false;
            }
            if (image.size > 2 * 1024 * 1024) {
                dfd.reject(tooLargeImg);
                return false;
            }
            dfd.resolve(e.target.result);
        };
        reader.onerror = () => {
            dfd.reject(notFoundImg);
        };

        return dfd.promise();
    }

    render(isSuccessful) {
        let cWidth = this.container.width();
        let cHeight = this.container.height();
        let iWidth = this.image.width;
        let iHeight = this.image.height;

        let canvas = $('<canvas>您的浏览器暂时不支持canvas，请选用现代浏览器！</canvas>').attr('width', iWidth)
            .attr('height', iHeight);
        let ctx = canvas[0].getContext('2d');
        ctx.drawImage(this.image, 0, 0);

        let wRatio = iWidth / cWidth;
        let hRatio = iHeight / cHeight;

        // 图片缩放
        const scaleRatio = this.scale * ((wRatio > 1 || hRatio > 1)
                ? (1 / (wRatio >= hRatio ? wRatio : hRatio))
                : 1);

        canvas.css({
            'position': 'relative',
            'left': '50%',
            'top': '50%',
            '-webkit-transform': 'translate(-50%, -50%) scale(' + scaleRatio + ')',
            '-moz-transform': 'translate(-50%, -50%) scale(' + scaleRatio + ')',
            '-o-transform': 'translate(-50%, -50%) scale(' + scaleRatio + ')',
            'transform': 'translate(-50%, -50%) scale(' + scaleRatio + ')'
        });

        canvas.attr('data-scale', scaleRatio);
        this.container.empty().append(canvas);

        if (isSuccessful) {
            this.success(this.image.src);
        }
        else {
            this.fail();
        }
    }
}
