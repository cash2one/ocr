# encoding:utf-8
import base64
import urllib
import urllib2

from token import access_token

'''
人脸查找之用户信息查询接口
'''

userInfoUrl = "https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/user/get"
params = {"uid": "testuid"}
params = urllib.urlencode(params)
access_token = access_token.AuthService()
userInfoUrl = userInfoUrl + "?access_token=" + access_token
request = urllib2.Request(url=userInfoUrl, data=params)
request.add_header('Content-Type', 'application/x-www-form-urlencoded')
response = urllib2.urlopen(request)
content = response.read()
if content:
    print content
