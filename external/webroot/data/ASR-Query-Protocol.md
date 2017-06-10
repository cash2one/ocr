# 前言

百度语义理解开放平台面向互联网开发者提供对自然语言文本的解析服务。自然语言文本是用户意图的表述，意图解析的目的就是将文本解析成**意图表示**。

百度语义理解开放平台的特点，并计划逐步开放：

**支持多意图解析**

   query 可能有多种意图，因此意图表示应该是多个。

**容错**

   语音输入环境下，有错别字时能正确解析的能力非常重要。依托百度搜索行为大数据和 query 纠错技术，开放平台具备强大的纠错能力。

**具备基于知识库的智能推理能力**

   依托百度知道等社区等产品上积累的知识构建的知识库，开发平台能够做到智能推理、“不言而明”。

**具备上下文理解能力**

   基于上文的解析下文，具体包括省略补全和指代消解等。



# 意图表示协议

## 意图表示协议描述语言

为了易于人阅读，同时也方便机器解析和生成，意图表示协议采用 json 语言进行描述，采用 gb18030 编码。json 语言的基本概念：

**属性名/属性值**

   即键值对（key-value）

**数组**

在 json 中是“[]”括起来的内容，数据结构为["value1","value2",...]，取值方式和所有语言中一样，使用索引获取，属性值的类型可以是数字、字符串、数组、对象。

**对象**

   在 json 中表示为“{}”括起来的内容，数据结构为 {key1:value1,key2:value2,...}的键值对的结构。在面向对象的语言中，key 为对象的属性，value 为对应的属性值，所以很容易理解，取值方法为对象.key 获取属性值，这个属性值的类型可以是数字、字符串、数组、对象几种。

## 意图表示协议

自然语言文本（以下简称 query）。query 的意图表示由如下**键值对**和**数组**构成：

1. raw_text：用户的原始输入文本
2. parsed_text：经过分词，纠错，改写处理后的文本
3. version：协议版本号
4. results：意图表示数组

意图表示数组中存放多个**意图表示对象**。每个意图表示对象含有**领域、意图、置信度**三个键值对和一个**意图对象**。

**领域**（domain）：同一类型的数据或资源，以及围绕数据或资源提供的服务称为一个领域。领域数据一般是结构化的表格数据，有一个主键（主属性）；领域一般以名词命名。如：
   列车：围绕车次数据的列车时刻查询和预订服务，主键是车次
   天气：围绕天气数据的查询服务，主键是日期
   电话：围绕联系人-号码数据的电话拨打、通话记录查询服务，主键是电话号码

**意图**（intent）：代表用户对领域数据的操作，如查询、查询某一个属性的值、预订、拨打等。一般以动词命名。

**置信度**（score）：意图表示的置信度，多个意图表示对象按置信度降序排序。

**意图对象**（object）：描述意图的数据（键值对的集合），也是实现意图所需要的参数。

意图表示以 json 语言描述，json 语言中“对象”指的是键值对的集合。

**语义理解示例：**

query：北京西站到无锡的高铁

```json
    {
     "raw_text": "北京西站到无锡的高铁",
     "parsed_text": "北京 西站 到 无锡 的 高铁",
     "results": [
     {
     "domain": "train",
     "intent": "query",
     "score": 1,
     "object": {
     "arrival_city": "无锡",
     "start_city": "北京",
     "start_station": "北京西站",
     "train_type": "高速动车"
     }
     }
     ]
    }
```

## 领域取值

本表格详细描述了领域（domain）的取值。


| 领域名称                 | 描述           | 示例 query                    |
| -------------------- | ------------ | --------------------------- |
| weather              | 天气           | 后天天气如何；明天几度                 |
| calendar日历           | 日历           | 到国庆节还有几天                    |
| train                | 列车           | 早上 8 点前发车去无锡的动车             |
| flight               | 航班           | 飞上海最晚的国航航班                  |
| map                  | 地图           | 西二旗到新街口坐几号线                 |
| telephone            | 电话           | 打电话给李四；查看有没有张三的未接来电         |
| contact              | 联系人          | 找老爸的办公电话                    |
| message              | 短信           | 发短信给小明说下午 3 点文档评审           |
| app                  | 手机应用         | 打开相机；安装百度手机助手               |
| website              | 网站           | 打开百度                        |
| alarm                | 提醒           | 提醒我周五晚上看中国好声音；工作日早上 8 点半叫醒我 |
| sns                  | 社交网络         | 发新浪微博，内容是我结婚了               |
| setting              | 手机设置         | 打开 wifi                     |
| music                | 音乐           | 听刘德华的歌曲                     |
| joke                 | 笑话           | 讲一个笑话                       |
| story                | 故事           | 讲一个故事                       |
| hotel                | 酒店           | 外滩附近速八酒店，商务大床               |
| travel               | 旅游           | 豫园开放时间、门票？                  |
| instruction          | 通用指令         | 打开，关闭                       |
| video                | 视频 （现在只包含影视） | 观看电影阿甘正传                    |
| translation          | 翻译           | hello 的中文翻译                 |
| phone_charges        | 话费流量查询       | 我这个月的话费                     |
| tv_show              | 电视节目         | 我想看快乐大本营                    |
| person               | 人物           | 赵本山的女儿叫什么                   |
| tv_instruction       | 电视指令         | 回看刚才的节目                     |
| stock                | 股票           | 招商银行股票多少钱                   |
| novel                | 小说           | 我想看小说                       |
| player               | 播放器          | 继续播放                        |
| account              | 记账           | 昨天吃饭花了 10 块钱                |
| search               | 搜索           | 搜索步步惊心                      |
| vehicle_instruction  | 车载指令         | 查看胎压                        |
| radio                | 收音机控制指令      | 收听 FM2.1                    |
| recipe               | 菜谱           | 西红柿炒鸡蛋怎么做                   |
| navigate_instruction | 导航指令         | 报告超速                        |
| movie_news           | 影讯           | 最近有啥热门电影                    |

## 意图取值

