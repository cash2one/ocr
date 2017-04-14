# encoding:utf-8
import base64
import urllib
import urllib2

from token import access_token

'''
人脸查找之组内添加用户接口
'''

addUsersUrl = "https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/group/adduser"
# 参数group_id：用户组id  uid：用户id
params = dict(group_id="gid", uid="test_uid")
params = urllib.urlencode(params)
access_token = access_token.AuthService()
addUsersUrl = addUsersUrl + "?access_token=" + access_token
request = urllib2.Request(url=addUsersUrl, data=params)
request.add_header('Content-Type', 'application/x-www-form-urlencoded')
response = urllib2.urlopen(request)
content = response.read()
if content:
    print content
