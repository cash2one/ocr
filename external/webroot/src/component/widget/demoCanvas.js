/**
 * @file 用于绘制根据图片识别返回数据绘制图片的插件
 * @author shiliang@baidu.com
 */
'use strict';

import $ from 'jquery';
import {getHeader} from '../../model/demoAPI';

export default class DemoCanvas {
    constructor({selector, image, type, toCheck = true, scale = 1, success, fail}) {
        if (!$(selector).context) {
            throw 'DemoCanvas：未寻找到容器!';
        }
        this.container = $(selector);
        this.type = type;
        this.scale = scale;
        this.image = new Image();
        this.success = success || $.noop;
        this.fail = fail || $.noop;

        this.image.onerror = () => {
            this.fail();
            console.error('图片加载失败，请重试');
        };

        if (toCheck) {
            let promise = {
                'url': this.checkByUrl,
                'stream': this.checkByStream
            }[this.type](image);

            $.when(promise).then(
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
        } else {
            this.image.onload = () => {
                this.render(true);
            };
            this.image.src = image;
        }

    }

    checkByUrl(image) {
        let dfd = $.Deferred();
        getHeader({
            imageUrl: image,
            success: function (res) {
                let contentType = res.data['Content-Type'];
                let contentSize = res.data['Content-Length'];
                if ((!contentType && !contentSize) || res.errno !== 0) {
                    // console.error('此错误可能是由于图片的同源策略造成的!');
                    dfd.reject('/images/error/not-found.png');
                    return;
                }
                if (!/image\/(png|bmp|jpg|jpeg)/.test(contentType)) {
                    dfd.reject('/images/error/image-format.png');
                    return;
                }
                if (contentSize > 2 * 1024 * 1024) {
                    dfd.reject('/images/error/too-large.png');
                    return;
                }
                dfd.resolve(res.data.image_data);
            },
            fail: function () {
                dfd.reject('/images/error/not-found.png');
            }
        });
        return dfd.promise();
    }

    checkByStream(image) {
        let dfd = $.Deferred();
        let reader = new FileReader();
        if (!image) {
            dfd.reject('/images/error/not-found.png');
            return dfd.promise();
        }
        reader.readAsDataURL(image);
        reader.onload = e => {
            if (!/image\/(png|bmp|jpeg)/.test(image.type)) {
                dfd.reject('/images/error/image-format.png');
                return false;
            }
            if (image.size > 2 * 1024 * 1024) {
                dfd.reject('/images/error/too-large.png');
                return false;
            }
            dfd.resolve(e.target.result);
        };
        reader.onerror = () => {
            dfd.reject('/images/error/not-found.png');
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

        let scaleRatio = this.scale * ((wRatio > 1 || hRatio > 1)
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