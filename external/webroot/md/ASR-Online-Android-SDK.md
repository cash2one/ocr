# 简介

## 概念解释

对本文中将提到的名词约定如下：

**语音识别（Automatic Speech Recognition，ASR）**：也被称为自动语音识别，其目标是将人类的语音中的词汇内容转换为计算机可读的输入，例如按键、二进制编码或者字符序列。

**自然语言理解（Natural Language Understanding，NLU）**： 俗称人机对话，人工智能的分支学科。研究用电子计算机模拟人的语言交际过程，使计算机能理解和运用人类社会的自然语言如汉语、英语等，实现人机之间的自然语言通信，以代替人的部分脑力劳动，包括查询资料、解答问题、摘录文献、汇编资料以及一切有关自然语言信息的加工处理。

**语音SDK（Baidu Voice Recognition Client， BDVRClient）**：即百度语音在线识别SDKAndroid版开发包， BDVRClient是一个封装了语音采集、处理、网络收发等功能的语音识别解决方案。使用BDVRClient可以在应用程序中快速集成语音识别功能。

## 功能介绍

BDVRClient是运行在Android 平台的一体化语音识别解决方案，以JAR包 + SO库的形式发布，BDVRClient支持下列功能：

- 语音识别控件：集成提示音、音量反馈动效整套交互的对话框控件，方便开发者快速集成；
- 基本功能：录音，语音数据处理，端点检测、网络通讯和状态通知，返回识别结果；
- 播放提示音：在录音前后播放提示音，优化用户体验；
- 监听语音能量：实时反馈用户当前说话声音能量强度；
- 语义理解：将语音识别成领域相关的语义结果。

## 兼容性

- 系统：支持Android 2.3（API Level 9）及以上系统。需要开发者通过minSdkVersion来保证支持系统的检测。
- 机型：手机和平板均可。
- 构架：支持ARM平台、x86平台。
- 硬件要求：要求设备上有麦克风。
- 网络：支持WIFI及移动网络，支持2G、3G、4G移动网络。

## 开发包说明

| 文件/文件夹名                  | 说明                                      |
| :----------------------- | :-------------------------------------- |
| /libs/                   | 语音识别SDK lib库，包括各平台的SO库及Jar，SO库开发者可以按需集成 |
| /res/raw/                | 语音识别对话框音效文件，如果不使用对话框可以不集成               |
| /docs/                   | JAVADOC                                 |
| 百度语音在线识别SDK Android版开发手册 | 本手册                                     |
| 百度语义解析协议                 | 语义理解意图表示说明                              |
| /VoiceRecognitionDemo/   | Demo工程                                  |


# 集成指南

本章将讲解如何快速地集成BDVRClient到现有应用中。一个完整的Demo请参考开发包中的示例程序VoiceRecognitionDemo。

## 创建应用

请参考《百度语音开放平台使用指南》创建应用，开通服务并完成个性化设置。

## 添加BDVRClient到工程

将开发包中的libs目录整体拷贝到工程目录，libs目录包含了各平台的so库，开发者视应用需要可以进行删减。galaxy.jar是百度Android公共基础库，如果项目中还集成了其它百度SDK，如百度地图SDK，在打包过程中出现类似如下的错误信息：

```java
[2015-10-22 11:02:57 - Dex Loader] Unable to execute dex: Multiple dex files define Lcom/baidu/android/common/logging/Configuration;
[2015-10-22 11:02:57 - VoiceRecognitionDemo] Conversion to Dalvik format failed: Unable to execute dex: Multiple dex files define Lcom/baidu/android/common/logging/Configuration;
```

请将此Jar包移除。

将开发包中的res目录整体拷贝到工程目录，此文件夹中包含语音识别对话框的音效文件，如果不使用可以忽略。

## 添加权限

在工程AndroidManifest.xml文件中添加如下权限：

```xml
<uses-permissionandroid:name="android.permission.RECORD_AUDIO"/>
<uses-permissionandroid:name="android.permission.ACCESS_NETWORK_STATE"/>
<uses-permissionandroid:name="android.permission.ACCESS_WIFI_STATE"/>
<uses-permissionandroid:name="android.permission.INTERNET"/>
<uses-permissionandroid:name="android.permission.READ_PHONE_STATE"/>
```

