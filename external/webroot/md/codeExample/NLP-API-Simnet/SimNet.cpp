#include <iostream>
#include <curl/curl.h>
#include "simnet.h"
#include "json/json.h"
#include <boost/locale/encoding.hpp>
// libcurl库下载链接：https://curl.haxx.se/download.html
// jsoncpp库下载链接：https://github.com/open-source-parsers/jsoncpp/
// 人脸检测接口url
const static std::string comment_tag_url = "https://aip.baidubce.com/rpc/2.0/nlp/v1/simnet";
static std::string comment_tag_result;

/**
 * 将UTF8转换为GBK
 */
inline std::string utf8_to_gbk(const std::string &string) {
    return boost::locale::conv::between(string, "GBK", "UTF-8");
}

/**
 * curl发送http请求调用的回调函数，回调函数中对返回的json格式的body进行了解析，解析结果储存在全局的静态变量当中
 * @param 参数定义见libcurl文档
 * @return 返回值定义见libcurl文档
 */
static size_t callback(void *ptr, size_t size, size_t nmemb, void *stream) {
    // 获取到的body存放在ptr中，先将其转换为string格式
    comment_tag_result = std::string((char *) ptr, size * nmemb);
    return size * nmemb;
}

/**
 * 调用接口，返回json格式的结果，具体格式解析见百度大脑文档
 * @param json_result 以string格式返回的json格式的结果
 * @param comment 评论内容字符串
 * @param type 类别参数
 * @param access_token 以string格式传入的access token数据，access token获取方式见access_token获取相关文档及代码
 * @return 调用成功返回0，发生错误返回其他错误码
 */
int simnet(std::string &json_result, const std::string &text1, const std::string &text2,
           const std::string &access_token) {
    std::string url = comment_tag_url + "?access_token=" + access_token;
    CURL *curl = NULL;
    CURLcode result_code;
    int is_success;
    // 构造json
    Json::FastWriter writer;
    Json::Value root;
    Json::Value input, qslots, tslots,item;
    item["type"] = 0;
    item["items"].resize(0);
    item["terms_sequence"] = text1;
    qslots.append(item);
    item["terms_sequence"] = text2;
    tslots.append(item);
    input["qslots"] = qslots;
    input["tslots"] = tslots;
    input["type"] = 0;
    root["input"] = input;
    // 利用libcurl发送https请求
    curl = curl_easy_init();
    if (curl) {
        curl_easy_setopt(curl, CURLOPT_URL, url.data());
        // 设置http发送的内容类型为JSON
        curl_slist *plist = curl_slist_append(NULL, "Content-Type:application/json");
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, plist);
        std::string gbk_data = utf8_to_gbk(writer.write(root));
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, gbk_data.c_str());
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, callback);
        result_code = curl_easy_perform(curl);
        if (result_code != CURLE_OK) {
            fprintf(stderr, "curl_easy_perform() failed: %s\n",
                    curl_easy_strerror(result_code));
            is_success = 1;
            return is_success;
        }
        json_result = comment_tag_result;
        curl_easy_cleanup(curl);
        is_success = 0;

    } else {
        fprintf(stderr, "curl_easy_init() failed.");
        is_success = 1;
    }
    return is_success;
}
