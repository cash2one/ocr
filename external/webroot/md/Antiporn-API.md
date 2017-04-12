
# 简介

Hi，您好，欢迎使用百度黄反识别API服务。

本文档主要针对API开发者，描述百度黄反识别接口服务的相关技术内容。如果您对文档内容有任何疑问，可以通过以下几种方式联系我们：

* 在百度云控制台内**提交工单**，咨询问题类型请选择**人工智能服务**；
* 加入**开发者QQ群**：224994340；

## 接口能力

| 接口名称  | 接口能力简要描述                     |
| :--------- | :--------------------------- |
| 色情识别  | 识别图片的色情程度，返回图片的色情、性感、正常分值   |
| 色情GIF识别  | 识别GIF图片的色情程度，返回图片的色情、性感、正常分值   |

## 请求格式

POST方式调用

**注意：**Content-Type为`application/x-www-form-urlencoded`，然后通过`urlencode`格式化请求体。

## 返回格式

JSON格式

## 请求限制

请求图片需经过`base64编码`：图片的base64编码指将一副图片数据编码成一串字符串，使用该字符串代替图像地址。您可以首先得到图片的二进制，然后用Base64格式编码即可。

**注意：**图片的base64编码是不包含图片头的，如`（data:image/jpg;base64,）`

**请求格式支持：**PNG、JPG、JPEG、BMP；Gif色情识别支持GIF图片。

# 调用方式

调用AI服务相关的API接口有两种调用方式，两种不同的调用方式采用相同的接口URL。

区别在于**请求方式**和**鉴权方法**不一样，请求参数和返回结果一致。

## 调用方式一

**请求URL数据格式**

向API服务地址使用POST发送请求，必须在URL中带上参数：

