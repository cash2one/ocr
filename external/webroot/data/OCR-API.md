# 简介

本文档主要针对API开发者，调用AI服务相关的API接口有两种调用方式，两种不同的调用方式采用相同的接口URL，区别在于请求方式和鉴权方法不一样，请求参数和返回结果一致。

**请求消息体格式**

API服务要求使用JSON格式的结构体来描述一个请求的具体内容, 然后通过urlencode格式化请求体。

**请求返回格式**

API服务均采用JSON格式的消息体作为响应返回的格式。

**服务限制**

OCR服务对图片格式、图片大小有限制，格式支持jpg、png，长宽都要小于2048px。

# 调用方式一

## 请求URL数据格式

向API服务地址使用POST发送请求，必须在URL中带上参数：

**access_token:** 必须参数，参考“[Access Token获取](/docs#Beginner-Auth)”。

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
content-type: application/json
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

<table>
<tr><th>错误码</th><th>错误信息</th><th>描述</th></tr>
<tr><td>216015</td><td>module closed</td><td>模块关闭</td></tr>
<tr><td>216100</td><td>invalid param</td><td>非法参数</td></tr>
<tr><td>216101</td><td>not enough param</td><td>参数数量不够</td></tr>
<tr><td>216102</td><td>service not support</td><td>业务不支持</td></tr>
<tr><td>216103</td><td>param too long</td><td>参数太长</td></tr>
<tr><td>216110</td><td>appid not exist</td><td>APP ID不存在</td></tr>
<tr><td>216111</td><td>invalid userid</td><td>非法用户ID</td></tr>
<tr><td>216200</td><td>empty image</td><td>空的图片</td></tr>
<tr><td>216201</td><td>image format error</td><td>图片格式错误</td></tr>
<tr><td>216202</td><td>image size error</td><td>图片大小错误</td></tr>
<tr><td>216300</td><td>db error</td><td>DB错误</td></tr>
<tr><td>216400</td><td>backend error</td><td>后端系统错误</td></tr>
<tr><td>216401</td><td>internal error</td><td>内部错误</td></tr>
<tr><td>216500</td><td>unknown error</td><td>未知错误</td></tr>
</table>

## 业务相关错误码

<table>
<tr><th>错误码</th><th>错误信息</th><th>描述</th></tr>
<tr><td>216600</td><td>id number format error</td><td>身份证的ID格式错误</td></tr>
<tr><td>216601</td><td>id number and name not match</td><td>身份证的ID和名字不匹配</td></tr>
<tr><td>216611</td><td>user not exist</td><td>用户不存在</td></tr>
<tr><td>216613</td><td>user not found</td><td>用户查找不到</td></tr>
<tr><td>216614</td><td>not enough images</td><td>图片信息不完整</td></tr>
<tr><td>216615</td><td>fail to process images</td><td>处理图片信息失败</td></tr>
<tr><td>216616</td><td>image existed</td><td>图片已存在</td></tr>
<tr><td>216617</td><td>fail to add user</td><td>添加用户失败</td></tr>
<tr><td>216618</td><td>no user in group</td><td>群组里没有用户</td></tr>
<tr><td>216630</td><td>recognize error</td><td>识别错误</td></tr>
<tr><td>216631</td><td>recognize bank card error</td><td>识别银行卡错误</td></tr>
</table>



# 识别接口

## 通用文字识别

**接口描述**

用户向服务请求识别某张图中的所有文字。

**调用方式一请求示例**

* HTTP 方法： POST

* 请求URL： https://aip.baidubce.com/rest/2.0/ocr/v1/general

##### Header如下：

| 参数           | 值                                 |
| ------------ | --------------------------------- |
| Content-Type | application/x-www-form-urlencoded |

##### Body中数据如下：

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

<table>
<tr><th>参数</th><th>是否必选</th><th>类型</th><th>可选值范围</th><th>说明</th></tr>
<tr><td>detect_direction</td><td>false</td><td>boolean</td><td>true、false</td><td>是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<ul><li>true：检测朝向；</li><li>false：不检测朝向。</li></ul></td></tr>
<tr><td>image</td><td>true</td><td>string</td><td>-</td><td>图像数据，base64编码</td></tr>
<tr><td>language_type</td><td>false</td><td>string</td><td>CHN_ENG、ENG、POR、FRE、GER、ITA、SPA、RUS、JAP</td><td>识别语言类型，默认为CHN_ENG。可选值包括：<ul><li>CHN_ENG：中英文混合；</li><li>ENG：英文；</li><li>POR：葡萄牙语；</li><li>FRE：法语；</li><li>GER：德语；</li><li>ITA：意大利语；</li><li>SPA：西班牙语；</li><li>RUS：俄语；</li><li>JAP：日语</li></ul></td></tr>
<tr><td>mask</td><td>false</td><td>string</td><td>-</td><td>表示mask区域的黑白灰度图片，白色代表选中, base64编码</td></tr>
<tr><td>recognize_granularity</td><td>false</td><td>string</td><td>big、small</td><td>是否定位单字符位置，big：不定位单字符位置，默认值；small：定位单字符位置 </td></tr>
</table>

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

<table>
<tr><th>字段</th><th>必选</th><th>类型</th><th>说明</th></tr>
<tr><td>direction</td><td>否</td><td>int32</td><td>图像方向，当detect_direction=true时存在。<ul><li>-1:未定义，</li><li>0:正向，</li><li>1: 逆时针90度，</li><li>2:逆时针180度，</li><li>3:逆时针270度</li></ul></td></tr>
<tr><td>log_id</td><td>是</td><td>uint64</td><td>唯一的log id，用于问题定位</td></tr>
<tr><td>words_result</td><td>是</td><td>array()</td><td>定位和识别结果数组</td></tr>
<tr><td>words_result_num</td><td>是</td><td>uint32</td><td>识别结果数，表示words_result的元素个数</td></tr>
<tr><td>+location</td><td>是</td><td>array()</td><td>位置数组（坐标0点为左上角）</td></tr>
<tr><td>++left</td><td>是</td><td>uint32</td><td>表示定位位置的长方形左上顶点的水平坐标</td></tr>
<tr><td>++top</td><td>是</td><td>uint32</td><td>表示定位位置的长方形左上顶点的垂直坐标</td></tr>
<tr><td>++width</td><td>是</td><td>uint32</td><td>表示定位位置的长方形的宽度</td></tr>
<tr><td>++height</td><td>是</td><td>uint32</td><td>表示定位位置的长方形的高度</td></tr>
<tr><td>+words</td><td>否</td><td>string</td><td>识别结果字符串</td></tr>
<tr><td>+chars</td><td>否</td><td>array()</td><td>单字符结果，recognize_granularity=small时存在</td></tr>
<tr><td>++location</td><td>是</td><td>array()</td><td>位置数组（坐标0点为左上角）</td></tr>
<tr><td>+++left</td><td>是</td><td>uint32</td><td>表示定位位置的长方形左上顶点的水平坐标</td></tr>
<tr><td>+++top</td><td>是</td><td>uint32</td><td>表示定位位置的长方形左上顶点的垂直坐标</td></tr>
<tr><td>+++width</td><td>是</td><td>uint32</td><td>表示定位定位位置的长方形的宽度</td></tr>
<tr><td>+++height</td><td>是</td><td>uint32</td><td>表示位置的长方形的高度</td></tr>
<tr><td>++char</td><td>是</td><td>string</td><td>单字符识别结果</td></tr>
</table>


## 身份证识别

**接口描述**

用户向服务请求识别身份证，身份证识别包括正面和背面。

**调用方式一请求示例**

* HTTP 方法： POST

* 请求URL： https://aip.baidubce.com/rest/2.0/ocr/v1/idcard

##### Header如下：

| 参数           | 值                                 |
| ------------ | --------------------------------- |
| Content-Type | application/x-www-form-urlencoded |

##### Body中数据如下：

| 参数    | 值          |
| ----- | ---------- |
| image | 图像base64编码 |



**调用方式二请求示例**

```
POST /api/v1/ocr/idcard HTTP/1.1
x-bce-date: 2016-10-18T02: 20: 01Z,
host: aip.baidubce.com,
accept: */*,
authorization: bce-auth-v1/fbf9f7889585498d8ba8a68da26cbb2e/2016-10-18T02: 20: 01Z/1800/host/6c7cb35358b5c870666d14588af648e8c941a8b2300becd97831803198ee7a6d

image=%2F9j%2F4AAQSkZJRgABAQAAAQABAAD%2F4QDKRXhpZgAATU0AK

```


**请求参数**

<table>
<tr><th>参数</th><th>是否必选</th><th>类型</th><th>可选值范围</th><th>说明</th></tr>
<tr><td>detect_direction</td><td>false</td><td>boolean</td><td>true、false</td><td>是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<ul><li>true：检测朝向；</li><li>false：不检测朝向。</li></ul></td></tr>
<tr><td>id_card_side</td><td>true</td><td>string</td><td>front、back</td><td>front：身份证正面；back：身份证背面</td></tr>
<tr><td>image</td><td>true</td><td>string</td><td>-</td><td>图像数据，base64编码</td></tr>
</table>


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

<table>
<tr><th>字段</th><th>必选</th><th>类型</th><th>说明</th></tr>
<tr><td>direction</td><td>否</td><td>int32</td><td>图像方向，当detect_direction=true时存在。<ul><li>-1:未定义，</li><li>0:正向，</li><li>1: 逆时针90度，</li><li>2:逆时针180度，</li><li>3:逆时针270度</li></ul></td></tr>
<tr><td>log_id</td><td>是</td><td>uint64</td><td>唯一的log id，用于问题定位</td></tr>
<tr><td>words_result</td><td>是</td><td>array()</td><td>定位和识别结果数组</td></tr>
<tr><td>words_result_num</td><td>是</td><td>uint32</td><td>识别结果数，表示words_result的元素个数</td></tr>
<tr><td>+location</td><td>是</td><td>array()</td><td>位置数组（坐标0点为左上角）</td></tr>
<tr><td>++left</td><td>是</td><td>uint32</td><td>表示定位位置的长方形左上顶点的水平坐标</td></tr>
<tr><td>++top</td><td>是</td><td>uint32</td><td>表示定位位置的长方形左上顶点的垂直坐标</td></tr>
<tr><td>++width</td><td>是</td><td>uint32</td><td>表示定位位置的长方形的宽度</td></tr>
<tr><td>++height</td><td>是</td><td>uint32</td><td>表示定位位置的长方形的高度</td></tr>
<tr><td>+words</td><td>否</td><td>string</td><td>识别结果字符串</td></tr>
</table>


## 银行卡识别

**接口描述**

识别银行卡并返回卡号。

**调用方式一请求示例**

* HTTP 方法: POST

* 请求URL: https://aip.baidubce.com/rest/2.0/ocr/v1/bankcard

##### Header如下：

| 参数           | 值                                 |
| ------------ | --------------------------------- |
| Content-Type | application/x-www-form-urlencoded |

##### Body中数据如下：

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

image=%2F9j%2F4AAQSkZJRgABAQAAAQABAAD%2F4QDKRXhpZgAATU0AK&access_token=21.21cda41bd9739ce5a083f3326f64b610.2592000.1469180474.1686270206-11101624

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
| log_id            | uint64 | 是    | 请求标识码，随机数，唯一。 |
| result            | object | 是    | 返回结果          |
| +bank_card_number | string | 是    | 银行卡卡号         |


​	
