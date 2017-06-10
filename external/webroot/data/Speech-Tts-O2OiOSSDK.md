# 简介

## 概念解释

语音合成是实现人机语音交互，建立一个有听和讲能力的交互系统所必需的关键技术。随着语音技术的发展，百度自主研发了语音合成系统（TTS），功能是接收用户发送的文本，生成语音发送给用户。

对本文中将提到的名词约定如下：

**语音合成（Text To Speech，TTS）**：将文本合成为语音，即声音文件。

**合成引擎**：将文本合成为语音的核心模块。

**百度语音合成SDK（BDSSpeechSynthesizer）**：本开发包。BDSSpeechSynthesizer是一个封装了网络首发、音频播放功能的语音合成解决方案。借助BDSSpeechSynthesizer可以在应用程序中快速集成语音合成功能。

## 功能介绍

百度语音合成客户端iOS离在线融合版SDK（以下简称BDSSpeechSynthesizer）是一种面向iOS移动设备的语音合成解决方案，以Cocoa Touch Static Library形式发布。支持离线语音合成，在线语音合成，在线优先等合成模式。目前版本已支持SDK内部直接播放合成语音。离线合成支持语速、音调、音量、引擎优化级别设置，后续版本将支持如男女声等更多的合成参数；在线合成支持男女声、语速、音调、音量、音频码率设置，后续版本将支持从SDK获取语音数据、合成进度提示以及更多参数设置。
本版本优先使用在线语音合成服务合成，以获得更好的合成效果。如在线合成服务不可用，如网络连接异常，蜂窝信号差等，将会使用离线合成引擎合成文本，保证功能可用，并按规则定期侦测在线语音合成服务，如在线服务可用，下次语音合成将使用在线服务合成。


## 兼容性

- **系统：**支持iOS 6.0及以上。
- **机型：**iPhone和iPad皆可。
- **架构：**支持i386*、x86_64*、armv7、arm64。
  (离线合成不支持i386和x86_64架构。)


## 开发包说明

| 文件（夹）名                                   | 说明                                |
| :--------------------------------------- | :-------------------------------- |
| Doc/Baidu_Combined_TTS_SDK_iOS_Manual.pdf | 本文档                               |
| BDSSpeechSynthesizer_SDK                 | 语音合成SDK Lib库，支持simulator和iOS设备    |
| BDSSpeechSynthesizerSample               | 开发示例(xcode project)               |
| OfflineTTSDatFiles/Chinese_Speech_Female.dat | 语音合成资源文件 (speech data file，中文，女声) |
| OfflineTTSDatFiles/Chinese_Speech_Male.dat | 语音合成资源文件(speech data file，中文，男声)  |
| OfflineTTSDatFiles/Chinese_Text.dat      | 语音合成资源文件(text data file， 中文)      |
| OfflineTTSDatFiles/English_Speech_Female.dat | 语音合成资源文件 (speech data file，英文，女声) |
| OfflineTTSDatFiles/English_Speech_Male.dat | 语音合成资源文件(speech data file，英文，男声)  |
| OfflineTTSDatFiles/ English_Text.dat     | 语音合成资源文件(text data file， 英文)      |
| OfflineTTSDatFiles/offline_engine_tmp_license.dat | 授权文件                              |

# 集成指南

## 创建应用

请参考《百度语音开放平台使用指南》创建应用，开通服务并完成个性化设置。

## 添加BDSSpeechSynthesizer到工程

BDSSpeechSynthesizer使用了一些系统的framework，需要添加到工程里面。
添加方式:右键点击 Xcode 中的工程文件,在出现的界面中,选中 TARGETS 下的应用,在出现的界面中选中 Build Phases->Link Binary With Libraries,点击界面中的“+”图标,在弹出的界面中选择上下图中的一个frame即可, 逐个添加后，添加完成效果图如图所示(libetts_device_simulator.a 将在随后添加)。

