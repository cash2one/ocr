# SuperBrain

Landing Page for AI Baidu.

A start kit using webpack.

Based On jQuery / UIKit / WeiboTopic ...

### Installation

``` bash
$ npm install
```

### Usage

``` bash
$ npm run dev
$ npm run build
```

### Configuration

``` bash

  config.json - 配置文件

  uri: 指定请求路径，默认 '/' = 请求本地根目录下 '/static/json 文件夹'
  delay: 头部颜色渐变所占高度范围，默认 200 [px] 


  video.json - 媒体动态 左侧视频

  id: 序号
  title: 视频标题，暂未显示
  iqiyi: 爱奇艺 [分享] - [通用代码] - [iframe标签中src]
  shortcut: 截图路径，建议尺寸 175x100
  active: true 当前播放视频，只能设置一个


  news.json - 媒体动态 右侧新闻

  id: 序号
  title: 新闻标题
  content: 新闻简介，只包含文字
  poster: 封面路径，建议尺寸 400x175
  link: 新闻链接
  active: true 当前置顶新闻，只能设置一个
  source: 来源，例如 "新浪网"


  score.json - 实时战况
  
  id: 1,2,3 分别表示三场比赛
  begin_time: 开赛时间，格式 "2016-01-06 18:18"
  end_time: 比赛结束时间


  gallery.json - 精彩瞬间 左侧

  id: 序号
  url: 图片链接 建议尺寸 625x450


  moment.json - 精彩瞬间 右侧

  id: 序号
  url: 图片链接 建议乾务镇图片尺寸分别为 530x165、165x165、335x165、165x165、335x165 


``` 