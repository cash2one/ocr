# encoding:utf-8
import base64
import urllib
import urllib2

from token import access_token

'''
人脸查找之删除接口
'''

deleteUrl = "https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/user/delete"
# 参数uid：用户id（由数字、字母、下划线组成），长度限制128B
params = {"uid": "testuid"}
params = urllib.urlencode(params)
access_token = access_token.AuthService()
deleteUrl = deleteUrl + "?access_token=" + access_token
request = urllib2.Request(url=deleteUrl, data=params)
request.add_header('Content-Type', 'application/x-www-form-urlencoded')
response = urllib2.urlopen(request)
content = response.read()
if content:
    print content
