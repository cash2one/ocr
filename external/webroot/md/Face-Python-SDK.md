# Python SDK文档

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

**支持 Python版本：2.7.+ ,3.+**

**安装使用SDK有如下方式：**

* 如果已安装pip，执行`pip install baidu-aip`即可。
* 如果已安装setuptools，执行`python setup.py install`即可。


# 快速入门

## 初始化一个AipFace对象

AipFace类提供给开发者一系列人脸识别的方法，参考如下代码新建一个AipFace对象：


    # 引入人脸识别 SDK
    from aip import AipFace
    
    # 定义常量
    APP_ID = '你的 App ID'
    API_KEY = '你的 API Key'
    SECRET_KEY = '你的 Secret Key'
    
    # 初始化AipFace对象
    aipFace = AipFace(APP_ID, API_KEY, SECRET_KEY)


在上面代码中，常量`APP_ID`在百度云控制台中创建，常量`API_KEY`与`SECRET_KEY`是由系统分配给用户的，均为字符串，用于标识用户，为访问服务做签名验证。获取方式请参考[获取AK/SK](../Reference/GetAKSK)。

## 配置AipFace

如果用户需要配置AipFace的一些细节参数(一般不需要配置)，可以在构造AipFace之后调用接口设置参数，目前只支持以下参数：

| 接口                           | 说明                      |
| ---------------------------- | ----------------------- |
| setConnectionTimeoutInMillis | 建立连接的超时时间（单位：毫秒         |
| setSocketTimeoutInMillis     | 通过打开的连接传输数据的超时时间（单位：毫秒） |

# 错误信息格式

若请求错误，服务器将返回的JSON文本包含以下参数：

- **error_code：**错误码；关于错误码的详细信息请参考**通用错误码**和**业务相关错误码**。
- **error_msg：**错误描述信息，帮助理解和解决发生的错误。

**SDK本地检测参数返回的错误码**：

| error_code | error_msg                        | 备注              |
| ---------- | -------------------------------- | --------------- |
| SDK100     | image size error                 | 图片大小超限          |
| SDK101     | image length error               | 图片边长不符合要求       |
| SDK102     | read image file error            | 读取图片文件错误        |
| SDK103     | user_info size error             | user_info参数大小错误 |
| SDK104     | group_id format error            | group_id有非法字符   |
| SDK105     | group_id size error              | group_id参数大小错误  |
| SDK106     | uid format error                 | uid有非法字符        |
| SDK107     | uid size error                   | uid参数大小错误       |
| SDK108     | connection or read data time out | 连接超时或读取数据超时     |
| SDK109     | unsupported image format         | 不支持的图片格式        |

**服务端返回的错误码**

| 错误码    | 错误信息                   | 描述        |
| ------ | ---------------------- | --------- |
| 216015 | module closed          | 模块关闭      |
| 216100 | invalid param          | 非法参数      |
| 216101 | not enough param       | 参数数量不够    |
| 216102 | service not support    | 业务不支持     |
| 216103 | param too long         | 参数太长      |
| 216110 | appid not exist        | APP ID不存在 |
| 216111 | invalid userid         | 非法用户ID    |
| 216200 | empty image            | 空的图片      |
| 216201 | image format error     | 图片格式错误    |
| 216202 | image size error       | 图片大小错误    |
| 216300 | db error               | DB错误      |
| 216400 | backend error          | 后端系统错误    |
| 216401 | internal error         | 内部错误      |
| 216402 | face not found         | 没有找到人脸    |
| 216500 | unknown error          | 未知错误      |
| 216611 | user not exist         | 用户不存在     |
| 216613 | user not found         | 用户查找不到    |
| 216614 | not enough images      | 图片信息不完整   |
| 216615 | fail to process images | 处理图片信息失败  |
| 216616 | image existed          | 图片已存在     |
| 216617 | fail to add user       | 添加用户失败    |
| 216618 | no user in group       | 群组里没有用户   |
| 216630 | recognize error        | 识别错误      |

# 人脸属性检测

