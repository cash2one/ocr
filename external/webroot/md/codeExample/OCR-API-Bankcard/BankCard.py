# coding:utf-8
import urllib, urllib2, sys
import ssl

url = 'https://aip.baidubce.com/rest/2.0/ocr/v1/bankcard?access_token=24.a1ff1c9e242129e0e88e506dfc223454.2592000.1492586050.282335-9395294'
bodys = {}
bodys[''] = "{\"image\":\"【图片base64编码】\"}"
post_data = bodys['']
request = urllib2.Request(url, post_data)
request.add_header('Content-Type', 'application/x-www-form-urlencoded')
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
response = urllib2.urlopen(request, context=ctx)
content = response.read()
if (content):
    print(content)
