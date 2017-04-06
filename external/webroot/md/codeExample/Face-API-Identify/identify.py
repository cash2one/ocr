# encoding:utf-8
import base64
import urllib
import urllib2

from token import access_token

'''
人脸查找之识别接口
'''

identifyUrl = "https://aip.baidubce.com/rest/2.0/faceverify/v1/identify"
# 参数group_id：用户组id（由数字、字母、下划线组成）images：图像base64编码,多张图片半角逗号分隔
params = {"group_id": "gid",
          "images": "%2F9j%2F4AAQSkZJRgABAQAAAQABAAD%2F4QDKRXhpZgAATU0AK"}
params = urllib.urlencode(params)
access_token = access_token.AuthService()
identifyUrl = identifyUrl + "?access_token=" + access_token
request = urllib2.Request(url=identifyUrl, data=params)
request.add_header('Content-Type', 'application/x-www-form-urlencoded')
response = urllib2.urlopen(request)
content = response.read()
if content:
    print content
