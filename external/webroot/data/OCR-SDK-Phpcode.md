#PHP SDK文档

本文档主要介绍OCR PHP SDK的安装和使用。在使用本文档前，您需要先了解Optical Character Recognition(OCR)的基础知识，并已经开通了OCR服务。

# 安装OCR PHP SDK

**OCR PHP SDK目录结构**

    ocr
           ├── AipOcr                          //Ocr识别类
           ├── lib
           │      ├── AipHttpClient.php        //内部http请求类
           │      ├── AipBCEUtil.php           //内部工具类
           │      ├── AipBase                  //Aip基类
           └── demo     
                  ├── DemoAipOcr.php           //OCR服务示例
                  ├── idcard.jpg               //身份证图片示例
                  ├── bankcard.jpg             //银行卡图片示例
                  └── general.png              //文字图片示例

**使用SDK**

步骤如下：

1.在[官方网站](https://ai.baidu.com/sdk)下载PHP SDK压缩工具包。

2.将下载的`ocr.zip`解压后，复制AipOrc.php以及lib/*到工程文件夹中。

3.引入AipOcr.php


# 快速入门

AipOcr类是与Optical Character Recognition(OCR)交互的客户端，所有OCR操作都是通过AipOcr完成的。

## 初始化AipOcr

AipOcr类是Optical Character Recognition的PHP SDK客户端，为使用Optical Character Recognition的开发人员提供了一系列的交互方法。

用户可以参考如下代码新建一个AipOcr对象：

```php
// 引入文字识别OCR SDK
require_once 'AipOcr.php';

// 定义常量
const APP_ID = '000212'
const API_KEY = '020947f506934fe5b39763080359f0f8';
const API_SECRET = '9cb5e2bf0e7045d78d7b27f62337f4cc';

// 初始化ApiOcr对象
$aipOcr = new AipOcr(APP_ID, API_KEY, API_SECRET);
```

在上面代码中，常量`APP_ID`在百度云控制台中创建，常量`API_KEY`与`API_SECRET`是由系统分配给用户的，均为字符串，用于标识用户，为访问OCR做签名验证。其中`API_KEY`对应控制台中的“Access Key ID”，`SECRET_ACCESS_KEY`对应控制台中的“Access Key Secret”，获取方式请参考[获取AK/SK](../Reference/GetAKSK)。


# 通用文字识别

通用文字识别可以接受任意图片，并识别出图片中的文字以及全部文字串。

图片参数仅支持图片文件内容。

举例，要对一张图片进行文字识别：

```php
// 引入文字识别OCR SDK
require_once 'AipOcr.php';

// 定义常量
const APP_ID = '000212'
const API_KEY = '020947f506934fe5b39763080359f0f8';
const API_SECRET = '9cb5e2bf0e7045d78d7b27f62337f4cc';

// 初始化ApiOcr
$client = new AipOcr(APP_ID, ACCESS_KEY_ID, SECRET_ACCESS_KEY);

// 调用通用文字识别接口
$response = $client->general(file_get_contents('general.jpg'));
```
传入图片时还想增加一些自定义参数配置：

```php
// 引入文字识别OCR SDK
require_once 'AipOcr.php';

// 定义常量
const APP_ID = '000212'
const API_KEY = '020947f506934fe5b39763080359f0f8';
const API_SECRET = '9cb5e2bf0e7045d78d7b27f62337f4cc';

// 初始化ApiOcr
$client = new AipOcr(APP_ID, ACCESS_KEY_ID, SECRET_ACCESS_KEY);

// 定义参数变量
$option = array('detect_direction' => false, 'language_type' => "CHN_ENG");

// 调用通用文字识别接口
$response = $client->general(file_get_contents('general.jpg'), $option);
```

**通用文字识别 请求参数详情**

| 参数 | 类型 | 描述 | 是否必须 |
| :---- | :---- | :---- | :---- |
|detect_direction|Boolean|检测图像朝向(指输入图像是正常方向、逆时针旋转90/180/270度)，有效值：true、false，默认值: false。|否|
|image|String|图像数据，仅支持图像文件流|是|
|language_type|String|识别语言类型(CHN_ENG、ENG、POR、FRE、GER、ITA、SPA、RUS、JAP)，默认为CHN_ENG|否|
|mask|String|表示mask区域的黑白灰度图片，白色代表选中, base64编码|否|
|recognize_granularity|String|是否定位单字符位置，big：不定位单字符位置，默认值；small：定位单字符位置|否|
|detect_language|String|是否检测语言，默认不检测。当前支持（中文、英语、日语、韩语）|否|
|classify_dimension|String|分类维度（根据OCR结果进行分类），逗号分隔，当前只支持lottery。
lottery：彩票分类，设置detect_direction有助于提升精度|否|

**通用文字识别 返回数据参数详情**

| 参数 | 类型 | 描述 |
| :---- | :---- | :---- |
|direction|Int32|图像方向，当detect_direction=true时存在。-1:未定义，0:正向，1: 逆时针90度， 2:逆时针180度， 3:逆时针270度|
|log_id|Unit64|唯一的log id，用于问题定位|
|words_result|Array|定位和识别结果数组|
|words_result_num|Unit32|识别结果数，表示words_result的元素个数|
|\+location|Array|位置数组（坐标0点为左上角）|
|\+\+left|Unit32|表示定位位置的长方形左上顶点的水平坐标|
|\+\+top|Unit32|表示定位位置的长方形左上顶点的垂直坐标|
|\+\+width|Unit32|表示定位位置的长方形的宽度|
|\+\+height|Unit32|表示定位位置的长方形的高度|
|\+words|String|识别结果字符串|
|\+chars|Array|当单字符结果，recognize_granularity=small时存在|
|\+\+left|Unit32|表示定位位置的长方形左上顶点的水平坐标|
|\+\+top|Unit32|表示定位位置的长方形左上顶点的垂直坐标|
|\+\+width|Unit32|表示定位位置的长方形的宽度|
|\+\+height|Unit32|表示定位位置的长方形的高度|

# 银行卡文字识别

银行卡文字识别需要接受银行卡正面带数字的清晰图片，能识别出对应的银行卡号。

图片参数仅支持图片文件内容。

举例，要对一张银行卡进行文字识别：

```php
// 引入文字识别OCR SDK
require_once 'AipOcr.php';

// 定义常量
const APP_ID = '000212'
const API_KEY = '020947f506934fe5b39763080359f0f8';
const API_SECRET = '9cb5e2bf0e7045d78d7b27f62337f4cc';

// 初始化ApiOcr
$client = new AipOcr(APP_ID, ACCESS_KEY_ID, SECRET_ACCESS_KEY);

// 调用银行卡识别接口
$response = $client->bankcard(file_get_contents('bankCard.jpg'));
```
**身份证文字识别 请求参数详情**

| 参数 | 类型 | 描述 | 是否必须 |
| :---- | :---- | :---- | :---- |
|accuracy|String|精准度，精度越高，速度越慢。default：auto|否|
|detect_direction|Boolean|检测图像朝向(指输入图像是正常方向、逆时针旋转90/180/270度)，有效值：true、false，默认值: false。|否|
|id_card_side|String|front：身份证正面，back：身份证背面|是|
|image|String|图像数据，仅支持图像文件流|是|

**身份证文字识别 返回数据参数详情**

| 参数 | 类型 | 描述 |
| :---- | :---- | :---- |
|direction|Int32|图像方向，当detect_direction=true时存在。-1:未定义，0:正向，1: 逆时针90度， 2:逆时针180度， 3:逆时针270度|
|log_id|Unit64|唯一的log id，用于问题定位|
|words_result|Array|定位和识别结果数组，数组元素的key是身份证的主体字段（正面支持：住址、公民身份号码、出生、姓名、性别、民族，背面支持：签发日期、失效日期）。只返回识别出的字段。|
|words_result_num|Unit32|识别结果数，表示words_result的元素个数|
|\+location|Array|位置数组（坐标0点为左上角）|
|\+\+left|Unit32|表示定位位置的长方形左上顶点的水平坐标|
|\+\+top|Unit32|表示定位位置的长方形左上顶点的垂直坐标|
|\+\+width|Unit32|表示定位位置的长方形的宽度|
|\+\+height|Unit32|表示定位位置的长方形的高度|
|\+words|String|识别结果字符串|

# 身份证文字识别

身份证文字识别一次只能接受身份证正面或反面的清晰图片，能识别出证件上的文字。

图片参数仅支持图片文件内容。

举例，要对一张身份证进行文字识别，可以仅传入图片信息和注明正面/反面：
返回的result记录了信息，
正面支持：住址、公民身份号码、出生、姓名、性别、民族，
背面支持：签发日期、失效日期

```php
// 引入文字识别OCR SDK
require_once 'AipOcr.php';

// 定义常量
const APP_ID = '000212'
const API_KEY = '020947f506934fe5b39763080359f0f8';
const API_SECRET = '9cb5e2bf0e7045d78d7b27f62337f4cc';

// 初始化ApiOcr
$client = new AipOcr(APP_ID, ACCESS_KEY_ID, SECRET_ACCESS_KEY);

// 设置识别身份证正面参数
$isFront = false;

// 调用身份证识别接口
$response = $client->idcard(file_get_contents('idcard.jpg'), $isFront);
```
传入图片时还想增加一些自定义参数配置：

```php
// 引入文字识别OCR SDK
require_once 'AipOcr.php';

// 定义常量
const APP_ID = '000212'
const API_KEY = '020947f506934fe5b39763080359f0f8';
const API_SECRET = '9cb5e2bf0e7045d78d7b27f62337f4cc';

// 初始化ApiOcr
$client = new AipOcr(APP_ID, ACCESS_KEY_ID, SECRET_ACCESS_KEY);

// 设置识别身份证正面参数
$isFront = false;

// 定义参数变量
$options = array('detectDirection' => false, 'accuracy' => 'high');

// 调用身份证识别接口
$response = $client->idcard(file_get_contents('idcard.jpg'), $isFront, $options);
```

**银行卡文字识别 请求参数详情**

| 参数 | 类型 | 描述 | 是否必须 |
| :---- | :---- | :---- | :---- |
|image|String|图像数据，仅支持图像文件流|是|

**银行卡文字识别 返回数据参数详情**

| 参数 | 类型 | 描述 |
| :---- | :---- | :---- |
|log_id|Unit64|唯一的log id，用于问题定位|
|result|Object|定位和识别结果数组|
|\+bank_card_number|String|银行卡识别结果|

# 版本更新说明

##

* 第一版



