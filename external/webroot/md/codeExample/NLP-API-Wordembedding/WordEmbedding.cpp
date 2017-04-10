#include <iostream>
#include <curl/curl.h>
#include "word_embedding.h"
#include <boost/locale/encoding.hpp>
#include <json/json.h>
// libcurl库下载链接：https://curl.haxx.se/download.html
// jsoncpp库下载链接：https://github.com/open-source-parsers/jsoncpp/
// 人脸检测接口url
const static std::string word_embedding_url = "https://aip.baidubce.com/rpc/2.0/nlp/v1/wordembedding";
static std::string word_embedding_result;
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
    word_embedding_result = std::string((char *) ptr, size * nmemb);
    return size * nmemb;
}
/**
 * 调用分词接口，返回json格式的结果，具体格式解析见百度大脑文档
 * @param json_result 以string格式返回的json格式的结果
 * @param query 待分词字符串列表，可能有一个或者两个字符串
 * @param access_token 以string格式传入的access token数据，access token获取方式见access_token获取相关文档及代码
 * @return 调用成功返回0，发生错误返回其他错误码
 */
int word_embedding(std::string &json_result, const std::vector<std::string> &query, const std::string &access_token){
    std::string url = word_embedding_url + "?access_token=" + access_token;
    CURL *curl = NULL;
    CURLcode result_code;
    int is_success;
    Json::Value root;
    Json::FastWriter writer;

    if(query.size()>1){
        root["query1"] = query[0];
        root["query2"] = query[1];
        root["tid"] = 1;
    }else{
        root["query1"] = query[0];
        root["tid"] = 2;
    }



    curl = curl_easy_init();
    if (curl) {
        curl_easy_setopt(curl, CURLOPT_URL, url.data());
        // 设置http发送的内容类型为JSON
        curl_slist *plist = curl_slist_append(NULL, "Content-Type:application/json");
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, plist);
        std::string data = utf8_to_gbk(writer.write(root));
        curl_easy_setopt(curl,CURLOPT_POSTFIELDS,data.c_str());
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, callback);
        result_code = curl_easy_perform(curl);
        if (result_code != CURLE_OK) {
            fprintf(stderr, "curl_easy_perform() failed: %s\n",
                    curl_easy_strerror(result_code));
            is_success = 1;
            return is_success;
        }
        json_result = word_embedding_result;
        curl_easy_cleanup(curl);
        is_success = 0;

    } else {
        fprintf(stderr, "curl_easy_init() failed.");
        is_success = 1;
    }
    return is_success;
}


