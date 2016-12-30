#简介

##概念解释
对本文中将提到的名词约定如下：
**语音识别（Automatic Speech Recognition，ASR）**：也被称为自动语音识别，其目标是将人类的语音中的词汇内容转换为计算机可读的输入，例如按键、二进制编码或者字符序列。
**自然语言理解（Natural Language Understanding，NLU）**： 俗称人机对话，人工智能的分支学科。研究用电子计算机模拟人的语言交际过程，使计算机能理解和运用人类社会的自然语言如汉语、英语等，实现人机之间的自然语言通信，以代替人的部分脑力劳动，包括查询资料、解答问题、摘录文献、汇编资料以及一切有关自然语言信息的加工处理。
**语音识别SDK离在线融合版（Baidu Voice Recognition Client， BDVRClient）**：文中简称为BDVRClient。BDVRClient是一个封装了语音采集、语音预处理、云端识别、离线识别等功能的语音识别解决方案。使用BDVRClient可以快速在应用程序中集成语音识别功能。

##功能介绍
BDVRClient支持下列功能：
基本功能：录音、语音数据处理、端点检测、网络通讯、状态通知、返回文字结果；
语音识别控件：集成提示音、音量反馈动效整套交互的对话框控件，方便开发者快速集成；
播放提示音：在录音前后播放提示音，优化用户体验；
监听语音音量：实时反馈用户当前说话声音能量强度；
语义理解：将语音识别成领域相关的语义结果。
本文档适用于对iOS应用开发有基本了解的开发人员。

##兼容性
系统：支持iOS 5.0及以上系统。
架构：armv7、armv7s、arm64、i386、x86_64。
机型：iPhone 4+，iPad 2+和iPod 5+。
硬件要求：需要有麦克风，用于支持语音录入。
网络：支持NET、Wifi网络环境。

##开发包说明
| 一级目录                              | 二级目录                           | 说明                                 |
| :-------------------------------- | :----------------------------- | :--------------------------------- |
| Headers                           | BDVoiceRecognitionClient.h     | BDVRClient无UI头文件                   |
|                                   | BDRecognizerViewController.h   | BDVRClient UI头文件                   |
|                                   | BDRecognizerViewDelegate.h     | BDVRClient UI结果回调接口头文件             |
|                                   | BDRecognizerViewParamsObject.h | BDVRClient UI中启动参数头文件              |
|                                   | BDTheme.h                      | BDVRClient UI主题头文件                 |
|                                   | BDVRRawDataRecognizer.h        | BDVRClient音频数据识别头文件                |
|                                   | BDVRFileRecognizer.h           | BDVRClient音频文件识别头文件                |
| BDVRClientSample                  | SDK Demo源代码                    | 开发示例                               |
| Third-party                       | 各种第三方库                         | 需要添加到项目中的第三方库                      |
| libBDVoiceRecognitionClient       | libBDVoiceRecognitionClient.a  | 通用库，合并了真机armv7、armv7s、arm64和模拟器版的库 |
| BDVoiceRecognitionClientResources | Tone                           | 提示音资源文件                            |
|                                   | Theme                          | 识别控件主题                             |
| Data                              | 数据文件                           | 离线语音识别所需要的数据文件                     |
| License                           | 授权文件                           | 离线语音识别所需要的授权文件                     |
| Doc                               | 百度语音识别iOS版开发手册                 | 开发者使用指南                            |

