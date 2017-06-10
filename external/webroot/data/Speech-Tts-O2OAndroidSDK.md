# 简介

## 概念解释

语音合成是实现人机语音交互，建立一个有听和讲能力的交互系统所必需的关键技术。随着语音技术的发展，百度自主研发了语音合成系统（TTS），功能是接收用户发送的文本，生成语音发送给用户。
对本文中将提到的名词约定如下：

**语音合成（Text To Speech，TTS）**：将文本合成为语音，即声音文件。

**合成引擎**：将文本合成为语音的核心模块。

**百度语音合成SDK（BDTTSClient）**：本开发包。BDTTSClient是一个封装了网络首发、音频播放功能的语音合成解决方案。借助BDTTSClient可以在应用程序中快速集成语音合成功能。

## 功能介绍

百度语音合成客户端Android版SDK是一种面向Android移动设备的语音合成解决方案，以JAR包 + SO库的形式发布。目前版本已支持SDK内部直接播放合成语音和从SDK获取语音数据，并支持男女声、语速、音调、音量、音频码率设置，后续版本讲支持更多参数设置（最新信息请参见百度语音官网）。

## 兼容性

系统：支持Android 2.3（API Level 9）及以上系统。需要开发者通过minSdkVersion来保证支持系统的检测。

机型：手机和平板均可。

构架：支持arm64-v8a，armeabi，armeabi-v7a，x86，x86_64。

网络：支持WIFI及移动网络，支持2G、3G、4G移动网络。

## 开发包说明

| 文件（夹）名                        | 说明                          |
| :---------------------------- | :-------------------------- |
| doc/百度语音离在线合成Android版开发手册.pdf | 本文档                         |
| doc/javaDoc                   | Javadoc                     |
| libs                          | 语音合成SDK Lib库，包括各平台的so库及Jar包 |
| BaiduTtsSample                | 开发示例(Eclipse project)       |
| data                          | 语音合成资源文件                    |
| license                       | 授权文件                        |


# 集成指南

本章将讲解如何快速地集成BDTTSClient到现有应用中。

## 创建应用

请参考《百度语音开放平台使用指南》创建应用，开通服务并完成个性化设置。

## 添加BDTTSClient到工程

将开发包中的libs目录整体拷贝到工程目录，libs目录包含了各平台的so库，开发者视应用需要可以进行删减。galaxy_lite.jar是百度Android公共基础库，如果项目中还集成了其它百度SDK，如Push.jar，在打包过程中出现类似如下的错误信息：

```java
[2015-10-22 11:02:57 - Dex Loader] Unable to execute dex: Multiple dex files define Lcom/baidu/android/common/logging/Configuration;
[2015-10-22 11:02:57 - BaiduTtsSample] Conversion to Dalvik format failed: Unable to execute dex: Multiple dex files define Lcom/baidu/android/common/logging/Configuration;
```

请将此Jar包移除。

如果Eclipse ADT版本插件低于17，需要手工添加依赖库，添加方法为：Project => Properties => Java Build Path => Libraries => Add JAR...。

## 添加语音合成资源文件

将开发包中的data目录下的dat文件放到某一可读路径下，以便设置资源文件参数时使用。

## 添加权限

