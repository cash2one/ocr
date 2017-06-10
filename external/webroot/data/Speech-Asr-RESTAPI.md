# 概念解释

对本文中将提到的名词约定如下：

**语音识别：**也被称为自动语音识别 Automatic Speech Recognition（ASR），其目标是将人类的语音中的词汇内容转换为计算机可读的输入，例如按键、二进制编码或者字符序列。

**Nbest 识别结果：**指识别结果的 N 候选。

**应用程序：**在开发中调用了 API、具有语音识别功能的产品线产品。

**开发者：**想在应用程序中使用 API、正在阅读本文档的开发人员。



# 简介

百度语音识别通过 REST API 的方式给开发者提供一个通用的 HTTP 接口，基于该接口，开发者可以轻松的获取语音识别能力，本文档描述了使用语音识别服务 REST API 的方法。

## 功能介绍

REST API 支持整段录音文件的识别，对录音格式有一定的要求，支持语音识别控件：集成提示音、音量反馈动效整套交互的对话框控件，方便开发者快速集成。

本文档适用使用 HTTP 接口的开发人员。

## 支持的语音格式

原始 PCM 的录音参数必须符合 8k/16k 采样率、16bit 位深、单声道，支持的压缩格式有：pcm（不压缩）、wav、opus、amr、x-flac。



# 集成指南


## 获取 Access Token

