# encoding:utf-8
import base64
import urllib
import urllib2

from token import access_token

'''
黄反识别接口
'''

detectUrl = "https://aip.baidubce.com/rest/2.0/antiporn/v1/detect"
# 参数image：图像base64编码
params = {"image": "%2F9j%2F4AAQSkZJRgABAQAAAQABAAD%2F4QDKRXhpZgAATU0AK"}
params = urllib.urlencode(params)
access_token = access_token.AuthService()
detectUrl = detectUrl + "?access_token=" + access_token
request = urllib2.Request(url=detectUrl, data=params)
request.add_header('Content-Type', 'application/x-www-form-urlencoded')
response = urllib2.urlopen(request)
content = response.read()
if content:
    print content