在工程AndroidManifest.xml文件中添加如下权限：

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_SETTINGS" />
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
```
各权限含义说明：

| 名称                                       | 用途                     |
| :--------------------------------------- | :--------------------- |
| android.permission. INTERNET             | 允许应用联网                 |
| android.permission. ACCESS_NETWORK_STATE | 获取当前网络状态               |
| android.permission.READ_EXTERNAL_STORAGE | 读外部存储                  |
| android.permission.WRITE_EXTERNAL_STORAGE | 写外部存储                  |
| android.permission. WRITE_SETTINGS       | 允许程序读取或写入系统设置          |
| android.permission.READ_PHONE_STATE      | 允许程序读取手机状态             |
| android.permission. MODIFY_AUDIO_SETTINGS | 允许程序修改全局声音设置权限         |
| android.permission. ACCESS_WIFI_STATE    | 允许应用程序获取WIFI状态         |
| android.permission.CHANGE_WIFI_STATE     | 允许应用程序改变WI-FI网络链接状态的权限 |

## Proguard配置

请不要混淆sdk的jar包。

# 重要接口说明

## 合成器

合成器，类名SpeechSynthesizer，主要用来控制合成进程：设置参数，开始，结束，取消等。

### 创建对象

- **说明**

  获取语音合成引擎实例。

- **方法**

```java
public SpeechSynthesizer getInstance()
```

- **参数**

  无。

- **返回**

  语音合成引擎实例。

### 设置Context

- **说明**

  设置语音合成实例的上下文环境。

- **方法**

```java
public void setContext(Context context)
```

- **参数**

| 名称      | 描述    |
| :------ | :---- |
| context | 上下文信息 |


- **返回**

  无。

### 设置监听器

- **说明**
  设置语音合成监听器，回调合成和播放进度以及错误信息。

- **方法**

```java
public void setSpeechSynthesizerListener(SpeechSynthesizerListener speechSynthesizerListener)
```

- **参数**

| 名称                        | 描述      |
| :------------------------ | :------ |
| SpeechSynthesizerListener | 语音合成监听器 |


- **返回**

  无。

### 初始化TTS引擎

- **说明**

  初始化合成引擎，可以指定使用online在线，或者mix离在线混合引擎. mix混合引擎会在online在线不能用的情况下自动使用offline离线引擎。

- **方法**

```java
public int initTts(TtsMode ttsMode)
```

- **参数**

| 名称      | 描述                               |
| :------ | :------------------------------- |
| ttsMode | 引擎选择（online是纯在线合成引擎，Mix是离在线混合引擎） |

- **返回**

  [错误码](#错误码说明)。

### 获取版本信息

- **说明**

  获取当前的SDK版本信息。

- **方法**

```java
public String libVersion()
```

- **参数**

  无。

- **返回**

  版本信息。

### 设置在线授权

- **说明**

  设置在线授权时需要用到的apiKey和secretKey，关系到在线合成是否可用。

- **方法**

```java
public int setApiKey(String apiKey, String secretKey)
```

- **参数**

| 名称        | 描述                  |
| :-------- | :------------------ |
| apiKey    | 开放平台注册app的apiKey    |
| secretKey | 开放平台注册app的secretKey |

- **返回**

  [错误码](#错误码说明)。

### 设置离线授权

- **说明**

  设置离线授权所需要的AppId，关系到离线合成是否可用。

- **方法**

```java
public int setAppId(String appId)
```

- **参数**

| 名称    | 描述              |
| :---- | :-------------- |
| appId | 开放平台注册app的appId |

- **返回**

  [错误码](#错误码说明)。

### 设置参数

- **说明**

  设置TTS参数。

- **方法**

```java
public int setParam(String key, String value)
```

- **参数**

| 名称    | 描述   |
| :---- | :--- |
| key   | 参数的键 |
| value | 参数的值 |

- **返回**

  错误码。

### 设置播放器的音频流类型

- **说明**

  设置播放器的音频流类型。

- **方法**

```java
public int setAudioStreamType(int streamType)
```

- **参数**

| 名称         | 描述    |
| :--------- | :---- |
| streamType | 音频流类型 |

- **返回**

  错误码。

### 暂停任务

- **说明**

  暂停当前的TTS任务。

- **方法**

```java
public int pause()
```

- **参数**

  无

- **返回**

  错误码。

### 恢复任务

- **说明**

  恢复暂停的TTS任务。

- **方法**

```java
public int resume()
```

- **参数**

  无

- **返回**

  错误码。

### 停止任务

- **说明**

  停止所有的TTS任务。

- **方法**

```java
public int stop()
```

- **参数**

  无

- **返回**
 
  错误码。

### 释放TTS资源

- **说明**

  释放TTS的资源。

- **方法**

```java
public int release()
```

- **参数**

  无

- **返回**

  错误码。

### 加载离线自定义模型文件

- **说明**

  加载离线自定义模型文件，仅离线引擎可用。

- **方法**

```java
public int loadCustomResource(String customModelPath)
```

- **参数**

| 名称              | 描述        |
| :-------------- | :-------- |
| customModelPath | 自定义模型文件路径 |

- **返回**

  错误码。

### 释放离线自定义模型文件

- **说明**

  释放离线自定义模型文件，仅离线引擎可用。

- **方法**

```java
public int freeCustomResource()
```

- **参数**

  无。

- **返回**

  错误码。

### 切换离线发音人接口

- **说明**

  该接口用来切换离线的发音人（发音人模型文件）。传入对应的要切换的资源文件的绝对路径即可，如果speechModelPath不同，则传入对应的路径；如果textModePath不同，则传入对应的路径，如果相同，则传null即可。该方法必须在initTTS成功后才可调用。如果在调用initTTS之后，离线引擎没有被初始化，该接口会重新初始化离线引擎，并加载模型文件。

- **方法**

```java
public int loadModel(String speechModelPath, String textModelPath)
```

- **参数**

| 名称              | 描述       |
| :-------------- | :------- |
| speechModelPath | 后端模型文件路径 |
| textModelPath   | 前端模型文件路径 |

- **返回**

  错误码。

### 加载英文模型文件

- **说明**

  加载英文模型文件，仅离线引擎可用。

- **方法**

```java
public int loadEnglishModel(String englishTextModelPath, String englishSpeechModelPath)
```

- **参数**

| 名称                     | 描述         |
| :--------------------- | :--------- |
| englishTextModelPath   | 英文前端模型文件路径 |
| englishSpeechModelPath | 英文后端模型文件路径 |

- **返回**

  错误码。

### 合成并播放文本

- **说明**

  合成并播放给定文本，合成并播放功能有多个重载函数，其参数不同，但是返回值相同。

- **返回**

  错误码。

- **方法1：合成并播放文本**

```java
public int speak(String text)
```

- **参数**

| 名称   | 描述                                   |
| :--- | :----------------------------------- |
| text | 要合成的文本（需要合成的文本text的长度不能超过1024个GBK字节） |

- **方法2：可排队的合成并播放**

```java
public int speak(SpeechSynthesizeBag speechSynthesizeBag)
```

- **参数**

| 名称                  | 描述    |
| :------------------ | :---- |
| speechSynthesizeBag | 语音合成包 |

- **方法3：可排队的合成并播放**

```java
public int speak(String text, String utteranceId)
```

- **参数**

| 名称          | 描述                                   |
| :---------- | :----------------------------------- |
| text        | 要合成的文本（需要合成的文本text的长度不能超过1024个GBK字节） |
| utteranceId | 合成文本的ID                              |

- **方法4：可排队的合成并播放，尚未使用**
```java
public int speak(String text, String utteranceId, Bundle params)
```

- **参数**

| 名称          | 描述                                   |
| :---------- | :----------------------------------- |
| text        | 要合成的文本（需要合成的文本text的长度不能超过1024个GBK字节） |
| utteranceId | 合成文本的ID                              |
| params      | 预留参数                                 |

### 合成文本

- **说明**

  合成给定文本，合成文本功能有多个重载函数，其参数不同，但是返回值相同。

- **返回**

  错误码。

- **方法1：合成文本**

```java
public int synthesize(String text)
```

- **参数**

| 名称   | 描述                                   |
| :--- | :----------------------------------- |
| text | 要合成的文本（需要合成的文本text的长度不能超过1024个GBK字节） |

- **方法2：可排队的合成**

```java
public int synthesize (SpeechSynthesizeBag speechSynthesizeBag)
```

- **参数**

| 名称                  | 描述    |
| :------------------ | :---- |
| speechSynthesizeBag | 语音合成包 |

- **方法3：可排队的合成**

```java
public int synthesize(String text, String utteranceId)
```

- **参数**

| 名称          | 描述                                   |
| :---------- | :----------------------------------- |
| text        | 要合成的文本（需要合成的文本text的长度不能超过1024个GBK字节） |
| utteranceId | 合成文本的ID                              |

- **方法4：可排队的合成，尚未使用**

```java
public int synthesize(String text, String utteranceId, Bundle params)
```

- **参数**

| 名称          | 描述                                     |
| :---------- | :------------------------------------- |
| text        | 要合成的文本（注：需要合成的文本text的长度不能超过1024个GBK字节） |
| utteranceId | 合成文本的ID                                |
| params      | 预留参数                                   |

### 批量合成并播放

- **说明**

  批量合成并播放文本文件，一次可传入一个list，这个list会按顺序合成播放。

- **方法**

```java
public int batchSpeak(List<SpeechSynthesizeBag> speechSynthesizeBags)
```

- **参数**

| 名称                   | 描述      |
| :------------------- | :------ |
| speechSynthesizeBags | 语音合成包队列 |

- **返回**

  错误码。

### 授权验证

- **说明**

  授权验证接口。

- **方法**

```java
public int auth(TtsMode ttsMode)
```

- **参数**

| 名称      | 描述     |
| :------ | :----- |
| ttsMode | 语音合成模式 |

- **返回**

  错误码。

## 合成状态监听器

SpeechSynthesizerListener是合成状态监听器接口，开发者可以通过实现此接口对识别状态做监听。

### 合成开始

- **说明**

  合成开始时的回调方法。

- **方法**

```java
void onSynthesizeStart(String utteranceId)
```

- **参数**

| 名称          | 描述      |
| :---------- | :------ |
| utteranceId | 该次表达的标识 |

- **返回**
  无。

### 获取合成数据

- **说明**

  当获取合成数据时调用的方法，合成数据会分多次返回，需自行保存。

- **方法**

```java
void onSynthesizeDataArrived(String utteranceId, byte[] audioData, int progress)
```

- **参数**

| 名称          | 描述      |
| :---------- | :------ |
| utteranceId | 该次表达的标识 |
| audioData   | 返回的合成数据 |
| progress    | 播放文字的进度 |

- **返回**

  无。

### 合成完成状态

- **说明**

  当合成完成时调用的方法。

- **方法**

```java
void onSynthesizeFinish(String utteranceId)
```

- **参数**

| 名称          | 描述      |
| :---------- | :------ |
| utteranceId | 该次表达的标识 |

- **返回**

  无。

### 播放开始状态

- **说明**

  当开始播放时调用的方法。

- **方法**

```java
void onSpeechStart(String utteranceId)
```

- **参数**

| 名称          | 描述      |
| :---------- | :------ |
| utteranceId | 该次表达的标识 |

- **返回**

  无。

### 播放进度状态

- **说明**

  当进度进度改变时调用的方法。

- **方法**

```java
void onSpeechProgressChanged(String utteranceId, int progress)
```

- **参数**

| 名称          | 描述      |
| :---------- | :------ |
| utteranceId | 该次表达的标识 |
| progress    | 播放文字的进度 |

- **返回**

  无。

### 播放完成

- **说明**

  播放完成时调用的方法。

- **方法**

```java
void onSpeechFinish(String utteranceId)
```

- **参数**

| 名称          | 描述      |
| :---------- | :------ |
| utteranceId | 该次表达的标识 |

- **返回**

  无。

### 出错

- **说明**

  出错时的回调函数。

- **方法**

```java
void onError(String utteranceId, SpeechError error)
```

- **参数**

| 名称          | 描述      |
| :---------- | :------ |
| utteranceId | 该次表达的标识 |
| error       | 错误码     |

- **返回**
  无。



# 参数和错误码说明

## 合成器参数设置说明

在调用speak方法开始合成并朗读之前，可以对参数进行配置（未设置的参数将使用默认值），目前支持的类型如下：

| 参数名                       | 默认值                     | 备注                                       |
| :------------------------ | :---------------------- | :--------------------------------------- |
| PARAM_VOLUME              | "5"                     | 中级音量，范围[0-9]                             |
| PARAM_SPEED               | "5"                     | 中速，范围[0-9]                               |
| PARAM_PITCH               | "5"                     | 中调，范围[0-9]                               |
| PARAM_SPEAKER             | "0"                     | 0  (普通女声)                                |
|                           |                         | 1  (普通男声)                                |
|                           |                         | 2  (特别男声)                                |
|                           |                         | 3  (情感男声<度逍遥>)                           |
|                           |                         | 4  (情感儿童声<度丫丫>)                          |
| PARAM_MIX_MODE            | MIX_MODE_DEFAULT        | MIX_MODE_DEFAULT(mix模式下，wifi使用在线合成，非wifi使用离线合成) |
|                           |                         | MIX_MODE_HIGH_SPEED_NETWORK(mix模式下，wifi,4G,3G使用在线合成，其他使用离线合成) |
|                           |                         | MIX_MODE_HIGH_SPEED_SYNTHESIZE(mix模式下，在线返回速度如果慢（超时，一般为1.2秒）直接切换离线，适用于网络环境较差的情况) |
|                           |                         | MIX_MODE_HIGH_SPEED_SYNTHESIZE_WIFI(mix模式下，仅wifi使用在线合成,返回速度如果慢（超时，一般为1.2秒）直接切换离线，适用于仅WIFI网络环境较差的情况) |
| PARAM_AUDIO_ENCODE        | AUDIO_ENCODE_AMR        | AUDIO_ENCODE_BV                          |
|                           |                         | AUDIO_ENCODE_AMR                         |
|                           |                         | AUDIO_ENCODE_OPUS                        |
| PARAM_AUDIO_RATE          | AUDIO_BITRATE_AMR_15K85 | AUDIO_BITRATE_BV_16K                     |
|                           |                         | AUDIO_BITRATE_AMR_6K6                    |
|                           |                         | AUDIO_BITRATE_AMR_8K85                   |
|                           |                         | AUDIO_BITRATE_AMR_12K65                  |
|                           |                         | AUDIO_BITRATE_AMR_14K25                  |
|                           |                         | AUDIO_BITRATE_AMR_15K85                  |
|                           |                         | AUDIO_BITRATE_AMR_18K25                  |
|                           |                         | AUDIO_BITRATE_AMR_19K85                  |
|                           |                         | AUDIO_BITRATE_AMR_23K05                  |
|                           |                         | AUDIO_BITRATE_AMR_23K85                  |
|                           |                         | AUDIO_BITRATE_OPUS_8K                    |
|                           |                         | AUDIO_BITRATE_OPUS_16K                   |
|                           |                         | AUDIO_BITRATE_OPUS_18K                   |
|                           |                         | AUDIO_BITRATE_OPUS_20K                   |
|                           |                         | AUDIO_BITRATE_OPUS_24K                   |
|                           |                         | AUDIO_BITRATE_OPUS_32K                   |
| PARAM_VOCODER_OPTIM_LEVEL | 0                       | 合成引擎速度优化等级，取值范围[0, 2]，值越大速度越快（离线引擎）      |

## 错误码说明

| 错误码值  | 错误码描述                    |
| :---- | :----------------------- |
| -1    | 在线引擎授权失败                 |
| -2    | 在线合成请求失败                 |
| -3    | 在线合成停止失败                 |
| -4    | 在线授权中断异常                 |
| -5    | 在线授权执行时异常                |
| -6    | 在线授权时间超时                 |
| -7    | 在线合成返回错误信息               |
| -8    | 在线授权token为空              |
| -9    | 在线引擎没有初始化                |
| -10   | 在线引擎合成时异常                |
| -100  | 离线引擎授权失败                 |
| -101  | 离线合成停止失败                 |
| -102  | 离线授权下载License失败          |
| -103  | 离线授权信息为空                 |
| -104  | 离线授权类型未知                 |
| -105  | 离线授权中断异常                 |
| -106  | 离线授权执行时异常                |
| -107  | 离线授权执行时间超时               |
| -108  | 离线合成引擎初始化失败              |
| -109  | 离线引擎未初始化                 |
| -110  | 离线合成时异常                  |
| -111  | 离线合成返回值非0                |
| -112  | 离线授权已过期                  |
| -113  | 离线授权包名不匹配                |
| -114  | 离线授权签名不匹配                |
| -115  | 离线授权设备信息不匹配              |
| -116  | 离线授权平台不匹配                |
| -117  | 离线授权的license文件不存在        |
| -200  | 混合引擎离线在线都授权失败            |
| -201  | 混合引擎授权中断异常               |
| -202  | 混合引擎授权执行时异常              |
| -203  | 混合引擎授权执行时间超时             |
| -300  | 合成文本为空                   |
| -301  | 合成文本长度过长（不要超过GBK1024个字节） |
| -302  | 合成文本无法获取GBK字节            |
| -400  | TTS未初始化                  |
| -401  | TTS模式无效                  |
| -402  | TTS合成队列已满（最大限度为1000）     |
| -403  | TTS批量合成文本过多（最多为100）      |
| -404  | TTS停止失败                  |
| -405  | TTS APP ID无效             |
| -406  | TTS被调用方法参数无效             |
| -500  | Context被释放或为空            |
| -600  | 播放器为空                    |
| -9999 | 未知错误                     |



# 完整示例

一个简单的语音合成示例如下所示，请替换相关参数和操作：

```java
public class DemoActivity extends Activity implements SpeechSynthesizerListener {
	// 语音合成客户端
	private SpeechSynthesizer mSpeechSynthesizer;
	
