#include <iostream>
#include <curl/curl.h>
#include <json/json.h>
#include "access_token.h"
// libcurl库下载链接：https://curl.haxx.se/download.html
// jsoncpp库下载链接：https://github.com/open-source-parsers/jsoncpp/
// 获取access_token所需要的url
const std::string access_token_url = "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials";
// 回调函数获取到的access_token存放变量
static std::string access_token_result;
/**
 * curl发送http请求调用的回调函数，回调函数中对返回的json格式的body进行了解析，解析结果储存在result中
 * @param 参数定义见libcurl库文档
 * @return 返回值定义见libcurl库文档
 */
static size_t callback(void *ptr, size_t size, size_t nmemb, void *stream) {
    // 获取到的body存放在ptr中，先将其转换为string格式
    std::string s((char *) ptr, size * nmemb);
    // 开始获取json中的access token项目
    Json::Reader reader;
    Json::Value root;
    // 使用boost库解析json
    reader.parse(s,root);
    access_token_result = root["access_token"].asString();
    return size * nmemb;
}

/**
 * 用以获取access_token的函数，使用时需要先在百度云控制台申请相应功能的应用，获得对应的API Key和Secret Key
 * @param access_token 获取得到的access token，调用函数时需传入该参数
 * @param AK 应用的API key
 * @param SK 应用的Secret key
 * @return 返回0代表获取access token成功，其他返回值代表获取失败
 */
int get_access_token(std::string &access_token, const std::string &AK, const std::string &SK) {
    CURL *curl;
    CURLcode result_code;
    int success;
    curl = curl_easy_init();
    if (curl) {
        curl_easy_setopt(curl, CURLOPT_URL,
                         (access_token_url + "&client_id=" + AK + "&client_secret=" + SK).data());
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, callback);
        result_code = curl_easy_perform(curl);
        if (result_code != CURLE_OK) {
            fprintf(stderr, "curl_easy_perform() failed: %s\n",
                    curl_easy_strerror(result_code));
            success = 1;
            return success;
        }
        access_token = access_token_result;
        curl_easy_cleanup(curl);
        success = 0;
    } else {
        fprintf(stderr, "curl_easy_init() failed.");
        success = 1;
    }
    return success;
}
