# OCR Android SDK 开发者文档

本文档主要介绍OCR Android SDK的安装和使用。在使用本文档前，您需要先了解Optical Character Recognition(OCR)的基础知识，并已经开通了OCR服务。

# 快速入门

支持的系统和硬件版本

- 系统：支持 Android 4.0（API Level 15）到Android7.0（API Level 25）系统。需要开发者通过minSdkVersion来保证支持系统的检测。
- CPU架构：armeabi，arm64-v8a，armeabi-v7a
- 机型：手机和平板皆可
- 硬件要求：要求设备上有相机模块。
- 网络：支持WIFI及移动网络，移动网络支持使用NET网关及WAP网关（CMWAP、CTWAP、UNIWAP、3GWAP）。

## 开发包说明

    aip-ocr-android-sdk.zip               // OCR SDK包，包括文档，demo工程，SDK核心库
        |-libs                            // lib 库,包括各平台的so库及 jar包。
        |-OCRDemo                         // demo工程
        |-ocr-ui                          // ocr UI模块
        |-百度OCR识别Android接入文档.docx    // 使用文档

sdk的包含的UI部分和demo工程以Android Studio方式提供，sdk部分则可以较方便的集成到eclipse工程中。

 1. 在官网下载Android SDK压缩包。
 2. (必须)将下载包libs目录中的ocr-sdk.jar文件拷贝到工程libs目录中，并加入工程依赖。
 3. (必须）ocr-sdk依赖了okhttp:3.5.0以上版本
     * gradle中添加 依赖`compile 'com.squareup.okhttp3:okhttp:3.5.0' `；或着您可以手动导入工程附带的Okhttp.jar，Okio.jar文件作为依赖
 4. (必须)将libs目录下armeabi，arm64-v8a，armeabi-v7a文件夹按需添加到android studio工程`src/main/jniLibs`目录中， eclipse用户默认为libs目录。
 5. (可选)如果需要使用UI模块，请在Android studio中以模块方式导入下载包中的ocr-ui文件夹。

## DEMO使用说明

Andoird SDK提供了一个可快速运行的demo工程，直接在Android Studio中导入开发包OCRDemo目录即可运行。

**若运行提示"身份验证错误"，请确认在demo工程中填写了正确的Api Key/Secret Key**


### 为工程添加必要的权限

在工程AndroidManifest.xml文件中添加如下权限：
各个权限的用途说明见下表：

| 名称                     | 用途                      |
| ---------------------- | ----------------------- |
| INTERNET               | 应用联网，发送请求数据至服务器，获得识别结果。 |
| CAMERA                 | 调用相机进行拍照（仅UI部分需要）       |
| WRITE_EXTERNAL_STORAGE | 图片裁剪临时存储                |
| READ_EXTERNAL_STORAGE  | 图片裁剪临时存储                |

### Proguard配置

在Proguard配置文件中增加：
```keep class com.baidu.ocr.sdk.**{*;} ```

## 身份验证与安全

百度AI开放平台使用OAuth2.0授权调用开放API，调用API时必须在URL中带上accesss_token参数。AccessToken可用AK/SK或者授权文件的方式获得。

OCR Android SDK提供了以下3种AccessToken管理方法.

### API Key / Secret Key

此种身份验证方案使用AK/SK获得AccessToken。

虽然SDK对网络传输的敏感数据进行了二次加密，但由于AK/SK是明文填写在代码中，在移动设备中可能会存在AK/SK被盗取的风险。有安全考虑的开发者可使用第二种授权方案。

使用步骤：

 1. 在[管理控制台](https://console.bce.baidu.com/ai/?fromai=1&_=1488766023093#/ai/ocr/app/list)中配置OCR应用
 2. 复制应用的Api Key（简称AK） 和 Secret Key（简称SK），初始化`OCR`单例：

```
OCR.getInstance().initAccessTokenWithAkSk(new OnResultListener<AccessToken>() {
    @Override
    public void onResult(AccessToken result) {
        // 调用成功，返回AccessToken对象
        String token = result.getAccessToken();
    }
    @Override
    public void onError(OCRError error) {
        // 调用失败，返回OCRError子类SDKError对象
    }
}, getApplicationContext(), "您的应用AK", "您的应用SK");
```

由于AK/SK是明文填写在代码中，在移动设备中可能会存在AK/SK被盗取的风险。有安全考虑的开发者可使用第二种授权方案。

### 授权文件（安全模式）

此种身份验证方案使用授权文件获得AccessToken，缓存在本地。***建议有安全考虑的开发者使用此种身份验证方式。***

在您的移动APP分发出去之后，APP存在被反编译的可能，所以直接将AK / SK 置于APP源码之中，存在被盗取的风险。采用授权文件的身份验证方法，可有效保护AK/SK在移动设备中的安全。攻击者即使拦截了流量，盗取了授权文件，也难以盗用您的配额。

使用步骤：

 1. 在[官网](https://console.bce.baidu.com/ai/?fromai=1&_=1488766023093#/ai/ocr/app/list)中配置应用
 2. 下载对应应用的授权文件
 3. 将授权文件添加至工程asserts文件夹，文件名必须为`aip.license`
 4. 调用initAccessToken方法，初始化OCR单例：

```
OCR.getInstance().initAccessToken(new OnResultListener<AccessToken>() {
    @Override
    public void onResult(AccessToken result) {
        // 调用成功，返回AccessToken对象
        String token = result.getAccessToken();
    }
    @Override
    public void onError(OCRError error) {
        // 调用失败，返回OCRError子类SDKError对象
    }
}, getApplicationContext());
```

### 自助AccessToken管理

此种身份验证方案直接使用开发者提供的AccessToken。

若开发者的应用有自行搭建的服务端，也可在自己的服务端进行token的获取与管理，然后分配给移动客户端使用。token的获得可以参考[API鉴权认证机制](http://ai.baidu.com/docs#Beginner-Auth)。此种授权方案在移动客户端上没有任何AK/SK信息，风险系数低，但需要开发者自行管理token的获取与分配，适合有条件的开发者使用。

使用步骤：

 1. 将您需要使用的token传入对应的构造函数，初始化`OCR`单例：

```
OCR.getInstance().initWithToken(getApplicationContext(), "自行获取的access_token");
```

# 接口调用说明

## OCR-UI模块

OCR-UI模块提供了一套默认的UI。如需使用，请将ocr_ui模块包含到您的工程，具体使用可参考示例工程（OCRDemo）的IdCardActivity、BankCardActivity和GeneralActivity文件。

### OCR-UI模块调用示例

调用拍摄activity

```
// 生成intent对象
Intent intent = new Intent(IDCardActivity.this, CameraActivity.class);

// 设置临时存储
intent.putExtra(CameraActivity.KEY_OUTPUT_FILE_PATH,                     FileUtil.getSaveFile(getApplication()).getAbsolutePath());

// 调用拍摄银行卡正面的activity
intent.putExtra(CameraActivity.KEY_CONTENT_TYPE, CameraActivity.CONTENT_TYPE_ID_CARD_FRONT);
startActivityForResult(intent, REQUEST_CODE_CAMERA);
```

通过onActivityResult获取拍摄结果

```
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    // 获取调用参数
    String contentType = data.getStringExtra(CameraActivity.KEY_CONTENT_TYPE);
    // 通过临时文件获取拍摄的图片
    String filePath = FileUtil.getSaveFile(getApplicationContext()).getAbsolutePath();
    // 判断拍摄类型（通用，身份证，银行卡）
    if (requestCode == REQUEST_CODE_CAMERA && resultCode == Activity.RESULT_OK) {
    // 判断是否是身份证正面
        if (CameraActivity.CONTENT_TYPE_ID_CARD_FRONT.equals(contentType)){
        // 获取图片文件调用sdk数据接口，见数据接口说明
        }
    }
}
```

## 数据接口

### 通用文字识别

* 调用示例

```
// 通用文字识别参数设置
GeneralParams param = new GeneralParams();
param.setDetectDirection(true);
param.setImageFile(new File(filePath));

// 调用通用文字识别服务
OCR.getInstance().recognizeGeneral(param, new OnResultListener<GeneralResult>() {
    @Override
    public void onResult(GeneralResult result) {
        // 调用成功，返回GeneralResult对象
    }
    @Override
    public void onError(OCRError error) {
        // 调用失败，返回OCRError对象
    }
});
```

**options参数详情**

| 参数                    | 是否必选  | 类型      | 可选值范围                                   | 说明                                       |
| --------------------- | ----- | ------- | --------------------------------------- | ---------------------------------------- |
| image                 | true  | string  | -                                       | 图像数据，base64编码，要求base64编码后大小不超过1M，最短边至少15px，最长边最大2048px,支持jpg/png/bmp格式 |
| recognize_granularity | false | string  | big、small                               | 是否定位单字符位置，big：不定位单字符位置，默认值；small：定位单字符位置 |
| mask                  | false | string  | -                                       | 表示mask区域的黑白灰度图片，白色代表选中, base64编码         |
| language_type         | false | string  | CHN_ENG、ENG、POR、FRE、GER、ITA、SPA、RUS、JAP | 识别语言类型，默认为CHN_ENG。可选值包括：<br/>- CHN_ENG：中英文混合；<br/>- ENG：英文；<br/>- POR：葡萄牙语；<br/>- FRE：法语；<br/>- GER：德语；<br/>- ITA：意大利语；<br/>- SPA：西班牙语；<br/>- RUS：俄语；<br/>- JAP：日语 |
| detect_direction      | false | boolean | true、false                              | 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br/>- true：检测朝向；<br/>- false：不检测朝向。 |
| detect_language       | false | string  | true、false                              | 是否检测语言，默认不检测。当前支持（中文、英语、日语、韩语）           |
| classify_dimension    | false | string  | lottery                                 | 分类维度（根据OCR结果进行分类），逗号分隔，当前只支持lottery。<br/>lottery：彩票分类，设置detect_direction有助于提升精度 |
| vertexes_location     | false | string  | true、false                              | 是否返回文字外接多边形顶点位置，不支持单字位置。默认为false         |


* 结果返回

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

```json
// 示例
{
    direction : 2,
    log_id : 676709620,
    words_result : [ {
            location : {
                height : 20;
                left : 86;
                top : 387;
                width : 22;
            };
            words : "N";
        },
    ],
    words_result_num : 1;
}
```

### 银行卡识别

* 调用示例

```
// 银行卡识别参数设置
BankCardParams param = new BankCardParams();
param.setImageFile(new File(filePath));

// 调用银行卡识别服务
OCR.getInstance().recognizeBankCard(param, new OnResultListener<BankCardResult>() {
    @Override
    public void onResult(BankCardResult result) {
        // 调用成功，返回BankCardResult对象
    }
    @Override
    public void onError(OCRError error) {
        // 调用失败，返回OCRError对象
    }
});
```

* 结果返回

| 参数                 | 类型     | 描述                           |
| :----------------- | :----- | :--------------------------- |
| log_id             | Uint64 | 唯一的log id，用于问题定位             |
| result             | Object | 定位和识别结果数组                    |
| \+bank_card_number | String | 银行卡识别结果                      |
| \+bank_name        | String | 银行名，不能识别时为空                  |
| \+bank_card_type   | uint32 | 银行卡类型，0:不能识别; 1: 借记卡; 2: 信用卡 |

```json
 // 示例
 {
    "log_id": 3207866271;
    result: {
        "bank_card_number": "6226 2288 8888 8888",
        "bank_card_type": 1,
        "bank_name": "\U5de5\U5546\U94f6\U884c"
    };
}
```

### 身份证识别

* 调用示例

```
// 身份证识别参数设置
IDCardParams param = new IDCardParams();
param.setImageFile(new File(filePath));

// 调用身份证识别服务
OCR.getInstance().recognizeIDCard(param, new OnResultListener<IDCardResult>() {
    @Override
    public void onResult(IDCardResult result) {
        // 调用成功，返回IDCardResult对象
    }
    @Override
    public void onError(OCRError error) {
        // 调用失败，返回OCRError对象
    }
});
```

**options参数**

| 参数               | 必选    | 范围               | 类型      | 说明                                       |
| ---------------- | ----- | ---------------- | ------- | ---------------------------------------- |
| image            | true  |                  | String  | 图像数据，支持本地图像文件路径，图像文件二进制数据，要求base64编码后大小不超过1M，最短边至少15px，最长边最大2048px,支持jpg/png/bmp格式 |
| isFront          | true  | true、false       | Boolean | true：身份证正面，false：身份证背面                   |
| detect_direction | false | true、false       | string  | 是否检测图像朝向，默认不检测，即：false。可选值为：true - 检测图像朝向；false - 不检测图像朝向。朝向是指输入图像是正常方向、逆时针旋转90/180/270度 |
| accuracy         | false | auto、normal、high | string  | 精准度，精度越高，速度越慢。default：auto               |


* 结果返回

| 参数               | 类型     | 描述                                       |
| :--------------- | :----- | :--------------------------------------- |
| direction        | Int32  | 图像方向，当detect_direction=true时存在。-1:未定义，0:正向，1: 逆时针90度， 2:逆时针180度， 3:逆时针270度 |
| log_id           | Uint64 | 唯一的log id，用于问题定位                         |
| words_result     | Array  | 定位和识别结果数组，数组元素的key是身份证的主体字段（正面支持：住址、公民身份号码、出生、姓名、性别、民族，背面支持：签发日期、失效日期）。只返回识别出的字段。若身份证号码校验不通过，则不返回 |
| words_result_num | Uint32 | 识别结果数，表示words_result的元素个数                |
| \+location       | Array  | 位置数组（坐标0点为左上角）                           |
| \+\+left         | Uint32 | 表示定位位置的长方形左上顶点的水平坐标                      |
| \+\+top          | Uint32 | 表示定位位置的长方形左上顶点的垂直坐标                      |
| \+\+width        | Uint32 | 表示定位位置的长方形的宽度                            |
| \+\+height       | Uint32 | 表示定位位置的长方形的高度                            |
| \+words          | String | 识别结果字符串                                  |

```json
//示例
{
    "log_id": 7037721,
    "direction": 0,
    "words_result_num": 2,
    "words_result": {
        "住址": {
            "location": {
                "left": 227,
                "top": 235,
                "width": 229,
                "height": 51
            },
            "words": "湖北省天门市渔薪镇杨咀村一组2号",
        }
        ...
    }
}

```

# 错误码表

**验证错误**

| 错误码    | 错误信息                                    | 说明                            | 备注                                       |
| ------ | --------------------------------------- | ----------------------------- | ---------------------------------------- |
| 110    | Access token invalid or no longer valid | Access Token过期失效              | 请重新获得有效的Token                            |
| 283501 | License file check error                | 授权文件不匹配                       | 请在[控制台](https://console.bce.baidu.com/ai/#/ai/ocr/overview/index)中配置正确的包名，并确认使用了正确的授权文件 |
| 283502 | App identifier unmatch                  | BundleId不匹配                   | 请在[控制台](https://console.bce.baidu.com/ai/#/ai/ocr/overview/index)中配置正确的包名，并确认使用了正确的授权文件 |
| 283503 | License file not exists                 | 请确认aip.licence文件存在于assets文件夹中 |                                          |
| 283504 | Network error                           | 网络请求失败                        | 请授权App网络权限并保证网络通畅                        |
| 283505 | Server illegal response                 | 服务器返回数据异常                     |                                          |
| 283506 | Load jni so library error               | JNI加载异常                       | 请确认开发包中的so库被正确加载                         |
| 283601 | Server authentication error             | 身份验证错误。                       | 请在[控制台](https://console.bce.baidu.com/ai/#/ai/ocr/overview/index)中配置应用，并确认填写了正确的AK/SK，或使用了正确的授权文件 |
| 283602 | Authentication time error               | 时间戳不正确，可能是设备时间异常。             | 请确保不要改变调用设备的本地时间                         |
| 283604 | App identifier unmatch                  | 错误的PackageName或者BundleId      | 请在[控制台](https://console.bce.baidu.com/ai/#/ai/ocr/overview/index)中配置正确的包名，并确认使用了正确的授权文件 |
| 283700 | Server internal error                   | 服务器内部错误                       | 您可以在工单系统中提交错误信息中的logId，我们将尝试帮您排查错误原因     |



**服务错误**

| 错误码    | 错误信息                         | 描述                  |
| ------ | ---------------------------- | ------------------- |
| 216015 | module closed                | 模块关闭                |
| 216100 | invalid param                | 非法参数                |
| 216101 | not enough param             | 参数数量不够              |
| 216102 | service not support          | 业务不支持               |
| 216103 | param too long               | 参数太长                |
| 216110 | appid not exist              | APP ID不存在           |
| 216111 | invalid userid               | 非法用户ID              |
| 216200 | empty image                  | 空的图片                |
| 216201 | image format error           | 图片格式错误              |
| 216202 | image size error             | 图片大小错误              |
| 216500 | unknown error                | 未知错误                |
| 216600 | id number format error       | 身份证的ID格式错误          |
| 216601 | id number and name not match | 身份证的ID和名字不匹配        |
| 216630 | recognize error              | 识别错误                |
| 216631 | recognize bank card error    | 识别银行卡错误（通常为检测不到银行卡） |
| 216632 | ocr                          | unknown error       |
| 216633 | recognize idcard error       | 识别身份证错误（通常为检测不到身份证） |
| 216634 | detect error                 | 检测错误                |
| 216635 | get mask error               | 获取mask图片错误          |
| 282000 | logic internal error   | 业务逻辑层内部错误     |
| 282001 | logic backend error    | 业务逻辑层后端服务错误   |
| 282100 | image transcode error  | 图片压缩转码错误      |

# 版本更新记录

| 上线日期      | 版本号   | 更新内容                    |
| --------- | ----- | ----------------------- |
| 2017.3.23 | 1.0.1 | 更新demo获取token失败的错误提示的交互 |
| 2017.3.16 | 1.0.0 | 在线OCR第一版！               |


