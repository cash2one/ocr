# 鉴权认证机制

## 简介

​	本文档主要针对HTTP API调用者，百度AIP开放平台使用OAuth2.0授权调用开放API，调用API时必须在URL中带上accesss_token参数，获取Access Token的流程如下：

## 获取Access Token

##### 请求URL数据格式

 	向授权服务地址`https://aip.baidubce.com/oauth/2.0/token`发送请求（推荐使用POST），并在URL中带上以下参数：

* **grant_type:**     必须参数，固定为“client_credentials”；
* **client_id:**         必须参数，应用的API Key；
* **client_secret:**  必须参数，应用的Secret Key；

例如：

```
https://aip.baidubce.com/oauth/2.0/token?
    grant_type=client_credentials&
    client_id=Va5yQRHlA4Fq4eR3LT0vuXV4&
    client_secret= 0rDSjzQ20XUj5itV7WRtznPQSzr5pVw2&
```

##### 服务器返回的JSON文本参数如下：

- **access_token：**要获取的Access Token；
- **expires_in：**Access Token的有效期(秒为单位，一般为1个月)；
- **其他参数忽略，暂时不用**;

例如：

```
{
  "refresh_token": "25.b55fe1d287227ca97aab219bb249b8ab.315360000.1798284651.282335-8574074",
  "expires_in": 2592000,
  "scope": "public wise_adapt",
  "session_key": "9mzdDZXu3dENdFZQurfg0Vz8slgSgvvOAUebNFzyzcpQ5EnbxbF+hfG9DQkpUVQdh4p6HbQcAiz5RmuBAja1JJGgIdJI",
  "access_token": "24.6c5e1ff107f0e8bcef8c46d3424a0e78.2592000.1485516651.282335-8574074",
  "session_secret": "dfac94a3489fe9fca7c3221cbf7525ff"
}
```

##### 若请求错误，服务器将返回的JSON文本包含以下参数：

* **error：**错误码；关于错误码的详细信息请参考“[鉴权认证错误码](#####鉴权认证错误码)”。

- **error_description：**错误描述信息，帮助理解和解决发生的错误。



**例如认证失败返回：**

```
{
    "error": "invalid_client",
    "error_description": "unknown client id"
}
```

##### 鉴权认证错误码

| error          | error_description            | 解释            |
| -------------- | ---------------------------- | ------------- |
| invalid_client | unknown client id            | API Key不正确    |
| invalid_client | Client authentication failed | Secret Key不正确 |



## 使用Access Key ID/Secret Access Key的开发者注意

***

![](bce-ak-sk.png)

 	如上图中，如果您使用的是“安全认证/Access Key ”中的Access Key ID 和 Secret Access Key的开发者，则不能使用获取Access Token的方式鉴权，具体鉴权认证机制参考“[百度云鉴权认证机制](https://cloud.baidu.com/doc/Reference/AuthenticationMechanism.html)”。



