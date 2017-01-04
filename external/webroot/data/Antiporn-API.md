# 简介

## 请求URL数据格式

向API服务地址使用POST发送请求，必须在URL中带上参数：

**access_token:** 必须参数，参考“[Access Token获取](/docs#Beginner-Auth)”。

​POST中参数按照API接口说明调用即可。

例如黄反识别API，使用HTTPS POST发送：

```
https://aip.baidubce.com/rest/2.0/antiporn/v1/detect? access_token=24.f9ba9c5241b67688bb4adbed8bc91dec.2592000.1485570332.282335-8574074
```

**请求消息体格式**

API服务要求使用JSON格式的结构体来描述一个请求的具体内容, 然后通过urlencode格式化请求体。

**请求返回格式**

API服务均采用JSON格式的消息体作为响应返回的格式。


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


# 黄反识别

**接口描述**

该请求用于鉴定图片的色情度。即对于输入的一张图片（可正常解码，且长宽比适宜），输出图片的色情度。目前支持5个维度：一般色情，一般正常，卡通色情，卡通正常和其他。

**HTTP 方法**

   POST

**请求URL**

https://aip.baidubce.com/rest/2.0/antiporn/v1/detect

**请求示例**

```
{
    image=图像base64编码
}
```
**请求参数**

| 参数    | 类型     | 是否必须 | 说明                       |
| ----- | ------ | ---- | ------------------------ |
| image | string | 是    | 图像数据，base64编码。图片大小不超过1M。 |


**返回示例**

```
result: [
    {"class_name": "一般色情", ""probability": 0.010549738071859}，
    {"class_name": "一般正常", ""probability": 0.08985498547554}，
    {"class_name": "卡通色情", ""probability": 0.0048787374980748}，
    {"class_name": "卡通正常", ""probability": 0.89471650123596}，
    {"class_name": "其他", ""probability": 0.0.010549738071859}
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
| class_name  | string | 是    | 分类结果名称  | 一般色情             |
| probability | double | 是    | 分类结果置信度 | 0.89471650123596 |



