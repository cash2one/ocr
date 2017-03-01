
# 简介

本文档主要针对API开发者，调用AI服务相关的API接口有两种调用方式，两种不同的调用方式采用相同的接口URL，区别在于请求方式和鉴权方法不一样，请求参数和返回结果一致。

**请求消息体格式**

API服务要求使用POST方式调用，Content-Type为application/application/x-www-form-urlencoded，然后通过urlencode格式化请求体。

**请求返回格式**

API服务均采用JSON格式的消息体作为响应返回的格式。

**服务限制**

人脸识别服务对图片格式暂无限制，图片大小限制如下：

| 接口名称 | 图片编码后大小限额   |
| ---- | ----------- |
| 人脸检测 | <2M         |
| 人脸比对 | 多张图片总共小于20M |
| 人脸查找 | 多张图片总共小于20M |


# 调用方式一

## 请求URL数据格式

向API服务地址使用POST发送请求，必须在URL中带上参数：

**access_token:** 必须参数，参考“[Access Token获取](http://ai.baidu.com/docs#Beginner-Auth)”。

POST中参数按照API接口说明调用即可。

例如人脸识别API，使用HTTPS POST发送：

```
https://aip.baidubce.com/rest/2.0/face/v1/detect?access_token=24.f9ba9c5241b67688bb4adbed8bc91dec.2592000.1485570332.282335-8574074
```

> **说明：**方式一鉴权使用的Access_token必须通过API Key和Secret Key获取。

# 调用方式二

## 请求头域内容

人脸验证服务的API服务需要在请求的HTTP头域中包含以下信息：

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

| 错误码    | 错误信息                | 描述        |
| ------ | ------------------- | --------- |
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


## 业务相关错误码

| 错误码    | 错误信息                   | 描述       |
| ------ | ---------------------- | -------- |
| 216611 | user not exist         | 用户不存在    |
| 216613 | user not found         | 用户查找不到   |
| 216614 | not enough images      | 图片信息不完整  |
| 216615 | fail to process images | 处理图片信息失败 |
| 216616 | image existed          | 图片已存在    |
| 216617 | fail to add user       | 添加用户失败   |
| 216618 | no user in group       | 群组里没有用户  |
| 216630 | recognize error        | 识别错误     |


# 人脸检测

**接口描述**

该请求用于检测图片中的人脸并返回人脸的属性及图片信息。

**调用方式一请求头**

* HTTP方法：POST

* 请求URL： `https://aip.baidubce.com/rest/2.0/face/v1/detect`

* URL参数：<br>

| 参数           | 值                                        |
| ------------ | ---------------------------------------- |
| access_token | 通过API Key和Secret Key获取的access_token,参考“[Access Token获取](http://ai.baidu.com/docs#Beginner-Auth)” |

* Header如下：<br>

| 参数           | 值                                 |
| ------------ | --------------------------------- |
| Content-Type | application/x-www-form-urlencoded |

* Body中数据如下：<br>

| 参数    | 值          |
| ----- | ---------- |
| image | 图像base64编码 |


**调用方式二请求示例**

```
POST /rest/2.0/face/v1/detect HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: aip.baidubce.com
content-type: application/x-www-form-urlencoded
authorization: {bce-authorization-string}

image=%2F9j%2F4AAQSkZJRgABAQAAAQABAAD%2F4QDKRXhpZgAATU0AK
```

**请求参数**

| 参数           | 是否必选 | 类型     | 说明                                       |
| ------------ | ---- | ------ | ---------------------------------------- |
| image        | 是    | string | base64编码后的图片数据，图片大小不超过2M。                |
| max_face_num | 否    | uint32 | 最多处理人脸数目，默认值1                            |
| face_fields  | 否    | string | 包括age,beauty,expression,faceshape,gender,glasses,landmark,race,qualities信息，逗号分隔，默认只返回人脸框、概率和旋转角度。 |


**返回示例**

```
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

# 人脸比对

**接口描述**

该请求用于比对多张图片中的人脸相似度并返回两两比对的得分。

**调用方式一请求头**

- HTTP方法：POST
- 请求URL： `https://aip.baidubce.com/rest/2.0/faceverify/v1/match`

* URL参数：<br>

| 参数           | 值                                        |
| ------------ | ---------------------------------------- |
| access_token | 通过API Key和Secret Key获取的access_token,参考“[Access Token获取](http://ai.baidu.com/docs#Beginner-Auth)” |

* Header如下：<br>

| 参数           | 值                                 |
| ------------ | --------------------------------- |
| Content-Type | application/x-www-form-urlencoded |

* Body中数据如下：

| 参数     | 值                             |
| ------ | ----------------------------- |
| images | 图像base64编码,多张图片半角逗号分隔，总共最大10M |

**调用方式二请求示例**

```
POST /rest/2.0/faceverify/v1/match HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: aip.baidubce.com
content-type: application/x-www-form-urlencoded
authorization: {bce-authorization-string}

images=%2F9j%2F4AAQSkZJRgABAQAAAQABAAD%2F4QDKRXhpZgAATU0AK
```

**请求参数**

| 参数     | 是否必选 | 类型     | 说明                              |
| ------ | ---- | ------ | ------------------------------- |
| images | 是    | string | base64编码后的图片数据，多张图片半角逗号分隔,最大10M |

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

**返回参数**

| 字段         | 是否必选 | 类型            | 说明                                       |
| ---------- | ---- | ------------- | ---------------------------------------- |
| log_id     | 是    | uint64        | 请求标识码，随机数，唯一                             |
| result_num | 是    | uint32        | 返回结果数目，即：result数组中元素个数                   |
| result     | 是    | array(object) | 结果数据，index和请求图片index对应。数组元素为每张图片的匹配得分数组，top n。 得分[0,100.0] |
| +index_i   | 是    | uint32        | 比对图片1的index                              |
| +index_j   | 是    | uint32        | 比对图片2的index                              |
| +score     | 是    | double        | 比对得分                                     |

# 人脸查找

## 人脸注册

**接口描述**

该请求用于从人脸库中新增用户，包括指定用户所在组和上传用户人脸图片。

**调用方式一请求头**

- HTTP方法：POST
- 请求URL： `https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/user/add`


- URL参数：

| 参数           | 值                                        |
| ------------ | ---------------------------------------- |
| access_token | 通过API Key和Secret Key获取的access_token,参考“[Access Token获取](http://ai.baidu.com/docs#Beginner-Auth)” |

- Header如下：

| 参数           | 值                                 |
| ------------ | --------------------------------- |
| Content-Type | application/x-www-form-urlencoded |

- Body中数据如下：

| 参数        | 值                                   |
| --------- | ----------------------------------- |
| uid       | 用户id（由数字、字母、下划线组成），长度限制128B         |
| user_info | 用户资料，长度限制256B                       |
| group_id  | 用户组id，标识一组用户（由数字、字母、下划线组成），长度限制128B |
| images    | 图像base64编码,多张图片半角逗号分隔，总共最大10M       |

**调用方式二请求示例**

```
POST /rest/2.0/faceverify/v1/match HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: aip.baidubce.com
content-type: application/x-www-form-urlencoded 
authorization: {bce-authorization-string}

uid=testuid&user_info=test_userinfo&group_id=test_groupid&images=%2F9j%2F4AAQSkZJRgABAQAAAQABAAD%2F4QDKRXhpZgAATU0AK
```

**请求参数**

| 参数        | 是否必选 | 类型     | 说明                                  |
| --------- | ---- | ------ | ----------------------------------- |
| uid       | 是    | string | 用户id（由数字、字母、下划线组成），长度限制128B         |
| user_info | 是    | string | 用户资料，长度限制256B                       |
| group_id  | 是    | string | 用户组id，标识一组用户（由数字、字母、下划线组成），长度限制128B |
| images    | 是    | string | 图像base64编码,多张图片半角逗号分隔，总共最大10M       |

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

**返回参数**

| 字段     | 是否必选 | 类型     | 说明           |
| ------ | ---- | ------ | ------------ |
| log_id | 是    | uint64 | 请求标识码，随机数，唯一 |

## 人脸更新

**接口描述**

该请求用于从人脸库中更新用户图像，**新上传的图像将覆盖原有图像**。

**调用方式一请求头**

- HTTP方法：POST
- 请求URL： `https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/user/update`


- URL参数：

| 参数           | 值                                        |
| ------------ | ---------------------------------------- |
| access_token | 通过API Key和Secret Key获取的access_token,参考“[Access Token获取](http://ai.baidu.com/docs#Beginner-Auth)” |

- Header如下：

| 参数           | 值                                 |
| ------------ | --------------------------------- |
| Content-Type | application/x-www-form-urlencoded |

- Body中数据如下：

| 参数     | 值                             |
| ------ | ----------------------------- |
| uid    | 用户id（由数字、字母、下划线组成），长度限制128B   |
| images | 图像base64编码,多张图片半角逗号分隔，总共最大10M |

**调用方式二请求示例**

```
POST /rest/2.0/faceverify/v1/match HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: aip.baidubce.com
content-type: application/x-www-form-urlencoded
authorization: {bce-authorization-string}

uid=testuid&images=%2F9j%2F4AAQSkZJRgABAQAAAQABAAD%2F4QDKRXhpZgAATU0AK
```

**请求参数**

| 参数     | 是否必选 | 类型     | 说明                            |
| ------ | ---- | ------ | ----------------------------- |
| uid    | 是    | string | 用户id（由数字、字母、下划线组成），长度限制128B   |
| images | 是    | string | 图像base64编码,多张图片半角逗号分隔，总共最大10M |

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

**返回参数**

| 字段     | 是否必选 | 类型     | 说明           |
| ------ | ---- | ------ | ------------ |
| log_id | 是    | uint64 | 请求标识码，随机数，唯一 |

## 人脸删除

**接口描述**

该请求用于从人脸库中删除一个用户，包括用户所有图像和身份信息，同时也将从各个组中把用户删除。

**调用方式一请求头**

- HTTP方法：POST
- 请求URL： `https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/user/delete`


- URL参数：

| 参数           | 值                                        |
| ------------ | ---------------------------------------- |
| access_token | 通过API Key和Secret Key获取的access_token,参考“[Access Token获取](http://ai.baidu.com/docs#Beginner-Auth)” |

- Header如下：

| 参数           | 值                                 |
| ------------ | --------------------------------- |
| Content-Type | application/x-www-form-urlencoded |

- Body中数据如下：

| 参数   | 值                           |
| ---- | --------------------------- |
| uid  | 用户id（由数字、字母、下划线组成），长度限制128B |

**调用方式二请求示例**

```
POST /rest/2.0/faceverify/v1/match HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: aip.baidubce.com
content-type: application/x-www-form-urlencoded
authorization: {bce-authorization-string}

uid=testuid
```

**请求参数**

| 参数   | 是否必选 | 类型     | 说明                          |
| ---- | ---- | ------ | --------------------------- |
| uid  | 是    | string | 用户id（由数字、字母、下划线组成），长度限制128B |

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

**返回参数**

| 字段     | 是否必选 | 类型     | 说明           |
| ------ | ---- | ------ | ------------ |
| log_id | 是    | uint64 | 请求标识码，随机数，唯一 |

## 人脸认证

**接口描述**

该请求用于识别上传的图片是否为指定用户。

**调用方式一请求头**

- HTTP方法：POST
- 请求URL： `https://aip.baidubce.com/rest/2.0/faceverify/v1/verify`


- URL参数：

| 参数           | 值                                        |
| ------------ | ---------------------------------------- |
| access_token | 通过API Key和Secret Key获取的access_token,参考“[Access Token获取](http://ai.baidu.com/docs#Beginner-Auth)” |

- Header如下：

| 参数           | 值                                 |
| ------------ | --------------------------------- |
| Content-Type | application/x-www-form-urlencoded |

- Body中数据如下：

| 参数      | 值                             |
| ------- | ----------------------------- |
| uid     | 用户id（由数字、字母、下划线组成），长度限制128B   |
| images  | 图像base64编码,多张图片半角逗号分隔，总共最大10M |
| top_num | 返回匹配得分top数，默认为1               |

**调用方式二请求示例**

```
POST /rest/2.0/faceverify/v1/match HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: aip.baidubce.com
content-type: application/x-www-form-urlencoded
authorization: {bce-authorization-string}

uid=testuid&images=%2F9j%2F4AAQSkZJRgABAQAAAQABAAD%2F4QDKRXhpZgAATU0AK
```

**请求参数**

| 参数      | 是否必选 | 类型     | 说明                            |
| ------- | ---- | ------ | ----------------------------- |
| uid     | 是    | string | 用户id（由数字、字母、下划线组成），长度限制128B   |
| images  | 是    | string | 图像base64编码,多张图片半角逗号分隔，总共最大10M |
| top_num | 否    | uint32 | 返回匹配得分top数，默认为1               |

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

**返回参数**

| 字段         | 是否必选 | 类型            | 说明                                       |
| ---------- | ---- | ------------- | ---------------------------------------- |
| log_id     | 是    | uint64        | 请求标识码，随机数，唯一                             |
| result_num | 是    | uint32        | 返回结果数目，即：result数组中元素个数                   |
| result     | 是    | array(double) | 结果数组，数组元素为匹配得分，top n。 得分范围[0,100.0]。得分超过80可认为认证成功 |

## 人脸识别

**接口描述**

该请求用于计算指定组内用户与上传图像的相似度。

**调用方式一请求头**

- HTTP方法：POST
- 请求URL： `https://aip.baidubce.com/rest/2.0/faceverify/v1/identify`


- URL参数：

| 参数           | 值                                        |
| ------------ | ---------------------------------------- |
| access_token | 通过API Key和Secret Key获取的access_token,参考“[Access Token获取](http://ai.baidu.com/docs#Beginner-Auth)” |

- Header如下：

| 参数           | 值                                 |
| ------------ | --------------------------------- |
| Content-Type | application/x-www-form-urlencoded |

- Body中数据如下：

| 参数           | 值                             |
| ------------ | ----------------------------- |
| group_id     | 用户组id（由数字、字母、下划线组成），长度限制128B  |
| images       | 图像base64编码,多张图片半角逗号分隔，总共最大20M |
| user_top_num | 返回用户top数，默认为1                 |
| face_top_num | 单用户人脸匹配得分top数，默认为1            |

**调用方式二请求示例**

```
POST /rest/2.0/faceverify/v1/match HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: aip.baidubce.com
content-type: application/x-www-form-urlencoded 
authorization: {bce-authorization-string}

group_id=testuid&images=%2F9j%2F4AAQSkZJRgABAQAAAQABAAD%2F4QDKRXhpZgAATU0AK
```

**请求参数**

| 参数           | 是否必选 | 类型     | 说明                            |
| ------------ | ---- | ------ | ----------------------------- |
| group_id     | 是    | string | 用户组id（由数字、字母、下划线组成），长度限制128B  |
| images       | 是    | string | 图像base64编码,多张图片半角逗号分隔，总共最大20M |
| user_top_num | 否    | uint32 | 返回用户top数，默认为1                 |
| face_top_num | 否    | uint32 | 单用户人脸匹配得分top数，默认为1            |

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

**返回参数**

| 字段         | 是否必选 | 类型            | 说明                                |
| ---------- | ---- | ------------- | --------------------------------- |
| log_id     | 是    | uint64        | 请求标识码，随机数，唯一                      |
| result_num | 是    | uint32        | 返回结果数目，即：result数组中元素个数            |
| result     | 是    | array(double) | 结果数组                              |
| +uid       | 是    | string        | 匹配到的用户id                          |
| +user_info | 是    | string        | 注册时的用户信息                          |
| +scores    | 是    | array(double) | 结果数组，数组元素为匹配得分，top n。 得分[0,100.0] |

## 用户信息查询

**接口描述**

该请求用于查询某用户的详细信息。

**调用方式一请求头**

- HTTP方法：POST
- 请求URL： `https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/user/get`


- URL参数：

| 参数           | 值                                        |
| ------------ | ---------------------------------------- |
| access_token | 通过API Key和Secret Key获取的access_token,参考“[Access Token获取](http://ai.baidu.com/docs#Beginner-Auth)” |

- Header如下：

| 参数           | 值                                 |
| ------------ | --------------------------------- |
| Content-Type | application/x-www-form-urlencoded |

- Body中数据如下：

| 参数   | 值                           |
| ---- | --------------------------- |
| uid  | 用户id（由数字、字母、下划线组成），长度限制128B |


**调用方式二请求示例**

```
POST /rest/2.0/faceverify/v1/match HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: aip.baidubce.com
content-type: application/x-www-form-urlencoded 
authorization: {bce-authorization-string}

uid=testuid
```

**请求参数**

| 参数   | 是否必选 | 类型     | 说明                          |
| ---- | ---- | ------ | --------------------------- |
| uid  | 是    | string | 用户id（由数字、字母、下划线组成），长度限制128B |

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

**返回参数**

| 字段         | 是否必选 | 类型            | 说明           |
| ---------- | ---- | ------------- | ------------ |
| log_id     | 是    | uint64        | 请求标识码，随机数，唯一 |
| result     | 是    | array(double) | 结果数组         |
| +uid       | 是    | string        | 匹配到的用户id     |
| +user_info | 是    | string        | 注册时的用户信息     |
| +groups    | 是    | array(string) | 用户所属组列表      |

## 组列表查询

**接口描述**

该请求用于查询组的列表。

**调用方式一请求头**

- HTTP方法：POST
- 请求URL： `https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/group/getlist`


- URL参数：

| 参数           | 值                                        |
| ------------ | ---------------------------------------- |
| access_token | 通过API Key和Secret Key获取的access_token,参考“[Access Token获取](http://ai.baidu.com/docs#Beginner-Auth)” |

- Header如下：

| 参数           | 值                                 |
| ------------ | --------------------------------- |
| Content-Type | application/x-www-form-urlencoded |

- Body中数据如下：

| 参数    | 值                   |
| ----- | ------------------- |
| start | 默认值0，起始序号           |
| end   | 返回数量，默认值100，最大值1000 |


**调用方式二请求示例**

```
POST /rest/2.0/faceverify/v1/match HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: aip.baidubce.com
content-type: application/x-www-form-urlencoded 
authorization: {bce-authorization-string}

start=0&num=100
```

**请求参数**

| 参数    | 是否必选 | 类型     | 说明                  |
| ----- | ---- | ------ | ------------------- |
| start | 否    | uint32 | 默认值0，起始序号           |
| end   | 否    | uint32 | 返回数量，默认值100，最大值1000 |

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

**返回参数**

| 字段         | 是否必选 | 类型            | 说明           |
| ---------- | ---- | ------------- | ------------ |
| log_id     | 是    | uint64        | 请求标识码，随机数，唯一 |
| result_num | 是    | uint32        | 返回个数         |
| result     | 是    | array(string) | group_id列表   |

## 组内用户列表查询

**接口描述**

该请求用于查询指定组中的用户列表。

**调用方式一请求头**

- HTTP方法：POST
- 请求URL： `https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/group/getusers`


- URL参数：

| 参数           | 值                                        |
| ------------ | ---------------------------------------- |
| access_token | 通过API Key和Secret Key获取的access_token,参考“[Access Token获取](http://ai.baidu.com/docs#Beginner-Auth)” |

- Header如下：

| 参数           | 值                                 |
| ------------ | --------------------------------- |
| Content-Type | application/x-www-form-urlencoded |

- Body中数据如下：

| 参数       | 值                   |
| -------- | ------------------- |
| group_id | 用户组id               |
| start    | 默认值0，起始序号           |
| end      | 返回数量，默认值100，最大值1000 |


**调用方式二请求示例**

```
POST /rest/2.0/faceverify/v1/match HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: aip.baidubce.com
content-type: application/x-www-form-urlencoded 
authorization: {bce-authorization-string}

group_id=gid&start=0&num=100
```

**请求参数**

| 参数       | 是否必选 | 类型     | 说明                  |
| -------- | ---- | ------ | ------------------- |
| group_id | 是    | string | 用户组id               |
| start    | 否    | uint32 | 默认值0，起始序号           |
| end      | 否    | uint32 | 返回数量，默认值100，最大值1000 |

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

**返回参数**

| 字段         | 是否必选 | 类型            | 说明           |
| ---------- | ---- | ------------- | ------------ |
| log_id     | 是    | uint64        | 请求标识码，随机数，唯一 |
| result_num | 是    | uint32        | 返回个数         |
| result     | 是    | array(object) | user列表       |
| +uid       | 是    | string        | 用户id         |
| +user_info | 是    | string        | 用户信息         |

## 组内添加用户

**接口描述**

该请求用于将已经存在于人脸库中的用户添加到一个新的组。

**调用方式一请求头**

- HTTP方法：POST
- 请求URL： `https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/group/adduser`


- URL参数：

| 参数           | 值                                        |
| ------------ | ---------------------------------------- |
| access_token | 通过API Key和Secret Key获取的access_token,参考“[Access Token获取](http://ai.baidu.com/docs#Beginner-Auth)” |

- Header如下：

| 参数           | 值                                 |
| ------------ | --------------------------------- |
| Content-Type | application/x-www-form-urlencoded |

- Body中数据如下：

| 参数       | 值     |
| -------- | ----- |
| group_id | 用户组id |
| uid      | 用户id  |


**调用方式二请求示例**

```
POST /rest/2.0/faceverify/v1/match HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: aip.baidubce.com
content-type: application/x-www-form-urlencoded 
authorization: {bce-authorization-string}

group_id=gid&start=0&uid=test_uid
```

**请求参数**

| 参数       | 是否必选 | 类型     | 说明    |
| -------- | ---- | ------ | ----- |
| group_id | 是    | string | 用户组id |
| uid      | 是    | string | 用户id  |

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

**返回参数**

| 字段     | 是否必选 | 类型     | 说明           |
| ------ | ---- | ------ | ------------ |
| log_id | 是    | uint64 | 请求标识码，随机数，唯一 |

## 组内删除用户

**接口描述**

该请求用于将用户从某个组中删除，但不会删除用户在其它组的信息。当用户仅属于单个分组时，本接口将返回错误。

**调用方式一请求头**

- HTTP方法：POST
- 请求URL： `https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/group/deleteuser`


- URL参数：

| 参数           | 值                                        |
| ------------ | ---------------------------------------- |
| access_token | 通过API Key和Secret Key获取的access_token,参考“[Access Token获取](http://ai.baidu.com/docs#Beginner-Auth)” |

- Header如下：

| 参数           | 值                                 |
| ------------ | --------------------------------- |
| Content-Type | application/x-www-form-urlencoded |

- Body中数据如下：

| 参数       | 值     |
| -------- | ----- |
| group_id | 用户组id |
| uid      | 用户id  |


**调用方式二请求示例**

```
POST /rest/2.0/faceverify/v1/match HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: aip.baidubce.com
content-type: application/x-www-form-urlencoded 
authorization: {bce-authorization-string}

group_id=gid&start=0&uid=test_uid
```

**请求参数**

| 参数       | 是否必选 | 类型     | 说明    |
| -------- | ---- | ------ | ----- |
| group_id | 是    | string | 用户组id |
| uid      | 是    | string | 用户id  |

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

**返回参数**

| 字段     | 是否必选 | 类型     | 说明           |
| ------ | ---- | ------ | ------------ |
| log_id | 是    | uint64 | 请求标识码，随机数，唯一 |
