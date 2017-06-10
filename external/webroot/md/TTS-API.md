# 概念解释

对本文中将提到的名词约定如下：

**语音合成：**也被称为文本转换技术（TTS），它是将计算机自己产生的、或外部输入的文字信息转变为可以听得懂的、流利的口语输出的技术。

**应用程序：**在开发中调用了API、具有语音合成功能的产品线产品。

**开发者：**想在应用程序中使用API、正在阅读本文档的开发人员。


# 简介

百度语音合成通过REST API的方式给开发者提供一个通用的HTTP接口，基于该接口，开发者可以轻松的获取语音合成能力，本文档描述了使用语音合成服务REST API的方法。

## 功能介绍

REST API支持对一段文本的合成，其中对于文本格式以及参数有一定的要求。请按照文档中描述进行相应请求操作。

本文档适用使用HTTP接口的开发人员。

# 集成指南

## 获取 Access Token

使用语音识别 REST API 需要获取 Access Token。Access Token 是用户身份验证和授权的凭证，语音识别采用的是Client Credentials授权方式，即采用应用公钥、密钥获取Access Token，适用于任何带server类型应用，通过此授权方式获取Access Token仅可访问平台授权类的接口，详见百度 OAuth 授权“[Client Credentials授权](http://developer.baidu.com/wiki/index.php?title=docs/oauth/client "Client Credentials授权")”部分。

使用Client Credentials获取Access Token需要应用在其服务端发送请求（推荐用POST方法）到百度OAuth2.0授权服务的“ https://openapi.baidu.com/oauth/2.0/token ”地址上，并带上以下参数：

- grant_type：必须参数，固定为“client_credentials”；
- client_id：必须参数，应用的 API Key；
- client_secret：必须参数，应用的 Secret Key;

**例如：**

    https://openapi.baidu.com/oauth/2.0/token?
    grant_type=client_credentials&
    client_id=Va5yQRHl********LT0vuXV4&
    client_secret= 0rDSjzQ20XUj5i********PQSzr5pVw2&

响应数据包如下所示，其中“access_token”字段即为请求REST API所需的令牌,  默认情况下，Access Token有效期为一个月，开发者需要对Access Token的有效性进行判断，如果Access Token过期可以重新获取。

**例如：**

```json
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

#API请求方式基本说明

语音合成接口支持 POST 和 GET两种方式
正式地址：http://tsn.baidu.com/text2audio

##文本上传模式

- 上传参数

  |参数|可需|描述
  | ------------ | ------------ | ------------ |
  |tex|必填	|合成的文本，使用UTF-8编码，请注意文本长度必须小于1024字节
  |lan|必填	|语言选择,填写zh
  |tok|必填	|开放平台获取到的开发者[access_token](http://yuyin.baidu.com/docs/tts/135.html#获取 Access Token "access_token")
  |ctp|必填	|客户端类型选择，web端填写1
  |cuid|必填	|用户唯一标识，用来区分用户，填写机器 MAC 地址或 IMEI 码，长度为60以内
  |spd|选填	|语速，取值0-9，默认为5中语速
  |pit|选填	|音调，取值0-9，默认为5中语调
  |vol|选填	|音量，取值0-9，默认为5中音量
  |per|选填	|发音人选择，取值0-1, 0为女声，1为男声，默认为女声

## GET调用方式

将所有的参数都填写到URL地址中，可以通过浏览器可以播放合成的语音结果。

    http://tsn.baidu.com/text2audio?tex=***&lan=zh&cuid=***&ctp=1&tok=***

## POST调用方式

将文本以及其他参数写入到body里面，利用表单的方式将参数传递到服务端。调用地址为 http://tsn.baidu.com/text2audio , 所有的参数都在body中。body里面的数据为：

    tex=***&lan=zh&cuid=***&ctp=1&tok=***

**注意：**
不论是将参数放到URL地址中，还是利用表单的方式放入到http body中，参数都需要经过两次 URLENCODE 操作。如果是直接在浏览器地址栏输入则不需要。

## 下行接口定义

如果合成成功，下行数据为二进制语音文件，具体header信息 Content-Type：audio/mp3；如果合成出现错误，则会返回json结果，具体header信息为：Content-Type:application/json。其中sn数据主要用于DEBUG追查问题，如果出现问题，可以提供sn帮助确认问题。

错误实例为：

    {"err_no":500,"err_msg":"notsupport.","sn":"abcdefgh","idx":1}

## 错误码解释

|错误码	|含义
| ------------ | ------------ |
|500	|不支持输入
|501	|输入参数不正确
|502	|token验证失败
|503	|合成后端错误



# 注意事项

请严格按照文档里描述的参数进行开发。请注意以下几个问题：

1. 合成文本长度必须小于1024字节，如果本文长度较长，可以采用多次请求的方式。切忌不可文本长度超过限制。

2. 语音合成 rest api初次申请默认请求数配额 200000次/天，如果默认配额不能满足需求，请申请提高配额。

3. 必填字段中，严格按照文档描述中内容填写。