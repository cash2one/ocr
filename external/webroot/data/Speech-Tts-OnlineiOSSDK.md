#概念解释

语音合成是实现人机语音交互，建立一个有听和讲能力的交互系统所必需的关键技术。随着语音技术的发展，百度自主研发了语音合成系统（TTS），功能是接受用户发送的文本，生成语音发送给用户。

对本文中将提到的概念约定如下：

- **语音合成：**将文本合成为语音，即声音文件。
- **合成引擎：**将文本合成为语音的核心模块。
- **TTS：**Text To Speech，即“从文本到语音”。
- **BDTTSClient：**语音合成 SDK 简称，详见下条。
- **语音合成 SDK：**即本开发包，文中简称为 BDTTSClient。BDTTSClient 是一个封装了网络收发、音频播放功能的语音合成解决方案。借助 BDTTSClient 可以快速地在应用程序中集成语音合成功能。



#简介

百度语音合成客户端 iOS 版 SDK（以下简称 BDTTSClient）是一种面向 Android 移动设备的语音合成解决方案，以静态库(.a)的形式发布。目前版本已支持 SDK 内部直接播放合成语音，并支持男女声、语速、音调、音量、音频码率设置，后续版本将支持从 SDK 获取语音数据、合成进度提示以及更多参数设置。

##兼容性

**系统：**支持 iOS 4.3 及以上版本

**机型：**iPhone 3GS+，iPad 1+和 iPod 3+

**构架：**armv7/armv7s/arm64

**网络：**支持 WIFI 及移动网络,移动网络支持使用 NET 网关及 WAP 网关(CMWAP、CTWAP、UNIWAP、3GWAP)

##开发包说明

表 1 开发包说明表

| 文件(夹)名                     | 说明                                       |
| -------------------------- | ---------------------------------------- |
| libBDSSpeechSynthesizer.a  | 语 音 合 成 SDK Lib 库 ， 支 持 模 拟 器/armv7/armv7s/arm64 |
| BDSSpeechSynthesizerSample | 开发示例(Xcode project)                      |
| Headers                    | 接口头文件                                    |

##总体框图

