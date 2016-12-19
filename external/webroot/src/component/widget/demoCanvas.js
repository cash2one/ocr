/**
 * @file 用于绘制根据图片识别返回数据绘制图片的插件
 * @author shiliang@baidu.com
 */
'use strict';

import $ from 'jquery';

export default class DemoCanvas {
    constructor({selector, image, type, options = [], toCheck = true, success, fail}) {
        if (!$(selector).context) {
            throw 'DemoCanvas：未寻找到容器!';
        }
        this.container = $(selector);
        this.options = options;
        this.type = type;
        this.image = new Image();
        this.success = success || $.noop;
        this.fail = fail || $.noop;
        this.image = new Image();
        this.image.onload = () => this.render();

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
                    this.image.src = resultImg;
                    this.success(this.image.src);
                },
                errorImg => {
                    this.image.src = errorImg;
                    this.fail();
                }
            );
        } else {
            this.image.src = image;
            this.success(this.image.src);
        }

    }

    checkByUrl(image) {
        let dfd = $.Deferred();
        $.ajax({
            url: image,
            type: 'head',
            complete: function (xhr) {
                let contentType = xhr.getResponseHeader('Content-Type');
                let contentSize = xhr.getResponseHeader('Content-Length');
                if (!contentType && !contentSize) {
                    console.error('此错误可能是由于图片的同源策略造成的!');
                    dfd.reject('/images/error/not-found.png');
                    return;
                }
                if (!/image\/(png|bmp|jpg|jpeg)/.test(contentType)) {
                    dfd.reject('/images/error/image-format.png');
                    return;
                }
                if (contentSize > 2000 * 1024) {
                    dfd.reject('/images/error/too-large.png');
                    return;
                }
                dfd.resolve(image);
            },
            fail: function () {
                dfd.reject('/images/error/not-found.png');
                return;
            }
        });
        return dfd.promise();
    }

    checkByStream(image) {
        let dfd = $.Deferred();
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
            if (!/image\/(png|bmp|jpeg)/.test(image.type)) {
                dfd.reject('/images/error/image-format.png');
                return false;
            }
            if (image.size > 2000 * 1024) {
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

    render() {
        let cWidth = this.container.width();
        let cHeight = this.container.height();
        let iWidth = this.image.width;
        let iHeight = this.image.height;

        let canvas = $('<canvas>').attr('width', iWidth)
            .attr('height', iHeight);
        let ctx = canvas[0].getContext('2d');
        ctx.drawImage(this.image, 0, 0);

        let wRatio = iWidth / cWidth;
        let hRatio = iHeight / cHeight;

        let scaleRatio = (
            (wRatio > 1 || hRatio > 1)
                ? (1 / (wRatio >= hRatio ? wRatio : hRatio))
                : 1
            ) * 0.9;

        for (let i = 0, len = this.options.length; i < len; i++) {
            let option = this.options[i];
            let location = option.location;
            switch (option.shape) {
                case 'rect':
                    ctx.beginPath();
                    ctx.lineWidth = '1';
                    ctx.strokeStyle = 'rgba(0, 115, 235, 0.8)';
                    ctx.fillStyle = 'rgba(0, 115, 235, 0.5)';
                    ctx.rect(location.left, location.top, location.width, location.height);
                    ctx.fill();
                    ctx.stroke();
                    break;
            }

        }

        canvas.css({
            'position': 'relative',
            'left': '50%',
            'top': '50%',
            '-webkit-transform': 'translate(-50%, -50%) scale(' + scaleRatio + ')',
            '-moz-transform': 'translate(-50%, -50%) scale(' + scaleRatio + ')',
            '-o-transform': 'translate(-50%, -50%) scale(' + scaleRatio + ')',
            'transform': 'translate(-50%, -50%) scale(' + scaleRatio + ')'
        });
        this.container.empty().append(canvas);
    }
}