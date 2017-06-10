# 简介

## 概念解释

对本文中将提到的名词约定如下：

**语音识别（Automatic Speech Recognition，ASR）**：也被称为自动语音识别，其目标是将人类的语音中的词汇内容转换为计算机可读的输入，例如按键、二进制编码或者字符序列。

**自然语言理解（Natural Language Understanding，NLU）**： 俗称人机对话，人工智能的分支学科。研究用电子计算机模拟人的语言交际过程，使计算机能理解和运用人类社会的自然语言如汉语、英语等，实现人机之间的自然语言通信，以代替人的部分脑力劳动，包括查询资料、解答问题、摘录文献、汇编资料以及一切有关自然语言信息的加工处理。

**语音识别SDK离在线融合版（Baidu Voice Recognition Client V2， BDASRv2）**：文中简称为BDASRv2。BDASRv2是一个封装了语音采集、语音预处理、云端识别、离线识别等功能的语音识别解决方案。使用BDASRv2可以快速在应用程序中集成语音识别功能。

## 功能介绍

BDVRClient是运行在Android 平台的一体化语音识别解决方案，以JAR包 + SO库的形式发布，BDVRClient支持下列功能：

- 语音识别控件：集成提示音、音量反馈动效整套交互的对话框控件，方便开发者快速集成；
- 基本功能：录音，语音数据处理，端点检测、网络通讯和状态通知，返回识别结果；
- 播放提示音：在录音前后播放提示音，优化用户体验；
- 监听语音能量：实时反馈用户当前说话声音能量强度；
- 语义理解：将语音识别成领域相关的语义结果。

## 兼容性

**系统：**支持Android 2.3（API Level 9）及以上系统。需要开发者通过minSdkVersion来保证支持系统的检测。

**机型：**手机和平板均可。

**构架：**支持ARM平台（只提供armeabi架构的动态库，可以兼容其他架构）。

**硬件要求：**要求设备上有麦克风。

**网络：**支持WIFI及移动网络，支持2G、3G、4G移动网络。

## 开发包说明

| 文件/文件夹名                          | 说明                             |
| -------------------------------- | ------------------------------ |
| /demo/                           | 语音识别 SDK demo工程                |
| /libs/                           | 包括so库及jar包。                    |
| /res                             | 语音识别对话框资源文件及音效文件，如果不使用对话框可以不集成 |
| /DEMO-VoiceRecognition-2.0.1.apk | Android 示例应用                   |

## 总体框图

