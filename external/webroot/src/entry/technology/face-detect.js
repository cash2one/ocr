/**
 * @file bfb-人脸检测脚本入口
 * @author shiliang@baidu.com
 *         Franck Chen(chenfan02@baidu.com)
 */

import $ from 'jquery';
import throttle from 'lodash.throttle';

import DemoCanvas from '../../component/widget/demoCanvas';
import {scanFace} from '../../model/demoAPI';
import AlertModal from '../../component/widget/alertModal';

import 'less/technology/face-detect.less';

/* eslint-disable */
// demo图片路径集合，TODO 后填充图片地址，略不合理
const demoImagePaths = [
    // 静态引入，不要尝试些变量！
    require('../../../ai_images/technology/bfr-detect/demo-card-1.jpg'),
    require('../../../ai_images/technology/bfr-detect/demo-card-2.jpg'),
    require('../../../ai_images/technology/bfr-detect/demo-card-3.jpg'),
    require('../../../ai_images/technology/bfr-detect/demo-card-4.png'),
    require('../../../ai_images/technology/bfr-detect/demo-card-5.png'),
    require('../../../ai_images/technology/bfr-detect/demo-card-6.jpg'),
    require('../../../ai_images/technology/bfr-detect/demo-card-7.jpg'),
    require('../../../ai_images/technology/bfr-detect/demo-card-8.jpg')
];
/* eslint-enable */

// 结果json展示容器
const $jsonViewer = $('#demo-json').find('> p');
// 多人脸展示窗(容器)
const $multiFaceGallery = $('#result-gallery');
// 多人脸列表
const $multiFaceList = $multiFaceGallery.find('ul');
// 功能动画容器
const $techIntroDetail = $('.tech-intro-detail');
// 结果区
const $demoResult = $('#demo-result');
const $canvasContainer = $demoResult.find('.canvas-container');
// 用于上传文件的input, input[type='file']
const $uploadFileInput = $('#demo-photo-upload').find('> input');
const $demoPhotoUrl = $('#demo-photo-url');
// 用于盛放人脸分析数据的容器
const $faceDetail = $('#face-details');

// case点击效果
$('.case-indicator > li').click(function () {
    $('.case-indicator > li').each((i, e) => {
        $(e).toggleClass('active', i === $(this).index());
    });
    $('.case-item').each((i, e) => {
        $(e).toggleClass('active', i === $(this).index());
    });
});

// 触发功能介绍动画
$(window).scroll(
    throttle(
        () => {
            if ($(document).scrollTop() >= 100) {
                $('.tech-intro-detail').trigger('demo');
            }
        },
        300
    )
);

// 绑定功能介绍动画
$techIntroDetail.one('demo', function () {
    $techIntroDetail.addClass('scanned');
});

// 线上demo开始
let isScanning = false;

// 重置demo相关dom
const resetDemo = () => {
    isScanning = false;

    $jsonViewer.empty();

    $canvasContainer.attr('class', 'canvas-container');
    $('#demo-photo-upload, #scan-photo').removeClass('disabled');

    // 清空用于输入图片地址的url
    $uploadFileInput.val('');

    $multiFaceGallery.hide();
    $multiFaceList.empty();

    $faceDetail.hide().empty();
};

// 画人脸结果区块
const drawRect = function (data) {
    const $canvas = $demoResult.find('canvas');
    const scale = $canvas.attr('data-scale');
    const ctx = $canvas[0].getContext('2d');

    // 处理每一张人脸
    for (let i = 0, len = data.length; i < len; i++) {
        const record = data[i];
        const location = record.location;

        ctx.save();
        ctx.lineWidth = 4 / scale;
        ctx.strokeStyle = 'rgba(0, 115, 235, 0.8)';
        ctx.translate(location.left, location.top);
        // 区块追随人脸倾斜角度
        ctx.rotate(record.rotation_angle / 180 * Math.PI);
        ctx.rect(
            0,
            0,
            location.width,
            location.height
        );
        ctx.stroke();
        ctx.restore();
    }
};

