# Java SDK文档

本文档主要介绍OCR Java SDK的安装和使用。在使用本文档前，您需要先了解Optical Character Recognition(OCR)的基础知识，并已经开通了OCR服务。

# 安装OCR Java SDK

**OCR Java SDK目录结构**

    com.baidu.aip
           ├── auth                                //签名相关类
           ├── http                                //Http通信相关类
           ├── client                              //公用类
           ├── exception                           //exception类
           ├── ocr
           │       └── AipOcr                      //AipOcr类
           └── util                                //工具类

**支持 JAVA版本：1.7+**

**直接使用JAR包步骤如下：**

1.在[官方网站](http://ai.baidu.com/sdk)下载Java SDK压缩工具包。

2.将下载的`aip-java-sdk-version.zip`解压后，复制到工程文件夹中。

3.在Eclipse右键“工程 -> Properties -> Java Build Path -> Add JARs”。

4.添加SDK工具包`ocr_sdk-version.jar`和第三方依赖工具包`third-party/*.jar`。

其中，`version`为版本号，添加完成后，用户就可以在工程中使用OCR Java SDK。


# 快速入门

AipOcrClient是与Optical Character Recognition(OCR)交互的客户端，所有OCR操作都是通过AipOcrClient完成的。您可以参考**新建AipOcrClient**，完成初始化客户端的操作。

## 新建AipOcrClient

OcrClient是Optical Character Recognition的Java客户端，为使用Optical Character Recognition的开发人员提供了一系列的交互方法。

用户可以参考如下代码新建一个OcrClient：

```java
public class Sample {
    //设置APPID/AK/SK
    public static final String APP_ID = "你的 App ID";
    public static final String API_KEY = "你的 Api ID";
    public static final String SECRET_KEY = "你的 Secret Key";

    public static void main(String[] args) {
        // 初始化一个OcrClient
        AipOcr client = new AipOcr(APP_ID, API_KEY, SECRET_KEY);

		// 可选：设置网络连接参数
        client.setConnectionTimeoutInMillis(2000);
        client.setSocketTimeoutInMillis(60000);

        // 调用身份证识别接口
        String idFilePath = "test.jpg";
        JSONObject idcardRes = client.idcard(idFilePath, true);
        System.out.println(idcardRes.toString(2));

        // 调用银行卡识别接口
        String bankFilePath = "test_bank.jpg";
        JSONObject bankRes = client.bankcard(bankFilePath);
        System.out.println(bankRes.toString(2));

        // 调用通用识别接口
        String genFilePath = "test_basic_general.jpg";
        JSONObject genRes = client.basicGeneral(genFilePath, new HashMap<String, String>());
        System.out.println(genRes.toString(2));

		// 调用通用识别（含位置信息）接口
		String genFilePath = "test_general.jpg";
        JSONObject genRes = client.general(genFilePath, new HashMap<String, String>());
        System.out.println(genRes.toString(2));
    }
}
```
在上面代码中，常量`APP_ID`在百度云控制台中创建，常量`API_KEY`与`SECRET_KEY`是在创建完毕应用后，系统分配给用户的，均为字符串，用于标识用户，为访问做签名验证，可在AI服务控制台中的**应用列表**中查看。  

**注意：**如您以前是百度云的老用户，其中`API_KEY`对应百度云的“Access Key ID”，`SECRET_KEY`对应百度云的“Access Key Secret”。

## 配置AipOcrClient

如果用户需要配置AipOcrClient的一些细节参数，可以在构造AipOcr之后调用接口设置参数，目前只支持以下参数：

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

| 错误码    | 错误信息                         | 描述            |
| ------ | ---------------------------- | ------------- |
| 216015 | module closed                | 模块关闭          |
| 216100 | invalid param                | 非法参数          |
| 216101 | not enough param             | 参数数量不够        |
| 216102 | service not support          | 业务不支持         |
| 216103 | param too long               | 参数太长          |
| 216110 | appid not exist              | APP ID不存在     |
| 216111 | invalid userid               | 非法用户ID        |
| 216200 | empty image                  | 空的图片          |
| 216201 | image format error           | 图片格式错误        |
| 216202 | image size error             | 图片大小错误        |
| 216300 | db error                     | DB错误          |
| 216400 | backend error                | 后端系统错误        |
| 216401 | internal error               | 内部错误          |
| 216500 | unknown error                | 未知错误          |
| 216600 | id number format error       | 身份证的ID格式错误    |
| 216601 | id number and name not match | 身份证的ID和名字不匹配  |
| 216630 | recognize error              | 识别错误          |
| 216631 | recognize bank card error    | 识别银行卡错误       |
| 216632 | ocr                          | unknown error |
| 216633 | recognize idcard error       | 识别身份证错误       |
| 216634 | detect error                 | 检测错误          |
| 216635 | get mask error               | 获取mask图片错误    |
| 282000 | logic internal error    	| 业务逻辑层内部错误 |
| 282001 | logic backend error     	| 业务逻辑层后端服务错误 |
| 282002 | input encoding error    	           | 请求参数编码错误 |
| 282100 | image transcode error	| 图片压缩转码错误 		|

# 通用文字识别

通用文字识别可以接受任意图片，并识别出图片中的文字以及全部文字串。

图片接受参数类型：支持本地图片路径字符串，图片文件二进制数组。

举例，要对一张图片进行文字识别，具体的文字的内容和信息在返回的words_result字段中：

```java
public void generalRecognition(AipOcr client) {
    // 参数为本地图片路径
    String imagePath = "general.jpg";
    JSONObject response = client.basicGeneral(imagePath);
    System.out.println(response.toString());

    // 参数为本地图片文件二进制数组
    byte[] file = readImageFile(imagePath);
    JSONObject response = client.basicGeneral(file);
    System.out.println(response.toString());
}
```
传入图片时还想增加一些自定义参数配置：

```java
public void generalRecognition(AipOcr client) {
    // 自定义参数定义
    HashMap<String, String> options = new HashMap<String, String>();
    options.put("detect_direction", "false");
    options.put("language_type", "CHN_ENG");

    // 参数为本地图片路径
    String imagePath = "general.jpg";
    JSONObject response = client.basicGeneral(imagePath, options);
    System.out.println(response.toString());

    // 参数为本地图片文件二进制数组
    byte[] file = readImageFile(imagePath);
    JSONObject response = client.basicGeneral(file, options);
    System.out.println(response.toString());
}
```

**通用文字识别 请求参数详情**

| 参数                    | 是否必选  | 类型      | 可选值范围                                   | 说明                                       |
| --------------------- | ----- | ------- | --------------------------------------- | ---------------------------------------- |
| image                 | true  | string  | -                                       | 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式 |
| mask                  | false | string  | -                                       | 表示mask区域的黑白灰度图片，白色代表选中, base64编码         |
| language_type         | false | string  | CHN_ENG、ENG、POR、FRE、GER、ITA、SPA、RUS、JAP | 识别语言类型，默认为CHN_ENG。可选值包括：<br/>- CHN_ENG：中英文混合；<br/>- ENG：英文；<br/>- POR：葡萄牙语；<br/>- FRE：法语；<br/>- GER：德语；<br/>- ITA：意大利语；<br/>- SPA：西班牙语；<br/>- RUS：俄语；<br/>- JAP：日语 |
| detect_direction      | false | boolean | true、false                              | 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br/>- true：检测朝向；<br/>- false：不检测朝向。 |
| detect_language       | FALSE | string  | true、false                              | 是否检测语言，默认不检测。当前支持（中文、英语、日语、韩语）           |
| classify_dimension    | FALSE | string  | lottery                                 | 分类维度（根据OCR结果进行分类），逗号分隔，当前只支持lottery。<br/>lottery：彩票分类，设置detect_direction有助于提升精度 |


**通用文字识别 返回数据参数详情**

| 字段                 | 必选   | 类型      | 说明                                       |
| ------------------ | ---- | ------- | ---------------------------------------- |
| direction          | 否    | int32   | 图像方向，当detect_direction=true时存在。<br/>- -1:未定义，<br/>- 0:正向，<br/>- 1: 逆时针90度，<br/>- 2:逆时针180度，<br/>- 3:逆时针270度 |
| log_id             | 是    | uint64  | 唯一的log id，用于问题定位                         |
| words_result_num   | 是    | uint32  | 识别结果数，表示words_result的元素个数                |
| words_result       | 是    | array() | 定位和识别结果数组                                |
| +words             | 否    | string  | 识别结果字符串                                  |



# 通用文字识别（含位置信息版）

通用文字识别（含位置信息版）可以接受任意图片，并识别出图片中的文字以及全部文字串，以及字符在图片中的位置信息。

图片接受参数类型：支持本地图片路径字符串，图片文件二进制数组。

举例，要对一张图片进行文字识别，具体的文字的内容和信息在返回的words_result字段中：

```java
public void generalRecognition(AipOcr client) {
    // 参数为本地图片路径
    String imagePath = "general.jpg";
    JSONObject response = client.general(imagePath);
    System.out.println(response.toString());

    // 参数为本地图片文件二进制数组
    byte[] file = readImageFile(imagePath);
    JSONObject response = client.general(file);
    System.out.println(response.toString());
}
```
传入图片时还想增加一些自定义参数配置：

```java
public void generalRecognition(AipOcr client) {
    // 自定义参数定义
    HashMap<String, String> options = new HashMap<String, String>();
    options.put("detect_direction", "false");
    options.put("language_type", "CHN_ENG");

    // 参数为本地图片路径
    String imagePath = "general.jpg";
    JSONObject response = client.general(imagePath, options);
    System.out.println(response.toString());

    // 参数为本地图片文件二进制数组
    byte[] file = readImageFile(imagePath);
    JSONObject response = client.general(file, options);
    System.out.println(response.toString());
}
```

**通用文字识别（含位置信息版） 请求参数详情**

| 参数                    | 是否必选  | 类型      | 可选值范围                                   | 说明                                       |
| --------------------- | ----- | ------- | --------------------------------------- | ---------------------------------------- |
| image                 | true  | string  | -                                       | 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式 |
| mask                  | false | string  | -                                       | 表示mask区域的黑白灰度图片，白色代表选中, base64编码         |
| language_type         | false | string  | CHN_ENG、ENG、POR、FRE、GER、ITA、SPA、RUS、JAP | 识别语言类型，默认为CHN_ENG。可选值包括：<br/>- CHN_ENG：中英文混合；<br/>- ENG：英文；<br/>- POR：葡萄牙语；<br/>- FRE：法语；<br/>- GER：德语；<br/>- ITA：意大利语；<br/>- SPA：西班牙语；<br/>- RUS：俄语；<br/>- JAP：日语 |
| detect_direction      | false | boolean | true、false                              | 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br/>- true：检测朝向；<br/>- false：不检测朝向。 |
| vertexes_location     | false | boolean | true、false                              | 是否在返回结果中标识文字位置|
| detect_language       | FALSE | string  | true、false                              | 是否检测语言，默认不检测。当前支持（中文、英语、日语、韩语）           |
| classify_dimension    | FALSE | string  | lottery                                 | 分类维度（根据OCR结果进行分类），逗号分隔，当前只支持lottery。<br/>lottery：彩票分类，设置detect_direction有助于提升精度 |


**通用文字识别（含位置信息版） 返回数据参数详情**

| 字段                 | 必选   | 类型      | 说明                                       |
| ------------------ | ---- | ------- | ---------------------------------------- |
| direction          | 否    | int32   | 图像方向，当detect_direction=true时存在。<br/>- -1:未定义，<br/>- 0:正向，<br/>- 1: 逆时针90度，<br/>- 2:逆时针180度，<br/>- 3:逆时针270度 |
| log_id             | 是    | uint64  | 唯一的log id，用于问题定位                         |
| words_result       | 是    | array() | 定位和识别结果数组                                |
| words_result_num   | 是    | uint32  | 识别结果数，表示words_result的元素个数                |
| +vertexes_location | 否    | array() | 当前为四个顶点: 左上，右上，右下，左下。当vertexes_location=true时存在 |
| ++x                | 是    | uint32  | 水平坐标（坐标0点为左上角）                           |
| ++y                | 是    | uint32  | 垂直坐标（坐标0点为左上角）                           |
| +location          | 是    | array() | 位置数组（坐标0点为左上角）                           |
| ++left             | 是    | uint32  | 表示定位位置的长方形左上顶点的水平坐标                      |
| ++top              | 是    | uint32  | 表示定位位置的长方形左上顶点的垂直坐标                      |
| ++width            | 是    | uint32  | 表示定位位置的长方形的宽度                            |
| ++height           | 是    | uint32  | 表示定位位置的长方形的高度                            |
| +words             | 否    | string  | 识别结果字符串                                  |
| +chars             | 否    | array() | 单字符结果，recognize_granularity=small时存在     |
| ++location         | 是    | array() | 位置数组（坐标0点为左上角）                           |
| +++left            | 是    | uint32  | 表示定位位置的长方形左上顶点的水平坐标                      |
| +++top             | 是    | uint32  | 表示定位位置的长方形左上顶点的垂直坐标                      |
| +++width           | 是    | uint32  | 表示定位定位位置的长方形的宽度                          |
| +++height          | 是    | uint32  | 表示位置的长方形的高度                              |
| ++char             | 是    | string  | 单字符识别结果                                  |


# 通用文字识别（含生僻字版）

某些场景中，图片中的中文不光有常用字，还包含了生僻字，这时用户需要对该图进行文字识别，应使用通用文字识别（含生僻字版）。

图片接受参数类型：支持本地图片路径字符串，图片文件二进制数组。
举例，要对一张网络图片进行文字识别，具体的文字的内容和信息在返回的words_result字段中：

```java
public void enhancedGeneral(AipOcr client) {
    // 参数为本地图片路径
    String imagePath = "enhance_general.jpg";
    JSONObject response = client.enhancedGeneral(imagePath);
    System.out.println(response.toString());

    // 参数为本地图片文件二进制数组
    byte[] file = readImageFile(imagePath);
    JSONObject response = client.enhancedGeneral(file);
    System.out.println(response.toString());
}
```
传入图片时还想增加一些自定义参数配置：

```java
public void generalRecognition(AipOcr client) {
    // 自定义参数定义
    HashMap<String, String> options = new HashMap<String, String>();
    options.put("detect_direction", "false");
    options.put("language_type", "CHN_ENG");

    // 参数为本地图片路径
    String imagePath = "enhanced_general.jpg";
    JSONObject response = client.enhancedGeneral(imagePath, options);
    System.out.println(response.toString());

    // 参数为本地图片文件二进制数组
    byte[] file = readImageFile(imagePath);
    JSONObject response = client.enhancedGeneral(file, options);
    System.out.println(response.toString());
}
```

**通用文字识别（含生僻字版）请求参数详情**

| 参数                    | 是否必选  | 类型      | 可选值范围                                   | 说明                                       |
| --------------------- | ----- | ------- | --------------------------------------- | ---------------------------------------- |
| image                 | true  | string  | -                                       | 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式 |
| language_type         | false | string  | CHN_ENG、ENG、POR、FRE、GER、ITA、SPA、RUS、JAP | 识别语言类型，默认为CHN_ENG。可选值包括：<br/>- CHN_ENG：中英文混合；<br/>- ENG：英文；<br/>- POR：葡萄牙语；<br/>- FRE：法语；<br/>- GER：德语；<br/>- ITA：意大利语；<br/>- SPA：西班牙语；<br/>- RUS：俄语；<br/>- JAP：日语 |
| detect_direction      | false | boolean | true、false                              | 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br/>- true：检测朝向；<br/>- false：不检测朝向。 |

**通用文字识别（含生僻字版）  返回数据参数详情**

| 字段                 | 必选   | 类型      | 说明                                       |
| ------------------ | ---- | ------- | ---------------------------------------- |
| direction          | 否    | int32   | 图像方向，当detect_direction=true时存在。<br/>- -1:未定义，<br/>- 0:正向，<br/>- 1: 逆时针90度，<br/>- 2:逆时针180度，<br/>- 3:逆时针270度 |
| log_id             | 是    | uint64  | 唯一的log id，用于问题定位                         |
| words_result_num   | 是    | uint32  | 识别结果数，表示words_result的元素个数                |
| words_result       | 是    | array() | 定位和识别结果数组                                |
| +words             | 否    | string  | 识别结果字符串                                  |


# 网络图片文字识别


网络图片文字识别用于识别一些网络上背景复杂，特殊字体的文字。

图片接受参数类型：支持本地图片路径字符串，图片文件二进制数组。

举例，要对一张网络图片进行文字识别，具体的文字的内容和信息在返回的words_result字段中：

```java
public void webImageOCR(AipOcr client) {
    // 参数为本地图片路径
    String imagePath = "webimage.jpg";
    JSONObject response = client.webImage(imagePath);
    System.out.println(response.toString());

    // 参数为本地图片文件二进制数组
    byte[] file = readImageFile(imagePath);
    JSONObject response = client.webImage(file);
    System.out.println(response.toString());
}
```
传入图片时还想增加一些自定义参数配置：

```java
public void generalRecognition(AipOcr client) {
    // 自定义参数定义
    HashMap<String, String> options = new HashMap<String, String>();
    options.put("detect_direction", "false");
    options.put("language_type", "CHN_ENG");

    // 参数为本地图片路径
    String imagePath = "webimage.jpg";
    JSONObject response = client.general(imagePath, options);
    System.out.println(response.toString());

    // 参数为本地图片文件二进制数组
    byte[] file = readImageFile(imagePath);
    JSONObject response = client.general(file, options);
    System.out.println(response.toString());
}
```

**网络图片文字识别 请求参数详情**

| 参数                    | 是否必选  | 类型      | 可选值范围                                   | 说明                                       |
| --------------------- | ----- | ------- | --------------------------------------- | ---------------------------------------- |
| image                 | true  | string  | -                                       | 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式 |
| language_type         | false | string  | CHN_ENG、ENG、POR、FRE、GER、ITA、SPA、RUS、JAP | 识别语言类型，默认为CHN_ENG。可选值包括：<br/>- CHN_ENG：中英文混合；<br/>- ENG：英文；<br/>- POR：葡萄牙语；<br/>- FRE：法语；<br/>- GER：德语；<br/>- ITA：意大利语；<br/>- SPA：西班牙语；<br/>- RUS：俄语；<br/>- JAP：日语 |
| detect_direction      | false | boolean | true、false                              | 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br/>- true：检测朝向；<br/>- false：不检测朝向。 |
| detect_language       | FALSE | string  | true、false                              | 是否检测语言，默认不检测。当前支持（中文、英语、日语、韩语）           |


**网络图片文字识别  返回数据参数详情**

| 字段                 | 必选   | 类型      | 说明                                       |
| ------------------ | ---- | ------- | ---------------------------------------- |
| direction          | 否    | int32   | 图像方向，当detect_direction=true时存在。<br/>- -1:未定义，<br/>- 0:正向，<br/>- 1: 逆时针90度，<br/>- 2:逆时针180度，<br/>- 3:逆时针270度 |
| log_id             | 是    | uint64  | 唯一的log id，用于问题定位                         |
| words_result_num   | 是    | uint32  | 识别结果数，表示words_result的元素个数                |
| words_result       | 是    | array() | 定位和识别结果数组                                |
| +words             | 否    | string  | 识别结果字符串                                  |



# 银行卡识别

银行卡文字识别需要接受银行卡正面带数字的清晰图片，能识别出对应的银行卡号。

图片接受类型支持本地图片路径字符串，图片文件二进制数组。

举例，要对一张银行卡进行文字识别：

```java
public void bankcardRecognition(AipOcr client) {
    // 参数为本地图片路径
    String imagePath = "bankcard.jpg";
    JSONObject response = client.bankcard(imagePath);
    System.out.println(response.toString());

    // 参数为本地图片文件二进制数组
    byte[] file = readImageFile(imagePath);
    JSONObject response = client.bankcard(file);
    System.out.println(response.toString());
}
```

**银行卡识别 请求参数详情**

| 参数    | 类型     | 描述                                       | 是否必须 |
| :---- | :----- | :--------------------------------------- | :--- |
| image | String | 图像数据，支持本地图像文件路径，图像文件二进制数组，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式 | 是    |

**银行卡识别 返回数据参数详情**

| 参数                 | 类型     | 描述                           |
| :----------------- | :----- | :--------------------------- |
| log_id             | Uint64 | 唯一的log id，用于问题定位             |
| result             | Object | 定位和识别结果数组                    |
| \+bank_card_number | String | 银行卡识别结果                      |
| +bank_name         | string | 银行名，不能识别时为空                  |
| +bank_card_type    | uint32 | 银行卡类型，0:不能识别; 1: 借记卡; 2: 信用卡 |

# 身份证识别

身份证识别一次只能接受身份证正面或反面的清晰图片，能识别出证件上的文字。

图片接受参数类型：支持本地图片路径字符串，图片文件二进制数组。

举例，要对一张身份证进行文字识别，可以仅传入图片信息和注明正面/反面：
返回的words_result记录了信息，
正面支持：住址、公民身份号码、出生、姓名、性别、民族，
背面支持：签发日期、失效日期

```java
public void idcardRecognition(AipOcr client) {
    // 设置识别身份证正面参数
    boolean isFront = true;
    HashMap<String, String> options = new HashMap<String, String>();

    // 参数为本地图片路径
    String imagePath = "idcard.jpg";
    JSONObject response = client.idcard(imagePath, isFront, options);
    System.out.println(response.toString());

    // 参数为本地图片文件二进制数组
    byte[] file = readImageFile(imagePath);
    JSONObject response = client.idcard(file, isFront, options);
    System.out.println(response.toString());
}
```
传入图片时还想增加一些自定义参数配置：

```java
public void idcardRecognition(AipOcr client) {
    // 设置识别身份证正面参数
    boolean isFront = true;

    // 自定义参数定义
    HashMap<String, String> options = new HashMap<String, String>();
    options.put("detect_direction", "false");

    // 参数为本地图片路径
    String imagePath = "idcard.jpg";
    JSONObject response = client.idcard(imagePath, side, options);
    System.out.println(response.toString());

    // 参数为本地图片文件二进制数组
    byte[] file = readImageFile(imagePath);
    JSONObject response = client.idcard(file, side, options);
    System.out.println(response.toString());
}
```

**身份证识别 可选参数详情**

| 参数               | 必选    | 范围               | 类型      | 说明                                       |
| ---------------- | ----- | ---------------- | ------- | ---------------------------------------- |
| image            | true  |                  | String  | 图像数据，支持本地图像文件路径，图像文件二进制数据，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式 |
| isFront          | true  | true、false       | Boolean | true：身份证正面，false：身份证背面                   |
| detect_direction | false | true、false       | string  | 是否检测图像朝向，默认不检测，即：false。可选值为：true - 检测图像朝向；false - 不检测图像朝向。朝向是指输入图像是正常方向、逆时针旋转90/180/270度 |
| accuracy         | false | auto、normal、high | string  | 精准度，精度越高，速度越慢。default：auto               |

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

# 版本更新记录

| 上线日期      | 版本号  | 更新内容                        |
| --------- | ---- | --------------------------- |
| 2017.4.13 | 1.3.2 | 新增通用文字识别（含生僻字版）和网图识别接口 |
| 2017.3.31 | 1.3.1 | 新增通用文字识别（含位置信息版） |
| 2017.3.23 | 1.3 | 兼容Android环境 |
| 2017.3.2  | 1.2  | 上线对图片参数要求限制，增加设置超时接口        |
| 2017.1.20 | 1.1  | 对部分云用户调用不成功的错误修复            |
| 2017.1.6  | 1.0  | 初始版本，上线身份证识别、银行卡识别和通用文字识别接口 |

