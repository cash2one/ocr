# API总述

## 调用方式

### 通用约定

- 所有编码都采用UTF-8
- 日期格式采用yyyy-MM-dd方式，如2015-08-10
- Content-type为application/json; charset=UTF-8
    + object类型的key必须使用双引号（"）括起来
    + object类型的key必须使用lowerCamelCase表示

### 公共请求头

<table>
<tr><th>头域（Header） </th><th> 是否必须 </th><th> 说明</th></tr>
<tr><td>Authorization </td><td> 必须 </td><td> 包含Access Key与请求签名</td></tr>
<tr><td>Host </td><td> 必须 </td><td> 包含API的域名</td></tr>
<tr><td>Content-Type </td><td> 可选</td><td>application/json; charset=utf-8</td></tr>
</table>

### 公共响应头

<table>
<tr><th>头域（Header） </th><th> 说明</th></tr>
<tr><td>Content-Type </td><td> 只支持JSON格式，application/json; charset=utf-8</td></tr>
<tr><td>x-bce-request-id </td><td> 服务后端生成，并自动设置到响应头域中</td></tr>
</table>

### 响应状态码

返回的响应状态码遵循[RFC 2616 section 6.1.1](http://tools.ietf.org/html/rfc2616#section-6.1.1)

- 1xx: Informational - Request received, continuing process.
- 2xx: Success - The action was successfully received, understood, and accepted.
- 3xx: Redirection - Further action must be taken in order to complete the request.
- 4xx: Client Error - The request contains bad syntax or cannot be fulfilled.
- 5xx: Server Error - The server failed to fulfill an apparently valid request.

### 通用错误返回格式

当调用接口出错时，将返回通用的错误格式。HTTP的返回状态码为4xx或5xx，返回的消息体将包括全局唯一的请求、错误代码以及错误信息。调用方可根据错误码以及错误信息定位问题，当无法定位到错误原因时，可以发工单联系百度技术人员，并提供requestId以便于快速地帮助您解决问题。

**消息体定义**

<table>
<tr><th>参数名 </th><th> 类型 </th><th> 说明</th></tr>
<tr><td>requestId </td><td> String </td><td> 请求的唯一标识</td></tr>
<tr><td>code </td><td> String </td><td> 错误类型代码</td></tr>
<tr><td>message </td><td> String </td><td> 错误的信息说明</td></tr>
</table>

**错误返回示例**

    {
        "requestId": "47e0ef1a-9bf2-11e1-9279-0100e8cf109a",
        "code":"NoSuchKey",
        "message":"The resource you requested does not exist"   
    } 

### 公共错误码

<table>
<tr><th>Code </th><th> Message </th><th> HTTP Status Code </th><th> 说明</th></tr>
<tr><td>FormatError </td><td> [param]:[param]=[Validation criteria] </td><td> 400 </td><td> 请求格式错误</td></tr>
<tr><td>Forbidden </td><td> authentication failed </td><td> 403 </td><td> 认证失败或无权限</td></tr>
<tr><td>Unavailable </td><td> Service internal error occurred </td><td> 500 </td><td> 内部服务发生错误</td></tr>
</table>

### 签名认证

NLP API会对每个访问的请求进行身份认证，以保障用户的安全。安全认证采用Access Key与请求签名机制。Access Key由Access Key ID和Secret Access Key组成，均为字符串，由百度开放云官方颁发给用户。其中Access Key ID用于标识用户身份，Access Key Secret 是用于加密签名字符串和服务器端验证签名字符串的密钥，必须严格保密。

对于每个HTTP请求，用户需要使用下文所描述的方式生成一个签名字符串，并将认证字符串放在HTTP请求的Authorization头域里。

**签名字符串格式**

bce-auth-v{version}/{accessKeyId}/{timestamp}/{expireTime}/{signedHeaders}/{signature}

其中：

- version是正整数，目前取值为1。
- timestamp是生成签名时的时间。时间格式符合[通用约定](#通用约定)。
- expireTime表示签名有效期限，单位为秒，从timestamp所指定的时间开始计算。
- signedHeaders是签名算法中涉及到的头域列表。头域名字之间用分号（;）分隔，如host;x-bce-date。列表按照字典序排列。当signedHeaders为空时表示取默认值。
- signature是256位签名的十六进制表示，由64个小写字母组成，生成方式由如下[签名生成算法](../Reference/AuthenticationMechanism)给出。

### 签名生成算法

有关签名生成算法的具体介绍，请参看[鉴权认证机制](../Reference/AuthenticationMechanism)。

>**说明：**使用NLPC的http服务之前需要先为自己的项目申请NLPC APPKEY（app参数）。HTTP 服务现在支持GBK和utf8两种编码，默认为GBK编码！如果使用utf8编码，需要在url最后加上字段：&encoding=utf8。

# DeepSeg分词接口

**功能：**

DeepSeg分词接口提供基本词和混排两种粒度的分词结果，基本词粒度较小，适用于搜索引擎等需要更多召回的任务，而混排粒度倾向于保留更多的短语。

**HTTP方法** 

POST

**请求URL**

https://aip.baidubce.com/rest/2.0/nlp/v1/wordseg?query=xxxxx&lang_id=1

**请求示例**

```
{
"query":"百度是一家高科技公司",
"lang_id":1
}
```

**请求参数**

参数名称 | 类型 | 详细说明
---|---|---
query | String | 必须，待分词的文本，目前输入编码统一为GBK
lang_id | Int | 非必须，默认为1，输入字符串的语言对应的id，简体中文设置为1（目前不支持其他语言）

**返回示例**

```
{
    "scw_out": {
        "phrase_merged": 0,
        "pdisambword": {
            "newwordbuf": "",
            "newwordb_curpos": 0,
            "newwordbmaxcount": 0,
            "newwordbsize": 0,
            "newwordbtermcount": 0,
            "newwordneprop": [],
            "newwordbtermoffsets": [],
            "newwordbtermpos": []
        },
        "pnewword": {
            "newwordbuf": "",
            "newwordb_curpos": 0,
            "newwordbmaxcount": 0,
            "newwordbsize": 0,
            "newwordbtermcount": 0,
            "newwordneprop": [],
            "newwordbtermoffsets": [],
            "newwordbtermpos": []
        },
        "booknamebuf": "",
        "mergebuf": "",
        "namebuf": "",
        "subphrbuf": "\t\u4f60\u597d\t",
        "wordsepbuf": "\t\u4f60\t\u597d\t\u767e\u5ea6\t",
        "wpcompbuf": "\t\u4f60\u597d\t\u767e\u5ea6\t",
        "bnb_curpos": 0,
        "bnbsize": 0,
        "bnbtermcount": 0,
        "mb_curpos": 0,
        "mbsize": 0,
        "mbtermcount": 0,
        "nameb_curpos": 0,
        "namebsize": 0,
        "namebtermcount": 0,
        "spb_curpos": 6,
        "spbsize": 1024000,
        "spbtermcount": 1,
        "wordtotallen": 8,
        "wpb_curpos": 11,
        "wpbsize": 1024000,
        "wpbtermcount": 2,
        "wsb_curpos": 12,
        "wsbsize": 1024000,
        "wsbtermcount": 3,
        "bnbtermprop": [],
        "namebtermprop": [],
        "spbtermprop": [
            {
                "m_hprop": 1,
                "m_lprop": 32
            }
        ],
        "wpbtermprop": [
            {
                "m_hprop": 1,
                "m_lprop": 32
            },
            {
                "m_hprop": 0,
                "m_lprop": 32
            }
        ],
        "wsbtermprop": [
            {
                "m_hprop": 0,
                "m_lprop": 32
            },
            {
                "m_hprop": 0,
                "m_lprop": 32
            },
            {
                "m_hprop": 0,
                "m_lprop": 32
            }
        ],
        "bnbtermoffsets": [],
        "bnbtermpos": [],
        "mbtermoffsets": [],
        "mbtermpos": [],
        "namebtermoffsets": [],
        "namebtermpos": [],
        "spbtermoffsets": [
            0
        ],
        "spbtermpos": [
            67108865
        ],
        "wpbtermoffsets": [
            0,
            2
        ],
        "wpbtermpos": [
            67108865,
            67108870
        ],
        "wsbtermoffsets": [
            0,
            2,
            4
        ],
        "wsbtermpos": [
            33554433,
            33554436,
            67108871
        ]
    }
}
```


**返回参数**

参数名称 | 类型 | 详细说明
---|---|---
wordsepbuf | String | 基本词粒度结果，以\t分割
wsbtermcount | int | 基本词粒度输出的词个数
wsbtermoffsets | List | 该参数为列表，元素个数为切分出来的词个数，每个元素值表示对应的基本词在被切分文本的起始位置（字节偏移）
wpcompbuf | String | 混排粒度结果，以\t分割
wpbtermcount | Int | 混排粒度输出的词个数
wpbtermoffsets | List | 该参数为列表，元素个数为切分出来的词个数，每个元素值表示对应的词是从第几个基本词开始的（基本词偏移）
subphrbuf | String | 所有识别出来的短语，以\t分割
spbtermcount | Int | 识别出来的短语个数
spbtermoffsets | List | 该参数为列表，元素个数为识别出来的短语个数，每个元素值表示对应短语是从第几个基本词开始的（基本词偏移）


# 词性标注接口

**功能：**

词性标注接口为分词结果中的每个单词标注一个正确的词性的程序，也标注每个词是名词、动词、形容词或其他词性。

**HTTP方法** 

POST

**请求URL**

https://aip.baidubce.com/rest/2.0/nlp/v1/wordpos?query=xxxxx

**请求示例**

```
{
"query": "你好百度"
}
```

**请求参数**

Key | 类型 | 含义及备注
----|-----| ------
query | string | 带标注的文本串。算法内部使用GBK编码，外部如果要求UTF8编码，则需进行编码转换。

**返回示例**

```
{
  "result_out" : 
	 [
           {"word" : "你好", "offset" : 0, "length" : 1, "type" : "v", "confidence" : 1.0}, 
           {"word" : "百度", "offset" : 1, "length" : 1, "type" : "nt", "confidence" : 1.0}
      ] 
}

```

**返回参数**

Key | 类型 | 含义及备注
----|-----|------
result_out | array | 词性标注结果数组，数组中每个元素对应一个词汇。每个词汇是一个dict
+word | string | 词汇的字面
+offset | int | 偏移量，以基本粒度词汇为单位
+length | int | 长度，以基本粒度词汇为单位
+type | string | 词性
+confidence | float | 置信度分值，0~1


# 词向量接口

**功能：**

词向量接口提供两种功能：输入两个词tid=1得到两个词的相似度结果，输入1个词tid=2得到词的词向量。

**HTTP方法** 

POST

**请求URL**

https://aip.baidubce.com/rest/2.0/nlp/v1/wordembedding

**请求示例**

- 输入两个词

```
{
  "query1":"百度",
  "query2":"谷歌",
  "tid":1
}
```

- 输入一个词

```
{
  "query1":"百度",
  "tid":2
}
```

**请求参数**

参数 | 说明
----|----
query1 | 输入的第一个词
query2 | 输入的第二个词
tid | 指定算法类型，tid=1，返回两个词的相似度；tid=2，返回词向量


**返回示例**

```
{
  "ret":0,
  "message":"",
  "data":
    {  "sim":
        {
 		  "sim":0.180343},
		  "vec":null
		}
}
```

**返回参数**


参数 | 说明
----|----
ret | 
message | 
sim | 两个词的相似度
vec | 词向量结果

# 中文DNN语言模型

**功能**

中文DNN语言模型接口用于输出切词结果并给出每个词在句子中的概率值。

**HTTP方法** 

POST

**请求URL**

https://aip.baidubce.com/rest/2.0/nlp/v1/dnnlm_cn


**请求示例**

```
{
  "input_sequence":"百度是个搜索公司"
}
```

**请求参数**

参数 | 说明
----|----
Input_sequence | 输入的句子，不需要切词


**返回示例**

```
{
  "seq_seg":"百度 是 个 搜索 公司",
  "seq_prob":" 0.00059052	0.00373688	0.0372463	0.00137015	0.000118814 "
}
```

**返回参数**

参数 | 说明
----|----
seq_seg | 句子的切词结果
seq_prob | 切词后每个词在句子中的概率值


# 短文本相似度接口


**功能**

短文本相似度接口用来判断两个文本的相似度得分。

**HTTP方法** 

POST

**请求URL**

https://aip.baidubce.com/rest/2.0/nlp/v1/simnet?username=xxx\&app=xxx

**请求示例**

```
{
  "input":
    {
      "qslots":[{"terms_sequence":"你好百度” ", "type":0, "items":[]}], 
      "tslots":[{"terms_sequence":"你好世界” ", "type":0, "items":[]}],
      "type":0
    }
}
```

**请求参数**

参数 | 说明
-----|-----
qslots中的terms_sequence | 短文本1
tslots中的terms_sequence | 短文本2
items | 均设置为空列表
type | 类别，均设置为0

**返回示例**

```
{
  "output":
    {
      "score":0.758419,
      "error":0,
      "type":0,
      "error_note":"",
      "items":[]
    }
}
```

**返回参数**

参数 | 说明
-----|-----
score | 两个文本相似度得分
error | 
type | 
error_note | 
items |

# 评论观点抽取接口

**功能**

评论观点抽取接口用来提取一个句子观点评论的情感属性。

**HTTP方法** 

POST

**请求URL**

https://aip.baidubce.com/rest/2.0/nlp/v1/comment_tag

**请求示例**

```
{
  "comment":"个人觉得福克斯好，外观漂亮年轻，动力和操控性都不错",
  "entity":"NULL",
  "type":1
}
```

**请求参数**

参数 | 说明
-----|-----
comment | 评论内容
entity | 实体名，当前取值为NULL，暂时不生效
type | 类别,默认类别为4（餐厅）

其中type包含12个类别，具体取值说明如下：

参数 | 说明
-----|-----
1 | 酒店
2 | KTV
3 | 丽人
4 | 美食（默认）
5 | 旅游
6 | 健康
7 | 教育
8 | 商业
9 | 房产
10 | 汽车
11 | 生活
12 | 购物


**返回示例**

```
{
  "abstract":"<span>动力和操控性都不错</span>",
  "adj":"不错",
  "comment":"个人觉得福克斯好，外观漂亮年轻，动力和操控性都不错",
  "entity":"NULL",
  "prop":"动力",
  "type":"2"
}
```

**返回参数**

参数 | 说明
-----|-----
abstract | 表示评论观点在评论文本中的位置。
adj | 表示抽取结果中的评价词
comment | 表示待抽取观点的评论文本。
entity | 实体名，当前取值为NULL，暂时不生效
type | 表示情感极性（其中2表示积极、1表示中性、0表示消极）。