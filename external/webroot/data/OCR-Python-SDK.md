# Python SDK文档

本文档主要介绍OCR图像识别Python SDK的使用，在使用前请先确保已创建应用并具有相应权限。

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

**支持 Python版本：2.7.+ ,3.+**

**安装使用SDK有如下方式：**

- 如果已安装pip，执行`pip install baidu-aip`即可。
- 如果已安装setuptools，执行`python setup.py install`即可。

# 快速入门

## 初始化一个AipOcr对象

AipOcr类提供给开发这一系列的图像识别方法，参考如下代码新建一个AipOcr对象：


    # 引入文字识别OCR SDK
    from aip import AipOcr
    
    # 定义常量
    APP_ID = '你的 App ID'
    API_KEY = '你的 API Key'
    SECRET_KEY = '你的 Secret Key'
    
    # 初始化ApiOcr对象
    aipOcr = AipOcr(APP_ID, API_KEY, SECRET_KEY)


在上面代码中，常量`APP_ID`在百度云控制台中创建，常量`API_KEY`与`SECRET_KEY`是由系统分配给用户的，均为字符串，用于标识用户，为访问服务做签名验证。获取方式请参考[获取AK/SK](../Reference/GetAKSK)。


# 通用文字识别

通用文字识别可以识别出图片中的文字。

举例，对一张图片进行文字识别，示例代码如下：


    # 引入文字识别OCR SDK
    from aip import AipOcr
    
    # 定义常量
    APP_ID = '你的 App ID'
    API_KEY = '你的 API Key'
    SECRET_KEY = '你的 Secret Key'
    
    # 读取图片
    def get_file_content(filePath):
        with open(filePath, 'rb') as fp:
            return fp.read()
    
    # 初始化ApiOcr对象
    aipOcr = AipOcr(APP_ID, API_KEY, SECRET_KEY)
    
    # 调用通用文字识别接口
    result = aipOcr.general(get_file_content('general.jpg'))

传入图片时还想增加一些自定义参数配置：


    # 引入文字识别OCR SDK
    from aip import AipOcr
    
    # 定义常量
    APP_ID = '你的 App ID'
    API_KEY = '你的 API Key'
    SECRET_KEY = '你的 Secret Key'
    
    # 读取图片
    def get_file_content(filePath):
        with open(filePath, 'rb') as fp:
            return fp.read()
    
    # 初始化ApiOcr对象
    aipOcr = AipOcr(APP_ID, API_KEY, SECRET_KEY)
    
    # 定义参数变量
    options = {
      'detect_direction': False,
      'language_type': 'CHN_ENG',
    }
    
    # 调用通用文字识别接口
    result = aipOcr.general(get_file_content('general.jpg'), options)


**通用文字识别options参数详情**

| 参数                    | 类型      | 描述                                       | 是否必须 |
| :-------------------- | :------ | :--------------------------------------- | :--- |
| detect_direction      | Boolean | 检测图像朝向(指输入图像是正常方向、逆时针旋转90/180/270度)，有效值：true、false，默认值: false。 | 否    |
| image                 | String  | 图像数据，仅支持图像文件流                            | 是    |
| language_type         | String  | 识别语言类型(CHN_ENG、ENG、POR、FRE、GER、ITA、SPA、RUS、JAP)，默认为CHN_ENG | 否    |
| mask                  | String  | 表示mask区域的黑白灰度图片，白色代表选中, base64编码         | 否    |
| recognize_granularity | String  | 是否定位单字符位置，big：不定位单字符位置，默认值；small：定位单字符位置 | 否    |

**通用文字识别 返回数据参数详情**

| 参数               | 类型     | 描述                                       |
| :--------------- | :----- | :--------------------------------------- |
| direction        | Int32  | 图像方向，当detect_direction=true时存在。-1:未定义，0:正向，1: 逆时针90度， 2:逆时针180度， 3:逆时针270度 |
| log_id           | Unit64 | 唯一的log id，用于问题定位                         |
| words_result     | Array  | 定位和识别结果数组                                |
| words_result_num | Unit32 | 识别结果数，表示words_result的元素个数                |
| \+location       | Array  | 位置数组（坐标0点为左上角）                           |
| \+\+left         | Unit32 | 表示定位位置的长方形左上顶点的水平坐标                      |
| \+\+top          | Unit32 | 表示定位位置的长方形左上顶点的垂直坐标                      |
| \+\+width        | Unit32 | 表示定位位置的长方形的宽度                            |
| \+\+height       | Unit32 | 表示定位位置的长方形的高度                            |
| \+words          | String | 识别结果字符串                                  |
| \+chars          | Array  | 当单字符结果，recognize_granularity=small时存在    |
| \+\+left         | Unit32 | 表示定位位置的长方形左上顶点的水平坐标                      |
| \+\+top          | Unit32 | 表示定位位置的长方形左上顶点的垂直坐标                      |
| \+\+width        | Unit32 | 表示定位位置的长方形的宽度                            |
| \+\+height       | Unit32 | 表示定位位置的长方形的高度                            |

**返回样例：**

```json
{
  "log_id": 2216743163,
  "words_result": [
    {
      "location": {
        "left": 9,
        "top": 21,
        "width": 763,
        "height": 41
      },
      "words": "众里寻他千百度。蓦然回首,那人却在,灯火阑珊处。"
    }
  ],
  "words_result_num": 1
}
```

# 银行卡识别

银行卡识别能识别出图片中对应的银行卡号。