意图和领域相关，不同领域下有多种意图，我们将意图抽样为一般查询（query）和具体属性值的查询（get）两类，部分领域还有特殊的意图。详见第三节各领域意图表示。

一般查询是指用户对某一个领域的通用查询，不针对特定属性，如“北京到上海的飞机”；具体属性值的查询（下文简称属性查询）是用户针对一个领域的特定属性进行查询，如“ho1252 航班什么时候起飞”，用户查询的是航班 ho1252 的起飞时间属性。

## 属性值类型

基本数据类型，如 string、int、float 之外，还定义了时间（time）、日期（date）、折扣（discount）等属性值类型。

在以上类型定义的基础上，还定义了组合类型和范围类型，如时间日期（date_time）、时间段（time_range）、日期段（date_range）、时间日期段（date_time_range）、金额范围（amount_range）、折扣范围（discount_range）等。

**日期（date）**

格式是：yyyy-mm-dd，4位阿拉伯数字代表年份，2位数字代表月份，2位数字代表日期。支持多种自然语言表述的日期到上述标准格式的归一化解析。


- 一般日期或农历日期。如果没有年或月，则默认当年当月。示例：

    - 2013年1月10号：2013-01-10
    - 8 月 15：2013-08-15
    - 农历二月初一：2013-03-12

- 相对日期，示例：

    - 明天：2013-09-26
    - 下周一：2013-09-30

- 节日，示例：

    - 春节：2013-02-10
    - 明年春节：2014-01-31
    - 父亲节：2013-06-16

**时间（time）**

格式是：hh:mm:ss，24小时制，分别用2位数字代表时、分、秒。支持多种自然语言表述的时间到上述标准格式的归一化解析。示例：

- 十点整：10:00:00
- 下午三点半：15:30:00

**时间日期（date_time）**

时间和日期的组合类型。示例：

query：明天早上八点

```json
    {
     "date":"2013-09-26",
     "time":"08:00:00",
    }
```
**日期段（date_range）**

以逗号间隔的两个日期表示日期段的开始和结束。示例：

- 明后天：2013-09-26,2013-09-27
- 下周末：2013-10-05,2013-10-06

**时间段（time_range）**

以逗号间隔的两个时间表示时间段的开始和结束。如“上午”、“明天下午”等常见的时间段表述，起始和结束的时间点见表格 2-2 常见时间段的开始和结束时间点定义。示例：

- 下午：12:00:00,18:59:59
- 早上：04:00:00,11:59:59

常见时间段的开始和结束时间点定义如下表

| 时间范围表述   | 开始    | 结束    | 时间点   |
| -------- | ----- | ----- | ----- |
| 早晨、早上、黎明 | 04:00 | 11:00 | 06:00 |
| 上午       | 08:00 | 12:00 | 08:00 |
|中午、晌午| 10:00| 14:00| 12:00
|下午、午后 |12:00 |18:00| 13:00
|晚上 |17:00| 24:00| 18:00
|凌晨 |22:00| 04:00 |02:00
|半夜、深夜、午夜| 22:00| 04:00| 02:00  |

**时间日期段（date_time_range）**

以两个时间日期类型的值分别表示时间范围和起始(begin)和结束(end)。示例：

query：明天下午 3 点半到后天早上 8 点

```json
    {
     "begin":{
     "date":"2013-09-26",
     "time":"15:00:00"
     },
     "end":{
     "date":"2013-09-27",
     "time":"08:00:00"
     }
    }
```

query：中秋节假期

```json
    {
     "begin":{
     "date":"2013-09-19",
    "time":"00:00:00"
     },
     "end":{
     "date":"2013-09-21",
     "time":"23:59:59"
    }
    }
```
query：明天晚上

```json
    {
     "begin":{
     "date":"2013-09-26",
     "time":"17:00:00"
     },
     "end":{
     "date":"2013-09-26",
     "time":"23:59:59"
     }
    }
```

**重复时间（repeat_time**）

提醒、闹钟等设置需要用到：示例：

query：每天早上十点

```json
    {
     "time":"10:00:00",
     "repeat":"00001111111",
    }
```

>**注意：**repeat 是 11 个字符的字符串，从左到右分别是月份(0~1)日期(2~3)和星期(4~10)。对月份和日期位，非 0 值代表该月或日期进行提醒，对 7 个星期位，每位对应一天，值为 1 代表该天进行提醒。

query：每天中午十二点整

```json
    {
     "time":"12:00:00",
     "repeat":"00001111111",
    }
```

query：每个月 11 号 12 点

```json
    {
     "time"::"12:00:00",
     "repeat":"00110000000",
    }
```

query：每年的元旦

```json
    {
     "repeat":"01010000000",
    }
```

**金额范围（amount_range）**

以两个浮点数代表金额范围。示例：

```json
    {
     "begin":100.00,
    "end":200.00
    }
```

query：300 元左右

```json
    {
     "begin":240.00,
    "end":360.00
    }
```

query：200 元以下

```json
    {
     "begin":0.00,
    "end":200.00
    }
```

query：300 元以上

```json
    {
     "begin":300.00",
     "end":-1
    }
```

**注意：**-1 代表无穷大。

**折扣（discount）**

价格的折扣，如一折、八五折、半价等，解析成 0 到 1 之间的浮点数。示例：

- 三折:0.3
- 半价:0.5

**折扣范围（discount_range**）

以两个折扣类型的值分别表示折扣范围的最小值(begin)和最大值(end)。示例：

query：三折到八五折:

```json
    {
     "begin":0.3,
    "end":0.85,
    }
```

# 各领域意图表示

## 天气

天气（weather）能支持对天气的一般查询和温度、风速等属性的查询的解析。天气意图表示如下：