基于百度业界领先的智能人脸分析算法，提供人脸检测、人脸识别、关键点定位、属性识别和活体检测等。

对一张图片进行人脸属性检测，示例代码如下：


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

增加一些自定义参数：


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

# 人脸查找

## 人脸注册

人脸注册接口提供了使用上传图片进行注册新用户的功能，需要指定注册用户的id和描述信息，所在组id以及本地用户人脸图片。
**注：每个用户（uid）所能注册的最大人脸数量为5张。** 

举例，要注册一个新用户，用户id为uid1，加入组id为group1, 注册成功后服务端会返回操作的logid：

```
# 读取图片
def get_file_content(filePath):
    with open(filePath, 'rb') as fp:
        return fp.read()

aipFace.addUser(	
  					'uid1', 
  					'test_user_info', 
  					'group1',
  					[
                      	get_file_content('user.jpg'),
  					]
                 )
```

**人脸注册请求参数要求**：

所有图片经base64编码后的图片数据总和不超过10M。

**人脸注册返回数据参数详情**：

| 字段     | 是否必选 | 类型     | 说明           |
| ------ | ---- | ------ | ------------ |
| log_id | 是    | uint64 | 请求标识码，随机数，唯一 |

**返回样例：**

```json
// 注册成功
{
    "log_id": 73473737,
}
// 注册发生错误
{
  "error_code": 216616,
  "log_id": 674786177,
  "error_msg": "image exist"
}
```

## 人脸更新

人脸更新接口提供了为已有用户更新人脸图像的功能，**新上传的图片将覆盖原有图像**。

举例，要更新一个新用户，用户id为uid1， 更新成功后服务端会返回操作的logid：

```
# 读取图片
def get_file_content(filePath):
    with open(filePath, 'rb') as fp:
        return fp.read()

aipFace.updateUser(
  						'uid1', 
  						[
                        	get_file_content('newuser.jpg'),
                        ]
					)
```

**人脸更新请求参数要求**

uid需要在库中已存在，且组成为字母/数字/下划线，长度不超过128B。所有图片经base64编码后的图片数据总和不超过20M。

**人脸注册返回数据参数详情**：

| 字段     | 是否必选 | 类型     | 说明           |
| ------ | ---- | ------ | ------------ |
| log_id | 是    | uint64 | 请求标识码，随机数，唯一 |

**返回样例：**

```json
// 更新成功
{
    "log_id": 73473737,
}
// 更新发生错误
{
  "error_code": 216612,
  "log_id": 1137508902,
  "error_msg": "user not exist"
}
```

## 人脸删除

人脸删除接口提供了从库中彻底删除一个用户的功能，包括用户所有图像和身份信息，同时也将从各个组中把用户删除。

举例，要删除一个新用户，用户id为uid1， 删除成功后服务端会返回操作的logid：

```
aipFace.deleteUser('uid1')
```

**人脸删除请求参数要求**：

uid需要在库中已存在，且组成为字母/数字/下划线，长度不超过128B。

**人脸删除返回数据参数详情**：

| 字段     | 是否必选 | 类型     | 说明           |
| ------ | ---- | ------ | ------------ |
| log_id | 是    | uint64 | 请求标识码，随机数，唯一 |

**返回样例：**

```json
// 更新成功
{
    "log_id": 73473737,
}
// 更新发生错误
{
  "error_code": 216612,
  "log_id": 1137508902,
  "error_msg": "user not exist"
}
```

## 人脸认证

人脸认证接口用于识别上传的图片是否为指定用户。

举例，要认证一些图片是否为uid1的用户：

```
# 该参数如果不填则使用默认值
options = {
	'top_num': 1,
}

# 读取图片
def get_file_content(filePath):
    with open(filePath, 'rb') as fp:
        return fp.read()

aipFace.verifyUser(
  						'uid1',
  						[
                      		get_file_content('user.jpg'),  
                        ],
						options
					)
```

**人脸认证参数详情**：

