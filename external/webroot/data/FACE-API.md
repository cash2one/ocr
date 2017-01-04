# 简介

本文档主要针对API开发者，调用AI服务相关的API接口有两种调用方式，两种不同的调用方式采用相同的接口URL，区别在于请求方式和鉴权方法不一样，请求参数和返回结果一致。

**请求消息体格式**

API服务要求使用JSON格式的结构体来描述一个请求的具体内容, 然后通过urlencode格式化请求体。

**请求返回格式**

API服务均采用JSON格式的消息体作为响应返回的格式。

> 说明：本文档中所有API接口示例统一以“调用方式一”举例，调用方式二构造方式参见[请求头域内容](#请求头域内容)。

**服务限制**

人脸识别服务对图片格式、图片大小有限制，格式支持jpg、png，长宽都要小于2048px。图片大小不超过1M。

# 调用方式一

## 请求URL数据格式

向API服务地址使用POST发送请求，必须在URL中带上参数：

**access_token:** 必须参数，参考“[Access Token获取](http://ai.baidu.com/docs#Beginner-Auth.html)”。

POST中参数按照API接口说明调用即可。

例如人脸识别API，使用HTTPS POST发送：

```
https://aip.baidubce.com/rest/2.0/face/v1/detect? access_token=24.f9ba9c5241b67688bb4adbed8bc91dec.2592000.1485570332.282335-8574074
```

> **说明：**推荐使用调用方式一。方式一鉴权使用的Access_token必须通过API Key和Secret Key获取。

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
content-type: application/x-www-form-urlencoded;
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
<tr><td>216402</td><td>face not found</td><td>没有找到人脸</td></tr>
<tr><td>216500</td><td>unknown error</td><td>未知错误</td></tr>
</table>

## 业务相关错误码

<table>
<tr><th>错误码</th><th>错误信息</th><th>描述</th></tr>
<tr><td>216611</td><td>user not exist</td><td>用户不存在</td></tr>
<tr><td>216613</td><td>user not found</td><td>用户查找不到</td></tr>
<tr><td>216614</td><td>not enough images</td><td>图片信息不完整</td></tr>
<tr><td>216615</td><td>fail to process images</td><td>处理图片信息失败</td></tr>
<tr><td>216616</td><td>image existed</td><td>图片已存在</td></tr>
<tr><td>216617</td><td>fail to add user</td><td>添加用户失败</td></tr>
<tr><td>216618</td><td>no user in group</td><td>群组里没有用户</td></tr>
<tr><td>216630</td><td>recognize error</td><td>识别错误</td></tr>
</table>


# 人脸检测

**接口描述**

该请求用于检测图片中的人脸并返回人脸的属性及图片信息。

**HTTP 方法**

   POST

**请求URL**

https://aip.baidubce.com/rest/2.0/face/v1/detect

**请求示例**

```http
{
    "image":图像base64编码
}
```

**请求参数**

<table>
<tr><th>参数</th><th>是否必选</th><th>类型</th><th>说明</th></tr>
<tr><td>access_token</td><td>必选</td><td>string</td><td>Oauth2.0授权所获token。 </td></tr>
<tr><td>image</td><td>是</td><td>string</td><td>base64编码后的图片数据，图片大小不超过2M。</td></tr>
<tr><td>max_face_num</td><td>否</td><td>uint32</td><td>最多处理人脸数目，默认值1</td></tr>
<tr><td>face_fields</td><td>否</td><td>string</td><td>包括age、beauty、expression、faceshape、gender、glasses、landmark、race、qualities信息，逗号分隔，默认只返回人脸框、概率和旋转角度。</td></tr>
</table>


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

<table>
<tr><th>参数</th><th>类型</th><th>是否必须</th><th>说明</th></tr>
<tr><td>log_id</td><td>uint64</td><td>是</td><td>日志id</td></tr>
<tr><td>result_num</td><td>uint32</td><td>是</td><td>人脸数目</td></tr>
<tr><td>result</td><td>object[]</td><td>是</td><td>人脸属性对象的集合</td></tr>
<tr><td>+age</td><td>double</td><td>否</td><td>年龄。face_fields包含age时返回</td></tr>
<tr><td>+beauty</td><td>double</td><td>否</td><td>美丑打分，范围0-1，越大表示越美。face_fields包含beauty时返回</td></tr>
<tr><td>+cation</td><td>bject</td><td>是</td><td>人脸在图片中的位置</td></tr>
<tr><td>++left</td><td>uint32</td><td>是</td><td>人脸区域离左边界的距离</td></tr>
<tr><td>++top</td><td>uint32</td><td>是</td><td>人脸区域离上边界的距离</td></tr>
<tr><td>++width</td><td>uint32</td><td>是</td><td>人脸区域的宽度</td></tr>
<tr><td>++height</td><td>uint32</td><td>是</td><td>人脸区域的高度</td></tr>
<tr><td>+face_probability</td><td>double</td><td>是</td><td>人脸置信度，范围0-1</td></tr>
<tr><td>+rotation_angle</td><td>int32</td><td>是</td><td>人脸框相对于竖直方向的顺时针旋转角，[-180,180]</td></tr>
<tr><td>+yaw</td><td>double</td><td>是</td><td>三维旋转之左右旋转角[-90(左), 90(右)]</td></tr>
<tr><td>+pitch</td><td>double</td><td>是</td><td>三维旋转之俯仰角度[-90(上), 90(下)]</td></tr>
<tr><td>+roll</td><td>double</td><td>是</td><td>平面内旋转角[-180(逆时针), 180(顺时针)]</td></tr>
<tr><td>+expression</td><td>uint32</td><td>否</td><td>表情，0，不笑；1，微笑；2，大笑。face_fields包含expression时返回</td></tr>
<tr><td>+expression_probability</td><td>double</td><td>否</td><td>表情置信度，范围0~1。face_fields包含expression时返回</td></tr>
<tr><td>+faceshape</td><td>object[]</td><td>否</td><td>脸型置信度。face_fields包含faceshape时返回</td></tr>
<tr><td>++type</td><td>string</td><td>是</td><td>脸型：square/triangle/oval/heart/round</td></tr>
<tr><td>++probability  </td><td>double</td><td>是</td><td>置信度：0~1</td></tr>
<tr><td>+gender</td><td>string</td><td>否</td><td>male、female。face_fields包含gender时返回</td></tr>
<tr><td>+gender_probability</td><td>double</td><td>否</td><td>性别置信度，范围0~1。face_fields包含gender时返回</td></tr>
<tr><td>+glasses</td><td>uint32</td><td>否</td><td>是否带眼镜，0-无眼镜，1-普通眼镜，2-墨镜。face_fields包含glasses时返回</td></tr>
<tr><td>+glasses_probability</td><td>double</td><td>否</td><td>眼镜置信度，范围0~1。face_fields包含glasses时返回</td></tr>
<tr><td>+landmark</td><td>object[]</td><td>否</td><td>4个关键点位置，左眼中心、右眼中心、鼻尖、嘴中心。face_fields包含landmark时返回</td></tr>
<tr><td>++x </td><td>uint32</td><td>否</td><td>x坐标</td></tr>
<tr><td>++y</td><td>uint32</td><td>否</td><td>y坐标</td></tr>
<tr><td>+landmark72</td><td>object[]</td><td>否</td><td>72个特征点位置，示例图 。face_fields包含landmark时返回</td></tr>
<tr><td>++x</td><td>uint32</td><td>否</td><td>x坐标</td></tr>
<tr><td>++y</td><td>uint32</td><td>否</td><td>y坐标</td></tr>
<tr><td>+race</td><td>string</td><td>否</td><td>yellow、white、black、arabs。face_fields包含race时返回</td></tr>
<tr><td>+race_probability</td><td>double</td><td>否</td><td>人种置信度，范围0~1。face_fields包含race时返回</td></tr>
<tr><td>+qualities</td><td>object</td><td>否</td><td>人脸质量信息。face_fields包含qualities时返回</td></tr>
<tr><td>++occlusion</td><td>object</td><td>是</td><td>人脸各部分遮挡的概率， [0, 1] （待上线）</td></tr>
<tr><td>+++left_eye</td><td>double</td><td>是</td><td>左眼</td></tr>
<tr><td>+++right_eye</td><td>double</td><td>是</td><td>右眼</td></tr>
<tr><td>+++nose</td><td>double</td><td>是</td><td>鼻子</td></tr>
<tr><td>+++mouth</td><td>double</td><td>是</td><td>嘴</td></tr>
<tr><td>+++left_cheek</td><td>double</td><td>是</td><td>左脸颊</td></tr>
<tr><td>+++right_cheek</td><td>double</td><td>是</td><td>右脸颊</td></tr>
<tr><td>+++chin</td><td>double</td><td>是</td><td>下巴</td></tr>
<tr><td>++blur</td><td>double</td><td>是</td><td>人脸模糊程度，[0, 1]。0表示清晰，1表示模糊（待上线）</td></tr>
<tr><td>++illumination</td><td>-</td><td>是</td><td>取值范围在[0,255],表示脸部区域的光照程度（待上线）</td></tr>
<tr><td>++completeness</td><td>-</td><td>是</td><td>人脸完整度，[0, 1]。0表示完整，1表示不完整（待上线）</td></tr>
<tr><td>++type</td><td>object</td><td>是</td><td>真实人脸/卡通人脸置信度</td></tr>
<tr><td>+++human</td><td>-</td><td>是</td><td>真实人脸置信度，[0, 1]</td></tr>
<tr><td>+++cartoon</td><td>-</td><td>是</td><td>卡通人脸置信度，[0, 1]</td></tr>
</table>