各权限含义说明：

| 名称                                      | 用途                        |
| :-------------------------------------- | :------------------------ |
| android.permission.RECORD_AUDIO         | 允许应用使用麦克风录音               |
| android.permission.INTERNET             | 允许应用联网，发送语音数据至服务器，获得识别结果。 |
| android.permission.ACCESS_NETWORK_STATE | 获取当前的网络状态，优化录音及网络参数。      |
| android.permission.ACCESS_WIFI_STATE    | 获取当前wifi状态，优化录音及网络参数      |
| android.permission.READ_PHONE_STATE     | 获取用户手机的IMEI，用来唯一的标识用户。    |

## Proguard配置

如果应用配置了代码混淆，需要在Proguard配置文件增加以下参数：

```java
-keep class com.baidu.android.**{*;}
-keep class com.baidu.voicerecognition.android.**{*;}
```


# 重要接口说明

## 识别器

识别器，类名VoiceRecognitionClient，主要用来控制识别进程：设置参数，开始，结束，取消等。

### 创建对象

- **说明**

  识别器仅支持单例模式，同一时刻只有开启一次识别，已经添加同步机制，线程安全。

- **方法**

```java
public VoiceRecognitionClient getInstance(Context context)
```

- **参数**

| 名称      | 描述    |
| :------ | :---- |
| context | 上下文环境 |

- **返回**

  识别器单例对象。

### 设置授权

- **说明**

  传入创建应用信息时获得的key值，用于注册使用语音服务。

- **方法**

```java
public void setTokenApis (String apiKey, String secretKey)
```

- **参数**

| 名称        | 描述                    |
| :-------- | :-------------------- |
| apiKey    | 开发者在开放平台上注册的apiKey    |
| secretKey | 开发者在开放平台上注册的secretKey |

- **返回**

  无。

### 开始识别

- **说明**

  传入发起本次识别时的配置参数，用于确定该次识别的采样率、识别垂类等。

- **方法**

```java
public int startVoiceRecognition(final VoiceClientStatusChangeListener listener, VoiceRecognitionConfig config)
```

- **参数**

| 名称       | 描述   |
| :------- | :--- |
| listener | 监听器  |
| config   | 配置文件 |

- **返回**

  错误码。

### 说话结束

- **说明**

  说话结束，调用此接口后，将停止录音，但是已有录音数据将持续识别，直到结果返回。

- **方法**

```java
public void speakFinish ()
```

- **参数**

  无。

- **返回**

  无。

### 停止识别

- **说明**

  停止本次识别，调用此接口后，讲停止录音并停止识别，如果有录音数据正在识别，也将被丢弃。

- **方法**

```java
public void stopVoiceRecognition ()
```

- **参数**

  无。

- **返回**

  无。

### 释放对象

- **说明**

  释放语音识别器对象及其所占用的资源。

- **方法**

```java
public void releaseInstance ()
```

- **参数**

  无。

- **返回**

  无。

## 识别参数配置器

识别参数配置器，类名VoiceRecognitionConfig，主要用来设置各种识别参数。

### 创建识别参数配置器

- **说明**

  创建识别参数配置器，该配置器将用于传入识别参数。

- **方法**

```java
public VoiceRecognitionConfig()
```

- **参数**

  无。

- **返回**

  识别参数配置器对象。

### 设置采样率

- **说明**

  设置音频数据的采样率，支持8000和16000两种。

- **方法**

```java
public void setSampleRate(int rate)
```

- **参数**

| 名称   | 描述   |
| :--- | :--- |
| rate | 采样率  |

- **返回**

  无。

### 启用语音识别开始音效

- **说明**

  启用语音识别开始音效，参数为音效文件的资源ID。

- **方法**

```java
public void enableBeginSoundEffect(int soundResourceId)
```

- **参数**

| 名称              | 描述        |
| :-------------- | :-------- |
| soundResourceId | 音效文件的资源ID |

- **返回**

  无。

### 禁用语音识别开始音效

- **说明**

  禁用语音识别开始音效。

- **方法**

```java
public void disableBeginSoundEffect()
```

