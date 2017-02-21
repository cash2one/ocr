/**
 * @file 文档
 * @author Franck Chen(chenfan02@baidu.com)
 */

import 'less/document/document.less';

import loadDoc from '../common/doc.js';

// 默认打开的markdown文档名
const defaultMd = 'Beginner-AccessProcess';

// 分析hash路径获取到需要加载的文档以及锚点
const hashPath = window.location.hash.split('#')[1] || '';
let docName = '';
let anchorId = '';
if (hashPath) {
    [docName, anchorId] = hashPath.split('_');
}

loadDoc(docName || defaultMd, anchorId);