使用语音识别 REST API 需要获取 Access Token。Access Token 是用户身份验证和授权的凭证，语音识别采用的是Client Credentials授权方式，即采用应用公钥、密钥获取Access Token，适用于任何带server类型应用，通过此授权方式获取Access Token仅可访问平台授权类的接口，详见百度 OAuth 授权“[Client Credentials授权](http://developer.baidu.com/wiki/index.php?title=docs/oauth/client "Client Credentials授权")”部分。

使用Client Credentials获取Access Token需要应用在其服务端发送请求（推荐用POST方法）到百度OAuth2.0授权服务的“ https://openapi.baidu.com/oauth/2.0/token ”地址上，并带上以下参数：

- grant_type：必须参数，固定为“client_credentials”；
- client_id：必须参数，应用的 API Key；
- client_secret：必须参数，应用的 Secret Key;

**例如：**

```
    https://openapi.baidu.com/oauth/2.0/token?
    grant_type=client_credentials&
    client_id=Va5yQRHl********LT0vuXV4&
    client_secret= 0rDSjzQ20XUj5i********PQSzr5pVw2&
```

响应数据包如下所示，其中 “access_token” 字段即为请求 REST API 所需的令牌,  默认情况下，Access Token 有效期为一个月，开发者需要对 Access Token的有效性进行判断，如果Access Token过期可以重新获取。

**例如：**

```
    HTTP/1.1 200 OK
    Content-Type: application/json
    Cache-Control: no-store
    
    {
        "access_token": "1.a6b7dbd428f731035f771b8d********.86400.1292922000-2346678-124328",
        "expires_in": 86400,
        "refresh_token": "2.385d55f8615fdfd9edb7c4b********.604800.1293440400-2346678-124328",
        "scope": "public",
        "session_key": "ANXxSNjwQDugf8615Onqeik********CdlLxn",
        "session_secret": "248APxvxjCZ0VEC********aK4oZExMB",
    }
```

# API请求方式基本说明

- 语音识别接口支持 POST 方式
- 目前 API 仅支持整段语音识别的模式，即需要上传整段语音进行识别
- 语音数据上传方式有两种：隐示发送和显示发送
- 原始语音的录音格式目前只支持评测 8k/16k 采样率 16bit 位深的单声道语音
- 压缩格式支持：pcm（不压缩）、wav、opus、speex、amr、x-flac
- 系统支持语言种类：中文（zh）、粤语（ct）、英文（en）
- 正式地址：http://vop.baidu.com/server_api

## 语音上传模式

语音数据和其他参数通过标准 JSON 格式串行化 POST 上传， JSON 里包括的参数：

| 字段名  | 数据类型  | 可需  |描述   |
| ------------ | ------------ | ------------ | ------------ |
|format| sting| 必填 |语音压缩的格式，请填写上述格式之一，不区分大小写
|rate| int |必填 |采样率，支持 8000 或者 16000
|channel| int |必填| 声道数，仅支持单声道，请填写 1
|cuid |string |必填 |用户唯一标识，用来区分用户，填写机器 MAC 地址或 IMEI 码，长度为60以内
|token| string| 必填 |开放平台获取到的开发者[ access_token](http://yuyin.baidu.com/docs/tts/135#获取 Access Token "access_token")
|ptc| int |选填 |协议号，下行识别结果选择，默认 nbest 结果
|lan| string |选填| 语种选择，中文=zh、粤语=ct、英文=en，不区分大小写，默认中文
|url |string|选填| 语音下载地址
|callback |string|选填| 识别结果回调地址
|speech |string| 选填| 真实的语音数据 ，需要进行base64 编码
|len| int |选填|原始语音长度，单位字节

其中，开发者可以把语音数据放在 JSON 序列的“speech”字段中，需要将语音先进行 base64编码，并标明语音数据的原始长度，填写“len”字段；也可以直接提供语音下载地址放在“url”字段中，并且提供识别结果的回调地址，放在“callback”参数中。因此“speech”和“len”参数绑定，“url”和“callback”参数绑定，这两组参数二选一填写，如果都填，默认处理第一种。

- 表单类型在 HTTP-HEADER 里的 content-type 表明，例：

```php
Content-Type:application/json
```

Content-length 请填写 JSON 串的长度。

- 上传实例：

```php
{
	"format":"speex",
	"rate":8000,
	"channel":1,
	"token":xxx,
	"cuid":"baidu_workshop",
	"len":4096,
	"speech":"xxx",
}
```

>**注意事项：**
>
1. len 字段表示原始语音长度，不是 base64 编码之后的长度。
2. speech 和 len 字段绑定验证，url 和 callback 绑定验证，两组参数二选一必填，如果都填，默认第一种方式。
3. 如果采用 base64 编码语音数据，数据量会增大 1/3。

语音数据直接放在 HTTP-BODY 中，控制参数以及相关统计信息通过 REST 参数传递，REST参数说明：

|  字段名  |  数据类型 |  可需 |  描述 |
| ------------ | ------------ | ------------ | ------------ |
|cuid| string| 必填 |用户 ID，推荐使用设备mac 地址/手机IMEI 等设备唯一性参数
|token| string| 必填 |开发者身份验证密钥
|lan| string|选填| 语种选择，中文=zh、粤语=ct、英文=en，不区分大小写，默认中文
|ptc| int| 选填 |协议号，下行识别结果选择，默认 nbest 结果

- 语音数据的采样率和压缩格式在 HTTP-HEADER 里的 content-type 表明，例：

```php
Content-Type:audio/amr;rate=8000
```

Content-length 请填写原始语音长度。

- URL 示例：

```php
http://vop.baidu.com/server_api?lan=zh&cuid=***&token=***
```

## 下行接口定义

两种上传方式都返回统一的结果，采用 JSON 格式封装，如果识别成功，识别结果放在 JSON的“result”字段中，统一采用 utf-8 方式编码。

| 字段名  | 数据类型  | 可需  | 描述  |
| ------------ | ------------ | ------------ | ------------ |
| err_no|  int|  必填 | 错误码
| err_msg | string|  必填|  错误码描述
| sn | string|  必填|  语音数据唯一标识，系统内部产生，用于 debug
| result|  array ( [string,string,…])| 选填 |   识别结果数组，提供1-5 个候选结果，<br>string 类型为识别的字符串， utf-8 编码

- **识别成功返回 case**

```php
{\"err_no\":0,\"err_msg\":\"success.\",\"corpus_no\":\"15984125203285346378\",\"sn\":\"481D633F-73BA-726F-49EF-8659ACCC2F3D\",\"result\":[\"北京天气\"]}
```

- **识别错误返回 case**

```php
{"err_no":2000,"err_msg":"data empty.","sn":null}
```
## 错误码解释

| 错误码  | 含义             |
| ---- | -------------- |
| 3300 | 输入参数不正确        |
| 3301 | 识别错误           |
| 3302 | 验证失败           |
| 3303 | 语音服务器后端问题      |
| 3304 | 请求 GPS 过大，超过限额 |
| 3305 | 产品线当前日请求数超过限额  |



# 注意事项

1. 请严格按照文档里描述的参数进行开发，特别请关注原始录音参数以及语音压缩格式的建议，否则会影响识别率，进而影响到产品的用户体验。

2. 目前系统支持的语音时长上限为60s，请不要超过这个长度，否则会返回错误。