| 参数      | 是否必选 | 类型     | 说明                            |
| ------- | ---- | ------ | ----------------------------- |
| uid     | 是    | string | 用户id（由数字、字母、下划线组成），长度限制128B   |
| images  | 是    | string | 图像base64编码,多张图片半角逗号分隔，总共最大10M |
| top_num | 否    | uint32 | 返回匹配得分top数，默认为1               |

**人脸认证返回数据参数详情**：

| 字段         | 是否必选 | 类型            | 说明                                       |
| ---------- | ---- | ------------- | ---------------------------------------- |
| log_id     | 是    | uint64        | 请求标识码，随机数，唯一                             |
| result_num | 是    | uint32        | 返回结果数目，即：result数组中元素个数                   |
| result     | 是    | array(double) | 结果数组，数组元素为匹配得分，top n。 得分范围[0,100.0]。得分超过80可认为认证成功 |

**返回样例：**

```json
{
  "results": [
    93.86580657959,
    92.237548828125
  ],
  "result_num": 2,
  "log_id": 1629483134
}
```

## 人脸识别

人脸识别接口用于计算指定组内用户与上传图像的相似度。

举例，要计算一些图片与指定组内各用户相似度：

```
# 该参数如果不填则使用默认值
options = {
	'user_top_num': 1,
  	'face_top_num': 1,
}

# 读取图片
def get_file_content(filePath):
    with open(filePath, 'rb') as fp:
        return fp.read()

aipFace.identifyUser(
  						'group1',
  						[
                      		get_file_content('user.jpg'),  
                        ],
						options
					)
```

**人脸识别参数详情**：

| 参数           | 是否必选 | 类型     | 说明                            |
| ------------ | ---- | ------ | ----------------------------- |
| group_id     | 是    | string | 用户组id（由数字、字母、下划线组成），长度限制128B  |
| images       | 是    | string | 图像base64编码,多张图片半角逗号分隔，总共最大10M |
| user_top_num | 否    | uint32 | 返回用户top数，默认为1                 |
| face_top_num | 否    | uint32 | 单用户人脸匹配得分top数，默认为1            |

**人脸识别返回数据参数详情**：

| 字段         | 是否必选 | 类型            | 说明                                |
| ---------- | ---- | ------------- | --------------------------------- |
| log_id     | 是    | uint64        | 请求标识码，随机数，唯一                      |
| result_num | 是    | uint32        | 返回结果数目，即：result数组中元素个数            |
| result     | 是    | array(double) | 结果数组                              |
| +uid       | 是    | string        | 匹配到的用户id                          |
| +user_info | 是    | string        | 注册时的用户信息                          |
| +scores    | 是    | array(double) | 结果数组，数组元素为匹配得分，top n。 得分[0,100.0] |

**返回样例：**

```json
{
    "log_id": 73473737,
    "result_num":1,
    "result": [
        {
            "uid": "u333333",
            "user_info": "Test User",
            "scores": [
                    99.3,
                    83.4
            ]
        }
    ]
}
```

## 用户信息查询

用户信息查询接口用于查询某用户的详细信息。

举例，要查询指定用户的信息：

```
aipFace.getUser('uid1')
```

**用户信息查询请求参数要求**：

uid需要在库中已存在，且组成为字母/数字/下划线，长度不超过128B。

**用户信息查询返回数据参数详情**：

| 字段         | 是否必选 | 类型            | 说明           |
| ---------- | ---- | ------------- | ------------ |
| log_id     | 是    | uint64        | 请求标识码，随机数，唯一 |
| result     | 是    | array(double) | 结果数组         |
| +uid       | 是    | string        | 匹配到的用户id     |
| +user_info | 是    | string        | 注册时的用户信息     |
| +groups    | 是    | array(string) | 用户所属组列表      |

**返回样例：**

```json
{
    "result": {
        "uid": "testuser2",
        "user_info": "registed user info ...",
        "groups": [
            "grp1",
            "grp2",
            "grp3"
        ]
    },
    "log_id": 2979357502
}
```

## 组列表查询

组列表查询接口用于查询一个app下所有组的列表。

举例：

```
# 该参数如果不填则使用默认值
options = {
	'start': 1,
  	'num': 100,
}

aipFace.getGroupList(options)
```

