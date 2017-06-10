# Python SDK文档

本文档主要介绍黄反识别Python SDK的使用，在使用前请先确保已创建应用并具有相应权限。

# 安装Python SDK

**Python SDK目录结构**

        ├── README.md
        ├── aip                 //SDK目录
        │   ├── __init__.py     //导出类
        │   ├── antiporn.py     //黄反识别
        │   ├── base.py         //aip基类
        │   ├── face.py         //人脸识别
        │   ├── http.py         //http请求
        │   ├── nlp.py          //nlp自然语言处理
        │   └── ocr.py          //OCR图像识别
        ├── doc                 //使用文档
        │   ├── antiporn.md
        │   ├── face.md
        │   ├── nlp.md
        │   └── ocr.md
        └── setup.py            //setuptools安装

**支持 Python版本：2.7.+ ,3.+**

**安装使用SDK有如下方式：**

- 如果已安装pip，执行`pip install baidu-aip`即可。
- 如果已安装setuptools，执行`python setup.py install`即可。

# 快速入门

基于百度业界领先的图像识别算法，提供图片黄反识别服务。

## 初始化一个AipAntiPorn对象

用户可以参考如下代码初始化一个AipAntiPorn对象：


    # 引入AntiPorn SDK
    from aip import AipAntiPorn
    
    # 定义常量
    APP_ID = '你的 App ID'
    API_KEY = '你的 API Key'
    SECRET_KEY = '你的 Secret Key'
    
    # 初始化AipAntiPorn对象
    aipAntiPorn = AipAntiPorn(APP_ID, API_KEY, SECRET_KEY)


在上面代码中，常量`APP_ID`在百度云控制台中创建，常量`API_KEY`与`SECRET_KEY`是由系统分配给用户的，均为字符串，用于标识用户，为访问服务做签名验证。获取方式请参考[获取AK/SK](../Reference/GetAKSK)。

## 配置AipAntiporn

如果用户需要配置AipAntiporn的一些细节参数，可以在构造AipAntiporn之后调用接口设置参数，目前只支持以下参数：

| 接口                           | 说明                      |
| ---------------------------- | ----------------------- |
| setConnectionTimeoutInMillis | 建立连接的超时时间（单位：毫秒）        |
| setSocketTimeoutInMillis     | 通过打开的连接传输数据的超时时间（单位：毫秒） |

# 错误信息格式

若请求错误，服务器将返回的JSON文本包含以下参数：

- **error_code：**错误码；关于错误码的详细信息请参考**通用错误码**和**业务相关错误码**。
- **error_msg：**错误描述信息，帮助理解和解决发生的错误。

**SDK本地检测参数返回的错误码**：

| error_code | error_msg                        | 备注          |
| ---------- | -------------------------------- | ----------- |
| SDK100     | image size error                 | 图片大小超限      |
| SDK101     | image length error               | 图片边长不符合要求   |
| SDK102     | read image file error            | 读取图片文件错误    |
| SDK108     | connection or read data time out | 连接超时或读取数据超时 |
| SDK109     | unsupported image format         | 不支持的图片格式    |

**服务端返回的错误码**

| 错误码    | 错误信息                     | 描述          |
| ------ | ------------------------ | ----------- |
| 216015 | module closed            | 模块关闭        |
| 216100 | invalid param            | 非法参数        |
| 216101 | not enough param         | 参数数量不够      |
| 216102 | service not support      | 业务不支持       |
| 216103 | param too long           | 参数太长        |
| 216110 | appid not exist          | APP ID不存在   |
| 216111 | invalid userid           | 非法用户ID      |
| 216200 | empty image              | 空的图片        |
| 216201 | image format error       | 图片格式错误      |
| 216202 | image size error         | 图片大小错误      |
| 216300 | db error                 | DB错误        |
| 216400 | backend error            | 后端系统错误      |
| 216401 | internal error           | 内部错误        |
| 216402 | face not found           | 没有找到人脸      |
| 216500 | unknown error            | 未知错误        |
| 282000 | logic internal error     | 业务逻辑层内部错误   |
| 282001 | logic backend error      | 业务逻辑层后端服务错误 |
| 282202 | antiporn detect timeout  | 检测超时        |
| 282203 | image frame size error   | gif单帧大小超限   |
| 282204 | image frames limit error | gif总帧数超限    |
| 282205 | image fromat must gif    | 图片格式错误      |

