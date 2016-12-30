#Java SDK文档

本文档主要介绍图片智能色情识别服务。在使用本文档前，您需要先了解图片智能色情识别服务。

# 安装色情识别服务 Java SDK

** Java SDK目录结构**

    com.baidu.aip
           ├── auth                                //签名相关类
           ├── http                                //Http通信相关类
           ├── client                              //公用类
           ├── exception                           //exception类
           ├── antiporn
           │       └── AipAntiporn                 //AipAntiporn类
           └── util                                //工具类


**直接使用JAR包**

步骤如下：

1.在[官方网站](https://api.baidu.com/doc/Developer/index.html)下载Java SDK压缩工具包。

2.将下载的`aip-java-sdk-version.zip`解压后，复制到工程文件夹中。

3.在Eclipse右键“工程 -> Properties -> Java Build Path -z> Add JARs”。

4.添加SDK工具包`lib/api-java-sdk-version.jar`和第三方依赖工具包`third-party/*.jar`。

其中，`version`为版本号，添加完成后，用户就可以在工程中使用BFR Java SDK。


# 快速入门

图片智能色情识别服务，依托百度业界领先的图像识别算法，基于大数据深度学习技术，提供一般色情识别和卡通色情识别，以及母婴类图片识别服务。

1.初始化一个AipAntipornClient。

# AipAntipornClient

## 新建AipAntipornClient

用户可以参考如下代码新建一AipAntipornClient：

```java
public class Sample {
    public static void main(String[] args) {

        //设置APPID/AK/SK
        String APP_ID = "your-app-id";
        String API_KEY = "your-access-key-id";
        String API_SECRET = "your-secret-access-key";

        // 初始化一个AntipornClient
        AipAntiporn client = new AipAntiporn(APP_ID, API_KEY, API_SECRET);
    }
}
```
在上面代码中，常量`APP_ID`在百度云控制台中创建，常量`API_KEY`与`API_SECRET`是由系统分配给用户的，均为字符串，用于标识用户，为访问BFR做签名验证。其中`API_KEY`对应控制台中的“Access Key ID”，`SECRET_ACCESS_KEY`对应控制台中的“Access Key Secret”，获取方式请参考[获取AK/SK](../Reference/GetAKSK)。

# 人脸识别

图片接受类型支持本地图片路径字符串，图片文件二进制数组。

```java
public void antiPorn(AipAntiporn client) {
    // 参数为本地图片路径
    String imagePath = "porn.jpg";
    JSONObject response = client.antiporn(imagePath);
    System.out.println(response.toString());

    // 参数为本地图片文件二进制数组
    byte[] file = readImageFile(imagePath);
    JSONObject response = client.antiporn(file);
    System.out.println(response.toString());
}
```

*色情识别 请求参数详情**

| 参数 | 类型 | 描述 | 是否必须 |
| :---- | :---- | :---- | :---- |
|image|String|图像数据，支持本地图像文件路径，图像文件二进制数组|是|

**色情识别 返回数据参数详情**

| 参数 | 类型 | 描述 |
| :---- | :---- | :---- |
|log_id|uint64|日志id|
|result_num|Int|人脸数目|
|result|object[]|人脸属性对象的集合|
|+class_name|String|分类结果名称，示例：一般色情|
|+probability|double|分类结果置信度，示例：0.89471650123596|

# 版本更新说明

##

* 第一版
