# 接入流程


## 1. 成为开发者
**STEP1**：点击百度大脑导航右侧的[登录](https://login.bce.baidu.com?redirect=encodeURIComponent(https://ai.baidu.com)，将会跳转到百度云登录界面，登录完毕后，将会返回百度大脑主页，点击「控制台」进入百度云控制台页面；您也可以直接点击[免费试用](https://login.bce.baidu.com?redirect=encodeURIComponent(https://console.bce.baidu.com/ai/)，登录完毕后将自动进入到百度云控制台。  
**STEP2**：使用百度账号完成登录，如您还未持有百度账户，可以点击此处[注册百度账户](https://passport.baidu.com/v2/?reg)。  
**STEP3**：进入百度云欢迎页面，填写企业/个人基本信息，注册完毕，至此成为开发者。注：(如您之前已经是百度云用户或百度开发者中心用户，STEP3可略过。)  
**STEP4**：进入百度云控制台，找到人工智能相关服务面板。



## 2. 创建应用
在百度云控制台，已默认为您免费开通百度语音、文字识别、人脸识别、自然语言处理、黄反服务五项服务。
您可以选择您需要的服务，进入对应服务的控制台中。进入某个服务的控制台后，点击「应用列表」->「创建应用」，填写应用的相关信息，完成应用创建。  
**注一**：创建应用的表单中，您可以自由勾选需要赋权的API，最多可以为应用赋权本次开放的所有API权限。  
**注二**：每项服务最多创建100个应用，**同一账号下，每项服务都有一定请求限额，该限额所有应用共享。**



## 3. 获取密钥
在您创建完毕应用后，平台将会分配给您此应用的相关凭证，主要为AppID、API Key、Secret Key。  
以上三个信息是您应用实际开发的主要凭证，每个应用之间各不相同，请您妥善保管。



## 4. 生成签名
第三方应用在调用开放平台API之前，首先需要获取Access Token（用户身份验证和授权的凭证）。  
您需要使用创建应用所分配到的AppID、API Key及Secret Key，进行Access Token的生成，方法详见 [Access Token获取](http://ai.baidu.com/docs#/Auth)”。



## 5. 启动开发
目前各项服务我们都会开放REST API形式的服务，您可以点击「技术文档」中各服务的文档，查看**具体调用方法及参数**。  
[语音识别API](http://ai.bidu.com/docs#/ASR-API) | [语音合成API](http://ai.bidu.com/docs#/TTS-API) | [OCR文字识别API](http://ai.bidu.com/docs#/OCR-API) | [人脸识别API](http://ai.bidu.com/docs#/FACE-API) | [黄反识别API](http://ai.bidu.com/docs#/Antiporn-API) | [自然语言处理API](http://ai.bidu.com/docs#/NLP-API)  


我们同样也为您提供了客户端或服务端SDK，帮忙您快速接入服务。后续也会不断补充拓展，敬请持续关注。  
[SDK下载页](http://ai.baidu.com/sdk.html)


