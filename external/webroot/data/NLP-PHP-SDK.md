# PHP SDK文档

本文档主要介绍NLP PHP SDK的安装和使用。在使用本文档前，您需要先了解自然语言处理（Natural Language Processing）的基础知识，并已经开通了服务。

# 安装NLP SDK

**NLP PHP SDK目录结构**

    NLP
           ├── AipNlp.php                      //NLP客户端类
           ├── lib
           │      ├── AipHttpClient.php        //内部http请求类
           │      ├── AipBCEUtil.php           //内部工具类
           │      ├── AipBase                  //Aip基类
           └── demo     
                  └── DemoNlpFace.php          //NLP服务示例

**支持 PHP版本：5.3+ **

**使用SDK步骤如下：**

1.在[官方网站](http://ai.baidu.com/sdk)下载PHP SDK压缩工具包。

2.将下载的`aip-nlp-php-sdk-version.zip`解压后，复制AipNlp.php以及lib/*到工程文件夹中。

3.引入AipNlp.php


# 快速入门

## 初始化AipNlp对象

AipNlp类是Nlp的PHP SDK客户端，为使用Natural Language Processing的开发人员提供了一系列的交互方法。

用户可以参考如下代码初始化一个AipNlp对象：

```php
// 引入NLP SDK
require_once 'AipNlp.php';

// 定义常量
const APP_ID = '你的 App ID'
const API_KEY = '你的 API Key';
const SECRET_KEY = '你的 Secret Key';

// 初始化AipNlp对象
$aipNlp = new AipNlp(APP_ID, API_KEY, API_SECRET);
```

在上面代码中，常量`APP_ID`在百度云控制台中创建，常量`API_KEY`与`SECRET_KEY`是在创建完毕应用后，系统分配给用户的，均为字符串，用于标识用户，为访问做签名验证，可在AI服务控制台中的**应用列表**中查看。  

**注：**如您以前是百度云的老用户，其中`API_KEY`对应百度云的“Access Key ID”，`SECRET_KEY`对应百度云的“Access Key Secret”。


# 中文分词

举例，要对字符串'你好百度'进行分词：

```php
// 引入NLP SDK
require_once 'AipNlp.php';

// 定义常量
const APP_ID = '你的 App ID'
const API_KEY = '你的 API Key';
const SECRET_KEY = '你的 Secret Key';

// 初始化ApiNlp
$aipNlp = new AipNlp(APP_ID, API_KEY, SECRET_KEY);

// 调用分词接口
$result = $aipNlp->wordseg('你好百度');
```
如果还想增加一些自定义参数配置：

```php
// 引入NLP SDK
require_once 'AipNlp.php';

// 定义常量
const APP_ID = '你的 App ID'
const API_KEY = '你的 API Key';
const SECRET_KEY = '你的 Secret Key';

// 初始化ApiNlp
$aipNlp = new AipNlp(APP_ID, API_KEY, SECRET_KEY);

// 定义参数变量
$option = array('lang_id' => 1);

// 调用分词接口
$result = $aipNlp->wordseg('你好百度', $option);
```

**中文分词 请求参数详情**

| 参数      | 类型     | 描述                                     | 是否必须 |
| :------ | :----- | :------------------------------------- | :--- |
| query   | String | 待分词的文本                                 | 是    |
| lang_id | Int    | 默认为1，输入字符串的语言对应的id，简体中文设置为1（目前不支持其他语言） | 否    |

**中文分词 返回数据参数详情**

| 参数             | 类型     | 描述                                       |
| :------------- | :----- | :--------------------------------------- |
| wordsepbuf     | String | 基本词粒度结果，以\t分割                            |
| wsbtermcount   | Int    | 基本词粒度输出的词个数                              |
| wsbtermoffsets | Int[]  | 该参数为列表，元素个数为切分出来的词个数，每个元素值表示对应的基本词在被切分文本的起始位置（字节偏移） |
| wsbtermpos     | String | 参数值为列表，元素值为对应切分出来的基本词在 wordsepbuf的字节偏移以及长度，整数的低24bit为偏移，高8bit为长度 |
| wpcompbuf      | String | 混排粒度结果，以\t分割                             |
| wpbtermcount   | Int    | 混排粒度输出的词个数                               |
| wpbtermoffsets | Int[]  | 该参数为列表，元素个数为切分出来的词个数，每个元素值表示对应的词是从第几个基本词开始的（基本词偏移） |
| wpbtermpos     | Int[]  | 参数值为列表，元素值为对应切分出来的词在 wpcompbuf的字节偏移以及长度，整数的低24bit为偏移，高8bit为长度 |
| subphrbuf      | String | 所有识别出来的短语，以\t分割                          |
| spbtermcount   | Int    | 识别出来的短语个数                                |
| spbtermoffsets | Int[]  | 该参数为列表，元素个数为识别出来的短语个数，每个元素值表示对应短语是从第几个基本词开始的（基本词偏移） |
| spbtermpos     | Int[]  | 参数值为列表，元素值为对应切分出来的短语在 subphrbuf的字节偏移以及长度，整数的低24bit为偏移，高8bit为长度 |

# 词性标注

词性标注接口为分词结果中的每个单词标注一个正确的词性的程序，也标注每个词是名词、动词、形容词或其他词性。

举例，传入一个词识别词的词性：

```java
// 引入NLP SDK
require_once 'AipNlp.php';

// 定义常量
const APP_ID = '你的 App ID'
const API_KEY = '你的 API Key';
const SECRET_KEY = '你的 Secret Key';

// 初始化ApiNlp
$aipNlp = new AipNlp(APP_ID, API_KEY, SECRET_KEY);

// 调用词性标注接口
$result = $aipNlp->wordpos('百度');

```

**词性标注 请求参数详情**

| 参数    | 类型     | 描述         | 是否必须 |
| :---- | :----- | :--------- | :--- |
| query | String | 输入需要识别词性的词 | 是    |

**词性标注 返回数据参数详情**

| 参数          | 类型     | 含义及备注                              |
| ----------- | ------ | ---------------------------------- |
| result_out  | array  | 词性标注结果数组，数组中每个元素对应一个词汇。每个词汇是一个dict |
| +word       | string | 词汇的字面                              |
| +offset     | int    | 偏移量，以基本粒度词汇为单位                     |
| +length     | int    | 长度，以基本粒度词汇为单位                      |
| +type       | string | 词性                                 |
| +confidence | float  | 置信度分值，0~1                          |

**词性缩略词说明**

| type | 代码   | 名称   | 帮助记忆的诠释                      |
| ---- | ---- | ---- | ---------------------------- |
| 1    | Ag   | 形语素  | 形容词性语素。形容词代码为a，语素代码ｇ前面置以A    |
| 2    | Dg   | 副语素  | 副词性语素。副词代码为d，语素代码ｇ前面置以D。     |
| 3    | Ng   | 名语素  | 名词性语素。名词代码为n，语素代码ｇ前面置以N。     |
| 4    | Tg   | 时语素  | 时间词性语素。时间词代码为t,在语素的代码g前面置以T。 |
| 5    | Vg   | 动语素  | 动词性语素。动词代码为v。在语素的代码g前面置以V    |
| 6    | a    | 形容词  | 取英语形容词adjective的第1个字母        |
| 7    | ad   | 副形词  | 直接作状语的形容词。形容词代码a和副词代码d并在一起。  |
| 8    | an   | 名形词  | 具有名词功能的形容词。形容词代码a和名词代码n并在一起。 |
| 9    | b    | 区别词  | 取汉字“别”的声母。                   |
| 10   | c    | 连词   | 取英语连词conjunction的第1个字母。      |
| 11   | d    | 副词   | 取adverb的第2个字母，因其第1个字母已用于形容词。 |
| 12   | e    | 叹词   | 取英语叹词exclamation的第1个字母       |
| 13   | f    | 方位词  | 取汉字“方”                       |
| 14   | g    | 语素   | 绝大多数语素都能作为合成词的“词根”，取汉字“根”的声母 |
| 15   | h    | 前接成分 | 取英语head的第1个字母                |
| 16   | i    | 成语   | 取英语成语idiom的第1个字母             |
| 17   | j    | 简称略语 | 取汉字“简”的声母。                   |
| 18   | k    | 后接成分 |                              |
| 19   | l    | 习用语  | 习用语尚未成为成语，有点“临时性”，取“临”的声母。   |
| 20   | m    | 数词   | 取英语numeral的第3个字母，n，u已有他用。    |
| 21   | n    | 名词   | 取英语名词noun的第1个字母。             |
| 22   | nr   | 人名   | 名词代码n和“人(ren)”的声母并在一起。       |
| 23   | ns   | 地名   | 名词代码n和处所词代码s并在一起。            |
| 24   | nt   | 机构团体 | “团”的声母为t，名词代码n和t并在一起。        |
| 25   | nx   | 外文专名 | 一般是全角英文专名，如：ＺＢＴ              |
| 26   | nz   | 其他专名 | “专”的声母的第1个字母为z，名词代码n和z并在一起   |
| 27   | o    | 拟声词  | 取英语拟声词onomatopoeia的第1个字母。    |
| 28   | p    | 介词   | 取英语介词prepositional的第1个字母。    |
| 29   | q    | 量词   | 取英语quantity的第1个字母。           |
| 30   | r    | 代词   | 取英语代词pronoun的第2个字母,因p已用于介词。  |
| 31   | s    | 处所词  | 取英语space的第1个字母。              |
| 32   | t    | 时间词  | 取英语time的第1个字母。               |
| 33   | u    | 助词   | 取英语助词auxiliary               |
| 34   | v    | 动词   | 取英语动词verb的第一个字母。             |
| 35   | vd   | 副动词  | 直接作状语的动词。动词和副词的代码并在一起。       |
| 36   | vn   | 名动词  | 指具有名词功能的动词。动词和名词的代码并在一起      |
| 37   | w    | 标点符号 |                              |
| 38   | y    | 语气词  | 取汉字“语”的声母。                   |
| 39   | z    | 状态词  | 取汉字“状”的声母的前一个字母。             |

**返回示例**

```json
{"result_out": [
  {
    "length": 1,
    "word": "你好",
    "confidence": 1,
    "type": "v",
    "offset": 0
  },
  {
    "length": 1,
    "word": "百度",
    "confidence": 1,
    "type": "nz",
    "offset": 1
  }
]}
```

# 中文词向量表示

举例，传入一个词计算词的的词向量，或者传入两个词计算两者相似度：

```php
// 引入NLP SDK
require_once 'AipNlp.php';

// 定义常量
const APP_ID = '你的 App ID'
const API_KEY = '你的 API Key';
const SECRET_KEY = '你的 Secret Key';

// 初始化ApiNlp
$aipNlp = new AipNlp(APP_ID, API_KEY, SECRET_KEY);

// 调用词向量接口计算词向量
$result = $aipNlp->wordembedding('百度');

// 调用词向量接口计算两个词的相似度
$result = $aipNlp->wordembedding('百度', '谷歌');
```

**中文词向量表示 请求参数详情**

| 参数     | 类型     | 描述                                       | 是否必须 |
| :----- | :----- | :--------------------------------------- | :--- |
| query1 | String | 输入的第一个词;                                 | 是    |
| query2 | String | 输入的第二个词，若不输入，则输出结果为query1的向量表示，若输入，则输出为两个词的相似度; | 否    |

**中文词向量表示 返回数据参数详情**

| 参数      | 类型     | 描述        |
| :------ | :----- | :-------- |
| ret     | Int    | 人脸属性对象的集合 |
| message | String | 词汇的字面     |
| data    | object | 返回数据      |
| +vec    | object | 词向量结果     |
| +sim    | object | 相似度对象     |
| ++sim   | double | 相似度       |

# 中文DNN语言模型

举例，传入短语，计算中文DNN语言模型：

```php
// 引入NLP SDK
require_once 'AipNlp.php';

// 定义常量
const APP_ID = '你的 App ID'
const API_KEY = '你的 API Key';
const SECRET_KEY = '你的 Secret Key';

// 初始化ApiNlp
$aipNlp = new AipNlp(APP_ID, API_KEY, SECRET_KEY);

// 调用中文DNN语言模型接口
$result = $aipNlp->dnnlmCn('百度是个搜索公司');

```

**中文DNN语言模型 请求参数详情**

| 参数       | 类型     | 描述          | 是否必须 |
| :------- | :----- | :---------- | :--- |
| sequence | String | 输入的句子，不需要切词 | 是    |

**中文DNN语言模型 返回数据参数详情**

| 参数         | 类型       | 描述        |
| :--------- | :------- | :-------- |
| ret        | Int      | 人脸属性对象的集合 |
| message    | String   | 词汇的字面     |
| data       | object   | 返回数据      |
| +result    | object   | 词向量结果     |
| ++seq_prob | double[] | 相似度对象     |
| ++seq_seg  | String[] | 切词结果      |

# 短文本相似度

举例，传入两个短文本，计算相似度：

```php
// 引入NLP SDK
require_once 'AipNlp.php';

// 定义常量
const APP_ID = '你的 App ID'
const API_KEY = '你的 API Key';
const SECRET_KEY = '你的 Secret Key';

// 初始化ApiNlp
$aipNlp = new AipNlp(APP_ID, API_KEY, SECRET_KEY);

// 调用短文本相似度接口
$result = $aipNlp->simnet('百度是个搜索公司', '谷歌是个搜索公司');

```

**短文本相似度 请求参数详情**

| 参数     | 类型     | 描述       | 是否必须 |
| :----- | :----- | :------- | :--- |
| query1 | String | 输入的第一个词; | 是    |
| query2 | String | 输入的第二个词; | 是    |

**短文本相似度 返回数据参数详情**

| 参数          | 类型     | 描述          |
| :---------- | :----- | :---------- |
| output      | object | 返回对象        |
| +score      | double | 两个文本相似度得分   |
| +type       | Int    | 默认为0        |
| +error      | Int    | error code  |
| +error-node | String | error对应文字说明 |

**错误码说明**  

| Code | Message            | 返回说明      |
| ---- | ------------------ | --------- |
| 0    | NO_ERROR           | 正确返回      |
| 1    | BEYOND_SLOT_LENGTH | 输入长度过长    |
| 2    | OOV_ERROR          | 输入文本不在词表中 |
| 3    | LEGO_LIB_RET_ERROR | 内部库错误     |
| 4    | OTHER_SERVER_ERROR | 其它服务错误    |
| 5    | INPUT_HAS_EMPTY    | 输入为空      |
| 6    | INPUT_FORMAT_ERROR | 输入格式错误    |
| 7    | OTHER_CLIENT_ERROR | 客服端错误     |

# 评论观点抽取

举例，传入评论文本，获取情感属性：

```php
// 引入NLP SDK
require_once 'AipNlp.php';

// 定义常量
const APP_ID = '你的 App ID'
const API_KEY = '你的 API Key';
const SECRET_KEY = '你的 Secret Key';

// 初始化ApiNlp
$aipNlp = new AipNlp(APP_ID, API_KEY, SECRET_KEY);

// 调用评论观点抽取接口
$result = $aipNlp->commentTag('面包很好吃'); // 默认为美食分类
```

如果还想增加一些自定义参数配置：


```php
// 引入NLP SDK
require_once 'AipNlp.php';

// 定义常量
const APP_ID = '你的 App ID'
const API_KEY = '你的 API Key';
const SECRET_KEY = '你的 Secret Key';

// 初始化ApiNlp
$aipNlp = new AipNlp(APP_ID, API_KEY, SECRET_KEY);

// 定义参数变量
$option = array('type' => 10); // 汽车分类

// 调用情感观点抽取接口
$result = $aipNlp->commentTag('特斯拉外观很漂亮', $option);
```

**评论观点抽取 请求参数详情**

| 参数      | 类型     | 描述                                       | 是否必须 |
| :------ | :----- | :--------------------------------------- | :--- |
| comment | String | 评论字符串;                                   | 是    |
| type    | Int    | 1:酒店，2:KTV ，3:丽人，4:美食（默认值），5:旅游，6:健康7:教育，8:商业，9:房产，10:汽车，11:生活，12:购物 | 否    |

**评论观点抽取 返回数据参数详情**

| 参数                  | 类型       | 描述                    |
| :------------------ | :------- | :-------------------- |
| tags                | object[] | 返回标签                  |
| +key                | String   | 评论标签(属性词+评论词)         |
| +prop_adv_adj       | String   | 加副词的评论标签              |
| +neg_adv            | String   | 加副词的评论标签              |
| +neg_adv_pos        | String   | 词向量结果                 |
| +fea                | String   | 原属性词                  |
| +prop               | String   | 属性词(归一化)              |
| +adj                | String   | 评论词                   |
| +abstract           | String   | 抽取摘要                  |
| +begin_pos          | Int      | 词向量结果                 |
| +end_pos            | Int      | 词向量结果                 |
| +cluster            | String   | 分类                    |
| +freq               | Int      | 词向量结果                 |
| +type               | Int      | 类型:2 表示正面,0表示负面,1表示中立 |
| +time               | String   | 评论时间                  |
| +raw_prop           | String   | 原始属性词                 |
| +raw_adj            | String   | 原始评价词"                |
| +raw_prop_begin_pos | Int      | 原始属性词的位置              |
| +raw_adj_begin_pos  | Int      | 词向量结果                 |
| +degree_adv         | String   | 原始副词                  |
| +degree_adv_pos     | Int      | 词向量结果                 |

