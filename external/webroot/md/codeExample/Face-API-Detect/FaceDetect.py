# encoding:utf-8
import base64
import urllib
import urllib2

from token import access_token

'''
人脸检测接口
'''

detectUrl = "https://aip.baidubce.com/rest/2.0/face/v1/detect"
# 参数image：图像base64编码，max_face_num：最多处理人脸数目，默认值1，face_fields：包括age,beauty,expression,faceshape,gender,glasses,landmark,race,qualities信息，逗号分隔，默认只返回人脸框、概率和旋转角度
params = {"max_face_num": 1, "face_fields": "age,beauty,expression,faceshape,gender,glasses,landmark,race,qualities",
          "image": "%2F9j%2F4AAQSkZJRgABAQAAAQABAAD%2F4QDKRXhpZgAATU0AK"}
params = urllib.urlencode(params)
access_token = access_token.AuthService()
detectUrl = detectUrl + "?access_token=" + access_token
request = urllib2.Request(url=detectUrl, data=params)
request.add_header('Content-Type', 'application/x-www-form-urlencoded')
response = urllib2.urlopen(request)
content = response.read()
if content:
    print content
