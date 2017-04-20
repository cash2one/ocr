# 简介

Hi，您好，欢迎使用百度人脸识别API服务。

本文档主要针对API开发者，描述百度人脸识别接口服务的相关技术内容。如果您对文档内容有任何疑问，可以通过以下几种方式联系我们：

* 在百度云控制台内**提交工单**，咨询问题类型请选择**人工智能服务**；
* 加入**开发者QQ群**：224994340；

## 接口能力

| 接口名称  | 接口能力简要描述                     |
| :---- | :--------------------------- |
| 人脸检测  | 检测人脸并定位，返回五官关键点，及人脸各属性值      |
| 人脸比对  | 返回两两比对的人脸相似值                 |
| 人脸识别  | 在人脸库中查找相似的人脸                |
| 人脸认证  | 识别上传的图片是否为指定用户               |
| 人脸库设置 | 对人脸库的相关操作，如注册、删除、更新、查找用户信息等 |

## 请求格式

POST方式调用

**注意：**Content-Type为`application/x-www-form-urlencoded`，然后通过`urlencode`格式化请求体。

## 返回格式

JSON格式

## 请求限制

请求图片需经过`base64编码`：图片的base64编码指将一副图片数据编码成一串字符串，使用该字符串代替图像地址。您可以首先得到图片的二进制，然后用Base64格式编码即可。

**注意：**图片的base64编码是不包含图片头的，如`（data:image/jpg;base64,）`

**请求格式支持：**PNG、JPG、JPEG、BMP，**不支持GIF图片**

| 接口名称  | 图片编码后大小限额 |
| ----- | --------- |
| 人脸检测  | 小于2M      |
| 人脸比对  | 小于10M     |
| 人脸识别  | 小于10M     |
| 人脸认证  | 小于10M     |
| 人脸库设置 | 小于10M     |

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


# 人脸检测

## 接口描述

检测请求图片中的人脸，返回人脸位置、72个关键点坐标、及人脸相关属性信息。

检测响应速度，与图片中人脸数量相关，人脸数量较多时响应时间会有些许延长。

典型应用场景：如**人脸属性分析**，**基于人脸关键点的加工分析**，**人脸营销活动**等。

> 五官位置会标记具体坐标；72个关键点坐标也包含具体坐标，但不包含对应位置的详细位置描述。

## 请求说明

**请求示例**

HTTP方法：`POST`

请求URL：`https://aip.baidubce.com/rest/2.0/face/v1/detect`

URL参数：

