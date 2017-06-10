# encoding:utf-8
import base64
import urllib
import urllib2

from token import access_token

'''
人脸查找之认证接口
'''

verifyUrl = "https://aip.baidubce.com/rest/2.0/face/v2/verify"
# 参数uid：用户id（由数字、字母、下划线组成）images：图像base64编码,多张图片半角逗号分隔
params = {"uid": "testuid",
          "images": "【图片base64编码】"}
params = urllib.urlencode(params)
access_token = access_token.AuthService()
verifyUrl = verifyUrl + "?access_token=" + access_token
request = urllib2.Request(url=verifyUrl, data=params)
request.add_header('Content-Type', 'application/x-www-form-urlencoded')
response = urllib2.urlopen(request)
content = response.read()
if content:
    print content
