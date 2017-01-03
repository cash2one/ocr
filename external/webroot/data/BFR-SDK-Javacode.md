#Java SDK文档

本文档主要介绍BFR Java SDK的安装和使用。在使用本文档前，您需要先了解人脸识别BFR（Baidu Face Recognition）的基础知识，并已经开通了BFR服务。

# 安装BFR Java SDK

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

1.在[官方网站](https://ai.baidu.com/sdk)下载Java SDK压缩工具包。

2.将下载的`aip-java-sdk-version.zip`解压后，复制到工程文件夹中。

3.在Eclipse右键“工程 -> Properties -> Java Build Path -> Add JARs”。

4.添加SDK工具包`lib/api-java-sdk-version.jar`和第三方依赖工具包`third-party/*.jar`。

其中，`version`为版本号，添加完成后，用户就可以在工程中使用BFR Java SDK。


# 快速入门

BFRClient是Optical Character Recognition的Java客户端，为使用Optical Character Recognition的开发人员提供了一系列的交互方法。

## 初始化AipFaceClient

用户可以参考如下代码新建一AipFaceClient：

```java
public class Sample {
    public static void main(String[] args) {

        //设置APPID/AK/SK
        String APP_ID = "your-app-id";
        String API_KEY = "your-access-key-id";
        String API_SECRET = "your-secret-access-key";

        // 初始化一个BFRClient
        AipFace client = new AipFace(APP_ID, API_KEY, API_SECRET);
    }
}
```
在上面代码中，常量`APP_ID`在百度云控制台中创建，常量`API_KEY`与`API_SECRET`是由系统分配给用户的，均为字符串，用于标识用户，为访问BFR做签名验证。其中`API_KEY`对应控制台中的“Access Key ID”，`SECRET_ACCESS_KEY`对应控制台中的“Access Key Secret”，获取方式请参考[获取AK/SK](../Reference/GetAKSK)。

# 人脸识别

人脸识别BFR（Baidu Face Recognition）基于百度业界领先的智能人脸分析算法，提供人脸检测、人脸识别、关键点定位、属性识别和活体检测等一整套技术方案。

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


**人脸属性 请求参数详情**

| 参数 | 类型 | 描述 | 是否必须 |
| :---- | :---- | :---- | :---- |
|face_fields|Boolean|包括age、beauty、expression、faceshape、gender、glasses、landmark、race、qualities信息，逗号分隔，默认只返回人脸框、概率和旋转角度。|否|
|max_face_num|最多处理人脸数目，默认值1|是|
|image|String|图像数据，支持本地图像文件路径，图像文件二进制数组|是|

**人脸属性 返回数据参数详情**

| 参数 | 类型 | 描述 |
| :---- | :---- | :---- |
|log_id|uint64|日志id|
|result_num|Int|人脸数目|
|result|object[]|人脸属性对象的集合|
|+age|double|年龄。face_fields包含age时返回|
|+beauty|double|美丑打分，范围0-1，越大表示越美。face_fields包含beauty时返回|
|+location|object|人脸在图片中的位置|
|++left|Int|人脸区域离左边界的距离|
|++top|Int|人脸区域离上边界的距离|
|++width|Int|人脸区域的宽度|
|++height|Int|人脸区域的高度|
|+face_probability|double|人脸置信度，范围0-1|
|+rotation_angle|int32|人脸框相对于竖直方向的顺时针旋转角，[-180,180]|
|+yaw|double|三维旋转之左右旋转角[-90(左), 90(右)]|
|+pitch|double|三维旋转之俯仰角度[-90(上), 90(下)]|
|+roll|double|平面内旋转角[-180(逆时针), 180(顺时针)]|
|+expression|Int|表情，0，不笑；1，微笑；2，大笑。face_fields包含expression时返回|
|+expression_probability|double|表情置信度，范围0~1。face_fields包含expression时返回|
|+faceshape|object[]|脸型置信度。face_fields包含faceshape时返回|
|++type|String|脸型：square/triangle/oval/heart/round|
|++probability|double|置信度：0~1|
|+gender|String|male、female。face_fields包含gender时返回|
|+gender_probability|double|性别置信度，范围0~1。face_fields包含gender时返回|
|+glasses|Int|是否带眼镜，0-无眼镜，1-普通眼镜，2-墨镜。face_fields包含glasses时返回|
|+glasses_probability|double|眼镜置信度，范围0~1。face_fields包含glasses时返回|
|+landmark|object[]|4个关键点位置，左眼中心、右眼中心、鼻尖、嘴中心。face_fields包含landmark时返回|
|++x|Int|x坐标|
|++y|Int|y坐标|
|+landmark72|object[]|72个特征点位置，示例图 。face_fields包含landmark时返回|
|++x|Int|x坐标|
|++y|Int|y坐标|
|+race|String|yellow、white、black、arabs。face_fields包含race时返回|
|+race_probability|double|人种置信度，范围0~1。face_fields包含race时返回|
|+qualities|object|人脸质量信息。face_fields包含qualities时返回|
|++occlusion|object|人脸各部分遮挡的概率， [0, 1]  （待上线）|
|+++left_eye|double|左眼|
|+++right_eye|double|右眼|
|+++nose|double|鼻子|
|+++mouth|double|嘴|
|+++left_cheek|double|左脸颊|
|+++right_cheek|double|右脸颊|
|+++chin|double|下巴|
|++type|object|真实人脸/卡通人脸置信度|
|+++human|double|真实人脸置信度，[0, 1]|
|+++cartoon|double|卡通人脸置信度，[0, 1]|

# 版本更新说明

##

* 首次发布

