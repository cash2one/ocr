;#PHP SDK文档

本文档主要介绍图片智能色情识别服务。在使用本文档前，您需要先了解图片智能色情识别服务。

# 安装图片智能色情识别 PHP SDK

**图片智能色情识别 PHP SDK目录结构**

    AipAntiPorn
           ├── AipAntiPorn.php                 //AntiPorn识别类
           ├── lib
           │      ├── AipHttpClient.php        //内部http请求类
           │      ├── AipBCEUtil.php           //内部工具类
           │      ├── AipBase                  //Aip基类
           └── demo     
                  ├── DemoAipAntiPorn.php      //AntiPorn服务示例
                  └── antiporn.jpg             //色情图片

**使用SDK**

步骤如下：

1.在[官方网站](https://aip.baidu.com/doc/Developer/index.html)下载PHP SDK压缩工具包。

2.将下载的`aip-antiporn-php-sdk-version.zip`解压后，复制AipAntiPorn.php以及lib/*到工程文件夹中。

3.引入AipAntiPorn.php

# 快速入门

图片智能色情识别服务，依托百度业界领先的图像识别算法，基于大数据深度学习技术，提供一般色情识别和卡通色情识别，以及母婴类图片识别服务。

1.初始化一个AipAntiPorn对象。

# AipAntiPorn

## 新建AipAntiPorn对象

用户可以参考如下代码新建一个AipAntiPorn对象：

```php
// 引入AntiPorn SDK
require_once 'AipAntiPorn.php';

// 定义常量
const APP_ID = '000212'
const API_KEY = '020947f506934fe5b39763080359f0f8';
const API_SECRET = '9cb5e2bf0e7045d78d7b27f62337f4cc';

// 初始化AipAntiPorn对象
$AipAntiPorn = new AipAntiPorn(APP_ID, API_KEY, API_SECRET);
```

在上面代码中，常量`APP_ID`在百度云控制台中创建，常量`API_KEY`与`API_SECRET`是由系统分配给用户的，均为字符串，用于标识用户，为访问BFR做签名验证。其中`API_KEY`对应控制台中的“Access Key ID”，`SECRET_ACCESS_KEY`对应控制台中的“Access Key Secret”，获取方式请参考[获取AK/SK](../Reference/GetAKSK)。


# 图片智能色情识别

图片参数仅支持图片文件内容。

```php
// 引入文字识别BFR SDK
require_once 'AipAntiPorn.php';

// 定义常量
const APP_ID = '000212'
const API_KEY = '020947f506934fe5b39763080359f0f8';
const API_SECRET = '9cb5e2bf0e7045d78d7b27f62337f4cc';

// 初始化ApiBFR
$client = new AipAntiPorn(APP_ID, ACCESS_KEY_ID, SECRET_ACCESS_KEY);

// 调用通用文字识别接口
$response = $client->antiporn(file_get_contents('antiporn.jpg'));
```

*色情识别 请求参数详情**

| 参数 | 类型 | 描述 | 是否必须 |
| :---- | :---- | :---- | :---- |
|image|String|图片参数仅支持图片文件内容|是|

**色情识别 返回数据参数详情**

| 参数 | 类型 | 描述 |
| :---- | :---- | :---- |
|log_id|uint64|日志id|
|result_num|Int|人脸数目|
|result|object[]|人脸属性对象的集合|
|+class_name|String|分类结果名称，示例：一般色情|
|+probability|double|分类结果置信度，示例：0.89471650123596|

# 版本更新说明

##

* 第一版