| 参数           | 值                                        |
| ------------ | ---------------------------------------- |
| access_token | 通过API Key和Secret Key获取的access_token,参考“[Access Token获取](http://ai.baidu.com/docs#/Auth)” |

Header：

| 参数           | 值                                 |
| ------------ | --------------------------------- |
| Content-Type | application/x-www-form-urlencoded |

Body中放置请求参数，参数详情如下：

**请求参数**

| 参数           | 是否必选 | 类型     | 说明                                       |
| --------------- | -------- | -------- | ---------------------------------------- |
| image        | 是    | string | base64编码后的图片数据，图片大小不超过2M。                |
| max_face_num | 否    | uint32 | 最多处理人脸数目，默认值1                            |
| face_fields  | 否    | string | 包括age,beauty,expression,faceshape,gender,glasses,landmark,race,qualities信息，逗号分隔，默认只返回人脸框、概率和旋转角度。 |

> 说明：face_fields参数，默认只返回人脸框、概率和旋转角度，age等更多属性，请在此参数中添加。

**请求示例代码**

**提示一：**使用示例代码前，请记得替换其中的示例Token、图片地址或Base64信息。

**提示二：**部分语言依赖的类或库，请在代码注释中查看下载地址。

{% Face-API-Detect %}

## 返回说明

**返回参数**

| 参数                      | 类型       | 是否必须 | 说明                                       |
| ----------------------- | -------- | ---- | ---------------------------------------- |
| log_id                  | uint64   | 是    | 日志id                                     |
| result_num              | uint32   | 是    | 人脸数目                                     |
| result                  | object[] | 是    | 人脸属性对象的集合                                |
| +age                    | double   | 否    | 年龄。face_fields包含age时返回                   |
| +beauty                 | double   | 否    | 美丑打分，范围0-100，越大表示越美。face_fields包含beauty时返回 |
| +cation                 | bject    | 是    | 人脸在图片中的位置                                |
| ++left                  | uint32   | 是    | 人脸区域离左边界的距离                              |
| ++top                   | uint32   | 是    | 人脸区域离上边界的距离                              |
| ++width                 | uint32   | 是    | 人脸区域的宽度                                  |
| ++height                | uint32   | 是    | 人脸区域的高度                                  |
| +face_probability       | double   | 是    | 人脸置信度，范围0-1                              |
| +rotation_angle         | int32    | 是    | 人脸框相对于竖直方向的顺时针旋转角，[-180,180]             |
| +yaw                    | double   | 是    | 三维旋转之左右旋转角[-90(左), 90(右)]                |
| +pitch                  | double   | 是    | 三维旋转之俯仰角度[-90(上), 90(下)]                 |
| +roll                   | double   | 是    | 平面内旋转角[-180(逆时针), 180(顺时针)]              |
| +expression             | uint32   | 否    | 表情，0，不笑；1，微笑；2，大笑。face_fields包含expression时返回 |
| +expression_probability | double   | 否    | 表情置信度，范围0~1。face_fields包含expression时返回   |
| +faceshape              | object[] | 否    | 脸型置信度。face_fields包含faceshape时返回          |
| ++type                  | string   | 是    | 脸型：square/triangle/oval/heart/round      |
| ++probability           | double   | 是    | 置信度：0~1                                  |
| +gender                 | string   | 否    | male、female。face_fields包含gender时返回       |
| +gender_probability     | double   | 否    | 性别置信度，范围0~1。face_fields包含gender时返回       |
| +glasses                | uint32   | 否    | 是否带眼镜，0-无眼镜，1-普通眼镜，2-墨镜。face_fields包含glasses时返回 |
| +glasses_probability    | double   | 否    | 眼镜置信度，范围0~1。face_fields包含glasses时返回      |
| +landmark               | object[] | 否    | 4个关键点位置，左眼中心、右眼中心、鼻尖、嘴中心。face_fields包含landmark时返回 |
| ++x                     | uint32   | 否    | x坐标                                      |
| ++y                     | uint32   | 否    | y坐标                                      |
| +landmark72             | object[] | 否    | 72个特征点位置，示例图 。face_fields包含landmark时返回   |
| ++x                     | uint32   | 否    | x坐标                                      |
| ++y                     | uint32   | 否    | y坐标                                      |
| +race                   | string   | 否    | yellow、white、black、arabs。face_fields包含race时返回 |
| +race_probability       | double   | 否    | 人种置信度，范围0~1。face_fields包含race时返回         |
| +qualities              | object   | 否    | 人脸质量信息。face_fields包含qualities时返回         |
| ++occlusion             | object   | 是    | 人脸各部分遮挡的概率， [0, 1] （待上线）                 |
| +++left_eye             | double   | 是    | 左眼                                       |
| +++right_eye            | double   | 是    | 右眼                                       |
| +++nose                 | double   | 是    | 鼻子                                       |
| +++mouth                | double   | 是    | 嘴                                        |
| +++left_cheek           | double   | 是    | 左脸颊                                      |
| +++right_cheek          | double   | 是    | 右脸颊                                      |
| +++chin                 | double   | 是    | 下巴                                       |
| ++blur                  | double   | 是    | 人脸模糊程度，[0, 1]。0表示清晰，1表示模糊（待上线）           |
| ++illumination          | -        | 是    | 取值范围在[0,255],表示脸部区域的光照程度（待上线）            |
| ++completeness          | -        | 是    | 人脸完整度，[0, 1]。0表示完整，1表示不完整（待上线）           |
| ++type                  | object   | 是    | 真实人脸/卡通人脸置信度                             |
| +++human                | -        | 是    | 真实人脸置信度，[0, 1]                           |
| +++cartoon              | -        | 是    | 卡通人脸置信度，[0, 1]                           |

**返回示例**

```json
{
    "result_num": 1,
    "result": [
        {
            "location": {
                "left": 90,
                "top": 92,
                "width": 111,
                "height": 99
            },
            "face_probability": 1,
            "rotation_angle": 6,
            "yaw": 11.61234664917,
            "pitch": -0.30852827429771,
            "roll": 8.8044967651367,
            "landmark": [
                {
                    "x": 105,
                    "y": 110
                },
              ...
            ],
            "landmark72": [
                {
                    "x": 88,
                    "y": 109
                },
               ...
            ],
            "gender": "male",
            "gender_probability": 0.99358034133911,
            "glasses": 0,
            "glasses_probability": 0.99991309642792,
            "race": "yellow",
            "race_probability": 0.99960690736771,
            "qualities": {
                "occlusion": {
                    "left_eye": 0.000085282314103097,
                    "right_eye": 0.00001094374601962,
                    "nose": 3.2677664307812e-7,
                    "mouth": 2.6582130940866e-10,
                    "left_cheek": 8.752236624332e-8,
                    "right_cheek": 1.0212766454742e-7,
                    "chin": 4.2632994357028e-10
                },
                "blur": 4.5613666312237e-41,
                "illumination": 0,
                "completeness": 0,
                "type": {
                    "human": 0.98398965597153,
                    "cartoon": 0.016010366380215
                }
            }
        }
    ],
    "log_id": 2418894422
}
```

# 人脸比对

## 接口描述

该请求用于比对多张图片中的人脸相似度并返回两两比对的得分，可用于判断两张脸是否是同一人的可能性大小。

典型应用场景：如**人证合一验证**，**用户认证**等，可与您现有的人脸库进行比对验证。

## 请求说明

**请求示例**

HTTP方法：`POST`

请求URL： `https://aip.baidubce.com/rest/2.0/faceverify/v1/match`

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

| 参数     | 是否必选 | 类型     | 说明                              |
| ------ | ----- | ------ | ------------------------------- |
| images | 是    | string | base64编码后的图片数据，可单次传入多张，多张图片半角逗号分隔，总共最大10M |

**请求代码示例**

**提示一：**使用示例代码前，请记得替换其中的示例Token、图片地址或Base64信息。

**提示二：**部分语言依赖的类或库，请在代码注释中查看下载地址。

{% Face-API-Match %}

## 返回说明

**返回参数**

| 字段         | 是否必选 | 类型            | 说明                                       |
| ---------- | ------- | ------------- | ------------------------------------ |
| log_id     | 是    | uint64        | 请求标识码，随机数，唯一                             |
| result_num | 是    | uint32        | 返回结果数目，即：result数组中元素个数                   |
| result     | 是    | array(object) | 结果数据，index和请求图片index对应。数组元素为每张图片的匹配得分数组，top n。 得分[0,100.0] |
| +index_i   | 是    | uint32        | 比对图片1的index                              |
| +index_j   | 是    | uint32        | 比对图片2的index                              |
| +score     | 是    | double        | 比对得分                                     |


**返回示例**

```json
//请求为四张图片，第三张解析失败
{
    "log_id": 73473737,
    "result_num":3,
    "result": [
        {
            "index_i": 0,
            "index_j": 1,
            "score": 44.3
        },
        {
            "index_i": 0,
            "index_j": 3,
            "score": 89.2
        },
        {
            "index_i": 1,
            "index_j": 3,
            "score": 10.4
        }
        ……
    ]
}
```

# 人脸识别

## 接口描述

用于计算指定组内用户，与上传图像中人脸的相似度。识别前提为您已经创建了一个**[人脸库](#人脸注册)**。

典型应用场景：如**人脸闸机**，**考勤签到**，**安防监控**等。

> **说明：**人脸识别返回值不直接判断是否是同一人，只返回用户信息及相似度分值。

> **说明：**推荐可判断为同一人的相似度分值为**80**，您也可以根据业务需求选择更合适的阈值。

## 请求说明

**请求示例**

HTTP方法：`POST`

请求URL： `https://aip.baidubce.com/rest/2.0/faceverify/v1/identify`

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

| 参数           | 是否必选 | 类型     | 说明                            |
| ------------ | ------- | ------- | ----------------------------- |
| group_id     | 是    | string | 用户组id（由数字、字母、下划线组成），长度限制128B  |
| images       | 是    | string | 图像base64编码，可单次传入多张，多张图片半角逗号分隔，总共最大10M |
| user_top_num | 否    | uint32 | 返回用户top数，默认为1                 |
| face_top_num | 否    | uint32 | 单用户人脸匹配得分top数，默认为1            |

**请求代码示例**

**提示一：**使用示例代码前，请记得替换其中的示例Token、图片地址或Base64信息。

**提示二：**部分语言依赖的类或库，请在代码注释中查看下载地址。

{% Face-API-Identify %}

## 返回说明

**返回参数**

| 字段         | 是否必选 | 类型            | 说明                                |
| ----------- | ------- | -------------- | --------------------------------- |
| log_id     | 是    | uint64        | 请求标识码，随机数，唯一                      |
| result_num | 是    | uint32        | 返回结果数目，即：result数组中元素个数            |
| result     | 是    | array(double) | 结果数组                              |
| +uid       | 是    | string        | 匹配到的用户id                          |
| +user_info | 是    | string        | 注册时的用户信息                          |
| +scores    | 是    | array(double) | 结果数组，数组元素为匹配得分，top n。 得分[0,100.0] |


**返回示例**

```json
{
    "log_id": 73473737,
    "result_num":1,
    "result": [
        {
            "uid": "u333333",
            "user_info": "Test User",
            "scores": [
                    99.3,
                    83.4
            ]
        }
    ]
}
```

# 人脸认证

## 接口描述

用于识别上传的图片是否为指定用户，即查找前需要先确定要查找的用户在人脸库中的id。

典型应用场景：如**人脸登录**，**人脸签到**等

> **说明：**人脸认证与人脸识别的差别在于：人脸识别需要指定一个待查找的人脸库中的组；而人脸认证需要指定具体的用户id即可，不需要指定具体的人脸库中的组；实际应用中，人脸认证需要用户或系统先输入id，这增加了验证安全度，但也增加了复杂度，具体使用哪个接口需要视您的业务场景判断。

## 请求说明

**请求示例**

HTTP方法：`POST`

请求URL： `https://aip.baidubce.com/rest/2.0/faceverify/v1/verify`

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

| 参数      | 是否必选 | 类型     | 说明                            |
| -------- | -------- | ------- | ----------------------------- |
| uid     | 是    | string | 用户id（由数字、字母、下划线组成），长度限制128B   |
| images  | 是    | string | 图像base64编码，可单次传入多张，多张图片半角逗号分隔，总共最大10M |
| top_num | 否    | uint32 | 返回匹配得分top数，默认为1               |

**请求代码示例**

**提示一：**使用示例代码前，请记得替换其中的示例Token、图片地址或Base64信息。

**提示二：**部分语言依赖的类或库，请在代码注释中查看下载地址。

{% Face-API-Verify %}

## 返回说明

**返回参数**

| 字段         | 是否必选 | 类型    | 说明                  |
| ---------- | ------- | ------------- | --------------------------------- |
| log_id     | 是    | uint64        | 请求标识码，随机数，唯一                             |
| result_num | 是    | uint32        | 返回结果数目，即：result数组中元素个数                   |
| result     | 是    | array(double) | 结果数组，数组元素为匹配得分，top n。 得分范围[0,100.0]。得分超过80可认为认证成功 |


**返回示例**

```json
{
  "results": [
    93.86580657959,
    92.237548828125
  ],
  "result_num": 2,
  "log_id": 1629483134
}
```

# 人脸注册

## 接口描述

用于从人脸库中新增用户，可以设定多个用户所在组，及组内用户的人脸图片，

典型应用场景：构建您的人脸库，如**会员人脸注册**，**已有用户补全人脸信息**等。

人脸库、用户组、用户、用户下的人脸**层级关系**如下所示：

```json
|- 人脸库
   |- 用户组一
      |- 用户01
         |- 人脸
      |- 用户02
         |- 人脸
         |- 人脸
         ....
       ....
   |- 用户组二
   |- 用户组三
   |- 用户组四
   ....
```

**说明：关于人脸库的设置限制** 

* 每个开发者账号只能创建一个人脸库；
* 每个人脸库下，可创建最多1000个用户组；
* 每个用户组下，可添加最多2000张人脸，最多1000个用户uid；
* 每个用户（uid）所能注册的最大人脸数量为5张；

> **说明：**人脸注册完毕后，生效时间最长为**35s**，之后便可以进行识别或认证操作。

> **说明：**注册的人脸，建议为用户正面人脸。

## 请求说明

**请求示例**

HTTP方法：`POST`

请求URL： `https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/user/add`

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

| 参数        | 是否必选 | 类型     | 说明                                  |
| ---------- | ------ | ------- | ----------------------------------- |
| uid       | 是    | string | 用户id（由数字、字母、下划线组成），长度限制128B         |
| user_info | 是    | string | 用户资料，长度限制256B                       |
| group_id  | 是    | string | 用户组id，标识一组用户（由数字、字母、下划线组成），长度限制128B |
| images    | 是    | string | 图像base64编码，可单次传入多张，多张图片半角逗号分隔，总共最大10M       |

**请求代码示例**

**提示一：**使用示例代码前，请记得替换其中的示例Token、图片地址或Base64信息。

**提示二：**部分语言依赖的类或库，请在代码注释中查看下载地址。

{% Face-API-Add %}

## 返回说明

**返回参数**

| 字段     | 是否必选 | 类型     | 说明           |
| ------ | ------- | ------- | ---------------|
| log_id | 是    | uint64 | 请求标识码，随机数，唯一 |

**返回示例**

```json
// 注册成功
{
    "log_id": 73473737,
}
// 注册发生错误
{
  "error_code": 216616,
  "log_id": 674786177,
  "error_msg": "image exist"
}
```

# 人脸更新

## 接口描述

用于对人脸库中指定用户，更新其下的人脸图像。

> **说明：**新上传的人脸图像将覆盖原有所有图像。

## 请求说明

**请求示例**

HTTP方法：`POST`

请求URL： `https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/user/update`

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

| 参数     | 是否必选 | 类型     | 说明                            |
| ------ | ------ | ------- | ----------------------------- |
| uid    | 是    | string | 用户id（由数字、字母、下划线组成），长度限制128B   |
| images | 是    | string | 图像base64编码，可单次传入多张，多张图片半角逗号分隔，总共最大10M |

**请求代码示例**

**提示一：**使用示例代码前，请记得替换其中的示例Token、图片地址或Base64信息。

**提示二：**部分语言依赖的类或库，请在代码注释中查看下载地址。

{% Face-API-Update %}

## 返回说明

**返回参数**

| 字段     | 是否必选 | 类型     | 说明           |
| ------- | ------ | ------- | -------------- |
| log_id | 是    | uint64 | 请求标识码，随机数，唯一 |

**返回示例**

```json
// 更新成功
{
    "log_id": 73473737,
}
// 更新发生错误
{
  "error_code": 216612,
  "log_id": 1137508902,
  "error_msg": "user not exist"
}
```

# 人脸删除

## 接口描述

用于从人脸库中删除一个用户。

**人脸删除注意事项：**

* 删除的内容，包括用户所有图像和身份信息；
* 如果一个uid存在于多个用户组内，将会同时将从各个组中把用户删除。

## 请求说明

**请求示例**

HTTP方法：`POST`

请求URL： `https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/user/delete`

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

| 参数   | 是否必选 | 类型     | 说明                          |
| ---- | ------- | ------- | ---------------------------- |
| uid  | 是    | string | 用户id（由数字、字母、下划线组成），长度限制128B |

**请求代码示例**

**提示一：**使用示例代码前，请记得替换其中的示例Token、图片地址或Base64信息。

**提示二：**部分语言依赖的类或库，请在代码注释中查看下载地址。

{% Face-API-Delete %}

## 返回说明

**返回参数**

| 字段     | 是否必选 | 类型     | 说明           |
| ------ | ------ | ------- | ------------- |
| log_id | 是    | uint64 | 请求标识码，随机数，唯一 |

**返回示例**

```json
// 删除成功
{
    "log_id": 73473737,
}
// 删除发生错误
{
  "error_code": 216612,
  "log_id": 1382953199,
  "error_msg": "user not exist"
}
```

# 用户信息查询

## 接口描述

用于查询人脸库中某用户的详细信息。

## 请求说明

**请求示例**

HTTP方法：`POST`

请求URL： `https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/user/get`

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

| 参数   | 是否必选 | 类型     | 说明                          |
| ---- | ------- | ------- | --------------------------- |
| uid  | 是    | string | 用户id（由数字、字母、下划线组成），长度限制128B |

**请求代码示例**

**提示一：**使用示例代码前，请记得替换其中的示例Token、图片地址或Base64信息。

**提示二：**部分语言依赖的类或库，请在代码注释中查看下载地址。

{% Face-API-UserGet %}

## 返回说明

**返回参数**

| 字段         | 是否必选 | 类型            | 说明           |
| ----------- | ------- | --------------- | -------------- |
| log_id     | 是    | uint64        | 请求标识码，随机数，唯一 |
| result     | 是    | array(double) | 结果数组         |
| +uid       | 是    | string        | 匹配到的用户id     |
| +user_info | 是    | string        | 注册时的用户信息     |
| +groups    | 是    | array(string) | 用户所属组列表      |

**返回示例**

```json
{
    "result": {
        "uid": "testuser2",
        "user_info": "registed user info ...",
        "groups": [
            "grp1",
            "grp2",
            "grp3"
        ]
    },
    "log_id": 2979357502
}
```

# 组列表查询

## 接口描述

用于查询用户组的列表。

## 请求说明

**请求示例**

HTTP方法：`POST`

请求URL： `https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/group/getlist`

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

| 参数    | 是否必选 | 类型     | 说明                  |
| ------ | ------- | ------- | ------------------- |
| start | 否    | uint32 | 默认值0，起始序号           |
| end   | 否    | uint32 | 返回数量，默认值100，最大值1000 |

**请求代码示例**

**提示一：**使用示例代码前，请记得替换其中的示例Token、图片地址或Base64信息。

**提示二：**部分语言依赖的类或库，请在代码注释中查看下载地址。

{% Face-API-GroupGetlist %}

## 返回说明

**返回参数**

| 字段         | 是否必选 | 类型            | 说明           |
| ----------- | ------- | --------------- | -------------- |
| log_id     | 是    | uint64        | 请求标识码，随机数，唯一 |
| result_num | 是    | uint32        | 返回个数         |
| result     | 是    | array(string) | group_id列表   |

**返回示例**

```json
{
    "result_num": 2,
    "result": [
        "grp1",
        "grp2"
    ],
    "log_id": 3314921889
}
```

# 组内用户列表查询

## 接口描述

用于查询指定用户组中的用户列表。

## 请求说明

**请求示例**

HTTP方法：`POST`

请求URL： `https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/group/getusers`

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

| 参数       | 是否必选 | 类型     | 说明                  |
| --------- | ------- | ------- | ------------------- |
| group_id | 是    | string | 用户组id               |
| start    | 否    | uint32 | 默认值0，起始序号           |
| end      | 否    | uint32 | 返回数量，默认值100，最大值1000 |

**请求代码示例**

**提示一：**使用示例代码前，请记得替换其中的示例Token、图片地址或Base64信息。

**提示二：**部分语言依赖的类或库，请在代码注释中查看下载地址。

{% Face-API-GroupGetusers %}

## 返回说明

**返回参数**

| 字段         | 是否必选 | 类型            | 说明           |
| ----------- | -------- | -------------- | -------------- |
| log_id     | 是    | uint64        | 请求标识码，随机数，唯一 |
| result_num | 是    | uint32        | 返回个数         |
| result     | 是    | array(object) | user列表       |
| +uid       | 是    | string        | 用户id         |
| +user_info | 是    | string        | 用户信息         |

**返回示例**

```json
{
    "log_id": 3314921889,
    "result_num": 2,
    "result": [
        {
            "uid": "uid1",
            "user_info": "user info 1"
        },
        {
            "uid": "uid2",
            "user_info": "user info 2"
        }
    ]
}
```

# 组内添加用户

## 接口描述

用于将已经存在于人脸库中的用户添加到一个新的组。

## 请求说明

**请求示例**

HTTP方法：`POST`

请求URL： `https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/group/adduser`

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

| 参数       | 是否必选 | 类型     | 说明    |
| -------- | ------- | ------- | ----- |
| group_id | 是    | string | 用户组id |
| uid      | 是    | string | 用户id  |

**请求代码示例**

**提示一：**使用示例代码前，请记得替换其中的示例Token、图片地址或Base64信息。

**提示二：**部分语言依赖的类或库，请在代码注释中查看下载地址。

{% Face-API-GroupAdduser %}

## 返回说明

**返回参数**

| 字段     | 是否必选 | 类型     | 说明           |
| ------- | ------- | ------- | ------------ |
| log_id | 是    | uint64 | 请求标识码，随机数，唯一 |

**返回示例**

```json
// 正确返回值 
{
    "log_id": 3314921889,
}
// 发生错误时返回值 
{
  "error_code": 216100,
  "log_id": 3111284097,
  "error_msg": "already add"
}
```

# 组内删除用户

## 接口描述

用于将用户从某个组中删除，但不会删除用户在其它组的信息。

> **说明：**当用户仅属于单个分组时，本接口将返回错误，请使用**人脸删除接口**

## 请求说明

**请求示例**

HTTP方法：`POST`

请求URL： `https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/group/deleteuser`

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

| 参数       | 是否必选 | 类型     | 说明    |
| -------- | ------- | ------ | -------- |
| group_id | 是    | string | 用户组id |
| uid      | 是    | string | 用户id  |

**请求代码示例**

**提示一：**使用示例代码前，请记得替换其中的示例Token、图片地址或Base64信息。

**提示二：**部分语言依赖的类或库，请在代码注释中查看下载地址。

{% Face-API-GroupDeleteuser %}

## 返回说明

**返回参数**

| 字段     | 是否必选 | 类型     | 说明           |
| ------ | ------- | ------- | ------------ |
| log_id | 是    | uint64 | 请求标识码，随机数，唯一 |

**返回示例**

```json
// 正确返回值 
{
    "log_id": 3314921889,
}
// 发生错误时返回值 
{
  "error_code": 216619,
  "log_id": 815967402,
  "error_msg": "user must be in one group at least"
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

| 错误码  | 错误信息                     | 描述        |
| -------| --------------------------- | --------------- |
| 4      | Open api request limit reached    | 集群超限额  |
| 17     | Open api daily request limit reached   | 每天流量超限额  |
| 18     | Open api qps request limit reached   | QPS超限额  |
| 19     | Open api total request limit reached  | 请求总量超限额  |
| 100    | Invalid parameter             | 无效参数     |
| 110    | Access token invalid or no longer valid | Access Token失效 |
| 111    | Access token expired | Access token过期 |
| 216015 | module closed       | 模块关闭      |
| 216100 | invalid param       | 非法参数      |
| 216101 | not enough param    | 参数数量不够    |
| 216102 | service not support | 业务不支持     |
| 216103 | param too long      | 参数太长      |
| 216110 | appid not exist     | APP ID不存在 |
| 216111 | invalid userid      | 非法用户ID    |
| 216200 | empty image         | 空的图片      |
| 216201 | image format error  | 图片格式错误    |
| 216202 | image size error    | 图片大小错误    |
| 216300 | db error            | DB错误      |
| 216400 | backend error       | 后端系统错误    |
| 216401 | internal error      | 内部错误      |
| 216402 | face not found      | 没有找到人脸    |
| 216500 | unknown error       | 未知错误      |
| 216611 | user not exist         | 用户不存在    |
| 216613 | user not found         | 用户查找不到   |
| 216614 | not enough images      | 图片信息不完整  |
| 216615 | fail to process images | 处理图片信息失败 |
| 216616 | image existed          | 图片已存在    |
| 216617 | fail to add user       | 添加用户失败   |
| 216618 | no user in group       | 群组里没有用户  |
| 216630 | recognize error        | 识别错误     |