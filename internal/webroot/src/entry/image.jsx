var React = require('react');
var ReactDOM = require('react-dom');

// base components
var Carousel = require('../component/common/Carousel');

var carouselContent = [{
    label: '拍照翻译', image: '../images/image-scroll-1@2x.png'
}, {
    label: '拍照搜索', image: '../images/image-scroll-2@2x.png'
}, {
    label: '刷脸身份证验证', image: '../images/image-scroll-3@2x.png'
}, {
    label: '图片质量管理', image: '../images/image-scroll-4@2x.png'
}];

ReactDOM.render(
    <Carousel content={carouselContent}/>,
    document.getElementById('carousel-container')
);

document.querySelector('#image').className='active';
