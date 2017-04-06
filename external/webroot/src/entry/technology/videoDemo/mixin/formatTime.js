/**
 * @file 时间格式化mixin
 * @author FranckChen(chenfan02@baidu.com)
 */

import videoJs from 'video.js';

export default {
    filters: {
        formatTime(second) {
            return videoJs.formatTime(second, 'M:SS');
        }
    }
};