- **参数**

  无。

- **返回**

  无。

### 启用语音识别结束音效

- **说明**

  禁用语音识别开始音效。

- **方法**

```java
public void enableEndSoundEffect(int soundResourceId)
```

- **参数**

| 名称              | 描述        |
| :-------------- | :-------- |
| soundResourceId | 音效文件的资源ID |

- **返回**

  无。

### 禁用语音识别结束音效

- **说明**

  禁用语音识别结束音效。

- **方法**

```java
public void disableEndSoundEffect()
```

- **参数**

  无。

- **返回**

  无。

### 禁用标点符号

- **说明**
 
  禁用标点符号。

- **方法**

```java
public void disablePunctuation()
```

- **参数**

  无。

- **返回**

  无。

### 启用语义理解

- **说明**

  启用语义理解功能。

- **方法**

```java
public void enableNLU()
```

- **参数**

  无。

- **返回**
 
  无。

### 启用通讯录识别

- **说明**

  启用通讯录识别。注意：在启用通讯录识别前要求先上传通讯录。

- **方法**

```java
public void enableContacts()
```

- **参数**

  无。

- **返回**

  无。

### 设置垂直领域

- **说明**
- 
  设置识别的垂直领域，正确设置该领域有助于提高识别率，支持同时设置多个垂直领域，也支持只设置一个垂直领域，可以根据实际情况自行选择。

- **返回**

  无。

- **方法1**

```java
public void setProp(int[] arrayProp)
```

- **参数**

| 名称        | 描述     |
| :-------- | :----- |
| arrayProp | 识别垂类数组 |

- **方法2**

```java
public void setProp(int prop)
```

- **参数**

| 名称   | 描述   |
| :--- | :--- |
| prop | 识别垂类 |

### 设置资源类型

- **说明**

  设置资源类型，主要用于区别后处理方式。

- **方法**

```java
public void setResourceType(int type)
```

- **参数**

| 名称   | 描述   |
| :--- | :--- |
| type | 资源类型 |

- **返回**

  无。

### 设置是否使用缺省的录音

- **说明**

  设置是否使用缺省的录音。

- **方法**

```java
public void setUseDefaultAudioSource(boolean useDefaultSource)
```

- **参数**

| 名称               | 描述                |
| :--------------- | :---------------- |
| useDefaultSource | true：使用；false：不使用 |

- **返回**

  无。

### 设置语种

- **说明**

  设置识别的语种。

- **方法**

```java
public void setLanguage(String language)
```

- **参数**

| 名称       | 描述   |
| :------- | :--- |
| language | 语种   |

- **返回**

  无。

## 识别状态监听器

识别状态监听器，类名VoiceClientStatusChangeListener，是识别状态监听器接口，开发者可以通过实现此接口对识别状态做监听。

### 更新识别状态变化

- **说明**

  识别状态变化的回调函数。

- **方法**

```java
void onClientStatusChange(int status, Object obj)
```

- **参数**

| 名称     | 描述         |
| :----- | :--------- |
| status | 识别状态       |
| obj    | 识别状态下的返回对象 |

- **返回**

  无。

### 更新网络状态变化

- **说明**

  网络状态变化的回调函数，该函数为保留接口，暂未使用。

- **方法**

```java
void onNetworkStatusChange(int status, Object obj)
```

- **参数**

| 名称     | 描述         |
| :----- | :--------- |
| status | 网络状态       |
| obj    | 网络状态下的返回对象 |

- **返回**

  无。

### 出错

- **说明**

  出错时的回调函数。

- **方法**

```java
void onError(int type, Object errorCode)
```

- **参数**

| 名称        | 描述   |
| :-------- | :--- |
| type      | 错误类型 |
| errorCode | 错误码  |

- **返回**

  无。

## 语音识别对话框

使用百度语音在线识别SDK中默认的对话框，可以方便快捷地使用百度语音识别功能。开发者只需要在创建对话框中传入合适的参数，之后注册对话框监听器来接收识别结果即可。

### 创建对话框

- **说明**

  创建一个语音识别的对话框，创建对话框前需要对要传给对话框的参数做设置。

- **方法**

