#Java SDK文档

本文档主要介绍黄反识别服务。在使用本文档前，您需要先了解黄反识别服务。

# 安装黄反识别服务 Java SDK

** Java SDK目录结构**

    com.baidu.aip
           ├── auth                                //签名相关类
           ├── http                                //Http通信相关类
           ├── client                              //公用类
           ├── exception                           //exception类
           ├── antiporn
           │       └── AipAntiporn                 //AipAntiporn类
           └── util                                //工具类

**支持 JAVA版本：1.7+**

**直接使用JAR包步骤如下：**

1.在[官方网站](http://ai.baidu.com/sdk)下载Java SDK压缩工具包。

2.将下载的`aip-antiporn-java-sdk-version.zip`解压后，复制到工程文件夹中。

3.在Eclipse右键“工程 -> Properties -> Java Build Path -z> Add JARs”。

4.添加SDK工具包`antiporn_sdk-version.jar`和第三方依赖工具包`third-party/*.jar`。

其中，`version`为版本号，添加完成后，用户就可以在工程中使用BFR Java SDK。


# 快速入门

黄反识别服务，依托百度业界领先的图像识别算法，基于大数据深度学习技术，提供图片色情、性感、正常三个类别的识别服务。

## 新建AipAntipornClient

用户可以参考如下代码新建一AipAntipornClient：

```java
public class Sample {
    //设置APPID/AK/SK
    public static final String APP_ID = "你的 App ID";
    public static final String API_KEY = "你的 Api ID";
    public static final String SECRET_KEY = "你的 Secret Key";
    
    public static void main(String[] args) {

        // 初始化一个AntipornClient
        AipAntiporn client = new AipAntiporn(APP_ID, API_KEY, SECRET_KEY);
        String path = "test.jpg";
        JSONObject res = antiporn.detect(path);
        System.out.println(res);
    }
}
```
在上面代码中，常量`APP_ID`在百度云控制台中创建，常量`API_KEY`与`SECRET_KEY`是在创建完毕应用后，系统分配给用户的，均为字符串，用于标识用户，为访问做签名验证，可在AI服务控制台中的**应用列表**中查看。  

**注意：**如您以前是百度云的老用户，其中`API_KEY`对应百度云的“Access Key ID”，`SECRET_KEY`对应百度云的“Access Key Secret”。

# 黄反识别

图片接受类型支持本地图片路径字符串，图片文件二进制数组。

```java
public void antiPorn(AipAntiporn client) {
    // 参数为本地图片路径
    String imagePath = "porn.jpg";
    JSONObject response = client.detect(imagePath);
    System.out.println(response.toString());

    // 参数为本地图片文件二进制数组
    byte[] file = readImageFile(imagePath);
    JSONObject response = client.detect(file);
    System.out.println(response.toString());
}
```

**黄反识别 请求参数详情**

| 参数    | 类型     | 描述                        | 是否必须 |
| :---- | :----- | :------------------------ | :--- |
| image | String | 图像数据，支持本地图像文件路径，图像文件二进制数组 | 是    |

**黄反识别 返回数据参数详情**

| 参数           | 类型            | 描述                          |
| :----------- | :------------ | :-------------------------- |
| log_id       | uint64        | 请求标识码，随机数，唯一                |
| result_num   | Int           | 返回结果数目，即：result数组中元素个数      |
| result       | Array[Object] | 结果数组，每项内容对应一个分类维度的结果        |
| +class_name  | String        | 分类结果名称，示例：色情                |
| +probability | double        | 分类结果置信度，示例：0.89471650123596 |



