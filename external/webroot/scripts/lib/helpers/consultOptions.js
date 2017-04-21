/**
 * @file 咨询表单option生成组件
 * @author FranckChen(chenfan02@baidu.com)
 */

module.exports = function (options = [], selectedOption) {
    if (!Array.isArray(options)) {
        return '';
    }

    return options.map(option => {
        // 太长了，所以加return;
        return `<option value="${option}" ${option === selectedOption ? 'selected' : ''}>${option}</option>`;
    }).join('\r');
};
