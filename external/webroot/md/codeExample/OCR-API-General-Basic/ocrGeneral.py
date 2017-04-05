# coding:utf-8
import urllib, urllib2, sys
import ssl

url = 'https://aip.baidubce.com/rest/2.0/ocr/v1/general?access_token=24.3757e04e2ae5f1d55092ee1df2dfda02.2592000.1492941733.282335-9424624'
bodys = {}
bodys[
    ''] = "{\"image\":\"/9j/4AAQSkZJRgABAQEASABIAAD\"}"
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
