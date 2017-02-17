
# 简介

本文档主要针对API开发者，调用AI服务相关的API接口有两种调用方式，两种不同的调用方式采用相同的接口URL，区别在于请求方式和鉴权方法不一样，请求参数和返回结果一致。

**请求消息体格式**

API服务要求使用POST方式调用，Content-Type为application/x-www-form-urlencoded，然后通过urlencode格式化请求体。

**请求返回格式**

API服务均采用JSON格式的消息体作为响应返回的格式。

# 调用方式一

## 请求URL数据格式

向API服务地址使用POST发送请求，必须在URL中带上参数：

**access_token:** 必须参数，参考“[Access Token获取](http://ai.baidu.com/docs#Beginner-Auth)”。

POST中参数按照API接口说明调用即可。

例如黄反识别API，使用HTTPS POST发送：

```
https://aip.baidubce.com/rest/2.0/antiporn/v1/detect?access_token=24.f9ba9c5241b67688bb4adbed8bc91dec.2592000.1485570332.282335-8574074
```

**请求消息体格式**

API服务要求使用POST方式调用，Content-Type为application/x-www-form-urlencoded，然后通过urlencode格式化请求体。

**请求返回格式**

API服务均采用JSON格式的消息体作为响应返回的格式。

> **说明：**方式一鉴权使用的Access_token必须通过API Key和Secret Key获取。

# 调用方式二

## 请求头域内容

黄反识别的API服务需要在请求的HTTP头域中包含以下信息：

* host（必填）
* x-bce-date （必填）
* x-bce-request-id（选填）
* authorization（必填）
* content-type（选填）
* content-length（选填）

作为示例，以下是一个标准的请求头域内容:

```http
POST rest/2.0/antiporn/v1/detect? HTTP/1.1
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

* **error_code：**错误码；关于错误码的详细信息请参考“[通用错误码](#通用错误码)和业务相关错误码”。

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
| 216402 | face not found | 没有找到人脸 |
| 216500 | unknown error | 未知错误 |

# 黄反识别

**接口描述**

该请求用于鉴定图片的色情度。即对于输入的一张图片（可正常解码，且长宽比适宜），输出图片的色情度。目前支持三个维度：色情、性感、正常。

**调用方式一请求示例**

* HTTP 方法： POST

* 请求URL： `https://aip.baidubce.com/rest/2.0/antiporn/v1/detect`

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
POST /rest/2.0/antiporn/v1/detect HTTP/1.1

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

```
result: [
    {"class_name": "色情", ""probability": 0.014619}，
    {"class_name": "正常", ""probability": 0.171783}，
    {"class_name": "性感", ""probability": 0.813598}
    ]
```

**返回参数**

| 字段         | 类型                   | 是否必须 | 说明                      |
| ---------- | -------------------- | ---- | ----------------------- |
| result_num | uint32               | 是    | 返回结果数目，即：result数组中元素个数。 |
| result     | array(array(double)) | 是    | 结果数组，每项内容对应一个分类维度的结果。   |
| log_id     | uint64               | 是    | 请求标识码，随机数，唯一。           |

其中元素的每项内容包含以下字段：

| 字段          | 类型     | 是否必须 | 说明      | 示例               |
| ----------- | ------ | ---- | ------- | ---------------- |
| class_name  | string | 是    | 分类结果名称  | 色情               |
| probability | double | 是    | 分类结果置信度 | 0.89471650123596 |



