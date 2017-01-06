#Java SDK文档

本文档主要介绍人脸识别Java SDK的安装和使用。在使用本文档前，您需要先了解人脸识别的基础知识，并已经开通了人脸识别服务。

# 安装人脸检测 Java SDK

**BFR Java SDK目录结构**

    com.baidu.aip
           ├── auth                                //签名相关类
           ├── http                                //Http通信相关类
           ├── client                              //公用类
           ├── exception                           //exception类
           ├── face
           │       └── AipFace                     //AipFace类
           └── util                                //工具类


**直接使用JAR包**

步骤如下：

1.在[官方网站](/sdk)下载Java SDK压缩工具包。

2.将下载的`aip-face-java-sdk-version.zip`解压后，复制到工程文件夹中。

3.在Eclipse右键“工程 -> Properties -> Java Build Path -> Add JARs”。

4.添加SDK工具包`face-sdk.jar`和第三方依赖工具包`third-party/*.jar`。

其中，`version`为版本号，添加完成后，用户就可以在工程中使用BFR Java SDK。


# 快速入门

1.初始化一个AipFaceClient。

AipFaceClient是与Optical Character Recognition(BFR)交互的客户端，所有BFR操作都是通过AipFaceClient完成的。您可以参考**新建AipFaceClient**，完成初始化客户端的操作。

# AipFaceClient

## 新建AipFaceClient

AipFaceClient是人脸识别的Java客户端，为使用人脸识别的开发人员提供了一系列的交互方法。

用户可以参考如下代码新建一AipFaceClient：

```java
public class Sample {

    //设置APPID/AK/SK
    public static final String APP_ID = "你的 App ID";
    public static final String API_KEY = "你的 Api ID";
    public static final String SECRET_KEY = "你的 Secret Key";
    
    public static void main(String[] args) {

        // 初始化一个BFRClient
        AipFace client = new AipFace(APP_ID, API_KEY, SECRET_KEY);
        
        String image = "test.jpg";
        JSONObject res = face.detect(path, new HashMap<String, String>());
        System.out.println(res.toString(2));
    }
}
```
在上面代码中，常量`APP_ID`在百度云控制台中创建，常量`API_KEY`与`SECRET_KEY`是在创建完毕应用后，系统分配给用户的，均为字符串，用于标识用户，为访问做签名验证，可在AI服务控制台中的**应用列表**中查看。  

**注：**如您以前是百度云的老用户，其中`API_KEY`对应百度云的“Access Key ID”，`SECRET_KEY`对应百度云的“Access Key Secret”。

# 人脸检测

人脸识别基于百度业界领先的智能人脸分析算法，提供人脸检测、人脸识别、关键点定位、属性识别和活体检测等一整套技术方案。

图片接受类型支持本地图片路径字符串，图片文件二进制数组。

举例，要对一张图片进行人脸识别，具体的人脸信息在返回的result字段中：

```java
public void faceRecognize(AipFace client) {
    // 参数为本地图片路径
    String imagePath = "picture.jpg";
    JSONObject response = client.detect(imagePath);
    System.out.println(response.toString());

    // 参数为本地图片文件二进制数组
    byte[] file = readImageFile(imagePath);
    JSONObject response = client.detect(file);
    System.out.println(response.toString());
}
```
传入图片时还想增加一些自定义参数配置：

```java
public void faceRecognize(AipFace client) {
    // 自定义参数定义
    HashMap<String, String> options = new HashMap<String, String>();
    options.put("max_face_num", "1");
    options.put("face_fields", "expression");

    // 参数为本地图片路径
    String imagePath = "face.jpg";
    JSONObject response = client.detect(imagePath, options);
    System.out.println(response.toString());

    // 参数为本地图片文件二进制数组
    byte[] file = readImageFile(imagePath);
    JSONObject response = client.detect(file, options);
    System.out.println(response.toString());
}
```


**人脸检测 请求参数详情**

| 参数           | 类型            | 描述                                       | 是否必须 |
| :----------- | :------------ | :--------------------------------------- | :--- |
| face_fields  | Boolean       | 包括age、beauty、expression、faceshape、gender、glasses、landmark、race、qualities信息，逗号分隔，默认只返回人脸框、概率和旋转角度。 | 否    |
| max_face_num | 最多处理人脸数目，默认值1 | 是                                        |      |
| image        | String        | 图像数据，支持本地图像文件路径，图像文件二进制数组                | 是    |

