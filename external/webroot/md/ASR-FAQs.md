# 常见问题

**更多常见问题已经迁移至论坛，见：**http://yuyin.baidu.com/bbs/question/stick

**Q：语音识别REST API支持的音频格式、采样率有哪些？**
A：支持的压缩格式有：pcm（不压缩）、wav、opus、speex、amr、x-flac。原始 PCM 的录音参数必须符合 8k/16k 采样率、16bit 位深、单声道。


**Q：语音识别 REST API 最长支持多长的录音？**
A： 最长支持60s的录音文件。对文件大小没有限制，只对时长有限制。


**Q：语音识别SDK支持的音频格式、采样率有哪些？**
A： 
Android SDK：支持Android 2.2及以上系统，支持ARM\X86架构。安装包最小增加200k，支持8k/16k采样率，支持pcm格式。

iOS SDK：支持iOS 5.0及以上系统，支持ARM-v7\ARM-v7s\ARM64\i386\x86_64架构。安装包最小增加400k，支持8k/16k采样率，支持pcm格式。


**Q：什么是语音识别REST API？有什么注意事项？**
A：语音识别全平台REST API，采用http方式请求，可适用于任何平台的语音识别。使用REST API，录音、压缩及上传模块需要自行开发。且REST API语音识别暂时不支持语义解析。


**Q：百度语音是否单独提供录音功能，以及语音通讯功能？**
A：不单独提供独立录音的功能，目前识别SDK包含语音输入和识别功能。语音通讯功能需开发者自行搭建。


**Q：语音识别REST API和SDK的区别是什么？**
A： REST API：开发者上传录音——百度语音进行识别——识别结果返回开发者
SDK：百度语音提供从录音到识别结果返回的整体解决方案


**Q：语音识别通过哪个接口获取音频信息？**
A：
Android SDK：当VoiceClientStatusChangeListener.onClientStatusChange(int status, Object obj) 的status是VoiceRecognitionClient.CLIENT_STATUS_AUDIO_DATA时，obj为byte[]音频数据；

iOS SDK：MVoiceRecognitionClientDelegate的(void)VoiceRecognitionClientWorkStatus:(int) aStatus obj:(id)aObj;的aStatus是EVoiceRecognitionClientWorkStatusNewRecordData时，aObj为NSData音频数据。
数据格式均为pcm，采样率可通过VoiceRecognitionConfig.getSampleRate()/[[BDVoiceRecognitionClient sharedInstance] getCurrentSampleRate]获取，获取的音频格式是位深16bit，单声道。


**Q：如何才能提高语音识别的准确率？**
A： 自定义语音识别设置：打开百度开放云平台，在目前创建的应用下进行自定义语音识别设置。上传识别关键词文本，保存并生效。
设置对应的语音识别垂类：在代码中填写识别的垂类领域，识别结果将优先指向已设置的垂类，可以使得识别结果更准确


**Q：百度语音SDK与其他百度SDK，或其他第三方SDK冲突时，如何解决？**
A： 与其他百度SDK冲突一般是由于使用了相同的基础库galaxy.jar，请检查是否重复导入了该jar包；与其他第三方SDK冲突一般是由于so库的架构不统一，请保证工程libs目录下armeabi/armeabi-v7a/x86/mips目录的so库均一致，如果不能保证一致，则一般只能所有SDK仅使用armeabi架构的so库


**Q：首次开启语音识别功能的延迟时间较长，需要如何调控？**
A： 首次延迟时间较长一般是由于权限验证造成，可以通过预先调用接口：
(int)verifyApiKey:(NSString *)apiKey withSecretKey:(NSString *)secretKey;
来进行验证。首次开启语音时就不需要再发送验证请求，从而降低语音识别启动的延迟。


**Q：如何在语音识别时获取音频文件？**
A： 
**Api：**cp服务器自己备存用户录音信息
**Sdk：**可以通过CLIENT_STATUS_AUDIO_DATA回调，将回调对象强转成byte[]顺序写入到文件中即可得到原始的音频文件。

**Q：语音识别垂类是什么意思？**
A： 语音识别垂类就是特指某个领域的意思，开发者可以根据用户使用场景设定特定领域使得识别结果更准确。比如垂直领域设定为”音乐“，则在语音识别时会优先识别为音乐相关的歌曲名歌手名或者歌词。

**Q：为什么语音识别Demo的API_Key和Secret_Key是空的还能进行识别呢？我开发的应用的API_Key和Secret_Key是不是必须得填写呢？**
A： SDK自带demo用的特殊的方式验证的，故可以不使用AK和SK。开发者自行开发的应用AK和SK是必须填写的，否则无法调用语音识别。

**Q：【Android纯在线】如何从识别SDK中获取音频？**
A：通过监听onClientStatusChange函数的CLIENT_STATUS_AUDIO_DATA消息（在一次会话中会回调多次）拼接音频，如：
```
class MyVoiceRecogListener implements VoiceClientStatusChangeListener{
    OutputStream outFile;
    @Override
    public void onClientStatusChange(int status, Object obj) {
        switch(status) {
		    ... // 省略其它消息
            case VoiceRecognitionClient.CLIENT_STATUS_AUDIO_DATA:
                // 有音频数据输出
                if (obj!= null && obj instanceof byte[]) {
                    // 演示如何保持PCM音频，细节请各位工程师更加实际情况优化
					byte[] buf = (byte[])obj;
					FileOutputStream out = new FileOutputStream("sdcard/your_file.pcm", true);
					out.write(buf);
					out.close();
                }
                break;
            default:
                break;
        }
    }
```


**Q：【Android离在线】如何从识别SDK中获取音频？**
A：
方式1：设置outfile参数可以指定语音数据的保存路径，设置方式如：
```
intent.putExtra("outfile", "/sdcard/your_audio.pcm");
```
语音数据的保存格式为PCM，播放和压缩请自行查找相关类库。

方式2：通过监听onBufferReceived(byte[] buf)回调，拼接音频实现