![添加framework](http://bos.nj.bpc.baidu.com/v1/audio/tianjiaframework.png "添加framework")

## 添加授权文件

将开发包中的license目录下的bdtts_licence.dat文件添加到工程, 或者安装app后部署到app对应的Documents目录下。

## 添加语音合成资源文件

将开发包中的data目录下的bd_tts.dat文件添加到工程或者安装app后部署到指定目录(代码中启动合成引擎时需要指定该资源文件的访问路径)。

## 引入BDSSpeechSynthesizer的头文件

首先将 BDSSpeechSynthesizer 提供的头文件拷贝到工程目录下,在 XCode 中添加此文件,引入 BDSSpeechSynthesizer提供的头文件。

添加如下头文件：

```objective-c
#import "BDSSpeechSynthesizer.h"
```

## 引入静态库文件

BDSSpeechSynthesizer提供了支持模拟器 5.0 及更新版本、真机 armv7，armv7s，arm64及更新架构所使用的静态库文件,存放在开发包lib目录下。

引入静态库文件的具体方式为:将libetts_device_simulator.a 采用添加文件方式添加到工程的Framework 目录下。

>**说明:** libetts_device_simulator.a 是一个通用的库文件，支持armv7、arm64、i386、x86_64, 避免开发者在 build 不同 target 时频繁替换.a 文件的问题



# 重要接口说明

## 语音合成器

合成器，类名BDSSpeechSynthesizer，主要用来控制合成进程：设置参数，开始，结束，取消等。

### 获取合成器唯一实例

- **方法**

```objective-c
(BDSSpeechSynthesizer*)sharedInstance;
```

- **参数**

  无。

- **返回**

  语音合成引擎实例。

- **说明**

  获取语音合成引擎实例，该实例为单例对象。

### 释放合成器唯一实例

- **方法**

```objective-c
(void)releaseInstance;
```

- **参数**

  无。

- **返回**
 
  无。

- **说明**

  释放语音合成器实例。

### 设置合成器代理

- **方法**

```objective-c
(void)setSynthesizerDelegate: (id<BDSSpeechSynthesizerDelegate>)delegate;
```

- **参数**

| 参数       | 含义   |
| :------- | :--- |
| delegate | 代理对象 |

- **返回**

  无。

- **说明**

  设置合成器代理，代理对象负责处理合成器各类事件。

### 设置合成参数

- **方法**

```objective-c
(NSError*)setSynthParam:(id)param forKey:(BDSSynthesizerParamKey)key;
```

- **参数**

| 参数    | 含义   |
| :---- | :--- |
| param | 参数值  |
| key   | 参数键  |

- **返回**

  nil或错误信息。

- **说明**

  设置合成参数。

### 获取合成参数

- **方法**

```objective-c
(id)getSynthParamforKey:(BDSSynthesizerParamKey)key withError:(NSError**)err;
```

- **参数**

| 参数   | 含义           |
| :--- | :----------- |
| key  | 参数键          |
| err  | 如果失败, 返回错误信息 |

- **返回**

  参数值。

- **说明**

  获取合成参数。

### 设置认证信息

- **方法**

```objective-c
(void)setApiKey:(NSString *)apiKey withSecretKey:(NSString *)secretKey;
```

- **参数**

| 参数        | 含义                  |
| :-------- | :------------------ |
| apiKey    | 用户从语音官网申请的apiKey    |
| secretKey | 用户从语音官网申请的secretKey |

- **返回**

  无。

- **说明**

  设置认证信息。

### 设置回调队列

- **方法**

```objective-c
(NSError*)setSDKCallbackQueue:(dispatch_queue_t)callbackQueue;
```

- **参数**

| 参数            | 含义   |
| :------------ | :--- |
| callbackQueue | 回调队列 |

- **返回**

  nil或错误信息。

- **说明**

  设置回调队列。



### 获得当前回调队列

- **方法**

```objective-c
(dispatch_queue_t)getCurrentCallbackQueue;
```

- **参数**

  无。

- **返回**

  回调队列。

- **说明**

  获得当前回调队列。

### 设置合成线程优先级

- **方法**

```objective-c
(void)setThreadPriority:(double)priority;
```

- **参数**

| 参数       | 含义   |
| :------- | :--- |
| priority | 优先级  |

- **返回**

  无。

- **说明**

  设置合成线程优先级。

### 启动合成引擎

- **方法**

```objective-c
(NSError*)loadOfflineEngine: (NSString*)textDatFilePath
                speechDataPath: (NSString*)speechDatFilePath
               licenseFilePath: (NSString*)licenseFilePath
                   withAppCode: (NSString*)appCode;
```

- **参数**

| 参数              | 含义                    |
| :-------------- | :-------------------- |
| textDatFilePath | 中文文本分析数据文件路径          |
| speechDataPath  | 中文声学模型数据文件路径          |
| licenseFilePath | 授权文件路径，如果没有本地授权可传入nil |
| appCode         | 用户持有的授权app code       |

- **返回**

  nil或错误信息。

- **说明**

  启动合成引擎。

### 加载英文合成数据文件及模型文件

- **方法**

```objective-c
-(NSError*)loadEnglishDataForOfflineEngine: (NSString*)textDataPath
                    speechData: (NSString*)speechDataPath;
```

- **参数**

| 参数             | 含义           |
| :------------- | :----------- |
| textDataPath   | 英文文本分析数据文件路径 |
| speechDataPath | 英文声学模型数据文件路径 |

- **返回**

  nil或错误信息。

- **说明**

  加载英文合成数据文件及模型文件。

### 重新加载文本分析数据文件或者声学模型数据文件

- **方法**

```objective-c
(NSError*)reinitOfflineEngineData: (NSString*)datFilePath;
```

- **参数**

| 参数          | 含义     |
| :---------- | :----- |
| datFilePath | 数据文件路径 |

- **返回**

  nil或错误信息。

- **说明**

  重新加载文本分析数据文件或者声学模型数据文件。

### 加载定制库

- **方法**

```objective-c
(NSError*)loadDomainDataForOfflineEngine:(NSString*)datFilePath;
```

- **参数**

| 参数          | 含义     |
| :---------- | :----- |
| datFilePath | 数据文件路径 |

- **返回**

  nil或错误信息。

- **说明**

  加载定制库。

### 卸载定制库

- **方法**

```objective-c
(NSError*)unloadDomainDataFromOfflineEngine;
```

- **参数**

  无。

- **返回**

  nil或错误信息。

- **说明**

  卸载定制库。

### 验证音库文件的有效性

- **方法**

```objective-c
(BOOL)verifyDataFile: (NSString*) datFilePath error:(NSError**)err;
```

- **参数**

| 参数          | 含义            |
| :---------- | :------------ |
| datFilePath | 数据文件路径        |
| err         | 如果验证失败，返回错误信息 |

- **返回**

  验证成功返回YES，验证失败返回NO。

- **说明**

  验证音库文件的有效性。

### 获取音库文件相关参数

- **方法**

```objective-c
(BOOL)getDataFileParam: (NSString*)datFilePath
                    type: (TTSDataParam)paramType
                   value: (NSString**)paramValue
                   error: (NSError**)err;
```

- **参数**

| 参数          | 含义           |
| :---------- | :----------- |
| datFilePath | 数据文件路径       |
| paramType   | 参数键          |
| paramValue  | 传出对应参数的值     |
| err         | 如果失败, 返回错误信息 |

- **返回**

  成功返回YES，失败返回NO。

- **说明**

  获取音库文件相关参数。



### 批量开始文本合成但不朗读或添加文本至当前合成过程

- **方法**

```objective-c
(NSInteger)synthesizeSentence:(NSString*)sentence withError:(NSError**)err;
```

- **参数**

| 参数       | 含义           |
| :------- | :----------- |
| sentence | 需要语音合成的文本    |
| err      | 如果失败, 返回错误信息 |

- **返回**

  SDK生成的文本ID，－1代表合成失败，错误信息详见err。

- **说明**

  批量开始文本合成但不朗读或添加文本至当前合成过程。



### 批量开始文本合成并朗读或添加文本至当前合成过程

- **方法**

```objective-c
(NSInteger) speakSentence:(NSString*)sentence withError:(NSError**)err;
```

- **参数**

| 参数       | 含义           |
| :------- | :----------- |
| sentence | 需要语音合成的文本    |
| err      | 如果失败, 返回错误信息 |

- **返回**

  SDK生成的文本ID，－1代表合成失败，错误信息详见err。

- **说明**

  批量开始文本合成并朗读或添加文本至当前合成过程。

### 取消本次合成并停止朗读

- **方法**

```objective-c
(void)cancel;
```

- **参数**

  无。

- **返回**

  无。

- **说明**

  取消本次合成并停止朗读。

### 暂停文本合成并朗读

- **方法**

```objective-c
(BDSSynthesizerStatus)pause;
```

- **参数**

  无。

- **返回**

  合成状态。

- **说明**

  暂停文本合成并朗读。

### 继续文本合成并朗读

- **方法**

```objective-c
(BDSSynthesizerStatus)resume;
```

- **参数**

  无。

- **返回**

  合成状态。

- **说明**

  继续文本合成并朗读。

### 获取合成器状态

- **方法**

```objective-c
(BDSSynthesizerStatus)synthesizerStatus;
```

- **参数**
  无。

- **返回**

  合成状态。

- **说明**

  获取合成器状态。

### 设置播放器音量

- **方法**

```objective-c
(void)setPlayerVolume:(float)volume;
```

- **参数**

| 参数     | 含义   |
| :----- | :--- |
| volume | 音量值  |

- **返回**

  无。

- **说明**

  设置播放器音量。

### 设置AudioSessionCategory类型

- **方法**

```objective-c
(void)setAudioSessionCategory:(NSString *)category;
```

- **参数**

| 参数       | 含义                     |
| :------- | :--------------------- |
| category | AudioSessionCategory类型 |

- **返回**

  无。

- **说明**

  设置AudioSessionCategory类型。

## 语音合成器委托对象

语音合成器委托对象BDSSpeechSynthesizerDelegate，用来处理语音合成器的各种回调。

### 开成合成

- **方法**

```objective-c
(void)synthesizerStartWorkingSentence:(NSInteger)SynthesizeSentence;
```

- **参数**

| 参数                 | 含义   |
| :----------------- | :--- |
| SynthesizeSentence | 句子序号 |

- **返回**

  无。

- **说明**

  开始合成。

### 结束合成

- **方法**

```objective-c
(void)synthesizerFinishWorkingSentence:(NSInteger)SynthesizeSentence;
```

- **参数**

| 参数                 | 含义   |
| :----------------- | :--- |
| SynthesizeSentence | 句子序号 |

- **返回**

  无。

- **说明**

  结束合成。

### 开成朗读

- **方法**

```objective-c
(void)synthesizerSpeechStartSentence:(NSInteger)SpeakSentence;
```

- **参数**

| 参数            | 含义   |
| :------------ | :--- |
| SpeakSentence | 句子序号 |

- **返回**

  无。

- **说明**

  开始朗读。

### 结束朗读

- **方法**

```objective-c
(void)synthesizerSpeechEndSentence:(NSInteger)SpeakSentence;
```

- **参数**

| 参数            | 含义   |
| :------------ | :--- |
| SpeakSentence | 句子序号 |

- **返回**

  无。

- **说明**

  结束朗读。

### 新的语音数据已经合成

- **方法**

```objective-c
(void)synthesizerNewDataArrived:(NSData *)newData
					   DataFormat:(BDSAudioFormat)fmt
                   characterCount:(int)newLength
                   sentenceNumber:(NSInteger)SynthesizeSentence;
```

- **参数**

| 参数                 | 含义     |
| :----------------- | :----- |
| newData            | 语音数据   |
| DataFormat         | 音频格式   |
| newLength          | 语音数据长度 |
| SynthesizeSentence | 句子序号   |

- **返回**

  无。

- **说明**

  新的语音数据已经合成。

### 播放进度变更

- **方法**

```objective-c
(void)synthesizerTextSpeakLengthChanged:(int)newLength
                           sentenceNumber:(NSInteger)SpeakSentence;
```

- **参数**

| 参数            | 含义     |
| :------------ | :----- |
| newLength     | 语音数据长度 |
| SpeakSentence | 句子序号   |

- **返回**

  无。

- **说明**

  播放进度变更。

### 合成器发生错误

- **方法**

```objective-c
(void)synthesizerErrorOccurred:(NSError *)error
                        speaking:(NSInteger)SpeakSentence
                    synthesizing:(NSInteger)SynthesizeSentence;
```

- **参数**

| 参数                 | 含义        |
| :----------------- | :-------- |
| error              | 错误码       |
| SpeakSentence      | 正在播放的句子序号 |
| SynthesizeSentence | 正在合成的句子序号 |

- **返回**

  无。

- **说明**
 
  合成器发生错误。



# 参数和错误码说明
 
## 语音合成器参数

### 合成参数

百度语音合成支持的参数用BDSSynthesizerParamKey类型表示，具体如下：

| 参数                                       | 含义         |
| :--------------------------------------- | :--------- |
| BDS_SYNTHESIZER_PARAM_SPEED              | 语速         |
| BDS_SYNTHESIZER_PARAM_PITCH              | 音调         |
| BDS_SYNTHESIZER_PARAM_VOLUME             | 音量         |
| BDS_SYNTHESIZER_PARAM_PID                | 产品号        |
| BDS_SYNTHESIZER_PARAM_LANGUAGE           | 语言         |
| BDS_SYNTHESIZER_PARAM_TEXT_ENCODE        | 文本编码类型     |
| BDS_SYNTHESIZER_PARAM_AUDIO_ENCODING     | 音频编码类型     |
| BDS_SYNTHESIZER_PARAM_SPEAKER            | 发音人        |
| BDS_SYNTHESIZER_PARAM_USER_AGENT         | UA         |
| BDS_SYNTHESIZER_PARAM_ONLINE_REQUEST_TIMEOUT | 超时时间       |
| BDS_SYNTHESIZER_PARAM_ETTS_AUDIO_FORMAT  | 音频格式       |
| BDS_SYNTHESIZER_PARAM_ETTS_VOCODER_OPTIM_LEVEL | 合成引擎速度优化等级 |
| BDS_SYNTHESIZER_PARAM_SYNTH_STRATEGY     | 合成策略       |

### 语音合成文本语言

语音合成文本语言用BDSSynthesizerLanguages类型表示，具体如下：

| 参数                          | 含义   |
| :-------------------------- | :--- |
| BDS_SYNTHESIZER_LANGUAGE_ZH | 中文   |
| BDS_SYNTHESIZER_LANGUAGE_EN | 英文   |

### 语音合成文本编码格式

语音合成文本编码格式用BDSSynthesizerTextEncodings类型表示，具体如下：

| 参数                               | 含义     |
| :------------------------------- | :----- |
| BDS_SYNTHESIZER_TEXT_ENCODE_GBK  | GBK编码  |
| BDS_SYNTHESIZER_TEXT_ENCODE_BIG5 | 大五码编码  |
| BDS_SYNTHESIZER_TEXT_ENCODE_UTF8 | UTF8编码 |

### 语音合成音频编码格式

语音合成音频编码格式用BDSSynthesizerAudioEncoding类型表示，具体如下：

| 参数                                     | 含义            |
| :------------------------------------- | :------------ |
| BDS_SYNTHESIZER_AUDIO_ENCODE_BV_16K    | bv 16k比特率     |
| BDS_SYNTHESIZER_AUDIO_ENCODE_AMR_6K6   | amr 6.6k比特率   |
| BDS_SYNTHESIZER_AUDIO_ENCODE_AMR_8K85  | amr 8.85k比特率  |
| BDS_SYNTHESIZER_AUDIO_ENCODE_AMR_12K65 | amr 12.65k比特率 |
| BDS_SYNTHESIZER_AUDIO_ENCODE_AMR_14K25 | amr 14.25k比特率 |
| BDS_SYNTHESIZER_AUDIO_ENCODE_AMR_15K85 | amr 15.85k比特率 |
| BDS_SYNTHESIZER_AUDIO_ENCODE_AMR_18K25 | amr 18.25k比特率 |
| BDS_SYNTHESIZER_AUDIO_ENCODE_AMR_19K85 | amr 19.85k比特率 |
| BDS_SYNTHESIZER_AUDIO_ENCODE_AMR_23K05 | amr 23.05k比特率 |
| BDS_SYNTHESIZER_AUDIO_ENCODE_AMR_23K85 | amr 23.85k比特率 |
| BDS_SYNTHESIZER_AUDIO_ENCODE_OPUS_8K   | opus 8k比特率    |
| BDS_SYNTHESIZER_AUDIO_ENCODE_OPUS_16K  | opus 16k比特率   |
| BDS_SYNTHESIZER_AUDIO_ENCODE_OPUS_18K  | opus 18k比特率   |
| BDS_SYNTHESIZER_AUDIO_ENCODE_OPUS_20K  | opus 20k比特率   |
| BDS_SYNTHESIZER_AUDIO_ENCODE_OPUS_24K  | opus 24k比特率   |
| BDS_SYNTHESIZER_AUDIO_ENCODE_OPUS_32K  | opus 32k比特率   |
| BDS_SYNTHESIZER_AUDIO_ENCODE_MP3_8K    | mp3 8k比特率     |
| BDS_SYNTHESIZER_AUDIO_ENCODE_MP3_11K   | mp3 11k比特率    |
| BDS_SYNTHESIZER_AUDIO_ENCODE_MP3_16K   | mp3 16k比特率    |
| BDS_SYNTHESIZER_AUDIO_ENCODE_MP3_24K   | mp3 24k比特率    |
| BDS_SYNTHESIZER_AUDIO_ENCODE_MP3_32K   | mp3 32k比特率    |

## 语音合成错误码

### 开始合成错误

开始合成错误用BDSStartSynthesisError类型表示，具体如下：

| 参数                                       | 含义        |
| :--------------------------------------- | :-------- |
| BDS_START_SYNTHESIS_OK                   | 启动成功      |
| BDS_START_SYNTHESIS_SYNTHESIZER_UNINITIALIZED | 合成器未初始化   |
| BDS_START_SYNTHESIS_TEXT_EMPTY           | 合成文本为空    |
| BDS_START_SYNTHESIS_TEXT_TOO_LONG        | 和成文本过长    |
| BDS_START_SYNTHESIS_ENGINE_BUSY          | 合成引擎繁忙    |
| BDS_START_SYNTHESIS_MALLOC_ERROR         | 获取资源失败    |
| BDS_START_SYNTHESIS_NO_NETWORK           | 无网络连接     |
| BDS_START_SYNTHESIS_NO_VERIFY_INFO       | 无授权信息     |
| BDS_START_SYNTHESIS_OFFLINE_ENGINE_NOT_LOADED | 离线合成引擎未加载 |

### 合成错误

合成错误用BDSSynthesisError类型表示，具体如下：

| 参数                                       | 含义        |
| :--------------------------------------- | :-------- |
| BDS_UNKNOWN_ERROR                        | 未知错误      |
| BDS_PLAYER_FAILED_GET_STREAM_PROPERTIES  | 获取流属性失败   |
| BDS_PLAYER_FAILED_OPEN_DEVICE            | 打开设备失败    |
| BDS_PLAYER_FAILED_OPEN_STREAM            | 打开流失败     |
| BDS_PLAYER_ALLOC_FAIL                    | 资源申请失败    |
| BDS_PLAYER_BAD_STREAM                    | 音频流错误     |
| BDS_ONLINE_TTS_CONNECT_ERROR             | 在线连接错误    |
| BDS_ONLINE_TTS_RESPONSE_PARSE_ERROR      | 在线解析错误    |
| BDS_ONLINE_TTS_PARAM_ERROR               | 在线参数错误    |
| BDS_ONLINE_TTS_TEXT_ENCODE_NOT_SUPPORTED | 文本编码格式不支持 |
| BDS_ONLINE_TTS_VERIFY_ERROR              | 在线鉴权错误    |
| BDS_ONLINE_TTS_GET_ACCESS_TOKEN_FAILED   | 获取token失败 |
| BDS_ETTS_ERR_PARTIAL_SYNTH               | 离线部分合成错误  |
| BDS_ETTS_ERR_CONFIG                      | 离线配置错误    |
| BDS_ETTS_ERR_RESOURCE                    | 离线资源错误    |
| BDS_ETTS_ERR_HANDLE                      | 离线句柄错误    |
| BDS_ETTS_ERR_PARMAM                      | 离线参数错误    |
| BDS_ETTS_ERR_MEMORY                      | 离线内存错误    |
| BDS_ETTS_ERR_TOO_MANY_TEXT               | 离线文本过长    |
| BDS_ETTS_ERR_RUN_TIME                    | 离线运行时错误   |
| BDS_ETTS_ERR_NO_TEXT                     | 离线空文本错误   |
| BDS_ETTS_ERR_LICENSE                     | 离线授权错误    |



# 完整示例

## 语音合成完整示例

```objective-c
// 设置apiKey和secretKey
[[BDSSpeechSynthesizer sharedInstance] setApiKey:@"your API key" withSecretKey:@"your secret key"];

    // 设置离线引擎
    NSString *ChineseSpeechData = [[NSBundle mainBundle] pathForResource:@"Chinese_Speech_Female" ofType:@"dat"];
    NSString *ChineseTextData = [[NSBundle mainBundle] pathForResource:@"Chinese_text" ofType:@"dat"];
    NSString *EnglishSpeechData = [[NSBundle mainBundle] pathForResource:@"English_Speech_Female" ofType:@"dat"];
    NSString *EnglishTextData = [[NSBundle mainBundle] pathForResource:@"English_text" ofType:@"dat"];
    NSString *LicenseData = [[NSBundle mainBundle] pathForResource:@"bdtts_license" ofType:@"dat"];
    NSError* loadErr = [[BDSSpeechSynthesizer sharedInstance] startTTSEngine:ChineseTextData                                    speechDataPath:ChineseSpeechData
licenseFilePath:LicenseData withAppCode:@""];

    if(loadErr != nil)
    {
        // 处理出错状况
    }
    
    // 加载英文资源
    loadErr = [[BDSSpeechSynthesizer sharedInstance] loadEnglishData:EnglishTextData speechData:EnglishSpeechData];
    if(loadErr != nil)
    {
        // 处理出错状况
    }
	
	// 获得合成器实例
    [[BDSSpeechSynthesizer sharedInstance] setSynthesizerDelegate:self];
	
	// 设置委托对象
	[[BDSSpeechSynthesizer sharedInstance] setSynthesizerDelegate:self];
	
	// 开始合成并播放
	NSError* speakError = nil;
	if([[BDSSpeechSynthesizer sharedInstance] speakSentence:@"您好" withError:&speakError] == -1){
		// 错误
		NSLog("错误: %ld, %@", (long)speakError.code, speakError.localizedDescription);
	}
	if([[BDSSpeechSynthesizer sharedInstance] speakSentence:@"今天天气真不错" withError:&speakError] == -1){
		// 错误
		NSLog("错误: %ld, %@", (long)speakError.code, speakError.localizedDescription);
	}
	if([[BDSSpeechSynthesizer sharedInstance] speakSentence:@"Today's weather is really good!" withError:&speakError] == -1){
		// 错误
		NSLog("错误: %ld, %@", (long)speakError.code, speakError.localizedDescription);
	}
	
	
	- (void)synthesizerStartWorkingSentence:(NSInteger)SynthesizeSentence
{
    NSLog(@"Began synthesizing sentence %ld", (long)SynthesizeSentence);
}

- (void)synthesizerFinishWorkingSentence:(NSInteger)SynthesizeSentence
{
    NSLog(@"Finished synthesizing sentence %ld", (long)SynthesizeSentence);
}

- (void)synthesizerSpeechStartSentence:(NSInteger)SpeakSentence
{
    NSLog(@"Began playing sentence %ld", (long)SpeakSentence);
}

- (void)synthesizerSpeechEndSentence:(NSInteger)SpeakSentence
{
    NSLog(@"Finished playing sentence %ld", (long)SpeakSentence);
}
```
