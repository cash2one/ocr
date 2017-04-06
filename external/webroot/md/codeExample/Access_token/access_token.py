# encoding:utf-8
import urllib
import urllib2
import json


def AuthService():
    # 获取token地址
    authHost = "https://aip.baidubce.com/oauth/2.0/token?"
    # 官网获取的 API Key
    clientId = ""
    # 官网获取的 Secret Key
    clientSecret = ""
    getAccessTokenUrl = authHost + "grant_type=client_credentials" + "&client_id=" + clientId + "&client_secret=" + clientSecret
    request = urllib2.Request(getAccessTokenUrl)
    response_data = urllib2.urlopen(request)
    params = json.loads(response_data.read())
    return params["access_token"]


AuthService()