##总体框图
![BDVRClient总体使用框图](http://bos.nj.bpc.baidu.com/v1/audio/BDVRClientzongtishiyongkuangtu.png "BDVRClient总体使用框图")



#集成指南

本章将讲解如何快速地集成BDVRClient到现有应用中。一个完整的Demo请参考开发包中的示例程序VoiceRecognitionDemo。

##创建应用
请参考《百度语音开放平台使用指南》创建应用，开通服务并完成个性化设置。

##引入编译需要的Framework
BDVRClient使用了录音和播放功能，因此需要在Xcode工程中引入AudioToolbox.framework和AVFoundation.framework；BDVRClient还使用到了网络状态检测功能，因此还需要引入SystemConfiguration.framework；为了生成设备UDID，需要引入Security.framework；为了支持gzip压缩，需要引入libz.1.dylib; 网络模块需要引入CFNetwork.framework；某些场景需要获取设备地理位置以提高识别准确度，需引入CoreLocation.framework。
为了支持识别控件，需要引入OpenGLES.framework，QuartzCore.framework，GLKit.framework，CoreGraphics.framework和CoreText.framework。
添加方式：右键点击Xcode中的工程文件，在出现的界面中，选中TARGETS中应用，在出现的界面中选中Build Phase->Link Binary With Libraries，点击界面中的“+”图标，在弹出的界面中选择此7个Framework即可，添加完成效果图如图所示（libBDVoiceRecognitionClient.a将在随后添加）。
![Framework添加完成效果图](http://bos.nj.bpc.baidu.com/v1/audio/Frameworktianjiawanchengxiaoguotu.png "Framework添加完成效果图")

##引入BDVRClient的头文件
首先将BDVRClient提供的头文件拷贝到工程目录下，在XCode中添加此文件，引入BDVRClient提供的头文件。
如果使用识别UI，请添加如下头文件：
```objective-c
#import "BDRecognizerViewController.h"
#import "BDRecognizerViewDelegate.h"
```
如果只使用识别接口，添加如下头文件：
```objective-c
#import "BDVoiceRecognitionClient.h"
```
如果要对音频数据或音频文件直接进行识别，请分别添加如下头文件：
```objective-c
#import "BDVRRawDataRecognizer.h"
#import "BDVRFileRecognizer.h"
```

##引入静态库文件
BDVRClient提供了模拟器5.0及更新版本，真机armv7、armv7s和arm64四种环境所使用的静态库文件，分别存放在开发包的libBDVoiceRecognitionClient文件夹下，详细见“开发包说明”部分。
引入前准备：静态库中采用Objective C++实现，因此需要保证工程中引用静态库头文件的实现文件的扩展名必须为.mm。
引入静态库文件的具体方式是：将libBDVoiceRecognitionClient文件夹下的libBDVoiceRecognitionClient.a采用添加文件方式添加到工程的Framework目录下，添加完成效果如图所示。
![静态库添加完成效果图](http://bos.nj.bpc.baidu.com/v1/audio/jingtaikutianjiawanchengxiaoguotu.png "静态库添加完成效果图")
说明：libBDVoiceRecognitionClient.a是采用lipo命令将armv7，armv7s，arm64和模拟器Debug版的.a合并成的一个通用的.a文件，避免开发者在build不同target时频繁替换.a文件的问题。

##添加第三方开源库
BDVRClient中使用了第三方开源库，包括TTTAttributedLabel和苹果非官方的录音API，如果产品项目中已经包含其中的部分库，请勿重复添加，否则，请添加这三种第三方开源库到项目中，第三方库文件可以在SDK开发包下的Third-party目录下找到。由于SDK中使用了类别扩展，请在Build Setting中的Other Linker Flags中添加-ObjC。
注意：其中第三方库TTTAttributedLabel需要设置为ARC方式编译。

##引入库所需的资源文件
将开发包中的BDVoiceRecognitionClientResources文件夹加入到工程中，具体的添加办法，将文件夹拷入工程文件中，以“create folder references for any adds”方式添加到工程的资源Group中，添加方式如下图所示。
![BDVoiceRecognitionClientResources添加方式图](http://bos.nj.bpc.baidu.com/v1/audio/BDVoiceRecognitionClientResourcestianjiafangshitu.png "BDVoiceRecognitionClientResources添加方式图")

##引入授权文件和数据文件
在识别过程中，需要将离线识别用到的授权文件和数据文件的访问路径传递给BDVRClient，因此，需要将开发包中License目录下的授权文件和Data目录下的数据文件加入到工程，或者放入程序的documents目录下，以便运行时访问。
![添加授权文件和数据文件](http://bos.nj.bpc.baidu.com/v1/audio/tianjiashouquanwenjianheshujuwenjian.png "添加授权文件和数据文件")



#重要接口说明

百度语音SDK提供中文普通话、中文粤语、中文四川话、英语识别，支持输入、热词、地图、音乐、应用、web、购物、健康、打电话和视频等不同的应用场景。其中搜索、地图、音乐等模式适合短Query的输入场景，在识别过程中会将语气词、标点等过滤，尾点检测会更灵敏。输入模式适合短信输入等长句场景，尾点检测会迟钝一些，可以进行连续多句识别。开发者可以通过调用语音识别控件快速集成，也可以使用底层API接口自行设计语音交互。
SDK还支持语义理解能力，可以将用户的语音直接转换成需求意图。语义具有领域性特征，不属于任何领域的语义是不存在的。同样的语言，在不同的领域中所代表的含义可能截然不同。语义理解就是把语言在特定领域所代表语义通过计算机可处理的表示方式理解出来。具体支持的领域及数据格式请参考《百度语义理解协议》。

如果开启了语义解析能力，结果将做为JSON字符串放至在候选数组的首个元素。JSON对象的结构如下：

| 字段名      | 数据类型              | 描述                           |
| :------- | :---------------- | :--------------------------- |
| item     | JSONArray<String> | 为String类型的JSONArray，存储语音识别结果 |
| json_res | String            | 语义解析结果，为Json格式的String        |

json_res转换成Json对象结构如下，详细参考《百度语义理解协议》。

| 字段名         | 数据类型      | 描述            |
| :---------- | :-------- | :------------ |
| raw_text    | string    | 原始文本          |
| parsed_text | string    | 分词结果          |
| results     | JSONArray | 语义理解意图数组，可能为空 |

##语音识别控件
BDVRClient提供了语音识别控件BDRecognizerDialogController，并提供了更换主题功能，方便开发者快速引入语音识别功能。

###创建识别控件对象

- **方法**
```objective-c
(id)initWithOrigin:(CGPoint)origin withTheme:(BDTheme *)theme;
```

- **参数**

| 参数     | 含义                  |
| :----- | :------------------ |
| origin | 控件左上角的坐标            |
| theme  | 控件的主题，如果为nil，则为默认主题 |

- **返回**
  弹窗实例

- **说明**
  第二个参数为识别控件的主题，如果参数为空，则为默认主题，主题可以从下面接口中任选其一，当选择为某一个主题，则将开发包中BDVoiceRecognitionClientResources/Theme中对应的主题Bundle添加到项目资源目录中。
  生成一个主题的方式如下：
```objective-c
BDTheme *theme=[BDTheme defaultTheme]; // 获取默认皮肤
```
目前BDVRClient的主题分为亮和暗两种系列，各分为红，橙，蓝，绿四种，开发者可以自行选用，具体选择的接口如下：
```objective-c
(instancetype) defaultTheme；
(instancetype) lightBlueTheme；
(instancetype) darkBlueTheme
(instancetype) lightGreenTheme
(instancetype) darkGreenTheme
(instancetype) lightOrangeTheme
(instancetype) darkOrangeTheme
(instancetype) lightRedTheme
(instancetype) darkRedTheme
```
因为程序一般只需要一套皮肤，因此开发者在使用中不用将Theme文件中的所有Bundle都拷入工程。

###启动识别
- **方法**
```objective-c
(BOOL)startWithParams:(BDRecognizerViewParamsObject *)params;
```

- **参数**

| 参数     | 含义      |
| :----- | :------ |
| params | 识别过程的参数 |

- **返回**
  开始识别是否成功，成功为YES，否则为NO

- **说明**
  识别过程的参数，具体项目参考BDRecognizerViewParamsObject类声明，注意参数不能为空，必须要设置apiKey和secretKey。

###取消本次识别
- **方法**
```objective-c
(void)cancel;
```

- **参数**
  无。

- **返回**
  无。

- **说明**
  取消本次识别，并移除View。

###调整控件坐标
- **方法**
```objective-c
(void)changeFrameAfterOriented:(CGPoint)origin;
```

- **参数**

| 参数     | 含义       |
| :----- | :------- |
| origin | 控件左上角的坐标 |

- **返回**
  无。

- **说明**
  设置识别弹出窗位置，一般在屏幕旋转后调用。

##语音识别控件回调对象
BDVRClient提供了语音识别控件回调对象BDRecognizerViewDelegate，通过实现该对象的接口，可以接收识别结果。

###语音识别最终结果返回回调
- **方法**
```objective-c
(void)onEndWithViews:(BDRecognizerViewController *)aBDRecognizerView withResults:(NSArray *)aResults;
```

- **参数**

| 参数                | 含义   |
| :---------------- | :--- |
| aBDRecognizerView | 弹窗UI |
| aResults          | 返回结果 |

- **返回**
  无。

- **说明**
  语音识别完成会调用此函数。返回结果均为数组，搜索结果数组元素为整体识别结果，输入结果数组元素为字典。

###录音数据返回
- **方法**
```objective-c
(void)onRecordDataArrived:(NSData *)recordData sampleRate:(int)sampleRate;
```

- **参数**

| 参数         | 含义   |
| :--------- | :--- |
| recordData | 录音数据 |
| sampleRate | 采样率  |

- **返回**
  无。

- **说明**
  返回为原始录音数据，格式为pcm，累积拼接即可得到完整录音数据。

###返回中间识别结果
- **方法**
```objective-c
(void)onPartialResults:(NSString *)results;
```

- **参数**

| 参数      | 含义     |
| :------ | :----- |
| results | 中间识别结果 |

- **返回**
  无。

- **说明**
  返回中间识别结果。

###发生错误
- **方法**
```objective-c
(void)onError:(int)errorCode;
```

- **参数**

| 参数        | 含义   |
| :-------- | :--- |
| errorCode | 错误码  |

- **返回**
  无。

- **说明**
  发生错误。

##语音识别客户端
BDVRClient出了提供语音识别空间之外，还提供了API方式的调用接口：BDVoiceRecognitionClient。
###创建语音识别客户对象
- **方法**
```objective-c
(BDVoiceRecognitionClient *)sharedInstance;
```

- **参数**
  无。

- **返回**
  语音识别客户对象。

- **说明**
  创建的语音识别客户对象是个单例，不支持并发开启多次语音识别。

###释放语音识别客户端对象
- **方法**
```objective-c
(void)releaseInstance;
```

- **参数**
  无。

- **返回**
  无。

- **说明**
  释放语音识别客户端对象，完成资源释放。

###判断是否可以录音
- **方法**
```objective-c
(BOOL)isCanRecorder;
```

- **参数**
  无。

- **返回**
  可以录音返回YES，不可以录音返回NO。

- **说明**
  判断是否可以录音。

###开始语音识别
- **方法**
```objective-c
(int)startVoiceRecognition:(id<MVoiceRecognitionClientDelegate>)aDelegate;
```

- **参数**

| 参数        | 含义          |
| :-------- | :---------- |
| aDelegate | 语音识别客户端回调对象 |

- **返回**
  错误码。

- **说明**
  开始语音识别。

###主动说话结束
- **方法**
```objective-c
(void)speakFinish;
```

- **参数**
  无。

- **返回**
  无。

- **说明**
  主动说话结束，调用该接口后将不再录音或者接收传入音频数据，但是已有音频数据将会继续识别完成。

###结束语音识别
- **方法**
```objective-c
(void)stopVoiceRecognition;
```

- **参数**
  无。

- **返回**
  无。

- **说明**
  结束语音识别，调用该接口后将不再录音或者接收传入音频数据，已经传入BDVRClient的音频数据也将被丢弃不再识别，返回当前已经识别的内容。

###获取当前识别的采样率
- **方法**
```objective-c
(int)getCurrentSampleRate;
```

- **参数**
  无。

- **返回**
  采样率。

- **说明**
  返回的采样率支持两种：16000和8000。

###指定语音采样率
- **方法**
```objective-c
(void)getCurrentSampleRate:(int)aSampleRate;
```

- **参数**

| 参数          | 含义   |
| :---------- | :--- |
| aSampleRate | 采样率  |

- **返回**
  无。

- **说明**
  指定本次语音识别的采样率，支持16000和8000。

###设置识别类型列表
- **方法**
```objective-c
(void)setPropertyList: (NSArray*)prop_list;
```

- **参数**

| 参数        | 含义   |
| :-------- | :--- |
| prop_list | 识别类型 |

- **返回**
  无。

- **说明**
  设置识别类型列表, 除EVoiceRecognitionPropertyInput和EVoiceRecognitionPropertySong外，其余类型可以复合。

###获取当前识别类型列表
- **方法**
```objective-c
(NSArray*)getRecognitionPropertyList;
```

- **参数**
  无。

- **返回**
  当前识别类型列表。

- **说明**
  获取当前识别类型列表。

###设置播放提示音
- **方法**
```objective-c
(BOOL)setPlayTone:(int)aTone isPlay:(BOOL)aIsPlay;
```

- **参数**

| 参数      | 含义      |
| :------ | :------ |
| aTone   | 提示音资源文件 |
| aIsPlay | 是否播放    |

- **返回**
  如果没有找到需要播放的资源文件，返回NO。

- **说明**
  声音资源需要加到项目工程里，用户可替换资源文件，文件名不可以变，建音提示音不宜过长，0。5秒左右。资源文件放置在BDVoiceRecognitionClientResources/Tone，录音开始声音文件名为
  record_start.caf，录音结束声音文件名为record_end.caf。  

###监听当前音量级别
- **方法**
```objective-c
(BOOL)listenCurrentDBLevelMeter;
```

- **参数**
  无。

- **返回**
  如果再工作状态设定，返回NO。

- **说明**
  需要在开始识别前调用，如果在工作状态设定，返回结果为NO ，且本次调用无效。

###获得当前音量级别
- **方法**
```objective-c
(int)getCurrentDBLevelMeter;
```

- **参数**
  无。

- **返回**
  当前音量值。

- **说明**
  获取当前音量级别，取值需要考虑全平台。

###取消监听音量级别
- **方法**
```objective-c
(void)cancelListenCurrentDBLevelMeter;
```

- **参数**
  无。

- **返回**
  无。

- **说明**
  取消监听音量级别。

###设置识别语言
- **方法**
```objective-c
(void)setLanguage:(int)language;
```

- **参数**
  识别语言。

- **返回**
  无。

- **说明**
  识别语言有效值参见枚举类型TVoiceRecognitionLanguage。

###设置开发者申请的api key和secret key
- **方法**
```objective-c
(void)setApiKey:(NSString *)apiKey withSecretKey:(NSString *)secretKey;
```

- **参数**

| 参数        | 含义                   |
| :-------- | :------------------- |
| apiKey    | 开发者在语音官网申请的apiKey    |
| secretKey | 开发者在语音官网申请的secretKey |

- **返回**
  无。

- **说明**
  本接口仅为设置鉴权所需的keys，真正鉴权验证在首次识别时发起，故首次识别时间可能较长。

###验证apiKey和secretKey
- **方法**
```objective-c
(int)verifyApiKey:(NSString *)apiKey withSecretKey:(NSString *)secretKey;
```

- **参数**

| 参数        | 含义                   |
| :-------- | :------------------- |
| apiKey    | 开发者在语音官网申请的apiKey    |
| secretKey | 开发者在语音官网申请的secretKey |

- **返回**
  返回值0代表验证通过，EVoiceRecognitionStartWorkGetAccessTokenFailed代表验证失败。

- **说明**
  调用此方法后，不再需要调用
```objective-c
(void)setApiKey:(NSString *)apiKey withSecretKey:(NSString *)secretKey;
```
此方法可以提前检查apikey、secretkey并获取验证数据，降低第一次识别需要等待的时间。

###设置参数
- **方法**
```objective-c
(void)setParamForKey:(NSString *)key withValue:(NSString *)value;
```

- **参数**

| 参数    | 含义   |
| :---- | :--- |
| key   | 参数类型 |
| value | 参数值  |

- **返回**
  无。

- **说明**
  支持参数列表详见。

###关闭标点
- **方法**
```objective-c
(void)disablePuncs:(BOOL)flag;
```

- **参数**

| 参数   | 含义     |
| :--- | :----- |
| flag | 是否关闭标点 |

- **返回**
  无。

- **说明**
  关闭标点。

###设置本地VAD开关
- **方法**
```objective-c
(void)setLocalVAD:(BOOL)enable;
```

- **参数**

| 参数     | 含义            |
| :----- | :------------ |
| enable | YES：打开；NO：不打开 |

- **返回**
  无。

- **说明**
  设置本地VAD开关。

###设置服务器VAD开关
- **方法**
```objective-c
(void)setServerVAD:(BOOL)enable;
```

- **参数**

| 参数     | 含义            |
| :----- | :------------ |
| enable | YES：打开；NO：不打开 |

- **返回**
  无。

- **说明**
  设置服务器VAD开关。

###设置是否使用压缩开关
- **方法**
```objective-c
(void)setNeedCompressFlag: (BOOL)flag;
```

- **参数**

| 参数   | 含义            |
| :--- | :------------ |
| flag | YES：打开；NO：不打开 |

- **返回**
  无。

- **说明**
  设置是否使用压缩开关。

###设置是否使用AMR压缩开关
- **方法**
```objective-c
(void)setUseAmrWhenWwanFlag: (BOOL)flag;
```

- **参数**

| 参数   | 含义            |
| :--- | :------------ |
| flag | YES：打开；NO：不打开 |

- **返回**
  无。

- **说明**
  设置是否使用AMR压缩开关。在wwan网络下，如果使用16K采样率，可以设置此标志使用amr压缩。

###是否进行车载环境下的噪声消除
- **方法**
```objective-c
(void)setEnableDRCFlag:(BOOL)flag;
```

- **参数**

| 参数   | 含义            |
| :--- | :------------ |
| flag | YES：打开；NO：不打开 |

- **返回**
  无。

- **说明**
  是否进行车载环境下的噪声消除。

###设置是否获取原始json结果
- **方法**
```objective-c
(void)setNeedOriginJsonResultFlag: (BOOL)flag;
```

- **参数**

| 参数   | 含义            |
| :--- | :------------ |
| flag | YES：打开；NO：不打开 |

- **返回**
  无。

- **说明**
  设置是否获取原始json结果，默认不开启，设置后SDK不再进行解析（暂时只支持中间结果）。

###判断是否开启获取原始json结果
- **方法**
```objective-c
(BOOL)getNeedOriginJsonResultFlag;
```

- **参数**
  无。

- **返回**
  YES：开启获取原始JSON结果；NO：不开启获取原始JSON结果。

- **说明**
  判断是否开启获取原始json结果。

###加载离线识别引擎
- **方法**
```objective-c
(int)loadOfflineEngine: (NSString*)appCode
                 license: (NSString*)licenseFile
                 datFile: (NSString*)datFilePath
               LMDatFile: (NSString*)LMDatFilePath
               grammSlot: (NSDictionary*)dictSlot;
```

- **参数**

| 参数            | 含义                     |
| :------------ | :--------------------- |
| appCode       | 用户获取的appCode           |
| licenseFile   | 用户授权文件路径               |
| datFilePath   | 识别模型文件路径               |
| LMDatFilePath | 导航使用的识别模型文件，没有可以设置为nil |
| dictSlot      | 垂类识别时，设置语法槽            |

- **返回**
  无。

- **说明**
  加载离线识别引擎。

###设置在线识别时等待超时时间
- **方法**
```objective-c
(void)setOnlineWaitTime:(NSTimeInterval)time;
```

- **参数**

| 参数   | 含义        |
| :--- | :-------- |
| time | 等待服务器反馈时间 |

- **返回**
  无。

- **说明**
  设置在线识别时等待超时时间。

###是否正在进行离线识别
- **方法**
```objective-c
(BOOL)isOfflineRecognition;
```

- **参数**
  无。

- **返回**
  正在使用离线引擎返回YES，否则返回NO。

- **说明**
  是否正在进行离线识别。

#语音识别客户端回调对象
BDVRClient提供了语音识别客户端回调对象MVoiceRecognitionClientDelegate，通过实现该对象的接口，可以接收识别结果。

###识别状态变化回调
- **方法**
```objective-c
(void)VoiceRecognitionClientWorkStatus:(int) aStatus obj:(id)aObj;
```

- **参数**

| 参数      | 含义        |
| :------ | :-------- |
| aStatus | 状态码       |
| aObj    | 该状态码对应的对象 |

- **返回**
  无。

- **说明**
  在该接口中处理各种识别状态。

###识别出错回调
- **方法**
```objective-c
(void)VoiceRecognitionClientErrorStatus:(int) aStatus subStatus:(int)aSubStatus;
```

- **参数**

| 参数         | 含义    |
| :--------- | :---- |
| aStatus    | 错误码类型 |
| aSubStatus | 具体错误码 |

- **返回**
  无。

- **说明**
  识别出错回调。

###识别网络状态变化回调
- **方法**
```objective-c
(void)VoiceRecognitionClientNetWorkStatus:(int) aStatus;
```

- **参数**

| 参数      | 含义     |
| :------ | :----- |
| aStatus | 网络状态类型 |

- **返回**
  无。

- **说明**
  识别网络状态变化回调，目前该接口处于预留状态，并未实际使用。



#参数和错误码说明

##语音识别控件参数
语音识别控件参数列表详见类BDRecognizerViewParamsObject，此参数不能为空，否则将返回NO，即启动识别失败。其中apiKey和secretKey不能为非法值，否则将无法识别。

| 参数名称                        | 参数类型                        | 默认值                                      | 描述                                       |
| :-------------------------- | :-------------------------- | :--------------------------------------- | :--------------------------------------- |
| apiKey                      | NSString                    |                                          | 语音官网认证API_key                            |
| secretKey                   | NSString                    |                                          | 语音官网认证Secret_key                         |
| language                    | TBVoiceRecognitionLanguage  | LANGUAGE_CHINESE                         | 语种，见 BDRecognizerViewParamsObject.h中定义的枚举 |
| isNeedNLU                   | BOOL                        | false                                    | 是否回传语义理解结果，仅在搜索模式下有效                     |
| recogPropList               | NSArray                     |                                          | 领域参数，取值参见BDVoiceRecognitionClient.h中对应枚举类型TBVoiceRecognitionResourceType |
| disablePuncs                | BOOL                        | false                                    | 是否禁用标点                                   |
| resultShowMode              | TBDRecognizerResultShowMode | BDRecognizerResultShowModeContinuousShow | 设置识别结果显示方式，分为连续上屏和无连续上屏效果，取值参见BDRecognizerViewParamsObject.h中定义的枚举 |
| recordPlayTones             | TBDRecognizerPlayTones      | EBDRecognizerPlayTonesRecordPlay         | 提示音开关，取值参见BDRecognizerViewParamsObject.h中定义的枚举 |
| tipsTitle                   | NSString                    |                                          | 提示语列表界面标题                                |
| tipsList                    | NSArray                     |                                          | 提示语列表，用于提示用户说出的话                         |
| isShowTipsOnStart           | BOOL                        | YES                                      | 是否在第一次启动时打开提示语列表                         |
| isShowTipAfter3sSilence     | BOOL                        | YES                                      | 是否在用户3秒未说话时浮出随机提示语                       |
| isShowHelpButtonWhenSilence | BOOL                        | YES                                      | 静音超时后将“取消”按钮替换为“帮助”                      |
| isNeedVad                   | BOOL                        | YES                                      | 是否需要进行语音端点检测                             |
| isNeedCompress              | BOOL                        | YES                                      | 是否对上传音频进行压缩                              |

##语音识别器参数
###播放提示音
类型TVoiceRecognitionPlayTones，支持的参数如下：

| 参数                                 | 含义         |
| :--------------------------------- | :--------- |
| EVoiceRecognitionPlayTonesRecStart | 录音开始提示音    |
| EVoiceRecognitionPlayTonesRecEnd   | 录音结束提示音    |
| EVoiceRecognitionPlayTonesAll      | 录音开始和结束提示音 |

###语音识别类型
语音识别类型用TBDVoiceRecognitionProperty类型表示，支持参数如下：

| 参数                                       | 含义     |
| :--------------------------------------- | :----- |
| EVoiceRecognitionPropertyMusic           | 音乐     |
| EVoiceRecognitionPropertyVideo           | 视频     |
| EVoiceRecognitionPropertyApp             | 应用     |
| EVoiceRecognitionPropertyWeb             | 网页     |
| EVoiceRecognitionPropertySearch          | 热词     |
| EVoiceRecognitionPropertyEShopping       | 购物     |
| EVoiceRecognitionPropertyHealth          | 健康     |
| EVoiceRecognitionPropertyCall            | 打电话    |
| EVoiceRecognitionPropertySong            | 录歌识别   |
| EVoiceRecognitionPropertyShake           | 摇一摇识台  |
| EVoiceRecognitionPropertyMedicalCare     | 医疗     |
| EVoiceRecognitionPropertyCar             | 汽车     |
| EVoiceRecognitionPropertyCatering        | 餐饮娱乐   |
| EVoiceRecognitionPropertyFinanceAndEconomics | 财经     |
| EVoiceRecognitionPropertyGame            | 游戏     |
| EVoiceRecognitionPropertyCookbook        | 菜谱     |
| EVoiceRecognitionPropertyAssistant       | 助手     |
| EVoiceRecognitionPropertyRecharge        | 话费充值   |
| EVoiceRecognitionPropertyMap             | 地图     |
| EVoiceRecognitionPropertyInput           | 输入     |
| EVoiceRecognitionPropertyContacts        | 100014 |
| EVoiceRecognitionPropertySetting         | 100016 |
| EVoiceRecognitionPropertyTVInstruction   | 100018 |
| EVoiceRecognitionPropertyPlayerInstruction | 100019 |
| EVoiceRecognitionPropertyRadio           | 100020 |

###采样率
采样率用TVoiceRecognitionRecordSampleRateFlags类型表示，支持参数如下：

| 参数                                    | 含义                   |
| :------------------------------------ | :------------------- |
| EVoiceRecognitionRecordSampleRateAuto | 默认值，交给BDVRClient自己选择 |
| EVoiceRecognitionRecordSampleRate8K   | 8000                 |
| EVoiceRecognitionRecordSampleRate16K  | 16000                |

###语言
采样率用TVoiceRecognitionLanguage类型表示，支持参数如下：

| 参数                                      | 含义    |
| :-------------------------------------- | :---- |
| EVoiceRecognitionLanguageChinese        | 中文普通话 |
| EVoiceRecognitionLanguageCantonese      | 粤语    |
| EVoiceRecognitionLanguageEnglish        | 英语    |
| EVoiceRecognitionLanguageSichuanDialect | 四川话   |

##语音识别状态
语音识别状态用TVoiceRecognitionClientWorkStatus表示，主要用来在
```objective-c
(void)VoiceRecognitionClientWorkStatus:(int) aStatus obj:(id)aObj; 
```
中检测，支持的类型如下：

| 参数                                       | 含义                       |
| :--------------------------------------- | :----------------------- |
| EVoiceRecognitionClientWorkStatusNone    | 空闲                       |
| EVoiceRecognitionClientWorkPlayStartTone | 播放开始提示音                  |
| EVoiceRecognitionClientWorkPlayStartToneFinish | 播放开始提示音完成                |
| EVoiceRecognitionClientWorkStatusStartWorkIng | 识别工作开始，开始采集及处理数据         |
| EVoiceRecognitionClientWorkStatusStart   | 检测到用户开始说话                |
| EVoiceRecognitionClientWorkStatusSentenceEnd | 输入模式下检测到语音说话完成           |
| EVoiceRecognitionClientWorkStatusEnd     | 本地声音采集结束结束，等待识别结果返回并结束录音 |
| EVoiceRecognitionClientWorkPlayEndTone   | 播放结束提示音                  |
| EVoiceRecognitionClientWorkPlayEndToneFinish | 播放结束提示音完成                |
| EVoiceRecognitionClientWorkStatusNewRecordData | 录音数据回调                   |
| EVoiceRecognitionClientWorkStatusFlushData | 连续上屏                     |
| EVoiceRecognitionClientWorkStatusReceiveData | 输入模式下有识别结果返回             |
| EVoiceRecognitionClientWorkStatusFinish  | 语音识别功能完成，服务器返回正确结果       |
| EVoiceRecognitionClientWorkStatusCancel  | 用户取消                     |
| EVoiceRecognitionClientWorkStatusError   | 发生错误                     |

##语音识别错误码
语音识别错误码用TVoiceRecognitionClientErrorStatus表示，支持的错误码如下：

| 参数                                       | 含义            |
| :--------------------------------------- | :------------ |
| EVoiceRecognitionClientErrorStatusUnKnow | 未知错误(异常)      |
| EVoiceRecognitionClientErrorStatusNoSpeech | 用户未说话         |
| EVoiceRecognitionClientErrorStatusShort  | 用户说话声音太短      |
| EVoiceRecognitionClientErrorStatusException | 语音前端库检测异常     |
| EVoiceRecognitionClientErrorStatusChangeNotAvailable | 录音设备不可用       |
| EVoiceRecognitionClientErrorStatusIntrerruption | 录音中断          |
| EVoiceRecognitionClientErrorNetWorkStatusUnusable | 网络不可用         |
| EVoiceRecognitionClientErrorNetWorkStatusError | 网络发生错误        |
| EVoiceRecognitionClientErrorNetWorkStatusTimeOut | 网络本次请求超时      |
| EVoiceRecognitionClientErrorNetWorkStatusParseError | 解析失败          |
| EVoiceRecognitionClientErrorNetWorkStatusServerParamError | 协议参数错误        |
| EVoiceRecognitionClientErrorNetWorkStatusServerRecognError | 识别过程出错        |
| EVoiceRecognitionClientErrorNetWorkStatusServerNoFindResult | 没有找到匹配结果      |
| EVoiceRecognitionClientErrorNetWorkStatusServerAppNameUnknownError | 鉴权失败          |
| EVoiceRecognitionClientErrorNetWorkStatusServerSpeechQualityProblem | 声音不符合识别要求     |
| EVoiceRecognitionClientErrorNetWorkStatusServerSpeechTooLong | 语音过长          |
| EVoiceRecognitionClientErrorNetWorkStatusServerUnknownError | 未知错误          |
| EVoiceRecognitionClientErrorOfflineEngineGetLicenseFailed | 离线获取license失败 |
| EVoiceRecognitionClientErrorOfflineEngineVerifyLicenseFaild | 离线验证license失败 |
| EVoiceRecognitionClientErrorOfflineEngineDatFileNotExist | 指定的模型文件不存在    |
| EVoiceRecognitionClientErrorOfflineEngineSetSlotFailed | 设置离线识别引擎槽失败   |
| EVoiceRecognitionClientErrorOfflineEngineInitializeFailed | 初始化失败         |
| EVoiceRecognitionClientErrorOfflineEngineSetParamFailed | 设置参数错误        |
| EVoiceRecognitionClientErrorOfflineEngineLMDataFileNotExist | 导航模型文件不存在     |
| EVoiceRecognitionClientErrorOfflineEngineSetPropertyFailed | 设置识别垂类失败      |
| EVoiceRecognitionClientErrorOfflineEngineFeedAudioDataFailed | 传入数据失败        |
| EVoiceRecognitionClientErrorOfflineEngineStopRecognitionFailed | 停止识别失败        |
| EVoiceRecognitionClientErrorOfflineEngineRecognizeFailed | 识别失败          |



#完整示例

##语音识别控件完整示例
语音识别控件完整示例如下：
```objective-c
- (IBAction)startRecognitionAction
{
    // 创建识别控件
BDRecognizerViewController *tmpRecognizerViewController = [[BDRecognizerViewController alloc] initWithOrigin:CGPointMake(9, 128) withTheme:[BDVRSConfig sharedInstance].theme];

    // 全屏UI
    tmpRecognizerViewController.enableFullScreenMode = YES;

    // 设置委托
    tmpRecognizerViewController.delegate = self;
    self.recognizerViewController = tmpRecognizerViewController;
    [tmpRecognizerViewController release];
    
    // 设置识别参数
    BDRecognizerViewParamsObject *paramsObject = [[BDRecognizerViewParamsObject alloc] init];
    
    // 开发者信息，必须修改API_KEY和SECRET_KEY为在百度开发者平台申请得到的值，否则示例不能工作
    paramsObject.apiKey = API_KEY;
    paramsObject.secretKey = SECRET_KEY;
	
	// 加载离线识别引擎
    NSString* appCode = APPID;
    NSString* datFilePath = [[NSBundle mainBundle] pathForResource:@"s_1" ofType:@""];
    NSString* LMDatFilePath = nil;
    if ([[BDVRSConfig sharedInstance].recognitionProperty intValue] == EVoiceRecognitionPropertyMap) {
        LMDatFilePath = [[NSBundle mainBundle] pathForResource:@"s_2_Navi" ofType:@""];
    } else if ([[BDVRSConfig sharedInstance].recognitionProperty intValue] == EVoiceRecognitionPropertyInput) {
        LMDatFilePath = [[NSBundle mainBundle] pathForResource:@"s_2_InputMethod" ofType:@""];
    }
    
    NSDictionary* recogGrammSlot = @{@"$name_CORE" : @"张三\n李四\n",
                                    @"$song_CORE" : @"小苹果\n朋友\n",
                                    @"$app_CORE" : @"QQ\n百度\n微信\n百度地图\n",
                                    @"$artist_CORE" : @"刘德华\n周华健\n"};
    
    int ret = [[BDVoiceRecognitionClient sharedInstance] loadOfflineEngine:appCode
                                                                   license:nil
                                                                   datFile:datFilePath
                                                                 LMDatFile:LMDatFilePath
                                                                 grammSlot:recogGrammSlot];

    // 开始识别
    [_recognizerViewController startWithParams:paramsObject];
    [paramsObject release];
}

// 实现委托函数
- (void)onEndWithViews:(BDRecognizerViewController *)aBDRecognizerView withResults:(NSArray *)aResults
{
    _resultView.text = nil;
    
    if ([[BDVoiceRecognitionClient sharedInstance] getRecognitionProperty] != EVoiceRecognitionPropertyInput)
    {
        // 搜索模式下的结果为数组，示例为
        // ["公园", "公元"]
        NSMutableArray *audioResultData = (NSMutableArray *)aResults;
        NSMutableString *tmpString = [[NSMutableString alloc] initWithString:@""];
        
        for (int i=0; i < [audioResultData count]; i++)
        {
            [tmpString appendFormat:@"%@\r\n",[audioResultData objectAtIndex:i]];
        }
        
        _resultView.text = [_resultView.text stringByAppendingString:tmpString];
        _resultView.text = [_resultView.text stringByAppendingString:@"\n"];
        
        [tmpString release];
    }
    else
    {
        NSString *tmpString = [[BDVRSConfig sharedInstance] composeInputModeResult:aResults];
        
        _resultView.text = [_resultView.text stringByAppendingString:tmpString];
        _resultView.text = [_resultView.text stringByAppendingString:@"\n"];
    }
}
```

##语音识别器完整示例
语音识别器完整示例如下：
```objective-c
// 开始语音识别
- (IBAction)startVoiceRecognitionAction
{
    // 设置鉴权信息
    [[BDVoiceRecognitionClient sharedInstance] setApiKey:API_KEY withSecretKey:SECRET_KEY];

    // 启动语音识别
    int startStatus = -1;
	startStatus = [[BDVoiceRecognitionClient sharedInstance] startVoiceRecognition:self];
	if (startStatus != EVoiceRecognitionStartWorking)
	{
		// 处理启动出错
	}
}

// 实现委托
- (void)VoiceRecognitionClientErrorStatus:(int) aStatus subStatus:(int)aSubStatus
{
    // 处理出错
}

- (void)VoiceRecognitionClientWorkStatus:(int)aStatus obj:(id)aObj
{
    //处理网络状态变化
}

- (void)VoiceRecognitionClientNetWorkStatus:(int) aStatus
{
    // 处理网络状态变化
}
```