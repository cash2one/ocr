# coding:utf-8
import urllib, urllib2, sys
import ssl

url = 'https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token=24.a1ff1c9e242129e0e88e506dfc223454.2592000.1492586050.282335-9395294'
bodys = {}
bodys[''] = "{\"id_card_side\":\"front\",\"image\":\"%2F9j%2F4AAQSkZJRgABAQAAAQABAAD%2F4QDKRXhpZgAATU0AK\"}"
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
