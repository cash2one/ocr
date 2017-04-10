# encoding:utf-8
import base64
import urllib
import urllib2

from token import access_token

'''
人脸查找之组列表查询接口
'''

getListUrl = "https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/group/getlist"
# 参数start：默认值0，起始序号   end：返回数量，默认值100，最大值1000
params = {"start": 0, "end": 100}
params = urllib.urlencode(params)
access_token = access_token.AuthService()
getListUrl = getListUrl + "?access_token=" + access_token
request = urllib2.Request(url=getListUrl, data=params)
request.add_header('Content-Type', 'application/x-www-form-urlencoded')
response = urllib2.urlopen(request)
content = response.read()
if content:
    print content
