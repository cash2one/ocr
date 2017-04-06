#include <iostream>
#include <curl/curl.h>
#include <sstream>
#include "get_group_list.h"
// libcurl库下载链接：https://curl.haxx.se/download.html
// 接口url
const static std::string get_group_list_url = "https://aip.baidubce.com/rest/2.0/faceverify/v1/faceset/group/getlist";
static std::string get_group_list_result;

inline std::string int_to_string(int integer) {
    std::stringstream stream;
    stream << integer;
    return stream.str();
}

/**
 * curl发送http请求调用的回调函数，回调函数中对返回的json格式的body进行了解析，解析结果储存在全局的静态变量当中
 * @param 参数定义见libcurl文档
 * @return 返回值定义见libcurl文档
 */
static size_t callback(void *ptr, size_t size, size_t nmemb, void *stream) {
    // 获取到的body存放在ptr中，先将其转换为string格式
    get_group_list_result = std::string((char *) ptr, size * nmemb);
    return size * nmemb;
}

/**
 * 调用组列表查询接口，返回json格式的结果，具体格式解析见百度大脑文档
 * @param json_result 以string格式返回的json格式的结果
 * @param access_token 以string格式传入的access token数据，access token获取方式见access_token获取相关文档及代码
 * @param start 起始序号，默认值0
 * @param end 返回数量，默认值100，最大值1000
 * @return 调用成功返回0，发生错误返回其他错误码
 */
int get_group_list(std::string &json_result, const std::string &access_token, int start, int end) {
    std::string url = get_group_list_url + "?access_token=" + access_token;
    CURL *curl = NULL;
    CURLcode result_code;
    int is_success;
    curl = curl_easy_init();
    if (curl) {
        curl_easy_setopt(curl, CURLOPT_URL, url.data());
        curl_easy_setopt(curl, CURLOPT_POST, 1);
        curl_httppost *post = NULL;
        curl_httppost *last = NULL;
        curl_formadd(&post, &last, CURLFORM_COPYNAME, "start", CURLFORM_COPYCONTENTS, int_to_string(start).data(),
                     CURLFORM_END);
        curl_formadd(&post, &last, CURLFORM_COPYNAME, "end", CURLFORM_COPYCONTENTS, int_to_string(end).data(),
                     CURLFORM_END);
        curl_easy_setopt(curl, CURLOPT_HTTPPOST, post);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, callback);
        result_code = curl_easy_perform(curl);
        if (result_code != CURLE_OK) {
            fprintf(stderr, "curl_easy_perform() failed: %s\n",
                    curl_easy_strerror(result_code));
            is_success = 1;
            return is_success;
        }
        json_result = get_group_list_result;
        curl_easy_cleanup(curl);
        is_success = 0;
    } else {
        fprintf(stderr, "curl_easy_init() failed.");
        is_success = 1;
    }
    return is_success;
}