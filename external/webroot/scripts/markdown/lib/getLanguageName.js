/**
 * @file 根据代码文件后缀名，推测语言名函数
 * @author FranckChen(chenfan02@baidu.com)
 */

module.exports = function (ext) {
    switch (ext) {
        case 'java':
            return {
                // 用于highLight.js 解析的语言名称, hljs在高亮时，需要知道具体的语言名称
                // 这个字段囊括的值符合hljs的规范
                hljsLanName: 'Java',
                readableLanName: 'java'
            };
        case 'py':
            return {
                hljsLanName: 'Python',
                readableLanName: 'python'
            };
        case 'cs':
            return {
                hljsLanName: 'CSharp',
                readableLanName: 'C#'
            };
        case 'php':
            return {
                hljsLanName: 'PHP',
                readableLanName: 'PHP'
            };
        case 'cpp':
            return {
                hljsLanName: 'C++',
                readableLanName: 'C++'
            };
        // bash居然用.txt后缀...
        case 'txt':
            return {
                hljsLanName: 'Bash',
                readableLanName: 'bash'
            };
        default:
            return {
                hljsLanName: '',
                readableLanName: ''
            };
    }
};