**人脸检测 返回数据参数详情**

| 参数                      | 类型       | 是否一定输出 | 描述                                       |
| :---------------------- | :------- | :----- | :--------------------------------------- |
| log_id                  | uint64   | 是      | 日志id                                     |
| result_num              | Int      | 是      | 人脸数目                                     |
| result                  | object[] | 是      | 人脸属性对象的集合                                |
| +age                    | double   | 否      | 年龄。face_fields包含age时返回                   |
| +beauty                 | double   | 否      | 美丑打分，范围0-1，越大表示越美。face_fields包含beauty时返回 |
| +location               | object   | 是      | 人脸在图片中的位置                                |
| ++left                  | Int      | 是      | 人脸区域离左边界的距离                              |
| ++top                   | Int      | 是      | 人脸区域离上边界的距离                              |
| ++width                 | Int      | 是      | 人脸区域的宽度                                  |
| ++height                | Int      | 是      | 人脸区域的高度                                  |
| +face_probability       | double   | 是      | 人脸置信度，范围0-1                              |
| +rotation_angle         | int32    | 是      | 人脸框相对于竖直方向的顺时针旋转角，[-180,180]             |
| +yaw                    | double   | 是      | 三维旋转之左右旋转角[-90(左), 90(右)]                |
| +pitch                  | double   | 是      | 三维旋转之俯仰角度[-90(上), 90(下)]                 |
| +roll                   | double   | 是      | 平面内旋转角[-180(逆时针), 180(顺时针)]              |
| +expression             | Int      | 否      | 表情，0，不笑；1，微笑；2，大笑。face_fields包含expression时返回 |
| +expression_probability | double   | 否      | 表情置信度，范围0~1。face_fields包含expression时返回   |
| +faceshape              | object[] | 否      | 脸型置信度。face_fields包含faceshape时返回          |
| ++type                  | String   | 是      | 脸型：square/triangle/oval/heart/round      |
| ++probability           | double   | 是      | 置信度：0~1                                  |
| +gender                 | String   | 否      | male、female。face_fields包含gender时返回       |
| +gender_probability     | double   | 否      | 性别置信度，范围0~1。face_fields包含gender时返回       |
| +glasses                | Int      | 否      | 是否带眼镜，0-无眼镜，1-普通眼镜，2-墨镜。face_fields包含glasses时返回 |
| +glasses_probability    | double   | 否      | 眼镜置信度，范围0~1。face_fields包含glasses时返回      |
| +landmark               | object[] | 否      | 4个关键点位置，左眼中心、右眼中心、鼻尖、嘴中心。face_fields包含landmark时返回 |
| ++x                     | Int      | 否      | x坐标                                      |
| ++y                     | Int      | 否      | y坐标                                      |
| +landmark72             | object[] | 否      | 72个特征点位置，示例图 。face_fields包含landmark时返回   |
| ++x                     | Int      | 否      | x坐标                                      |
| ++y                     | Int      | 否      | y坐标                                      |
| +race                   | String   | 否      | yellow、white、black、arabs。face_fields包含race时返回 |
| +race_probability       | double   | 否      | 人种置信度，范围0~1。face_fields包含race时返回         |
| +qualities              | object   | 否      | 人脸质量信息。face_fields包含qualities时返回         |
| ++occlusion             | object   | 是      | 人脸各部分遮挡的概率， [0, 1]  （待上线）                |
| +++left_eye             | double   | 是      | 左眼                                       |
| +++right_eye            | double   | 是      | 右眼                                       |
| +++nose                 | double   | 是      | 鼻子                                       |
| +++mouth                | double   | 是      | 嘴                                        |
| +++left_cheek           | double   | 是      | 左脸颊                                      |
| +++right_cheek          | double   | 是      | 右脸颊                                      |
| +++chin                 | double   | 是      | 下巴                                       |
| ++type                  | object   | 是      | 真实人脸/卡通人脸置信度                             |
| +++human                | double   | 是      | 真实人脸置信度，[0, 1]                           |
| +++cartoon              | double   | 是      | 卡通人脸置信度，[0, 1]                           |


