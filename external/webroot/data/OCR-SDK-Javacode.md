#Java SDK文档

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


**直接使用JAR包**

步骤如下：

1.在[官方网站](/sdk)下载Java SDK压缩工具包。

2.将下载的`aip-java-sdk-version.zip`解压后，复制到工程文件夹中。
c
3.在Eclipse右键“工程 -> Properties -> Java Build Path -> Add JARs”。

4.添加SDK工具包`lib/aip-java-sdk-version.jar`和第三方依赖工具包`third-party/*.jar`。

其中，`version`为版本号，添加完成后，用户就可以在工程中使用OCR Java SDK。


# 快速入门

AipOcrClient是与Optical Character Recognition(OCR)交互的客户端，所有OCR操作都是通过AipOcrClient完成的。

## 初始化AipOcrClient

OcrClient是Optical Character Recognition的Java客户端，为使用Optical Character Recognition的开发人员提供了一系列的交互方法。

用户可以参考如下代码新建一个OcrClient：

```java
public class Sample {
    public static void main(String[] args) {

        //设置APPID/AK/SK
        String APP_ID = "your-app-id";
        String API_KEY = "your-access-key-id";
        String SECRET_KEY = "your-secret-access-key";

        // 初始化一个OcrClient
        AipOcr client = new AipOcr(APP_ID, API_KEY, SECRET_KEY);
    }
}
```
在上面代码中，常量`APP_ID`在百度云控制台中创建，常量`API_KEY`与`SECRET_KEY`是在创建完毕应用后，系统分配给用户的，均为字符串，用于标识用户，为访问做签名验证，可在AI服务控制台中的**应用列表**中查看。  

**注：**如您以前是百度云的老用户，其中`API_KEY`对应百度云的“Access Key ID”，`SECRET_KEY`对应百度云的“Access Key Secret”。


# 通用文字识别

通用文字识别可以接受任意图片，并识别出图片中的文字以及全部文字串。

图片接受类型支持本地图片路径字符串，图片文件二进制数组。

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

**通用文字识别 请求参数详情**

| 参数                    | 类型      | 描述                                       | 是否必须 |
| :-------------------- | :------ | :--------------------------------------- | :--- |
| detect_direction      | Boolean | 检测图像朝向(指输入图像是正常方向、逆时针旋转90/180/270度)，有效值：true、false，默认值: false。 | 否    |
| image                 | String  | 图像数据，支持本地图像文件路径，图像文件二进制数组                | 是    |
| language_type         | String  | 识别语言类型(CHN_ENG、ENG、POR、FRE、GER、ITA、SPA、RUS、JAP)，默认为CHN_ENG | 否    |
| mask                  | String  | 表示mask区域的黑白灰度图片，白色代表选中, base64编码         | 否    |
| recognize_granularity | String  | 是否定位单字符位置，big：不定位单字符位置，默认值；small：定位单字符位置 | 否    |

**通用文字识别 返回数据参数详情**

| 参数               | 类型     | 描述                                       |
| :--------------- | :----- | :--------------------------------------- |
| direction        | Int32  | 图像方向，当detect_direction=true时存在。-1:未定义，0:正向，1: 逆时针90度， 2:逆时针180度， 3:逆时针270度 |
| log_id           | Unit64 | 唯一的log id，用于问题定位                         |
| words_result     | Array  | 定位和识别结果数组                                |
| words_result_num | Unit32 | 识别结果数，表示words_result的元素个数                |
| \+location       | Array  | 位置数组（坐标0点为左上角）                           |
| \+\+left         | Unit32 | 表示定位位置的长方形左上顶点的水平坐标                      |
| \+\+top          | Unit32 | 表示定位位置的长方形左上顶点的垂直坐标                      |
| \+\+width        | Unit32 | 表示定位位置的长方形的宽度                            |
| \+\+height       | Unit32 | 表示定位位置的长方形的高度                            |
| \+words          | String | 识别结果字符串                                  |
| \+chars          | Array  | 当单字符结果，recognize_granularity=small时存在    |
| \+\+left         | Unit32 | 表示定位位置的长方形左上顶点的水平坐标                      |
| \+\+top          | Unit32 | 表示定位位置的长方形左上顶点的垂直坐标                      |
| \+\+width        | Unit32 | 表示定位位置的长方形的宽度                            |
| \+\+height       | Unit32 | 表示定位位置的长方形的高度                            |

