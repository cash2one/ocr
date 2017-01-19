#Python SDK文档

本文档主要介绍人脸识别Python SDK的使用，在使用前请先确保已创建应用并具有相应权限。

# 安装Python SDK

** Python SDK目录结构**

        ├── README.md
        ├── aip                 //SDK目录
        │   ├── __init__.py     //导出类
        │   ├── antiporn.py     //黄反识别
        │   ├── base.py         //aip基类
        │   ├── face.py         //人脸识别
        │   ├── http.py         //http请求
        │   ├── nlp.py          //nlp自然语言处理
        │   └── ocr.py          //OCR图像识别
        ├── doc                 //使用文档
        │   ├── antiporn.md
        │   ├── face.md
        │   ├── nlp.md
        │   └── ocr.md
        └── setup.py            //setuptools安装

**支持 Python版本：2.7.+ **

**安装使用SDK有如下三种方式：**

* 如果已安装pip，执行`pip install baidu-aip`即可。
* 如果已安装setuptools，执行`python setup.py install`即可。
* 下载[Python SDK](http://ai.baidu.com/sdk)解压，将aip目录复制到您的项目中即可。


# 快速入门

## 初始化一个AipFace对象

AipFace类提供给开发者一系列人脸识别的方法，参考如下代码新建一个AipFace对象：

```Python
# 引入人脸识别 SDK
from aip import AipFace

# 定义常量
APP_ID = '你的 App ID'
API_KEY = '你的 API Key'
SECRET_KEY = '你的 Secret Key'

# 初始化AipFace对象
aipFace = AipFace(APP_ID, API_KEY, SECRET_KEY)
```

在上面代码中，常量`APP_ID`在百度云控制台中创建，常量`API_KEY`与`SECRET_KEY`是由系统分配给用户的，均为字符串，用于标识用户，为访问服务做签名验证。获取方式请参考[获取AK/SK](../Reference/GetAKSK)。


# 人脸属性检测

基于百度业界领先的智能人脸分析算法，提供人脸检测、人脸识别、关键点定位、属性识别和活体检测等。

对一张图片进行人脸属性检测，示例代码如下：

```Python
# 引入人脸识别 SDK
from aip import AipFace

# 定义常量
APP_ID = '你的 App ID'
API_KEY = '你的 API Key'
SECRET_KEY = '你的 Secret Key'

# 初始化AipFace对象
aipFace = AipFace(APP_ID, API_KEY, SECRET_KEY)

# 读取图片
def get_file_content(filePath):
    with open(filePath, 'rb') as fp:
    	return fp.read()

# 调用人脸属性检测接口
result = aipFace.detect(get_file_content('face.jpg'))
```
增加一些自定义参数：

```python
# 引入人脸识别 SDK
from aip import AipFace

# 定义常量
APP_ID = '你的 App ID'
API_KEY = '你的 API Key'
SECRET_KEY = '你的 Secret Key'

# 初始化AipFace对象
aipFace = AipFace(APP_ID, API_KEY, SECRET_KEY)

# 读取图片
def get_file_content(filePath):
    with open(filePath, 'rb') as fp:
    	return fp.read()

# 定义参数变量
options = {
    'max_face_num': 1,
    'face_fields': "age,beauty,expression,faceshape",
}

# 调用人脸属性识别接口
result = aipFace.detect(get_file_content('face.jpg'), options)
```

**人脸属性 请求参数详情**

| 参数           | 类型            | 描述                                       | 是否必须 |
| :----------- | :------------ | :--------------------------------------- | :--- |
| face_fields  | Boolean       | 包括age、beauty、expression、faceshape、gender、glasses、landmark、race、qualities信息，逗号分隔，默认只返回人脸框、概率和旋转角度。 | 否    |
| max_face_num | 最多处理人脸数目，默认值1 | 是                                        |      |
| image        | String        | 图像数据，仅支持图像文件流                            | 是    |

**人脸属性 返回数据参数详情**

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

**返回样例：**

```json
{
    "result_num": 1,
    "result": [
        {
            "location": {
                "left": 90,
                "top": 92,
                "width": 111,
                "height": 99
            },
            "face_probability": 1,
            "rotation_angle": 6,
            "yaw": 11.61234664917,
            "pitch": -0.30852827429771,
            "roll": 8.8044967651367,
            "landmark": [
                {
                    "x": 105,
                    "y": 110
                },
              ...
            ],
            "landmark72": [
                {
                    "x": 88,
                    "y": 109
                },
               ...
            ],
            "gender": "male",
            "gender_probability": 0.99358034133911,
            "glasses": 0,
            "glasses_probability": 0.99991309642792,
            "race": "yellow",
            "race_probability": 0.99960690736771,
            "qualities": {
                "occlusion": {
                    "left_eye": 0.000085282314103097,
                    "right_eye": 0.00001094374601962,
                    "nose": 3.2677664307812e-7,
                    "mouth": 2.6582130940866e-10,
                    "left_cheek": 8.752236624332e-8,
                    "right_cheek": 1.0212766454742e-7,
                    "chin": 4.2632994357028e-10
                },
                "blur": 4.5613666312237e-41,
                "illumination": 0,
                "completeness": 0,
                "type": {
                    "human": 0.98398965597153,
                    "cartoon": 0.016010366380215
                }
            }
        }
    ],
    "log_id": 2418894422
}
```

# 人脸两两比对

人脸比对接口提供了对上传图片进行两两比对，并输出相似度得分的功能。

举例，要对一组人脸图片进行两两比对，示例代码如下：

```Python
# 引入人脸识别 SDK
from aip import AipFace

# 定义常量
APP_ID = '你的 App ID'
API_KEY = '你的 API Key'
SECRET_KEY = '你的 Secret Key'

# 读取图片
def get_file_content(filePath):
    with open(filePath, 'rb') as fp:
    	return fp.read()

# 初始化AipFace对象
aipFace = AipFace(APP_ID, API_KEY, SECRET_KEY)

# 调用人脸两两比对接口
result = aipFace.match([
	get_file_content('face1.jpg'),
    get_file_content('face2.jpg'),
    get_file_content('face3.jpg'),
])
```
**人脸比对请求参数要求**：

​          所有图片经base64编码后的图片数据总和不超过10M。

**人脸比对返回数据参数详情**：

| 字段         | 是否必选 | 类型            | 说明                                       |
| ---------- | ---- | ------------- | ---------------------------------------- |
| log_id     | 是    | uint64        | 请求标识码，随机数，唯一                             |
| result_num | 是    | uint32        | 返回结果数目，即：result数组中元素个数                   |
| result     | 是    | array(object) | 结果数据，index和请求图片index对应。数组元素为每张图片的匹配得分数组，top n。 得分[0,100.0] |
| +index_i   | 是    | uint32        | 比对图片1的index                              |
| +index_j   | 是    | uint32        | 比对图片2的index                              |
| +score     | 是    | double        | 比对得分                                     |

**返回样例：**

```json
// 请求为三张图片 返回组合数 C(3, 2) = 3
// score 为第index_i张人脸图片和第index_j张人脸图片的相似度
// 如果某张图片未检测到人脸 则该图片不参与比对
{
    "log_id": 73473737,
    "result_num":3,
    "result": [
        {
            "index_i": 0,
            "index_j": 1,
            "score": 80.4
        },
        {
            "index_i": 0,
            "index_j": 2,
            "score": 89.1
        },
        {
            "index_i": 1,
            "index_j": 2,
            "score": 87.5
        }
    ]
}
```
