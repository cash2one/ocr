
# 简介

本文档主要针对API开发者，调用AI服务相关的API接口有两种调用方式，两种不同的调用方式采用相同的接口URL，区别在于请求方式和鉴权方法不一样，请求参数和返回结果一致。

**请求消息体格式**

API服务要求使用POST方式调用，Content-Type为application/x-www-form-urlencoded，然后通过urlencode格式化请求体。

**请求返回格式**

API服务均采用JSON格式的消息体作为响应返回的格式。

**服务限制**

OCR服务对图片格式、图片大小有限制，格式支持jpg、png，长宽都要小于2048px。

# 调用方式一

## 请求URL数据格式

向API服务地址使用POST发送请求，必须在URL中带上参数：

**access_token:** 必须参数，参考“[Access Token获取](http://ai.baidu.com/docs#Beginner-Auth)”。

POST中参数按照API接口说明调用即可。

例如文字识别API，使用HTTPS POST发送：

```
https://aip.baidubce.com/rest/2.0/ocr/v1/general?access_token=24.f9ba9c5241b67688bb4adbed8bc91dec.2592000.1485570332.282335-8574074
```

> **说明：**方式一鉴权使用的Access_token必须通过API Key和Secret Key获取。

# 调用方式二

## 请求头域内容

OCR的API服务需要在请求的HTTP头域中包含以下信息：

* host（必填）
* x-bce-date （必填）
* x-bce-request-id（选填）
* authorization（必填）
* content-type（选填）
* content-length（选填）

作为示例，以下是一个标准的请求头域内容:

```http
POST /rest/2.0/ocr/v1/general? HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: 2015-03-24T13:02:00Z
connection: keep-alive
accept: */*
host: aip.baidubce.com
x-bce-request-id: 73c4e74c-3101-4a00-bf44-fe246959c05e
content-type: application/x-www-form-urlencoded
authorization: bce-auth-v1/46bd9968a6194b4bbdf0341f2286ccce/2015-03-24T13:02:00Z/1800/host;x-bce-date/994014d96b0eb26578e039fa053a4f9003425da4bfedf33f4790882fb4c54903
```

> **说明：**方式二鉴权使用的[API认证机制](https://cloud.baidu.com/doc/Reference/AuthenticationMechanism.html)authorization必须通过百度云的[AK/SK](https://cloud.baidu.com/doc/Reference/GetAKSK.html)生成。


# 错误信息格式

若请求错误，服务器将返回的JSON文本包含以下参数：

* **error_code：**错误码；关于错误码的详细信息请参考“[通用错误码](#通用错误码)和[业务相关错误码](#业务相关错误码)”。

* **error_msg：**错误描述信息，帮助理解和解决发生的错误。

例如Access Token失效返回：

```
{
  "error_code": 110,
  "error_msg": "Access token invalid or no longer valid"
}
```


需要重新获取新的Access Token再次请求即可。

**Access Token错误码**

| error_CODE | error_MSG                               | 解释               |
| ---------- | --------------------------------------- | ---------------- |
| 100        | Invalid parameter                       | 无效参数             |
| 110        | Access token invalid or no longer valid | Access Token过期失效 |

## 通用错误码

| 错误码 | 错误信息 | 描述 |
| --- | --- | --- |
| 216015 | module closed | 模块关闭 |
| 216100 | invalid param | 非法参数 |
| 216101 | not enough param | 参数数量不够 |
| 216102 | service not support | 业务不支持 |
| 216103 | param too long | 参数太长 |
| 216110 | appid not exist | APP ID不存在 |
| 216111 | invalid userid | 非法用户ID |
| 216200 | empty image | 空的图片 |
| 216201 | image format error | 图片格式错误 |
| 216202 | image size error | 图片大小错误 |
| 216300 | db error | DB错误 |
| 216400 | backend error | 后端系统错误 |
| 216401 | internal error | 内部错误 |
| 216500 | unknown error | 未知错误 |

## 业务相关错误码

| 错误码 | 错误信息 | 描述 |
| --- | --- | --- |
| 216600 | id number format error | 身份证的ID格式错误 |
| 216601 | id number and name not match | 身份证的ID和名字不匹配 |
| 216611 | user not exist | 用户不存在 |
| 216613 | user not found | 用户查找不到 |
| 216614 | not enough images | 图片信息不完整 |
| 216615 | fail to process images | 处理图片信息失败 |
| 216616 | image existed | 图片已存在 |
| 216617 | fail to add user | 添加用户失败 |
| 216618 | no user in group | 群组里没有用户 |
| 216630 | recognize error | 识别错误 |
| 216631 | recognize bank card error | 识别银行卡错误 |

# 识别接口

## 通用文字识别

**接口描述**

用户向服务请求识别某张图中的所有文字。

**调用方式一请求示例**

* HTTP 方法： POST

* 请求URL： `https://aip.baidubce.com/rest/2.0/ocr/v1/general`

* URL参数：<br>

| 参数           | 值                                 |
| ------------ | --------------------------------- |
| access_token | 通过API Key和Secret Key获取的access_token,参考“[Access Token获取](http://ai.baidu.com/docs#Beginner-Auth)” |

* Header如下：

| 参数           | 值                                 |
| ------------ | --------------------------------- |
| Content-Type | application/x-www-form-urlencoded |

* Body中数据示例：

| 参数    | 值          |
| ----- | ---------- |
| image | 图像base64编码 |



**调用方式二请求示例**

```
POST /rest/2.0/ocr/v1/general HTTP/1.1

x-bce-date: 2016-10-18T02: 20: 01Z,
host: aip.baidubce.com,
accept: */*,
authorization: bce-auth-v1/fbf9f7889585498d8ba8a68da26cbb2e/2016-10-18T02: 20: 01Z/1800/host/6c7cb35358b5c870666d14588af648e8c941a8b2300becd97831803198ee7a6d

image=%2F9j%2F4AAQSkZJRgABAQAAAQABAAD%2F4QDKRXhpZgAATU0AK

```

**请求参数**

| 参数 | 是否必选 | 类型 | 可选值范围 | 说明 |
| --- | --- | --- | ---- | ---- |
| image | true | string | - | 图像数据，base64编码 |
| recognize_granularity | false | string | big、small | 是否定位单字符位置，big：不定位单字符位置，默认值；small：定位单字符位置  |
| mask | false | string | - | 表示mask区域的黑白灰度图片，白色代表选中, base64编码 |
| language_type | false | string | CHN_ENG、ENG、POR、FRE、GER、ITA、SPA、RUS、JAP | 识别语言类型，默认为CHN_ENG。可选值包括：<br/>- CHN_ENG：中英文混合；<br/>- ENG：英文；<br/>- POR：葡萄牙语；<br/>- FRE：法语；<br/>- GER：德语；<br/>- ITA：意大利语；<br/>- SPA：西班牙语；<br/>- RUS：俄语；<br/>- JAP：日语 |
| detect_direction | false | boolean | true、false | 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br/>- true：检测朝向；<br/>- false：不检测朝向。 |
| detect_language | FALSE | string | true、false | 是否检测语言，默认不检测。当前支持（中文、英语、日语、韩语） |
| classify_dimension | FALSE | string | lottery | 分类维度（根据OCR结果进行分类），逗号分隔，当前只支持lottery。<br/>lottery：彩票分类，设置detect_direction有助于提升精度 |
| vertexes_location | FALSE | string | true、false | 是否返回文字外接多边形顶点位置，不支持单字位置。默认为false |

**返回示例**

```http
HTTP/1.1 200 OK
x-bce-request-id: 73c4e74c-3101-4a00-bf44-fe246959c05e
Cache-Control: no-cache
Server: BWS
Date: Tue, 18 Oct 2016 02:21:01 GMT
Content-Type: application/json;charset=UTF-8
{
"log_id": 3523983603,
"direction": 0, //detect_direction=true时存在
"words_result_num": 2,
"words_result": [
    {
        "location": {
            "left": 35,
            "top": 53,
            "width": 193,
            "height": 109
        },
        "words": "感动",
        "chars": [    //recognize_granularity=small时存在
            {
                "location": {
                    "left": 56,
                    "top": 65,
                    "width": 69,
                    "height": 88
                },
                "char": "感"
            },
            {
                "location": {
                    "left": 140,
                    "top": 65,
                    "width": 70,
                    "height": 88
                },
                "char": "动"
            }
        ]
    }
    ...
]
}
```
**返回参数**

| 字段 | 必选 | 类型 | 说明 |
| --- | --- | --- | ---- |
| direction | 否 | int | 图像方向，当detect_direction=true时存在。<br/>- -1:未定义，<br/>- 0:正向，<br/>- 1: 逆时针90度，<br/>- 2:逆时针180度，<br/>- 3:逆时针270度 |
| log_id | 是 | int | 唯一的log id，用于问题定位 |
| words_result | 是 | array | 定位和识别结果数组 |
| words_result_num | 是 | int | 识别结果数，表示words_result的元素个数 |
| +vertexes_location | 否 | array | 当前为四个顶点: 左上，右上，右下，左下。当vertexes_location=true时存在 |
| ++x | 是 | int | 水平坐标（坐标0点为左上角） |
| ++y | 是 | int | 垂直坐标（坐标0点为左上角） |
| +location | 是 | array | 位置数组（坐标0点为左上角） |
| ++left | 是 | int | 表示定位位置的长方形左上顶点的水平坐标 |
| ++top | 是 | int | 表示定位位置的长方形左上顶点的垂直坐标 |
| ++width | 是 | int | 表示定位位置的长方形的宽度 |
| ++height | 是 | int | 表示定位位置的长方形的高度 |
| +words | 否 | string | 识别结果字符串 |
| +chars | 否 | array | 单字符结果，recognize_granularity=small时存在 |
| ++location | 是 | array | 位置数组（坐标0点为左上角） |
| +++left | 是 | int | 表示定位位置的长方形左上顶点的水平坐标 |
| +++top | 是 | int | 表示定位位置的长方形左上顶点的垂直坐标 |
| +++width | 是 | int | 表示定位定位位置的长方形的宽度 |
| +++height | 是 | int | 表示位置的长方形的高度 |
| ++char | 是 | string | 单字符识别结果 |


## 身份证识别

**接口描述**

用户向服务请求识别身份证，身份证识别包括正面和背面。

**调用方式一请求示例**

* HTTP 方法： POST

* 请求URL： `https://aip.baidubce.com/rest/2.0/ocr/v1/idcard`

* URL参数：<br>

| 参数           | 值                                 |
| ------------ | --------------------------------- |
| access_token | 通过API Key和Secret Key获取的access_token,参考“[Access Token获取](http://ai.baidu.com/docs#Beginner-Auth)” |

* Header如下：

| 参数           | 值                                 |
| ------------ | --------------------------------- |
| Content-Type | application/x-www-form-urlencoded |

* Body中数据如下：

| 参数           | 值                                    |
| ------------ | ------------------------------------ |
| image        | 图像base64编码                           |
| id_card_side | 范围：front/back。front：身份证正面，back：身份证背面 |



**调用方式二请求示例**

```
POST /api/v1/ocr/idcard HTTP/1.1
x-bce-date: 2016-10-18T02: 20: 01Z,
host: aip.baidubce.com,
accept: */*,
authorization: bce-auth-v1/fbf9f7889585498d8ba8a68da26cbb2e/2016-10-18T02: 20: 01Z/1800/host/6c7cb35358b5c870666d14588af648e8c941a8b2300becd97831803198ee7a6d

id_card_side=front&image=%2F9j%2F4AAQSkZJRgABAQAAAQABAAD%2F4QDKRXhpZgAATU0AK...

```

**请求参数**

| 参数 | 是否必选 | 类型 | 可选值范围 | 说明 |
| --- | --- | --- | ---- | ---- |
| detect_direction | false | boolean | true、false | 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br/>- true：检测朝向；<br/>- false：不检测朝向。 |
| id_card_side | true | string | front、back | front：身份证正面；back：身份证背面 |
| image | true | string | - | 图像数据，base64编码 |


**返回示例**

```http
HTTP/1.1 200 OK
x-bce-request-id: 73c4e74c-3101-4a00-bf44-fe246959c05e
Cache-Control: no-cache
Server: BWS
Date: Tue, 18 Oct 2016 02:21:01 GMT
Content-Type: application/json;charset=UTF-8
{
    "log_id": 7037721,
    "direction": 0, //detect_direction=true时存在
    "words_result_num": 2,
    "words_result": {
        "住址": {
            "location": {
                "left": 227,
                "top": 235,
                "width": 229,
                "height": 51
            },
            "words": "湖北省天门市渔薪镇杨咀村一组2号",
        }
        ...
    }
}
```

**返回参数**

| 字段 | 必选 | 类型 | 说明 |
| --- | --- | --- | ---- |
| direction | 否 | int | 图像方向，当detect_direction=true时存在。<br/>- -1:未定义，<br/>- 0:正向，<br/>- 1: 逆时针90度，<br/>- 2:逆时针180度，<br/>- 3:逆时针270度 |
| log_id | 是 | int | 唯一的log id，用于问题定位 |
| words_result | 是 | array | 定位和识别结果数组 |
| words_result_num | 是 | int | 识别结果数，表示words_result的元素个数 |
| +location | 是 | array | 位置数组（坐标0点为左上角） |
| ++left | 是 | int | 表示定位位置的长方形左上顶点的水平坐标 |
| ++top | 是 | int | 表示定位位置的长方形左上顶点的垂直坐标 |
| ++width | 是 | int | 表示定位位置的长方形的宽度 |
| ++height | 是 | int | 表示定位位置的长方形的高度 |
| +words | 否 | string | 识别结果字符串 |


## 银行卡识别

**接口描述**

识别银行卡并返回卡号。

**调用方式一请求示例**

* HTTP 方法: POST

* 请求URL: `https://aip.baidubce.com/rest/2.0/ocr/v1/bankcard`

* URL参数：<br>

| 参数           | 值                                 |
| ------------ | --------------------------------- |
| access_token | 通过API Key和Secret Key获取的access_token,参考“[Access Token获取](http://ai.baidu.com/docs#Beginner-Auth)” |

* Header如下：

| 参数           | 值                                 |
| ------------ | --------------------------------- |
| Content-Type | application/x-www-form-urlencoded |

* Body中数据如下：

| 参数    | 值          |
| ----- | ---------- |
| image | 图像base64编码 |



**调用方式二请求示例**

```http
POST /api/v1/ocr/bankcard HTTP/1.1
x-bce-date: 2016-10-18T02: 20: 01Z,
host: aip.baidubce.com,
accept: */*,
authorization: bce-auth-v1/fbf9f7889585498d8ba8a68da26cbb2e/2016-10-18T02: 20: 01Z/1800/host/6c7cb35358b5c870666d14588af648e8c941a8b2300becd97831803198ee7a6d

image=%2F9j%2F4AAQSkZJRgABAQAAAQABAAD%2F4QDKRXhpZgAATU0AK

```

**请求参数**

| 参数    | 类型     | 是否必须 | 说明             |
| ----- | ------ | ---- | -------------- |
| image | string | 是    | 图像数据，base64编码。 |


**返回示例**

```http
{
    "log_id": 1447188951,
    "result": {
        "bank_card_number": "622262 0110024275769"
    }
}
```

**返回参数**

| 参数                | 类型     | 是否必须 | 说明            |
| ----------------- | ------ | ---- | ------------- |
| log_id            | int | 是    | 请求标识码，随机数，唯一。 |
| result            | object | 是    | 返回结果          |
| +bank_card_number | string | 是    | 银行卡卡号         |


​
