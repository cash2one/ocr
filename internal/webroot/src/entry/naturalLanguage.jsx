var React = require('react');
var ReactDOM = require('react-dom');

// base components
var Carousel = require('../component/common/Carousel');

var carouselContent = [{
    label: '度秘对话交互', image: '../images/natural-scroll-1@2x.jpg'
}, {
    label: '新闻摘要生成', image: '../images/natural-scroll-2@2x.jpg'
}, {
    label: '百度会话翻译', image: '../images/natural-scroll-3@2x.jpg'
}, {
    label: '百度糯米评论分析', image: '../images/natural-scroll-4@2x.jpg'
}];

ReactDOM.render(
    <Carousel content={carouselContent}/>,
    document.getElementById('carousel-container')
);

document.querySelector('#natural-language').className='active';
