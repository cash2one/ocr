var React = require('react');
var ReactDOM = require('react-dom');

// base components
var Carousel = require('../component/common/Carousel');

var carouselContent = [{
    label: '拍照翻译', image: '/internal/images/image-scroll-1@2x.jpg'
}, {
    label: '拍照搜索', image: '/internal/images/image-scroll-2@2x.jpg'
}, {
    label: '刷脸身份证验证', image: '/internal/images/image-scroll-3@2x.jpg'
}, {
    label: '图片质量管理', image: '/internal/images/image-scroll-4@2x.jpg'
}];

ReactDOM.render(
    <Carousel content={carouselContent}/>,
    document.getElementById('carousel-container')
);

document.querySelector('#image').className='active';