**access_token:** 必须参数，参考“[Access Token获取](http://ai.baidu.com/docs#/Auth)”。

> 注意：`access_token`的有效期为30天，需要每30天进行定期更换；

POST中参数按照API接口说明调用即可。

例如人脸识别API，使用HTTPS POST发送：

```
https://aip.baidubce.com/rest/2.0/face/v1/detect?access_token=24.f9ba9c5241b67688bb4adbed8bc91dec.2592000.1485570332.282335-8574074
```

**获取access_token示例代码**

{% AccessToken %}

> **说明：**方式一鉴权使用的Access_token必须通过API Key和Secret Key获取。

## 调用方式二

**请求头域内容**

在请求的HTTP头域中包含以下信息：

* host（必填）
* x-bce-date （必填）
* x-bce-request-id（选填）
* authorization（必填）
* content-type（必填）
* content-length（选填）

作为示例，以下是一个标准的人脸识别的请求头域内容:

```http
POST /rest/2.0/face/v1/detect HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: 2015-03-24T13:02:00Z
connection: keep-alive
accept: */*
host: aip.baidubce.com
x-bce-request-id: 73c4e74c-3101-4a00-bf44-fe246959c05e
content-type: application/x-www-form-urlencoded
authorization: bce-auth-v1/46bd9968a6194b4bbdf0341f2286ccce/2015-03-24T13:02:00Z/1800/host;x-bce-date/994014d96b0eb26578e039fa053a4f9003425da4bfedf33f4790882fb4c54903
```

> **说明：**方式二鉴权使用的[API认证机制](https://cloud.baidu.com/doc/Reference/AuthenticationMechanism.html)，authorization必须通过百度云的[AK/SK](https://cloud.baidu.com/doc/Reference/GetAKSK.html)生成。


# 色情识别

## 接口描述

该请求用于鉴定图片的色情度。即对于输入的一张图片（可正常解码，且长宽比适宜），输出图片的色情度。目前支持三个维度：色情、性感、正常。

## 请求说明

**请求示例**

HTTP 方法：`POST`

请求URL： `https://aip.baidubce.com/rest/2.0/antiporn/v1/detect`

URL参数：

| 参数           | 值                                        |
| ------------ | ---------------------------------------- |
| access_token | 通过API Key和Secret Key获取的access_token,参考“[Access Token获取](http://ai.baidu.com/docs#/Auth)” |

Header如下：

| 参数           | 值                                 |
| ------------ | --------------------------------- |
| Content-Type | application/x-www-form-urlencoded |

Body中放置请求参数，参数详情如下：

**请求参数**

| 参数    | 类型     | 是否必须 | 说明             |
| ----- | ------ | ---- | -------------- |
| image | string | 是    | 图像数据，base64编码 |

**请求示例代码**

**提示一：**使用示例代码前，请记得替换其中的示例Token、图片地址或Base64信息。

**提示二：**部分语言依赖的类或库，请在代码注释中查看下载地址。

{% Antiporn-API-Detect %}


## 返回说明

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

**返回示例**

```
result: [
    {"class_name": "色情", ""probability": 0.014619}，
    {"class_name": "正常", ""probability": 0.171783}，
    {"class_name": "性感", ""probability": 0.813598}
    ]
```


# GIF色情图像识别

## 接口描述

该请求用于鉴定GIF图片的色情度，对于非gif接口，请使用[黄反识别接口](#黄反识别)。接口会对图片中每一帧进行识别，并返回所有检测结果中色情值最大的为结果。目前支持三个维度：色情、性感、正常。

## 请求说明

**请求示例**

HTTP 方法：`POST`

请求URL： `https://aip.baidubce.com/rest/2.0/antiporn/v1/detect_gif`

URL参数：

| 参数           | 值                                        |
| ------------ | ---------------------------------------- |
| access_token | 通过API Key和Secret Key获取的access_token,参考“[Access Token获取](http://ai.baidu.com/docs#/Auth)” |

Header如下：

| 参数           | 值                                 |
| ------------ | --------------------------------- |
| Content-Type | application/x-www-form-urlencoded |

Body中放置请求参数，参数详情如下：

**请求参数**

| 参数    | 类型     | 是否必须 | 说明             |
| ----- | ------ | ------- | ------------------ |
| image | string | 是    | 图像数据，base64编码。 |

**请求示例代码**

请参考色情识别的代码内容。

**访问限制**

| 检查项       | 限制条件            |
| ------------- | --------------- |
| 图片格式       | gif             |
| 每帧编码后大小   | < 4M            |
| 帧数        | 不超过50           |
| GIF图片整体大小 | base64编码后不超过20M |

## 返回说明

**返回参数**

| 参数               | 类型            | 是否必选 | 描述                          |
| :--------------- | :------------- | :------- | :-------------------------- |
| log_id           | uint64        | 是    | 请求标识码，随机数，唯一                |
| frame_count      | uint64        | 是    | gif总帧数                      |
| porn_probability | double        | 是    | 色情识别置信度                     |
| result_num       | Int           | 是    | 返回结果数目，即：result数组中元素个数      |
| result           | Array[Object] | 是    | 结果数组，每项内容对应一个分类维度的结果        |
| +class_name      | String        | 是    | 分类结果名称，示例：色情                |
| +probability     | double        | 是    | 分类结果置信度，示例：0.89471650123596 |


**返回示例**

```
{
   "frame_count":9,
   "result":[
      {
         "probability":0.006611,
         "class_name":"色情"
      },
      {
         "probability":0.100528,
         "class_name":"性感"
      },
      {
         "probability":0.89286,
         "class_name":"正常"
      }
   ],
   "result_num":3,
   "porn_probability":0.006611,
   "logid":616892616
}
```

# 错误码

若请求错误，服务器将返回的JSON文本包含以下参数：

* **error_code：**错误码。

* **error_msg：**错误描述信息，帮助理解和解决发生的错误。

例如Access Token失效返回：

```
{
  "error_code": 110,
  "error_msg": "Access token invalid or no longer valid"
}
```

需要重新获取新的Access Token再次请求即可。

| 错误码    | 错误信息                     | 描述          |
| ------ | ------------------------ | ----------- |
| 4      | Open api request limit reached    | 集群超限额  |
| 17     | Open api daily request limit reached   | 每天流量超限额  |
| 18     | Open api qps request limit reached   | QPS超限额  |
| 19     | Open api total request limit reached  | 请求总量超限额  |
| 100    | Invalid parameter             | 无效参数     |
| 110    | Access token invalid or no longer valid | Access Token失效 |
| 111    | Access token expired | Access token过期 |
| 216015 | module closed            | 模块关闭        |
| 216100 | invalid param            | 非法参数        |
| 216101 | not enough param         | 参数数量不够      |
| 216102 | service not support      | 业务不支持       |
| 216103 | param too long           | 参数太长        |
| 216110 | appid not exist          | APP ID不存在   |
| 216111 | invalid userid           | 非法用户ID      |
| 216200 | empty image              | 空的图片        |
| 216201 | image format error       | 图片格式错误      |
| 216202 | image size error         | 图片大小错误      |
| 216300 | db error                 | DB错误        |
| 216400 | backend error            | 后端系统错误      |
| 216401 | internal error           | 内部错误        |
| 216500 | unknown error            | 未知错误        |
| 282000 | logic internal error     | 业务逻辑层内部错误   |
| 282001 | logic backend error      | 业务逻辑层后端服务错误 |
| 282202 | antiporn detect timeout  | 检测超时        |
| 282203 | image frame size error   | gif单帧大小超限   |
| 282204 | image frames limit error | gif总帧数超限    |
| 282205 | image fromat must gif    | 图片格式错误      |