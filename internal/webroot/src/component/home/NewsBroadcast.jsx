/**
 * Created by shiliang on 2016/6/8.
 */
var React = require('react');
var $ = require('jquery');

class NewsBroadcast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: props.content
        };
    }

    componentDidMount() {
        $.getJSON(
            '/news',
            {
                action: 'list',
                pn: 0,
                rn: 3
            },
            $.proxy(
                function (res){
                    if (res.errno !== 0) {
                        console.error('获取新闻数据接口发生错误，error msg: ' + res.msg);
                        return;
                    }
                    this.setState({
                        content: res.data
                    });
                },
                this
            )
        );
    };

    convertTimeFormat(seconds) {
        var date = new Date(seconds * 1000);
        var fillZero = function (number) {
            return (number < 10 ? '0' : '')  + number;
        };
        return [
            date.getFullYear(),
            fillZero(date.getMonth() + 1),
            fillZero(date.getDate())
        ].join('-');
    }

    render() {
        var self = this;
        var newsContentHtml = this.state.content.length
            ? this.state.content.map(function (news) {
                return <li key={"news-broadcast-content-" + news.id}>
                    <a href={"/news?action=detail&id=" + news.id} target="_blank" title={news.title}>
                        {news.title.length > 21 ? (news.title.slice(0, 18) + '...') : news.title }
                        [{self.convertTimeFormat(news.time)}]
                    </a>
                </li>
            })
            : <li><a href="#">暂无新闻'</a></li>;
        var moreNews = this.state.content.length
            ? <div className="news-more">
                <a href="/news" target="_self">更多 ></a>
            </div>
            : null;

        return (
            <div className="news-broadcast">
                <div className="news-icon"></div>
                <ul className="news-content">
                    {newsContentHtml}
                </ul>
                {moreNews}
            </div>
        );
    }
}

NewsBroadcast.propTypes = {
    content: React.PropTypes.array,
};

NewsBroadcast.defaultProps = {
    content: []
};

module.exports = NewsBroadcast;