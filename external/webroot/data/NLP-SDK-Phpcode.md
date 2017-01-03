#PHP SDK文档

本文档主要介绍NLP PHP SDK的安装和使用。在使用本文档前，您需要先了解自然语言处理（Natural Language Processing）的基础知识，并已经开通了服务。

# 安装PHP SDK

**BFR PHP SDK目录结构**

    BFR
           ├── AipNlp.php                      //NLP客户端类
           ├── lib
           │      ├── AipHttpClient.php        //内部http请求类
           │      ├── AipBCEUtil.php           //内部工具类
           │      ├── AipBase                  //Aip基类
           └── demo     
                  └── DemoNlpFace.php          //NLP服务示例

**使用SDK**

步骤如下：

1.在[官方网站](https://ai.baidu.com/sdk)下载PHP SDK压缩工具包。

2.将下载的`aip-nlp-php-sdk-version.zip`解压后，复制AipNlp.php以及lib/*到工程文件夹中。

3.引入AipNlp.php


# 快速入门

AipNlp类是与Nlp交互的客户端，所有Nlp操作都是通过AipNlp完成的。

## 初始化AipNlp

AipNlp类是Nlp的PHP SDK客户端，为使用Natural Language Processing的开发人员提供了一系列的交互方法。

用户可以参考如下代码新建一个AipNlp对象：

```php
// 引入NLP SDK
require_once 'AipNlp.php';

// 定义常量
const APP_ID = '000212'
const API_KEY = '020947f506934fe5b39763080359f0f8';
const API_SECRET = '9cb5e2bf0e7045d78d7b27f62337f4cc';

// 初始化AipNlp对象
$AipNlp = new AipNlp(APP_ID, API_KEY, API_SECRET);
```

在上面代码中，常量`APP_ID`在百度云控制台中创建，常量`API_KEY`与`API_SECRET`是由系统分配给用户的，均为字符串，用于标识用户，为访问BFR做签名验证。其中`API_KEY`对应控制台中的“Access Key ID”，`SECRET_ACCESS_KEY`对应控制台中的“Access Key Secret”，获取方式请参考[获取AK/SK](../Reference/GetAKSK)。


# 分词

举例，要对字符串'你好百度'进行分词：

```php
// 引入NLP SDK
require_once 'AipNlp.php';

// 定义常量
const APP_ID = '000212'
const API_KEY = '020947f506934fe5b39763080359f0f8';
const API_SECRET = '9cb5e2bf0e7045d78d7b27f62337f4cc';

// 初始化ApiNlp
$client = new AipNlp(APP_ID, ACCESS_KEY_ID, SECRET_ACCESS_KEY);

// 调用分词接口
$response = $client->wordsegApi('你好百度');
```
如果还想增加一些自定义参数配置：

```php
// 引入NLP SDK
require_once 'AipNlp.php';

// 定义常量
const APP_ID = '000212'
const API_KEY = '020947f506934fe5b39763080359f0f8';
const API_SECRET = '9cb5e2bf0e7045d78d7b27f62337f4cc';

// 初始化ApiNlp
$client = new AipNlp(APP_ID, ACCESS_KEY_ID, SECRET_ACCESS_KEY);

// 定义参数变量
$option = array('lang_id' => 1);

// 调用分词接口
$response = $client->wordsegApi('你好百度', $option);
```

**分词 请求参数详情**

| 参数 | 类型 | 描述 | 是否必须 |
| :---- | :---- | :---- | :---- |
|query|String|待分词的文本，目前输入编码统一为GBK|是|
|lang_id|Int|默认为1，输入字符串的语言对应的id，简体中文设置为1（目前不支持其他语言）|否|

**分词 返回数据参数详情**

| 参数 | 类型 | 描述 |
| :---- | :---- | :---- |
|wordsepbuf|String|基本词粒度结果，以\t分割|
|wsbtermcount|Int|基本词粒度输出的词个数|
|wsbtermoffsets|Int[]|该参数为列表，元素个数为切分出来的词个数，每个元素值表示对应的基本词在被切分文本的起始位置（字节偏移）|
|wsbtermpos|String|参数值为列表，元素值为对应切分出来的基本词在 wordsepbuf的字节偏移以及长度，整数的低24bit为偏移，高8bit为长度|
|wpcompbuf|String|混排粒度结果，以\t分割|
|wpbtermcount|Int|混排粒度输出的词个数|
|wpbtermoffsets|Int[]|该参数为列表，元素个数为切分出来的词个数，每个元素值表示对应的词是从第几个基本词开始的（基本词偏移）|
|wpbtermpos|Int[]|参数值为列表，元素值为对应切分出来的词在 wpcompbuf的字节偏移以及长度，整数的低24bit为偏移，高8bit为长度|
|subphrbuf|String|所有识别出来的短语，以\t分割|
|spbtermcount|Int|识别出来的短语个数|
|spbtermoffsets|Int[]|该参数为列表，元素个数为识别出来的短语个数，每个元素值表示对应短语是从第几个基本词开始的（基本词偏移）|
|spbtermpos|Int[]|参数值为列表，元素值为对应切分出来的短语在 subphrbuf的字节偏移以及长度，整数的低24bit为偏移，高8bit为长度|

# 词性标注

举例，要对字符串'你好百度'进行词性标注：

```php
// 引入NLP SDK
require_once 'AipNlp.php';

// 定义常量
const APP_ID = '000212'
const API_KEY = '020947f506934fe5b39763080359f0f8';
const API_SECRET = '9cb5e2bf0e7045d78d7b27f62337f4cc';

// 初始化ApiNlp
$client = new AipNlp(APP_ID, ACCESS_KEY_ID, SECRET_ACCESS_KEY);

// 调用词性标注接口
$response = $client->wordpos('你好百度');
```

**词性标注 请求参数详情**

| 参数 | 类型 | 描述 | 是否必须 |
| :---- | :---- | :---- | :---- |
|query|String|必须，待分词的文本，目前输入编码统一为GBK|是|

**词性标注 返回数据参数详情**

| 参数 | 类型 | 描述 |
| :---- | :---- | :---- |
|result_out|object[]|人脸属性对象的集合|
|+word|String|词汇的字面|
|+offset|Int|偏移量，以基本粒度词汇为单位|
|+length|Int|长度，以基本粒度词汇为单位|
|+type|String|词性|
|+confidence|double|置信度分值，0~1|

# 词向量

举例，传入一个词计算词的的词向量，或者传入两个词计算两者相似度：

```php
// 引入NLP SDK
require_once 'AipNlp.php';

// 定义常量
const APP_ID = '000212'
const API_KEY = '020947f506934fe5b39763080359f0f8';
const API_SECRET = '9cb5e2bf0e7045d78d7b27f62337f4cc';

// 初始化ApiNlp
$client = new AipNlp(APP_ID, ACCESS_KEY_ID, SECRET_ACCESS_KEY);

// 调用词向量接口计算词向量
$response = $client->wordembedding('百度');

// 调用词向量接口计算两个词的相似度
$response = $client->wordembedding('百度', '谷歌');
```

**词向量 请求参数详情**

| 参数 | 类型 | 描述 | 是否必须 |
| :---- | :---- | :---- | :---- |
|query1|String|输入的第一个词，目前输入编码统一为GBK;|是|
|query2|String|输入的第二个词，目前输入编码统一为GBK;|是|

**词向量 返回数据参数详情**

| 参数 | 类型 | 描述 |
| :---- | :---- | :---- |
|ret|Int|人脸属性对象的集合|
|message|String|词汇的字面|
|data|object|返回数据|
|+vec|object|词向量结果|
|+sim|object|相似度对象|
|++sim|double|相似度|

# 中文DNN语言模型

举例，传入短语，计算中文DNN语言模型：

```php
// 引入NLP SDK
require_once 'AipNlp.php';

// 定义常量
const APP_ID = '000212'
const API_KEY = '020947f506934fe5b39763080359f0f8';
const API_SECRET = '9cb5e2bf0e7045d78d7b27f62337f4cc';

// 初始化ApiNlp
$client = new AipNlp(APP_ID, ACCESS_KEY_ID, SECRET_ACCESS_KEY);

// 调用中文DNN语言模型接口
$response = $client->dnnlmCn('百度是个搜索公司');

```

**中文DNN语言模型 请求参数详情**

| 参数 | 类型 | 描述 | 是否必须 |
| :---- | :---- | :---- | :---- |
|sequence|String|输入的句子，不需要切词|是|

**中文DNN语言模型 返回数据参数详情**

| 参数 | 类型 | 描述 |
| :---- | :---- | :---- |
|ret|Int|人脸属性对象的集合|
|message|String|词汇的字面|
|data|object|返回数据|
|+result|object|词向量结果|
|++seq_prob|double[]|相似度对象|
|++seq_seg|String[]|切词结果|

# 短文本相似度

举例，传入两个短文本，计算相似度：

```php
// 引入NLP SDK
require_once 'AipNlp.php';

// 定义常量
const APP_ID = '000212'
const API_KEY = '020947f506934fe5b39763080359f0f8';
const API_SECRET = '9cb5e2bf0e7045d78d7b27f62337f4cc';

// 初始化ApiNlp
$client = new AipNlp(APP_ID, ACCESS_KEY_ID, SECRET_ACCESS_KEY);

// 调用短文本相似度接口
$response = $client->simnet('百度是个搜索公司', '谷歌是个搜索公司');

```

**短文本相似度 请求参数详情**

| 参数 | 类型 | 描述 | 是否必须 |
| :---- | :---- | :---- | :---- |
|query1|String|输入的第一个词，目前输入编码统一为GBK;|是|
|query2|String|输入的第二个词，目前输入编码统一为GBK;|是|

**短文本相似度 返回数据参数详情**

| 参数 | 类型 | 描述 |
| :---- | :---- | :---- |
|output|object|返回对象|
|+score|double||
|+type|Int||
|+error|Int||
|+error-node|String||

# 情感观点挖掘

举例，传入评论文本，获取情感属性：

```php
// 引入NLP SDK
require_once 'AipNlp.php';

// 定义常量
const APP_ID = '000212'
const API_KEY = '020947f506934fe5b39763080359f0f8';
const API_SECRET = '9cb5e2bf0e7045d78d7b27f62337f4cc';

// 初始化ApiNlp
$client = new AipNlp(APP_ID, ACCESS_KEY_ID, SECRET_ACCESS_KEY);

// 调用情感观点挖掘接口
$response = $client->commentTagApi('百度是个搜索公司');

```

如果还想增加一些自定义参数配置：


```php
// 引入NLP SDK
require_once 'AipNlp.php';

// 定义常量
const APP_ID = '000212'
const API_KEY = '020947f506934fe5b39763080359f0f8';
const API_SECRET = '9cb5e2bf0e7045d78d7b27f62337f4cc';

// 初始化ApiNlp
$client = new AipNlp(APP_ID, ACCESS_KEY_ID, SECRET_ACCESS_KEY);

// 定义参数变量
$option = array('type' => 2);

// 调用情感观点挖掘接口
$response = $client->commentTagApi('你好百度', $option);
```

**情感观点挖掘 请求参数详情**

| 参数 | 类型 | 描述 | 是否必须 |
| :---- | :---- | :---- | :---- |
|comment|String|评论字符串，目前输入编码统一为GBK;|是|
|type|Int|1:酒店，2:KTV ，3:丽人，4:美食（默认值），5:旅游，6:健康7:教育，8:商业，9:房产，10:汽车，11:生活，12:购物|否|

**情感观点挖掘 返回数据参数详情**

| 参数 | 类型 | 描述 |
| :---- | :---- | :---- |
|tags|object[]|返回标签|
|+key|String|评论标签(属性词+评论词)|
|+prop_adv_adj|String|加副词的评论标签|
|+neg_adv|String|加副词的评论标签|
|+neg_adv_pos|String|词向量结果|
|+fea|String|原属性词|
|+prop|String|属性词(归一化)|
|+adj|String|评论词|
|+abstract|String|抽取摘要|
|+begin_pos|Int|词向量结果|
|+end_pos|Int|词向量结果|
|+cluster|String|分类|
|+freq|Int|词向量结果|
|+type|Int|类型:2 表示正面,0表示负面,1表示中立|
|+time|String|评论时间|
|+raw_prop|String|原始属性词|
|+raw_adj|String|原始评价词"|
|+raw_prop_begin_pos|Int|原始属性词的位置|
|+raw_adj_begin_pos|Int|词向量结果|
|+degree_adv|String|原始副词|
|+degree_adv_pos|Int|词向量结果|
