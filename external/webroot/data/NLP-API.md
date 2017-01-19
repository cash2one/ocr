
# 简介

本文档主要针对API开发者，调用AI服务相关的API接口有两种调用方式，两种不同的调用方式采用相同的接口URL，区别在于请求方式和鉴权方法不一样，请求参数和返回结果一致。

**请求消息体格式**

API服务要求使用JSON格式的结构体来描述一个请求的具体内容。

**请求返回格式**

API服务均采用JSON格式的消息体作为响应返回的格式。

# 调用方式一

## 请求URL数据格式

向API服务地址使用POST发送请求，必须在URL中带上参数：

**access\_token:** 必须参数，参考“[Access Token获取](http://ai.baidu.com/docs#Beginner-Auth.html)。

POST中参数按照API接口说明调用即可。

例如自然语言处理API，使用HTTPS POST发送：

```
https://aip.baidubce.com/rpc/2.0/nlp/v1/wordseg?access_token=24.f9ba9c5241b67688bb4adbed8bc91dec.2592000.1485570332.282335-8574074
```

> **说明：**方式一鉴权使用的Access_token必须通过API Key和Secret Key获取。

# 调用方式二

## 请求头域内容

NLP的API服务需要在请求的HTTP头域中包含以下信息：

* host（必填）
* x-bce-date （必填）
* x-bce-request-id（选填）
* authorization（必填）
* content-type（选填）
* content-length（选填）

作为示例，以下是一个标准的请求头域内容:

```http
POST rpc/2.0/nlp/v1/wordseg? HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: 2015-03-24T13:02:00Z
connection: keep-alive
accept: */*
host: aip.baidubce.com
x-bce-request-id: 73c4e74c-3101-4a00-bf44-fe246959c05e
content-type: application/x-www-form-urlencoded;
authorization: bce-auth-v1/46bd9968a6194b4bbdf0341f2286ccce/2015-03-24T13:02:00Z/1800/host;x-bce-date/994014d96b0eb26578e039fa053a4f9003425da4bfedf33f4790882fb4c54903
```

> **说明：**方式二鉴权使用的[API认证机制](https://cloud.baidu.com/doc/Reference/AuthenticationMechanism.html)authorization必须通过百度云的[AK/SK](https://cloud.baidu.com/doc/Reference/GetAKSK.html)生成。 

# 错误信息格式

若请求错误，服务器将返回的JSON文本包含以下参数：

* **error\_code：**错误码；关于错误码的详细信息请参考“[公共错误码](#公共错误码)”。

* **error\_msg：**错误描述信息，帮助理解和解决发生的错误。

例如Access Token失效返回：

```
{
  "error_code": 110,
  "error_msg": "Access token invalid or no longer valid"
}
```


需要重新获取新的Access Token再次请求即可。

**Access Token错误码**

| error\_CODE | error\_MSG                              | 解释               |
| ----------- | --------------------------------------- | ---------------- |
| 100         | Invalid parameter                       | 无效参数             |
| 110         | Access token invalid or no longer valid | Access Token过期失效 |



## 公共错误码

| Code  |  Message  |  HTTP Status Code  |  说明 |
| --- | --- | --- | ---- |
| FormatError  |  [param]:[param]=[Validation criteria]  |  400  |  请求格式错误 |
| Forbidden  |  authentication failed  |  403  |  认证失败或无权限 |
| Unavailable  |  Service internal error occurred  |  500  |  内部服务发生错误 |


# 分词接口

**接口描述**

分词接口提供基本词和混排两种粒度的分词结果，基本词粒度较小，适用于搜索引擎等需要更多召回的任务，而混排粒度倾向于保留更多的短语。

**调用方式一请求示例**

* HTTP方法: POST

* 请求URL: `https://aip.baidubce.com/rpc/2.0/nlp/v1/wordseg`

* URL参数：
| 参数           | 值                                 |
| ------------ | --------------------------------- |
| access_token | 通过API Key和Secret Key获取的access_token,参考“[Access Token获取](http://ai.baidu.com/docs#Beginner-Auth.html)” |

* Header如下：
| 参数           | 值                                 |
| ------------ | --------------------------------- |
| Content-Type | application/json |

* body请求示例:

  ```
  {
    "query":"百度是一家高科技公司",
    "lang_id":1
  }
  ```

**调用方式二请求示例**

```
POST /rpc/2.0/nlp/v1/wordseg HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: aip.baidubce.com
content-type: application/x-www-form-urlencoded
authorization: {bce-authorization-string}

{
    "query": "百度是一家高科技公司",
    "lang_id": 1
}

```



**请求参数**

| 参数名称     | 类型     | 详细说明                                     |
| -------- | ------ | ---------------------------------------- |
| query    | String | 必须，待分词的文本，目前输入编码统一为GBK                   |
| lang\_id | Int    | 非必须，默认为1，输入字符串的语言对应的id，简体中文设置为1（目前不支持其他语言） |

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

| 参数名称           | 类型     | 详细说明                                     |
| -------------- | ------ | ---------------------------------------- |
| wordsepbuf     | String | 基本词粒度结果，以\t分割                            |
| wsbtermcount   | int    | 基本词粒度输出的词个数                              |
| wsbtermoffsets | List   | 该参数为列表，元素个数为切分出来的词个数，每个元素值表示对应的基本词在被切分文本的起始位置（字节偏移） |
| wsbtermpos     | List   | 参数值为列表，元素值为对应切分出来的基本词在 wordsepbuf的字节偏移以及长度，整数的低24bit为偏移，高8bit为长度 |
| wpcompbuf      | String | 混排粒度结果，以\t分割                             |
| wpbtermcount   | Int    | 混排粒度输出的词个数                               |
| wpbtermoffsets | List   | 该参数为列表，元素个数为切分出来的词个数，每个元素值表示对应的词是从第几个基本词开始的（基本词偏移） |
| wpbtermpos     | List   | 参数值为列表，元素值为对应切分出来的词在 wpcompbuf的字节偏移以及长度，整数的低24bit为偏移，高8bit为长度 |
| subphrbuf      | String | 所有识别出来的短语，以\t分割                          |
| spbtermcount   | Int    | 识别出来的短语个数                                |
| spbtermoffsets | List   | 该参数为列表，元素个数为识别出来的短语个数，每个元素值表示对应短语是从第几个基本词开始的（基本词偏移） |
| spbtermpos     | List   | 参数值为列表，元素值为对应切分出来的短语在 subphrbuf的字节偏移以及长度，整数的低24bit为偏移，高8bit为长度 |


# 词性标注接口

**接口描述**

词性标注接口为分词结果中的每个单词标注一个正确的词性的程序，也标注每个词是名词、动词、形容词或其他词性。

**调用方式一请求示例**

* HTTP方法: POST

* 请求URL: `https://aip.baidubce.com/rpc/2.0/nlp/v1/wordpos`

* URL参数：
| 参数           | 值                                 |
| ------------ | --------------------------------- |
| access_token | 通过API Key和Secret Key获取的access_token,参考“[Access Token获取](http://ai.baidu.com/docs#Beginner-Auth.html)” |

* Header如下：
| 参数           | 值                                 |
| ------------ | --------------------------------- |
| Content-Type | application/json |

* body请求示例:

  ```
  {
    "query": "你好百度"
  }
  ```

**调用方式二请求示例**

```
POST /rpc/2.0/nlp/v1/wordpos HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: aip.baidubce.com
content-type: application/x-www-form-urlencoded
authorization: {bce-authorization-string}

{
    "query": "你好百度"
}
```


**请求参数**

| Key   | 类型     | 含义及备注                                    |
| ----- | ------ | ---------------------------------------- |
| query | string | 带标注的文本串。算法内部使用GBK编码，外部如果要求UTF8编码，则需进行编码转换。 |

**返回示例**

```
{
  "result_out" : 
     [
           {"word" : "你好", "offset" : 0, "length" : 1, "type" : "v", "confidence" : 1.0}, 
           {"word" : "百度", "offset" : 1, "length" : 1, "type" : "nz", "confidence" : 1.0}
      ] 
}
```

**返回参数**

| Key         | 类型     | 含义及备注                              |
| ----------- | ------ | ---------------------------------- |
| result\_out | array  | 词性标注结果数组，数组中每个元素对应一个词汇。每个词汇是一个dict |
| +word       | string | 词汇的字面                              |
| +offset     | int    | 偏移量，以基本粒度词汇为单位                     |
| +length     | int    | 长度，以基本粒度词汇为单位                      |
| +type       | string | 词性                                 |
| +confidence | float  | 置信度分值，0\~1                         |

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

# 词向量表示接口

**接口描述**

词向量接口提供两种功能：输入两个词tid=1得到两个词的相似度结果，输入1个词tid=2得到词的词向量。

**调用方式一请求示例**

* HTTP方法: POST

* 请求URL: `https://aip.baidubce.com/rpc/2.0/nlp/v1/wordembedding`

* URL参数：
| 参数           | 值                                 |
| ------------ | --------------------------------- |
| access_token | 通过API Key和Secret Key获取的access_token,参考“[Access Token获取](http://ai.baidu.com/docs#Beginner-Auth.html)” |

* Header如下：
| 参数           | 值                                 |
| ------------ | --------------------------------- |
| Content-Type | application/json |

* body请求示例:

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

**调用方式二请求示例**

- 输入两个词

  ```
  POST /rpc/2.0/nlp/v1/wordembedding HTTP/1.1
  accept-encoding: gzip, deflate
  x-bce-date: {utc-date-string}
  connection: keep-alive
  accept: */*
  host: aip.baidubce.com
  content-type: application/x-www-form-urlencoded
  authorization: {bce-authorization-string}

  {
    "query1":"百度",
    "query2":"谷歌",
    "tid":1
  }
  ```

- 输入一个词

  ```
  POST /rpc/2.0/nlp/v1/wordembedding HTTP/1.1
  accept-encoding: gzip, deflate
  x-bce-date: {utc-date-string}
  connection: keep-alive
  accept: */*
  host: aip.baidubce.com
  content-type: application/x-www-form-urlencoded
  authorization: {bce-authorization-string}

  {
    "query1":"百度",
    "tid":2
  }
  ```

**请求参数**

| 参数     | 说明                                 |
| ------ | ---------------------------------- |
| query1 | 输入的第一个词                            |
| query2 | 输入的第二个词                            |
| tid    | 指定算法类型，tid=1，返回两个词的相似度；tid=2，返回词向量 |


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


| 参数      | 描述        |
| :------ | :-------- |
| ret     | 人脸属性对象的集合 |
| message | 词汇的字面     |
| data    | 返回数据      |
| +vec    | 词向量结果     |
| +sim    | 相似度对象     |
| ++sim   | 相似度       |

# 中文DNN语言模型

**接口描述**

中文DNN语言模型接口用于输出切词结果并给出每个词在句子中的概率值。

**调用方式一请求示例**

* HTTP方法： POST

* 请求URL： `https://aip.baidubce.com/rpc/2.0/nlp/v1/dnnlm\_cn`

* URL参数：
| 参数           | 值                                 |
| ------------ | --------------------------------- |
| access_token | 通过API Key和Secret Key获取的access_token,参考“[Access Token获取](http://ai.baidu.com/docs#Beginner-Auth.html)” |

* Header如下：
| 参数           | 值                                 |
| ------------ | --------------------------------- |
| Content-Type | application/json |

* body请求示例:

  ```
  {
    "input_sequence":"百度是个搜索公司"
  }
  ```

**调用方式二请求示例**

```
POST /rpc/2.0/nlp/v1/dnnlm_cn HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: aip.baidubce.com
content-type: application/x-www-form-urlencoded
authorization: {bce-authorization-string}

{
    "input_sequence":"百度是个搜索公司"
}
```

**请求参数**

| 参数              | 说明          |
| --------------- | ----------- |
| Input\_sequence | 输入的句子，不需要切词 |


**返回示例**

```
{
  "seq_seg":"百度 是 个 搜索 公司",
  "seq_prob":" 0.00059052   0.00373688  0.0372463   0.00137015  0.000118814 "
}
```

**返回参数**

| 参数        | 说明             |
| --------- | -------------- |
| seq\_seg  | 句子的切词结果        |
| seq\_prob | 切词后每个词在句子中的概率值 |


# 短文本相似度接口


**功能**

短文本相似度接口用来判断两个文本的相似度得分。

**调用方式一请求示例**

* HTTP方法： POST

* 请求URL： `https://aip.baidubce.com/rest/2.0/nlp/v1/simnet`

* URL参数：
| 参数           | 值                                 |
| ------------ | --------------------------------- |
| access_token | 通过API Key和Secret Key获取的access_token,参考“[Access Token获取](http://ai.baidu.com/docs#Beginner-Auth.html)” |

* Header如下：
| 参数           | 值                                 |
| ------------ | --------------------------------- |
| Content-Type | application/json |

* body请求示例:

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

**调用方式二请求示例**

```
POST /rpc/2.0/nlp/v1/simnet HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: aip.baidubce.com
content-type: application/x-www-form-urlencoded
authorization: {bce-authorization-string}

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

| 参数                      | 说明       |
| ----------------------- | -------- |
| qslots中的terms\_sequence | 短文本1     |
| tslots中的terms\_sequence | 短文本2     |
| items                   | 均设置为空列表  |
| type                    | 类别，均设置为0 |

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

| 参数          | 说明          |
| ----------- | ----------- |
| score       | 两个文本相似度得分   |
| error       | error code  |
| type        | 默认为0        |
| error\_note | error对应文字说明 |
| items       | 默认为空        |

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


# 评论观点抽取接口

**功能**

评论观点抽取接口用来提取一个句子观点评论的情感属性。

**调用方式一请求示例**

* HTTP方法: POST

* 请求URL: `https://aip.baidubce.com/rpc/2.0/nlp/v1/comment\_tag`

* URL参数：
| 参数           | 值                                 |
| ------------ | --------------------------------- |
| access_token | 通过API Key和Secret Key获取的access_token,参考“[Access Token获取](http://ai.baidu.com/docs#Beginner-Auth.html)” |

* Header如下：
| 参数           | 值                                 |
| ------------ | --------------------------------- |
| Content-Type | application/json |

* body请求示例:

  ```
  {
    "comment":"个人觉得福克斯好，外观漂亮年轻，动力和操控性都不错",
    "entity":"NULL",
    "type":"10"
  }
  ```

**调用方式二请求示例**

```
POST /rpc/2.0/nlp/v1/comment_tag HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: aip.baidubce.com
content-type: application/x-www-form-urlencoded
authorization: {bce-authorization-string}

{
    "comment":"个人觉得福克斯好，外观漂亮年轻，动力和操控性都不错",
    "entity":"NULL",
    "type":"10"
}
```

**请求参数**

| 参数      | 类型 |说明                  |
| ------- | ------- | ------------ |
| comment | string |评论内容                |
| entity  | string |实体名，当前取值为NULL，暂时不生效 |
| type    | string |类别,默认类别为4（餐厅）       |

其中type包含12个类别，具体取值说明如下：

| 参数   | 说明     |
| ---- | ------ |
| 1    | 酒店     |
| 2    | KTV    |
| 3    | 丽人     |
| 4    | 美食（默认） |
| 5    | 旅游     |
| 6    | 健康     |
| 7    | 教育     |
| 8    | 商业     |
| 9    | 房产     |
| 10   | 汽车     |
| 11   | 生活     |
| 12   | 购物     |


**返回示例**

```
{
  "abstract":"<span>动力和操控性都不错</span>",
  "adj":"不错",
  "comment":"个人觉得福克斯好，外观漂亮年轻，动力和操控性都不错",
  "entity":"NULL",
  "fea":"动力",
  "type":"2"
}
```

**返回参数**

| 参数       | 说明                           |
| -------- | ---------------------------- |
| abstract | 表示评论观点在评论文本中的位置。             |
| adj      | 表示抽取结果中的评价词                  |
| comment  | 表示待抽取观点的评论文本。                |
| entity   | 实体名，当前取值为NULL，暂时不生效          |
| fea      | 抽取结果中的属性词                    |
| type     | 表示情感极性（其中2表示积极、1表示中性、0表示消极）。 |
| 其他参数     | 暂不生效                         |