// 画人脸结果Land Mark
const drawLandMark = function (data, hasOffset) {
    const $canvas = $demoResult.find('canvas');
    const scale = $canvas.attr('data-scale');
    const ctx = $canvas[0].getContext('2d');

    let offset = hasOffset
        ? {x: data.location.left, y: data.location.top}
        : {x: 0, y: 0};
    let rotatedAngel = hasOffset ? data.rotation_angle : 0;

    const getAngle = function (x, y) {
        return 360 * Math.atan(y / x) / (2 * Math.PI);
    };

    const getRadius = function (x, y) {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    };

    for (let i = 0, len = data.landmark72.length; i < len; i++) {
        const record = data.landmark72[i];

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.fillStyle = 'rgba(0, 115, 235, 0.8)';
        ctx.strokeStyle = 'transparent';

        const angle = (getAngle(record.x - offset.x, record.y - offset.y) - rotatedAngel) / 180 * Math.PI;
        const radius = getRadius(record.x - offset.x, record.y - offset.y);

        ctx.arc(radius * Math.cos(angle), radius * Math.sin(angle), 2 / scale, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
};

// 打开关闭结果画廊
const toggleGallery = function (isOpen) {
    $multiFaceGallery.toggle(isOpen);
};

// 设置多人脸展示窗, 在图片中包含多张人脸时会调用这里
const setGalleryContent = function (data) {
    const originalImage = new Image();

    // 根据数据，从源图片中裁剪每一张人脸,生成小图，放入展示窗中
    originalImage.onload = function () {
        for (let i = 0, len = data.result.length; i < len; i++) {
            const record = data.result[i];
            // 利用canvas裁剪图片, 大小根据返回数据中人脸尺寸决定
            const canvas = $('<canvas>')
                .attr('width', record.location.width)
                .attr('height', record.location.height);

            const ctx = canvas[0].getContext('2d');
            ctx.rotate(-record.rotation_angle * Math.PI / 180);
            ctx.translate(-record.location.left, -record.location.top);
            ctx.drawImage(originalImage, 0, 0);

            const galleryItem = $('<li><img src="' + canvas[0].toDataURL() + '"></li>');
            galleryItem.data('face', record).data('isAll', false);
            $multiFaceGallery.append(galleryItem);
        }
    };

    originalImage.src = $multiFaceGallery.find('img').eq(0).attr('src');
};

// 初始画廊
const initGallery = function (imgSrc, data) {
    const galleryItem = $('<li class="active"><img src="' + imgSrc + '"></li>');
    galleryItem.data('face', data).data('isAll', true);
    $multiFaceList.empty().append(galleryItem);
};

const FACE_PROPERTY_DICT = {
    age: {
        name: '年龄',
        transform(value) {
            return Math.round(value);
        }
    },
    race: {
        name: '人种',
        transform(value) {
            return {
                yellow: '黄种人',
                white: '白种人',
                black: '黑种人',
                arabs: '阿拉伯人'
            }[value];
        }
    },
    gender: {
        name: '性别',
        transform(value) {
            return {
                male: '男性',
                female: '女性'
            }[value];
        }
    },
    expression: {
        name: '表情',
        transform(value) {
            return {
                0: '不笑',
                1: '微笑',
                2: '大笑'
            }[value];
        }
    },
    glasses: {
        name: '眼镜',
        transform(value) {
            return {
                0: '无眼镜',
                1: '普通眼镜',
                2: '墨镜'
            }[value];
        }
    }
};

// 显示人脸分析数据结果
const showScanResult = function (data, isAll) {
    $faceDetail.empty();

    if (isAll) {
        $faceDetail.hide();

        return false;
    }

    $faceDetail.show();

    // 生成人脸数据分析
    Object.keys(FACE_PROPERTY_DICT).forEach(key => {
        const label = FACE_PROPERTY_DICT[key].name;
        const value = FACE_PROPERTY_DICT[key].transform(data[key]);

        // TODO 减少DOM操作次数
        $faceDetail.append(
            $('<li></li>').html(label + ' : ' + value)
        );
    });
};

const startScan = function (type, imgSrc, url) {
    $jsonViewer.empty();

    // 因为不见得所有图片都包含多张人脸，所以先隐藏多人脸部分
    toggleGallery(false);

    $canvasContainer.attr('class', 'canvas-container loading');

    $faceDetail.hide().empty();

    const options = {
        success(res) {
            $('#demo-photo-upload, #scan-photo').removeClass('disabled');
            $jsonViewer.html(JSON.stringify(res, null, '\t'));
            $canvasContainer.removeClass('loading');

            const {errno, msg, data} = res;

            if (errno !== 0 || !data.result_num) {
                $canvasContainer
                    .toggleClass('error-upload-fail', errno === 107)
                    .toggleClass('error-timeout', errno === 28)
                    .toggleClass('error-image-format', errno === 106);

                $canvasContainer.toggleClass(
                    'error-no-result',
                    !data || !data.result_num
                );

                $canvasContainer.empty();

                isScanning = false;

                if ([106, 107, 28, 0].indexOf(errno) === -1) {
                    new AlertModal(msg);
                }

                return isScanning;
            }

            $canvasContainer.toggleClass('has-result', data.result_num >= 1);

            initGallery(imgSrc, data.result);

            if (data.result_num === 1) {
                toggleGallery(false);
                drawLandMark(data.result[0]);
                showScanResult(data.result[0], false);
            }
            else {
                toggleGallery(true);
                setGalleryContent(data);
                drawRect(data.result);
                showScanResult(null, true);
            }

            isScanning = false;
        },
        fail(xhr) {
            new AlertModal('接口发生错误：' + xhr.status + ' - ' + xhr.statusText);
            resetDemo();
        }
    };

    if (type === 'url') {
        options.imageUrl = url;
    }
    else if (type === 'stream') {
        options.image = imgSrc;
    }

    // TODO 从名字完全看不出来是要调用ajax
    scanFace(options);
};

// 用户上传图片的监测
$uploadFileInput.change(function (e) {
    const $target =  $(e.target);

    if ($target.val() === '') {
        return false;
    }

    // 如果正处于监测中，提示用户
    if (isScanning) {
        new AlertModal('操作正在进行中，请稍候再试！');
        return;
    }

    isScanning = true;

    $('#demo-photo-upload, #scan-photo').addClass('disabled');
    let file = $target[0].files[0];

    new DemoCanvas({
        selector: '#demo-result .canvas-container',
        image: file,
        type: 'stream',
        success(imgSrc) {
            $uploadFileInput.val('');
            startScan('stream', imgSrc);
        },
        fail: resetDemo
    });
});

// 点击监测按键的处理
$('#scan-photo').click(function (e) {
    const $target = $(e.target);

    if (isScanning) {
        new AlertModal('操作正在进行中，请稍候再试！');
        return;
    }

    if ($target.hasClass('disabled') || !$demoPhotoUrl.val()) {
        return;
    }

    isScanning = true;

    $('#demo-photo-upload, #scan-photo').addClass('disabled');
    const url = $demoPhotoUrl.val();

    new DemoCanvas({
        selector: '#demo-result .canvas-container',
        image: url,
        type: 'url',
        apiType: 'face',
        success(imgSrc) {
            startScan('url', imgSrc, url);
        },
        fail: resetDemo
    });
});

// 阻止多次上传 TODO 通过disabled属性控制
$('#demo-photo-upload').click(function () {
    if ($(this).hasClass('disabled')) {
        return false;
    }
});

// FIXME bug
const $demoImgContainer = $('.demo-card-list > li');
$demoImgContainer.each(function (index, element) {
    $(element)
        .find('img')
        .attr('src', `${demoImagePaths[index]}`);
});

// 绑定实例图点击事件
$demoImgContainer.click(function () {
    if (isScanning) {
        new AlertModal('操作正在进行中，请稍候再试！');
        return;
    }

    isScanning = true;

    $('.demo-card-list > li').removeClass('active');

    $(this).addClass('active');

    let url = `${window.location.protocol}${$(this).find('img').attr('src')}`;

    $('#demo-photo-upload, #scan-photo').addClass('disabled');

    new DemoCanvas({
        selector: '#demo-result .canvas-container',
        image: url,
        type: 'url',
        success(imgSrc) {
            startScan('url', imgSrc, url);
        },
        fail: resetDemo
    });
});

// 多人脸展示窗点击处理
$multiFaceGallery.on('click', 'li', function () {
    $multiFaceGallery.find('li').removeClass('active');

    let galleryItem = $(this);
    galleryItem.addClass('active');
    let faceData = galleryItem.data('face');
    let isAll = galleryItem.data('isAll');

    new DemoCanvas({
        selector: '#demo-result .canvas-container',
        image: $(this).find('img').attr('src'),
        toCheck: false,
        // scale: isAll ? 1 : 2,
        success() {
            if (isAll) {
                drawRect(faceData);
            }
            else {
                drawLandMark(faceData, true);
            }

            showScanResult(faceData, isAll);
        },
        fail: resetDemo
    });
});

// 触发初始化效果
$demoImgContainer.eq(0).click();
