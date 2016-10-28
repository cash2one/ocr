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
        var res = {
            errno: 0,
            msg: "success",
            data: [
                {
                    id: "48",
                    title: "『活动』平台化三周年专题活动来啦！",
                    time: "1474848000",
                    author: "",
                    pv: "16",
                    abs: "导读：Robin 在2013年10月季度战略沟通会上跟大家分享了关于创新的思考，并提出了以平台化、接口化思维提升创新效率、建立生态系统的思路。同时告诉我们很...",
                    link: "http://news.family.baidu.com/newsDetail?articleId=154987"
                },
                {
                    id: "47",
                    title: "【应用场景】垂类行业辅助",
                    time: "1474502400",
                    author: "AI-BP",
                    pv: "29",
                    abs: "【通过机器学习挖掘时间/空间数据，构建经济指数】这些指标将在每个月月初发布，首批指数表明中国失业率上升。指数粒度能够追踪具体城市、行业甚至像苹果这类品牌的表...",
                    link: ""
                }
            ]
        };

        // $.getJSON(
        //     '/news',
        //     {
        //         action: 'list',
        //         pn: 0,
        //         rn: 2
        //     },
        //     $.proxy(
        //         function (res){
                    if (res.errno !== 0) {
                        console.error('获取新闻数据接口发生错误，error msg: ' + res.msg);
                        return;
                    }
                    this.setState({
                        content: res.data
                    });
        //         },
        //         this
        //     )
        // );
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