举例，对一张银行卡进行识别，示例代码如下：


    # 引入文字识别OCR SDK
    from aip import AipOcr
    
    # 定义常量
    APP_ID = '你的 App ID'
    API_KEY = '你的 API Key'
    SECRET_KEY = '你的 Secret Key'
    
    # 读取图片
    def get_file_content(filePath):
        with open(filePath, 'rb') as fp:
            return fp.read()
    
    # 初始化ApiOcr对象
    aipOcr = AipOcr(APP_ID, API_KEY, SECRET_KEY)
    
    # 调用银行卡识别接口
    result = aipOcr.bankcard(get_file_content('bankcard.jpg'))


**银行卡识别 请求参数详情**

| 参数    | 类型     | 描述            | 是否必须 |
| :---- | :----- | :------------ | :--- |
| image | String | 图像数据，仅支持图像文件流 | 是    |

**银行卡识别 返回数据参数详情**

| 参数                 | 类型     | 描述               |
| :----------------- | :----- | :--------------- |
| log_id             | Unit64 | 唯一的log id，用于问题定位 |
| result             | Object | 定位和识别结果数组        |
| \+bank_card_number | String | 银行卡识别结果          |

**返回样例：**

```json
// 银行卡识别会对银行卡号位数校验，即16位数字
// 识别或者校验错误则返回  recognize bank card error
// bank_card_number 即为银行卡号
{
  "log_id": 2376059384,
  "result": {
    "bank_card_number": "8888 8888 8888 8888"
  }
}
```

# 身份证识别

身份证识别一次只能接受身份证正面或反面的清晰图片，能识别出证件上的文字。

举例，对一张身份证正面进行文字识别，示例代码如下：


    # 引入文字识别OCR SDK
    from aip import AipOcr
    
    # 定义常量
    APP_ID = '你的 App ID'
    API_KEY = '你的 API Key'
    SECRET_KEY = '你的 Secret Key'
    
    # 读取图片
    def get_file_content(filePath):
        with open(filePath, 'rb') as fp:
            return fp.read()
    
    # 初始化ApiOcr对象
    aipOcr = AipOcr(APP_ID, API_KEY, SECRET_KEY)
    
    # 设置识别身份证正面参数
    isFront = False
    
    # 调用身份证识别接口
    result = aipOcr.idcard(get_file_content('idcard.jpg'), isFront)

传入图片时还想增加一些自定义参数配置：


    # 引入文字识别OCR SDK
    from aip import AipOcr
    
    # 定义常量
    APP_ID = '你的 App ID'
    API_KEY = '你的 API Key'
    SECRET_KEY = '你的 Secret Key'
    
    # 读取图片
    def get_file_content(filePath):
        with open(filePath, 'rb') as fp:
            return fp.read()
    
    # 初始化ApiOcr对象
    aipOcr = AipOcr(APP_ID, API_KEY, SECRET_KEY)
    
    # 设置识别身份证正面参数
    isFront = False
    
    # 定义参数变量
    options = {
        'detect_direction': False,
        'accuracy': 'high'
    }
    
    # 调用身份证识别接口
    result = aipOcr.idcard(get_file_content('idcard.jpg'), isFront, options)


**身份证识别 请求参数详情**

| 参数               | 类型      | 描述                                       | 是否必须 |
| :--------------- | :------ | :--------------------------------------- | :--- |
| detect_direction | Boolean | 检测图像朝向(指输入图像是正常方向、逆时针旋转90/180/270度)，有效值：true、false，默认值: false。 | 否    |
| id_card_side     | String  | front：身份证正面，back：身份证背面                   | 是    |
| image            | String  | 图像数据，仅支持图像文件流                            | 是    |

**身份证识别 返回数据参数详情**

| 参数               | 类型     | 描述                                       |
| :--------------- | :----- | :--------------------------------------- |
| direction        | Int32  | 图像方向，当detect_direction=true时存在。-1:未定义，0:正向，1: 逆时针90度， 2:逆时针180度， 3:逆时针270度 |
| log_id           | Unit64 | 唯一的log id，用于问题定位                         |
| words_result     | Array  | 定位和识别结果数组，数组元素的key是身份证的主体字段（正面支持：住址、公民身份号码、出生、姓名、性别、民族，背面支持：签发日期、失效日期）。只返回识别出的字段。 |
| words_result_num | Unit32 | 识别结果数，表示words_result的元素个数                |
| \+location       | Array  | 位置数组（坐标0点为左上角）                           |
| \+\+left         | Unit32 | 表示定位位置的长方形左上顶点的水平坐标                      |
| \+\+top          | Unit32 | 表示定位位置的长方形左上顶点的垂直坐标                      |
| \+\+width        | Unit32 | 表示定位位置的长方形的宽度                            |
| \+\+height       | Unit32 | 表示定位位置的长方形的高度                            |
| \+words          | String | 识别结果字符串                                  |

**返回样例：**

```json
// 身份证识别对身份证号码进行校验，如果错误则返回空身份证号
{
  "log_id": 3043122372,
  "words_result": {
    "住址": {
      "location": {
        "left": 93,
        "top": 161,
        "width": 201,
        "height": 51
      },
      "words": "北京市东城区景山前街4紫禁城敬事房"
    },
    "公民身份号码": {
      "location": {
        "left": 97,
        "top": 200,
        "width": 202,
        "height": 27
      },
      "words": "110114198103214083"
    },
    "出生": {
      "location": {
        "left": 97,
        "top": 121,
        "width": 161,
        "height": 17
      },
      "words": "1654年12月20日"
    },
    "姓名": {
      "location": {
        "left": 99,
        "top": 40,
        "width": 64,
        "height": 22
      },
      "words": "韦小宝"
    },
    "性别": {
      "location": {
        "left": 100,
        "top": 83,
        "width": 15,
        "height": 18
      },
      "words": "男"
    },
    "民族": {
      "location": {
        "left": 197,
        "top": 84,
        "width": 14,
        "height": 17
      },
      "words": "汉"
    }
  },
  "words_result_num": 6
}
```