# 黄反识别

检测一张图片是否是黄反图片，示例代码如下：


    # 引入AntiPorn SDK
    from aip import AipAntiPorn
    
    # 定义常量
    APP_ID = '你的 App ID'
    API_KEY = '你的 API Key'
    SECRET_KEY = '你的 Secret Key'
    
    # 初始化AipAntiPorn对象
    aipAntiPorn = AipAntiPorn(APP_ID, API_KEY, SECRET_KEY)
    
    # 读取图片
    def get_file_content(filePath):
        with open(filePath, 'rb') as fp:
            return fp.read()
    
    # 调用黄反识别接口
    result = aipAntiPorn.detect(get_file_content('antiporn.jpg'))




**黄反识别 请求参数详情**

| 参数    | 类型     | 描述            | 是否必须 |
| :---- | :----- | :------------ | :--- |
| image | String | 图片参数仅支持图片文件内容 | 是    |

**黄反识别 返回数据参数详情**

| 参数           | 类型       | 描述                          |
| :----------- | :------- | :-------------------------- |
| log_id       | uint64   | 请求标识码，随机数，唯一                |
| result_num   | Int      | 返回结果数目，即：result数组中元素个数      |
| result       | object[] | 结果数组，每项内容对应一个分类维度的结果        |
| +class_name  | String   | 分类结果名称，示例：色情                |
| +probability | double   | 分类结果置信度，示例：0.89471650123596 |

**返回样例：**

```json
// 三分类黄反识别算法
// 该分类probability分值越高，表示越趋近于该分类，最大值为1.0
{
  "log_id": 1744190292,
  "result_num": 3,
  "result": [
    {
      "class_name": "色情",
      "probability": 0.41608
    },
    {
      "class_name": "性感",
      "probability": 0.249851
    },
    {
      "class_name": "正常",
      "probability": 0.334069
    }
  ]
}
```

# GIF色情图像识别

图片接受类型支持本地图片路径字符串，图片文件二进制数组，此接口只支持gif识别，若非gif接口，请使用[黄反识别](#黄反识别)接口。接口会对图片中每一帧进行识别，并返回所有检测结果中色情值最大的为结果。

```
# 引入AntiPorn SDK
from aip import AipAntiPorn

# 定义常量
APP_ID = '你的 App ID'
API_KEY = '你的 API Key'
SECRET_KEY = '你的 Secret Key'

# 初始化AipAntiPorn对象
aipAntiPorn = AipAntiPorn(APP_ID, API_KEY, SECRET_KEY)

# 读取图片
def get_file_content(filePath):
    with open(filePath, 'rb') as fp:
        return fp.read()

# 调用黄反识别接口 必须是gif格式。
result = aipAntiPorn.detect(get_file_content('antiporn.gif'))
```

**GIF色情图像识别 请求参数详情**

| 参数    | 类型     | 描述                        | 是否必须 |
| :---- | :----- | :------------------------ | :--- |
| image | String | 图像数据，支持本地图像文件路径，图像文件二进制数组 | 是    |

**GIF色情图像识别 访问限制**


| 检查项           | 限制条件  |
| ------------- | ----- |
| 图片格式          | gif   |
| 每帧base64编码后大小 | < 4M  |
| 帧数            | 不超过50 |
| 图片base64编码后大小 | < 20M |

**GIF色情图像识别 返回数据参数详情**

| 参数               | 类型            | 描述                          |
| :--------------- | :------------ | :-------------------------- |
| log_id           | uint64        | 请求标识码，随机数，唯一                |
| frame_count      | uint64        | gif总帧数                      |
| porn_probability | double        | 色情识别置信度                     |
| result_num       | Int           | 返回结果数目，即：result数组中元素个数      |
| result           | Array[Object] | 结果数组，每项内容对应一个分类维度的结果        |
| +class_name      | String        | 分类结果名称，示例：色情                |
| +probability     | double        | 分类结果置信度，示例：0.89471650123596 |

**返回示例**

```json
{
    "log_id": 1744190292,
    "frame_count": 9,
    "porn_probability":0.41608
    "result_num": 3,
    "result": [
        {
            "class_name": "色情",
            "probability": 0.41608
        },
        {
            "class_name": "性感",
            "probability": 0.249851
        },
        {
            "class_name": "正常",
            "probability": 0.334069
        }
    ]
}
```

