var React = require('react');
var ReactDOM = require('react-dom');

// base components
var Carousel = require('../component/common/Carousel');

var carouselContent = [{
    label: '手百语音搜索', image: '../images/speech-scroll-1@2x.png'
}, {
    label: '百度carlife', image: '../images/speech-scroll-2@2x.png'
}, {
    label: '度秘语音交互', image: '../images/speech-scroll-3@2x.png'
}, {
    label: '百度新闻', image: '../images/speech-scroll-4@2x.png'
}];

ReactDOM.render(
    <Carousel content={carouselContent}/>,
    document.getElementById('carousel-container')
);

document.querySelector('#speech').className='active';
