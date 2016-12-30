# 使用须知

* [API认证机制](../Reference/AuthenticationMechanism)
* [AK/SK](../Reference/GetAKSK)
* 黄反识别服务域名“aip.baidubce.com”

# 接口规范

## 请求头域内容（HTTP Request Header）

API服务需要在请求的HTTP头域中包含以下信息：

* host（必填）
* x-bce-date （必填）
* x-bce-request-id（选填）
* authorization（必填）
* content-type（必填） 
* content-length（选填）

## 请求消息体格式（HTTP Request Body）

API服务要求使用JSON格式的结构体来描述一个请求的具体内容, 然后通过urlencode格式化请求体。

## 请求返回格式（HTTP Response）

API服务均采用JSON格式的消息体作为响应返回的格式。


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



# 黄反识别

**接口描述**

该请求用于鉴定图片的色情度。即对于输入的一张图片（可正常解码，且长宽比适宜），输出图片的色情度。目前支持5个维度：一般色情，一般正常，卡通色情，卡通正常和其他。

**请求（Request）**

* 请求头域：

无特殊Header参数

* 请求参数：

参数 | 类型 | 是否必须 | 说明
--- | --- | --- | ---
access_token | string | 是 | Oauth2.0授权所获token，详情描述参见[API认证机制](../Reference/AuthenticationMechanism)。
image | string | 是 | 图像数据，base64编码。图片大小不超过2M。


* 请求示例：

```http

POST /rest/2.0/antiporn/v1/detect HTTP/1.1
x-bce-date: 2016-12-24T13:02:00Z
connection: keep-alive
accept: */*
host: aip.baidubce.com
content-type: application/x-www-form-urlencoded
authorization: {bce-authorization-string}
{
	"access_token": "21.21cda41bd9739ce5a083f3326f64b610.2592000.1469180474.1686270206-11101624",
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
result | array(array(double)) | 是 | 结果数组，每项内容对应一个分类维度的结果。
log_id | uint64 | 是 | 请求标识码，随机数，唯一。

其中元素的每项内容包含以下字段：

字段  | 类型 | 是否必须 | 说明 | 示例
--- | --- | --- | ---
class_name | string | 是 | 分类结果名称 | 一般色情
probability | double | 是 | 分类结果置信度 | 0.89471650123596


* 响应示例：

```
result: [
    {"class_name": "一般色情", ""probability": 0.010549738071859}，
    {"class_name": "一般正常", ""probability": 0.08985498547554}
    {"class_name": "卡通色情", ""probability": 0.0048787374980748}
    {"class_name": "卡通正常", ""probability": 0.89471650123596}
    {"class_name": "其他", ""probability": 0.0.010549738071859}
    ]
```

**Python黄反识别示例**

```
import base64,json,urllib,urllib2
 
def test_antiporn(filename):
    file = open(filename, 'rb')
    image = file.read()
    file.close()
    postData = {
        'image': base64.b64encode(image),
    }
    strUrl = 'http://aip.baidubce.com/rest/2.0/vis-antiporn/v1/antiporn?access_token=21.21cda41bd9739ce5a083f3326f64b610.2592000.1469180474.1686270206-11101624'
 
    postData = urllib.urlencode(postData)
 
    req = urllib2.Request(strUrl, postData)
    response = urllib2.urlopen(req).read()
    print response
 
test_antiporn('./1.jpg')
```

**PHP黄反识别示例**

```
<?php
//url for test only
$url = 'http://aip.baidubce.com/rest/2.0/vis-antiporn/v1/antiporn?access_token=21.21cda41bd9739ce5a083f3326f64b610.2592000.1469180474.1686270206-11101624';
$imageContent = file_get_contents('./1.jpg');
$postParams = array(
    'image' => base64_encode($imageContent),
);
$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
curl_setopt($ch, CURLOPT_POST, TRUE);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postParams);
$response = curl_exec($ch);
curl_close($ch);
echo "$response\n";
?>
```
