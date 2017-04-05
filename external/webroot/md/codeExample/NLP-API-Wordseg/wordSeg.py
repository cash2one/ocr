# coding:utf-8
import urllib, urllib2, sys
import ssl

url = 'https://aip.baidubce.com/rpc/2.0/nlp/v1/wordseg?access_token=24.bb41cb1bd46dd44b9c801b10ce010240.2592000.1492322377.282335-9252280'
bodys = {}
bodys[''] = "{\"query\":\"百度是一家高科技公司\"}"
post_data = bodys['']
request = urllib2.Request(url, post_data)
request.add_header('Content-Type', 'application/json')
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
response = urllib2.urlopen(request, context=ctx)
content = response.read()
if (content):
    print(content)
