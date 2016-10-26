/**
 * Created by shiliang on 2016/6/8.
 */
var React = require('react');

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: props.initialCount,
            isClickEvent: false
        };
        this.interval = null;
        this.changeSlider = this.changeSlider.bind(this);
    }

    componentDidMount() {
        this.setInterval(this.changeSlider, this.props.refreshInterval);
    }

    setInterval() {
        this.interval = setInterval.apply(null, arguments);
    }

    resetInterval() {
        clearInterval(this.interval);
        this.setInterval(this.changeSlider, this.props.refreshInterval);
    }

    changeSlider(event) {
        var self = this;
        var count =  this.state.count + 1;
        if (event) {
            this.resetInterval();
            count = Number(event.target.getAttribute('data-index'));
        }
        this.setState({
            count: count,
            isClickEvent: !!event
        });

        if (count === this.props.content.length) {
            setTimeout(function () {
                self.setState({
                    count: 0
                });
            }, this.props.refreshInterval / 2);
        }
    }

    render() {
        var carouselImages = [];
        var carouselIndicators = [];
        var len = this.props.content.length + 1;
        var offset = -100 / len * (this.state.count % len);
        var carouselStyle = {
            'width': (100 * len) + '%'
        };
        var transformStyleProps =  ['WebkitTransform', 'MozTransform', 'OTransform', 'transform'];
        for (var i = 0; i < 4; i++){
            carouselStyle[transformStyleProps[i]] = 'translateX(' + offset + '%)';
        }
        if (this.state.count !== 0 || this.state.isClickEvent) {
            var transitionStyleProps =  ['WebkitTransition', 'MozTransition', 'OTransition', 'transition'];
            for (var j = 0; j < 4; j++){
                carouselStyle[transitionStyleProps[i]] = 'all 1s';
            }
        }

        for (var k = 0; k < len; k++) {
            var imageStyle = {
                backgroundImage:'url(' + this.props.content[k + 1 === len ? 0 : k].image + ')',
                width: (100 / len) + '%'
            };
            carouselImages.push(
                <li key={'carousel-image-' + k} style={imageStyle}>
                </li>
            );
            if (k < len - 1) {
                carouselIndicators.push(
                    <li key={'carousel-indicator-' + k} className={this.state.count % (len - 1) === k ? 'active' : ''}>
                        <a onClick={this.changeSlider} data-index={k}>{this.props.content[k].label}</a>
                    </li>
                );
            }
        }

        return (
            <div className="carousel">
                <ul className="carousel-sliders" style={carouselStyle}>
                    {carouselImages}
                </ul>
                <ul className="carousel-indicators">
                    {carouselIndicators}
                </ul>
            </div>
        );
    }
}

Carousel.propTypes = {
    initialCount: React.PropTypes.number,
    refreshInterval: React.PropTypes.number

};
Carousel.defaultProps = {
    initialCount: 0,
    refreshInterval: 5000
};

module.exports = Carousel;