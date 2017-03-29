# Java SDK文档

本文档主要介绍NLP Java SDK的安装和使用。在使用本文档前，您需要先了解自然语言处理（Natural Language Processing）的基础知识，并已经开通了服务。

# 安装NLP Java SDK

**NLP Java SDK目录结构**

    com.baidu.aip
           ├── auth                                //签名相关类
           ├── http                                //Http通信相关类
           ├── client                              //公用类
           ├── exception                           //exception类
           ├── nlp
           │    ├── AipNlp                         //AipNlp类
           │    ├── ESimnetType                    //枚举类
           │    ├── EWsegType                      //枚举类
           │    └── NlpLangId                      //分词语言枚举类
           └── util                                //工具类

**支持 JAVA版本：1.7+**

**直接使用JAR包步骤如下：**

1.在[官方网站](http://ai.baidu.com/sdk)下载Java SDK压缩工具包。

2.将下载的`aip-nlp-java-sdk-version.zip`解压后，复制到工程文件夹中。

3.在Eclipse右键“工程 -> Properties -> Java Build Path -> Add JARs”。

4.添加SDK工具包`nlp-sdk.jar`和第三方依赖工具包`json-20160810.jar`。

其中，`version`为版本号，添加完成后，用户就可以在工程中使用NLP Java SDK。


# 快速入门

1.初始化一个AipNlpClient。

AipNlpClient是与Natural Language Processing（NLP）交互的客户端，所有NLP操作都是通过AipNlpClient完成的。您可以参考**新建AipNlpClient**，完成初始化客户端的操作。

## 新建AipNlpClient

新建AipNlpClient是Natural Language Processing的Java客户端，为使用Natural Language Processing的开发人员提供了一系列的交互方法。

用户可以参考如下代码新建一AipNlpClient：

```java
public class Sample {

    //设置APPID/AK/SK
    public static final String APP_ID = "你的 App ID";
    public static final String API_KEY = "你的 Api ID";
    public static final String SECRET_KEY = "你的 Secret Key";
    
    public static void main(String[] args) {
        // 初始化一个NLPClient
        AipNlp client = new AipNlp(APP_ID, API_KEY, SECRET_KEY);
        
        // 可选：设置网络连接参数
        client.setConnectionTimeoutInMillis(2000);
        client.setSocketTimeoutInMillis(60000);
    }
}
```

在上面代码中，常量`APP_ID`在百度云控制台中创建，常量`API_KEY`与`SECRET_KEY`是在创建完毕应用后，系统分配给用户的，均为字符串，用于标识用户，为访问做签名验证，可在AI服务控制台中的**应用列表**中查看。  

**注意：**如您以前是百度云的老用户，其中`API_KEY`对应百度云的“Access Key ID”，`SECRET_KEY`对应百度云的“Access Key Secret”。


## 配置AipNlpClient

如果用户需要配置AipNlpClient的一些细节参数，可以在构造AipNlp之后调用接口设置参数，目前只支持以下参数：

| 接口                           | 说明                      |
| ---------------------------- | ----------------------- |
| setConnectionTimeoutInMillis | 建立连接的超时时间（单位：毫秒）        |
| setSocketTimeoutInMillis     | 通过打开的连接传输数据的超时时间（单位：毫秒） |

# 错误信息格式

若请求错误，服务器将返回的JSON文本包含以下参数：

* **error_code：**错误码；关于错误码的详细信息请参考**通用错误码**和**业务相关错误码**。
* **error_msg：**错误描述信息，帮助理解和解决发生的错误。

**服务端返回的错误码**

| error_code  | error_msg                             | 说明       |
| ----------- | ------------------------------------- | -------- |
| FormatError | [param]:[param]=[Validation criteria] | 请求格式错误   |
| Forbidden   | authentication failed                 | 认证失败或无权限 |
| Unavailable | Service internal error occurred       | 内部服务发生错误 |

# 中文分词

举例，要对字符串'你好百度'进行分词：

```java
public void wordseg(AipNlp client) {

    // 使用默认语言分词
    JSONObject response = client.wordseg("百度是一个搜索公司");
    System.out.println(response.toString());

    // 使用指定语言分词
    JSONObject response = client.wordseg("百度是一个搜索公司", NlpLangId.LANG_CHINESE);
    System.out.println(response.toString());
}
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
public void wordpos(AipNlp client) {

    // 获取一个词的词向量
    JSONObject response = client.wordpos("百度");
    System.out.println(response.toString());
}
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

```java
public void wordembedding(AipNlp client) {

    // 获取一个词的词向量
    JSONObject response = client.wordembedding("百度");
    System.out.println(response.toString());

    // 获取两个词的相似度结果
    JSONObject response = client.wordembedding("百度", "谷歌");
    System.out.println(response.toString());
}
```

**中文词向量表示 请求参数详情**

| 参数     | 类型     | 描述                                       | 是否必须 |
| :----- | :----- | :--------------------------------------- | :--- |
| query1 | String | 输入的第一个词                                  | 是    |
| query2 | String | 输入的第二个词，若不输入，则输出结果为query1的向量表示，若输入，则输出为两个词的相似度 | 否    |

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

```java
public void dnnlmCn(AipNlp client) {

    // 获取中文DNN语言模型
    JSONObject response = client.dnnlmCn("百度是个搜索公司");
    System.out.println(response.toString());

}
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

```java
public void simnet(AipNlp client) {

    // 获取两个文本的相似度
    JSONObject response = client.simnet("百度是个搜索公司", "谷歌是个搜索公司");
    System.out.println(response.toString());

}
```

**短文本相似度 请求参数详情**

| 参数     | 类型     | 描述      | 是否必须 |
| :----- | :----- | :------ | :--- |
| query1 | String | 输入的第一个词 | 是    |
| query2 | String | 输入的第二个词 | 是    |

**短文本相似度 返回数据参数详情**

| 参数          | 类型     | 描述         |
| :---------- | :----- | :--------- |
| output      | object | 返回对象       |
| +score      | double | 两个文本相似度得分  |
| +type       | Int    | 默认为0       |
| +error      | Int    | 错误码        |
| +error-node | String | 错误码对应的文字说明 |

**错误码说明**  

| Code | Message               | 返回说明      |
| ---- | --------------------- | --------- |
| 0    | NO\_ERROR             | 正确返回      |
| 1    | BEYOND\_SLOT\_LENGTH  | 输入长度过长    |
| 2    | OOV\_ERROR            | 输入文本不在词表中 |
| 3    | LEGO\_LIB\_RET\_ERROR | 内部库错误     |
| 4    | OTHER\_SERVER\_ERROR  | 其它服务错误    |
| 5    | INPUT\_HAS\_EMPTY     | 输入为空      |
| 6    | INPUT\_FORMAT\_ERROR  | 输入格式错误    |
| 7    | OTHER\_CLIENT\_ERROR  | 客服端错误     |


# 评论观点抽取

举例，传入评论文本，获取情感属性：

```java
public void NLPCommentTag(AipNlp client) {

    // 获取美食评论情感属性
    JSONObject response = client.commentTag("这家餐馆味道不错", ESimnetType.FOOD);
    System.out.println(response.toString());

    // 获取酒店评论情感属性
    JSONObject response = client.commentTag("喜来登酒店不错", ESimnetType.HOTEL);
    System.out.println(response.toString());
}
```

**评论观点抽取 请求参数详情**

| 参数      | 类型          | 描述                                       | 是否必须 |
| :------ | :---------- | :--------------------------------------- | :--- |
| comment | String      | 评论字符串                                    | 是    |
| type    | ESimnetType | HOTEL,KTV,BEAUTY,FOOD,TRAVEL,HEALTH,EDU,BUSINESS,HOUSE,CAR,LIFE,SHOPPING | 否    |

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

# 版本更新记录

| 上线日期      | 版本号  | 更新内容                                     |
| --------- | ---- | ---------------------------------------- |
| 2017.3.23 | 1.3  | 对安卓环境兼容问题进行修复                            |
| 2017.3.2  | 1.2  | 增加设置超时接口                                 |
| 2017.1.20 | 1.1  | 对部分云用户调用不成功的错误修复                         |
| 2017.1.6  | 1.0  | 初始版本，上线中文分词、词性标注、词向量表示、中文DNN语言模型、短文本相似度和评论观点抽取接口 |