	// Activity的onCreate函数
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		startTTS();
	}
	
	// 初始化语音合成客户端并启动
	private void startTTS() {
		// 获取语音合成对象实例
		mSpeechSynthesizer = SpeechSynthesizer.getInstance();
		// 设置context
		mSpeechSynthesizer.setContext(this);
		// 设置语音合成状态监听器
		mSpeechSynthesizer.setSpeechSynthesizerListener(this);
		// 设置在线语音合成授权，需要填入从百度语音官网申请的api_key和secret_key
		mSpeechSynthesizer.setApiKey("your_api_key", "your_secret_key");
		// 设置离线语音合成授权，需要填入从百度语音官网申请的app_id
		mSpeechSynthesizer.setAppId("your_app_id");
		// 设置语音合成文本模型文件
		mSpeechSynthesizer.setParam(SpeechSynthesizer.PARAM_TTS_TEXT_MODEL_FILE, "your_txt_file_path");
		// 设置语音合成声音模型文件
		mSpeechSynthesizer.setParam(SpeechSynthesizer.PARAM_TTS_SPEECH_MODEL_FILE, "your_speech_file_path");
		// 设置语音合成声音授权文件
		mSpeechSynthesizer.setParam(SpeechSynthesizer.PARAM_TTS_LICENCE_FILE, "your_licence_path");
		// 获取语音合成授权信息
		AuthInfo authInfo = mSpeechSynthesizer.auth(TtsMode.MIX);
		// 判断授权信息是否正确，如果正确则初始化语音合成器并开始语音合成，如果失败则做错误处理
		if (authInfo.isSuccess()) {
			mSpeechSynthesizer.initTts(TtsMode.MIX);
			mSpeechSynthesizer.speak("百度语音合成示例程序正在运行");
		} else {
			// 授权失败
		}
		
	}

	public void onError(String arg0, SpeechError arg1) {
		// 监听到出错，在此添加相关操作
	}

	public void onSpeechFinish(String arg0) {
		// 监听到播放结束，在此添加相关操作
	}

	public void onSpeechProgressChanged(String arg0, int arg1) {
		// 监听到播放进度有变化，在此添加相关操作
	}

	public void onSpeechStart(String arg0) {
		// 监听到合成并播放开始，在此添加相关操作
	}

	public void onSynthesizeDataArrived(String arg0, byte[] arg1, int arg2) {
		// 监听到有合成数据到达，在此添加相关操作
	}

	public void onSynthesizeFinish(String arg0) {
		// 监听到合成结束，在此添加相关操作
	}

	public void onSynthesizeStart(String arg0) {
		// 监听到合成开始，在此添加相关操作
	}
}
```