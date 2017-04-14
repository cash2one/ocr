# encoding:utf-8
import base64
import urllib
import urllib2

from token import access_token

'''
人脸查找之注册接口
'''

addUrl = "https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/user/add"
# 参数uid:用户id（由数字、字母、下划线组成），user_info:用户资料,group_id:用户组id,images:图像base64编码,多张图片半角逗号分隔
params = {"uid": "testuid", "user_info": "test_userinfo", "group_id": "test_groupid",
          "images": "%2F9j%2F4AAQSkZJRgABAQAAAQABAAD%2F4QDKRXhpZgAATU0AK"}
params = urllib.urlencode(params)
access_token = access_token.AuthService()
addUrl = addUrl + "?access_token=" + access_token
request = urllib2.Request(url=addUrl, data=params)
request.add_header('Content-Type', 'application/x-www-form-urlencoded')
response = urllib2.urlopen(request)
content = response.read()
if content:
    print content
