# OCR iOS SDK 开发者文档

本文档主要介绍OCR iOS SDK的安装和使用。在使用本文档前，您需要先了解Optical Character Recognition(OCR)的基础知识，并已经开通了OCR服务。

支持的系统和硬件版本

- iOS: 8.0 以上
- 架构：armv7, armv7s, arm64

# 快速入门

## SDK工程结构

	AipOcrSdk							// OCR Framework 工程，包含相机相关操作
		|-AipBase.framework					// 身份验证、OCR基础操作框架包
		|-AipOcrSdk
			|-IOSpeScaleLayout...
			|-AipOcrService.h/m				// OCR服务包装类
			|-AipOcrResultDelegate.h/m
			|-View                         // 界面相关类
			|-ViewController
		|-AipOcrBundle
	AipOcrDemo							// Demo 工程
		|-AipOcrDemo

AipOcrDemo工程依赖了AipOcrSdk工程以及AipBase.framework框架。（Dynamic框架，请使用Embed Binary方式嵌入）

其中

 * AipBase.framework中包含了OCR服务相关基础类，必须引入。
 * AipOcrSdk工程包含了相机相关操作，如果需要相机接口，需要引入
   * 如果只需直接调用相机接口，直接引入AipOcrSdk工程生成的AipOcrSdk.framework即可。
   * 如果需要修改相机界面和和逻辑，可像demo工程一样引入AipOcrSdk工程，添加为依赖。

## Demo工程

iOS SDK提供了一个可快速运行的Demo工程，建议首先运行一下Demo工程，其中包含了使用SDK的主要步骤。

运行步骤如下：