![](http://bos.nj.bpc.baidu.com/v1/audio/audio358_tianqi.png)

**示例：**

query：北京明天天气

```json
    {
    "raw_text":"北京明天天气",
    "parsed_text":"北京 明天 天气",
    "results":[
    {
    "domain":"weather",
    "intent":"query",
    "score":1,
    "object":{
    "date": "2013-09-25,2013-09-25",
    "region":"北京"
    }
    }
    ]
    }
```

query：明天几度

```json
    {
    "raw_text": "明天几度",
    "parsed_text": "明天 几 度",
    "results": [
    {
    "domain": "weather",
    "intent": "get",
    "score": 1,
    "object": {
    "focus": "temp",
    "date": "2013-11-22,2013-11-22"
    }
    }
    ]
    }
```

## 日历

日历（calendar）能够支持天数查询和对节日、农历、星座、生肖等特定内容的查询请求的解析。日历意图如下：

![](http://bos.nj.bpc.baidu.com/v1/audio/audio357_rili.png)

 **示例：**

query：今天是几号

```json
{
"raw_text": "今天是几号",
"parsed_text": "今天 是 几 号",
"results": [
{
"domain": "calendar",
"intent": "get",
"score": 1,
"object": {
"focus": "date",
"date": "2013-11-21,2013-11-21"
}
}
]
}
```

## 列车

列车（train）能够支持通用列车信息的查询解析，也可以解析对坐席、列车类别、票价等特殊查询请求的解析。列车意图表示如下：

![](http://bos.nj.bpc.baidu.com/v1/audio/audio456_lieche.png)

**示例：**

query：北京西站到上海的高铁

```json
{
"raw_text": "北京西站到上海的高铁",
"parsed_text": "北京 西站 到 上海 的 高铁",
"results": [
{
"domain": "train",
"intent": "query",
"score": 1,
"object": {
"arrival_city": "上海",
"start_city": "北京",
"start_station": "北京西站",
"train_type": "高速动车"
}
}
]
}
```

query：北京西到无锡的动车几点发车

```json
{
"raw_text": "北京西到无锡的动车几点发车",
"parsed_text": "北京 西 到 无锡 的 动车 几 点 发车",
"results": [
{
"domain": "train",
"intent": "get",
"score": 1,
"object": {
"focus": "starttime",
"arrival_city": "无锡",
"get>starttime": "几点发车",
"start_city": "北京",
"start_station": "北京西",
"train_type": "动车组"
}
}
]
}
```

query：北京到上海的动车多少钱

```json
{
"raw_text":"北京到上海的动车多少钱",
"parsed_text":"北京 到 上海 的 动车 多少 钱",
"results":[
{
"domain":"train",
"intent":"get",
"score":1,
"object":{
"focus":"price",
"arrival_city":"上海",
"start_city":"北京",
"train_type":"动车组"
}
}
]
}
```

## 航班

航班（flight）支持基于航班类型、出发日期、航空公司、城市等的航班信息、机票信息的语义解析。航班意图表示：

![](http://bos.nj.bpc.baidu.com/v1/audio/audio360_hangban.png)


**示例：**

query：明天从北京到上海的东航客机

```json
    {
    "raw_text":"明天从北京到上海的东航客机",
    "parsed_text":"明天 从 北京 到 上海 的 东航 客机",
    "results":[
    {
    "domain":"flight",
    "intent":"query",
    "score":1,
    "object":{
    "start_date":" 2013-09-26,2013-09-26",
    "start_city":"北京",
    "arrival_city":"上海",
    "airline":"东方航空"
    }
    }
    ]
    }
```

query：明天北京飞上海东航的机票

```json
    {
    "raw_text":"明天北京飞上海东航的机票",
    "parsed_text":"明天 北京 飞 上海 东航 的 机票",
    "results":[
    {
    "domain":"flight",
    "intent":"query",
    "score":1,
    "object":{
    "start_date":"2013-09-26,2013-09-26",
    "start_city":"北京",
    "arrival_city":"上海",
    "airline":"东方航空"
    }
    }
    ]
    }
```

## 地图

地图（map）支持基于路线查询、附近信息查和地点查询的语义解析。地图意图表示：

![](http://bos.nj.bpc.baidu.com/v1/audio/audio362_ditu.png)

**示例：**

query：从西二旗到天安门不走高速

```json
    {
    "raw_text":"从西二旗到天安门不走高速",
    "parsed_text":"从 西二旗 到 天安门 不走 高速",
    "results":[
    {
    "domain":"map",
    "intent":"route",
    "score":1,
    "object":{
    "start":"西二旗",
    "arrival":"天安门",
    "drive_sort":"less_motorway ",
    " route_type ":"drive"
    }
    }
    ]
    }
```

query：西二旗附近的餐厅

```json
    {
    "raw_text": "西二旗附近的餐厅",
    "parsed_text": "西二旗 附近 的 餐厅",
    "results": [
    {
    "domain": "map",
    "intent": "nearby",
    "score": 1,
    "object": {
    "centre": "西二旗",
    "keywords": "餐厅"
    }
    }
    ]
    }
```

## 电话

电话（telephone）提供常用的拨打电话、通话记录查看等操作的语义解析。电话意图表示：

![](http://bos.nj.bpc.baidu.com/v1/audio/audio363_dianhua.png)

**示例：**

query：打电话给妈妈北京移动的号码

```json
    {
    "raw_text":"打电话给妈妈北京移动的号码",
    "parsed_text":"打电话 给 妈妈 北京 移动 的 号码",
    "results":[
    {
    "domain":"telephone",
    "intent":"call",
    "score":1,
    "object":{
    "name":"妈妈",
    "operator":"移动",
    "location":"北京"
    }
    }
    ]
    }
```

query：显示没接听的电话

```json
    {
    "raw_text":"显示没接听的电话",
    "parsed_text":"显示 没 接听 的 电话",
    "results":[
    {
    "domain":"telephone",
    "intent":"view",
    "score":1,
    "object":{
    "call_type":"view_missed"
    }
    }
    ]
    }
```

## 通讯录

通讯录（contacts）提供常用的通讯录操作如新建、查看等操作的语义解析支持。通讯录意图表示：
 
![](http://bos.nj.bpc.baidu.com/v1/audio/audio364_tongxunlu.png)

**示例：**

query：查一下玉洁的手机号码

```json
    {
    "raw_text":"查一下玉洁的手机号码",
    "parsed_text":"查 一 下 玉洁 的 手机 号码",
    "results":[
    {
    "domain":"contacts",
    "intent":"view",
    "score":1,
    "object":{
    "name":"玉洁",
    "type":"mobile"
    }
    }
    ]
    }
```

query：新建联系人姓名玉洁号码13641096029

```json
    {
    "raw_text":"新建联系人姓名玉洁号码 13641096029",
    "parsed_text":"新建 联系人 姓名 玉洁 号码 13641096029",
    "results":[
    {
    "domain":"contacts",
    "intent":"create",
    "score":1,
    "object":{
    "name":"玉洁",
    "number":"13641096029"
    }
    }
    ]
    }
```

## 短信

短信（message）提供常用的短信操作的语义解析支持。短信意图表示：

![](http://bos.nj.bpc.baidu.com/v1/audio/audio365_duanxin.png)

>**注意：**祝福短信(wishes)的内容可扩展，现在主要有：七夕,万圣节,中秋节,乔迁,健康,儿童节,元宵节,元旦,劳动节,升职,周末,国庆节,圣诞节,复活节,女生节,妇女节,寒假,小年,平安夜,幽默,开业,开学,思念,思恋,情人节,情话,愚人节,感恩节,感谢,护士节,教师节,早安,春节,晚安,暑假,母亲节,毕业,求婚,清明节,爱情,父亲节,生子,生日,生活,生病,端午节,结婚,致谢,表白,记者节,送别,道歉,重阳节,除夕,青年节,高考。

**示例：**

query：给玉洁发短信说我下周请你吃饭

```json
    {
    "raw_text":"给玉洁发短信说我下周请你吃饭",
    "parsed_text":"给 玉洁 发短信 说 我 下周 请你吃饭",
    "results":[
    {
    "domain":"message",
    "intent":"send",
    "score":1.0,
    "object":{
    "name":[
    "玉洁"
    ],
    "msgbody":"我下周请你吃饭"
    }
    }
    ]
    }
```

query：给李明明发一条春节祝福短信

```json
    {
    "raw_text":"给李明明发一条春节祝福短信",
    "parsed_text":"给 李明明 发 一 条 春节 祝福 短信",
    "results":[
    {
    "domain":"message",
    "intent":"send",
    "score":1.0,
    "object":{
    "name":[
    "李明明"
    ],
    "msgbody":"合家团圆",
    "wishes":[
    "春节好",
    "春节快乐",
    "新春快乐"
    ]
    }
    }
    ]
    }
```

query：查看未读短信

```json
    {
    "raw_text":"查看未读短信",
    "parsed_text":"查看 未 读 短信",
    "results":[
    {
    "domain":"message",
    "intent":"view",
    "score":1.0,
    "object":{
    "sms_type":"unread"
    }
    }
    ]
    }
```

## 手机应用

手机应用（app）用于对手机应用的搜索、下载、安装、打开、分享等操作的语义解析支持。app 意图表示:
 
![](http://bos.nj.bpc.baidu.com/v1/audio/audio366_yingyong.png)

**示例：**

query：打开百度语音助手

```json
    {
    "raw_text":"打开百度语音助手",
    "parsed_text":"打开 百度 语音 助手",
    "results":[
    {
    "domain":"app",
    "intent":"open",
    "score":1.0,
    "object":{
    "appname":"百度语音助手"
    }
    }
    ]
    }
```

query：通过 91 帮我下一款益智类的游戏

```json
    {
    "raw_text": "通过 91 帮我下一款益智类的游戏",
    "parsed_text": "通过 91 帮 我 下 一款 益智类 的 游戏",
    "results": [
    {
    "domain": "app",
    "intent": "download",
    "score": 1,
    "object": {
    "channel": "91",
    "category": [
    "休闲益智"
    ]
    }
    }
    ]
    }
```

## 网站

网站（website）用于支持基于网站名或 URL 网址的打开、搜索和查询的语义解析。网站意图表示:

![](http://bos.nj.bpc.baidu.com/v1/audio/audio367_wangzhan.png)

**示例：**

query：用 ie 打开百度首页

```json
    {
    "raw_text":"用 ie 打开百度首页",
    "parsed_text":"用 ie 打开 百度 首页",
    "results":[
    {
    "domain":"website",
    "intent":"open",
    "score":1.0,
    "object":{
    "sitename":"百度",
    "browser":"ie"
    }
    }
    ]
    }
```

## 日程提醒

日程提醒（alarm）提供新建、查看和删除提醒等操作的语义解析。日程提醒意图表示:

![](http://bos.nj.bpc.baidu.com/v1/audio/audio402_QQjietu20150420015915.png)

**示例：**

query：提醒我早上 8 点准时起床去拜年

```json
    {
    "raw_text":"提醒我早上 8 点准时起床去拜年",
    "parsed_text":"提醒 我 早上 8 点 准时 起床 去 拜年",
    "results":[
    {
    "domain":"alarm",
    "intent":"insert",
    "score":1,
    "object":{
    "type":"absolute",
    "date":"2013-09-04",
    "time":"08:00:00",
    "event":"准时起床去拜年"
    }
    }
    ]
    }
```

query：每天 10 点提醒我开会

```json
    {
    "raw_text":"每天 10 点提醒我开会",
    "parsed_text":"每天 10 点 提醒 我 开会",
    "results":[
    {
    "domain":"alarm",
    "intent":"insert",
    "score":1,
    "object":{
    "type":"repeat",
    "time":"10:00:00",
    "repeat":"00001111111",
    "event":"开会"
    }
    }
    ]
    }
```

query：1 个小时之后提醒我吃饭

```json
    {
    "raw_text":"1 个小时之后提醒我吃饭",
    "parsed_text":"1 个 小时 之后 提醒 我 吃饭",
    "results":[
    {
    "domain":"alarm",
    "intent":"insert",
    "score":1,
    "object":{
    "type":"relative",
    "interval":3600,
    "event":"吃饭"
    }
    }
    ]
    }
```
## 社交网络

社交网络（sns）用于支持基于常用社交网络如微博、人人等的消息发送、查看和分享等操作的语义解析。社交网络意图表示:

![](http://bos.nj.bpc.baidu.com/v1/audio/audio401_QQjietu20150420015323.png)

**示例：**

query：发送一条新浪微博埃特晓明就说今天天气不错

```json
    {
    "raw_text":"发送一条新浪微博埃特晓明就说今天天气不错",
    "parsed_text":"发送 一 条 新浪 微博 埃特 晓明 就 说 今天 天气 不错",
    "results":[
    {
    "domain":"sns",
    "intent":"send",
    "score":0.6,
    "object":{
    "channel":[
    "sina"
    ],
    "at":[
    "晓明"
    ],
    "content":"今天天气不错"
    }
    }
    ]
    }
```

query：刷新腾讯微博

```json
    {
    "raw_text":"刷新腾讯微博",
    "parsed_text":"刷新 腾讯 微博",
    "results":[
    {
    "domain":"sns",
    "intent":"refresh",
    "score":1,
    "object":{
    "channel":[
    "qq"
    ]
    }
    }
    ]
    }
```
## 手机设置

手机设置（setting）提供对手机各项设置的语义解析。手机设置意图表示:

![](http://bos.nj.bpc.baidu.com/v1/audio/audio427_shoujishezhi1.png)

![](http://bos.nj.bpc.baidu.com/v1/audio/audio428_shoujishezhi2.png)

**示例：**

query：打开 gps

```json
    {
     "raw_text":"打开 gps",
     "parsed_text":"打开 gps",
     "results":[
     {
     "domain":"setting",
     "intent":"set",
     "score":1.0,
     "object":{
     "settingtype":"gps_on"
     }
     }
     ]
     }
```
query：进入时间日期设置

```json
    {
     "raw_text":"进入时间日期设置",
     "parsed_text":"进入 时间 日期 设置",
     "results":[
     {
     "domain":"setting",
     "intent":"set",
     "score":1,
     "object":{
     "settingtype":"date_setting"
     }
     }
     ]
    }
```
## 音乐

音乐（music）提供对音乐播放控制、搜索和下载等的语义解析支持。音乐意图表示：

![](http://bos.nj.bpc.baidu.com/v1/audio/audio430_yinle.png)

**示例：**

query：播放刘德华的歌曲冰雨

```json
    {
     "raw_text": "播放刘德华的歌曲冰雨",
     "parsed_text": "播放 刘德华 的 歌曲 冰雨",
     "results": [
     {
     "domain": "music",
     "intent": "play",
     "score": 1,
     "object": {
     "name": "冰雨",
     "byartist": [
     "刘德华"
     ]
     }
     }
     ]
    }
```

query：天龙八部的片尾曲

```json
    {
     "raw_text": "天龙八部的片尾曲",
     "parsed_text": "天龙八部 的 片尾曲",
     "results": [
     {
     "domain": "music",
     "intent": "search",
     "score": 1,
     "object": {
     "tv": "天龙八部",
     "genre": "片尾曲"
     }
     }
     ]
    }
```

query：适合 80 后听的伤感英文歌曲

```json
    {
     "raw_text": "适合 80 后听的伤感英文歌曲",
     "parsed_text": "适合 80 后 听 的 伤感 英文 歌曲",
     "results": [
     {
     "domain": "music",
     "intent": "search",
     "score": 1,
     "object": {
     "audience": "80 后",
     "inlanguage": "英语",
     "tag": [
     "伤感"
     ]
     }
     }
     ]
    }
```

## 笑话

笑话（joke）提供对笑话的搜索和播放控制的语义解析支持。笑话意图表示：

![](http://bos.nj.bpc.baidu.com/v1/audio/audio432_xiaohua.png)

**示例：**

query：适合约会时候讲的有趣笑话

```json
    {
     "raw_text":"适合约会时候讲的有趣笑话",
     "parsed_text":"适合 约会 时候 讲 的 有趣 笑话",
     "results":[
     {
     "domain":"joke",
     "intent":"search",
     "score":0.916667,
     "object":{
     "tag":[
     "有趣"
     ],
     "sence":"约会"
     }
     }
     ]
    }
```

query：讲一个睡觉前儿童听的笑话

```json
    {
     "raw_text":"讲一个睡觉前儿童听的笑话",
     "parsed_text":"讲 一 个 睡觉 前 儿童 听 的 笑话",
     "results":[
     {
     "domain":"joke",
     "intent":"play",
     "score":0.916667,
     "object":{
     "sence":"睡前",
     "audience":"儿童"
     }
     }
     ]
    }
```

## 故事

故事（story）提供对故事的搜索和播放控制的语义解析支持。故事意图表示：

![](http://bos.nj.bpc.baidu.com/v1/audio/audio433_gushi.png)

**示例：**

query：讲一个睡觉前儿童听的温馨的小故事

```json
    {
     "raw_text":"讲一个睡觉前儿童听的温馨的小故事",
     "parsed_text":"讲 一 个 睡觉 前 儿童 听 的 温馨 的 小 故事",
     "results":[
     {
     "domain":"story",
     "intent":"play",
     "score":0.9375,
     "object":{
     "sence":"睡前",
     " audience":"儿童",
     "tag":[
     "温馨"
     ]
     }
     }
     ]
    }
```

## 酒店

酒店（hotel）提供对酒店查询的语义解析支持，支持房间类型、酒店星级、所在城市、设施和服务等的细节解析。酒店意图表示：

![](http://bos.nj.bpc.baidu.com/v1/audio/audio434_jiudian.png)

**示例：**

query：北京五星级大酒店

```json
    {
     "raw_text":"北京五星级大酒店",
     "parsed_text":"北京 五星级 大酒店",
     "results":[
     {
     "domain":"hotel",
     "intent":"query",
     "score":1,
     "object":{
     "city":"北京",
     "star":"5"
     }
     }
     ]
    }
```

## 旅游

旅游（travel）支持对旅游景点的相关信息（如门票价格、开放时间等）查询的语义解析。旅游意图表示：

![](http://bos.nj.bpc.baidu.com/v1/audio/audio459_travel.png)

**示例：**

query：北京有什么博物馆

```json
    {
     "raw_text":"北京有什么博物馆",
     "parsed_text":"北京 有 什么 博物馆",
     "results":[
     {
     "domain":"travel",
     "intent":"query",
     "score":1,
     "object":{
     "destination":"北京",
     "topic":"博物馆"
     }
     }
     ]
    }
```
query：故宫门票价格

```json
    {
     "raw_text": "故宫门票价格",
     "parsed_text": "故宫 门票 价格",
     "results": [
     {
     "domain": "travel",
     "intent": "get",
     "score": 1,
     "object": {
     "focus": "price",
     "view_spot": "故宫"
     }
     }
     ]
    }
```
## 通用指令

通用指令（instruction）提供对各场景中通用命令的语义解析支持。通用指令意图表示：

![](http://bos.nj.bpc.baidu.com/v1/audio/audio436_tongyongzhiling.png)

**示例：**

query：代开

```json
    {
    "raw_text": "代开",
    "parsed_text": "代 开",
    "results": [
    {
    "domain": "instruction",
    "intent": "open",
    "score": 1,
    "object": {}
    }
    ]
    }
```

query：还剩多少电量

```json
    {
     "raw_text": "还剩多少电量",
     "parsed_text": "还剩 多少 电量",
     "results": [
     {
     "domain": "instruction",
     "intent": "view",
     "score": 1,
     "object": {
     "item": "电量"
     }
     }
     ]
    }
```

## 翻译

翻译（translation）提供句子翻译需求的语义解析支持。翻译意图表示：

![](http://bos.nj.bpc.baidu.com/v1/audio/audio438_fanyi.png)

>**注意：**
>
1. 为了统一表示语言，分别用数字代号表示语言，语言的代号见附录1。
2. 支持所有语言方向之间，但是系统只探测中英日三种翻译字符串语言。

**示例：**

query：成王败寇的泰语翻译

```json
    {
     "raw_text": "成王败寇的泰语翻译",
     "parsed_text": "成王败寇 的 泰语翻译",
     "results": [
     {
     "domain": "translation",
     "intent": "translate",
     "score": 0.555556,
     "object": {
     "transbody": "成王败寇",
     "source": "1",
     "target": "6"
     }
     }
     ]
    }
```

query：成王败寇什么意思

```json
    {
     "raw_text": "成王败寇什么意思",
     "parsed_text": "成王败寇 什么 意思",
     "results": [
     {
     "domain": "translation",
     "intent": "translate",
     "score": 0.5,
     "object": {
     "transbody": "成王败寇",
     "source": "1"
     }
     }
     ]
    }
```

## 话费流量查询

话费流量（phone_charges）提供手机流量、话费、账户余额、欠费查询的语义解析支持。话费流量查询意图表示:

![](http://bos.nj.bpc.baidu.com/v1/audio/audio439_huafeiliuliangchaxun.png)

**示例：**

query：我还剩多少话费

```json
    {
     "raw_text": "我还剩多少话费",
     "parsed_text": "我 还剩 多少 话费",
     "results": [
     {
     "domain": "phone_charges",
     "intent": "search",
     "score": 1,
     "object": {
     "phonenumber": "0",
     "item": "left",
     "subject": "charge"
     }
     }
     ]
    }
```

query：13641096027 这个月用了多少流量

```json
    {
     "raw_text": "13641096027 这个月用了多少流量",
     "parsed_text": "13641096027 这个 月 用 了 多少 流量",
     "results": [
     {
     "domain": "phone_charges",
     "intent": "search",
     "score": 1,
     "object": {
     "phonenumber": "13641096027",
     "date": "2015-01-01,2015-01-31",
     "item": "spend",
     "subject": "flow"
     }
     }
     ]
    }
```

## 视频

视频（video）提供视频下载、推荐、在线播放、查询等方面的语义解析。视频意图表示

![](http://bos.nj.bpc.baidu.com/v1/audio/audio440_shipin.png)

>**注意：**目前只支持影视。

**示例：**

query：2013 年好看的恐怖电影

```json
    {
     "raw_text": "2013 年好看的恐怖电影",
     "parsed_text": "2013 年 好看 的 恐怖 电影",
     "results": [
     {
     "domain": "video",
     "intent": "search",
     "score": 1,
     "object": {
     "datepublish": "2013-01-01,2013-12-31",
     "sub_type": "movie",
     "keywords": [
     "好看"
     ],
     "type": [
     "恐怖"
     ]
     }
     }
     ]
    }
```

query：我想看韩剧继承者们的最后一集

```json
    {
     "raw_text": "我想看韩剧继承者们的最后一集",
     "parsed_text": "我想看 韩剧 继承者 们 的 最后 一 集",
     "results": [
     {
     "domain": "video",
     "intent": "play",
     "score": 1,
     "object": {
     "country": "韩国",
     "sub_type": "serial",
     "name": "继承者们",
     "episode": "-1"
     }
     }
     ]
    }
```

## 电视节目

电视节目（tv_show）提供电视节目查询、下载、在线观看、播出时间查询等方面的语义解析。电视节目意图表示：

![](http://bos.nj.bpc.baidu.com/v1/audio/audio441_dianshijiemu.png)

**示例：**

query：观看上一期的快乐大本营

```json
    {
     "raw_text": "观看上一期的快乐大本营",
     "parsed_text": "观看 上 一期 的 快乐大本营",
     "results": [
     {
     "domain": "tv_show",
     "intent": "play",
     "score": 1,
     "object": {
     "period": "-1",
     "name": "快乐大本营"
     }
     }
     ]
    }
```

query：看一看昨天的新闻联播

```json
    {
     "raw_text": "看一看昨天的新闻联播",
     "parsed_text": "看一看 昨天 的 新闻 联播",
     "results": [
     {
     "domain": "tv_show",
     "intent": "play",
     "score": 1,
     "object": {
     "datepublish": "2014-01-09,2014-01-09",
     "name": "新闻联播"
     }
     }
     ]
    }
```

## 人物
人物（person）提供人物身高、体重、年龄的方面的语义解析支持。人物意图表示：
 
![](http://bos.nj.bpc.baidu.com/v1/audio/audio460_renwu.png)

**示例：**

query：歌手刘德华身高是多少

```json
    {
     "raw_text": "歌手刘德华身高是多少",
     "parsed_text": "歌手 刘德华 身高 是 多少",
     "results": [
     {
     "domain": "person",
     "intent": "get",
     "score": 1,
     "object": {
     "title": "歌手",
     "person": "刘德华",
     "focus": "height"
     }
     }
     ]
    }
```

## 电视指令
电视指令（tv_instruction）提供电视调台、屏幕调节、截屏等电视指令的语义解析。电视指令意图表示：

![](http://bos.nj.bpc.baidu.com/v1/audio/audio454_dianshizhiling.png)

**示例：**

query：调台到 15 频道

```json
    {
     "raw_text": "调台到 15 频道",
     "parsed_text": "调 台 到 15 频道",
     "results": [
     {
     "domain": "tv_instruction",
     "intent": "change_channel",
     "score": 1,
     "object": {
     "channel": "15"
     }
     }
     ]
    }
```

query：返回刚才的节目

```json
    {
     "raw_text": "返回刚才的节目",
     "parsed_text": "返回 刚才 的 节目",
     "results": [
     {
     "domain": "tv_instruction",
     "intent": "look_back",
     "score": 1,
     "object": {}
     }
     ]
    }
```

query：中央台接下来演什么

```json
    {
     "raw_text": "中央台接下来演什么",
     "parsed_text": "中央台 接下来 演 什么",
     "results": [
     {
     "domain": "tv_instruction",
     "intent": "get",
     "score": 1,
     "object": {
     "station": "cctv-1",
     "focus": "programs"
     }
     }
     ]
    }
```

## 股票

股票（stock）支持股票查询语义解析。股票意图表示：

![](http://bos.nj.bpc.baidu.com/v1/audio/audio453_gupiao.png)

**示例：**

query：股市行情

```json
    {
     "raw_text": "股市行情",
     "parsed_text": "股市 行情",
     "results": [
     {
     "domain": "stock",
     "intent": "search",
     "score": 1,
     "object": {
     "invest_type": "股票"
     }
     }
     ]
    }
```

query：招商银行股票多少钱

```json
    {
     "raw_text": "招商银行股票多少钱",
     "parsed_text": "招商 银行 股票 多少 钱",
     "results": [
     {
     "domain": "stock",
     "intent": "get",
     "score": 1,
     "object": {
     "code": "03968",
     "invest_type": "股票",
     "focus": "price"
     }
     }
     ]
    }
```

## 小说
小说（novel）提供对小说下载、在线阅读、推荐、搜索等的语义解析支持。小说意图表示：

![](http://bos.nj.bpc.baidu.com/v1/audio/audio452_xiaoshuo.png)

**示例：**

query：在线阅读步步惊心第一部

```json
    {
     "raw_text": "在线阅读步步惊心第一部",
     "parsed_text": "在线 阅读 步步惊心 第 一 部",
     "results": [
     {
     "domain": "novel",
     "intent": "read",
     "score": 1,
     "object": {
     "name": "步步惊心",
     "season": "1"
     }
     }
     ]
    }
```

query：我想看一部武侠小说

```json
    {
     "raw_text": "我想看一部武侠小说",
     "parsed_text": "我想看 一 部 武侠小说",
     "results": [
     {
     "domain": "novel",
     "intent": "search",
     "score": 1,
     "object": {
     "genre": [
     "武侠"
     ]
     }
     }
     ]
    }
```

## 播放器

播放器（player）提供对音乐的暂停、播放等控制指令的语义解析。播放器意图表示：

![](http://bos.nj.bpc.baidu.com/v1/audio/audio451_bofangqi.png)

**示例：**

query：暂停播放

```json
    {
     "raw_text": "暂停播放",
     "parsed_text": "暂停 播放",
     "results": [
     {
     "domain": "player",
     "intent": "set",
     "score": 1,
     "object": {
     "action_type": "pause"
     }
     }
     ]
    }
```

query：从第十三分钟开始播放

```json
    {
     "raw_text": "从第十三分钟开始播放",
     "parsed_text": "从 第 十三 分钟 开始 播放",
     "results": [
     {
     "domain": "player",
     "intent": "locate",
     "score": 1,
     "object": {
     "minute": "13"
     }
     }
     ]
    }
```

## 记账

记账（account）提供对记账口语表述的语义解析支持，能提供收支信息等。记账意图表示：

![](http://bos.nj.bpc.baidu.com/v1/audio/audio450_jizhang.png)

**示例：**

query：昨天 11 点半吃饭花了 30

```json
    {
     "raw_text": "昨天 11 点半吃饭花了 30",
     "parsed_text": "昨天 11 点 半 吃饭 花 了 30",
     "results": [
     {
     "domain": "account",
     "intent": "expend",
     "score": 1,
     "object": {
     "_amount": "30",
     "_date": "昨天",
     "_expend_on": "吃饭",
     "_time": "11 点半",
     "amount": "30",
     "date": "2014-01-15,2014-01-15",
     "expend_on": "餐饮>其他",
     "keywords": "吃饭",
     "time": "11:30:00,11:30:59"
     }
     }
     ]
    }
```

query：今天工资发了 5000

```json
    {
     "raw_text": "今天工资发了 5000",
     "parsed_text": "今天 工资 发 了 5000",
     "results": [
     {
     "domain": "account",
     "intent": "income",
     "score": 1,
     "object": {
     "_amount": "5000",
     "_date": "今天",
     "amount": "5000",
     "date": "2014-01-16,2014-01-16",
     "income_from": "工资"
     }
     }
     ]
    }
```

## 搜索

搜索（search）提供知识搜索方面的语义解析。搜索意图表示

![](http://bos.nj.bpc.baidu.com/v1/audio/audio449_sousuo.png)

**示例：**

query：百度一下明天天气

```json
    {
     "raw_text": "百度一下明天天气",
     "parsed_text": "百度一下 明天 天气",
     "results": [
     {
     "domain": "search",
     "intent": "search",
     "score": 0.5,
     "object": {
     "channel": "baidu",
     "content": "明天天气"
     }
     }
     ]
    }
```

query：上网搜搜去天安门的路线

```json
    {
     "raw_text": "上网搜搜去天安门的路线",
     "parsed_text": "上网 搜搜 去 天安门 的 路线",
     "results": [
     {
     "domain": "search",
     "intent": "search",
     "score": 0.363636,
     "object": {
     "source": "net",
     "content": "去天安门的路线"
     }
     }
     ]
    }
```

## 车载指令
车载指令（vehicle_instruction）提供用于车载环境的打开、关闭设备、蓝牙、空调控制等功能的语义解析。车载指令意图表述：

![](http://bos.nj.bpc.baidu.com/v1/audio/audio448_chezaizhiling.png)

**示例**

query：打开空调

```json
    {
     "raw_text": "打开空调",
     "parsed_text": "打开 空调",
     "results": [
     {
     "domain": "vehicle_instruction",
     "intent": "open",
     "score": 1,
     "object": {
     "_equipment": "空调",
     "equipment": "air_conditioner"
     }
     }
     ]
    }
```

query：空调调到 35 度

```json
    {
     "raw_text": "空调调到 35 度",
     "parsed_text": "空调 调到 35 度",
     "results": [
     {
     "domain": "vehicle_instruction",
     "intent": "set_ac",
     "score": 1,
     "object": {
     "temp": "35"
     }
     }
     ]
    }
```

## 收音机控制指令

收音机控制指令（radio）提供对收音机调台、模式切换等命令的解析支持。收音机控制指令需求表示：

![](http://bos.nj.bpc.baidu.com/v1/audio/audio447_shouyinjikongzhizhiling.png)

**示例**

query：打开收音机

```json
    {
     "raw_text": "打开收音机",
     "parsed_text": "打开收音机",
     "results": [
     {
     "domain": "radio",
     "intent": "open",
     "score": 1,
     "object": {
    
     }
     }
     ]
    }
```

query：收听 am101.1

```json
    {
     "raw_text": "收听 am101.1",
     "parsed_text": "收听 am101.1",
     "results": [
     {
     "domain": "radio",
     "intent": "tune",
     "score": 1,
     "object": {
     "channel": "am101.1"
     }
     }
     ]
    }
```

## 菜谱

菜谱（recipe）提供菜谱查询、推荐等语义解析的支持。菜谱意图表示：

![](http://bos.nj.bpc.baidu.com/v1/audio/audio446_caipu.png)

**示例：**

query：推荐一道春节吃的川菜

```json
    {
     "raw_text": "推荐一道春节吃的川菜",
     "parsed_text": "推荐 一 道 春节 吃 的 川菜",
     "results": [
     {
     "domain": "recipe",
     "intent": "recommend",
     "score": 1,
     "object": {
     "sence": "春节",
     "genre": "川菜"
     }
     }
     ]
    }
```

query：西红柿炒鸡蛋的做法

```json
    {
     "raw_text": "西红柿炒鸡蛋的做法",
     "parsed_text": "西红柿 炒鸡蛋 的 做法",
     "results": [
     {
     "domain": "recipe",
     "intent": "search",
     "score": 1,
     "object": {
     "name": "西红柿炒鸡蛋"
     }
     }
     ]
    }
```

## 影讯

影讯（movie_news）提供电影、电影院相关信息的查询（如电影上映时间、影院电影排期等）。影讯意图表示：

![](http://bos.nj.bpc.baidu.com/v1/audio/audio445_yingxun.png)

**示例：**

query：明天北京的影院有啥好看的电影

```json
    {
     "raw_text": "明天北京的影院有啥好看的电影",
     "parsed_text": "明天 北京 的 影院 有啥 好看 的 电影",
     "results": [
     {
     "domain": "movie_news",
     "intent": "get_schedule",
     "score": 0.583994,
     "object": {
     "_date": "明天",
     "date": "2014-01-17,2014-01-17",
     "region": "北京"
     }
     }
     ]
}
```

query：平顶山星美影讯

```json
    {
     "raw_text": "平顶山星美影讯",
     "parsed_text": "平顶山 星美 影讯",
     "results": [
     {
     "domain": "movie_news",
     "intent": "get_schedule",
     "score": 1,
     "object": {
     "cinema": "星美",
     "region": "平顶山"
     }
     }
     ]
    }
```

## 导航指令

导航指令（navigate_instruction）提供用于导航需求的语义解析支持。导航指令意图表示：

![](http://bos.nj.bpc.baidu.com/v1/audio/audio442_daohangzhiling1.png)

![](http://bos.nj.bpc.baidu.com/v1/audio/audio443_daohangzhiling2.png)

![](http://bos.nj.bpc.baidu.com/v1/audio/audio444_daohangzhiling3.png)

**示例**

query：缩小地图

```json
    {
     "raw_text": "缩小地图",
     "parsed_text": "缩小 地图",
     "results": [
     {
     "domain": "navigate_instruction",
     "intent": "zoom_out",
     "score": 1,
     "object": {}
     }
     ]
    }
```

query：关闭导航

```json
    {
     "raw_text": "关闭导航",
     "parsed_text": "关闭 导航",
     "results": [
     {
     "domain": "navigate_instruction",
     "intent": "quit",
     "score": 1,
     "object": {}
     }
     ]
    }
```