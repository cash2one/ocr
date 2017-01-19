#Python SDK文档

本文档主要介绍黄反识别Python SDK的使用，在使用前请先确保已创建应用并具有相应权限。

# 安装Python SDK

**Python SDK目录结构**

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

基于百度业界领先的图像识别算法，提供图片黄反识别服务。

## 初始化一个AipAntiPorn对象

用户可以参考如下代码初始化一个AipAntiPorn对象：

```Python
# 引入AntiPorn SDK
from aip import AipAntiPorn

# 定义常量
APP_ID = '你的 App ID'
API_KEY = '你的 API Key'
SECRET_KEY = '你的 Secret Key'

# 初始化AipAntiPorn对象
aipAntiPorn = AipAntiPorn(APP_ID, API_KEY, SECRET_KEY)
```

在上面代码中，常量`APP_ID`在百度云控制台中创建，常量`API_KEY`与`SECRET_KEY`是由系统分配给用户的，均为字符串，用于标识用户，为访问服务做签名验证。获取方式请参考[获取AK/SK](../Reference/GetAKSK)。


# 黄反识别

检测一张图片是否是黄反图片，示例代码如下：

```Python
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
```



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

# 版本更新说明

##

* 第一版