**组列表查询请求参数详情**：

| 参数    | 是否必选 | 类型     | 说明                  |
| ----- | ---- | ------ | ------------------- |
| start | 否    | uint32 | 默认值0，起始序号           |
| num   | 否    | uint32 | 返回数量，默认值100，最大值1000 |

**组列表查询返回数据参数详情**：

| 字段         | 是否必选 | 类型            | 说明           |
| ---------- | ---- | ------------- | ------------ |
| log_id     | 是    | uint64        | 请求标识码，随机数，唯一 |
| result_num | 是    | uint32        | 返回个数         |
| result     | 是    | array(string) | group_id列表   |

**返回样例：**

```json
{
    "result_num": 2,
    "result": [
        "grp1",
        "grp2"
    ],
    "log_id": 3314921889
}
```

## 组内用户列表查询

组内用户列表查询接口用于查询一个用户组内所有的用户信息。

举例：

```
# 该参数如果不填则使用默认值
options = {
	'start': 1,
  	'num': 100,
}

aipFace.getGroupUsers('group1', options)
```

**组内用户列表查询请求参数详情**：

| 参数       | 是否必选 | 类型     | 说明                  |
| -------- | ---- | ------ | ------------------- |
| group_id | 是    | string | 用户组id               |
| start    | 否    | uint32 | 默认值0，起始序号           |
| num      | 否    | uint32 | 返回数量，默认值100，最大值1000 |

**组内用户列表查询返回数据参数详情**：

| 字段         | 是否必选 | 类型            | 说明           |
| ---------- | ---- | ------------- | ------------ |
| log_id     | 是    | uint64        | 请求标识码，随机数，唯一 |
| result_num | 是    | uint32        | 返回个数         |
| result     | 是    | array(object) | user列表       |
| +uid       | 是    | string        | 用户id         |
| +user_info | 是    | string        | 用户信息         |

**返回样例：**

```json
{
    "log_id": 3314921889,
    "result_num": 2,
    "result": [
        {
            "uid": "uid1",
            "user_info": "user info 1"
        },
        {
            "uid": "uid2",
            "user_info": "user info 2"
        }
    ]
}
```

## 组内添加用户

组内添加用户接口用于把一个已经存在于库中的用户添加到新的用户组中。

举例：

```
aip.addGroupUser('group1', 'uid1')
```

**组内添加用户请求参数详情**：

| 参数       | 是否必选 | 类型     | 说明    |
| -------- | ---- | ------ | ----- |
| group_id | 是    | string | 用户组id |
| uid      | 是    | string | 用户id  |

**组内添加用户接口返回数据参数详情**：

| 字段     | 是否必选 | 类型     | 说明           |
| ------ | ---- | ------ | ------------ |
| log_id | 是    | uint64 | 请求标识码，随机数，唯一 |

**返回样例：**

```json
// 正确返回值 
{
    "log_id": 3314921889,
}
// 发生错误时返回值 
{
  "error_code": 216100,
  "log_id": 3111284097,
  "error_msg": "already add"
}
```

## 组内删除用户

组内删除用户接口用于把一个用户从某个组中删除，但不会删除用户在其它组内的信息。当用户仅属于单个分组时，本接口将返回错误。

举例：

```
aip.deleteGroupUser('group1', 'uid1')
```

**组内删除用户请求参数详情**：

| 参数       | 是否必选 | 类型     | 说明    |
| -------- | ---- | ------ | ----- |
| group_id | 是    | string | 用户组id |
| uid      | 是    | string | 用户id  |

**组内删除用户接口返回数据参数详情**：

| 字段     | 是否必选 | 类型     | 说明           |
| ------ | ---- | ------ | ------------ |
| log_id | 是    | uint64 | 请求标识码，随机数，唯一 |

**返回样例：**

```json
// 正确返回值 
{
    "log_id": 3314921889,
}
// 发生错误时返回值 
{
  "error_code": 216619,
  "log_id": 815967402,
  "error_msg": "user must be in one group at least"
}
```

