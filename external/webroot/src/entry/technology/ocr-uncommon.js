/**
 * @file ocr-生僻字识别脚本入口
 * @author chenweiwei01@baidu.com
 */
'use strict';

import $ from 'jquery';

import '../common/tech-case'
import '../../less/technology/ocr-uncommon.less';
import {scanGeneralText} from '../../model/demoAPI';

// 获取信息
const $getUrlType = (
    {
        init:
            function() {
                if(!this._xmlHttp) {
                    if (window.ActiveXObject){
                        this._xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                    }
                    else {
                        this._xmlHttp = new XMLHttpRequest();
                    }
                }
            },
        get:
            function(url, params, callback) {
                this.init();
                try{
                    this._xmlHttp.open('GET', url, true);
                    this._xmlHttp.setRequestHeader(
                        "Content-Type",
                        "application/x-www-form-urlencoded"
                    );
                    this._xmlHttp.onreadystatechange = function() {
                        if(this.readyState == 4 && this.status == 200) {
                            const header = this.getAllResponseHeaders();
                            callback(header);
                        }
                    };
                    this._xmlHttp.send(params);
                }
                catch(e){
                    alert(e.message);
                }
            }
    }
);

// Demo实例图片
const $techDemoSelect = $('.tech-demo-card-item');

// 实例图片点击点击
$techDemoSelect.on('click', ({target}) => {
    const $target = $(target);

    if ($target
            .parent()
            .hasClass('tech-demo-card-active')){
        return;
    }

    $target
        .parent()
        .addClass('tech-demo-card-active')
        .siblings()
        .removeClass('tech-demo-card-active');
    const demoUrl = `${window.location.protocol}${$target.attr('src')}`;
    getOriginImg(demoUrl)
});

// 使用url上传图片
const $monitorUrlBtn = $('#scan-photo');
const $demoPhotoUrl = $('#demo-photo-url');
$monitorUrlBtn.on('click',
    () => {
        const demoUrl = $demoPhotoUrl.val();
        if(!/\.(jpe?g|png|gif)$/.test(demoUrl)){
            return;
        }
        todoUrl(demoUrl)
    }
);

// 判断链接是否有效
const todoUrl = function(demoUrl) {
    $getUrlType.get(
        demoUrl,
        '',
        function(data){
            if(data.indexOf('image') >= 0) {

            }
        }
    );
};

// 获取图片
const getOriginImg = function(imgUrl){
    const demoOrigin = $('#demo-origin');

    demoOrigin.html(
        "<img class='tech-demo-origin-img' src='" + imgUrl + "'>"
    );

    startScan(imgUrl)
};

// 调用接口
const startScan = function(imgUrl) {
    const options = {
        success(res) {
            console.log(res);
            $('#demo-json').html(JSON.stringify(res, null, '\t'));
        }
    };
    options.imageUrl = imgUrl;
    scanGeneralText(options);
};



// const startScan = function(type, imgSrc, url) {
//     let options = {
//         success(res) {
//             $('#demo-json').html('<p>' + JSON.stringify(res, null, '\t') + '</p>');
//             let result = res.data.words_result;
//             result.forEach(
//                 (value,key) => {
//                     $('.demo-result-table').append([
//                         '<tr>' +
//                         '<td>' + (key + 1) + '</td>',
//                         '<td>' + value.words + '</td>',
//                         '<td>' + value.location.left + '</td>',
//                         '<td>' + value.location.top + '</td>',
//                         '<td>' + value.location.width + '</td>',
//                         '<td>' + value.location.height + '</td>',
//                         '</tr>'
//                     ].join(''));
//                 }
//             );
//         }
//     };
//     options.imageUrl = url;
//     scanGeneralText(options);
// };

// $techDemoSelect.click();