![BDVRClient总体使用框图](http://bos.nj.bpc.baidu.com/v1/audio/BDVRClientzongtishiyongkuangtu.png "BDVRClient总体使用框图")

# 集成指南

本章将讲解如何快速地集成BDVRClient到现有应用中。一个完整的Demo请参考开发包中的示例程序VoiceRecognitionDemo。

## 创建应用

请参考《百度语音开放平台使用指南》创建应用，开通服务并完成个性化设置。

## 添加BDVRClient到工程

将开发包中的libs和res目录分别合并到工程目录的libs和res目录。

## 配置AndroidManifest.xml

AndroidManifest.xml配置主要内容为：增加权限，填写鉴权信息，注册语音服务，注册对话框。具体示例如下：


```xml
	...
    <uses-permission android:name="android.permission.RECORD_AUDIO" ></uses>
    <uses-permission android:name="android.permission.INTERNET" ></uses>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" ></uses>
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" ></uses>
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE" ></uses>
    <uses-permission android:name="android.permission.READ_PHONE_STATE" ></uses>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" ></uses>
	...
    <application
        android:icon="@drawable/ic_launcher"
        android:label="@string/app_name">

        <!-- begin: baidu speech sdk-->
		<!-- 请填写应用实际的APP_ID -->
        <meta-data android:name="com.baidu.speech.APP_ID" android:value="your app id"/>
		<!-- 请填写应用实际的API_KEY -->
        <meta-data android:name="com.baidu.speech.API_KEY" android:value="your api key"/>
		<!-- 请填写应用实际的SECRET_KEY -->
        <meta-data android:name="com.baidu.speech.SECRET_KEY" android:value="your api secret"/>
        <service android:name="com.baidu.speech.VoiceRecognitionService" android:exported="false" ></service>
        <activity
                android:name="com.baidu.voicerecognition.android.ui.BaiduASRDigitalDialog"
                android:configChanges="orientation|keyboardHidden|screenLayout"
                android:theme="@android:style/Theme.Dialog"
                android:exported="false"
                android:screenOrientation="portrait">
            <intent-filter>
                <action android:name="com.baidu.action.RECOGNIZE_SPEECH" ></action>
                <category android:name="android.intent.category.DEFAULT" ></category>
            </intent-filter>
        </activity>
        <!-- end : baidu speech sdk-->
		...
	</application>
	...
```

各权限含义说明：

| 名称                                      | 用途                        |
| :-------------------------------------- | :------------------------ |
| android.permission.RECORD_AUDIO         | 允许应用使用麦克风录音               |
| android.permission.INTERNET             | 允许应用联网，发送语音数据至服务器，获得识别结果。 |
| android.permission.ACCESS_NETWORK_STATE | 获取当前的网络状态，优化录音及网络参数。      |
| android.permission.ACCESS_WIFI_STATE    | 获取当前wifi状态，优化录音及网络参数      |
| android.permission.READ_PHONE_STATE     | 获取用户手机的IMEI，用来唯一的标识用户。    |



# 重要接口说明

## 语音识别器

语音识别器SpeechRecognizer，使用谷歌系统框架，函数与使用android自有框架基本相同。

### 创建实例

- **方法**

```java
SpeechRecognizer createSpeechRecognizer(Context context, ComponentName serviceComponent);
```

- **参数**

| 参数               | 含义          |
| :--------------- | :---------- |
| context          | 上下文环境       |
| serviceComponent | 用来提供语音识别的服务 |

- **返回**

  语音识别器。

- **说明**

  创建语音识别器。使用谷歌系统框架，使用百度语音识别只需将serviceComponent指定为百度语音提供的服务即可。

### 设置语音识别监听器

- **方法**

```java
void setRecognitionListener(RecognitionListener listener)
```

- **参数**

| 参数       | 含义   |
| :------- | :--- |
| listener | 监听器  |

- **返回**

  无。

- **说明**

  设置语音识别监听器，语音识别监听器需要实现RecognitionListener中的接口对语音过程和结果做出处理。

### 开始识别

- **方法**

```java
void startListening(Intent recognizerIntent)
```

- **参数**

| 参数               | 含义   |
| :--------------- | :--- |
| recognizerIntent | 识别参数 |

- **返回**

  无。

- **说明**

  所有识别的参数都需要在recognizerIntent中设置。

### 停止录音

- **方法**

```java
void stopListening();
```

- **参数**

  无。

- **返回**

  无。

- **说明**

  停止录音，但是识别将继续。

### 取消识别

- **方法**

```java
void cancel();
```

- **参数**

  无。

- **返回**

  无。

- **说明**

  取消本次识别，已有录音也将不再识别。

### 销毁

- **方法**

```java
void destroy();
```

- **参数**

  无。

- **返回**

  无。

- **说明**

  销毁语音识别器，释放资源。

## 语音识别监听器

语音识别监听器RecognitionListener，该接口包含如下方法回调。

### 准备就绪

- **方法**

```java
void onReadyForSpeech(Bundle params)
```

- **参数**

| 参数     | 含义   |
| :----- | :--- |
| params | 识别参数 |

- **返回**

  无。

- **说明**

  只有当此方法回调之后才能开始说话，否则会影响识别结果。

### 开始说话

- **方法**

```java
void onBeginningOfSpeech()
```

- **参数**

  无。

- **返回**

  无。

- **说明**

  当用户开始说话，会回调此方法。

### 音量变化

- **方法**

```java
void onRmsChanged(float rmsdB)
```

- **参数**

| 参数    | 含义   |
| :---- | :--- |
| rmsdB | 音量值  |

- **返回**

  无。

- **说明**

  引擎将对每一帧语音回调一次该方法返回音量值。

### 获取原始语音

- **方法**

```java
void onBufferReceived(byte[] buffer)
```

- **参数**

| 参数     | 含义      |
| :----- | :------ |
| buffer | pcm语音数据 |

- **返回**

  无。

- **说明**

  此方法会被回调多次，buffer是当前帧对应的PCM语音数据，拼接后可得到完整的录音数据。

### 说话结束

- **方法**

```java
void onEndOfSpeech()
```

- **参数**

  无

- **返回**

  无。

- **说明**

  当用户停止说话后，将会回调此方法。

### 识别出错

- **方法**

```java
void onError(int error)
```

- **参数**

| 参数    | 含义   |
| :---- | :--- |
| error | 错误码  |

- **返回**

  无。

- **说明**

  识别出错，将会回调此方法，调用该方法之后将不再调用onResults方法。

### 识别最终结果

- **方法**

```java
void onResults(Bundle results)
```

- **参数**

| 参数      | 含义   |
| :------ | :--- |
| results | 识别结果 |

- **返回**

  无。

- **说明**

  返回最终识别结果，将会回调此方法。

### 识别临时结果

- **方法**

```java
void onPartialResults(Bundle partialResults)
```

- **参数**

| 参数             | 含义     |
| :------------- | :----- |
| partialResults | 临时识别结果 |

- **返回**

  无。

- **说明**

  返回临时识别结果，将会回调此方法。

### 识别事件返回

- **方法**

```java
void onEvent(int eventType, Bundle params)
```

- **参数**

| 参数        | 含义   |
| :-------- | :--- |
| eventType | 事件类型 |
| eventType | 参数   |

- **返回**

  无。

- **说明**

  返回识别事件，将会回调此方法。



# 参数和错误码说明

## 识别参数

**支持的识别参数**

| 参数名           | 类型     | 值               | 描述                                       |
| ------------- | ------ | --------------- | ---------------------------------------- |
| appid         | int    |                 | 开放平台创建应用后分配，设置后会覆盖 manifest 中配置的 APP_ID  |
| key           | String |                 | 开放平台创建应用后分配，设置后会覆盖 manifest 中配置的 API_KEY |
| secret        | String |                 | 开放平台创建应用后分配，设置后会覆盖 manifest 中配置的SECRET_KEY |
| sample        | int    | -               | 采样率                                      |
|               |        | 16000           |                                          |
|               |        | 8000            | 离线暂不支持                                   |
| sound_start   | int    | 资源ID            | 说话开始的提示音                                 |
| sound_end     | int    | 资源ID            | 说话结束的提示音                                 |
| sound_success | int    | 资源ID            | 识别成功的提示音                                 |
| sound_error   | int    | 资源ID            | 识别出错的提示音                                 |
| sound_cancel  | int    | 资源ID            | 识别取消的提示音                                 |
| infile        | String | 音频源             | **该参数支持设置为：**<br>1. 文件系统路径，如："/sdcard/test/test.pcm"<br>2. java资源路径，如："res:///com/baidu.test/16k_test.pcm"<br>3. 数据源方法全名，格式如："#com.test.Factory.create8kInputStream()"（解释：Factory类中存在一个返回InputStream的方法create8kInputStream()）<br/><br/>注意：必须以#号开始；方法原型必须为：public static InputStream your_method()，而且该方法和类一定不能混淆，否则无法获取音频源。 |
| outfile       | String | 文件路径            | 保存识别过程产生的录音文件                            |
| language      | String | -               | 语种                                       |
|               |        | cmn-Hans-CN     | 中文普通话                                    |
|               |        | sichuan-Hans-CN | 中文四川话（离线暂不支持）                            |
|               |        | yue-Hans-CN     | 粤语（离线暂不支持）                               |
|               |        | en-GB           | 英语（离线暂不支持）                               |
| nlu           | String | -               | 语义解析设置                                   |
|               |        | disable         | 禁用语义解析                                   |
|               |        | enable          | 开启语义解析                                   |
| grammar       | String | -               | 离线识别的语法路径（支持asset目录访问，如:assets:///mygram.bsg） |
|keyword|String|-|语义功能要“砍掉”的前缀词，配合唤醒功能可以实现唤醒+识别一体化。如某次会话中用户说了百度一下明天天气怎么样，将该参数设置为“百度一下”则语义功能将只解析“明天天气怎么样”
|vad|String|-|语音活动检测|
|||search |搜索模式，适合短句输入|
|||input |输入模式，适合短信、微博内容等长句输入|
|~~asr-base-file-path~~|String|文件路径|**2.1版本已被grammar参数取代** ~~支持离线语音识别的基础包，下载方式参见[集成指南]~~|
|~~lm-res-file-path~~|String|文件路径|**2.1版本已被grammar参数取代** ~~支持离线语音识别的附加包，包括输入法和地图资源，下载方式参见[集成指南]~~|
|license-file-path|String|文件路径|可选，支持离线语音识别的授权文件，下载方式参见[集成指南]，如果不设置，将在联网时尝试在线获取|
|slot-data|String|JSON字符串|用于自定义离线识别，具体格式参见demo|
|prop|int|-|垂直领域，**2.1版本后离线功能请使用grammar参数**|
|||20000|输入（离线支持）|
|||10005|热词|
|||10060|地图（~~离线支持~~）|
|||10001|音乐（离线支持）|
|||10002|视频|
|||10003|应用（离线支持）|
|||10004|网页|
|||10006|购物|
|||10007|健康|
|||10008|电话（离线支持）|
|||10052|医疗|
|||10053|汽车|
|||10054|娱乐餐饮|
|||10055|财经|
|||10056|游戏|
|||10057|菜谱|
|||10058|助手|
|||100014|联系人（离线支持）|
|||100016|手机设置（离线支持）|
|||100018|电视指令（离线支持）|
|||100019|播放器指令（离线支持）|
|||100020|收音机指令（离线支持）|
|||100021|命令词（离线支持）|

## 离线识别支持语法说明

本文档列举了离在线融合语音识别离线部分支持的命令说法，并给出示例。说法是由槽组成的，每种命令首先列举出槽，然后说明由这些槽组成的哪些语法。关于槽内内容，如果数量较少，本文档会一一列举出来，如果数量较多，本文档会举出一些例子。具有“包括”字样的就是将所有的列举出来。本文档为了便于理解，同时是为了说明支持的说法，命名和识别出的json结果可能有些出入，请开发者注意。

需要输入法资源文件支持，s_2_InputMethod[下载链接](http://yuyin.baidu.com/asr "下载链接")，支持随便说。

需要地图资源文件支持，s_2_Navi[下载链接](http://yuyin.baidu.com/asr "下载链接")。

### 槽说明（导航）

| 槽名         | 说明                                       |
| ---------- | ---------------------------------------- |
| Cmd_to     | 表示寻找目的地的动词（包括导航，导航到，导航去，出发，走起，我要去，带我去，走，去，上，到，我想去，带我到，现在去，改去） |
| Arrival    | 任意地名                                     |
| Nearby     | 表示附件的介词或者动词（包括附近的，周边的，旁边的，最近的，搜附近的，搜周边的，搜旁边的，搜最近的，我附近的，我周围的，导航去周边的，搜索周边的，我要去周边的，导航去附近的，搜索附近的，我要去附近的，导航去最近的，搜索最近的，我要去最近的） |
| NearbyCore | 表示一类事物的名词，例如加油站，港口等；                     |

### 支持说法

| 支持说法              | 说明举例           |
| ----------------- | -------------- |
| cmd_to Arrival    | 导航到百度大厦        |
| Arrival           | 用户只说地名，例如 百度大厦 |
| Nearby NearbyCore | 附近的 加油站        |


### 槽说明（音乐）

| 槽名      | 说明                                       |
| ------- | ---------------------------------------- |
| PlayCmd | 播放命令（包括播放音乐，放音乐，请播放歌曲，请播放音乐，来一首，我要听，给我来一首 ，播放） |
| song    | 歌曲名称，**需要开发者传入**                         |
| artist  | 歌手名称，**需要开发者传入**                         |
| Tail    | 包括 的歌，的专辑                                |

### 支持说法

| 支持说法           | 说明举例    |
| -------------- | ------- |
| PlayCmd Song   | 播放《小苹果》 |
| PlayCmd Artist | 播放周杰伦的歌 |

### 槽说明（应用）

| 槽名           | 说明               |
| ------------ | ---------------- |
| app          | 应用名称，**需要开发者传入** |
| LaunchCmd    | 包括打开，开启，启动       |
| UnInstallCmd | 包括 删除，卸掉，卸载，删掉；  |


### 支持说法

| 支持说法             | 说明举例          |
| ---------------- | ------------- |
| App              | 直接说应用名称，例如，微信 |
| LaunchCmd App    | 开启 手机百度       |
| UnInstallCmd App | 卸载 360手机助手    |

### 槽说明（打电话/发短信）

| 槽名         | 说明                                       |
| ---------- | ---------------------------------------- |
| name       | 通讯录人名，需要开发者传入                        |
| PhoneNum   | 电话号码                                     |
| Call       | 表示打电话的命令（包括打电话，打个电话，我想打电话，我要打电话，帮我打电话，请打电话，拨号，请拨号，帮我拨号，请帮我拨号 ，我要拨号） |
| CallTo     | 表示“打电话给XXX”的命令（例如，呼叫，拨打，拨号等）；            |
| FirstCmd   | 一些前缀（包括给，我想给，我要给，帮我给，请给，请帮我给）；           |
| LastCmd    | 包括 打电话，打个电话；                             |
| PhoneType  | 号码类型（包括号码前缀，例如，132，188等，包括运营商，例如移动联通电信，包括号码类型，例如，座机，手机，手机号码等） |
| View       | 包括我要看，看一下，我想看，看看，查看；                     |
| ObjectCall | 包括没接通电话，未接来电，已接电话，通话记录；                  |
| Sms        | 表示发短信的命令（例如，发短信，发个短信，等等）；                |
| SmsTo      | 表示“发短信给XXX”的命令（发短信给，我想发给等）；              |
| SmsLastCmd | 包括 发短信，发个短信，发信息，发个信息 ;                   |
| ObjectSms  | 包括 未读短信，已读短信，全部短信；                       |

### 支持说法

| 支持说法                     | 说明举例                           |
| ------------------------ | ------------------------------ |
| Call                     | 表示用户打电话的意图，比如，打电话              |
| CallTo PhoneNum          | 例如 打电话给10086                   |
| CallTo Name              | 例如打电话给张三                       |
| CallTo Name PhoneType    | 例如，打电话给张三的移动号码，打电话给李四的132号码，等； |
| FirstCmd Name LastCmd    | 例如，请给张三打电话；                    |
| View ObjectCall          | 例如，查看未接来电；                     |
| Sms                      | 表示用户打电话的意图，比如，发个短信             |
| SmsTo PhoneNum           | 例如 发短信给10086                   |
| SmsTo Name               | 例如 发短信给张三                      |
| SmsTo Name PhoneType     | 例如发短信给张三的移动号码，发个短信给李四的132号码，等； |
| FirstCmd Name SmsLastCmd | 例如，请给张三发个短信；                   |
| View ObjectSms           | 例如，查看未读短信；                     |

### 槽说明（联系人）

| 槽名        | 说明                                       |
| --------- | ---------------------------------------- |
| View      | 包括我要看，看一下，我想看，看看，查看；                     |
| name      | 通讯录人名，**需要开发者传入**                        |
| PhoneType | 号码类型（包括号码前缀，例如，132，188等，包括运营商，例如移动联通电信，包括号码类型，例如，座机，手机，手机号码等） |
| Create    | 包括新建，添加，增加，加入，加上                         |
| Edit      | 包括编辑，更改，更新，修改；                           |
| Del       | 删除，删掉，去掉；                                |
| Contactor | 联系人                                      |

### 支持说法

| 支持说法                | 说明举例       |
| ------------------- | ---------- |
| View Name PhoneType | 查看张三的移动号码  |
| Create (Contactor)  | 新建（联系人）    |
| Edit Name PhoneType | 更改张三的座机    |
| Del Name PhoneType  | 删除张三的132号码 |


### 槽说明（手机设置）

| 槽名           | 说明                                 |
| ------------ | ---------------------------------- |
| PhoneSetting | 电话设置，包括常用电话设置，包括设定时间，打开wifi等常用设置命令 |

### 支持说法

| 支持说法         | 说明举例 |
| ------------ | ---- |
| PhoneSetting |      |


### 槽说明（电视指令）

| 槽名        | 说明                                 |
| --------- | ---------------------------------- |
| Change    | 换台命令，包括调台，切换，换台，我要跳台，我要切换，我要换台，我要看 |
| Number    | 数字，范围0~999                         |
| TvChannel | 电视台，包括北京电视台等常用电视台；                 |
| Channel   | 包括，频道，台；                           |

### 支持说法

| 支持说法                  | 说明举例      |
| --------------------- | --------- |
| Change Number Channel | 我要看 74 频道 |
| Change TvChannel      | 切换河北卫视    |


### 槽说明（播放器指令）

| 槽名        | 说明                                       |
| --------- | ---------------------------------------- |
| Setplayer | 常用设置命令，包括退出播放，退出，继续播放，继续，暂停播放，暂停，上一首，下一首，设置 |
| Play      | 包括播放，听，观看                                |
| Time      | 表示时间的槽                                   |
| From      | 从                                        |

### 支持说法

| 支持说法           | 说明举例        |
| -------------- | ----------- |
| Setplayer      | 继续播放        |
| From Time Play | 从43分32秒开始播放 |


### 槽说明（收音机指令）

| 槽名         | 说明                          |
| ---------- | --------------------------- |
| OpenCmd    | 常见打开命令，例如，收听电台，听FM，打开AM等    |
| ChangeMode | 用于切换AM/FM的指令，例如，打开FM，切换到AM等 |
| CloseCmd   | 关闭收音机，关机                    |
| Number     | 数字                          |
| Channel    | 频道，电台                       |

### 支持说法

| 支持说法                     | 说明举例       |
| ------------------------ | ---------- |
| OpenCmd                  | 打开电台       |
| CloseCmd                 | 关闭收音机      |
| OpenCmd Number (Channel) | 收听FM八七点五频道 |
| ChangeMode               | 切换到FM      |


### 槽说明（用户命令）

| 槽名          | 说明          |
| ----------- | ----------- |
| usercommand | **需要开发者传入** |

### 支持说法

| 支持说法        | 说明举例 |
| ----------- | ---- |
| usercommand |      |

## 错误码说明

### 通用错误码

| 错误码  | 常量名                            | 描述      |
| ---- | ------------------------------ | ------- |
| 1    | ERROR_NETWORK_TIMEOUT          | 网络超时    |
| 2    | ERROR_NETWORK                  | 网络错误    |
| 3    | ERROR_AUDIO                    | 录音错误    |
| 4    | ERROR_SERVER                   | 服务端错误   |
| 5    | ERROR_CLIENT                   | 客户端调用错误 |
| 6    | ERROR_SPEECH_TIMEOUT           | 超时      |
| 7    | ERROR_NO_MATCH                 | 没有识别结果  |
| 8    | ERROR_RECOGNIZER_BUSY          | 引擎忙     |
| 9    | ERROR_INSUFFICIENT_PERMISSIONS | 缺少权限    |

### 详细错误信息

当语音识别发生错误时，将通过`RecognitionListener#onError(int error)`方法返回错误码，并且通过`RecognitionListener#onEvent(int eventType, Bundle params)`方法返回详细的错误信息。获取详细的错误信息示例如下：

```java
    @Override
    public void onEvent(int eventType, Bundle params) {
        switch (eventType) {
            case 11: // eventType == 11 表是返回详细错误信息
                String reason = params.get("reason") + "";
                print("EVENT_ERROR, " + reason);
                break;
        }
    }
```

借助该方法返回的错误信息，开发者可以更快的发现和调试问题。

### 业务错误码

| 详细错误码          | 描述                                       |
| -------------- | ---------------------------------------- |
| 3002           | 服务器后端错误                                  |
| 3003           | 没有识别结果                                   |
| 3004           | apikey/secretkey无语音识别权限                  |
| 3005           | 语音质量过低                                   |
| 7051           | 没有在指定路径找到s_1（离线识别基础资源包）                  |
| 7052           | 没有在指定路径找到s_2_xxx（prop=20000或10060时对应的附加包） |
| 7055           | 命令词超过数量限制（10个）                           |
| 7056           | 没有指定prop参数                               |
| 7057           | 不支持的采样率（仅支持16000采样率）                     |
| 7058           | 不支持的垂类（参见“[识别参数](http://yuyin.baidu.com/docs/asr/90 "识别参数")”） |
| 7059           | 设置的离线语义数据无效                              |
| 7060           | 不支持的语言类型（参见“[识别参数](http://yuyin.baidu.com/docs/asr/90 "识别参数")”） |
| 7998           | 离线识别没有得到结果                               |
| 9005/9101/9xxx | 下载授权失败（没有申请离线授权或者提交的信息不正确，参见 [DEMO工程无法使用离线识别？](http://yuyin.baidu.com/docs/asr/139 "DEMO工程无法使用离线识别？") |



# 完整示例

## API方式识别示例

**完整的示例代码如下：**

```java
import java.util.ArrayList;
import java.util.Arrays;

import org.json.JSONObject;

import com.baidu.speech.VoiceRecognitionService;
import com.baidu.speech.recognizerdemo.R;

import android.content.ComponentName;
import android.content.Intent;
import android.os.Bundle;
import android.sax.StartElementListener;
import android.speech.SpeechRecognizer;

class DemoActivity extends Activity implements RecognitionListener {
	private SpeechRecognizer speechRecognizer;
	
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main_activity);
		// 创建识别器
		speechRecognizer = SpeechRecognizer.createSpeechRecognizer(this, new ComponentName(this, VoiceRecognitionService.class));
        // 注册监听器
		speechRecognizer.setRecognitionListener(this);
        startASR();
	}
	
	// 开始识别
	void startASR() {
		Intent intent = new Intent();
		bindParams(intent);
		speechRecognizer.startListening(intent);
	}
	
	void bindParams(Intent intent) {
		// 设置识别参数
	}
	
	public void onReadyForSpeech(Bundle params) {
        // 准备就绪
    }

    @Override
    public void onBeginningOfSpeech() {
        // 开始说话处理
    }

    public void onRmsChanged(float rmsdB) {
    		// 音量变化处理
    }

    public void onBufferReceived(byte[] buffer) {
    		// 录音数据传出处理
    }

    public void onEndOfSpeech() {
        // 说话结束处理
    }

    public void onError(int error) {
        // 出错处理
    }

    public void onResults(Bundle results) {
        // 最终结果处理
    }

    public void onPartialResults(Bundle partialResults) {
        // 临时结果处理
    }

    public void onEvent(int eventType, Bundle params) {
        // 处理事件回调
    }
}
```

## 语音识别控件示例

语音识别控件提供了整套语音交互、提示音、音量反馈、动效反馈。开发者可以像调起一个普通的Activity一样简单的使用语音识别。

```java
public class DemoActivity extends Activity {

    private static final int REQUEST_UI = 1;

    private void start() {
        Intent recognizerIntent = new Intent();
        // recognizerIntent.put("...", "...") TODO 为recognizerIntent设置参数，支持的参数见本文档的“识别参数”一节
        // 为了支持离线识别能力，请参考“离线语音识别参数设置”一节
        startActivityForResult(recognizerIntent, REQUEST_UI);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == RESULT_OK) {
            ArrayList<String> results = data.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
			// data.get... TODO 识别结果包含的信息见本文档的“结果解析”一节
        }
    }
}
```
## 离线识别参数设置示例

### 注意事项

由于离线识别仅支持部分识别参数，如果需要支持离线识别能力，需要确保当前的参数设置被离线所支持：

```java
    intent.putExtra("sample", 16000); // 离线仅支持16000采样率
    intent.putExtra("language", "cmn-Hans-CN"); // 离线仅支持中文普通话
    intent.putExtra("prop", 20000); // 输入
//    intent.putExtra("prop", 10060); // 地图
//    intent.putExtra("prop", 10001); // 音乐
//    intent.putExtra("prop", 10003); // 应用
//    intent.putExtra("prop", 10008); // 电话
//    intent.putExtra("prop", 100014); // 联系人
//    intent.putExtra("prop", 100016); // 手机设置
//    intent.putExtra("prop", 100018); // 电视指令
//    intent.putExtra("prop", 100019); // 播放器指令
//    intent.putExtra("prop", 100020); // 收音机指令
//    intent.putExtra("prop", 100021); // 命令词
```

### 资源文件设置

```java
    // value替换为资源文件实际路径
    intent.putExtra("asr-base-file-path", "/path/to/s_1");
    // value替换为license文件实际路径，仅在使用临时license文件时需要进行设置，如果在[应用管理]中开通了离线授权，不需要设置该参数
    intent.putExtra("license-file-path", "/path/to/license-tmp-20150530.txt");
    if (prop == 10060) {
        // 地图类附加资源，value替换为资源文件实际路径
        intent.putExtra("lm-res-file-path", "/path/to/s_2_Navi");
    } else if (prop == 20000) {
        // 语音输入附加资源，value替换为资源文件实际路径
        intent.putExtra("lm-res-file-path", "/path/to/s_2_InputMethod");
    }
```

### 离线垂类槽数据设置

```java
    JSONObject slotData = new JSONObject();
    JSONArray name = new JSONArray().put("张三").put("李四");
    JSONArray song = new JSONArray().put("七里香").put("冰雨");
    JSONArray artist = new JSONArray().put("周杰伦").put("刘德华");
    JSONArray app = new JSONArray().put("手机百度").put("百度地图");
    JSONArray usercommand = new JSONArray().put("关灯").put("开门");
    try {
        slotData.put("name", name);
        slotData.put("song", song);
        slotData.put("artist", artist);
        slotData.put("app", app);
        slotData.put("usercommand", usercommand);
    } catch (JSONException e) {

    }
    intent.putExtra("slot-data", slotData.toString());
```


# 语音唤醒

语音唤醒是指说出指定的语音指令（自定义的唤醒词），使程序激活某个功能的能力。百度语音唤醒支持自定义唤醒词。

## 接入唤醒功能

唤醒功能属于**语音识别离在线融合SDK**（依赖2.1及以上版本）的一部分，开发者根据集成指南接入之后即可使用。

## 自定义唤醒词

唤醒词是指用于激活程序某个功能的指令。开发者可以使用唤醒词评估工具评估和导出唤醒资源。[唤醒词评估工具](http://yuyin.baidu.com/wake.html#m4 "唤醒词评估工具")

## 接入示例

1. 创建唤醒事件管理器

	```
		EventManager wakeup = EventManagerFactory.create(ActivityWakeUp.this, "wp");
	```

2. 注册唤醒事件监听器

	```
        // 2) 注册唤醒事件监听器
        mWpEventManager.registerListener(new EventListener() {
            @Override
            public void onEvent(String name, String params, byte[] data, int offset, int length) {
            }
        });
	```

3. 启动唤醒功能

	```
    // 3) 通知唤醒管理器, 启动唤醒功能
        HashMap params = new HashMap();
        params.put("kws-file", "assets:///WakeUp.bin"); // 设置唤醒资源, 唤醒资源请到 http://yuyin.baidu.com/wake#m4 来评估和导出
        mWpEventManager.send("wp.start", new JSONObject(params).toString(), null, 0, 0);
	```

4. 停止唤醒监听
	
	```
		mWpEventManager.send("wp.stop", null, null, 0, 0);
	```


## 完整示例

```
public class ActivityWakeUp extends Activity {

    private EventManager mWpEventManager;


    @Override
    protected void onResume() {
        super.onResume();

        // 唤醒功能打开步骤
        // 1) 创建唤醒事件管理器
        mWpEventManager = EventManagerFactory.create(ActivityWakeUp.this, "wp");

        // 2) 注册唤醒事件监听器
        mWpEventManager.registerListener(new EventListener() {
            @Override
            public void onEvent(String name, String params, byte[] data, int offset, int length) {
                try {
                    JSONObject json = new JSONObject(params);
                    if ("wp.data".equals(name)) { // 每次唤醒成功, 将会回调name=wp.data的时间, 被激活的唤醒词在params的word字段
                        String word = json.getString("word"); // 唤醒词
                    } else if ("wp.exit".equals(name)) {
                        // 唤醒已经停止
                    }
                } catch (JSONException e) {
                    throw new AndroidRuntimeException(e);
                }
            }
        });

        // 3) 通知唤醒管理器, 启动唤醒功能
        HashMap params = new HashMap();
        params.put("kws-file", "assets:///WakeUp.bin"); // 设置唤醒资源, 唤醒资源请到 http://yuyin.baidu.com/wake#m4 来评估和导出
        mWpEventManager.send("wp.start", new JSONObject(params).toString(), null, 0, 0);
    }

    @Override
    protected void onPause() {
        super.onPause();
        // 停止唤醒监听
        mWpEventManager.send("wp.stop", null, null, 0, 0);
    }
}
```


# 其他说明

## 结果解析

最终识别结果将通过onResults(Bundle results)方法返回，其中results支持以下字段：

| 参数名                 | 类型                 | 描述                          |
| ------------------- | ------------------ | --------------------------- |
| results_recognition | ArrayList<String>  | 识别结果                        |
| origin_result       | String(JSONObject) | 字符串形式的JSON结构体，其中包含原始的识别结果信息 |

## 常见问题

### DEMO工程无法使用离线识别？

DEMO工程要使用离线识别，需要注意以下三点：
1. 离线授权
2. 离线数据包
3. 识别参数是否支持离线

**离线授权**

* 方法一**（推荐）**：在 [应用管理](http://yuyin.baidu.com/app "应用管理") 中申请离线授权：
  请参考“ [集成指南](http://yuyin.baidu.com/docs/asr/99 "集成指南") ”一节申请离线授权，并且确认填写的包名或者bundle ID是否正确。

* 方法二：下载30天有效期的临时license文件，存放到设备的任意可读路径，并通过如下方法设置（此处示例为存放于sdcard根目录）：
```java
intent.putExtra("license-file-path", "/sdcard/temp_license_2015-05-19");
```

**离线数据包**

在语音识别的“ [相关下载](http://yuyin.baidu.com/asr/download "相关下载") ”里下载离线数据包，存放到设备的任意可读路径，并通过如下方法设置（此处示例为存放于sdcard根目录）：

```java
	intent.putExtra("asr-base-file-path", "/sdcard/s_1");
	if (prop == 10060) { // 地图
		intent.putExtra("lm-res-file-path", "/sdcard/s_2_Navi");
	} else if (prop == 20000) { // 输入法
		intent.putExtra("lm-res-file-path", "/sdcard/s_2_InputMethod");
    }
```

**识别参数是否支持离线**

请参考“[离线识别参数设置](http://yuyin.baidu.com/docs/asr/131 "离线语音识别参数设置")”-“[注意事项](http://yuyin.baidu.com/docs/asr/131.html#注意事项 "注意事项")”一节，确认当前设置的参数是否支持离线。

### 如何获取录音数据

设置outfile参数可以指定语音数据的保存路径，设置方式如：

```
intent.putExtra("outfile", "/sdcard/your_audio.pcm");
```

语音数据的保存格式为PCM，播放和压缩请自行查找相关类库。