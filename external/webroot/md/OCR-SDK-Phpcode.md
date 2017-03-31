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

1.在[官方网站](/sdk)下载PHP SDK压缩工具包。

2.将下载的`aip-ocr-php-sdk-version.zip`解压后，复制AipOrc.php以及lib/*到工程文件夹中。

3.引入AipOcr.php


# 快速入门

## 初始化一个AipOcr对象

AipOcr类是Optical Character Recognition的PHP SDK客户端，为使用Optical Character Recognition的开发人员提供了一系列的交互方法。

用户可以参考如下代码初始化一个AipOcr对象：

```php
// 引入文字识别OCR SDK
require_once 'AipOcr.php';

// 定义常量
const APP_ID = '你的 App ID'
const API_KEY = '你的 API Key';
const SECRET_KEY = '你的 Secret Key';

// 初始化ApiOcr对象
$aipOcr = new AipOcr(APP_ID, API_KEY, SECRET_KEY);
```

在上面代码中，常量`APP_ID`在百度云控制台中创建，常量`API_KEY`与`SECRET_KEY`是在创建完毕应用后，系统分配给用户的，均为字符串，用于标识用户，为访问做签名验证，可在AI服务控制台中的**应用列表**中查看。  

**注：**如您以前是百度云的老用户，其中`API_KEY`对应百度云的“Access Key ID”，`SECRET_KEY`对应百度云的“Access Key Secret”。


# 通用文字识别

通用文字识别可以接受任意图片，并识别出图片中的文字。

图片参数仅支持图片文件内容。

举例，要对一张图片进行文字识别：

```php
// 引入文字识别OCR SDK
require_once 'AipOcr.php';

// 定义常量
const APP_ID = '你的 App ID'
const API_KEY = '你的 API Key';
const SECRET_KEY = '你的 Secret Key';

// 初始化ApiOcr
$apiOcr = new AipOcr(APP_ID, API_KEY, SECRET_KEY);

// 调用通用文字识别接口
$result = $apiOcr->general(file_get_contents('general.jpg'));
```
传入图片时还想增加一些自定义参数配置：

```php
// 引入文字识别OCR SDK
require_once 'AipOcr.php';

// 定义常量
const APP_ID = '你的 App ID'
const API_KEY = '你的 API Key';
const SECRET_KEY = '你的 Secret Key';

// 初始化ApiOcr
$apiOcr = new AipOcr(APP_ID, API_KEY, SECRET_KEY);

// 定义参数变量
$option = array('detect_direction' => false, 'language_type' => "CHN_ENG");

// 调用通用文字识别接口
$result = $apiOcr->general(file_get_contents('general.jpg'), $option);
```

**通用文字识别 请求参数详情**

<table>
<tr><th>参数</th><th>是否必选</th><th>类型</th><th>可选值范围</th><th>说明</th></tr>
<tr><td>image</td><td>true</td><td>string</td><td>-</td><td>图像数据，base64编码</td></tr>
<tr><td>recognize_granularity</td><td>false</td><td>string</td><td>big、small</td><td>是否定位单字符位置，big：不定位单字符位置，默认值；small：定位单字符位置 </td></tr>
<tr><td>mask</td><td>false</td><td>string</td><td>-</td><td>表示mask区域的黑白灰度图片，白色代表选中, base64编码</td></tr>
<tr><td>language_type</td><td>false</td><td>string</td><td>CHN_ENG、ENG、POR、FRE、GER、ITA、SPA、RUS、JAP</td><td>识别语言类型，默认为CHN_ENG。可选值包括：<ul><li>CHN_ENG：中英文混合；</li><li>ENG：英文；</li><li>POR：葡萄牙语；</li><li>FRE：法语；</li><li>GER：德语；</li><li>ITA：意大利语；</li><li>SPA：西班牙语；</li><li>RUS：俄语；</li><li>JAP：日语</li></ul></td></tr>
<tr><td>detect_direction</td><td>false</td><td>boolean</td><td>true、false</td><td>是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<ul><li>true：检测朝向；</li><li>false：不检测朝向。</li></ul></td></tr>
<tr><td>detect_language</td><td>FALSE</td><td>string</td><td>true、false</td><td>是否检测语言，默认不检测。当前支持（中文、英语、日语、韩语）</td></tr>
<tr><td>classify_dimension</td><td>FALSE</td><td>string</td><td>lottery</td><td>分类维度（根据OCR结果进行分类），逗号分隔，当前只支持lottery。<br/>lottery：彩票分类，设置detect_direction有助于提升精度</td></tr>
<tr><td>vertexes_location</td><td>FALSE</td><td>string</td><td>true、false</td><td>是否返回文字外接多边形顶点位置，不支持单字位置。默认为false</td></tr>
</table>

**通用文字识别 返回数据参数详情**

<table>
<tr><th>字段</th><th>必选</th><th>类型</th><th>说明</th></tr>
<tr><td>direction</td><td>否</td><td>int32</td><td>图像方向，当detect_direction=true时存在。<ul><li>-1:未定义，</li><li>0:正向，</li><li>1: 逆时针90度，</li><li>2:逆时针180度，</li><li>3:逆时针270度</li></ul></td></tr>
<tr><td>log_id</td><td>是</td><td>uint64</td><td>唯一的log id，用于问题定位</td></tr>
<tr><td>words_result</td><td>是</td><td>array()</td><td>定位和识别结果数组</td></tr>
<tr><td>words_result_num</td><td>是</td><td>uint32</td><td>识别结果数，表示words_result的元素个数</td></tr>

<tr><td>+vertexes_location</td><td>否</td><td>array()</td><td>当前为四个顶点: 左上，右上，右下，左下。当vertexes_location=true时存在</td></tr>
<tr><td>++x</td><td>是</td><td>uint32</td><td>水平坐标（坐标0点为左上角）</td></tr>
<tr><td>++y</td><td>是</td><td>uint32</td><td>垂直坐标（坐标0点为左上角）</td></tr>
<tr><td>+location</td><td>是</td><td>array()</td><td>位置数组（坐标0点为左上角）</td></tr>
<tr><td>++left</td><td>是</td><td>uint32</td><td>表示定位位置的长方形左上顶点的水平坐标</td></tr>
<tr><td>++top</td><td>是</td><td>uint32</td><td>表示定位位置的长方形左上顶点的垂直坐标</td></tr>
<tr><td>++width</td><td>是</td><td>uint32</td><td>表示定位位置的长方形的宽度</td></tr>
<tr><td>++height</td><td>是</td><td>uint32</td><td>表示定位位置的长方形的高度</td></tr>
<tr><td>+words</td><td>否</td><td>string</td><td>识别结果字符串</td></tr>
<tr><td>+chars</td><td>否</td><td>array()</td><td>单字符结果，recognize_granularity=small时存在</td></tr>
<tr><td>++location</td><td>是</td><td>array()</td><td>位置数组（坐标0点为左上角）</td></tr>
<tr><td>+++left</td><td>是</td><td>uint32</td><td>表示定位位置的长方形左上顶点的水平坐标</td></tr>
<tr><td>+++top</td><td>是</td><td>uint32</td><td>表示定位位置的长方形左上顶点的垂直坐标</td></tr>
<tr><td>+++width</td><td>是</td><td>uint32</td><td>表示定位定位位置的长方形的宽度</td></tr>
<tr><td>+++height</td><td>是</td><td>uint32</td><td>表示位置的长方形的高度</td></tr>
<tr><td>++char</td><td>是</td><td>string</td><td>单字符识别结果</td></tr>
</table>

# 银行卡识别

银行卡文字识别需要接受银行卡正面带数字的清晰图片，能识别出对应的银行卡号。

图片参数仅支持图片文件内容。

举例，要对一张银行卡进行文字识别：

```php
// 引入文字识别OCR SDK
require_once 'AipOcr.php';

// 定义常量
const APP_ID = '你的 App ID'
const API_KEY = '你的 API Key';
const SECRET_KEY = '你的 Secret Key';

// 初始化ApiOcr
$apiOcr = new AipOcr(APP_ID, API_KEY, SECRET_KEY);

// 调用银行卡识别接口
$result = $apiOcr->bankcard(file_get_contents('bankcard.jpg'));
```

**银行卡识别 请求参数详情**

| 参数    | 类型     | 描述            | 是否必须 |
| :---- | :----- | :------------ | :--- |
| image | String | 图像数据，仅支持图像文件流 | 是    |

**银行卡识别 返回数据参数详情**

| 参数                 | 类型     | 描述               |
| :----------------- | :----- | :--------------- |
| log_id             | Uint64 | 唯一的log id，用于问题定位 |
| result             | Object | 定位和识别结果数组        |
| \+bank_card_number | String | 银行卡识别结果          |


# 身份证识别

身份证识别一次只能接受身份证正面或反面的清晰图片，能识别出证件上的文字。

图片参数仅支持图片文件内容。

举例，要对一张身份证进行文字识别，可以仅传入图片信息和注明正面/反面：
返回的result记录了信息，
正面支持：住址、公民身份号码、出生、姓名、性别、民族，
背面支持：签发日期、失效日期

```php
// 引入文字识别OCR SDK
require_once 'AipOcr.php';

// 定义常量
const APP_ID = '你的 App ID'
const API_KEY = '你的 API Key';
const SECRET_KEY = '你的 Secret Key';

// 初始化ApiOcr
$apiOcr = new AipOcr(APP_ID, API_KEY, SECRET_KEY);

// 设置识别身份证正面参数
$isFront = false;

// 调用身份证识别接口
$result = $apiOcr->idcard(file_get_contents('idcard.jpg'), $isFront);
```
传入图片时还想增加一些自定义参数配置：

```php
// 引入文字识别OCR SDK
require_once 'AipOcr.php';

// 定义常量
const APP_ID = '你的 App ID'
const API_KEY = '你的 API Key';
const SECRET_KEY = '你的 Secret Key';

// 初始化ApiOcr
$apiOcr = new AipOcr(APP_ID, API_KEY, SECRET_KEY);

// 设置识别身份证正面参数
$isFront = false;

// 定义参数变量
$options = array('detectDirection' => false, 'accuracy' => 'high');

// 调用身份证识别接口
$result = $apiOcr->idcard(file_get_contents('idcard.jpg'), $isFront, $options);
```

**身份证识别 请求参数详情**

| 参数               | 类型      | 描述                                       | 是否必须 |
| :--------------- | :------ | :--------------------------------------- | :--- |
| detect_direction | Boolean | 检测图像朝向(指输入图像是正常方向、逆时针旋转90/180/270度)，有效值：true、false，默认值: false。 | 否    |
| id_card_side     | String  | front：身份证正面，back：身份证背面                   | 是    |
| image            | String  | 图像数据，仅支持图像文件流                            | 是    |

**身份证识别 返回数据参数详情**

| 参数               | 类型     | 描述                                       |
| :--------------- | :----- | :--------------------------------------- |
| direction        | Int32  | 图像方向，当detect_direction=true时存在。-1:未定义，0:正向，1: 逆时针90度， 2:逆时针180度， 3:逆时针270度 |
| log_id           | Uint64 | 唯一的log id，用于问题定位                         |
| words_result     | Array  | 定位和识别结果数组，数组元素的key是身份证的主体字段（正面支持：住址、公民身份号码、出生、姓名、性别、民族，背面支持：签发日期、失效日期）。只返回识别出的字段。 |
| words_result_num | Uint32 | 识别结果数，表示words_result的元素个数                |
| \+location       | Array  | 位置数组（坐标0点为左上角）                           |
| \+\+left         | Uint32 | 表示定位位置的长方形左上顶点的水平坐标                      |
| \+\+top          | Uint32 | 表示定位位置的长方形左上顶点的垂直坐标                      |
| \+\+width        | Uint32 | 表示定位位置的长方形的宽度                            |
| \+\+height       | Uint32 | 表示定位位置的长方形的高度                            |
| \+words          | String | 识别结果字符串                                  |
