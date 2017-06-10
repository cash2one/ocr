# 常见问题

**更多常见问题已经迁移至论坛，见：**http://yuyin.baidu.com/bbs/question/stick


**Q：语音合成提供 REST API 吗？**  
A：语音合成REST API已经开放，请去语音合成相关下载页面下载使用。

**Q：语音合成支持那些语言和音色的播报？**  
A：语音合成目前支持中文普通话播报、中英文混读播报，音色支持男声和女声。

**Q：有离线语音合成可以提供吗？**  
A：目前没有开放纯离线模式下的语音合成SDK，但是我们开放了离在线融合语音合成SDK，会自动判断当前网络环境，自动匹配使用离线还是在线合成引擎。

**Q：语音合成的语音，我想获取音频数据该怎么办？**  
A：可以通过 SpeechSynthesizerListener 的 onNewDataArrive 方法获取音频数据。

**Q：提示“Unable to execute dex: Multiple dex files define Lcom/baidu/android/common/logging/Log”错误？**  
A：应用同时集成了百度其它 SDK，造成公共库冲突，请删除语音SDK中的galaxy_lite.jar。

**Q：提示“Caused by: java.lang.UnsatisfiedLinkError: Couldn't load BDSpeechDecoder_V1: findLibrary returned null”错误？**  
A：百度语音合成SDK 提供了armeabi标准库及armeabi-v7a库。如项目只包含其中一个目录，请只将TTS SDK中的同名目录集成，否则会造成其它库无法正常加载的错误。如项目只有armeabi，请只集成armeabi，反之如果只有armeabi-v7a，则只集成armeabi-v7a。