![](http://bos.nj.bpc.baidu.com/v1/audio/audio348_QQtupian20150416164718.png)

图 1 语音合成系统架构图



#集成指南

##引入编译需要的 Framework
BDTTSClient 使用了播放功能，因此需要在 Xcode 工程中引入 AVFoundation.framework；BDTTSClient 还使用到了第三方网络库 AFNetworking ，因此还需要引入SystemConfiguration.framework 、 MobileCoreServices.framework 、 CoreGraphics.framework 、
Security.framework。

如果需要使用 SDK 提供的控件，需要引入 OpenGLES.framework，QuartzCore.framework，GLKit.framework，和 CoreText.framework。

添加方式：右键点击 Xcode 中的工程文件，在出现的界面中，选中 TARGETS 下的应用，在出现的界面中选中 Build Phases->Link Binary With Libraries，点击界面中的“+”图标，在弹出的界面中选择上述几个 Framework 即可，添加完成效果图如图 8 所示（libBDSSpeechSynthesizer.a 将在随后添加）。

![](http://bos.nj.bpc.baidu.com/v1/audio/audio409_tts.png)

##引入BDVRClient的头文件

首先将 BDTTSClient 提供的头文件拷贝到工程目录下，在 XCode 中添加此文件，引入BDTTSClient 提供的头文件。
添加如下头文件：

```csharp
#import "BDSSpeechSynthesizer.h"
#import "BDSSpeechSynthesizerDelegate.h"
```

如果需要播放缓存后的语音数据，可以使用内置的播放器，引入如下头文件：

```csharp
#import "BDSBuiltInPlayer.h"
```
##引入静态库文件
BDTTSClient 提供了支持模拟器 5.0 及更新版本、真机 armv7 及更新架构所使用的静态库文件，存放在开发包根目录下。

> 注意：静态库中采用 Objective C++实现，因此需要保证工程中引用静态库头文件实现文件的扩展名必须为.mm。

引入静态库文件的具体方式为：将 libBDSSpeechSynthesizer.a 采用添加文件方式添加到工程的Framework 目录下。

> 说明：libBDVoiceRecognitionClient.a 是采用 lipo 命令将真机 armv7，真机 armv7s、真机 arm64和模拟器版的.a

合并成的一个通用的.a 文件，避免开发者在 build 不同 target 时频繁替换.a 文件的问题。

所有文件添加完成后如图 9 所示：

![](http://bos.nj.bpc.baidu.com/v1/audio/audio410_tts2.png)



#语音合成

##合成同时播放

```objective-c
// 注：第 1 个参数当前请传入任意非空字符串即可
BDSSpeechSynthesizer synthesizer = [[BDSSpeechSynthesizer alloc] initSynthesizer:@"holder"delegate:nil];
// 注：your-apiKey 和 your-secretKey 需要换成在百度开发者中心注册应用得到的对应值
[synthesizer setApiKey:@"your-apiKey" withSecretKey:@"your-secretKey"];
[synthesizer speak:@"百度一下"];
```

##参数设置

在调用 speak 方法开始合成并朗读之前，可以对参数进行配置，代码如下（完整参数列表详见头文件 BDSSpeechSynthesizer.h）

```objective-c
[self.synthesizer setParamForKey:BDS_PARAM_SPEAKER value: BDS_SPEAKER_FEMALE];
[self.synthesizer setParamForKey:BDS_PARAM_VOLUME value:@"5"];
[self.synthesizer setParamForKey:BDS_PARAM_SPEED value:@"5"];
[self.synthesizer setParamForKey:BDS_PARAM_PITCH value:@"5"];
[self.synthesizer setParamForKey:BDS_PARAM_AUDIO_ENCODE
 value: BDS_AUDIO_ENCODE_AMR];
[self.synthesizer setParamForKey:BDS_PARAM_AUDIO_RATE
 value: BDS_AUDIO_BITRATE_AMR_15K85];
```

注 ： 目前暂不支持 BDS_PARAM_NUM_PRON, BDS_PARAM_ENG_PRON,
BDS_PARAM_PUNC, BDS_PARAM_BACKGROUND, BDS_PARAM_STYLE,
BDS_PARAM_TERRITORY 等参数。

参数默认值列表如下：

|参数名 |默认值| 备注|
| ------------ | ------------ |
|BDS_PARAM_SPEAKER |BDS_SPEAKER_FEMALE |女声
|BDS_PARAM_VOLUME |"5" |音量，取值0-9，默认为5中音量
|BDS_PARAM_SPEED |"5"| 语速，取值0-9，默认为5中语速
|BDS_PARAM_PITCH| "5"| 音调，取值0-9，默认为5中语调
|BDS_PARAM_AUDIO_ENCODE |BDS_AUDIO_ENCODE_AMR |amr 压缩
|BDS_PARAM_AUDIO_RATE |BDS_AUDIO_BITRATE_AMR_15K85amr |压缩的15.85k

## 音频流类型设置

如果需要对音频播报的音频流进行设置，可以调用如下接口：

```objective-c
[self.synthesizer setAudioStreamType: AVAudioSessionCategoryPlayback];
```

传入的参数值复用 iOS SDK 的 AVAudioSession 类中声明的相关常量，开发者可直接查阅AVAudioSession Class Reference。

## 播放控制
通过`- (void)cancel;`、`- (int)pause;`、`- (int)resume;`方法可以对播放流程进行控制。

## 状态监听
为了更好地实现用于界面，BDTTSClient 提供了`BDSSpeechSynthesizerDelegate`代理对象用于对合成器的状态进行通知，监听器的回调方法参见头文件BDSSpeechSynthesizerDelegate.h。
完整的开发示例请参见开发包所附示例 xcode project——BDSSpeechSynthesizerSample。

## 获取合成数据自行播放

BDTTSClient 还支持仅获取合成数据，开发者可以在获取数据后先本地缓存，在合适的时候再进行播放，以避免较差网络情况下播放出现卡顿。参数设置同音频流类型设置。

```objective-c
// 注：第 1 个参数当前请传入任意非空字符串即可
BDSSpeechSynthesizer synthesizer = [[BDSSpeechSynthesizer alloc] initSynthesizer:@"holder"delegate:nil];
// 注：your-apiKey 和 your-secretKey 需要换成在百度开发者中心注册应用得到的对应值
[synthesizer setApiKey:@"your-apiKey" withSecretKey:@"your-secretKey"];
[synthesizer synthesize:@"百度一下"];
```

## 获取合成数据
通过 BDSSpeechSynthesizerDelegate 的 synthesizerNewDataArrived 方法获取数据，代码如下：

```objective-c
- (void)synthesizerNewDataArrived:(BDSSpeechSynthesizer *)speechSynthesizer data:(NSData*)newData isLastData:(BOOL)lastDataFlag
{
    [self logDebug:[NSString stringWithFormat:@"新的音频数据：%ld%@", (long)[newDatalength], (lastDataFlag ? @"(end)" : @"")]];
}
```

合成数据分多次返回，请根据 isLastDataFlag 的值判断是否已返回所有数据。

## 播放音频数据

BDTTSClient 内置了用于播放合成数据的播放器，通过如下方法可以播放本地缓存的合成音频数据。

```objective-c
BDSBuiltInPlayer *tempPlayer = [[BDSBuiltInPlayer alloc] init];
[tempPlayer playPcmData:_ttsPcmAudio error:nil];
```


## 播放控制
通过`- (void)cancel;`、`- (int)pause;`、`- (int)resume;`方法可以对播放流程进行控制。

## 播放器状态监听

通过`BDSBuiltInPlayerDelegate`监听接口对播放器状态进行监听，参见 BDSBuiltInPlayer.h 头文件。



#日志

为了方便调试，BDTTSClient 提供了对日志级别进行设置的接口，通过如下代码可以设置日志级别。

```objective-c
[BDSSpeechSynthesizer setLogLevel:BDS_LOG_DEBUG];
```

提供 6 个级别的日志，从低到高依次为 VERBOSE、DEBUG、INFO、WARN、ERROR、OFF，其中 VERBOSE 将输出最多日志，OFF 将关闭所有日志，默认日志级别为 DEBUG。



#FAQ

1. 如何联系我们？

开发过程中有任何 bug 或反馈意见，请发送邮件至voice_feedback@baidu.com
欢迎加入百度语音开发者交流 Hi 群：1412729 或 QQ 群：127072371 获取更多技术支持