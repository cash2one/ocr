# 使用须知

* [BFR核心概念](./ProductDescription#核心概念)
* [API认证机制](../Reference/AuthenticationMechanism)
* [AK/SK](../Reference/GetAKSK)
* [**多区域选择**](../Reference/Regions)及BFR服务域名“bfr.bj.baidubce.com”

>**说明：** 公测期申请BFR服务，请提交[工单](http://ticket.bce.baidu.com/#/ticket/create)。

# 接口规范
## 请求头域内容（HTTP Request Header）
人脸验证服务的API服务需要在请求的HTTP头域中包含以下信息：

* host（必填）
* x-bce-date （必填）
* x-bce-request-id（选填）
* authorization（必填）
* content-type（必填） 
* content-length（选填）

作为示例，以下是一个标准的人脸识别的请求头域内容:

```http
POST /api/v1/faceverify/user/identify HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: 2015-03-24T13:02:00Z
connection: keep-alive
accept: */*
host: bfr.bj.baidubce.com
x-bce-request-id: 73c4e74c-3101-4a00-bf44-fe246959c05e
content-type: application/x-www-form-urlencoded;
authorization: bce-auth-v1/46bd9968a6194b4bbdf0341f2286ccce/2015-03-24T13:02:00Z/1800/host;x-bce-date/994014d96b0eb26578e039fa053a4f9003425da4bfedf33f4790882fb4c54903

```

## 请求消息体格式（HTTP Request Body）
OCR的API服务要求使用JSON格式的结构体来描述一个请求的具体内容, 然后通过urlencode格式化请求体。

## 请求返回格式（HTTP Response）
人脸识别的API服务均采用JSON格式的消息体作为响应返回的格式。


# 错误信息格式

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


# 人脸识别接口

## 人脸注册

**接口描述**

该请求注册图片中的人脸并加入一个群组，注册成功返回请求标识码。

**请求（Request）**

* 请求头域：

无特殊Header参数

* 请求参数：

<table>
<tr><th>参数</th><th>是否必选</th><th>类型</th><th>说明</th></tr>
<tr><td>group_id</td><td>否</td><td>string</td><td>用户组id，标识一组用户（数字、字母、下划线），长度限制128B</td></tr>
<tr><td>uid</td><td>是</td><td>string</td><td>用户id，标识用户（数字、字母、下划线），长度限制128B</td></tr>
<tr><td>images</td><td>是</td><td>string</td><td>base64编码后的图片数据，多张图片半角逗号分隔，最大20M</td></tr>
<tr><td>user_info</td><td>是</td><td>string</td><td>用户资料，长度限制256B</td></tr>
</table>


* 请求示例：

```http
POST /api/v1/faceverify/user/add HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: bfr.bj.baidubce.com
content-type: application/x-www-form-urlencoded
authorization: {bce-authorization-string}
{
	"group_id": "grp1",
	"uid": "0001",
	"image": base64.b64encode(imagetostring),
	"user_info": "zhangshan"
}
```

**响应（Response）**

* 响应头域：无特殊Header参数

* 错误返回

字段  | 类型 | 是否必须 | 说明
--- | --- | --- | ---
error_code | uint32 | 是 | 错误码，参考[错误码](#错误信息格式)，只在异常响应中出现。
error_msg | string | 是 | 错误信息，参考[错误码](#错误信息格式)，只在异常响应中出现。
log_id | uint64 | 是 | 请求标识码，随机数，唯一。

* 正确返回

字段  | 类型 | 是否必须 | 说明
--- | --- | --- | ---
log_id | uint64 | 是 | 请求标识码，随机数，唯一。


* 响应示例：

    `{"log_id":2540545012}`


## 人脸更新

**接口描述**

该请求更新已注册人脸的图片，注册成功返回请求标识码。

**请求（Request）**

* 请求头域：无特殊Header参数
* 请求参数：
	<table>
	<tr><th>参数</th><th>是否必选</th><th>类型</th><th>说明</th></tr>
	<tr><td>uid</td><td>是</td><td>string</td><td>用户id，标识用户（数字、字母、下划线），长度限制128B</td></tr>
	<tr><td>images</td><td>是</td><td>string</td><td>base64编码后的图片数据，多张图片半角逗号分隔，最大20M</td></tr>
	</table>


* 请求示例：

```http
POST /api/v1/faceverify/user/update HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: bfr.bj.baidubce.com
content-type: application/x-www-form-urlencoded
authorization: {bce-authorization-string}
{
	"uid": "0001",
	"image": base64.b64encode(imagetostring)
}
```

**响应（Response）**

* 响应头域：无特殊Header参数

* 错误返回

字段  | 类型 | 是否必须 | 说明
--- | --- | --- | ---
error_code | uint32 | 是 | 错误码，参考[错误码](#错误信息格式)，只在异常响应中出现。
error_msg | string | 是 | 错误信息，参考[错误码](#错误信息格式)，只在异常响应中出现。
log_id | uint64 | 是 | 请求标识码，随机数，唯一。

* 正确返回

字段  | 类型 | 是否必须 | 说明
--- | --- | --- | ---
log_id | uint64 | 是 | 请求标识码，随机数，唯一。


* 响应示例：

    `{"log_id":2540545012}`


## 人脸删除

**接口描述**

该请求删除已注册的人脸，删除成功返回请求标识码。

**请求（Request）**

* 请求头域：无特殊Header参数
* 请求参数：

<table>
<tr><th>参数</th><th>是否必选</th><th>类型</th><th>说明</th></tr>
<tr><td>uid</td><td>是</td><td>string</td><td>用户id，标识用户（数字、字母、下划线），长度限制128B</td></tr>
</table>


* 请求示例：

```http
POST /api/v1/faceverify/user/delete HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: bfr.bj.baidubce.com
content-type: application/x-www-form-urlencoded
authorization: {bce-authorization-string}
{
	"uid": "0001"
}
```

**响应（Response）**

* 响应头域：无特殊Header参数

* 错误返回

字段  | 类型 | 是否必须 | 说明
--- | --- | --- | ---
error_code | uint32 | 是 | 错误码，参考[错误码](#错误信息格式)，只在异常响应中出现。
error_msg | string | 是 | 错误信息，参考[错误码](#错误信息格式)，只在异常响应中出现。
log_id | uint64 | 是 | 请求标识码，随机数，唯一。

* 正确返回

字段 | 类型 | 是否必须 | 说明
--- | --- | --- | ---
log_id | uint64 | 是 | 请求标识码，随机数，唯一。


* 响应示例：

    `{"log_id":2540545012}`

## 人脸认证

**接口描述**

该请求用于已知用户id的情况下认证人脸与库中人脸的匹配程度，返回匹配度得分。

>**说明：**返回值只有匹配度得分，是否通过认证的阈值用户自己定，为了平衡错误率和召回率可以设定不同的阈值。

**请求（Request）**

* 请求头域：

无特殊Header参数

* 请求参数：

<table>
<tr><th>参数</th><th>是否必选</th><th>类型</th><th>说明</th></tr>
<tr><td>uid</td><td>是</td><td>string</td><td>用户id，标识用户（数字、字母、下划线），长度限制128B</td></tr>
<tr><td>images</td><td>是</td><td>string</td><td>base64编码后的图片数据，多张图片半角逗号分隔，最大20M</td></tr>
<tr><td>top_num</td><td>否</td><td>uint32</td><td>返回匹配得分较高的top数，默认为1，即只返回匹配得分最高的那个。</td></tr>
</table>


* 请求示例：

```http
POST /api/v1/faceverify/user/verify HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: bfr.bj.baidubce.com
content-type: application/x-www-form-urlencoded
authorization: {bce-authorization-string}
{
	"uid": "0001",
	"image": base64.b64encode(imagetostring)
}
```

**响应（Response）**

* 响应头域：无特殊Header参数

* 错误返回

字段  | 类型 | 是否必须 | 说明
--- | --- | --- | ---
error_code | uint32 | 是 | 错误码，参考[错误码](#错误信息格式)，只在异常响应中出现。
error_msg | string | 是 | 错误信息，参考[错误码](#错误信息格式)，只在异常响应中出现。
log_id | uint64 | 是 | 请求标识码，随机数，唯一。

* 正确返回

字段  | 类型 | 是否必须 | 说明
--- | --- | --- | ---
result_num | uint32 | 是 | 返回结果数目，即：result数组中元素个数。
result | array(array(double))| 是 | 结果数组。数组元素为每张图片匹配top result_num的得分数组，得分范围[0,100.0]。
log_id | uint64 | 是 | 请求标识码，随机数，唯一。

>**说明：**由于一个用户可能注册多张多张图，所以可能会有多个得分。

* 响应示例：

返回匹配度最高的2个得分。

	{
    "log_id": 73473737,
    "result_num":2,
    "result": [
            99.3,
            83.6
    ]
    }


## 人脸识别

**接口描述**

该请求识别人脸与已经注册库中的人脸匹配程度，返回用户信息和匹配度得分。

>**说明：**返回值只有匹配度得分，是否通过认证的阈值用户自己定，为了平衡错误率和召回率可以设定不同的阈值。

**请求（Request）**

* 请求头域：

无特殊Header参数

* 请求参数：

<table>
<tr><th>参数</th><th>是否必选</th><th>类型</th><th>说明</th></tr>
<tr><td>group_id</td><td>否</td><td>string</td><td>用户组id，标识一组用户（数字、字母、下划线），长度限制128B</td></tr>
<tr><td>images</td><td>是</td><td>string</td><td>base64编码后的图片数据，多张图片半角逗号分隔，最大20M</td></tr>
<tr><td>user_top_num</td><td>否</td><td>uint32</td><td>返回匹配用户top数，默认为1。即只返回匹配得分最高的用户信息。</td></tr>
<tr><td>face_top_num</td><td>否</td><td>uint32</td><td>单用户人脸匹配得分较高的top数，默认为1，即只返回匹配得分最高的那个用户得分。</td></tr>
</table>

* 请求示例：

```http
POST /api/v1/faceverify/user/identify HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: bfr.bj.baidubce.com
content-type: application/x-www-form-urlencoded
authorization: {bce-authorization-string}
{
	"group_id": "grp1",
	"image": base64.b64encode(imagetostring),
	"user_top_num": "1",
	"face_top_num": "2"
}
```

**响应（Response）**

* 响应头域：无特殊Header参数

* 错误返回

字段  | 类型 | 是否必须 | 说明
--- | --- | --- | ---
error_code | uint32 | 是 | 错误码，参考[错误码](#错误信息格式)，只在异常响应中出现。
error_msg | string | 是 | 错误信息，参考[错误码](#错误信息格式)，只在异常响应中出现。
log_id | uint64 | 是 | 请求标识码，随机数，唯一。

* 正确返回

字段  | 类型 | 是否必须 | 说明
--- | --- | --- | ---
result_num | uint32 | 是 | 返回结果数目，即：result数组中元素个数。
result | array(object) | 是 | 结果数组。包括用户id、用户信息和用户得分，其中得分数组元素为每张图片匹配top result_num的得分数组，得分范围[0,100.0]。
+user_id | 是 | string | 匹配到的用户id。
+user_info | 是 | string	注册时的用户信息。
+scores	是 | array(array(double)) | 结果数组。数组元素为每张图片匹配top result_num的得分数组，得分范围[0,100.0]。
log_id | uint64 | 是 | 请求标识码，随机数，唯一。

* 响应示例：
```
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


## 两两对比

**接口描述**

该请求用于上传图片和库中的图片进行两两对比匹配程度，返回匹配度得分。

**请求（Request）**

* 请求头域：

无特殊Header参数

* 请求参数：

<table>
<tr><th>参数</th><th>是否必选</th><th>类型</th><th>说明</th></tr>
<tr><td>images</td><td>是</td><td>string</td><td>base64编码后的图片数据，多张图片半角逗号分隔，最大20M</td></tr>
</table>

* 请求示例：

```http
POST /api/v1/faceverify/user/match HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: bfr.bj.baidubce.com
content-type: application/x-www-form-urlencoded
authorization: {bce-authorization-string}
{
	"image": base64.b64encode(imagetostring)
}
```

**响应（Response）**

* 响应头域：无特殊Header参数

* 错误返回

字段  | 类型 | 是否必须 | 说明
--- | --- | --- | ---
error_code | uint32 | 是 | 错误码，参考[错误码](#错误信息格式)，只在异常响应中出现。
error_msg | string | 是 | 错误信息，参考[错误码](#错误信息格式)，只在异常响应中出现。
log_id | uint64 | 是 | 请求标识码，随机数，唯一。

* 正确返回

字段  | 类型 | 是否必须 | 说明
--- | --- | --- | ---
result_num | uint32 | 是 | 返回结果数目，即：result数组中元素个数。
result | array(array(double))| 是 | 结果数组。数组元素为每张图片匹配top result_num的得分数组，得分范围[0,100.0]。
log_id | uint64 | 是 | 请求标识码，随机数，唯一。
+index_i | 是 | uint32 | 比对图片1的index。
+index_j | 是 | uint32 | 比对图片2的index。
+score | 是 | double | 比对得分。


* 响应示例：

请求为四张图片，第三张解析失败。

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


## 用户信息查询

**接口描述**

该请求根据用户id查询用户信息，返回用户id、用户信息、用户所在组及请求标识码。

**请求（Request）**

* 请求头域：

无特殊Header参数

* 请求参数：

<table>
<tr><th>参数</th><th>是否必选</th><th>类型</th><th>说明</th></tr>
<tr><td>uid</td><td>是</td><td>string</td><td>用户id，标识用户（数字、字母、下划线），长度限制128B</td></tr>
</table>


* 请求示例：

```http
POST /api/v1/faceverify/user/get HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: bfr.bj.baidubce.com
content-type: application/x-www-form-urlencoded
authorization: {bce-authorization-string}
{
	"uid": "0001"
}
```

**响应（Response）**

* 响应头域：无特殊Header参数

* 错误返回

字段  | 类型 | 是否必须 | 说明
--- | --- | --- | ---
error_code | uint32 | 是 | 错误码，参考[错误码](#错误信息格式)，只在异常响应中出现。
error_msg | string | 是 | 错误信息，参考[错误码](#错误信息格式)，只在异常响应中出现。
log_id | uint64 | 是 | 请求标识码，随机数，唯一。

* 正确返回

字段 | 是否必选 | 类型 | 说明
--- | --- | --- | ---
+uid | 是 | string | 用户ID。
+user_info | 是 | string | 用户信息。
+groups | 是 | array(string)	用户所属组列表。
log_id | 是 | uint64 | 请求标识码，随机数，唯一。
result | 是 | object | 用户信息组。

* 响应示例：
```
{
"result": {
    "uid": "chenke0809",
    "user_info": "chenke08",
    "groups": [
    "group_a"
    ]
},
"log_id": 2778269457
}
```
# APP用户组信息接口

## APP下组列表查询

**接口描述**

该请求用于查询APP下组列表。

**请求（Request）**

* 请求头域：无特殊Header参数
* 请求参数：

参数 | 是否必选 | 类型 | 说明
--- | --- | --- | ---
start | 否 | uint32 | 默认值0，起始序号。
num | 否 | uint32 | 返回数量，默认值100，最大值1000。

* 请求示例：

```http
POST /api/v1/faceverify/app/getgroups HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: bfr.bj.baidubce.com
content-type: application/x-www-form-urlencoded
authorization: {bce-authorization-string}
{
	"start": "1",
	"num": "101"
}
```

**响应（Response）**

* 响应头域：无特殊Header参数

* 错误返回

字段 | 类型 | 是否必须 | 说明
--- | --- | --- | ---
error_code | uint32 | 是 | 错误码，参考[错误码](#错误信息格式)，只在异常响应中出现。
error_msg | string | 是 | 错误信息，参考[错误码](#错误信息格式)，只在异常响应中出现。
log_id | uint64 | 是 | 请求标识码，随机数，唯一。

* 正确返回

字段 | 类型 | 是否必须 | 说明
--- | --- | --- | ---
log_id | uint64 | 是 | 请求标识码，随机数，唯一。
result | 是 | array(string) | group_id列表。
result_num | 是 | uint32 | 返回组列表的个数。


* 响应示例：
```
{
"result_num": 2,
"result": [
    "grp1",
    "grp2"
],
"log_id": 3314921889
}
```

## 组内用户列表

该请求用于输出某用户组下的用户列表。

**请求（Request）**

* 请求头域：无特殊Header参数
* 请求参数：

参数 | 是否必选 | 类型 | 说明
--- | --- | --- | ---
start | 否 | uint32 | 默认值0，起始序号。
num | 否 | uint32 | 返回数量，默认值100，最大值1000。
group_id | 是 | string | 组id

* 请求示例：

```http
POST /api/v1/faceverify/group/getusers HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: bfr.bj.baidubce.com
content-type: application/x-www-form-urlencoded
authorization: {bce-authorization-string}
{
	"start": "1",
	"num": "101",
	"group_id": "grp1"
}
```

**响应（Response）**

* 响应头域：无特殊Header参数

* 错误返回

字段 | 类型 | 是否必须 | 说明
--- | --- | --- | ---
error_code | uint32 | 是 | 错误码，参考[错误码](#错误信息格式)，只在异常响应中出现。
error_msg | string | 是 | 错误信息，参考[错误码](#错误信息格式)，只在异常响应中出现。
log_id | uint64 | 是 | 请求标识码，随机数，唯一。

* 正确返回

字段 | 类型 | 是否必须 | 说明
--- | --- | --- | ---
log_id | uint64 | 是 | 请求标识码，随机数，唯一。
result | 是 | array(string) | 用户列表。
result_num | 是 | uint32 | 返回用户列表的个数。
+uid| 是 | string | 用户id。
+user_info | 是 | string | 用户信息。



* 响应示例：
```
{
"result_num": 2,
"result": [
    "grp1",
    "grp2"
],
"log_id": 3314921889
} 
```
## 组内添加用户

该请求用于在用户组中添加用户。

**请求（Request）**

* 请求头域：

无特殊Header参数

* 请求参数：

参数 | 是否必选 | 类型 | 说明
--- | --- | --- | ---
uid | 是 | string | 用户id
group_id | 是 | string | 组id


* 请求示例：

```http
POST /api/v1/faceverify/group/adduser HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: bfr.bj.baidubce.com
content-type: application/x-www-form-urlencoded
authorization: {bce-authorization-string}
{
	"uid": "0001",
	"group_id": "grp1"
}
```

**响应（Response）**

* 响应头域：无特殊Header参数

* 错误返回

字段 | 类型 | 是否必须 | 说明
--- | --- | --- | ---
error_code | uint32 | 是 | 错误码，参考[错误码](#错误信息格式)，只在异常响应中出现。
error_msg | string | 是 | 错误信息，参考[错误码](#错误信息格式)，只在异常响应中出现。
log_id | uint64 | 是 | 请求标识码，随机数，唯一。

* 正确返回

字段 | 类型 | 是否必须 | 说明
--- | --- | --- | ---
log_id | uint64 | 是 | 请求标识码，随机数，唯一。


* 响应示例：

    `{"log_id":2540545012}`

## 组内删除用户

该请求用于删除用户组中的某用户。

**请求（Request）**

* 请求头域：

无特殊Header参数

* 请求参数：

参数 | 是否必选 | 类型 | 说明
--- | --- | --- | ---
uid | 是 | string | 用户id
group_id | 是 | string | 组id

* 请求示例：

```http
POST /api/v1/faceverify/ group/deleteuser HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: bfr.bj.baidubce.com
content-type: application/x-www-form-urlencoded
authorization: {bce-authorization-string}
{
	"uid": "0001",
	"group_id": "grp1"
}
```

**响应（Response）**

* 响应头域：无特殊Header参数

* 错误返回

字段 | 类型 | 是否必须 | 说明
--- | --- | --- | ---
error_code | uint32 | 是 | 错误码，参考[错误码](#错误信息格式)，只在异常响应中出现。
error_msg | string | 是 | 错误信息，参考[错误码](#错误信息格式)，只在异常响应中出现。
log_id | uint64 | 是 | 请求标识码，随机数，唯一。

* 正确返回

字段 | 类型 | 是否必须 | 说明
--- | --- | --- | ---
log_id | uint64 | 是 | 请求标识码，随机数，唯一。

* 响应示例：

    `{"log_id":2540545012}`

# 人脸属性

**接口描述**

该请求注返回图片中人脸的属性及图片信息。

**请求（Request）**

* 请求头域：

无特殊Header参数

* 请求参数：

<table>
<tr><th>参数</th><th>是否必选</th><th>类型</th><th>说明</th></tr>
<tr><td>access_token</td><td>必选</td><td>string</td><td>Oauth2.0授权所获token。 </td></tr>
<tr><td>image</td><td>是</td><td>string</td><td>base64编码后的图片数据，图片大小不超过2M。</td></tr>
<tr><td>max_face_num</td><td>否</td><td>uint32</td><td>最多处理人脸数目，默认值1</td></tr>
<tr><td>face_fields</td><td>否</td><td>string</td><td>包括age、beauty、expression、faceshape、gender、glasses、landmark、race、qualities信息，逗号分隔，默认只返回人脸框、概率和旋转角度。</td></tr>
</table>



* 请求示例：

```http
POST /api/v1/faceattribute HTTP/1.1
accept-encoding: gzip, deflate
x-bce-date: {utc-date-string}
connection: keep-alive
accept: */*
host: bfr.bj.baidubce.com
content-type: application/x-www-form-urlencoded
authorization: {bce-authorization-string}

image=%2F9j%2F4AAQSkZJRgABAQAAAQABAAD%2F4QDKRXhpZgAATU0AK

```

>**说明**：image取值为base64编码图片后的字符。

**响应（Response）**

* 响应头域：无特殊Header参数

* 错误返回

字段  | 类型 | 是否必须 | 说明
--- | --- | --- | ---
error_code | uint32 | 是 | 错误码，参考[错误码](#错误信息格式)，只在异常响应中出现。
error_msg | string | 是 | 错误信息，参考[错误码](#错误信息格式)，只在异常响应中出现。
log_id | uint64 | 是 | 请求标识码，随机数，唯一。

* 正确返回

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


* 响应示例：

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