```java
public BaiduASRDialog(Context context, Bundle params)
```

- **参数**

| 名称      | 描述      |
| :------ | :------ |
| context | 应用上下文环境 |
| params  | 参数      |

- **返回**

  百度语音识别对话框实例。

### 设置对话框监听器

- **说明**

  设置百度语音识别对话框的监听器。

- **方法**

```java
public void setDialogRecognitionListener(DialogRecognitionListener listener)
```

- **参数**

| 名称       | 描述   |
| :------- | :--- |
| listener | 监听器  |

- **返回**

  无。

### 获取识别结果

- **说明**

  百度语音识别对话框监听器用来获取识别结果的回调函数。

- **方法**

```java
public void onResults(Bundle results)
```

- **参数**

| 名称      | 描述   |
| :------ | :--- |
| results | 识别结果 |

- **返回**

  无。


# 参数和错误码说明

## 识别器参数说明

### 采样率

采样率是在录制音频时需要用到的参数，目前支持的类型如下：

| 参数              | 含义       |
| --------------- | -------- |
| SAMPLE_RATE_8K  | 8000采样率  |
| SAMPLE_RATE_16K | 16000采样率 |

### 语种或方言

可以通过设置语种或方言，支持不同地域的人做语音识别，支持类型如下：

| 参数                 | 含义    |
| ------------------ | ----- |
| LANGUAGE_CHINESE   | 中文普通话 |
| LANGUAGE_CANTONESE | 中文粤语  |
| LANGUAGE_SICHUAN   | 中文四川话 |
| LANGUAGE_ENGLISH   | 英语    |

### 语言模型垂类

在不同的应用场景下使用对应的语言模型垂类，可以有效提升识别率。目前支持的语音模型垂类如下：

| 参数             | 含义   |
| -------------- | ---- |
| PROP_MUSIC     | 音乐   |
| PROP_VIDEO     | 视频   |
| PROP_APP       | 应用   |
| PROP_WEB       | 网页   |
| PROP_SEARCH    | 热词   |
| PROP_SHOPPING  | 购物   |
| PROP_HEALTH    | 健康   |
| PROP_PHONE     | 电话   |
| PROP_SONG      | 歌曲   |
| PROP_MEDICAL   | 医疗   |
| PROP_CAR       | 汽车   |
| PROP_CATERING  | 餐饮   |
| PROP_FINANCE   | 金融   |
| PROP_GAME      | 游戏   |
| PROP_RECIPES   | 菜谱   |
| PROP_ASSISTANT | 助手   |
| PROP_MAP       | 地图   |
| PROP_INPUT     | 输入   |

## 开始识别返回错误码说明

| 参数                              | 含义           |
| ------------------------------- | ------------ |
| START_WORK_RESULT_WORKING       | 正常启动就绪，可以识别  |
| START_WORK_RESULT_NET_UNUSABLE  | 网络不可用，无法识别   |
| START_WORK_RESULT_NULL_LISTENER | 监听器位空，无法识别   |
| START_WORK_RESULT_RECOGNITING   | 正在识别，不能开始新任务 |
| START_WORK_RESULT_RELEASED      | 单例已被释放，不能识别  |

## 出错回调返回错误码说明

| 参数                                  | 含义           |
| ----------------------------------- | ------------ |
| ERROR_CLIENT_UNKNOWN                | 未知错误         |
| ERROR_CLIENT_NO_SPEECH              | 没有检测到语音      |
| ERROR_CLIENT_TOO_SHORT              | 语音太短         |
| ERROR_CLIENT_WHOLE_PROCESS_TIMEOUT  | 识别超时         |
| ERROR_RECORDER_UNAVAILABLE          | 录音设备不可用      |
| ERROR_RECORDER_INTERCEPTED          | 录音被中断        |
| ERROR_NETWORK_UNUSABLE              | 网络不可用        |
| ERROR_NETWORK_CONNECT_ERROR         | 网络连接失败       |
| ERROR_NETWORK_PARSE_ERROR           | 解析错误         |
| ERROR_SERVER_PARAMETER_ERROR        | 参数错误         |
| ERROR_SERVER_BACKEND _ERROR         | 后端错误         |
| ERROR_SERVER_RECOGNITION_ERROR      | 识别错误         |
| ERROR_SERVER_INVALID_APP_NAME_ERROR | 鉴权失败         |
| ERROR_SERVER_SPEECH_QUALITY_ERROR   | 语音质量未达标，无法识别 |
| ERROR_SERVER_SPEECH_TOO_LONG_ERROR  | 语音过长         |

