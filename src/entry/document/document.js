/**
 * @file 文档
 * @author Franck Chen(chenfan02@baidu.com)
 */

import 'less/document/document.less';

import loadDoc from '../common/doc.js';

// 默认打开的markdown文档名
const defaultMd = 'Beginner-AccessProcess';

const docRouter = function (name) {
    switch (name.toLowerCase()) {
        case 'nlp':
            return 'NLP-API';
        case 'speech':
        case 'speech-asr':
            return 'Speech-Asr-O2OAndroidSDK';
        case 'speech-tts':
            return 'Speech-Tts-O2OAndroidSDK';
        case 'face':
            return 'FACE-API';
        case 'ocr':
            return 'OCR-API';
        case 'antiporn':
            return 'Antiporn-API';
        default:
            return name;
    }
};

// 分析hash路径获取到需要加载的文档以及锚点
const hashPath = window.location.hash.split('#')[1] || '';
let docName = '';
let anchorId = '';
if (hashPath) {
    const parseResult = hashPath.split('_');
    docName = parseResult[0];
    anchorId = parseResult[1];

    docName = docRouter(docName);
}

loadDoc(docName || defaultMd, anchorId);
