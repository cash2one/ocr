# PHP SDK文档

# 简介

Hi，您好，欢迎使用百度人脸识别API服务。

本文档主要针对API开发者，描述百度人脸识别接口服务的相关技术内容。如果您对文档内容有任何疑问，可以通过以下几种方式联系我们：

* 在百度云控制台内[提交工单](http://ticket.bce.baidu.com/#/ticket/create)，咨询问题类型请选择**人工智能服务**；
* 加入**开发者QQ群**：224994340；

## 接口能力

| 接口名称           | 接口能力简要描述                    |
| :------------- | :-------------------------- |
| [人脸检测](#人脸检测)  | 检测人脸并定位，返回五官关键点，及人脸各属性值     |
| [人脸比对](#人脸比对)  | 返回两两比对的人脸相似值                |
| [人脸识别](#人脸识别)  | 在人脸库中查找相似的人脸                |
| [人脸认证](#人脸认证)  | 识别上传的图片是否为指定用户              |
| [人脸库设置](#人脸注册) | 对人脸库的相关操作，如注册、删除、更新、查找用户信息等 |

# 快速入门

## 安装人脸检测 PHP SDK

**人脸检测 PHP SDK目录结构**

    BFR
           ├── AipFace.php                     //人脸属性检测类
           ├── lib
           │      ├── AipHttpClient.php        //内部http请求类
           │      ├── AipBCEUtil.php           //内部工具类
           │      ├── AipBase                  //Aip基类
           └── demo     
                  ├── DemoAipFace.php          //人脸属性检测服务示例
                  └── face.jpg                 //人脸图片

**支持 PHP版本：5.3+ **

**使用SDK步骤如下：**

1.在[官方网站](http://ai.baidu.com/sdk)下载PHP SDK压缩工具包。

2.将下载的`aip-face-php-sdk-version.zip`解压后，复制AipFace.php以及lib/*到工程文件夹中。

3.引入AipFace.php

## 初始化一个AipFace对象

AipFace类是与人脸检测交互的客户端，为使用人脸检测的开发人员提供了一系列的交互方法。

用户可以参考如下代码新建一个AipFace对象：

```
// 引入人脸属性检测 SDK
require_once 'AipFace.php';

// 定义常量
const APP_ID = '你的 App ID'
const API_KEY = '你的 API Key';
const SECRET_KEY = '你的 Secret Key';

// 初始化AipFace对象
$aipFace = new AipFace(APP_ID, API_KEY, SECRET_KEY);
```

在上面代码中，常量`APP_ID`在百度云控制台中创建，常量`API_KEY`与`SECRET_KEY`是在创建完毕应用后，系统分配给用户的，均为字符串，用于标识用户，为访问做签名验证，可在AI服务控制台中的**应用列表**中查看。  

**注意：**如您以前是百度云的老用户，其中`API_KEY`对应百度云的“Access Key ID”，`SECRET_KEY`对应百度云的“Access Key Secret”。

## 配置AipFace

如果用户需要配置AipFace的一些细节参数(一般不需要配置)，可以在构造AipFace之后调用接口设置参数，目前只支持以下参数：

| 接口                           | 说明                      |
| ---------------------------- | ----------------------- |
| setConnectionTimeoutInMillis | 建立连接的超时时间（单位：毫秒         |
| setSocketTimeoutInMillis     | 通过打开的连接传输数据的超时时间（单位：毫秒） |




# 接口调用
## 人脸检测

###接口描述

检测请求图片中的人脸，返回人脸位置、72个关键点坐标、及人脸相关属性信息。

检测响应速度，与图片中人脸数量相关，人脸数量较多时响应时间会有些许延长。

典型应用场景：如**人脸属性分析**，**基于人脸关键点的加工分析**，**人脸营销活动**等。

> 五官位置会标记具体坐标；72个关键点坐标也包含具体坐标，但不包含对应位置的详细位置描述。

### 请求说明

图片接受类型支持本地图片路径字符串，图片文件二进制数组。

举例，要对一张图片进行人脸识别，具体的人脸信息在返回的result字段中：

```php
// 引入人脸属性检测 SDK
require_once 'AipFace.php';

// 定义常量
const APP_ID = '你的 App ID'
const API_KEY = '你的 API Key';
const SECRET_KEY = '你的 Secret Key';

// 初始化AipFace
$aipFace = new AipFace(APP_ID, API_KEY, SECRET_KEY);

// 调用人脸属性识别接口
$result = $aipFace->detect(file_get_contents('face.jpg'));
```
传入图片时还想增加一些自定义参数配置：

```php
// 引入人脸属性检测 SDK
require_once 'AipFace.php';

// 定义常量
const APP_ID = '你的 App ID'
const API_KEY = '你的 API Key';
const SECRET_KEY = '你的 Secret Key';

// 初始化ApiFace
$aipFace = new AipFace(APP_ID, API_KEY, SECRET_KEY);

// 定义参数变量
$option = array(
  'max_face_num' => 1,
  'face_fields' => 'expression'
);

// 调用人脸属性识别接口
$result = $aipFace->detect(file_get_contents('face.jpg'), $option);
```

**人脸检测 请求参数详情**

| 参数           | 类型      | 描述                                       | 是否必须 |
| :----------- | :------ | :--------------------------------------- | :--- |
| face_fields  | Boolean | 包括age、beauty、expression、faceshape、gender、glasses、landmark、race、qualities信息，逗号分隔，默认只返回人脸框、概率和旋转角度。 | 否    |
| max_face_num | unit32  | 最多处理人脸数目，默认值1                            | 是    |
| image        | String  | 图像数据                                     | 是    |

###返回说明

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



## 人脸两两比对

### 接口描述

该请求用于比对多张图片中的人脸相似度并返回两两比对的得分，可用于判断两张脸是否是同一人的可能性大小。

典型应用场景：如**人证合一验证**，**用户认证**等，可与您现有的人脸库进行比对验证。

> **说明：**支持对比对的两张图片做在线活体检测

### 请求说明

举例，要对一组人脸图片进行两两比对，示例代码如下：

```php
// 引入人脸识别 SDK
require_once 'AipFace.php';

// 定义常量
const APP_ID = '你的 App ID'
const API_KEY = '你的 API Key';
const SECRET_KEY = '你的 Secret Key';

// 初始化ApiFace
$aipFace = new AipFace(APP_ID, API_KEY, SECRET_KEY);

// 调用人脸两两比对接口
$result = $aipFace->match(array(
	file_get_contents('face1.jpg'),
    file_get_contents('face2.jpg'),
    file_get_contents('face3.jpg'),
    file_get_contents('face4.jpg'),
));
```

**人脸比对请求参数**：

所有图片经base64编码后的图片数据总和不超过10M。

以下可选参数放在接口最后的options参数中。

| 参数             | 是否必选 | 类型     | 说明                                       |
| -------------- | ---- | ------ | ---------------------------------------- |
| ext_fields     | 否    | string | 返回质量信息，取值固定: 目前支持qualities(质量检测)。(对所有图片都会做改处理) |
| image_liveness | 否    | string | 返回的活体信息，“faceliveness,faceliveness” 表示对比对的两张图片都做活体检测；“,faceliveness” 表示对第一张图片不做活体检测、第二张图做活体检测；“faceliveness,” 表示对第一张图片做活体检测、第二张图不做活体检测 |

### 返回说明

| 字段            | 是否必选 | 类型            | 说明                                       |
| ------------- | ---- | ------------- | ---------------------------------------- |
| log_id        | 是    | uint64        | 请求唯一标识码，随机数                              |
| result_num    | 是    | uint32        | 返回结果数目，即：result数组中元素个数                   |
| result        | 是    | array(object) | 结果数据，index和请求图片index对应。数组元素为每张图片的匹配得分数组，top n。 得分[0,100.0] |
| +index_i      | 是    | uint32        | 比对图片1的index                              |
| +index_j      | 是    | uint32        | 比对图片2的index                              |
| +score        | 是    | double        | 比对得分                                     |
| ext_info      | 否    | array（dict）   | 对应参数中的ext_fields                         |
| +qualities    | 否    | string        | 质量相关的信息，无特殊需求可以不使用                       |
| +faceliveness | 否    | string        | 活体分数“0,0.9999”（表示第一个图不做活体检测、第二个图片活体分数为0.9999） |

**返回样例：**

```json
//请求为四张图片，第三张解析失败
{
    "log_id": 73473737,
    "result_num":3,
    "result": [
        {
            "index_i": 0,
            "index_j": 1,
            "score": 44.3
        },
        {
            "index_i": 0,
            "index_j": 3,
            "score": 89.2
        },
        {
            "index_i": 1,
            "index_j": 3,
            "score": 10.4
        }
        ……
    ]
}
```

## 人脸识别

### 接口描述

用于计算指定组内用户，与上传图像中人脸的相似度。识别前提为您已经创建了一个**[人脸库](#人脸注册)**。

典型应用场景：如**人脸闸机**，**考勤签到**，**安防监控**等。

> **说明：**人脸识别返回值不直接判断是否是同一人，只返回用户信息及相似度分值。

> **说明：**推荐可判断为同一人的相似度分值为**80**，您也可以根据业务需求选择更合适的阈值。

### 请求说明

举例，要计算一张图片与指定组group1内用户相似度：

```php
# 该参数如果不填则使用默认值
$options = array(
	'user_top_num' => 1,
  'face_top_num' => 1,
);

$aipFace->identifyUser(
  					'group1',
            file_get_content('face.jpg'),  
						$options
					);
```

**人脸识别请求参数详情**：

| 参数           | 是否必选 | 类型     | 说明                                       |
| ------------ | ---- | ------ | ---------------------------------------- |
| group_id     | 是    | string | 用户组id（由数字、字母、下划线组成）列表，每个groupid长度限制48    |
| image        | 是    | string | 图像数据                                     |
| ext_fields   | 否    | string | 特殊返回信息，多个用逗号分隔，取值固定: 目前支持 faceliveness(活体检测) |
| user_top_num | 否    | uint32 | 返回用户top数，默认为1，最多返回5个                     |

### 返回说明

| 字段            | 是否必选 | 类型            | 说明                               |
| ------------- | ---- | ------------- | -------------------------------- |
| log_id        | 是    | uint64        | 请求唯一标识码，随机数                      |
| result_num    | 是    | uint32        | 返回结果数目，即：result数组中元素个数           |
| ext_info      | 否    | array         | 对应参数中的ext_fields                 |
| +faceliveness | 否    | string        | 活体分数，如0.49999                    |
| result        | 是    | array(object) | 结果数组                             |
| +group_id     | 是    | string        | 对应的这个用户的group_id                 |
| +uid          | 是    | string        | 匹配到的用户id                         |
| +user_info    | 是    | string        | 注册时的用户信息                         |
| +scores       | 是    | array(double) | 结果数组，数组元素为匹配得分，top n。得分[0,100.0] |


**返回样例：*

```json
{
    "log_id": 73473737,
    "result_num":1,
    "result": [
        {
            "group_id" : "group1",
            "uid": "123",
            "user_info": "user info",
            "scores": [
                    99.3,
                    83.4
            ]
        }
    ]
}
```

## 人脸认证

### 接口描述

用于识别上传的图片是否为指定用户，即查找前需要先确定要查找的用户在人脸库中的id。

典型应用场景：如**人脸登录**，**人脸签到**等

> **说明：**人脸认证与人脸识别的差别在于：人脸识别需要指定一个待查找的人脸库中的组；而人脸认证需要指定具体的用户id即可，不需要指定具体的人脸库中的组；实际应用中，人脸认证需要用户或系统先输入id，这增加了验证安全度，但也增加了复杂度，具体使用哪个接口需要视您的业务场景判断。

> **说明：**请求参数中，新增在线活体检测

### 请求说明

举例，要认证一张图片在指定group中是否为uid1的用户：

```php
# 该参数如果不填则使用默认值
$options = array(
	'top_num' => 1,
);

$aipFace->verifyUser(
  					'uid1',
  					'group1',
            		file_get_content('face.jpg'),
					$options
					);
```

**人脸认证请求参数详情**：

可选参数均放在接口最后的options参数中。

| 参数         | 是否必选 | 类型     | 说明                                       |
| ---------- | ---- | ------ | ---------------------------------------- |
| uid        | 是    | string | 用户id（由数字、字母、下划线组成），长度限制128B              |
| image      | 是    | string | 图像数据                                     |
| group_id   | 是    | string | 用户组id（由数字、字母、下划线组成）列表，每个groupid长度限制48    |
| top_num    | 否    | uint32 | 返回匹配得分top数，默认为1                          |
| ext_fields | 否    | string | 特殊返回信息，多个用逗号分隔，取值固定: 目前支持 faceliveness(活体检测) |

###返回说明

| 字段            | 是否必选 | 类型            | 说明                                       |
| ------------- | ---- | ------------- | ---------------------------------------- |
| log_id        | 是    | uint64        | 请求唯一标识码，随机数                              |
| result_num    | 是    | uint32        | 返回结果数目，即：result数组中元素个数                   |
| result        | 是    | array(double) | 结果数组，数组元素为匹配得分，top n。 得分范围[0,100.0]。推荐得分超过80可认为认证成功 |
| ext_info      | 否    | array         | 对应参数中的ext_fields                         |
| +faceliveness | 否    | string        | 活体分数，如0.49999                            |

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
## 人脸注册

### 接口描述

用于从人脸库中新增用户，可以设定多个用户所在组，及组内用户的人脸图片，

典型应用场景：构建您的人脸库，如**会员人脸注册**，**已有用户补全人脸信息**等。

人脸库、用户组、用户、用户下的人脸**层级关系**如下所示：

```json
|- 人脸库
   |- 用户组一
      |- 用户01
         |- 人脸
      |- 用户02
         |- 人脸
         |- 人脸
         ....
       ....
   |- 用户组二
   |- 用户组三
   |- 用户组四
   ....
```

**说明：关于人脸库的设置限制** 

* 每个开发者账号只能创建一个人脸库；
* 每个人脸库下，用户组（group）数量没有限制；
* 每个用户组（group）下，可添加最多**300000**张人脸，如每个uid注册一张人脸，则**最多300000个**用户uid；
* 每个用户（uid）所能注册的最大人脸数量**没有限制**；

> **说明：**人脸注册完毕后，生效时间最长为**35s**，之后便可以进行识别或认证操作。

> **说明：**注册的人脸，建议为用户正面人脸。

> **说明：**uid在库中已经存在时，对此uid重复注册时，新注册的图片默认会**追加**到该uid下，如果手动选择`action_type:replace`，则会用新图替换库中该uid下所有图片。

### 请求说明

举例，要注册一个新用户，用户id为uid1，加入组id为group1, 注册成功后服务端会返回操作的logid：

```php
$aipFace->addUser(	
  'uid1', 
  'user info', 
  'group1',
  file_get_content('user.jpg')
);
```

**人脸注册请求参数要求**：

所有图片经base64编码后的图片数据总和不超过10M。

**人脸注册返回数据参数详情**：

| 参数          | 是否必选  | 类型     | 说明                                       |
| ----------- | ----- | ------ | ---------------------------------------- |
| uid         | 是     | string | 用户id（由数字、字母、下划线组成），长度限制128B              |
| image       | 是     | string | 图片数据                                     |
| group_id    | 是     | string | 用户组id（由数字、字母、下划线组成），长度限制48               |
| user_info   | **是** | string | 新的user_info信息                            |
| action_type | 否     | string | 如果为replace时，则uid不存在时，不报错，会自动注册。 不存在该参数时，如果uid不存在会提示错误 |

### 返回说明

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

用于对人脸库中指定用户，更新其下的人脸图像。

> **说明：**针对一个uid执行更新操作，新上传的人脸图像将覆盖此uid原有所有图像。

> **说明：**执行更新操作，如果该uid不存在时，会返回错误。如果添加了action_type:replace,则不会报错，并自动注册该uid，操作结果等同注册新用户。

### 请求说明

举例，要更新一个新用户，用户id为uid1， 更新成功后服务端会返回操作的logid：

```php
$aipFace->updateUser(
  'uid1', 
  'user info', 
  'group1',
  file_get_content('new_user.jpg')
);
```


**人脸更新请求参数详情**：

| 参数        | 是否必选  | 类型     | 说明                          |
| --------- | ----- | ------ | --------------------------- |
| uid       | 是     | string | 用户id（由数字、字母、下划线组成），长度限制128B |
| image     | 是     | string | 图片数据                        |
| group_id  | 是     | string | 用户组id（由数字、字母、下划线组成），长度限制48  |
| user_info | **是** | string | 新的user_info信息               |

### 返回说明

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

举例，要删除一个用户id为uid1， 删除成功后服务端会返回操作的logid：

```php
$aipFace->deleteUser('uid1');
```

**人脸删除请求参数要求**：

uid需要在库中已存在，且组成为字母/数字/下划线，长度不超过128B。

**人脸删除返回数据参数详情**：

| 字段     | 是否必选 | 类型     | 说明           |
| ------ | ---- | ------ | ------------ |
| log_id | 是    | uint64 | 请求标识码，随机数，唯一 |

**返回样例：**

```json
// 删除成功
{
    "log_id": 73473737,
}
// 删除发生错误
{
  "error_code": 216612,
  "log_id": 1137508902,
  "error_msg": "user not exist"
}
```

## 用户信息查询

### 接口描述

用于查询人脸库中某用户的详细信息。

### 请求说明

举例，要查询指定用户的信息：

```php
//查询所有分组下的
$aipFace->getUser('uid1');

//查询指定分组下的
$aipFace->getUser('uid1' array(
	'group_id' => 'group1',
));
```

**用户信息查询请求参数要求**：

uid需要在库中已存在，且组成为字母/数字/下划线，长度不超过128B。

以下可选参数放在接口最后的options参数中。

| 参数       | 是否必选 | 类型     | 说明   |
| -------- | ---- | ------ | ---- |
| group_id | 否    | string | 用户   |

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

### 接口描述

用于查询用户组的列表。

举例：

```php
# 该参数如果不填则使用默认值
$options = array(
	'start' => 0,
  	'num' => 100,
);

$aipFace->getGroupList($options);
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
        "group1",
        "group2"
    ],
    "log_id": 3314921889
}
```

## 组内用户列表查询

### 接口描述

用于查询指定用户组中的用户列表。

举例：

```php
# 该参数如果不填则使用默认值
$options = array(
  'start' => 0,
  'num' => 100,
);

$aipFace->getGroupUsers('group1', $options);
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

### 接口描述

用于将已经存在于人脸库中的用户添加到一个新的组。

> **说明：**并不是向一个指定组内添加用户，而是直接从其它组复制用户信息

### 请求说明

举例：

```php
$aipFace->addGroupUser('src_group', 'dst_group', 'uid1');
```

**组内添加用户请求参数详情**：

| 参数       | 是否必选 | 类型     | 说明    |
| -------- | ---- | ------ | ----- |
| group_id | 是    | string | 用户组id |
| uid      | 是    | string | 用户id  |

**组内添加用户请求参数详情**：

| 参数           | 是否必选 | 类型     | 说明            |
| ------------ | ---- | ------ | ------------- |
| src_group_id | 是    | string | 从指定group里复制信息 |
| group_id     | 是    | string | 需要添加信息的组id列表  |
| uid          | 是    | string | 用户id          |

###返回说明

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

### 接口描述

用于将用户从某个组中删除，但不会删除用户在其它组的信息。

> **说明：**当用户仅属于单个分组时，本接口将返回错误，请使用**人脸删除接口**

### 请求说明

举例：


```php
$aipFace->deleteGroupUser('group1', 'uid1');
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

# 错误信息

若请求错误，服务器将返回的JSON文本包含以下参数：

##错误返回格式

- **error_code：**错误码；关于错误码的详细信息请参考**通用错误码**和**业务相关错误码**。
- **error_msg：**错误描述信息，帮助理解和解决发生的错误。

##错误码
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
