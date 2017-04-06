# encoding:utf-8
import base64
import urllib
import urllib2

from token import access_token

'''
人脸比对接口
'''

matchUrl = "https://aip.baidubce.com/rest/2.0/faceverify/v1/match"
# 参数images：图像base64编码,多张图片半角逗号分隔
params = {
    "images": "%2F9j%2F4AAQSkZJRgABAQAAAQABAAD%2F4QDKRXhpZgAATU0AK,%2F9j%2F4AAQSkZJRgABAQAAAQABAAD%2F4QDKRXhpZgAATU0AK2"}
params = urllib.urlencode(params)
access_token = access_token.AuthService()
matchUrl = matchUrl + "?access_token=" + access_token
request = urllib2.Request(url=matchUrl, data=params)
request.add_header('Content-Type', 'application/x-www-form-urlencoded')
response = urllib2.urlopen(request)
content = response.read()
if content:
    print content