# 银行卡文字识别

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

**银行卡文字识别 请求参数详情**

| 参数    | 类型     | 描述                        | 是否必须 |
| :---- | :----- | :------------------------ | :--- |
| image | String | 图像数据，支持本地图像文件路径，图像文件二进制数组 | 是    |

**银行卡文字识别 返回数据参数详情**

| 参数                 | 类型     | 描述               |
| :----------------- | :----- | :--------------- |
| log_id             | Unit64 | 唯一的log id，用于问题定位 |
| result             | Object | 定位和识别结果数组        |
| \+bank_card_number | String | 银行卡识别结果          |

# 身份证文字识别

身份证文字识别一次只能接受身份证正面或反面的清晰图片，能识别出证件上的文字。

图片接受类型支持本地图片路径字符串，图片文件二进制数组。

举例，要对一张身份证进行文字识别，可以仅传入图片信息和注明正面/反面：
返回的words_result记录了信息，
正面支持：住址、公民身份号码、出生、姓名、性别、民族，
背面支持：签发日期、失效日期

```java
public void idcardRecognition(AipOcr client) {
    // 设置识别身份证正面参数
    boolean isFront = true;

    // 参数为本地图片路径
    String imagePath = "bankcard.jpg";
    JSONObject response = client.bankcard(imagePath, side);
    System.out.println(response.toString());

    // 参数为本地图片文件二进制数组
    byte[] file = readImageFile(imagePath);
    JSONObject response = client.bankcard(file, side);
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
    String imagePath = "bankcard.jpg";
    JSONObject response = client.bankcard(imagePath, side, options);
    System.out.println(response.toString());

    // 参数为本地图片文件二进制数组
    byte[] file = readImageFile(imagePath);
    JSONObject response = client.bankcard(file, side, options);
    System.out.println(response.toString());
}
```

**身份证文字识别 请求参数详情**

| 参数               | 类型      | 描述                                       | 是否必须 |
| :--------------- | :------ | :--------------------------------------- | :--- |
| accuracy         | String  | 精准度，精度越高，速度越慢。default：auto               | 否    |
| detect_direction | Boolean | 检测图像朝向(指输入图像是正常方向、逆时针旋转90/180/270度)，有效值：true、false，默认值: false。 | 否    |
| id_card_side     | String  | front：身份证正面，back：身份证背面                   | 是    |
| image            | String  | 图像数据，支持本地图像文件路径，图像文件二进制数组                | 是    |
|classify_dimension|String|分类维度（根据OCR结果进行分类），逗号分隔，当前只支持lottery。
lottery：彩票分类，设置detect_direction有助于提升精度 |否|

**身份证文字识别 返回数据参数详情**

| 参数               | 类型     | 描述                                       |
| :--------------- | :----- | :--------------------------------------- |
| direction        | Int32  | 图像方向，当detect_direction=true时存在。-1:未定义，0:正向，1: 逆时针90度， 2:逆时针180度， 3:逆时针270度 |
| log_id           | Unit64 | 唯一的log id，用于问题定位                         |
| words_result     | Array  | 定位和识别结果数组，数组元素的key是身份证的主体字段（正面支持：住址、公民身份号码、出生、姓名、性别、民族，背面支持：签发日期、失效日期）。只返回识别出的字段。 |
| words_result_num | Unit32 | 识别结果数，表示words_result的元素个数                |
| \+location       | Array  | 位置数组（坐标0点为左上角）                           |
| \+\+left         | Unit32 | 表示定位位置的长方形左上顶点的水平坐标                      |
| \+\+top          | Unit32 | 表示定位位置的长方形左上顶点的垂直坐标                      |
| \+\+width        | Unit32 | 表示定位位置的长方形的宽度                            |
| \+\+height       | Unit32 | 表示定位位置的长方形的高度                            |
| \+words          | String | 识别结果字符串                                  |

# 版本更新说明

##

* 第一版

