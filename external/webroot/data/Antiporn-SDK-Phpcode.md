#PHP SDK文档

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

**使用SDK**

步骤如下：

1.在[官方网站](/sdk)下载PHP SDK压缩工具包。

2.将下载的`aip-antiporn-php-sdk-version.zip`解压后，复制AipAntiPorn.php以及lib/*到工程文件夹中。

3.引入AipAntiPorn.php

# 快速入门

黄反识别服务，依托百度业界领先的图像识别算法，基于大数据深度学习技术，提供图片一般色情、性感、正常三个类别的识别服务。

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

**注：**如您以前是百度云的老用户，其中`API_KEY`对应百度云的“Access Key ID”，`SECRET_KEY`对应百度云的“Access Key Secret”。


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

