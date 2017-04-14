# PHP SDK文档

本文档主要介绍黄反识别服务。在使用本文档前，您需要先了解黄反识别服务。

# 安装黄反识别 PHP SDK

**黄反识别 PHP SDK目录结构**

    AipAntiPorn
           ├── AipAntiPorn.php                 //AntiPorn识别类
           ├── lib
           │      ├── AipHttpClient.php        //内部http请求类
           │      ├── AipBCEUtil.php           //内部工具类
           │      ├── AipBase                  //Aip基类
           └── demo     
                  ├── DemoAipAntiPorn.php      //AntiPorn服务示例
                  └── antiporn.jpg             //色情图片

**支持 PHP版本：5.3+ **

**使用SDK步骤如下：**

1.在[官方网站](http://ai.baidu.com/sdk)下载PHP SDK压缩工具包。

2.将下载的`aip-antiporn-php-sdk-version.zip`解压后，复制AipAntiPorn.php以及lib/*到工程文件夹中。

3.引入AipAntiPorn.php

# 快速入门

黄反识别服务，依托百度业界领先的图像识别算法，基于大数据深度学习技术，提供图片色情、性感、正常三个类别的识别服务。

## 初始化一个AipAntiPorn对象

用户可以参考如下代码初始化一个AipAntiPorn对象：

```php
// 引入AntiPorn SDK
require_once 'AipAntiPorn.php';

// 定义常量
const APP_ID = '你的 App ID'
const API_KEY = '你的 API Key';
const SECRET_KEY = '你的 Secret Key';

// 初始化AipAntiPorn对象
$AipAntiPorn = new AipAntiPorn(APP_ID, API_KEY, SECRET_KEY);
```

在上面代码中，常量`APP_ID`在百度云控制台中创建，常量`API_KEY`与`SECRET_KEY`是在创建完毕应用后，系统分配给用户的，均为字符串，用于标识用户，为访问做签名验证，可在AI服务控制台中的**应用列表**中查看。  

**注意：**如您以前是百度云的老用户，其中`API_KEY`对应百度云的“Access Key ID”，`SECRET_KEY`对应百度云的“Access Key Secret”。

## 配置AipAntiporn

如果用户需要配置AipAntiporn的一些细节参数，可以在构造AipAntiporn之后调用接口设置参数，目前只支持以下参数：

| 接口                           | 说明                      |
| ---------------------------- | ----------------------- |
| setConnectionTimeoutInMillis | 建立连接的超时时间（单位：毫秒）        |
| setSocketTimeoutInMillis     | 通过打开的连接传输数据的超时时间（单位：毫秒） |

# 错误信息格式

若请求错误，服务器将返回的JSON文本包含以下参数：

* **error_code：**错误码；关于错误码的详细信息请参考**通用错误码**和**业务相关错误码**。
* **error_msg：**错误描述信息，帮助理解和解决发生的错误。

**SDK本地检测参数返回的错误码**：

| error_code | error_msg                        | 备注          |
| ---------- | -------------------------------- | ----------- |
| SDK100     | image size error                 | 图片大小超限      |
| SDK101     | image length error               | 图片边长不符合要求   |
| SDK102     | read image file error            | 读取图片文件错误    |
| SDK108     | connection or read data time out | 连接超时或读取数据超时 |
| SDK109     | unsupported image format         | 不支持的图片格式    |

**服务端返回的错误码**

| 错误码    | 错误信息                     | 描述          |
| ------ | ------------------------ | ----------- |
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
| 216402 | face not found           | 没有找到人脸      |
| 216500 | unknown error            | 未知错误        |
| 282000 | logic internal error     | 业务逻辑层内部错误   |
| 282001 | logic backend error      | 业务逻辑层后端服务错误 |
| 282002 | input encoding error    	           | 请求参数编码错误 |
| 282100 | image transcode error                   | 图片压缩转码错误       |
| 282202 | antiporn detect timeout  | 检测超时        |
| 282203 | image frame size error   | gif单帧大小超限   |
| 282204 | image frames limit error | gif总帧数超限    |
| 282205 | image fromat must gif    | 图片格式错误      |

# 黄反识别

图片参数仅支持图片文件内容。

```php
// 引入黄反识别 SDK
require_once 'AipAntiPorn.php';

// 定义常量
const APP_ID = '你的 App ID'
const API_KEY = '你的 API Key';
const SECRET_KEY = '你的 Secret Key';

// 初始化AipAntiPorn
$aipAntiPorn = new AipAntiPorn(APP_ID, API_KEY, SECRET_KEY);

// 调用黄反识别接口
$result = $aipAntiPorn->detect(file_get_contents('antiporn.jpg'));
```

**黄反识别 请求参数详情**

| 参数    | 类型     | 描述            | 是否必须 |
| :---- | :----- | :------------ | :--- |
| image | String | 图片参数仅支持图片文件内容 | 是    |

**黄反识别 返回数据参数详情**

| 参数           | 类型       | 描述                          |
| :----------- | :------- | :-------------------------- |
| log_id       | uint64   | 请求标识码，随机数，唯一                |
| result_num   | Int      | 返回结果数目，即：result数组中元素个数      |
| result       | object[] | 结果数组，每项内容对应一个分类维度的结果        |
| +class_name  | String   | 分类结果名称，示例：色情                |
| +probability | double   | 分类结果置信度，示例：0.89471650123596 |

# GIF色情图像识别

图片接受类型支持本地图片路径字符串，图片文件二进制数组，此接口只支持gif识别，若非gif接口，请使用[黄反识别](#黄反识别)接口。接口会对图片中每一帧进行识别，并返回所有检测结果中色情值最大的为结果。

```php
// 引入黄反识别 SDK
require_once 'AipAntiPorn.php';

// 定义常量
const APP_ID = '你的 App ID'
const API_KEY = '你的 API Key';
const SECRET_KEY = '你的 Secret Key';

// 初始化AipAntiPorn
$aipAntiPorn = new AipAntiPorn(APP_ID, API_KEY, SECRET_KEY);

// 调用黄反识别接口 必须是gif格式。
$result = $aipAntiPorn->detectGif(file_get_contents('antiporn.gif'));
```

**GIF色情图像识别 请求参数详情**

| 参数    | 类型     | 描述                        | 是否必须 |
| :---- | :----- | :------------------------ | :--- |
| image | String | 图像数据，支持本地图像文件路径，图像文件二进制数组 | 是    |

**GIF色情图像识别 访问限制**


| 检查项           | 限制条件  |
| ------------- | ----- |
| 图片格式          | gif   |
| 每帧base64编码后大小 | < 4M  |
| 帧数            | 不超过50 |
| 图片base64编码后大小 | < 20M |

**GIF色情图像识别 返回数据参数详情**

| 参数               | 类型            | 描述                          |
| :--------------- | :------------ | :-------------------------- |
| log_id           | uint64        | 请求标识码，随机数，唯一                |
| frame_count      | uint64        | gif总帧数                      |
| porn_probability | double        | 色情识别置信度                     |
| result_num       | Int           | 返回结果数目，即：result数组中元素个数      |
| result           | Array[Object] | 结果数组，每项内容对应一个分类维度的结果        |
| +class_name      | String        | 分类结果名称，示例：色情                |
| +probability     | double        | 分类结果置信度，示例：0.89471650123596 |

**返回示例**
```json
{
    "log_id": 1744190292,
    "frame_count": 9,
    "porn_probability":0.41608
    "result_num": 3,
    "result": [
        {
            "class_name": "色情",
            "probability": 0.41608
        },
        {
            "class_name": "性感",
            "probability": 0.249851
        },
        {
            "class_name": "正常",
            "probability": 0.334069
        }
    ]
}
```