1. 在[官网](http://ai.baidu.com/sdk)下载iOS SDK 压缩包
2. 解压缩，双击打开 AipOcr.xcworkspace
3. 在[管理控制台](https://console.bce.baidu.com/ai/?fromai=1#/ai/ocr/app/list)中新建文字识别应用，配置BundleId为AipOcrDemo的BunldeId(默认为`com.baidu.AipOcrDemo`)
4. 在AipOcrDemo工程中`AipOcrDemo/ViewController.m` `viewDidLoad`方法中配置相应[管理控制台](https://console.bce.baidu.com/ai/?fromai=1#/ai/ocr/app/list)中新建的应用的Api Key, Secret Key
5. 运行AipOcrDemo工程

**若运行提示"身份验证错误"，请确认填写了步骤4中的Api Key/Secret Key**

## 身份验证与安全

百度AIP开放平台使用OAuth2.0授权调用开放API，调用API时必须在URL中带上accesss_token参数。AccessToken可用AK/SK或者授权文件的方式获得。

OCR iOS SDK提供了以下3种AccessToken管理方法. 

### API Key /  Secret Key

此种身份验证方案使用AK/SK获得AccessToken，缓存在本地。

虽然SDK对网络传输的敏感数据进行了二次加密，但由于AK/SK是明文填写在代码中，在移动设备中可能会存在AK/SK被盗取的风险。有安全考虑的开发者可使用第二种授权方案。

使用步骤：

 1. 在[管理控制台](https://console.bce.baidu.com/ai/?fromai=1&_=1488766023093#/ai/ocr/app/list)中配置OCR应用
 2. 复制应用的Api Key（简称AK） 和 Secret Key（简称SK），初始化`AipOcrService`单例：

```
	// 接口
	- (instancetype) authWithAK: (NSString *)ak andSK: (NSString *)sk;
	// 示例
	[[AipOcrService shardService] authWithAK:@"Api Key" andSK:@"Secret Key"];

```


### 授权文件（安全模式）

此种身份验证方案使用授权文件获得AccessToken，缓存在本地。***建议有安全考虑的开发者使用此种身份验证方式。***

在您的移动APP分发出去之后，APP存在被反编译的可能，所以直接将AK / SK 置于APP源码之中，存在被盗取的风险。采用授权文件的身份验证方法，可有效保护AK/SK在移动设备中的安全。攻击者即使拦截了流量，盗取了授权文件，也难以盗用您的配额。

使用步骤：

 1. 在[官网](https://console.bce.baidu.com/ai/?fromai=1&_=1488766023093#/ai/ocr/app/list)中配置应用
 2. 下载对应应用的授权文件（默认名字为aip.license）
 3. 将授权文件添加至XCode工程（配置为资源并拷贝，Target -> Build Phases -> Copy Bundle Resource 中添加该文件）
 4. 读取授权文件原始字节，`NSData`格式，初始化`AipOcrService`单例：
 
		// 接口
		- (instancetype) authWithLicenseFileData: (NSData *)licenseFileContent;
	
		// 示例
		// 若未添加至主工程，则[NSBundle mainBundle]修改为对应bundle
		NSString *licenseFile = [[NSBundle mainBundle] pathForResource:@"aip" ofType:@"license"]; 
		NSData *licenseFileData = [NSData dataWithContentsOfFile:licenseFile];
		[[AipOcrService shardService] authWithLicenseFileData:licenseFileData];

### 自助AccessToken管理

此种身份验证方案直接使用开发者提供的AccessToken，不做缓存。

若开发者的应用有自行搭建的服务端，也可在自己的服务端进行token的获取与管理，然后分配给移动客户端使用。Token的获得可以参考[API鉴权认证机制](http://ai.baidu.com/docs#Beginner-Auth)。此种授权方案在移动客户端上没有任何AK/SK信息，风险系数低，但需要开发者自行管理Token的获取与分配，适合有条件的开发者使用。

使用步骤：

 1. 将您需要使用的token传入对应的构造函数，初始化`AipOcrService`单例：

		// 接口
		- (instancetype) authWithToken: (NSString *)token;
		// 示例
		[[AipOcrService shardService] authWithToken:@"Token here"];



注意：此种方式下，SDK不再缓存token，开发者需自行处理token过期问题。




# SDK集成与接口调用

使用SDK时，需要将AipBase.framework和AipOcrSdk.framework嵌入工程（Embed Binary方式，可参考AipOcrDemo工程）,并导入相关头文件

	#import <AipOcrSdk/AipOcrSdk.h>

在调用接口前，请确认已经进行过身份验证。见[身份验证与安全](#身份验证与安全)。

## 相机接口

该调用方法将会自动打开相机，用户拍照、确认，完成识别之后, 使用delegate直接返回识别结果。

内部使用了`[AipOcrService shardService]`进行数据调用。

具体返回格式见 [数据接口](#数据接口)

操作步骤：

1. 身份验证：调用 `[[AipOcrService shardService] authWithAK:SK` 或其他验证方法；
2. 在需要回调的类中实现AipOcrDelegate的接口（按需实现即可）。可在这些方法中pop出OCR的View,具体参考Demo工程。
	* 通用文字识别成功：`- (void) ocrOnGeneralSuccessful:(id)result`
	* 银行卡识别成功：`- (void) ocrOnBankCardSuccessful:(id)result`
	* 身份证识别成功：`- (void) ocrOnIdCardSuccessful:(id)result`
	* 识别失败：`- (void) ocrOnFail:(NSError *)error`
3. 在工程`Info.plist`中添加`NSCameraUsageDescription`，相机权限说明
4. 初始化ViewController，其中
    * 通用文字识别：`UIViewController * vc = [AipGeneralVC ViewControllerWithDelegate:self]`
    * 银行卡识别 `UIViewController * vc = [AipCaptureCardVC ViewControllerWithCardType:CardTypeBankCard andDelegate:self]`
    * 身份证识别
    	* 正面: `UIViewController * vc = [AipCaptureCardVC ViewControllerWithCardType:CardTypeIdCardFont andDelegate:self]`
    	* 背面: `UIViewController * vc = [AipCaptureCardVC ViewControllerWithCardType:CardTypeIdCardFont andDelegate:self]`
5. 在合适的地方启动ViewController: 如`[self presentViewController:vc animated:YES completion:nil]`

AipOcrSdk.framework，即AipOcr工程包含了相机相关操作代码，如开发者想直接使用，无需引用AipOcrSdk工程，直接引入AipOcrSdk.framework即可。若需要修改相机操作相关UI，可引入AipOcrSdk工程，编辑相关UI代码即可。
    	
    	
## 数据接口

该调用方法传入需要识别的UIImage，异步识别，识别完成之后，回调返回识别结果。

主要类为AipOcrService类，使用单例`[AipOcrService sharedService]`来调用相关接口即可。

操作步骤：

1. 身份验证：调用 `[[AipOcrService shardService] authWithAK:SK` 或其他验证方法；
2. 调用以下相应接口
	* 通用文字识别 `detectTextFromImage`
	* 身份证正面`detectIdCardFrontFromImage`
	* 身份证背面`detectIdCardBackFromImage`
	* 银行卡`detectBankCardFromImage`


**所有回调函数均在后台线程中被调用，如需在主线程中操作，请使用`[[NSOperationQueue mainQueue] addOperationWithBlock]`patch到主线程中，示例参考demo工程。**

### 通用文字识别

 * 调用示例
 
```
	NSDictionary *options = @{@"language_type": @"CHN_ENG", @"detect_direction": @"true"};
	[[AipOcrService shardService] detectTextFromImage:finalImage withOptions:options successHandler:^(id result) {
        // 成功识别的后续逻辑
    } failHandler:^(NSError *err) {
        // 失败的后续逻辑
    }];
```

***options参数详情***

| 参数                    | 是否必选  | 类型      | 可选值范围                                   | 说明                                       |
| --------------------- | ----- | ------- | --------------------------------------- | ---------------------------------------- |
| image（已由参数替代）                 | true  | string  | -                                       | 图像数据，base64编码，要求base64编码后大小不超过1M，最短边至少15px，最长边最大2048px,支持jpg/png/bmp格式 |
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
[[AipOcrService shardService] detectBankCardFromImage:finalImage successHandler:^(id result) {
	//成功
} failHandler:^(NSError *err) {
	//失败
}];
```
* 结果返回

| 参数                 | 类型     | 描述               |
| :----------------- | :----- | :--------------- |
| log_id             | Uint64 | 唯一的log id，用于问题定位 |
| result             | Object | 定位和识别结果数组        |
| +bank_card_number | String | 银行卡识别结果          |
| +bank_name	| string |	银行名，不能识别时为空|
| +bank_card_type|	uint32 |	银行卡类型，0:不能识别; 1: 借记卡; 2: 信用卡|

```json
 // 示例
 {
    "log_id" = 2742598501;
    "result" = {
        "bank_card_number" = "622202 0200046230377";
        "bank_card_type" = 1;
        "bank_name" = "\U5de5\U5546\U94f6\U884c";
    };
}
```

### 身份证识别

* 调用示例
```
// 正面
 [[AipOcrService shardService] detectIdCardFrontFromImage:finalImage withOptions:nil successHandler:^(id result) {
     // 成功
} failHandler:^(NSError *err) {
    // 失败
}];
```

***options参数***

| 参数               | 必选    | 范围               | 类型      | 说明                                       |
| ---------------- | ----- | ---------------- | ------- | ---------------------------------------- |
| image（已由image参数代替）            | true  |                  | String  | 图像数据，支持本地图像文件路径，图像文件二进制数据，要求base64编码后大小不超过1M，最短边至少15px，最长边最大2048px,支持jpg/png/bmp格式 |
| isFront（已由函数名区分）        | true  | true、false       | Boolean | true：身份证正面，false：身份证背面                   |
| detect_direction | false | true、false       | string  | 是否检测图像朝向，默认不检测，即：false。可选值为：true - 检测图像朝向；false - 不检测图像朝向。朝向是指输入图像是正常方向、逆时针旋转90/180/270度 |
| accuracy         | false | auto、normal、high | string  | 精准度，精度越高，速度越慢。default：auto               |


* 结果

| 参数               | 类型     | 描述                                       |
| :--------------- | :----- | :--------------------------------------- |
| direction        | Int32  | 图像方向，当detect_direction=true时存在。-1:未定义，0:正向，1: 逆时针90度， 2:逆时针180度， 3:逆时针270度 |
| log_id           | Uint64 | 唯一的log id，用于问题定位                         |
| words_result     | Array  | 定位和识别结果数组，数组元素的key是身份证的主体字段（正面支持：住址、公民身份号码、出生、姓名、性别、民族，背面支持：签发日期、失效日期、签发机关）。只返回识别出的字段。若身份证号码校验不通过，则不返回 |
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
### 错误码表

***验证错误***


|错误码 | 错误信息 | 说明 | 备注 |
|---|---|---|---|
|110 |	Access token invalid or no longer valid	|Access Token过期失效| 请重新获得有效的Token |
|283501 | License file check error| 授权文件不匹配 |请在[官网](http://ai.baidu.com)中配置正确的包名，并确认使用了正确的授权文件|
|283502 | App identifier unmatch | BundleId不匹配 |请在[官网](http://ai.baidu.com)中配置正确的包名，并确认使用了正确的授权文件| 
|283504 | Network error | 网络请求失败|  请授权App网络权限并保证网络通畅|
|283505 | Server illegal response | 服务器返回数据异常 | |
|283601 | Server authentication error |身份验证错误。| 请在[官网](http://ai.baidu.com)中配置应用，并确认填写了正确的AK/SK，或使用了正确的授权文件|
|283602 | Authentication time error | 时间戳不正确，可能是设备时间异常。 |
|283604 | App identifier unmatch | 错误的PackageName或者BundleId | 
|283700 | Server internal error |  服务器内部错误 | |


***服务错误***

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
| 216631 | recognize bank card error    | 识别银行卡错误（通常为检测不到银行卡）       |
| 216632 | ocr                          | unknown error |
| 216633 | recognize idcard error       | 识别身份证错误（通常为检测不到身份证）       |
| 216634 | detect error                 | 检测错误          |
| 216635 | get mask error               | 获取mask图片错误    |

# 3. 特殊配置

## 截图分辨率系数

该系数影响到拍摄照片之后截取的图片大小

在AipOcrSdk/AipOcrSdk/View/AipCutImageView.m 中

	//截图的分辨率系数 开发者可自行配置
	static CGFloat const scale = 1.0;

## 图片放大/缩小系数

在AipOcrSdk/AipOcrSdk/View/AipCutImageView.m 中

	//捏合操作最大/最小系数
	static CGFloat const pinchMaxscale = 10.0;
	static CGFloat const pinchMinscale = 0.5;

## 自动重试

识别失败后，自动重试一次。

在AipOcrSdk/AipOcrSdk/AipOcrService 中，配置属性 retry即可
	
	/**
	 * 是否重试。默认为NO。YES会在失败时自动重试一次。
	 */
	@property (atomic, assign) bool retry;


# Relese Notes

| 上线日期      | 版本号  | 更新内容                        |
| --------- | ---- | --------------------------- |
| 2017.3.16  | 1.0.0  | 在线OCR第一版！|