## 语音识别对话框参数说明

| 参数                       | 说明              | 取值        |
| ------------------------ | --------------- | --------- |
| PARAM_API_KEY            | 用户申请的api_key    | 用户从语音官网申请 |
| PARAM_SECRET_KEY         | 用户申请的secret_key | 用户从语音官网申请 |
| PARAM_PROP               | 语言模型垂类选择（单个）    | 参见4.1.3   |
| PARAM_PROP_ARRAY         | 语言模型垂类选择（数组）    | 参见4.1.3   |
| PARAM_VAD_LIB            | vad类型选择         | MFE或LWVAD |
| PARAM_LANGUAGE           | 语种选择            | 参见4.1.2   |
| PARAM_PROPMT_TEXT        | 提示语             | 用户可自定义    |
| PARAM_TIPS_TONE_ENABLE   | 是否启用过程提示音       | 1/0：使用/弃用 |
| PARAM_START_TONE_ENABLE  | 是否启用开始提示音       | 1/0：使用/弃用 |
| PARAM_END_TONE_ENABLE    | 是否启用结束提示音       | 1/0：使用/弃用 |
| PARAM_CONTACTS_ENABLE    | 是否使用通讯录         | 1/0：使用/弃用 |
| PARAM_PUNCTUATION_ENABLE | 是否使用标点符号        | 1/0：使用/弃用 |
| PARAM_NLU_ENABLE         | 是否使用语义解析        | 1/0：使用/弃用 |
| PARAM_IS_VAD             | 是否使用vad         | 1/0：使用/弃用 |
| PARAM_IS_COMPRESS        | 是否使用压缩          | 1/0：使用/弃用 |



# 完整示例

## 自调用接口方式示例

```java
// 重写监听器
class MyVoiceRecogListener implements VoiceClientStatusChangeListener {
    public void onClientStatusChange(int status, Object obj) {
        // 处理识别状态变化
    }

    public void onError(int errorType, int errorCode) {
        // 处理出错异常
    }

    public void onNetworkStatusChange(int status, Object obj) {
        // 处理网络状态变化
    }
}
// 获取识别器对象
VoiceRecognitionClient mASREngine = VoiceRecognitionClient.getInstance(this);
// 获取授权
mASREngine.setTokenApis(Constants.API_KEY, Constants.SECRET_KEY);
// 获得参数配置对象
VoiceRecognitionConfig config = new VoiceRecognitionConfig();
// 为识别器绑定监听器
MyVoiceRecogListener mListener = new MyVoiceRecogListener();
// 开始识别
int code = mASREngine.startVoiceRecognition(mListener, config);
// 判断是否正常开始
if (code != VoiceRecognitionClient.START_WORK_RESULT_WORKING) {
    // 处理出错异常
}
```

## 语音识别对话框模式示例

```java
// 识别结果
final String recognition_result = "";
// 参数，其中apiKey和secretKey为必须配置参数，其他根据实际需要配置
Bundle params = new Bundle();
// 配置apkKey
params.putString(BaiduASRDigitalDialog.PARAM_API_KEY, your_api_key);
// 配置secretKey
params.putString(BaiduASRDigitalDialog.PARAM_SECRET_KEY, your_secret_key);
// 创建百度语音识别对话框
BaiduASRDigitalDialog mDialog = new BaiduASRDigitalDialog(this, params);
// 设置对话框回调监听器
mDialog.setDialogRecognitionListener(new DialogRecognitionListener(){
	// 识别结果处理函数
	public void onResults(Bundle arg0) {
		ArrayList<String> rs = results != null ? results
                .getStringArrayList(RESULTS_RECOGNITION) : null;
        if (rs != null && rs.size() > 0) {
            recognition_result = rs.get(0);
        }
	}
	
});
// 显示对话框
mDialog.show();
```