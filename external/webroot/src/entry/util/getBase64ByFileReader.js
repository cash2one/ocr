/**
 * @file 通过file reader将图片转为base 64编码
 * @author Franckchen(chenfan02@baidu.com)
 */

// TODO 替换为标准promise
import $ from 'jquery';

/**
 * 将图片文件转为base64编码
 *
 * @param {File} imageFile 图片文件
 * @return {Promise}
 */
export default function (imageFile) {
    const dfd = $.Deferred();
    const reader = new FileReader();

    reader.readAsDataURL(imageFile);

    reader.onload = e => {
        dfd.resolve(e.target.result);
    };

    reader.onerror = dfd.reject;

    return dfd.promise();
}
